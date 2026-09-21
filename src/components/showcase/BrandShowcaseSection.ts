/* ==========================================================================
   NIDJ JUICE — BRAND SHOWCASE: SECTION ORCHESTRATOR
   Clean full-width conveyor stage with centered header and editorial panel
   ========================================================================== */

import { InfiniteCarousel } from './InfiniteCarousel';
import { ShowcaseInfo } from './ShowcaseInfo';
import { ShowcaseControls } from './ShowcaseControls';
import { cmsService } from '../../services/cms.service';

export class BrandShowcaseSection {
  private element: HTMLElement;
  private carousel: InfiniteCarousel | null = null;
  private infoPanel: ShowcaseInfo;
  private controls: ShowcaseControls;
  private unsubscribeCms: (() => void) | null = null;

  constructor() {
    this.element = document.createElement('section');
    this.element.id = 'decouvrez-saveurs';
    this.element.className = 'section brand-showcase-section';
    this.element.setAttribute('aria-label', 'Laissez-vous tenter par nos saveurs');

    const products = cmsService.getProducts();

    this.infoPanel = new ShowcaseInfo();
    this.controls = new ShowcaseControls(products.length, {
      onPrev: () => this.carousel?.prev(),
      onNext: () => this.carousel?.next(),
      onSelectIndex: (idx) => this.carousel?.selectProductIndex(idx)
    });

    this.render();

    this.unsubscribeCms = cmsService.onDataChanged(() => {
      this.rebuildShowcase();
    });
  }

  private rebuildShowcase(): void {
    this.carousel?.destroy();
    this.carousel = null;
    const products = cmsService.getProducts();
    this.controls = new ShowcaseControls(products.length, {
      onPrev: () => this.carousel?.prev(),
      onNext: () => this.carousel?.next(),
      onSelectIndex: (idx) => this.carousel?.selectProductIndex(idx)
    });
    this.render();
  }

  public getElement(): HTMLElement {
    return this.element;
  }

  private render(): void {
    this.element.innerHTML = `
      <div class="showcase-background-glow" aria-hidden="true"></div>

      <!-- Top Header centered in container -->
      <div class="container showcase-header-container">
        <div class="section-header showcase-header">
          <div class="showcase-header-tag">
            <span>COLLECTION OFFICIELLE</span>
          </div>
          <h2 class="section-title showcase-title">Laissez-vous tenter par nos saveurs</h2>
          <p class="section-subtitle showcase-subtitle">
            Une expérience sensorielle unique issue des meilleurs terroirs du Cameroun. 
            Découvrez nos nectars 100% naturels élaborés avec fierté par la Société Nidjeu.
          </p>
        </div>
      </div>

      <!-- Full-Width 100% Horizontal Conveyor Stage -->
      <div class="showcase-stage-wrap">
        <div class="showcase-carousel-viewport" id="showcaseViewport" role="region" aria-roledescription="carousel" aria-label="Galerie des bouteilles NIDJ Juice">
          <!-- InfiniteCarousel attaches .showcase-track here -->
        </div>

        <div class="showcase-edge-fade edge-fade-left" aria-hidden="true"></div>
        <div class="showcase-edge-fade edge-fade-right" aria-hidden="true"></div>
      </div>

      <!-- Bottom Controls & Synchronized Info centered in container -->
      <div class="container showcase-bottom-container">
        <div class="showcase-controls-container" id="showcaseControlsMount">
          <!-- ShowcaseControls inserted here -->
        </div>

        <div class="showcase-editorial-container" id="showcaseEditorialMount">
          <!-- ShowcaseInfo inserted here -->
        </div>
      </div>
    `;

    // Mount controls and info panel
    const controlsMount = this.element.querySelector('#showcaseControlsMount');
    if (controlsMount) {
      controlsMount.appendChild(this.controls.element);
    }

    const editorialMount = this.element.querySelector('#showcaseEditorialMount');
    if (editorialMount) {
      editorialMount.appendChild(this.infoPanel.element);
    }

    const products = cmsService.getProducts();

    // Set first product in editorial panel
    if (products.length > 0) {
      this.infoPanel.updateProduct(products[0]);
    }

    // Initialize Infinite Carousel on full-width viewport
    const viewport = this.element.querySelector('#showcaseViewport') as HTMLElement;
    if (viewport) {
      this.carousel = new InfiniteCarousel(viewport, products, {
        onActiveChange: (product, index) => {
          this.infoPanel.updateProduct(product);
          this.controls.setActiveIndex(index);
        }
      });
    }
  }

  public destroy(): void {
    this.carousel?.destroy();
    if (this.unsubscribeCms) {
      this.unsubscribeCms();
      this.unsubscribeCms = null;
    }
  }
}
