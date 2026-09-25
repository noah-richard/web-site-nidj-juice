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
import type { StoreLocation, VideoReel } from '../types/product.types';

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
}

export interface CmsDatabase {
  version: number;
  lastUpdated: string;
  products: ShowcaseProduct[];
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

  // --- Authentication State ---
  public isAuthenticated(): boolean {
    try {
      return sessionStorage.getItem(AUTH_KEY) === 'true' || localStorage.getItem(AUTH_KEY) === 'true';
    } catch {
      return false;
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
        sessionStorage.removeItem(AUTH_KEY);
        localStorage.removeItem(AUTH_KEY);
      }
    } catch (e) {
      console.error('Error saving auth state', e);
    }
  }

  // --- Storage Operations ---
  private loadFromStorage(): CmsDatabase | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.products) && parsed.products.length > 0) {
        return parsed as CmsDatabase;
      }
      return null;
    } catch (err) {
      console.warn('Failed to parse CMS database from localStorage, resetting to defaults.', err);
      return null;
    }
  }

  private persist(): void {
    try {
      this.db.lastUpdated = new Date().toISOString();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.db));
      window.dispatchEvent(
        new CustomEvent('nidj:cms-data-changed', {
          detail: { ...this.db }
        })
      );
    } catch (err) {
      console.error('Error saving CMS data to localStorage:', err);
    }
  }

  // --- Defaults Factory ---
  private getDefaultDatabase(): CmsDatabase {
    return {
      version: 1,
      lastUpdated: new Date().toISOString(),
      products: JSON.parse(JSON.stringify(SHOWCASE_PRODUCTS)),
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
        cloudinaryFolder: 'nidj_juice'
      }
    };
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
  public saveProduct(product: ShowcaseProduct): void {
    const idx = this.db.products.findIndex((p) => p.id === product.id);
    if (idx >= 0) {
      this.db.products[idx] = { ...product };
    } else {
      this.db.products.push({ ...product });
    }
    this.persist();
  }

  public deleteProduct(id: string): boolean {
    if (this.db.products.length <= 1) {
      return false; // Prevent deleting all products
    }
    this.db.products = this.db.products.filter((p) => p.id !== id);
    this.persist();
    return true;
  }

  public saveStore(store: StoreLocation): void {
    const idx = this.db.stores.findIndex((s) => s.id === store.id);
    if (idx >= 0) {
      this.db.stores[idx] = { ...store };
    } else {
      this.db.stores.push({ ...store });
    }
    this.persist();
  }

  public deleteStore(id: string): void {
    this.db.stores = this.db.stores.filter((s) => s.id !== id);
    this.persist();
  }

  public saveGalleryItem(item: GalleryItem): void {
    const idx = this.db.galleryItems.findIndex((g) => g.id === item.id);
    if (idx >= 0) {
      this.db.galleryItems[idx] = { ...item };
    } else {
      this.db.galleryItems.unshift({ ...item });
    }
    this.persist();
  }

  public deleteGalleryItem(id: string): void {
    this.db.galleryItems = this.db.galleryItems.filter((g) => g.id !== id);
    this.persist();
  }

  public saveVideoReel(reel: VideoReel): void {
    const idx = this.db.videoReels.findIndex((r) => r.id === reel.id);
    if (idx >= 0) {
      this.db.videoReels[idx] = { ...reel };
    } else {
      this.db.videoReels.push({ ...reel });
    }
    this.persist();
  }

  public deleteVideoReel(id: string): void {
    this.db.videoReels = this.db.videoReels.filter((r) => r.id !== id);
    this.persist();
  }

  public saveHeroContent(hero: HeroContent): void {
    this.db.hero = { ...hero };
    this.persist();
  }

  public saveCompanyContent(company: CompanyContent): void {
    this.db.company = { ...company };
    this.persist();
  }

  public saveEngagementsContent(engagements: EngagementsContent): void {
    this.db.engagements = { ...engagements };
    this.persist();
  }

  public saveFaqs(faqs: FaqItem[]): void {
    this.db.faqs = [...faqs];
    this.persist();
  }

  public saveSettings(settings: SiteSettings): void {
    this.db.settings = { ...settings };
    this.persist();
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
        this.persist();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  public resetToDefaults(): void {
    this.db = this.getDefaultDatabase();
    this.persist();
  }
}

export const cmsService = CmsService.getInstance();
