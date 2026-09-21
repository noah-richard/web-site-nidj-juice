/* ==========================================================================
   NIDJ JUICE — BRAND SHOWCASE: CARD COMPONENT
   Individual product card with circular halo, authentic bottle & brand typography
   ========================================================================== */

import type { ShowcaseProduct } from './showcase.types';

export class ShowcaseCard {
  public readonly element: HTMLElement;
  public readonly haloEl: HTMLElement;
  public readonly bottleEl: HTMLElement;
  public readonly watermarkEl: HTMLElement;
  public readonly ctaEl: HTMLElement;
  public readonly product: ShowcaseProduct;
  public readonly index: number;

  constructor(product: ShowcaseProduct, index: number) {
    this.product = product;
    this.index = index;

    this.element = document.createElement('article');
    this.element.className = 'showcase-card';
    this.element.setAttribute('role', 'group');
    this.element.setAttribute('aria-roledescription', 'slide');
    this.element.setAttribute('aria-label', `${product.name} — ${product.tagline}`);
    this.element.dataset.productId = product.id;
    this.element.dataset.index = index.toString();

    this.element.innerHTML = `
      <div class="showcase-card-inner">
        <!-- Brand Typography Name (Coca-Cola Showcase Style) -->
        <div class="showcase-brand-header">
          <span class="showcase-brand-name">${product.name}</span>
        </div>

        <!-- Bottle Stage with Circular Halo & Ground Shadow -->
        <div class="showcase-stage-disc">
          <div class="showcase-halo" style="--halo-color: ${product.haloColor}; --glow-color: ${product.glowColor};" aria-hidden="true"></div>
          
          <img 
            src="${product.bottleImage}" 
            alt="Bouteille NIDJ Juice ${product.name}" 
            class="showcase-bottle-img"
            loading="lazy"
            draggable="false"
          />

          <div class="showcase-bottle-shadow" aria-hidden="true"></div>

          <!-- Floating Pill CTA Button (Explorer ↗) -->
          <button type="button" class="showcase-floating-cta" aria-label="Découvrir ${product.name}">
            <span>Explorer</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6">
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </button>
        </div>
      </div>
    `;

    this.haloEl = this.element.querySelector('.showcase-halo') as HTMLElement;
    this.bottleEl = this.element.querySelector('.showcase-bottle-img') as HTMLElement;
    this.watermarkEl = this.element.querySelector('.showcase-brand-name') as HTMLElement;
    this.ctaEl = this.element.querySelector('.showcase-floating-cta') as HTMLElement;
  }

  /**
   * Updates visuals and depth hierarchy based on continuous distance from center
   */
  public updateVisuals(normDist: number, isCenter: boolean): void {
    const absDist = Math.abs(normDist);

    // Continuous smooth depth scaling
    let scale: number;
    let opacity: number;

    if (absDist < 0.5) {
      // Centered peak
      scale = 1.05 - absDist * 0.12;
      opacity = 1.0;
    } else if (absDist < 1.5) {
      // Immediate neighbors
      scale = 0.86 - (absDist - 0.5) * 0.14;
      opacity = 0.78 - (absDist - 0.5) * 0.28;
    } else {
      // Peripheral cards
      scale = Math.max(0.55, 0.72 - (absDist - 1.5) * 0.10);
      opacity = Math.max(0.18, 0.50 - (absDist - 1.5) * 0.25);
    }

    this.element.classList.toggle('is-center', isCenter);
    this.element.classList.toggle('is-near', absDist >= 0.5 && absDist < 1.5);
    this.element.classList.toggle('is-far', absDist >= 1.5);

    // Update typography color & opacity
    if (this.watermarkEl) {
      this.watermarkEl.style.opacity = isCenter ? '1.0' : (absDist < 1.5 ? '0.55' : '0.28');
      this.watermarkEl.style.color = isCenter ? '#162B1D' : '#64748B';
    }

    // Apply continuous opacity and depth
    this.element.style.opacity = opacity.toFixed(3);
    this.element.style.zIndex = Math.round(100 - absDist * 15).toString();

    // Scale inner container
    const inner = this.element.firstElementChild as HTMLElement;
    if (inner) {
      inner.style.transform = `scale(${scale.toFixed(3)})`;
    }
  }
}
