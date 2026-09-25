import { cmsService } from '../services/cms.service';

export type RoutePath =
  | '/'
  | '/entreprise'
  | '/saveurs'
  | '/saveurs/cocktail-bissap'
  | '/saveurs/ananas-gingembre'
  | '/saveurs/pur-ananas'
  | '/saveurs/pasteque-orange'
  | '/engagements'
  | '/points-de-vente'
  | '/b2b'
  | '/contact'
  | '/galerie'
  | '/nidj-juice-backoffice'
  | (string & {});

export interface RouteInfo {
  path: RoutePath;
  title: string;
  description: string;
}

export const ROUTES_METADATA: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Nidj Juice — 100% Jus Naturels Fabriqués au Cameroun | Société Nidjeu',
    description: 'Découvrez Nidj Juice, la marque référence de jus 100% naturels pressés et embouteillés au Cameroun par la Société Nidjeu.'
  },
  '/entreprise': {
    title: 'L’Entreprise — Société Nidjeu | Histoire, Savoir-Faire & Vision',
    description: 'Découvrez l’histoire, la raison d’être, la gouvernance camerounaise et les normes d’excellence de la Société Nidjeu.'
  },
  '/saveurs': {
    title: 'Nos Saveurs — Collection Officielle Nidj Juice | Nectars 100% Purs',
    description: 'Explorez nos nectars 100% naturels : Cocktail de Bissap, Ananas Gingembre, Pur Ananas et Pastèque Orange.'
  },
  '/saveurs/cocktail-bissap': {
    title: 'Cocktail de Bissap — Infusion Royale d’Hibiscus | Nidj Juice',
    description: 'Découvrez notre Cocktail de Bissap signature : infusion de calices d’hibiscus du Grand Nord, menthe et jus d’ananas frais 100% naturel.'
  },
  '/saveurs/ananas-gingembre': {
    title: 'Jus d’Ananas Gingembre — Énergie & Vitalité Pure | Nidj Juice',
    description: 'Découvrez notre Jus d’Ananas Gingembre : ananas mûrs des terroirs camerounais et gingembre frais pressé pour un tonus vivifiant.'
  },
  '/saveurs/pur-ananas': {
    title: 'Pur Jus d’Ananas — La Douceur Solaire du Cameroun | Nidj Juice',
    description: '100% Pur Jus d’Ananas extrait à froid au Cameroun. Zéro sucre ajouté, zéro conservateur, toute la pulpe veloutée du fruit frais.'
  },
  '/saveurs/pasteque-orange': {
    title: 'Nectar Pastèque Orange — Fraîcheur & Hydratation Maximale | Nidj Juice',
    description: 'La rencontre rafraîchissante de la pastèque juteuse et de l’orange vitaminée. Un nectar 100% naturel idéal pour les journées ensoleillées.'
  },
  '/engagements': {
    title: 'Nos Engagements RSE & Durabilité — Société Nidjeu',
    description: 'Découvrez nos engagements en circuits courts, le soutien aux coopératives agricoles du Cameroun et notre programme éco-responsable.'
  },
  '/points-de-vente': {
    title: 'Points de Vente Officiels au Cameroun — Nidj Juice',
    description: 'Trouvez les supermarchés, boutiques et lounges partenaires à Douala, Yaoundé, Bafoussam et Kribi où savourer Nidj Juice.'
  },
  '/b2b': {
    title: 'Espace B2B, CHR & Revendeurs Agréés — Société Nidjeu',
    description: 'Rejoignez le réseau de distribution officiel de Nidj Juice. Tarifs grossistes exclusifs et logistique réfrigérée au Cameroun.'
  },
  '/contact': {
    title: 'Contact Officiel & Service Consommateurs — Société Nidjeu',
    description: 'Contactez la Société Nidjeu à Douala et Yaoundé. Hotline WhatsApp, service client et informations institutionnelles.'
  },
  '/galerie': {
    title: 'Galerie & Événements — Dégustations & Moments Consommateurs | Nidj Juice',
    description: 'Revivez nos dégustations officielles, salons gastronomiques et les moments partagés par nos consommateurs à Douala, Yaoundé et Kribi.'
  },
  '/nidj-juice-backoffice': {
    title: 'Panneau d’Administration CMS — Société Nidjeu | Nidj Juice Backoffice',
    description: 'Interface de gestion et administration du site officiel Société Nidjeu / Nidj Juice.'
  }
};

export class Router {
  private static instance: Router | null = null;
  private currentPath: RoutePath = '/';
  private onRouteChangeCallback: ((path: RoutePath, hash: string) => void) | null = null;

  constructor() {
    if (Router.instance) {
      return Router.instance;
    }
    Router.instance = this;
  }

  public static getInstance(): Router {
    if (!Router.instance) {
      Router.instance = new Router();
    }
    return Router.instance;
  }

  public init(callback: (path: RoutePath, hash: string) => void): void {
    this.onRouteChangeCallback = callback;

    // Listen for browser Back/Forward navigation
    window.addEventListener('popstate', () => {
      this.handleUrlChange(window.location.pathname, window.location.hash);
    });

    // Intercept clicks on links
    document.addEventListener('click', (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest('a');
      if (!link) return;

      const href = link.getAttribute('href');
      if (!href) return;

      // Ignore external links, mailto, tel, target="_blank"
      if (
        link.target === '_blank' ||
        href.startsWith('http://') ||
        href.startsWith('https://') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:')
      ) {
        return;
      }

      // Internal routing handling
      e.preventDefault();
      this.navigate(href);
    });

    // Initial load route handling
    this.handleUrlChange(window.location.pathname, window.location.hash, true);
  }

  private resolveRoute(rawPath: string): RoutePath {
    if (rawPath === '/marques' || rawPath === '/nos-saveurs') {
      return '/saveurs';
    } else if (rawPath === '/saveurs/bissap') {
      return '/saveurs/cocktail-bissap';
    } else if (rawPath === '/saveurs/ananas') {
      return '/saveurs/ananas-gingembre';
    } else if (rawPath === '/company' || rawPath === '/societe') {
      return '/entreprise';
    } else if (rawPath === '/stores' || rawPath === '/locator') {
      return '/points-de-vente';
    } else if (rawPath === '/rse' || rawPath === '/durabilite') {
      return '/engagements';
    } else if (rawPath === '/evenements' || rawPath === '/moments' || rawPath === '/gallery') {
      return '/galerie';
    } else if (rawPath === '/admin' || rawPath === '/backoffice' || rawPath === '/dashboard') {
      return '/nidj-juice-backoffice';
    } else if (rawPath.startsWith('/saveurs/')) {
      return rawPath;
    } else if (rawPath.startsWith('/page/')) {
      return rawPath;
    } else if (rawPath in ROUTES_METADATA) {
      return rawPath;
    }

    const customPage = cmsService.getCustomPageBySlug(rawPath);
    if (customPage) {
      return `/page/${customPage.id}`;
    }

    return '/';
  }

  public navigate(url: string): void {
    const urlObj = new URL(url, window.location.origin);
    let rawPath: string = urlObj.pathname;
    const hash = urlObj.hash;

    // Normalize path
    if (rawPath.endsWith('/') && rawPath.length > 1) {
      rawPath = rawPath.slice(0, -1);
    }

    const path = this.resolveRoute(rawPath);
    const fullUrl = path + hash;
    if (window.location.pathname + window.location.hash !== fullUrl) {
      window.history.pushState({}, '', fullUrl);
    }

    this.handleUrlChange(path, hash);
  }

  private handleUrlChange(pathname: string, hash: string, isInitial: boolean = false): void {
    let rawPath: string = pathname;
    if (rawPath.endsWith('/') && rawPath.length > 1) {
      rawPath = rawPath.slice(0, -1);
    }

    const normalized = this.resolveRoute(rawPath);
    this.currentPath = normalized;

    // Update document title and meta description dynamically
    let title = 'Nidj Juice — 100% Jus Naturels Fabriqués au Cameroun | Société Nidjeu';
    let description = 'Découvrez Nidj Juice, la marque référence de jus 100% naturels pressés et embouteillés au Cameroun par la Société Nidjeu.';

    if (normalized.startsWith('/page/')) {
      const customPage = cmsService.getCustomPageBySlug(normalized);
      if (customPage) {
        title = `${customPage.title} — Société Nidjeu | Nidj Juice`;
        description = customPage.metaDescription || customPage.subtitle || description;
      }
    } else if (normalized.startsWith('/saveurs/')) {
      const prodId = normalized.replace('/saveurs/', '');
      const prod = cmsService.getProductById(prodId);
      if (prod) {
        title = `${prod.name} — ${prod.subtitle || 'Collection Officielle'} | Nidj Juice`;
        description = prod.description || description;
      }
    } else if (ROUTES_METADATA[normalized]) {
      const meta = ROUTES_METADATA[normalized];
      title = meta.title;
      description = meta.description;
    }

    document.title = title;
    const descEl = document.querySelector('meta[name="description"]');
    if (descEl) {
      descEl.setAttribute('content', description);
    }

    // Inform App orchestrator
    if (this.onRouteChangeCallback) {
      this.onRouteChangeCallback(normalized, hash);
    }

    // Handle scroll behavior
    if (hash) {
      setTimeout(() => {
        const target = document.querySelector(hash);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: isInitial ? 'auto' : 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: isInitial ? 'auto' : 'smooth' });
    }

    // Dispatch global route event
    window.dispatchEvent(
      new CustomEvent('nidj:route-changed', {
        detail: { path: normalized, hash }
      })
    );
  }

  public getCurrentPath(): RoutePath {
    return this.currentPath;
  }
}

export const router = Router.getInstance();
