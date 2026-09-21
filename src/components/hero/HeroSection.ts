/* ==========================================================================
   NIDJ JUICE — HERO EXPERIENCE (FAITHFUL TO OFFICIAL MOCKUP)
   Editorial layout: 01/02 indicator, split display typography,
   floating fruit splash & bottle, 3 circular trust badges, interactive dots.
   ========================================================================== */

import { FLAVORS_DATA } from '../../data/flavors.data';
import { themeController } from '../../features/theme-controller';
import { audioController } from '../../features/audio-controller';
import type { FlavorId } from '../../types/product.types';

export class HeroSection {
  private element: HTMLElement;
  private currentFlavorId: FlavorId = 'bissap';

  constructor() {
    this.element = document.createElement('section');
    this.element.id = 'hero';
    this.element.className = 'hero-section';
    this.render();
    this.bindEvents();
  }

  public getElement(): HTMLElement {
    return this.element;
  }

  private render(): void {
    const activeFlavor = FLAVORS_DATA.find((f) => f.id === this.currentFlavorId) || FLAVORS_DATA[0];
    const isBissap = this.currentFlavorId === 'bissap';

    this.element.innerHTML = `
      <div class="hero-container container">
        
        <!-- Left Column: Editorial Brand Headline & CTA -->
        <div class="hero-content">
          
          <!-- Top Counter Index (01 —— 02 /) -->
          <div class="hero-counter" aria-label="Index saveur">
            <span class="counter-num active-idx">${isBissap ? '01' : '02'}</span>
            <span class="counter-line"></span>
            <span class="counter-num total-idx">02 /</span>
          </div>

          <!-- Split Two-Tone Big Typography with Accessible SEO Brand Name -->
          <h1 class="hero-title">
            <span class="sr-only">Nidj Juice — </span>
            <span class="hero-title-word1" id="heroWord1">${isBissap ? 'Cocktail.' : 'Ananas.'}</span>
            <span class="hero-title-word2" id="heroWord2">${isBissap ? 'Bissap' : 'Gingembre'}</span>
          </h1>

          <p class="hero-subtitle">
            Jus 100% naturels pour un mode de vie sain et énergisant
          </p>
          <p class="hero-description" id="heroFlavorDesc">
            ${activeFlavor.description}
          </p>

          <!-- Buttons matching mockup -->
          <div class="hero-cta-group">
            <a href="#flavors" class="btn btn-primary btn-discover">
              <span>Découvrir</span>
              <span class="btn-arrow-circle" aria-hidden="true">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </span>
            </a>

            <button type="button" class="btn btn-outline" id="heroOrderBtn">
              <span>Commander</span>
            </button>
          </div>

          <!-- 3 Circular Trust Badges matching mockup -->
          <div class="hero-trust-badges">
            
            <div class="trust-badge-item">
              <div class="trust-badge-circle">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 2a10 10 0 0 0-7.07 17.07A10 10 0 1 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"></path>
                  <path d="M12 6c-3 0-5 2.5-5 5 0 3 3 5 5 7 2-2 5-4 5-7 0-2.5-2-5-5-5z"></path>
                </svg>
              </div>
              <span class="trust-badge-label">Ingrédients naturels</span>
            </div>

            <div class="trust-badge-item">
              <div class="trust-badge-circle">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
                </svg>
              </div>
              <span class="trust-badge-label">Sans colorant ni conservateur</span>
            </div>

            <div class="trust-badge-item">
              <div class="trust-badge-circle">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
                </svg>
              </div>
              <span class="trust-badge-label">Société Nidjeu • Cameroun</span>
            </div>

          </div>

        </div>

        <!-- Right Column: Hero Visual with Bottle, Splash & Fruit Slices -->
        <div class="hero-visual" id="heroVisualWrapper">
          
          <div class="hero-circle-aura" aria-hidden="true"></div>

          <!-- Dynamic Splash Image with Fruit Slices -->
          <img 
            src="${isBissap ? '/assets/images/splash-bissap.png' : '/assets/images/splash-ananas.png'}" 
            alt="Fruit Splash" 
            class="hero-splash-bg-img"
            id="heroSplashImg"
            aria-hidden="true"
          />

          <!-- Floating Bottle with 3D Tilt -->
          <div class="hero-bottle-stage" id="bottleStage">
            <img 
              src="${activeFlavor.bottleImage}" 
              alt="Bouteille Nidj Juice ${activeFlavor.name}" 
              class="hero-bottle-main"
              id="heroBottleImg"
            />
          </div>

          <!-- Interactive Pagination Dots (01 Bissap / 02 Ananas) -->
          <div class="hero-pagination-dots" role="tablist" aria-label="Changer de senteur">
            <button 
              type="button" 
              class="hero-dot-btn ${isBissap ? 'is-active' : ''}" 
              data-flavor="bissap" 
              role="tab" 
              aria-selected="${isBissap ? 'true' : 'false'}" 
              aria-label="Senteur Cocktail de Bissap"
            ></button>
            <button 
              type="button" 
              class="hero-dot-btn ${!isBissap ? 'is-active' : ''}" 
              data-flavor="ananas" 
              role="tab" 
              aria-selected="${!isBissap ? 'true' : 'false'}" 
              aria-label="Senteur Jus d'Ananas Gingembre"
            ></button>
          </div>

        </div>

      </div>
    `;
  }

  private bindEvents(): void {
    // Dot switcher
    this.element.querySelectorAll('.hero-dot-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const flavor = (e.currentTarget as HTMLElement).dataset.flavor as FlavorId;
        if (flavor) {
          audioController.playPop();
          themeController.setFlavor(flavor);
        }
      });
    });

    // 3D Parallax on mouse move
    const wrapper = this.element.querySelector('#heroVisualWrapper') as HTMLElement;
    const stage = this.element.querySelector('#bottleStage') as HTMLElement;

    if (wrapper && stage && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      wrapper.addEventListener('mousemove', (e: MouseEvent) => {
        const rect = wrapper.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        const rotX = (-y / rect.height) * 14;
        const rotY = (x / rect.width) * 14;

        stage.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) rotate(8deg)`;
      });

      wrapper.addEventListener('mouseleave', () => {
        stage.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) rotate(8deg)';
      });
    }

    // Subscribe to theme controller
    themeController.subscribe((newFlavor) => {
      this.currentFlavorId = newFlavor;
      this.updateView(newFlavor);
    });
  }

  private updateView(flavorId: FlavorId): void {
    const flavor = FLAVORS_DATA.find((f) => f.id === flavorId) || FLAVORS_DATA[0];
    const isBissap = flavorId === 'bissap';

    // Update Counter
    const activeIdx = this.element.querySelector('.active-idx');
    if (activeIdx) activeIdx.textContent = isBissap ? '01' : '02';

    // Update Two-Tone Headline
    const word1 = this.element.querySelector('#heroWord1');
    const word2 = this.element.querySelector('#heroWord2');
    const desc = this.element.querySelector('#heroFlavorDesc');

    if (word1) word1.textContent = isBissap ? 'Cocktail.' : 'Ananas.';
    if (word2) {
      word2.textContent = isBissap ? 'Bissap' : 'Gingembre';
      word2.className = `hero-title-word2 ${isBissap ? 'color-bissap' : 'color-ananas'}`;
    }
    if (desc) desc.textContent = flavor.description;

    // Update Bottle Image with quick transition
    const bottle = this.element.querySelector('#heroBottleImg') as HTMLImageElement;
    const splash = this.element.querySelector('#heroSplashImg') as HTMLImageElement;

    if (bottle) {
      bottle.style.opacity = '0';
      bottle.style.transform = 'scale(0.9) translateY(20px)';
      setTimeout(() => {
        bottle.src = flavor.bottleImage;
        bottle.alt = `Bouteille Nidj Juice ${flavor.name}`;
        bottle.style.opacity = '1';
        bottle.style.transform = 'scale(1) translateY(0)';
      }, 180);
    }

    if (splash) {
      splash.style.opacity = '0';
      setTimeout(() => {
        splash.src = isBissap ? '/assets/images/splash-bissap.png' : '/assets/images/splash-ananas.png';
        splash.style.opacity = '1';
      }, 180);
    }

    // Update active dot
    this.element.querySelectorAll('.hero-dot-btn').forEach((btn) => {
      const match = (btn as HTMLElement).dataset.flavor === flavorId;
      btn.classList.toggle('is-active', match);
      btn.setAttribute('aria-selected', String(match));
    });
  }
}
