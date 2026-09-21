/* ==========================================================================
   NIDJ JUICE — DEDICATED PRODUCT / BRAND PAGE (/saveurs/:id)
   Enterprise FMCG Brand Showcase standard (Coca-Cola / Pepsi Product Page)
   Detailed storytelling, sensory profile, ingredients, nutrition & ordering
   ========================================================================== */

import { SHOWCASE_PRODUCTS } from '../data/showcase.data';
import type { ShowcaseProduct } from '../components/showcase/showcase.types';
import { OFFICIAL_CONTACT } from '../data/stores.data';
import { audioController } from '../features/audio-controller';

export class ProductDetailPage {
  private element: HTMLElement;
  private product: ShowcaseProduct;

  constructor(productId: string) {
    this.element = document.createElement('div');
    this.element.className = 'page page-product-detail';

    // Find product or fallback to first
    const cleanId = productId.replace(/^\/saveurs\//, '').replace(/\/$/, '');
    let matched = SHOWCASE_PRODUCTS.find((p) => p.id === cleanId);
    
    // Support aliases
    if (!matched) {
      if (cleanId === 'bissap') matched = SHOWCASE_PRODUCTS.find((p) => p.id === 'cocktail-bissap');
      if (cleanId === 'ananas') matched = SHOWCASE_PRODUCTS.find((p) => p.id === 'ananas-gingembre');
    }
    
    this.product = matched || SHOWCASE_PRODUCTS[0];

    this.render();
    this.bindEvents();
  }

  public getElement(): HTMLElement {
    return this.element;
  }

  private render(): void {
    const p = this.product;
    const whatsappMsg = encodeURIComponent(
      `Bonjour Société Nidjeu, je souhaite commander la saveur officielle ${p.name} (100% naturel). Pourriez-vous m'indiquer la disponibilité et les tarifs ?`
    );

    // Other flavors in the collection
    const otherProducts = SHOWCASE_PRODUCTS.filter((item) => item.id !== p.id);

    this.element.innerHTML = `
      <!-- Product Hero Experience -->
      <section class="page-hero product-hero" style="--product-glow: ${p.glowColor}; --product-accent: ${p.accentColor};">
        <div class="page-hero-glow" style="background: radial-gradient(circle at 65% 40%, ${p.glowColor} 0%, transparent 65%);" aria-hidden="true"></div>
        
        <div class="container">
          <!-- Breadcrumb Navigation -->
          <nav class="page-breadcrumbs" aria-label="Fil d'Ariane">
            <a href="/">Accueil</a>
            <span class="breadcrumb-sep">/</span>
            <a href="/saveurs">Nos Saveurs</a>
            <span class="breadcrumb-sep">/</span>
            <span class="breadcrumb-current">${p.name}</span>
          </nav>

          <div class="product-hero-grid">
            <!-- Left Editorial & CTAs -->
            <div class="product-hero-content">
              <div class="page-hero-tag" style="border-color: ${p.accentColor}; color: ${p.accentColor};">
                ${p.category || 'Collection Officielle • Société Nidjeu'}
              </div>

              <h1 class="product-hero-title">${p.name}</h1>
              <p class="product-hero-subtitle">${p.subtitle}</p>

              ${p.quote ? `<blockquote class="product-hero-quote">${p.quote}</blockquote>` : ''}

              <p class="product-hero-desc">${p.description}</p>

              <!-- Key Badges Pill Row -->
              <div class="product-badges-pill-row">
                ${p.badges.map(b => `<span class="product-pill-badge">${b}</span>`).join('')}
              </div>

              <!-- Action CTAs -->
              <div class="product-hero-actions">
                <a 
                  href="https://wa.me/${OFFICIAL_CONTACT.whatsappNumber}?text=${whatsappMsg}" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  class="btn btn-primary btn-product-order"
                  style="background: ${p.accentColor}; border-color: ${p.accentColor};"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                  </svg>
                  <span>Commander sur WhatsApp</span>
                  <span class="btn-arrow-circle" aria-hidden="true">→</span>
                </a>

                <button type="button" class="btn btn-outline product-modal-trigger-btn" data-product-name="${p.name}">
                  <span>Commander en ligne</span>
                </button>

                <a href="/points-de-vente" class="btn btn-ghost">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span>Points de vente</span>
                </a>
              </div>

              <!-- Quick Facts Card -->
              <div class="product-quick-specs">
                <div class="quick-spec-cell">
                  <span class="quick-spec-label">Origine Fruits</span>
                  <span class="quick-spec-value">${p.origin || 'Cameroun 237'}</span>
                </div>
                <div class="quick-spec-cell">
                  <span class="quick-spec-label">Extraction</span>
                  <span class="quick-spec-value">Douce à froid</span>
                </div>
                <div class="quick-spec-cell">
                  <span class="quick-spec-label">Conservation</span>
                  <span class="quick-spec-value">Frais +2°C à +6°C</span>
                </div>
                <div class="quick-spec-cell">
                  <span class="quick-spec-label">Additifs</span>
                  <span class="quick-spec-value" style="color: var(--color-brand-green);">0% Conservateur</span>
                </div>
              </div>

            </div>

            <!-- Right Stage with Glowing Disc & Bottle -->
            <div class="product-hero-stage">
              <div class="product-stage-disc" style="background: radial-gradient(circle, ${p.haloColor} 0%, rgba(255,255,255,0) 70%);">
                <div class="product-aura-pulse" style="--aura-pulse-color: ${p.glowColor};" aria-hidden="true"></div>
                <img 
                  src="${p.bottleImage}" 
                  alt="Bouteille officielle ${p.name} Nidj Juice" 
                  class="product-stage-bottle"
                />
                <div class="product-bottle-reflection" aria-hidden="true"></div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- Main Deep Content Container -->
      <div class="container section product-body-container">

        <!-- Section 1: L'Histoire & Terroir du Fruit -->
        <div class="product-story-section">
          <div class="product-section-header">
            <span class="page-hero-tag">Savoir-Faire & Terroir</span>
            <h2 class="section-title">L’Histoire & les Secrets de Fabrication</h2>
            <p class="section-subtitle">
              Chaque bouteille de ${p.name} est le résultat d’une charte de qualité exigeante et d’un engagement fort auprès de nos coopératives agricoles partenaires.
            </p>
          </div>

          <div class="product-editorial-grid">
            <div class="product-editorial-card">
              <div class="product-editorial-icon" style="background: ${p.haloColor}; color: ${p.accentColor};">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                  <path d="M12 2a10 10 0 0 0-7.07 17.07A10 10 0 1 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"></path>
                  <path d="M12 6c-3 0-5 2.5-5 5 0 3 3 5 5 7 2-2 5-4 5-7 0-2.5-2-5-5-5z"></path>
                </svg>
              </div>
              <h3>Le Terroir Camerounais</h3>
              <p>
                ${p.terroir || 'Fruits récoltés dans les meilleures zones agro-climatiques du Cameroun sous un ensoleillement optimal.'}
              </p>
            </div>

            <div class="product-editorial-card">
              <div class="product-editorial-icon" style="background: ${p.haloColor}; color: ${p.accentColor};">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
              </div>
              <h3>Extraction Délicate à Froid</h3>
              <p>
                ${p.recipeStory || 'Procédé de pressage doux préservant la fraîcheur, les micronutriments vivants et l’arôme pur du fruit cueilli à maturité.'}
              </p>
            </div>

            <div class="product-editorial-card">
              <div class="product-editorial-icon" style="background: ${p.haloColor}; color: ${p.accentColor};">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <h3>Normes Microbiologiques de Pointe</h3>
              <p>
                Embouteillage en atmosphère protectrice dans nos ateliers certifiés de Douala, avec traçabilité intégrale du lot jusqu’au consommateur.
              </p>
            </div>
          </div>
        </div>

        <!-- Section 2: Profil Sensoriel & Notes de Dégustation -->
        ${p.tastingNotes ? `
          <div class="product-tasting-section">
            <div class="product-section-header">
              <span class="page-hero-tag">Expérience Gustative</span>
              <h2 class="section-title">Profil Sensoriel & Dégustation</h2>
              <p class="section-subtitle">
                Comment apprécier toute la richesse aromatique de ${p.name} servi à température idéale (4°C à 6°C).
              </p>
            </div>

            <div class="product-tasting-grid">
              ${p.tastingNotes.map((note) => `
                <div class="product-tasting-card">
                  <div class="tasting-phase-badge" style="color: ${p.accentColor};">${note.title}</div>
                  <h4 class="tasting-title">La sensation en bouche</h4>
                  <p class="tasting-desc">${note.note}</p>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Section 3: Ingrédients 100% Purs & Tableau Nutritionnel -->
        <div class="product-specs-section">
          <div class="product-section-header">
            <span class="page-hero-tag">Intégrité & Transparence</span>
            <h2 class="section-title">Ingrédients & Valeurs Nutritionnelles</h2>
            <p class="section-subtitle">
              Aucun secret, aucun additif dissimulé. Une composition 100% lisible et traçable.
            </p>
          </div>

          <div class="product-specs-split">
            <!-- Left: Ingrédients clairs -->
            <div class="product-ingredients-box">
              <h3>Ingrédients 100% Naturels</h3>
              <ul class="product-ingredients-list">
                ${(p.ingredients || ['Fruits frais sélectionnés', 'Eau de source purifiée']).map(ing => `
                  <li>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>${ing}</span>
                  </li>
                `).join('')}
              </ul>

              <div class="ingredients-guarantee-note">
                <strong>Garantie Société Nidjeu :</strong> Zéro conservateur synthétique (ni benzoate de sodium, ni sorbate de potassium). Zéro colorant artificiel. Zéro sucre raffiné ajouté.
              </div>
            </div>

            <!-- Right: Tableau Nutritionnel -->
            <div class="product-nutrition-box">
              <h3>Valeurs moyennes pour 100 ml</h3>
              <table class="product-nutrition-table">
                <tbody>
                  <tr>
                    <td>Valeur énergétique</td>
                    <td class="table-val-bold">${p.nutrition?.energy || '40 kcal'}</td>
                  </tr>
                  <tr>
                    <td>Sucres naturels du fruit</td>
                    <td>${p.nutrition?.sugars || 'Uniquement les sucres du fruit'}</td>
                  </tr>
                  <tr>
                    <td>Vitamine C</td>
                    <td class="table-val-bold">${p.nutrition?.vitaminC || 'Riche en vitamine C naturelle'}</td>
                  </tr>
                  <tr>
                    <td>Antioxydants & Minéraux</td>
                    <td>${p.nutrition?.antioxidants || 'Polyphénols et minéraux actifs'}</td>
                  </tr>
                  <tr>
                    <td>Matières grasses & Lipides</td>
                    <td>0 g (Traces négligeables)</td>
                  </tr>
                  <tr>
                    <td>Sel / Sodium</td>
                    <td>0 g (Naturellement sans sel)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Section 4: Formats & Conditionnements Disponibles -->
        <div class="product-formats-section">
          <div class="product-section-header">
            <span class="page-hero-tag">Formats & Tailles</span>
            <h2 class="section-title">Disponible en Bouteilles & Cartons</h2>
            <p class="section-subtitle">
              Pour votre pause individuelle, un déjeuner en famille ou vos grands événements au Cameroun.
            </p>
          </div>

          <div class="product-formats-grid">
            <div class="format-card">
              <div class="format-volume">33 cl</div>
              <h4>Format Nomade</h4>
              <p>Idéal pour emporter au travail, en voiture ou lors de vos déplacements à Douala et Yaoundé.</p>
              <span class="format-price">Bouteille Fraîche</span>
            </div>

            <div class="format-card featured-format" style="border-color: ${p.accentColor};">
              <div class="format-badge-pill" style="background: ${p.accentColor};">Le Plus Populaire</div>
              <div class="format-volume">50 cl</div>
              <h4>Format Fraîcheur Active</h4>
              <p>Le format référence Nidj Juice. Équilibre parfait pour une hydratation revitalisante complète.</p>
              <span class="format-price">1 000 FCFA</span>
            </div>

            <div class="format-card">
              <div class="format-volume">1 Litre</div>
              <h4>Format Familial Prestige</h4>
              <p>À partager lors des repas dominicaux, réunions de famille et petits-déjeuners gourmands.</p>
              <span class="format-price">Format Économique</span>
            </div>

            <div class="format-card">
              <div class="format-volume">Carton 12x</div>
              <h4>Pack Événements & CHR</h4>
              <p>Pour vos mariages, séminaires, anniversaires, lounges et restaurants partenaires.</p>
              <span class="format-price">Tarif Dégressif Pro</span>
            </div>
          </div>
        </div>

        <!-- Section 5: Autres Saveurs de la Gamme (Cross-Navigation) -->
        <div class="product-cross-nav-section">
          <div class="product-section-header">
            <span class="page-hero-tag">Découvrir la Gamme</span>
            <h2 class="section-title">Explorez les Autres Saveurs Officielles</h2>
            <p class="section-subtitle">
              Chaque recette Nidj Juice explore une facette unique du terroir fruitier camerounais.
            </p>
          </div>

          <div class="product-other-grid">
            ${otherProducts.map(other => `
              <article class="other-flavor-card" data-flavor-id="${other.id}">
                <div class="other-flavor-img-wrap" style="background: radial-gradient(circle, ${other.haloColor} 0%, transparent 70%);">
                  <img src="${other.bottleImage}" alt="${other.name}" class="other-flavor-img" loading="lazy" />
                </div>
                <div class="other-flavor-body">
                  <span class="other-flavor-tag" style="color: ${other.accentColor};">${other.tastingHint}</span>
                  <h4>${other.name}</h4>
                  <p>${other.tagline}</p>
                  <a href="/saveurs/${other.id}" class="btn btn-outline other-flavor-link" style="margin-top: 10px;">
                    <span>Voir la page dédiée</span>
                    <span class="btn-arrow-circle" aria-hidden="true">→</span>
                  </a>
                </div>
              </article>
            `).join('')}
          </div>

          <div style="text-align: center; margin-top: 40px;">
            <a href="/saveurs" class="btn btn-outline" style="border-radius: 9999px; padding: 12px 30px;">
              <span>← Voir toutes les saveurs au catalogue</span>
            </a>
          </div>
        </div>

      </div>
    `;
  }

  private bindEvents(): void {
    // Open order modal with this product's name
    this.element.querySelectorAll('.product-modal-trigger-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const prodName = (e.currentTarget as HTMLElement).dataset.productName || this.product.name;
        audioController.playDrop();
        window.dispatchEvent(
          new CustomEvent('nidj:open-order-modal', {
            detail: { storeHint: prodName }
          })
        );
      });
    });

    // Subnav or cross-flavor links
    this.element.querySelectorAll('.other-flavor-card').forEach((card) => {
      card.addEventListener('click', (e) => {
        // If not clicking direct link, navigate
        if ((e.target as HTMLElement).closest('a')) return;
        const flavorId = (card as HTMLElement).dataset.flavorId;
        if (flavorId) {
          audioController.playPop();
          window.location.href = `/saveurs/${flavorId}`;
        }
      });
    });
  }
}
