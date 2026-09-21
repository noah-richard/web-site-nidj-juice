/* ==========================================================================
   NIDJ JUICE — ABOUT / O HAC SECTION (MOCKUP COMPLIANT)
   Soft rounded container: Brand narrative + 2x2 Feature Cards Grid
   ========================================================================== */

export class StorySection {
  private element: HTMLElement;

  constructor() {
    this.element = document.createElement('section');
    this.element.id = 'story';
    this.element.className = 'section about-section';
    this.render();
  }

  public getElement(): HTMLElement {
    return this.element;
  }

  private render(): void {
    this.element.innerHTML = `
      <div class="container">
        
        <!-- Big Rounded Container matching Mockup -->
        <div class="about-container-card">
          
          <div class="about-grid">
            
            <!-- Left Narrative Column -->
            <div class="about-editorial">
              <span class="about-tag">À PROPOS</span>
              
              <h2 class="about-title">
                <strong>Nidj Juice</strong> — des jus 100% naturels pour ceux qui recherchent le meilleur de la nature sans compromis sur le goût.
              </h2>

              <p class="about-desc">
                Conçus et fabriqués au Cameroun par la <strong>Société Nidjeu</strong>, nos jus sont issus de fruits frais récoltés à parfaite maturité, sans aucun ajout de sucre raffiné ni conservateur artificiel.
              </p>

              <div class="about-action">
                <a href="#flavors" class="btn btn-primary">
                  <span>Découvrir nos saveurs</span>
                  <span class="btn-arrow-circle" aria-hidden="true">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </span>
                </a>
              </div>
            </div>

            <!-- Right: 2x2 White Feature Cards Grid matching Mockup -->
            <div class="about-features-grid">
              
              <!-- Card 1: Vitamines & Minéraux -->
              <div class="feature-card">
                <div class="feature-card-icon icon-orange">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                    <path d="M2 12h20"></path>
                  </svg>
                </div>
                <div class="feature-card-text">
                  <h3 class="feature-title">Vitamines & minéraux</h3>
                  <p class="feature-subtitle">Plein de vitalité dans chaque bouteille</p>
                </div>
              </div>

              <!-- Card 2: Santé & Bien-être -->
              <div class="feature-card">
                <div class="feature-card-icon icon-green">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
                  </svg>
                </div>
                <div class="feature-card-text">
                  <h3 class="feature-title">Santé & bien-être</h3>
                  <p class="feature-subtitle">Soutien d'un mode de vie actif</p>
                </div>
              </div>

              <!-- Card 3: Énergie Naturelle -->
              <div class="feature-card">
                <div class="feature-card-icon icon-pink">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                  </svg>
                </div>
                <div class="feature-card-text">
                  <h3 class="feature-title">Énergie & tonus</h3>
                  <p class="feature-subtitle">Vivacité naturelle pour toute la journée</p>
                </div>
              </div>

              <!-- Card 4: 100% Naturel -->
              <div class="feature-card">
                <div class="feature-card-icon icon-leaf">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path>
                    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path>
                  </svg>
                </div>
                <div class="feature-card-text">
                  <h3 class="feature-title">100% Pur Jus</h3>
                  <p class="feature-subtitle">Fruits frais du terroir camerounais</p>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    `;
  }
}
