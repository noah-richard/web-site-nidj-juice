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

export interface AdminUser {
  id?: string;
  email: string;
  fullName: string;
  role: string;
  isActive?: boolean;
  lastLogin?: string;
  createdAt?: string;
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

    // Sanitize URL (strip trailing /rest/v1 or trailing slashes)
    const cleanUrl = url.trim().replace(/\/rest\/v1\/?$/i, '').replace(/\/+$/, '');

    return {
      url: cleanUrl,
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
   * Subscribes to real-time changes in the 'site_database' table via WebSockets.
   * Enables instant universal updates across all opened browsers without page refresh.
   */
  public subscribeToSiteChanges(callback: (db: CmsDatabase) => void): (() => void) | null {
    const client = this.getClient();
    if (!client) return null;

    try {
      const channel = client
        .channel('site_database_realtime')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'site_database',
            filter: 'id=eq.main'
          },
          (payload: any) => {
            if (payload?.new && payload.new.data) {
              console.log('⚡ [Supabase Realtime] Mise à jour en direct reçue du Cloud !');
              callback(payload.new.data as CmsDatabase);
            }
          }
        )
        .subscribe((status: string) => {
          if (status === 'SUBSCRIBED') {
            console.log('⚡ [Supabase Realtime] Connecté avec succès au canal de synchronisation temps réel.');
          }
        });

      return () => {
        try {
          void client.removeChannel(channel);
        } catch (e) {
          console.warn('Error removing realtime channel:', e);
        }
      };
    } catch (err) {
      console.warn('Erreur souscription Supabase Realtime:', err);
      return null;
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

  // =========================================================================
  // ADMINISTRATOR AUTHENTICATION & MANAGEMENT (SUPABASE CLOUD)
  // =========================================================================

  /**
   * Authenticates an administrator via Supabase Auth & admin_users table
   */
  public async signInAdmin(
    email: string,
    password: string
  ): Promise<{ success: boolean; user?: AdminUser; message: string }> {
    const cleanEmail = (email || '').trim().toLowerCase();
    const client = this.getClient();

    if (!client) {
      return {
        success: false,
        message: 'Le service d’authentification Supabase n’est pas configuré.'
      };
    }

    if (!cleanEmail || !password) {
      return {
        success: false,
        message: 'Veuillez renseigner votre email et votre mot de passe.'
      };
    }

    try {
      const { data, error } = await client.auth.signInWithPassword({
        email: cleanEmail,
        password
      });

      if (error || !data?.user) {
        return {
          success: false,
          message: error?.message === 'Invalid login credentials'
            ? 'Email ou mot de passe administrateur incorrect.'
            : (error?.message || 'Identifiants incorrects.')
        };
      }

      const authUser = data.user;
      let role = (authUser.user_metadata?.role as string) || 'Direction';
      let fullName = (authUser.user_metadata?.full_name as string) || cleanEmail.split('@')[0];

      try {
        const { data: record } = await client
          .from('admin_users')
          .select('*')
          .eq('email', cleanEmail)
          .maybeSingle();

        if (record) {
          fullName = record.full_name || fullName;
          role = record.role || role;
          await client
            .from('admin_users')
            .update({ last_login: new Date().toISOString() })
            .eq('id', record.id);
        } else {
          await client
            .from('admin_users')
            .insert([
              {
                id: authUser.id,
                email: cleanEmail,
                full_name: fullName,
                role: role,
                is_active: true,
                last_login: new Date().toISOString()
              }
            ]);
        }
      } catch (e) {
        console.warn('Could not sync admin_users table:', e);
      }

      const adminUser: AdminUser = {
        id: authUser.id,
        email: cleanEmail,
        fullName,
        role,
        lastLogin: new Date().toISOString()
      };

      return {
        success: true,
        user: adminUser,
        message: 'Connexion administrateur réussie via Supabase Cloud !'
      };
    } catch (err: any) {
      return {
        success: false,
        message: `Erreur de connexion : ${err?.message || 'Impossible de joindre le serveur'}`
      };
    }
  }

  /**
   * Registers a new administrator into Supabase Auth & admin_users table
   */
  public async signUpAdmin(
    email: string,
    password: string,
    fullName: string,
    role: string = 'Direction'
  ): Promise<{ success: boolean; user?: AdminUser; message: string }> {
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanName = (fullName || '').trim() || cleanEmail.split('@')[0];
    const cleanRole = (role || 'Direction').trim();

    if (!cleanEmail || !password || password.length < 6) {
      return {
        success: false,
        message: 'L’email et un mot de passe d’au moins 6 caractères sont requis.'
      };
    }

    const client = this.getClient();
    if (!client) {
      return {
        success: false,
        message: 'Supabase n’est pas configuré. Veuillez d’abord enregistrer vos identifiants dans les Paramètres.'
      };
    }

    try {
      // 1. Create user in Supabase Authentication
      const { data: authData, error: authError } = await client.auth.signUp({
        email: cleanEmail,
        password,
        options: {
          data: {
            full_name: cleanName,
            role: cleanRole
          }
        }
      });

      if (authError) {
        return {
          success: false,
          message: `Erreur Supabase Auth : ${authError.message}`
        };
      }

      const authId = authData?.user?.id;

      // 2. Insert or update into public.admin_users table
      const { error: dbError } = await client
        .from('admin_users')
        .upsert(
          [
            {
              ...(authId ? { id: authId } : {}),
              email: cleanEmail,
              full_name: cleanName,
              role: cleanRole,
              is_active: true,
              last_login: new Date().toISOString()
            }
          ],
          { onConflict: 'email' }
        );

      if (dbError) {
        console.warn('Warning inserting admin_users record:', dbError.message);
      }

      const user: AdminUser = {
        id: authId,
        email: cleanEmail,
        fullName: cleanName,
        role: cleanRole,
        lastLogin: new Date().toISOString()
      };

      return {
        success: true,
        user,
        message: 'Compte administrateur créé et enregistré avec succès dans Supabase !'
      };
    } catch (err: any) {
      return {
        success: false,
        message: `Erreur lors de la création : ${err?.message || 'Erreur inattendue'}`
      };
    }
  }

  /**
   * Signs out the administrator from Supabase Auth
   */
  public async signOutAdmin(): Promise<void> {
    const client = this.getClient();
    if (client) {
      try {
        await client.auth.signOut();
      } catch (e) {
        console.warn('SignOut error:', e);
      }
    }
  }

  /**
   * Lists all administrators recorded in the Supabase admin_users table
   */
  public async getAdminUsers(): Promise<{ success: boolean; data?: AdminUser[]; message?: string }> {
    const client = this.getClient();
    if (!client) {
      return { success: false, message: 'Supabase non configuré.' };
    }

    try {
      const { data, error } = await client
        .from('admin_users')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        return { success: false, message: error.message };
      }

      const admins: AdminUser[] = (data || []).map((row) => ({
        id: row.id,
        email: row.email,
        fullName: row.full_name || row.email,
        role: row.role || 'Administrateur',
        isActive: row.is_active ?? true,
        lastLogin: row.last_login,
        createdAt: row.created_at
      }));

      return { success: true, data: admins };
    } catch (err: any) {
      return { success: false, message: err?.message };
    }
  }

  /**
   * Deletes an administrator record
   */
  public async deleteAdminUser(id: string): Promise<{ success: boolean; message: string }> {
    const client = this.getClient();
    if (!client) return { success: false, message: 'Supabase non configuré.' };

    try {
      const { error } = await client.from('admin_users').delete().eq('id', id);
      if (error) return { success: false, message: error.message };
      return { success: true, message: 'Administrateur supprimé avec succès.' };
    } catch (err: any) {
      return { success: false, message: err?.message || 'Erreur' };
    }
  }

  /**
   * Updates administrator password in Supabase Auth and local persistent fallback
   */
  public async updateAdminPassword(
    newPassword: string,
    oldPassword?: string,
    adminEmail?: string
  ): Promise<{ success: boolean; message: string }> {
    const cleanEmail = (adminEmail || '').trim().toLowerCase();
    const client = this.getClient();

    if (!newPassword || newPassword.length < 6) {
      return {
        success: false,
        message: 'Le nouveau mot de passe doit comporter au moins 6 caractères.'
      };
    }

    let cloudUpdated = false;
    let cloudNotice = '';

    // 1. If Supabase is connected, attempt user password update
    if (client) {
      try {
        const { data: userData } = await client.auth.getUser();
        if (userData?.user) {
          const { error: updErr } = await client.auth.updateUser({ password: newPassword });
          if (!updErr) {
            cloudUpdated = true;
          } else {
            cloudNotice = updErr.message;
          }
        } else if (cleanEmail && oldPassword) {
          // Re-authenticate user to update password if session wasn't active
          const { data: authData, error: signErr } = await client.auth.signInWithPassword({
            email: cleanEmail,
            password: oldPassword
          });
          if (!signErr && authData?.user) {
            const { error: updErr } = await client.auth.updateUser({ password: newPassword });
            if (!updErr) {
              cloudUpdated = true;
            } else {
              cloudNotice = updErr.message;
            }
          } else if (signErr) {
            cloudNotice = signErr.message;
          }
        }

        // Keep admin_users record in sync
        if (cleanEmail) {
          try {
            await client
              .from('admin_users')
              .update({ last_login: new Date().toISOString() })
              .eq('email', cleanEmail);
          } catch (e) {
            // Ignore if column doesn't match
          }
        }
      } catch (err: any) {
        console.warn('Supabase updateAdminPassword error:', err);
        cloudNotice = err?.message || 'Erreur de connexion Supabase';
      }
    }

    if (cloudUpdated) {
      return {
        success: true,
        message: 'Mot de passe administrateur mis à jour avec succès dans Supabase Cloud !'
      };
    }

    return {
      success: false,
      message: cloudNotice || 'Échec de la mise à jour du mot de passe dans Supabase.'
    };
  }

  /**
   * Retrieves and verifies the currently authenticated Supabase administrator session
   */
  public async getAuthenticatedAdmin(): Promise<AdminUser | null> {
    const client = this.getClient();
    if (!client) return null;

    try {
      const { data: { user }, error } = await client.auth.getUser();
      if (error || !user || !user.email) {
        return null;
      }

      const cleanEmail = user.email.toLowerCase();
      let role = (user.user_metadata?.role as string) || 'Direction';
      let fullName = (user.user_metadata?.full_name as string) || cleanEmail.split('@')[0];

      try {
        const { data: record } = await client
          .from('admin_users')
          .select('*')
          .eq('email', cleanEmail)
          .maybeSingle();

        if (record) {
          fullName = record.full_name || fullName;
          role = record.role || role;
        }
      } catch {
        // Ignore optional table sync error
      }

      return {
        id: user.id,
        email: cleanEmail,
        fullName,
        role,
        lastLogin: new Date().toISOString()
      };
    } catch {
      return null;
    }
  }

  /**
   * Sends a secure one-time password reset link to the administrator email
   */
  public async sendPasswordResetEmail(email: string): Promise<{ success: boolean; message: string }> {
    const cleanEmail = (email || '').trim().toLowerCase();
    if (!cleanEmail) {
      return { success: false, message: 'Veuillez saisir votre adresse email professionnelle.' };
    }

    const client = this.getClient();
    if (!client) {
      return { success: false, message: 'Le service Supabase n’est pas configuré.' };
    }

    try {
      const redirectUrl = typeof window !== 'undefined'
        ? `${window.location.origin}/nidj-juice-backoffice`
        : undefined;

      const { error } = await client.auth.resetPasswordForEmail(cleanEmail, {
        redirectTo: redirectUrl
      });

      if (error) {
        return { success: false, message: `Erreur Supabase : ${error.message}` };
      }

      return {
        success: true,
        message: 'Un lien sécurisé de réinitialisation a été envoyé à votre adresse email professionnelle.'
      };
    } catch (err: any) {
      return {
        success: false,
        message: err?.message || 'Erreur lors de l’envoi de l’email.'
      };
    }
  }

  /**
   * Resets administrator password using authenticated verification
   */
  public async resetAdminPassword(
    email: string,
    currentPassword: string,
    newPassword: string
  ): Promise<{ success: boolean; message: string }> {
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanCode = (currentPassword || '').trim();

    if (!cleanEmail) {
      return { success: false, message: 'Veuillez renseigner votre adresse email administrateur.' };
    }
    if (!newPassword || newPassword.length < 8) {
      return { success: false, message: 'Le nouveau mot de passe doit comporter au moins 8 caractères.' };
    }

    return await this.updateAdminPassword(newPassword, cleanCode, cleanEmail);
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
    flavor TEXT NOT NULL CONSTRAINT check_orders_flavor CHECK (char_length(flavor) BETWEEN 1 AND 150),
    format TEXT,
    quantity INTEGER DEFAULT 1 CONSTRAINT check_orders_quantity CHECK (quantity >= 1 AND quantity <= 1000),
    customer_name TEXT NOT NULL CONSTRAINT check_orders_name CHECK (char_length(customer_name) BETWEEN 2 AND 150),
    customer_phone TEXT NOT NULL CONSTRAINT check_orders_phone CHECK (char_length(customer_phone) BETWEEN 4 AND 35),
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
    name TEXT NOT NULL CONSTRAINT check_contact_name CHECK (char_length(name) BETWEEN 2 AND 150),
    email TEXT CONSTRAINT check_contact_email CHECK (email IS NULL OR char_length(email) <= 255),
    phone TEXT CONSTRAINT check_contact_phone CHECK (phone IS NULL OR char_length(phone) <= 35),
    subject TEXT CONSTRAINT check_contact_subject CHECK (subject IS NULL OR char_length(subject) <= 200),
    message TEXT NOT NULL CONSTRAINT check_contact_message CHECK (char_length(message) BETWEEN 2 AND 5000),
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW())
);

-- 4. TABLE DES ADMINISTRATEURS (ÉQUIPE & GESTION DES ACCÈS)
CREATE TABLE IF NOT EXISTS public.admin_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL CONSTRAINT check_admin_email CHECK (char_length(email) BETWEEN 5 AND 255),
    full_name TEXT NOT NULL CONSTRAINT check_admin_name CHECK (char_length(full_name) BETWEEN 2 AND 150),
    role TEXT DEFAULT 'Direction',
    is_active BOOLEAN DEFAULT true,
    last_login TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW())
);

CREATE INDEX IF NOT EXISTS idx_admin_users_email ON public.admin_users (email);

-- =============================================================================
-- SÉCURITÉ RENFORCÉE : ROW LEVEL SECURITY (RLS) & PROTECTION DES DONNÉES
-- =============================================================================

ALTER TABLE public.site_database ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- 1. Politiques pour site_database :
-- Lecture publique (visiteurs anonymes et connectés) pour afficher le site
DROP POLICY IF EXISTS "Allow public read site_database" ON public.site_database;
DROP POLICY IF EXISTS "Allow public insert update site_database" ON public.site_database;
DROP POLICY IF EXISTS "Allow authenticated modify site_database" ON public.site_database;

CREATE POLICY "Allow public read site_database" 
ON public.site_database FOR SELECT 
TO anon, authenticated 
USING (true);

-- Écriture (INSERT, UPDATE, DELETE) STRICTEMENT RÉSERVÉE aux administrateurs authentifiés
CREATE POLICY "Allow authenticated modify site_database" 
ON public.site_database FOR ALL 
TO authenticated 
USING (auth.role() = 'authenticated') 
WITH CHECK (auth.role() = 'authenticated');

-- 2. Politiques pour orders (Protection des données personnelles des clients) :
-- Insertion libre par tout visiteur du site (anonyme ou non) lors d'une commande
DROP POLICY IF EXISTS "Allow anon insert orders" ON public.orders;
DROP POLICY IF EXISTS "Allow select orders" ON public.orders;
DROP POLICY IF EXISTS "Allow update orders" ON public.orders;
DROP POLICY IF EXISTS "Allow authenticated read orders" ON public.orders;
DROP POLICY IF EXISTS "Allow authenticated update orders" ON public.orders;
DROP POLICY IF EXISTS "Allow authenticated delete orders" ON public.orders;

CREATE POLICY "Allow anon insert orders" 
ON public.orders FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);

-- Consultation, modification et suppression des commandes STRICTEMENT RÉSERVÉES aux administrateurs connectés
CREATE POLICY "Allow authenticated read orders" 
ON public.orders FOR SELECT 
TO authenticated 
USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update orders" 
ON public.orders FOR UPDATE 
TO authenticated 
USING (auth.role() = 'authenticated') 
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete orders" 
ON public.orders FOR DELETE 
TO authenticated 
USING (auth.role() = 'authenticated');

-- 3. Politiques pour contact_messages :
-- Insertion autorisée par tout visiteur
DROP POLICY IF EXISTS "Allow anon insert contact_messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Allow select contact_messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Allow authenticated read contact_messages" ON public.contact_messages;
DROP POLICY IF EXISTS "Allow authenticated delete contact_messages" ON public.contact_messages;

CREATE POLICY "Allow anon insert contact_messages" 
ON public.contact_messages FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);

-- Lecture et suppression STRICTEMENT RÉSERVÉES aux administrateurs connectés
CREATE POLICY "Allow authenticated read contact_messages" 
ON public.contact_messages FOR SELECT 
TO authenticated 
USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete contact_messages" 
ON public.contact_messages FOR DELETE 
TO authenticated 
USING (auth.role() = 'authenticated');

-- 4. Politiques pour admin_users :
-- AUCUN ACCÈS ANONYME. Seuls les administrateurs connectés peuvent lire ou gérer les comptes
DROP POLICY IF EXISTS "Allow select admin_users" ON public.admin_users;
DROP POLICY IF EXISTS "Allow all admin_users" ON public.admin_users;
DROP POLICY IF EXISTS "Allow authenticated select admin_users" ON public.admin_users;
DROP POLICY IF EXISTS "Allow authenticated manage admin_users" ON public.admin_users;

CREATE POLICY "Allow authenticated select admin_users" 
ON public.admin_users FOR SELECT 
TO authenticated 
USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated manage admin_users" 
ON public.admin_users FOR ALL 
TO authenticated 
USING (auth.role() = 'authenticated') 
WITH CHECK (auth.role() = 'authenticated');

-- =============================================================================
-- SYNCHRONISATION TEMPS RÉEL (SUPABASE REALTIME WEBSOCKETS)
-- Active la diffusion instantanée des changements vers tous les navigateurs connectés
-- =============================================================================
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' 
    AND schemaname = 'public' 
    AND tablename = 'site_database'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.site_database;
  END IF;
END $$;

ALTER TABLE public.site_database REPLICA IDENTITY FULL;

-- Notification de succès
COMMENT ON TABLE public.site_database IS 'Base de données CMS officielle Nidj Juice';
COMMENT ON TABLE public.orders IS 'Commandes clients générées depuis le site web Nidj Juice';
COMMENT ON TABLE public.contact_messages IS 'Messages de contact et demandes B2B';
COMMENT ON TABLE public.admin_users IS 'Administrateurs et gestionnaires autorisés Société Nidjeu';
`;
  }
}

export const supabaseService = SupabaseService.getInstance();
