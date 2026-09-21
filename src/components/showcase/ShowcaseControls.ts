/* ==========================================================================
   NIDJ JUICE — BRAND SHOWCASE: CONTROLS & INDICATORS
   Accessible navigation arrows and discrete position dots
   ========================================================================== */

import { audioController } from '../../features/audio-controller';

export interface ShowcaseControlsCallbacks {
  onPrev: () => void;
  onNext: () => void;
  onSelectIndex: (index: number) => void;
}

export class ShowcaseControls {
  public readonly element: HTMLElement;
  private dots: HTMLElement[] = [];
  private totalItems: number;
  private callbacks: ShowcaseControlsCallbacks;

  constructor(totalItems: number, callbacks: ShowcaseControlsCallbacks) {
    this.totalItems = totalItems;
    this.callbacks = callbacks;

    this.element = document.createElement('div');
    this.element.className = 'showcase-controls-bar';
    this.render();
  }

  private render(): void {
    this.element.innerHTML = `
      <div class="showcase-controls-inner">
        <!-- Previous Button -->
        <button type="button" class="btn-showcase-nav btn-showcase-prev" aria-label="Saveur précédente">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        <!-- Position Dots Indicator -->
        <div class="showcase-dots" role="tablist" aria-label="Sélection des saveurs">
          ${Array.from({ length: this.totalItems }).map((_, i) => `
            <button 
              type="button" 
              role="tab"
              class="showcase-dot ${i === 0 ? 'is-active' : ''}" 
              data-dot-index="${i}"
              aria-label="Afficher la saveur ${i + 1}"
              aria-selected="${i === 0 ? 'true' : 'false'}"
            ></button>
          `).join('')}
        </div>

        <!-- Next Button -->
        <button type="button" class="btn-showcase-nav btn-showcase-next" aria-label="Saveur suivante">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    `;

    this.dots = Array.from(this.element.querySelectorAll('.showcase-dot'));

    // Bind event listeners
    const prevBtn = this.element.querySelector('.btn-showcase-prev');
    const nextBtn = this.element.querySelector('.btn-showcase-next');

    prevBtn?.addEventListener('click', () => {
      audioController.playPop();
      this.callbacks.onPrev();
    });

    nextBtn?.addEventListener('click', () => {
      audioController.playPop();
      this.callbacks.onNext();
    });

    this.dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        audioController.playPop();
        this.callbacks.onSelectIndex(idx);
      });
    });
  }

  public setActiveIndex(index: number): void {
    const normalizedIndex = ((index % this.totalItems) + this.totalItems) % this.totalItems;
    this.dots.forEach((dot, idx) => {
      const isActive = idx === normalizedIndex;
      dot.classList.toggle('is-active', isActive);
      dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
  }
}
