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

export class App {
  private root: HTMLElement;
  private header: Header | null = null;
  private mainElement: HTMLElement | null = null;
  private footer: Footer | null = null;
  private orderModal: OrderModal | null = null;
  private ambientCanvas: AmbientCanvas | null = null;
  private currentPageInstance: { destroy?: () => void } | null = null;

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
      this.renderRoute(path, hash);
    });
  }

  private renderRoute(path: RoutePath, _hash: string): void {
    if (!this.mainElement) return;

    // Clean up previous page if needed
    if (this.currentPageInstance && typeof this.currentPageInstance.destroy === 'function') {
      this.currentPageInstance.destroy();
    }

    this.mainElement.style.opacity = '0';

    setTimeout(() => {
      if (!this.mainElement) return;
      this.mainElement.innerHTML = '';

      let pageComponent: { getElement: () => HTMLElement; destroy?: () => void };

      switch (path) {
        case '/entreprise':
          pageComponent = new CompanyPage();
          break;
        case '/saveurs':
          pageComponent = new FlavorsPage();
          break;
        case '/engagements':
          pageComponent = new EngagementsPage();
          break;
        case '/points-de-vente':
          pageComponent = new LocationsPage();
          break;
        case '/b2b':
          pageComponent = new B2BPage();
          break;
        case '/contact':
          pageComponent = new ContactPage();
          break;
        case '/':
        default:
          pageComponent = new HomePage();
          break;
      }

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
  }

  public getAmbientCanvas(): AmbientCanvas | null {
    return this.ambientCanvas;
  }

  public getOrderModal(): OrderModal | null {
    return this.orderModal;
  }
}
