/* ==========================================================================
   NIDJ JUICE — FLAVORS PAGE (/saveurs)
   Official Brand & Product Showcase (Coca-Cola / Pepsi Brands Standard)
   Dynamically connected in Real-Time to CMS Service
   ========================================================================== */

import { cmsService } from '../services/cms.service';

export class FlavorsPage {
  private element: HTMLElement;
  private unsubscribeCms: (() => void) | null = null;

  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'page page-flavors';
    this.render();
    this.bindEvents();
  }

  public getElement(): HTMLElement {
    return this.element;
  }

  private render(): void {
    const products = cmsService.getProducts();

    this.element.innerHTML = `
      <!-- Page Hero Header -->
      <section class="page-hero">
        <div class="page-hero-glow" aria-hidden="true"></div>
        <div class="container">
          <nav class="page-breadcrumbs" aria-label="Fil d'Ariane">
            <a href="/">Accueil</a>
            <span class="breadcrumb-sep">/</span>
            <span>Nos Saveurs</span>
          </nav>
          
          <div class="page-hero-tag">Collection Officielle • 100% Nectars Purs</div>
          <h1 class="page-hero-title">L'authenticité des fruits camerounais dans chaque gorgée.</h1>
          <p class="page-hero-subtitle">
            Sans conservateur chimique, sans colorant artificiel et sans sucre raffiné ajouté. Explorez nos recettes signatures élaborées avec passion par la Société Nidjeu.
          </p>
        </div>
      </section>

      <!-- Sticky Subnav Anchors -->
      <nav class="page-subnav-bar" aria-label="Navigation des saveurs">
        <div class="container">
          <ul class="page-subnav-list">
            ${products.map((p) => `
              <li><a href="/saveurs/${p.id}" class="page-subnav-link">${p.name}</a></li>
            `).join('')}
            <li><a href="/saveurs#duo" class="page-subnav-link">Packs & Cartons</a></li>
            <li><a href="/saveurs#nutrition" class="page-subnav-link">Nutrition</a></li>
          </ul>
        </div>
      </nav>

      <!-- Main Products Container -->
      <div class="container section">

        ${products.map((p) => `
          <article id="${p.id}" class="product-deep-card">
            <div class="product-stage-box" style="background: ${p.glowColor ? `radial-gradient(circle at 50% 50%, ${p.glowColor} 0%, rgba(255,255,255,0.05) 75%)` : 'rgba(10,61,34,0.05)'};">
              <img 
                src="${p.bottleImage}" 
                alt="Bouteille Nidj Juice ${p.name}" 
                class="product-stage-img"
                loading="lazy"
              />
            </div>
            <div class="product-deep-content">
              <span class="product-category-pill" style="background: ${p.accentColor || '#58A826'}; color: #fff;">${p.tag}</span>
              <h2>${p.name}</h2>
              ${p.story ? `<p class="product-story-quote">« ${p.story} »</p>` : ''}
              <p class="editorial-body">
                ${p.description}
              </p>

              <div class="product-specs-grid">
                <div class="spec-item">
                  <span class="spec-item-label">Contenance</span>
                  <span class="spec-item-val">${p.volume || '50 cl'}</span>
                </div>
                <div class="spec-item">
                  <span class="spec-item-label">Origine Fruits</span>
                  <span class="spec-item-val">${p.origin || 'Cameroun 237'}</span>
                </div>
                <div class="spec-item">
                  <span class="spec-item-label">Conservation</span>
                  <span class="spec-item-val">Entre +2°C et +6°C</span>
                </div>
                <div class="spec-item">
                  <span class="spec-item-label">Prix Conseillé</span>
                  <span class="spec-item-val">${p.price || '1 000 FCFA'}</span>
                </div>
              </div>

              <div class="hero-cta-group" style="margin-top: 20px;">
                <a href="/saveurs/${p.id}" class="btn btn-primary">
                  <span>Découvrir la page dédiée</span>
                  <span class="btn-arrow-circle" aria-hidden="true">↗</span>
                </a>
                <button type="button" class="btn btn-outline order-flavor-btn" data-flavor-name="${p.name}">
                  <span>Commander</span>
                </button>
                <a href="/points-de-vente" class="btn btn-ghost">
                  <span>Points de vente</span>
                </a>
              </div>
            </div>
          </article>
        `).join('')}

        <!-- Product 3: Packs Découverte & Formats Événements -->
        <section id="duo" class="section">
          <div class="section-header">
            <span class="page-hero-tag">Offres Spéciales & Cartons</span>
            <h2 class="section-title">Packs Découverte & Événements</h2>
            <p class="section-subtitle">
              Partagez la fraîcheur naturelle en famille, entre collègues ou lors de vos célébrations.
            </p>
          </div>

          <div class="editorial-split-grid">
            <div class="editorial-text-box">
              <h3>Pack Duo Mixte (6x 50cl)</h3>
              <p class="editorial-body">
                Composé de 3 bouteilles de Cocktail de Bissap et 3 bouteilles d'Ananas Gingembre, ce coffret est le moyen idéal de découvrir l'ensemble de la gamme Nidj Juice. Livré dans un packaging réfrigéré protecteur.
              </p>
              <h3 style="margin-top: 24px;">Cartons 12x & 24x Événements</h3>
              <p class="editorial-body">
                Pour vos mariages, séminaires, cocktails d'entreprise et anniversaires, la Société Nidjeu propose des tarifs dégressifs par carton avec livraison directe sur le lieu de votre événement à Douala et Yaoundé.
              </p>
              <div style="margin-top: 24px;">
                <button type="button" class="btn btn-primary order-flavor-btn" data-flavor-name="Pack Découverte Duo 6x">
                  <span>Commander un Pack Découverte</span>
                  <span class="btn-arrow-circle">→</span>
                </button>
              </div>
            </div>
            <div class="editorial-media-box">
              <img 
                src="/assets/images/gallery-2.webp" 
                alt="Pack Découverte Nidj Juice" 
                class="editorial-img"
                loading="lazy"
              />
              <div class="media-caption-badge">
                Livraison express à domicile ou en entreprise
              </div>
            </div>
          </div>
        </section>

        <!-- Section 4: Tableau de Transparence Nutritionnelle -->
        <section id="nutrition" class="section">
          <div class="section-header">
            <span class="page-hero-tag">Intégrité & Transparence</span>
            <h2 class="section-title">Tableau de Transparence Nutritionnelle</h2>
            <p class="section-subtitle">
              Chez Société Nidjeu, chaque ingrédient est connu et traçable. Rien n'est dissimulé.
            </p>
          </div>

          <div class="nutrition-table-wrap">
            <table class="nutrition-table" aria-label="Valeurs nutritionnelles moyennes pour 100ml">
              <thead>
                <tr>
                  <th>Paramètre / Valeur pour 100 ml</th>
                  ${products.slice(0, 2).map((p) => `<th>${p.name}</th>`).join('')}
                  <th>Standard Industriel Moyen</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Énergie</strong></td>
                  ${products.slice(0, 2).map((p) => `<td>${p.calories || '42 kcal'}</td>`).join('')}
                  <td>65 kcal / 275 kJ</td>
                </tr>
                <tr>
                  <td><strong>Matières grasses</strong></td>
                  <td>0,0 g</td>
                  <td>0,1 g</td>
                  <td>0,0 g</td>
                </tr>
                <tr>
                  <td><strong>Glucides (sucres naturels du fruit)</strong></td>
                  ${products.slice(0, 2).map((p) => `<td>${p.sugar || '10,5 g'}</td>`).join('')}
                  <td>15,8 g (sucres raffinés ajoutés)</td>
                </tr>
                <tr>
                  <td><strong>Fibres végétales</strong></td>
                  <td>0,4 g</td>
                  <td>0,6 g</td>
                  <td>0,0 g (filtrage chimique)</td>
                </tr>
                <tr>
                  <td><strong>Vitamine C</strong></td>
                  ${products.slice(0, 2).map((p) => `<td>${p.vitaminC || '20 mg'}</td>`).join('')}
                  <td>0 mg (détruite par surchauffe)</td>
                </tr>
                <tr>
                  <td><strong>Conservateurs chimiques</strong></td>
                  <td><span style="color: #58A826; font-weight:800;">ZÉRO (0,0%)</span></td>
                  <td><span style="color: #58A826; font-weight:800;">ZÉRO (0,0%)</span></td>
                  <td>Présents (Benzoates, Sorbates)</td>
                </tr>
                <tr>
                  <td><strong>Colorants de synthèse</strong></td>
                  <td><span style="color: #58A826; font-weight:800;">AUCUN (100% naturel)</span></td>
                  <td><span style="color: #58A826; font-weight:800;">AUCUN (100% naturel)</span></td>
                  <td>Tartrazine, Rouge Allura</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

      </div>
    `;
  }

  private bindEvents(): void {
    this.element.querySelectorAll('.order-flavor-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const flavorName = (e.currentTarget as HTMLElement).dataset.flavorName || 'Nidj Juice';
        window.dispatchEvent(
          new CustomEvent('nidj:open-order-modal', {
            detail: { storeHint: flavorName }
          })
        );
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
