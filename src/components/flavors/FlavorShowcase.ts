/* ==========================================================================
   NIDJ JUICE — FLAVORS SHOWCASE (MOCKUP COMPLIANT)
   Horizontal 3-card layout: Circular halos, floating fruits, pill CTAs & dots
   ========================================================================== */

import { themeController } from '../../features/theme-controller';
import { audioController } from '../../features/audio-controller';
import { cmsService } from '../../services/cms.service';
import type { FlavorId } from '../../types/product.types';

export class FlavorShowcase {
  private element: HTMLElement;
  private unsubscribeCms: (() => void) | null = null;

  constructor() {
    this.element = document.createElement('section');
    this.element.id = 'flavors';
    this.element.className = 'section assortment-section';
    this.render();
    this.bindEvents();
  }

  public getElement(): HTMLElement {
    return this.element;
  }

  private render(): void {
    const products = cmsService.getProducts();
    const ananas = products.find((p) => p.id === 'ananas-gingembre' || p.id === 'ananas') || products[1] || products[0];
    const bissap = products.find((p) => p.id === 'cocktail-bissap' || p.id === 'bissap') || products[0];

    this.element.innerHTML = `
      <div class="container">
        
        <!-- Centered Section Title matching Mockup -->
        <div class="section-header">
          <h2 class="section-title">Nos Saveurs</h2>
          <p class="section-subtitle">
            Découvrez la collection officielle de jus 100% naturels pressés et élaborés au Cameroun par la Société Nidjeu.
          </p>
        </div>

        <!-- 3 Product Cards matching Mockup -->
        <div class="assortment-cards-row">
          
          <!-- Card 1: Jus d'Ananas Gingembre -->
          <article class="assortment-card card-ananas" data-flavor-id="ananas">
            <h3 class="sr-only">Nidj Juice — ${ananas?.name || "Jus d'Ananas Gingembre"}</h3>
            <div class="card-halo halo-ananas" aria-hidden="true"></div>
            
            <div class="card-visual-stage">
              <img 
                src="${ananas?.bottleImage || '/assets/images/bottle-ananas.png'}" 
                alt="Bouteille Nidj Juice ${ananas?.name || "Jus d'Ananas Gingembre"}" 
                class="assortment-bottle-img"
                loading="lazy"
              />
            </div>

            <div class="card-action-box">
              <button type="button" class="btn btn-pill-flavor btn-pill-ananas" data-select-flavor="ananas">
                <span>${ananas?.name || 'Ananas Gingembre'}</span>
                <span class="btn-arrow-circle" aria-hidden="true">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </span>
              </button>
            </div>
          </article>

          <!-- Card 2: Cocktail de Bissap -->
          <article class="assortment-card card-bissap is-active" data-flavor-id="bissap">
            <h3 class="sr-only">Nidj Juice — ${bissap?.name || 'Cocktail de Bissap'}</h3>
            <div class="card-halo halo-bissap" aria-hidden="true"></div>
            
            <div class="card-visual-stage">
              <img 
                src="${bissap?.bottleImage || '/assets/images/bottle-bissap.png'}" 
                alt="Bouteille Nidj Juice ${bissap?.name || 'Cocktail de Bissap'}" 
                class="assortment-bottle-img"
                loading="lazy"
              />
            </div>

            <div class="card-action-box">
              <button type="button" class="btn btn-pill-flavor btn-pill-bissap" data-select-flavor="bissap">
                <span>${bissap?.name || 'Cocktail de Bissap'}</span>
                <span class="btn-arrow-circle" aria-hidden="true">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </span>
              </button>
            </div>
          </article>

          <!-- Card 3: Pack Duo Découverte -->
          <article class="assortment-card card-duo" data-flavor-id="duo">
            <h3 class="sr-only">Nidj Juice — Pack Découverte Duo</h3>
            <div class="card-halo halo-duo" aria-hidden="true"></div>
            
            <div class="card-visual-stage duo-stage">
              <img 
                src="${bissap?.bottleImage || '/assets/images/bottle-bissap.png'}" 
                alt="Pack Découverte Nidj Juice" 
                class="assortment-bottle-img bottle-left"
                loading="lazy"
              />
              <img 
                src="${ananas?.bottleImage || '/assets/images/bottle-ananas.png'}" 
                alt="Pack Découverte Nidj Juice" 
                class="assortment-bottle-img bottle-right"
                loading="lazy"
              />
            </div>

            <div class="card-action-box">
              <button type="button" class="btn btn-pill-flavor btn-pill-duo" data-select-flavor="duo">
                <span>Pack Découverte</span>
                <span class="btn-arrow-circle" aria-hidden="true">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </span>
              </button>
            </div>
          </article>

        </div>

        <!-- Pagination Dots matching Mockup -->
        <div class="assortment-dots" aria-hidden="true">
          <span class="dot is-active"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </div>

      </div>
    `;
  }

  private bindEvents(): void {
    const buttons = this.element.querySelectorAll('.btn-pill-flavor');
    buttons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        const flavorId = target.dataset.selectFlavor as FlavorId | 'duo';
        
        audioController.playPop();

        if (flavorId === 'bissap' || flavorId === 'ananas') {
          themeController.setFlavor(flavorId);
        } else {
          // Trigger order modal with duo pack preselected
          window.dispatchEvent(
            new CustomEvent('nidj:open-order-modal', {
              detail: { storeHint: 'Pack Mixte Découverte' }
            })
          );
        }

        // Scroll smoothly to hero or trigger modal
        const hero = document.getElementById('hero');
        hero?.scrollIntoView({ behavior: 'smooth' });
      });
    });

    themeController.subscribe((newFlavor) => {
      this.element.querySelectorAll('.assortment-card').forEach((card) => {
        const match = (card as HTMLElement).dataset.flavorId === newFlavor;
        card.classList.toggle('is-active', match);
      });
    });

    if (!this.unsubscribeCms) {
      this.unsubscribeCms = cmsService.onDataChanged(() => {
        this.render();
        this.bindEvents();
      });
    }
  }

  public destroy(): void {
    if (this.unsubscribeCms) {
      this.unsubscribeCms();
      this.unsubscribeCms = null;
    }
  }
}
