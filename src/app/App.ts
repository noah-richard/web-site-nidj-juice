/* ==========================================================================
   NIDJ JUICE — APPLICATION ORCHESTRATOR
   Assembled in exact alignment with official Eco-Fruits mock-up
   ========================================================================== */

import { Header } from '../components/layout/Header';
import { HeroSection } from '../components/hero/HeroSection';
import { StorySection } from '../components/story/StorySection';
import { BrandShowcaseSection } from '../components/showcase/BrandShowcaseSection';
import { FlavorShowcase } from '../components/flavors/FlavorShowcase';
import { PromoOrderBanner } from '../components/promo/PromoOrderBanner';
import { VideoReelsSection } from '../components/media/VideoReelsSection';
import { StoreLocator } from '../components/locator/StoreLocator';
import { Footer } from '../components/layout/Footer';
import { OrderModal } from '../components/order/OrderModal';
import { AmbientCanvas } from '../features/ambient-canvas';
import { audioController } from '../features/audio-controller';

export class App {
  private root: HTMLElement;
  private orderModal: OrderModal | null = null;
  private ambientCanvas: AmbientCanvas | null = null;

  constructor(root: HTMLElement) {
    this.root = root;
  }

  public init(): void {
    this.root.innerHTML = '';

    // 0. Skip to content accessibility link
    const skipLink = document.createElement('a');
    skipLink.href = '#mainContent';
    skipLink.className = 'skip-to-content';
    skipLink.textContent = 'Passer directement au contenu';
    this.root.appendChild(skipLink);

    // 1. Ambient Dynamic Bubble Canvas (Subtle background)
    const canvas = document.createElement('canvas');
    canvas.id = 'ambientCanvas';
    canvas.className = 'ambient-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    this.root.appendChild(canvas);
    this.ambientCanvas = new AmbientCanvas(canvas);

    // 2. Global Light Header
    const header = new Header();
    this.root.appendChild(header.getElement());

    // 3. Main Semantic Container
    const main = document.createElement('main');
    main.id = 'mainContent';

    // 4. Feature Sections matching Mockup Hierarchy
    const hero = new HeroSection();
    const about = new StorySection();
    const showcase = new BrandShowcaseSection();
    const flavors = new FlavorShowcase();
    const promo = new PromoOrderBanner();
    const reels = new VideoReelsSection();
    const locator = new StoreLocator();

    main.appendChild(hero.getElement());
    main.appendChild(about.getElement());
    main.appendChild(showcase.getElement());
    main.appendChild(flavors.getElement());
    main.appendChild(promo.getElement());
    main.appendChild(reels.getElement());
    main.appendChild(locator.getElement());

    this.root.appendChild(main);

    // 5. Wavy Deep Green Footer
    const footer = new Footer();
    this.root.appendChild(footer.getElement());

    // 6. Conversion Order Modal
    this.orderModal = new OrderModal();
    this.root.appendChild(this.orderModal.getElement());

    // 7. Global Event Orchestration
    this.bindGlobalEvents();
  }

  private bindGlobalEvents(): void {
    this.root.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;

      const orderTrigger = target.closest(
        '#headerOrderBtn, #heroOrderBtn, #mobileDrawerOrderBtn'
      );

      if (orderTrigger) {
        audioController.playDrop();
        this.orderModal?.open();
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
