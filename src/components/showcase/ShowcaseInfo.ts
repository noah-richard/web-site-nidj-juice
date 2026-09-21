/* ==========================================================================
   NIDJ JUICE — BRAND SHOWCASE: EDITORIAL INFO PANEL
   Synchronized product text with smooth fade & subtle translate animation
   ========================================================================== */

import type { ShowcaseProduct } from './showcase.types';
import { audioController } from '../../features/audio-controller';

export class ShowcaseInfo {
  public readonly element: HTMLElement;
  private currentProduct: ShowcaseProduct | null = null;
  private isTransitioning: boolean = false;

  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'showcase-info-panel';
    this.element.setAttribute('aria-live', 'polite');
    this.element.setAttribute('aria-atomic', 'true');
  }

  public updateProduct(product: ShowcaseProduct): void {
    if (this.currentProduct?.id === product.id) return;
    this.currentProduct = product;

    if (this.isTransitioning) return;
    this.isTransitioning = true;

    // Smooth exit (fade out + slight upward drift)
    this.element.classList.add('is-animating-out');

    setTimeout(() => {
      this.renderContent(product);
      this.element.classList.remove('is-animating-out');
      this.element.classList.add('is-animating-in');

      setTimeout(() => {
        this.element.classList.remove('is-animating-in');
        this.isTransitioning = false;
      }, 280);
    }, 180);
  }

  private renderContent(product: ShowcaseProduct): void {
    this.element.innerHTML = `
      <div class="showcase-info-content">
        <!-- Flavor Subtitle / Category -->
        <span class="showcase-subtitle-tag" style="--tag-color: ${product.accentColor};">
          ${product.tastingHint}
        </span>

        <!-- Main Product Title -->
        <h3 class="showcase-product-title">${product.name}</h3>

        <!-- Editorial Tagline & Description -->
        <p class="showcase-product-tagline">${product.tagline}</p>
        <p class="showcase-product-description">${product.description}</p>

        <!-- Trust Badges -->
        <div class="showcase-badges-row" aria-label="Engagements qualité">
          ${product.badges.map(badge => `
            <span class="showcase-badge">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              ${badge}
            </span>
          `).join('')}
        </div>

        <!-- Conversion Action Button -->
        <div class="showcase-action-row">
          <a 
            href="/saveurs/${product.id}" 
            class="btn btn-primary btn-showcase-explore" 
            style="background: ${product.accentColor}; border-color: ${product.accentColor};"
          >
            <span>Explorer la page dédiée</span>
            <span class="btn-arrow-circle" aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </span>
          </a>

          <button type="button" class="btn btn-outline btn-showcase-order" data-flavor-id="${product.id}">
            <span>Commander</span>
          </button>
        </div>
      </div>
    `;

    // Bind order button event
    const orderBtn = this.element.querySelector('.btn-showcase-order');
    orderBtn?.addEventListener('click', () => {
      audioController.playPop();
      window.dispatchEvent(
        new CustomEvent('nidj:open-order-modal', {
          detail: { storeHint: product.name }
        })
      );
    });
  }
}
