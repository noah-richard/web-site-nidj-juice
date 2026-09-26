/* ==========================================================================
   NIDJ JUICE — ENTERPRISE SUPABASE CLOUD DATABASE SERVICE
   Official Cloud Persistence, Bidirectional Synchronization & Order Pipeline
   ========================================================================== */

import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { CmsDatabase, SiteSettings } from './cms.service';

export interface SupabaseConfig {
  url: string;
  anonKey: string;
  autoSync?: boolean;
}

export interface SupabaseOrder {
  flavor: string;
  format?: string;
  quantity?: number;
  customer_name: string;
  customer_phone: string;
  city?: string;
  neighborhood?: string;
  delivery_address?: string;
  store_hint?: string;
  source?: string;
  notes?: string;
  status?: string;
}

export interface SupabaseContactMessage {
  name: string;
  email?: string;
  phone?: string;
  subject?: string;
  message: string;
}

export class SupabaseService {
  private static instance: SupabaseService | null = null;
  private readonly STORAGE_CONFIG_KEY = 'nidj_supabase_config';
  private cachedClient: SupabaseClient | null = null;
  private lastClientUrl: string = '';
  private lastClientKey: string = '';

  private constructor() {}

  public static getInstance(): SupabaseService {
    if (!SupabaseService.instance) {
      SupabaseService.instance = new SupabaseService();
    }
    return SupabaseService.instance;
  }

  /**
   * Resolves Supabase credentials from:
   * 1. Direct local configuration storage
   * 2. CMS Database settings in localStorage
   * 3. Vite environment variables (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)
   */
  public getConfig(): SupabaseConfig {
    let url = '';
    let anonKey = '';
    let autoSync = true;

    // 1. Direct local storage key
    try {
      const raw = localStorage.getItem(this.STORAGE_CONFIG_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.url) url = parsed.url;
        if (parsed.anonKey) anonKey = parsed.anonKey;
        if (typeof parsed.autoSync === 'boolean') autoSync = parsed.autoSync;
      }
    } catch (e) {
      console.warn('Could not read cached Supabase config', e);
    }

    // 2. CMS database stored settings
    if (!url || !anonKey) {
      try {
        const cmsRaw = localStorage.getItem('nidj_juice_cms_v1');
        if (cmsRaw) {
          const cmsData = JSON.parse(cmsRaw);
          if (cmsData?.settings) {
            const s = cmsData.settings as SiteSettings & {
              supabaseUrl?: string;
              supabaseAnonKey?: string;
              supabaseAutoSync?: boolean;
            };
            if (!url && s.supabaseUrl) url = s.supabaseUrl;
            if (!anonKey && s.supabaseAnonKey) anonKey = s.supabaseAnonKey;
            if (typeof s.supabaseAutoSync === 'boolean') autoSync = s.supabaseAutoSync;
          }
        }
      } catch (e) {
        console.warn('Could not read CMS Supabase settings', e);
      }
    }

    // 3. Vite environment variables fallback
    if (!url) {
      url = (import.meta as any).env?.VITE_SUPABASE_URL || '';
    }
    if (!anonKey) {
      anonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || '';
    }

    return {
      url: url.trim(),
      anonKey: anonKey.trim(),
      autoSync
    };
  }

  /**
   * Persists configuration locally and resets cached client
   */
  public saveConfig(config: SupabaseConfig): void {
    try {
      localStorage.setItem(this.STORAGE_CONFIG_KEY, JSON.stringify(config));
    } catch (e) {
      console.warn('Could not write Supabase config to localStorage', e);
    }

    // Reset client cache so new credentials take effect immediately
    this.cachedClient = null;
    this.lastClientUrl = '';
    this.lastClientKey = '';
  }

  /**
   * Checks whether Supabase URL and Anon Key are configured
   */
  public isConfigured(): boolean {
    const cfg = this.getConfig();
    return Boolean(cfg.url && cfg.anonKey && cfg.url.startsWith('http'));
  }

  /**
   * Returns an active SupabaseClient instance or null if unconfigured
   */
  public getClient(): SupabaseClient | null {
    const cfg = this.getConfig();
    if (!cfg.url || !cfg.anonKey || !cfg.url.startsWith('http')) {
      return null;
    }

    // Return cached instance if credentials match
    if (this.cachedClient && this.lastClientUrl === cfg.url && this.lastClientKey === cfg.anonKey) {
      return this.cachedClient;
    }

    try {
      this.cachedClient = createClient(cfg.url, cfg.anonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true
        }
      });
      this.lastClientUrl = cfg.url;
      this.lastClientKey = cfg.anonKey;
      return this.cachedClient;
    } catch (err) {
      console.error('Error creating Supabase client:', err);
      return null;
    }
  }

  /**
   * Tests the connection to Supabase and verifies table readiness
   */
  public async testConnection(): Promise<{ success: boolean; message: string; details?: any }> {
    const client = this.getClient();
    if (!client) {
      return {
        success: false,
        message: 'Identifiants Supabase non renseignés ou format d’URL invalide.'
      };
    }

    try {
      // Test querying the site_database table
      const { data, error } = await client
        .from('site_database')
        .select('id, updated_at, version')
        .limit(1);

      if (error) {
        // Table might not exist yet
        if (error.code === '42P01' || error.message.includes('does not exist')) {
          return {
            success: false,
            message: 'Connexion établie avec succès à Supabase, mais la table "site_database" n’est pas encore créée. Veuillez exécuter le script SQL fourni ci-dessous dans votre Supabase SQL Editor.',
            details: error
          };
        }

        // RLS or permission issue
        if (error.code === '42501' || error.message.includes('permission') || error.message.includes('policy')) {
          return {
            success: false,
            message: 'Connexion établie, mais les politiques de sécurité (RLS) bloquent la lecture. Exécutez le script SQL fourni ci-dessous pour autoriser l’accès.',
            details: error
          };
        }

        return {
          success: false,
          message: `Erreur Supabase (${error.code || 'API'}) : ${error.message}`,
          details: error
        };
      }

      const rowsCount = Array.isArray(data) ? data.length : 0;
      return {
        success: true,
        message: `Connexion Supabase réussie ! Base de données prête (${rowsCount > 0 ? 'Sauvegarde cloud existante détectée' : 'Table prête pour la première sauvegarde'}).`,
        details: data
      };
    } catch (err: any) {
      return {
        success: false,
        message: `Impossible de contacter Supabase : ${err?.message || 'Vérifiez votre connexion Internet et vos identifiants.'}`,
        details: err
      };
    }
  }

  /**
   * Pushes and saves the entire CMS database to Supabase 'site_database' table.
   * Upserts the row with id='main'.
   */
  public async saveSiteData(db: CmsDatabase): Promise<{ success: boolean; message: string }> {
    const client = this.getClient();
    if (!client) {
      return {
        success: false,
        message: 'Supabase n’est pas configuré. Veuillez renseigner l’URL et la clé API dans les Paramètres.'
      };
    }

    try {
      const payload = {
        id: 'main',
        data: db,
        version: db.version || 1,
        updated_at: new Date().toISOString()
      };

      const { error } = await client
        .from('site_database')
        .upsert(payload, { onConflict: 'id' });

      if (error) {
        console.error('Supabase saveSiteData error:', error);
        return {
          success: false,
          message: `Échec de sauvegarde Supabase : ${error.message} (Code: ${error.code || 'Inconnu'})`
        };
      }

      return {
        success: true,
        message: `Toutes les données du site ont été sauvegardées avec succès sur Supabase à ${new Date().toLocaleTimeString('fr-FR')} !`
      };
    } catch (err: any) {
      console.error('Error during Supabase saveSiteData:', err);
      return {
        success: false,
        message: `Erreur réseau ou exception : ${err?.message || 'Erreur inattendue'}`
      };
    }
  }

  /**
   * Loads the site database from Supabase 'site_database' table.
   */
  public async loadSiteData(): Promise<{ success: boolean; data?: CmsDatabase; message?: string }> {
    const client = this.getClient();
    if (!client) {
      return {
        success: false,
        message: 'Supabase n’est pas configuré.'
      };
    }

    try {
      const { data, error } = await client
        .from('site_database')
        .select('data, updated_at, version')
        .eq('id', 'main')
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return {
            success: false,
            message: 'Aucune donnée trouvée sur Supabase (table vide). Effectuez une première sauvegarde.'
          };
        }
        return {
          success: false,
          message: `Erreur Supabase : ${error.message}`
        };
      }

      if (!data || !data.data) {
        return {
          success: false,
          message: 'Données vides ou format invalide sur Supabase.'
        };
      }

      return {
        success: true,
        data: data.data as CmsDatabase,
        message: `Données synchronisées depuis Supabase (dernière mise à jour cloud : ${data.updated_at ? new Date(data.updated_at).toLocaleString('fr-FR') : 'inconnue'}).`
      };
    } catch (err: any) {
      return {
        success: false,
        message: `Impossible de récupérer les données depuis Supabase : ${err?.message || 'Erreur inconnue'}`
      };
    }
  }

  /**
   * Records a customer order into the Supabase 'orders' table
   */
  public async saveOrder(order: SupabaseOrder): Promise<{ success: boolean; id?: string; message?: string }> {
    const client = this.getClient();
    if (!client) {
      return {
        success: false,
        message: 'Supabase non configuré pour l’enregistrement des commandes.'
      };
    }

    try {
      const { data, error } = await client
        .from('orders')
        .insert([
          {
            flavor: order.flavor,
            format: order.format || 'Standard',
            quantity: order.quantity || 1,
            customer_name: order.customer_name,
            customer_phone: order.customer_phone,
            city: order.city || 'Non précisé',
            neighborhood: order.neighborhood || '',
            delivery_address: order.delivery_address || '',
            store_hint: order.store_hint || '',
            source: order.source || 'website',
            notes: order.notes || '',
            status: order.status || 'pending',
            created_at: new Date().toISOString()
          }
        ])
        .select('id')
        .single();

      if (error) {
        console.warn('Could not save order to Supabase orders table:', error);
        return {
          success: false,
          message: error.message
        };
      }

      return {
        success: true,
        id: data?.id,
        message: 'Commande enregistrée avec succès sur Supabase.'
      };
    } catch (err: any) {
      console.warn('Exception saving order to Supabase:', err);
      return {
        success: false,
        message: err?.message || 'Erreur'
      };
    }
  }

  /**
   * Records a contact inquiry into the Supabase 'contact_messages' table
   */
  public async saveContactMessage(contact: SupabaseContactMessage): Promise<{ success: boolean; message?: string }> {
    const client = this.getClient();
    if (!client) return { success: false, message: 'Supabase non configuré.' };

    try {
      const { error } = await client
        .from('contact_messages')
        .insert([
          {
            name: contact.name,
            email: contact.email || '',
            phone: contact.phone || '',
            subject: contact.subject || '',
            message: contact.message,
            created_at: new Date().toISOString()
          }
        ]);

      if (error) {
        console.warn('Could not save contact message to Supabase:', error);
        return { success: false, message: error.message };
      }

      return { success: true, message: 'Message enregistré sur Supabase.' };
    } catch (err: any) {
      return { success: false, message: err?.message };
    }
  }

  /**
   * Fetches recent customer orders from Supabase
   */
  public async getOrders(limit = 50): Promise<{ success: boolean; data?: any[]; message?: string }> {
    const client = this.getClient();
    if (!client) return { success: false, message: 'Supabase non configuré.' };

    try {
      const { data, error } = await client
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) {
        return { success: false, message: error.message };
      }

      return { success: true, data: data || [] };
    } catch (err: any) {
      return { success: false, message: err?.message };
    }
  }

  /**
   * Generates the SQL schema setup script for the Supabase SQL Editor.
   * Creates site_database, orders, contact_messages, enables RLS, and sets permissive policies.
   */
  public getSqlSetupScript(): string {
    return `-- =============================================================================
-- NIDJ JUICE (SOCIÉTÉ NIDJEU) — CONFIGURATION INITIALE SUPABASE CLOUD
-- Copiez et collez l'intégralité de ce script dans le Supabase SQL Editor,
-- puis cliquez sur "RUN" pour créer instantanément les tables et permissions.
-- =============================================================================

-- 1. TABLE DU CONTENU COMPLET DU SITE (CMS DATABASE)
CREATE TABLE IF NOT EXISTS public.site_database (
    id TEXT PRIMARY KEY DEFAULT 'main',
    data JSONB NOT NULL,
    version INTEGER DEFAULT 1,
    updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Index pour requêtes JSONB ultra-rapides
CREATE INDEX IF NOT EXISTS idx_site_database_updated_at ON public.site_database (updated_at DESC);

-- 2. TABLE DES COMMANDES CLIENTS (HOTLINE & WEB CONVERSIONS)
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    flavor TEXT NOT NULL,
    format TEXT,
    quantity INTEGER DEFAULT 1,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    city TEXT,
    neighborhood TEXT,
    delivery_address TEXT,
    store_hint TEXT,
    source TEXT DEFAULT 'site_order_modal',
    notes TEXT,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Index pour trier rapidement les commandes par date
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders (created_at DESC);

-- 3. TABLE DES MESSAGES DE CONTACT & B2B
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    subject TEXT,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW())
);

-- =============================================================================
-- SÉCURITÉ : ACTIVATION DU ROW LEVEL SECURITY (RLS) & POLITIQUES PUBLIQUES
-- =============================================================================

ALTER TABLE public.site_database ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Politiques pour site_database (Lecture et écriture publiques / anon)
DROP POLICY IF EXISTS "Allow public read site_database" ON public.site_database;
CREATE POLICY "Allow public read site_database" 
ON public.site_database FOR SELECT 
USING (true);

DROP POLICY IF EXISTS "Allow public insert update site_database" ON public.site_database;
CREATE POLICY "Allow public insert update site_database" 
ON public.site_database FOR ALL 
USING (true) 
WITH CHECK (true);

-- Politiques pour orders (Insertion libre par les visiteurs du site, lecture par l'admin)
DROP POLICY IF EXISTS "Allow anon insert orders" ON public.orders;
CREATE POLICY "Allow anon insert orders" 
ON public.orders FOR INSERT 
WITH CHECK (true);

DROP POLICY IF EXISTS "Allow select orders" ON public.orders;
CREATE POLICY "Allow select orders" 
ON public.orders FOR SELECT 
USING (true);

DROP POLICY IF EXISTS "Allow update orders" ON public.orders;
CREATE POLICY "Allow update orders" 
ON public.orders FOR UPDATE 
USING (true);

-- Politiques pour contact_messages
DROP POLICY IF EXISTS "Allow anon insert contact_messages" ON public.contact_messages;
CREATE POLICY "Allow anon insert contact_messages" 
ON public.contact_messages FOR INSERT 
WITH CHECK (true);

DROP POLICY IF EXISTS "Allow select contact_messages" ON public.contact_messages;
CREATE POLICY "Allow select contact_messages" 
ON public.contact_messages FOR SELECT 
USING (true);

-- Notification de succès
COMMENT ON TABLE public.site_database IS 'Base de données CMS officielle Nidj Juice';
COMMENT ON TABLE public.orders IS 'Commandes clients générées depuis le site web Nidj Juice';
COMMENT ON TABLE public.contact_messages IS 'Messages de contact et demandes B2B';
`;
  }
}

export const supabaseService = SupabaseService.getInstance();
