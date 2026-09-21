/* ==========================================================================
   NIDJ JUICE — APPLICATION ORCHESTRATOR & ROUTER INTEGRATION
   FMCG Corporate Standard • Multi-Page SPA Architecture
   ========================================================================== */

import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { OrderModal } from '../components/order/OrderModal';
import { AmbientCanvas } from '../features/ambient-canvas';
import { audioController } from '../features/audio-controller';
import { router, type RoutePath } from '../router/Router';

import { HomePage } from '../pages/HomePage';
import { CompanyPage } from '../pages/CompanyPage';
import { FlavorsPage } from '../pages/FlavorsPage';
import { EngagementsPage } from '../pages/EngagementsPage';
import { LocationsPage } from '../pages/LocationsPage';
import { B2BPage } from '../pages/B2BPage';
import { ContactPage } from '../pages/ContactPage';
import { GalleryPage } from '../pages/GalleryPage';
import { ProductDetailPage } from '../pages/ProductDetailPage';
import { BackofficePage } from '../pages/BackofficePage';

export class App {
  private root: HTMLElement;
  private header: Header | null = null;
  private mainElement: HTMLElement | null = null;
  private footer: Footer | null = null;
  private orderModal: OrderModal | null = null;
  private ambientCanvas: AmbientCanvas | null = null;
  private currentPageInstance: { destroy?: () => void } | null = null;

  private currentPath: RoutePath = '/';
  private currentHash: string = '';

  constructor(root: HTMLElement) {
    this.root = root;
  }

  public init(): void {
    this.root.innerHTML = '';

    // 0. Skip to content link
    const skipLink = document.createElement('a');
    skipLink.href = '#mainContent';
    skipLink.className = 'skip-to-content';
    skipLink.textContent = 'Passer directement au contenu';
    this.root.appendChild(skipLink);

    // 1. Ambient Dynamic Bubble Canvas
    const canvas = document.createElement('canvas');
    canvas.id = 'ambientCanvas';
    canvas.className = 'ambient-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    this.root.appendChild(canvas);
    this.ambientCanvas = new AmbientCanvas(canvas);

    // 2. Global Light Header with Animated Mega-Menu
    this.header = new Header();
    this.root.appendChild(this.header.getElement());

    // 3. Main Dynamic Content Container
    this.mainElement = document.createElement('main');
    this.mainElement.id = 'mainContent';
    this.mainElement.style.minHeight = '70vh';
    this.mainElement.style.transition = 'opacity 0.2s ease';
    this.root.appendChild(this.mainElement);

    // 4. Wavy Deep Green Footer
    this.footer = new Footer();
    this.root.appendChild(this.footer.getElement());

    // 5. Conversion Order Modal
    this.orderModal = new OrderModal();
    this.root.appendChild(this.orderModal.getElement());

    // 6. Global Event Orchestration
    this.bindGlobalEvents();

    // 7. Initialize Router and mount initial route
    router.init((path: RoutePath, hash: string) => {
      this.currentPath = path;
      this.currentHash = hash;
      this.renderRoute(path, hash);
    });
  }

  private createPageComponent(path: RoutePath): { getElement: () => HTMLElement; destroy?: () => void } {
    if (path.startsWith('/saveurs/')) {
      return new ProductDetailPage(path);
    }
    switch (path) {
      case '/nidj-juice-backoffice':
        return new BackofficePage();
      case '/entreprise':
        return new CompanyPage();
      case '/saveurs':
        return new FlavorsPage();
      case '/engagements':
        return new EngagementsPage();
      case '/points-de-vente':
        return new LocationsPage();
      case '/b2b':
        return new B2BPage();
      case '/contact':
        return new ContactPage();
      case '/galerie':
        return new GalleryPage();
      case '/':
      default:
        return new HomePage();
    }
  }

  private renderRoute(path: RoutePath, _hash: string, silent: boolean = false): void {
    if (!this.mainElement) return;

    // Clean up previous page if needed
    if (this.currentPageInstance && typeof this.currentPageInstance.destroy === 'function') {
      this.currentPageInstance.destroy();
    }

    const isBackoffice = path === '/nidj-juice-backoffice';

    if (isBackoffice) {
      if (this.header) this.header.getElement().style.display = 'none';
      if (this.footer) this.footer.getElement().style.display = 'none';
      const canvasEl = document.getElementById('ambientCanvas');
      if (canvasEl) canvasEl.style.display = 'none';
      this.ambientCanvas?.stop();
    } else {
      if (this.header) this.header.getElement().style.display = '';
      if (this.footer) this.footer.getElement().style.display = '';
      const canvasEl = document.getElementById('ambientCanvas');
      if (canvasEl) canvasEl.style.display = '';
      this.ambientCanvas?.start();
    }

    // If silent live-refresh (from real-time CMS update), instantly replace DOM without transition delay
    if (silent) {
      const pageComponent = this.createPageComponent(path);
      this.currentPageInstance = pageComponent;
      this.mainElement.innerHTML = '';
      this.mainElement.appendChild(pageComponent.getElement());
      return;
    }

    this.mainElement.style.opacity = '0';

    setTimeout(() => {
      if (!this.mainElement) return;
      this.mainElement.innerHTML = '';

      const pageComponent = this.createPageComponent(path);
      this.currentPageInstance = pageComponent;
      this.mainElement.appendChild(pageComponent.getElement());
      this.mainElement.style.opacity = '1';
    }, 120);
  }

  private bindGlobalEvents(): void {
    this.root.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;

      const orderTrigger = target.closest(
        '#headerOrderBtn, #heroOrderBtn, #mobileDrawerOrderBtn, .open-order-modal-btn'
      );

      if (orderTrigger) {
        audioController.playDrop();
        this.orderModal?.open();
      }
    });

    // Custom event to open order modal with prefilled flavor/store
    window.addEventListener('nidj:open-order-modal', (e: Event) => {
      const customEvent = e as CustomEvent<{ storeHint?: string }>;
      audioController.playDrop();
      this.orderModal?.open(customEvent.detail?.storeHint);
    });

    // Real-time synchronization when CMS Backoffice is updated (in this tab or across tabs)
    window.addEventListener('nidj:cms-data-changed', () => {
      // 1. Refresh global components
      this.header?.refresh();
      this.footer?.refresh();
      this.orderModal?.refresh();

      // 2. If user is currently browsing any public page (not editing inside backoffice), live-refresh the page view
      if (this.currentPath !== '/nidj-juice-backoffice') {
        this.renderRoute(this.currentPath, this.currentHash, true);
      }
    });
  }

  public getAmbientCanvas(): AmbientCanvas | null {
    return this.ambientCanvas;
  }

  public getOrderModal(): OrderModal | null {
    return this.orderModal;
  }
}
