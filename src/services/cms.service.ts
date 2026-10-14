/* ==========================================================================
   NIDJ JUICE — ENTERPRISE CMS SERVICE & PERSISTENT DATA STORE
   Centralizes all editable content: Flavors, Pages, Media, Stores & Settings.
   Synchronized via localStorage with automatic fallback to static defaults.
   ========================================================================== */

import { SHOWCASE_PRODUCTS } from '../data/showcase.data';
import { STORE_LOCATIONS, OFFICIAL_CONTACT } from '../data/stores.data';
import { GALLERY_ITEMS, type GalleryItem } from '../data/gallery.data';
import { VIDEO_REELS } from '../data/flavors.data';
import type { ShowcaseProduct } from '../components/showcase/showcase.types';
import type { StoreLocation, VideoReel, JuiceCollection, CmsCustomPage } from '../types/product.types';
import { supabaseService, type AdminUser } from './supabase.service';

export type { JuiceCollection, CmsCustomPage, AdminUser };

export interface HeroContent {
  titleWord1: string;
  titleWord2: string;
  subtitle: string;
  description: string;
  badge1: string;
  badge2: string;
  badge3: string;
  bgBannerImage?: string;
}

export interface CompanyContent {
  tagline: string;
  leadTitle: string;
  leadDesc: string;
  savoirFaireTitle: string;
  savoirFaireDesc: string;
  visionTitle: string;
  visionDesc: string;
  stat1Num: string;
  stat1Label: string;
  stat1Desc: string;
  stat2Num: string;
  stat2Label: string;
  stat2Desc: string;
  stat3Num: string;
  stat3Label: string;
  stat3Desc: string;
  stat4Num: string;
  stat4Label: string;
  stat4Desc: string;
  productionImage?: string;
  savoirFaireImage?: string;
  governanceImage?: string;
  qualityImage?: string;
}

export interface EngagementsContent {
  heroTitle: string;
  heroSubtitle: string;
  filieresTitle: string;
  filieresDesc: string;
  ecoTitle: string;
  ecoDesc: string;
  localImpactNum: string;
  localImpactLabel: string;
  filieresImage?: string;
  qualityImage?: string;
  recyclingImage?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface SiteSettings {
  brandName: string;
  companyName: string;
  country: string;
  headquarters: string;
  phoneDisplay: string;
  whatsappNumber: string;
  email: string;
  facebookUrl: string;
  instagramUrl: string;
  linkedinUrl: string;
  seoMetaTitle: string;
  seoMetaDesc: string;
  brandLogoUrl?: string;
  faviconUrl?: string;
  cloudinaryCloudName?: string;
  cloudinaryUploadPreset?: string;
  cloudinaryFolder?: string;
  supabaseUrl?: string;
  supabaseAnonKey?: string;
  supabaseAutoSync?: boolean;
  customAdminPassword?: string;
  adminPasswordUpdatedAt?: string;
}

export interface CmsDatabase {
  version: number;
  lastUpdated: string;
  products: ShowcaseProduct[];
  collections: JuiceCollection[];
  customPages: CmsCustomPage[];
  stores: StoreLocation[];
  galleryItems: GalleryItem[];
  videoReels: VideoReel[];
  hero: HeroContent;
  company: CompanyContent;
  engagements: EngagementsContent;
  faqs: FaqItem[];
  settings: SiteSettings;
}

const STORAGE_KEY = 'nidj_juice_cms_v1';
const AUTH_KEY = 'nidj_backoffice_authenticated';

export class CmsService {
  private static instance: CmsService | null = null;
  private db: CmsDatabase;

  private constructor() {
    this.db = this.loadFromStorage() || this.getDefaultDatabase();

    // Cross-tab real-time synchronization
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', (e) => {
        if (e.key === STORAGE_KEY && e.newValue) {
          try {
            this.db = JSON.parse(e.newValue);
            window.dispatchEvent(new CustomEvent('nidj:cms-data-changed', { detail: this.db }));
          } catch (err) {
            console.error('Failed to parse storage update', err);
          }
        }
      });

      // Background cloud sync check on startup
      this.initCloudSync();
    }
  }

  public reload(): void {
    this.db = this.loadFromStorage() || this.getDefaultDatabase();
    window.dispatchEvent(new CustomEvent('nidj:cms-data-changed', { detail: this.db }));
  }

  public onDataChanged(callback: (db: CmsDatabase) => void): () => void {
    const handler = (e: Event) => {
      const customEvent = e as CustomEvent<CmsDatabase>;
      callback(customEvent.detail || this.db);
    };
    window.addEventListener('nidj:cms-data-changed', handler);
    return () => window.removeEventListener('nidj:cms-data-changed', handler);
  }

  public static getInstance(): CmsService {
    if (!CmsService.instance) {
      CmsService.instance = new CmsService();
    }
    return CmsService.instance;
  }

  // --- Authentication & Administrator State ---
  private currentAdmin: AdminUser | null = null;

  public isAuthenticated(): boolean {
    try {
      return (
        sessionStorage.getItem(AUTH_KEY) === 'true' ||
        localStorage.getItem(AUTH_KEY) === 'true' ||
        Boolean(sessionStorage.getItem('nidj_current_admin')) ||
        Boolean(localStorage.getItem('nidj_current_admin'))
      );
    } catch {
      return false;
    }
  }

  public getCurrentAdmin(): AdminUser {
    if (!this.currentAdmin) {
      try {
        const raw = sessionStorage.getItem('nidj_current_admin') || localStorage.getItem('nidj_current_admin');
        if (raw) {
          this.currentAdmin = JSON.parse(raw);
        }
      } catch (e) {
        console.warn('Could not parse cached admin user', e);
      }
    }

    return (
      this.currentAdmin || {
        email: 'direction@nidj-juice.cm',
        fullName: 'Direction Société Nidjeu',
        role: 'Direction Générale'
      }
    );
  }

  public setCurrentAdmin(admin: AdminUser | null, remember: boolean = false): void {
    this.currentAdmin = admin;
    try {
      if (admin) {
        sessionStorage.setItem('nidj_current_admin', JSON.stringify(admin));
        sessionStorage.setItem(AUTH_KEY, 'true');
        if (remember) {
          localStorage.setItem('nidj_current_admin', JSON.stringify(admin));
          localStorage.setItem(AUTH_KEY, 'true');
        }
      } else {
        sessionStorage.removeItem('nidj_current_admin');
        sessionStorage.removeItem(AUTH_KEY);
        localStorage.removeItem('nidj_current_admin');
        localStorage.removeItem(AUTH_KEY);
      }
    } catch (e) {
      console.warn('Error saving admin session', e);
    }
  }

  public setAuthenticated(auth: boolean, remember: boolean = false): void {
    try {
      if (auth) {
        sessionStorage.setItem(AUTH_KEY, 'true');
        if (remember) {
          localStorage.setItem(AUTH_KEY, 'true');
        }
      } else {
        this.currentAdmin = null;
        sessionStorage.removeItem(AUTH_KEY);
        sessionStorage.removeItem('nidj_current_admin');
        localStorage.removeItem(AUTH_KEY);
        localStorage.removeItem('nidj_current_admin');
      }
    } catch (e) {
      console.error('Error saving auth state', e);
    }
  }

  // --- Password Management Helpers ---
  public getCustomAdminPassword(): string | null {
    try {
      return localStorage.getItem('nidj_custom_admin_password') || this.db?.settings?.customAdminPassword || null;
    } catch {
      return this.db?.settings?.customAdminPassword || null;
    }
  }

  public setCustomAdminPassword(newPassword: string): void {
    try {
      localStorage.setItem('nidj_custom_admin_password', newPassword);
      if (!this.db.settings) {
        this.db.settings = this.getDefaultDatabase().settings;
      }
      this.db.settings.customAdminPassword = newPassword;
      this.db.settings.adminPasswordUpdatedAt = new Date().toISOString();
      void this.persist();
    } catch (e) {
      console.warn('Error saving custom admin password', e);
    }
  }

  public verifyAdminPassword(pwd: string): boolean {
    const custom = this.getCustomAdminPassword();
    if (custom) {
      return pwd === custom;
    }
    return pwd === 'admin' || pwd === '237' || pwd === '2370' || pwd === 'nidjeu';
  }

  // --- Storage Operations ---
  private loadFromStorage(): CmsDatabase | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        const defaults = this.getDefaultDatabase();
        return {
          ...defaults,
          ...parsed,
          hero: {
            ...defaults.hero,
            ...(parsed.hero || {})
          },
          company: {
            ...defaults.company,
            ...(parsed.company || {})
          },
          engagements: {
            ...defaults.engagements,
            ...(parsed.engagements || {})
          },
          settings: {
            ...defaults.settings,
            ...(parsed.settings || {})
          },
          products: Array.isArray(parsed.products) && parsed.products.length > 0
            ? parsed.products
            : defaults.products,
          collections: Array.isArray(parsed.collections) && parsed.collections.length > 0
            ? parsed.collections
            : defaults.collections,
          customPages: Array.isArray(parsed.customPages) && parsed.customPages.length > 0
            ? parsed.customPages
            : defaults.customPages,
          stores: Array.isArray(parsed.stores) && parsed.stores.length > 0
            ? parsed.stores
            : defaults.stores,
          galleryItems: Array.isArray(parsed.galleryItems) && parsed.galleryItems.length > 0
            ? parsed.galleryItems
            : defaults.galleryItems,
          videoReels: Array.isArray(parsed.videoReels) && parsed.videoReels.length > 0
            ? parsed.videoReels
            : defaults.videoReels,
          faqs: Array.isArray(parsed.faqs) && parsed.faqs.length > 0
            ? parsed.faqs
            : defaults.faqs
        } as CmsDatabase;
      }
      return null;
    } catch (err) {
      console.warn('Failed to parse CMS database from localStorage, resetting to defaults.', err);
      return null;
    }
  }

  public async persist(triggerCloud: boolean = true): Promise<{ success: boolean; cloudSynced: boolean; message: string }> {
    try {
      this.db.lastUpdated = new Date().toISOString();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.db));
      window.dispatchEvent(
        new CustomEvent('nidj:cms-data-changed', {
          detail: { ...this.db }
        })
      );

      let cloudSynced = false;
      let cloudMsg = '';

      // Auto-sync to Supabase Cloud if configured
      if (triggerCloud && supabaseService.isConfigured() && this.db.settings?.supabaseAutoSync !== false) {
        try {
          const cloudRes = await supabaseService.saveSiteData(this.db);
          cloudSynced = cloudRes.success;
          cloudMsg = cloudRes.message;
          if (cloudRes.success) {
            console.log('⚡ [Supabase Cloud] Sauvegarde automatique effectuée avec succès.');
          } else {
            console.warn('⚠️ [Supabase Cloud] Synchronisation:', cloudRes.message);
          }
        } catch (err: any) {
          cloudMsg = err?.message || 'Erreur réseau Supabase';
          console.warn('⚠️ [Supabase Cloud] Erreur auto-synchronisation:', err);
        }
      }

      return {
        success: true,
        cloudSynced,
        message: cloudMsg
      };
    } catch (err: any) {
      console.error('Error saving CMS data to localStorage:', err);
      return {
        success: false,
        cloudSynced: false,
        message: err?.message || 'Erreur locale'
      };
    }
  }

  private realtimeUnsubscribe: (() => void) | null = null;

  public async initCloudSync(): Promise<void> {
    try {
      if (typeof window === 'undefined') return;
      
      const checkAndSync = async () => {
        if (!supabaseService.isConfigured()) return;

        // 1. Setup real-time WebSocket listener if not already active
        if (!this.realtimeUnsubscribe) {
          this.realtimeUnsubscribe = supabaseService.subscribeToSiteChanges((cloudDb) => {
            console.log('⚡ [Supabase Realtime] Application instantanée des données du Cloud.');
            const defaults = this.getDefaultDatabase();
            this.db = {
              ...defaults,
              ...cloudDb,
              hero: { ...defaults.hero, ...(cloudDb.hero || {}) },
              company: { ...defaults.company, ...(cloudDb.company || {}) },
              engagements: { ...defaults.engagements, ...(cloudDb.engagements || {}) },
              settings: { ...defaults.settings, ...(cloudDb.settings || {}) }
            };
            try {
              localStorage.setItem(STORAGE_KEY, JSON.stringify(this.db));
            } catch (e) {
              console.warn('Could not cache realtime cloud data to localStorage', e);
            }
            window.dispatchEvent(new CustomEvent('nidj:cms-data-changed', { detail: this.db }));
          });
        }

        // 2. Initial fetch from Cloud
        const res = await supabaseService.loadSiteData();
        if (res.success && res.data) {
          const cloudTime = new Date(res.data.lastUpdated || 0).getTime();
          const localTime = new Date(this.db.lastUpdated || 0).getTime();
          const hasLocalEdits = Boolean(localStorage.getItem(STORAGE_KEY));

          // If current browser has no local edits OR cloud version is newer or equal: accept cloud
          if (!hasLocalEdits || cloudTime >= localTime) {
            console.log('⚡ [Supabase Cloud] Données Cloud synchronisées avec succès.');
            const defaults = this.getDefaultDatabase();
            this.db = {
              ...defaults,
              ...res.data,
              hero: { ...defaults.hero, ...(res.data.hero || {}) },
              company: { ...defaults.company, ...(res.data.company || {}) },
              engagements: { ...defaults.engagements, ...(res.data.engagements || {}) },
              settings: { ...defaults.settings, ...(res.data.settings || {}) }
            };
            try {
              localStorage.setItem(STORAGE_KEY, JSON.stringify(this.db));
            } catch (e) {
              console.warn('Could not cache cloud data to localStorage', e);
            }
            window.dispatchEvent(new CustomEvent('nidj:cms-data-changed', { detail: this.db }));
          } else if (hasLocalEdits && localTime > cloudTime) {
            console.log('⚡ [Supabase Cloud] Version locale modifiée plus récente. Envoi vers Supabase Cloud...');
            await supabaseService.saveSiteData(this.db);
          }
        } else if (!res.success && res.message?.includes('Aucune donnée')) {
          if (Boolean(localStorage.getItem(STORAGE_KEY))) {
            console.log('⚡ [Supabase Cloud] Table vide détectée. Initialisation du Cloud avec les données actuelles...');
            await supabaseService.saveSiteData(this.db);
          }
        }
      };

      setTimeout(checkAndSync, 400);
    } catch (err) {
      console.warn('Cloud sync init error:', err);
    }
  }

  // --- Defaults Factory ---
  private getDefaultDatabase(): CmsDatabase {
    return {
      version: 1,
      lastUpdated: '2024-01-01T00:00:00.000Z',
      products: JSON.parse(JSON.stringify(SHOWCASE_PRODUCTS)),
      collections: this.getDefaultCollections(),
      customPages: this.getDefaultCustomPages(),
      stores: JSON.parse(JSON.stringify(STORE_LOCATIONS)),
      galleryItems: JSON.parse(JSON.stringify(GALLERY_ITEMS)),
      videoReels: JSON.parse(JSON.stringify(VIDEO_REELS)),
      hero: {
        titleWord1: 'BOIS DU',
        titleWord2: 'VRAI.',
        subtitle: '100% Nectars Purs & Rafraîchissants du Cameroun',
        description:
          'Une fraîcheur naturelle incomparable, pressée avec passion à Douala à partir de calices d’hibiscus du Grand Nord et d’ananas gorgés de soleil.',
        badge1: '100% Naturel & Brut',
        badge2: 'Fierté Camerounaise',
        badge3: 'Zéro Conservateur',
        bgBannerImage: ''
      },
      company: {
        tagline: 'Histoire, Savoir-Faire & Vision',
        leadTitle: 'L’excellence des nectars purs, née au cœur du Cameroun.',
        leadDesc:
          'Depuis sa fondation à Douala, la Société Nidjeu s’est donné une mission inébranlable : transformer les récoltes généreuses des terroirs camerounais en jus d’exception 100% naturels, sans compromis sur la fraîcheur ni la qualité.',
        savoirFaireTitle: 'Le Savoir-Faire Société Nidjeu',
        savoirFaireDesc:
          'Nos procédés combinent le respect des infusions artisanales traditionnelles et des technologies modernes de filtration micro-membranaire et de mise en bouteille hygiénique aseptique.',
        visionTitle: 'Une vision résolument tournée vers l’Afrique et le monde',
        visionDesc:
          'Démontrer que le Cameroun produit des nectars de classe mondiale rivalisant avec les plus grands standards internationaux de l’agroalimentaire.',
        stat1Num: '100%',
        stat1Label: 'Naturel & Authentique',
        stat1Desc: 'Zéro colorant artificiel, zéro arôme de synthèse, zéro conservateur chimique.',
        stat2Num: '237',
        stat2Label: 'Fierté Camerounaise',
        stat2Desc: 'Produit, embouteillé et distribué avec fierté à Douala et sur tout le territoire.',
        stat3Num: '+10',
        stat3Label: 'Points de Vente Agréés',
        stat3Desc: 'Présents dans les hypermarchés et boutiques sélectes de Douala, Yaoundé, Bafoussam et Kribi.',
        stat4Num: '1000+',
        stat4Label: 'Familles Agricoles',
        stat4Desc: 'Partenariat direct avec les coopératives d’hibiscus du Nord et de fruits du Littoral.',
        productionImage: '/assets/images/gallery-1.webp',
        savoirFaireImage: '/assets/images/gallery-2.webp',
        governanceImage: '/assets/images/gallery-3.webp',
        qualityImage: '/assets/images/gallery-4.webp'
      },
      engagements: {
        heroTitle: 'Nos Engagements RSE & Durabilité',
        heroSubtitle: 'Une responsabilité écologique et sociétale ancrée dans nos racines camerounaises.',
        filieresTitle: 'Soutien aux Filières Agricoles Locales',
        filieresDesc:
          'Nous nous approvisionnons directement auprès de coopératives agricoles du Nord pour le Bissap et du Littoral et Centre pour l’ananas et le gingembre, garantissant une rémunération équitable et pérenne.',
        ecoTitle: 'Bouteilles Recyclables & Circuits Courts',
        ecoDesc:
          'Tous nos contenants sont recyclables et nous privilégions la logistique de proximité afin de réduire l’empreinte carbone liée au transport.',
        localImpactNum: '100%',
        localImpactLabel: 'Approvisionnement Terroirs Cameroun',
        filieresImage: '/assets/images/gallery-3.webp',
        qualityImage: '/assets/images/gallery-1.webp',
        recyclingImage: '/assets/images/gallery-4.webp'
      },
      faqs: [
        {
          id: 'faq-1',
          question: 'Comment sont conservés les jus Nidj Juice sans conservateur chimique ?',
          answer:
            'Nous utilisons un procédé de pasteurisation douce à température contrôlée combiné à un conditionnement stérile immédiat qui garantit une longue conservation tout en préservant intacts les antioxydants, les vitamines et le goût originel du fruit frais.'
        },
        {
          id: 'faq-2',
          question: 'Où peut-on acheter les bouteilles Nidj Juice ?',
          answer:
            'Nos nectars sont distribués dans les principaux supermarchés et boutiques gourmandes à Douala (Bonapriso, Akwa, Bonamoussadi, Grand Mall), Yaoundé (Bastos), Kribi et Bafoussam. Vous pouvez aussi commander directement via notre Hotline WhatsApp.'
        },
        {
          id: 'faq-3',
          question: 'Comment devenir distributeur ou partenaire CHR agréé ?',
          answer:
            'Remplissez notre formulaire dans l’Espace B2B ou contactez directement notre équipe commerciale via WhatsApp au +237 6 77 42 66 12. Nous offrons des grilles tarifaires de gros exclusives et une logistique réfrigérée dédiée.'
        }
      ],
      settings: {
        brandName: OFFICIAL_CONTACT.brandName || 'Nidj Juice',
        companyName: OFFICIAL_CONTACT.companyName || 'Société Nidjeu',
        country: OFFICIAL_CONTACT.country || 'Cameroun',
        headquarters: OFFICIAL_CONTACT.headquarters || 'Douala, Cameroun',
        phoneDisplay: OFFICIAL_CONTACT.phoneDisplay || '+237 6 77 42 66 12',
        whatsappNumber: OFFICIAL_CONTACT.whatsappNumber || '237677426612',
        email: OFFICIAL_CONTACT.email || 'contact@nidj-juice.cm',
        facebookUrl: 'https://facebook.com/nidjjuice',
        instagramUrl: 'https://instagram.com/nidjjuice',
        linkedinUrl: 'https://linkedin.com/company/societe-nidjeu',
        seoMetaTitle: 'Nidj Juice — 100% Jus Naturels Fabriqués au Cameroun | Société Nidjeu',
        seoMetaDesc:
          'Découvrez Nidj Juice, la marque référence de jus 100% naturels pressés et embouteillés au Cameroun par la Société Nidjeu.',
        brandLogoUrl: '/assets/images/logo-nidj.png',
        faviconUrl: '/favicon.svg',
        cloudinaryCloudName: (import.meta as any).env?.VITE_CLOUDINARY_CLOUD_NAME || '',
        cloudinaryUploadPreset: (import.meta as any).env?.VITE_CLOUDINARY_UPLOAD_PRESET || '',
        cloudinaryFolder: 'nidj_juice',
        supabaseUrl: (import.meta as any).env?.VITE_SUPABASE_URL || '',
        supabaseAnonKey: (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || '',
        supabaseAutoSync: true
      }
    };
  }

  public getDefaultCollections(): JuiceCollection[] {
    return [
      {
        id: 'collection-royale',
        name: 'Collection Royale & Infusions',
        tagline: 'Infusions nobles de calices d’hibiscus du Grand Nord & notes florales',
        description: 'La noblesse du Bissap camerounais alliant fraîcheur vive, robe pourpre veloutée et arômes naturels captivants.',
        accentColor: '#C4003E',
        badge: 'Gamme Signature',
        bannerImage: '/assets/images/bottle-bissap.png',
        featured: true,
        sortOrder: 1
      },
      {
        id: 'collection-energie',
        name: 'Collection Énergie & Tonus',
        tagline: 'Ananas mûrs des terroirs et gingembre frais pressé',
        description: 'Un cocktail revigorant et plein de caractère pour éveiller les sens et stimuler l’organisme au quotidien.',
        accentColor: '#D97706',
        badge: 'Tonus Actif',
        bannerImage: '/assets/images/bottle-ananas.png',
        featured: true,
        sortOrder: 2
      },
      {
        id: 'collection-purete',
        name: 'Collection Pur Jus & Douceur',
        tagline: '100% Pur jus d’ananas pressé sans compromis',
        description: 'La douceur naturelle des ananas camerounais gorgés de soleil, sans un seul gramme de sucre raffiné ajouté.',
        accentColor: '#EAB308',
        badge: '100% Brut',
        bannerImage: '/assets/images/bottle-nature.png',
        featured: true,
        sortOrder: 3
      },
      {
        id: 'collection-fraicheur',
        name: 'Collection Fraîcheur & Hydratation',
        tagline: 'Pastèque juteuse et agrumes vitaminés',
        description: 'Une hydratation pure et bienfaisante, idéale pour désaltérer les journées ensoleillées d’Afrique.',
        accentColor: '#EA580C',
        badge: 'Fraîcheur Intense',
        bannerImage: '/assets/images/bottle-pasteque.png',
        featured: false,
        sortOrder: 4
      }
    ];
  }

  public getDefaultCustomPages(): CmsCustomPage[] {
    return [
      {
        id: 'recettes-cocktails',
        title: 'Cocktails & Mocktails Signatures Nidj Juice',
        subtitle: 'Sublimez vos apéritifs, brunchs et célébrations avec nos nectars 100% camerounais',
        metaDescription: 'Découvrez des recettes exclusives de cocktails et mocktails rafraîchissants à base de Bissap et Ananas Nidj Juice.',
        heroBannerImage: '/assets/images/gallery-1.webp',
        content: `
          <div class="custom-page-intro">
            <p class="lead-paragraph">
              Parce que nos nectars sont 100% naturels, ils constituent une base d'une richesse aromatique incomparable pour créer des mocktails sains et des cocktails festifs uniques à partager.
            </p>
          </div>

          <div class="recipe-card-grid">
            <div class="recipe-card">
              <span class="recipe-badge">Mocktail Sans Alcool</span>
              <h3>Le Royal Bissap Spritz</h3>
              <p>Une version revisitée du spritz sans alcool, alliant la profondeur pourpre de l'hibiscus et la fraîcheur pétillante des agrumes.</p>
              <ul>
                <li><strong>15 cl</strong> de Cocktail de Bissap Nidj Juice</li>
                <li><strong>10 cl</strong> d'eau gazeuse fraîche ou tonic</li>
                <li><strong>3 cl</strong> de jus de citron vert frais</li>
                <li>Feuilles de menthe fraîche et glaçons</li>
              </ul>
            </div>

            <div class="recipe-card">
              <span class="recipe-badge">Énergie & Vitalité</span>
              <h3>L'Ananas Ginger Glow</h3>
              <p>Le punch fruité et vivifiant qui réveille toutes les tables lors des brunchs et réceptions conviviales.</p>
              <ul>
                <li><strong>20 cl</strong> de Jus Ananas Gingembre Nidj Juice</li>
                <li><strong>5 cl</strong> de jus d'orange pressée</li>
                <li>Une rondelle d'orange déshydratée</li>
                <li>Zeste de citron vert râpé</li>
              </ul>
            </div>
          </div>
        `,
        ctaText: 'Commander nos nectars',
        ctaLink: '/saveurs',
        showInNav: true,
        showInFooter: true,
        isPublished: true,
        lastModified: new Date().toISOString()
      },
      {
        id: 'mentions-legales',
        title: 'Mentions Légales & Charte de Qualité',
        subtitle: 'Informations juridiques, engagements sanitaires et gouvernance Société Nidjeu',
        metaDescription: 'Mentions légales, agréments sanitaires et politique de transparence de la Société Nidjeu et de la marque Nidj Juice.',
        heroBannerImage: '/assets/images/gallery-2.webp',
        content: `
          <div class="legal-content-block">
            <h3>1. Éditeur du Site</h3>
            <p>Le présent site officiel est édité par la <strong>Société Nidjeu S.A.</strong>, entreprise agroalimentaire immatriculée au Registre du Commerce et du Crédit Mobilier de Douala, Cameroun.</p>
            <p><strong>Siège social :</strong> Douala, Littoral, République du Cameroun.<br>
            <strong>Téléphone officiel :</strong> +237 6 77 42 66 12<br>
            <strong>Email officiel :</strong> contact@nidj-juice.cm</p>

            <h3>2. Normes Agroalimentaires & Contrôle Qualité</h3>
            <p>Tous les jus et nectars commercialisés sous la marque <strong>Nidj Juice</strong> sont fabriqués et embouteillés dans le strict respect des normes d'hygiène et de sécurité alimentaire en vigueur au Cameroun et aux standards internationaux (HACCP). Nos lignes de production subissent des contrôles microbiologiques continus garantissant l'absence totale de conservateurs chimiques de synthèse.</p>

            <h3>3. Propriété Intellectuelle</h3>
            <p>La marque « Nidj Juice », les logos, designs d'étiquettes, bouteilles et visuels présentés sur ce site sont la propriété exclusive de la Société Nidjeu. Toute reproduction totale ou partielle sans autorisation préalable écrite est formellement interdite.</p>
          </div>
        `,
        ctaText: 'Nous contacter',
        ctaLink: '/contact',
        showInNav: false,
        showInFooter: true,
        isPublished: true,
        lastModified: new Date().toISOString()
      }
    ];
  }

  // --- Getters ---
  public getAllData(): CmsDatabase {
    return { ...this.db };
  }

  public getProducts(): ShowcaseProduct[] {
    return [...this.db.products];
  }

  public getProductById(id: string): ShowcaseProduct | undefined {
    return this.db.products.find((p) => p.id === id);
  }

  public getCollections(): JuiceCollection[] {
    return [...(this.db.collections || [])];
  }

  public getCollectionById(id: string): JuiceCollection | undefined {
    return (this.db.collections || []).find((c) => c.id === id);
  }

  public getCustomPages(): CmsCustomPage[] {
    return [...(this.db.customPages || [])];
  }

  public getPublishedCustomPages(): CmsCustomPage[] {
    return (this.db.customPages || []).filter((p) => p.isPublished);
  }

  public getCustomPageBySlug(slug: string): CmsCustomPage | undefined {
    const clean = slug.replace(/^\/page\//, '').replace(/^\//, '');
    return (this.db.customPages || []).find((p) => p.id === clean);
  }

  public getStores(): StoreLocation[] {
    return [...this.db.stores];
  }

  public getGalleryItems(): GalleryItem[] {
    return [...this.db.galleryItems];
  }

  public getVideoReels(): VideoReel[] {
    return [...this.db.videoReels];
  }

  public getHeroContent(): HeroContent {
    return { ...this.db.hero };
  }

  public getCompanyContent(): CompanyContent {
    return { ...this.db.company };
  }

  public getEngagementsContent(): EngagementsContent {
    return { ...this.db.engagements };
  }

  public getFaqs(): FaqItem[] {
    return [...this.db.faqs];
  }

  public getSettings(): SiteSettings {
    return { ...this.db.settings };
  }

  // --- Setters / Mutations ---
  public async saveProduct(product: ShowcaseProduct): Promise<{ success: boolean; cloudSynced: boolean; message: string }> {
    const idx = this.db.products.findIndex((p) => p.id === product.id);
    if (idx >= 0) {
      this.db.products[idx] = { ...product };
    } else {
      this.db.products.push({ ...product });
    }
    return await this.persist();
  }

  public deleteProduct(id: string): boolean {
    if (this.db.products.length <= 1) {
      return false; // Prevent deleting all products
    }
    this.db.products = this.db.products.filter((p) => p.id !== id);
    void this.persist();
    return true;
  }

  public async saveCollection(collection: JuiceCollection): Promise<{ success: boolean; cloudSynced: boolean; message: string }> {
    if (!this.db.collections) this.db.collections = [];
    const idx = this.db.collections.findIndex((c) => c.id === collection.id);
    if (idx >= 0) {
      this.db.collections[idx] = { ...collection };
    } else {
      this.db.collections.push({ ...collection });
    }
    return await this.persist();
  }

  public deleteCollection(id: string): boolean {
    if (!this.db.collections || this.db.collections.length <= 1) {
      return false; // Prevent deleting all collections
    }
    this.db.collections = this.db.collections.filter((c) => c.id !== id);
    void this.persist();
    return true;
  }

  public async saveCustomPage(page: CmsCustomPage): Promise<{ success: boolean; cloudSynced: boolean; message: string }> {
    if (!this.db.customPages) this.db.customPages = [];
    page.lastModified = new Date().toISOString();
    const idx = this.db.customPages.findIndex((p) => p.id === page.id);
    if (idx >= 0) {
      this.db.customPages[idx] = { ...page };
    } else {
      this.db.customPages.push({ ...page });
    }
    return await this.persist();
  }

  public deleteCustomPage(id: string): boolean {
    if (!this.db.customPages) return false;
    this.db.customPages = this.db.customPages.filter((p) => p.id !== id);
    void this.persist();
    return true;
  }

  public async saveStore(store: StoreLocation): Promise<{ success: boolean; cloudSynced: boolean; message: string }> {
    const idx = this.db.stores.findIndex((s) => s.id === store.id);
    if (idx >= 0) {
      this.db.stores[idx] = { ...store };
    } else {
      this.db.stores.push({ ...store });
    }
    return await this.persist();
  }

  public deleteStore(id: string): void {
    this.db.stores = this.db.stores.filter((s) => s.id !== id);
    void this.persist();
  }

  public async saveGalleryItem(item: GalleryItem): Promise<{ success: boolean; cloudSynced: boolean; message: string }> {
    const idx = this.db.galleryItems.findIndex((g) => g.id === item.id);
    if (idx >= 0) {
      this.db.galleryItems[idx] = { ...item };
    } else {
      this.db.galleryItems.unshift({ ...item });
    }
    return await this.persist();
  }

  public deleteGalleryItem(id: string): void {
    this.db.galleryItems = this.db.galleryItems.filter((g) => g.id !== id);
    void this.persist();
  }

  public async saveVideoReel(reel: VideoReel): Promise<{ success: boolean; cloudSynced: boolean; message: string }> {
    const idx = this.db.videoReels.findIndex((r) => r.id === reel.id);
    if (idx >= 0) {
      this.db.videoReels[idx] = { ...reel };
    } else {
      this.db.videoReels.push({ ...reel });
    }
    return await this.persist();
  }

  public deleteVideoReel(id: string): void {
    this.db.videoReels = this.db.videoReels.filter((r) => r.id !== id);
    void this.persist();
  }

  public async saveHeroContent(hero: HeroContent): Promise<{ success: boolean; cloudSynced: boolean; message: string }> {
    this.db.hero = { ...hero };
    return await this.persist();
  }

  public async saveCompanyContent(company: CompanyContent): Promise<{ success: boolean; cloudSynced: boolean; message: string }> {
    this.db.company = { ...company };
    return await this.persist();
  }

  public async saveEngagementsContent(engagements: EngagementsContent): Promise<{ success: boolean; cloudSynced: boolean; message: string }> {
    this.db.engagements = { ...engagements };
    return await this.persist();
  }

  public async saveFaqs(faqs: FaqItem[]): Promise<{ success: boolean; cloudSynced: boolean; message: string }> {
    this.db.faqs = [...faqs];
    return await this.persist();
  }

  public async saveSettings(settings: SiteSettings): Promise<{ success: boolean; cloudSynced: boolean; message: string }> {
    this.db.settings = { ...settings };
    return await this.persist();
  }

  // --- Export / Import / Reset ---
  public exportBackupJson(): string {
    return JSON.stringify(this.db, null, 2);
  }

  public importBackupJson(jsonString: string): boolean {
    try {
      const parsed = JSON.parse(jsonString) as CmsDatabase;
      if (parsed && Array.isArray(parsed.products) && parsed.products.length > 0) {
        this.db = parsed;
        void this.persist();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  public resetToDefaults(): void {
    this.db = this.getDefaultDatabase();
    void this.persist();
  }

  // --- Cloud Sync Helpers ---
  public async syncToSupabase(): Promise<{ success: boolean; message: string }> {
    if (!supabaseService.isConfigured()) {
      return {
        success: false,
        message: 'Supabase n’est pas configuré. Veuillez renseigner l’URL et la clé API dans les Paramètres.'
      };
    }
    return await supabaseService.saveSiteData(this.db);
  }

  public async syncFromSupabase(): Promise<{ success: boolean; message: string }> {
    if (!supabaseService.isConfigured()) {
      return {
        success: false,
        message: 'Supabase n’est pas configuré.'
      };
    }
    const res = await supabaseService.loadSiteData();
    if (res.success && res.data) {
      this.db = res.data;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.db));
      window.dispatchEvent(
        new CustomEvent('nidj:cms-data-changed', {
          detail: { ...this.db }
        })
      );
      return {
        success: true,
        message: res.message || 'Données synchronisées avec succès depuis Supabase !'
      };
    }
    return {
      success: false,
      message: res.message || 'Échec de la récupération des données Supabase.'
    };
  }
}

export const cmsService = CmsService.getInstance();
