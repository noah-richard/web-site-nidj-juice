/* ==========================================================================
   NIDJ JUICE — HERO EXPERIENCE (FAITHFUL TO OFFICIAL MOCKUP)
   Editorial layout: 01/02 indicator, split display typography,
   floating fruit splash & bottle, 3 circular trust badges,
   interactive auto-swipe slider with progress indicator & touch support.
   ========================================================================== */

import { FLAVORS_DATA } from '../../data/flavors.data';
import { themeController } from '../../features/theme-controller';
import { audioController } from '../../features/audio-controller';
import type { FlavorId } from '../../types/product.types';

export class HeroSection {
  private element: HTMLElement;
  private currentFlavorId: FlavorId = 'bissap';
  private autoPlayTimer: number | null = null;
  private readonly autoPlayInterval: number = 5000; // 5 seconds per flavor slide
  private isPaused: boolean = false;
  private unsubscribeTheme: (() => void) | null = null;
  private touchStartX: number = 0;
  private touchStartY: number = 0;

  constructor() {
    this.element = document.createElement('section');
    this.element.id = 'hero';
    this.element.className = 'hero-section';
    this.render();
    this.bindEvents();
    this.startAutoPlay();
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
            <span class="hero-title-word2 ${isBissap ? 'color-bissap' : 'color-ananas'}" id="heroWord2">${isBissap ? 'Bissap' : 'Gingembre'}</span>
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

          <!-- Interactive Auto-Swipe Pagination Dots (01 Bissap / 02 Ananas) -->
          <div class="hero-pagination-dots" role="tablist" aria-label="Changer de senteur">
            <button 
              type="button" 
              class="hero-dot-btn ${isBissap ? 'is-active' : ''}" 
              data-flavor="bissap" 
              role="tab" 
              aria-selected="${isBissap ? 'true' : 'false'}" 
              aria-label="Senteur Cocktail de Bissap (01)"
            >
              <span class="hero-dot-progress-bar" aria-hidden="true"></span>
            </button>
            <button 
              type="button" 
              class="hero-dot-btn ${!isBissap ? 'is-active' : ''}" 
              data-flavor="ananas" 
              role="tab" 
              aria-selected="${!isBissap ? 'true' : 'false'}" 
              aria-label="Senteur Jus d'Ananas Gingembre (02)"
            >
              <span class="hero-dot-progress-bar" aria-hidden="true"></span>
            </button>
          </div>

        </div>

      </div>
    `;
  }

  private bindEvents(): void {
    // Dot switcher clicks
    this.element.querySelectorAll('.hero-dot-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const flavor = (e.currentTarget as HTMLElement).dataset.flavor as FlavorId;
        if (flavor) {
          this.switchFlavor(flavor, true);
        }
      });
    });

    // Pause auto-swipe on hover so user can read or click CTAs
    this.element.addEventListener('mouseenter', () => {
      this.pauseAutoPlay();
    });

    this.element.addEventListener('mouseleave', () => {
      this.resumeAutoPlay();
    });

    // Touch Swipe Gesture support for mobile & tablet users
    this.element.addEventListener(
      'touchstart',
      (e: TouchEvent) => {
        if (e.touches.length > 0) {
          this.touchStartX = e.touches[0].clientX;
          this.touchStartY = e.touches[0].clientY;
          this.pauseAutoPlay();
        }
      },
      { passive: true }
    );

    this.element.addEventListener(
      'touchend',
      (e: TouchEvent) => {
        if (e.changedTouches.length > 0) {
          const touchEndX = e.changedTouches[0].clientX;
          const touchEndY = e.changedTouches[0].clientY;
          const deltaX = touchEndX - this.touchStartX;
          const deltaY = touchEndY - this.touchStartY;

          // Detect horizontal swipe above threshold (40px)
          if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
            const nextFlavor: FlavorId = this.currentFlavorId === 'bissap' ? 'ananas' : 'bissap';
            this.switchFlavor(nextFlavor, true);
          }
          this.resumeAutoPlay();
        }
      },
      { passive: true }
    );

    // Pause timer when browser tab is inactive
    document.addEventListener('visibilitychange', this.handleVisibilityChange);

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
    this.unsubscribeTheme = themeController.subscribe((newFlavor) => {
      this.currentFlavorId = newFlavor;
      this.updateView(newFlavor);
    });
  }

  private handleVisibilityChange = (): void => {
    if (document.visibilityState === 'hidden') {
      this.pauseAutoPlay();
    } else {
      this.resumeAutoPlay();
    }
  };

  private switchFlavor(flavor: FlavorId, interactive: boolean = false): void {
    if (interactive) {
      audioController.playPop();
    }
    themeController.setFlavor(flavor);
    this.restartAutoPlay();
  }

  private startAutoPlay(): void {
    this.stopAutoPlay();
    this.autoPlayTimer = window.setInterval(() => {
      if (!this.isPaused && document.visibilityState === 'visible') {
        const nextFlavor: FlavorId = this.currentFlavorId === 'bissap' ? 'ananas' : 'bissap';
        themeController.setFlavor(nextFlavor);
      }
    }, this.autoPlayInterval);
  }

  private stopAutoPlay(): void {
    if (this.autoPlayTimer !== null) {
      clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = null;
    }
  }

  private pauseAutoPlay(): void {
    this.isPaused = true;
    this.element.classList.add('is-paused');
  }

  private resumeAutoPlay(): void {
    this.isPaused = false;
    this.element.classList.remove('is-paused');
  }

  private restartAutoPlay(): void {
    this.stopAutoPlay();
    this.startAutoPlay();
  }

  private updateView(flavorId: FlavorId): void {
    const flavor = FLAVORS_DATA.find((f) => f.id === flavorId) || FLAVORS_DATA[0];
    const isBissap = flavorId === 'bissap';

    // Update Counter
    const activeIdx = this.element.querySelector('.active-idx');
    if (activeIdx) activeIdx.textContent = isBissap ? '01' : '02';

    // Update Two-Tone Headline with soft crossfade
    const word1 = this.element.querySelector('#heroWord1');
    const word2 = this.element.querySelector('#heroWord2');
    const headline = this.element.querySelector('.hero-title') as HTMLElement;
    const desc = this.element.querySelector('#heroFlavorDesc') as HTMLElement;

    if (headline) {
      headline.style.transition = 'opacity 0.2s ease, transform 0.25s ease';
      headline.style.opacity = '0.3';
      headline.style.transform = 'translateY(6px)';
      setTimeout(() => {
        if (word1) word1.textContent = isBissap ? 'Cocktail.' : 'Ananas.';
        if (word2) {
          word2.textContent = isBissap ? 'Bissap' : 'Gingembre';
          word2.className = `hero-title-word2 ${isBissap ? 'color-bissap' : 'color-ananas'}`;
        }
        headline.style.opacity = '1';
        headline.style.transform = 'translateY(0)';
      }, 150);
    }

    if (desc) {
      desc.style.transition = 'opacity 0.2s ease';
      desc.style.opacity = '0.3';
      setTimeout(() => {
        desc.textContent = flavor.description;
        desc.style.opacity = '1';
      }, 150);
    }

    // Update Bottle Image with fluid scale/slide transition
    const bottle = this.element.querySelector('#heroBottleImg') as HTMLImageElement;
    const splash = this.element.querySelector('#heroSplashImg') as HTMLImageElement;

    if (bottle) {
      bottle.style.transition = 'opacity 0.25s ease, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
      bottle.style.opacity = '0';
      bottle.style.transform = 'scale(0.92) translateY(18px)';
      setTimeout(() => {
        bottle.src = flavor.bottleImage;
        bottle.alt = `Bouteille Nidj Juice ${flavor.name}`;
        bottle.style.opacity = '1';
        bottle.style.transform = 'scale(1) translateY(0)';
      }, 200);
    }

    if (splash) {
      splash.style.transition = 'opacity 0.25s ease';
      splash.style.opacity = '0';
      setTimeout(() => {
        splash.src = isBissap ? '/assets/images/splash-bissap.png' : '/assets/images/splash-ananas.png';
        splash.style.opacity = '1';
      }, 200);
    }

    // Update active dot and reset the progress bar animation
    this.element.querySelectorAll('.hero-dot-btn').forEach((btn) => {
      const match = (btn as HTMLElement).dataset.flavor === flavorId;
      btn.classList.toggle('is-active', match);
      btn.setAttribute('aria-selected', String(match));

      const bar = btn.querySelector('.hero-dot-progress-bar') as HTMLElement;
      if (bar) {
        // Force animation restart on active dot
        bar.style.animation = 'none';
        void bar.offsetHeight; // trigger reflow
        if (match) {
          bar.style.animation = 'heroDotFill 5s linear forwards';
        }
      }
    });
  }

  public destroy(): void {
    this.stopAutoPlay();
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    if (this.unsubscribeTheme) {
      this.unsubscribeTheme();
      this.unsubscribeTheme = null;
    }
  }
}
