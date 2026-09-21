/* ==========================================================================
   NIDJ JUICE — FLAVORS PAGE (/saveurs)
   Official Brand & Product Showcase (Coca-Cola / Pepsi Brands Standard)
   ========================================================================== */

export class FlavorsPage {
  private element: HTMLElement;

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
            <li><a href="/saveurs/cocktail-bissap" class="page-subnav-link">Cocktail de Bissap</a></li>
            <li><a href="/saveurs/ananas-gingembre" class="page-subnav-link">Ananas Gingembre</a></li>
            <li><a href="/saveurs/pur-ananas" class="page-subnav-link">Pur Jus d'Ananas</a></li>
            <li><a href="/saveurs/pasteque-orange" class="page-subnav-link">Pastèque Orange</a></li>
            <li><a href="/saveurs#duo" class="page-subnav-link">Packs & Cartons</a></li>
            <li><a href="/saveurs#nutrition" class="page-subnav-link">Nutrition</a></li>
          </ul>
        </div>
      </nav>

      <!-- Main Products Container -->
      <div class="container section">

        <!-- Product 1: Cocktail de Bissap -->
        <article id="bissap" class="product-deep-card">
          <div class="product-stage-box bissap">
            <img 
              src="/assets/images/bottle-bissap.png" 
              alt="Bouteille Nidj Juice Cocktail de Bissap" 
              class="product-stage-img"
              loading="lazy"
            />
          </div>
          <div class="product-deep-content">
            <span class="product-category-pill pill-bissap">Infusion Royale & Agrumes</span>
            <h2>Cocktail de Bissap</h2>
            <p class="product-story-quote">
              « L'élégance pourpre des calices d'hibiscus mariée à la fraîcheur vive de la menthe et des agrumes du terroir. »
            </p>
            <p class="editorial-body">
              Notre <strong>Cocktail de Bissap</strong> réinvente la boisson emblématique d'Afrique centrale. Les fleurs d'hibiscus sabdariffa sont infusées à basse température pour extraire leur robe rubis naturelle et leur puissant complexe d'antioxydants (polyphénols et vitamine C), adoucies par une touche délicate de jus d'ananas frais.
            </p>

            <div class="product-specs-grid">
              <div class="spec-item">
                <span class="spec-item-label">Contenance</span>
                <span class="spec-item-val">50 cl</span>
              </div>
              <div class="spec-item">
                <span class="spec-item-label">Origine Ingrédients</span>
                <span class="spec-item-val">Cameroun 237</span>
              </div>
              <div class="spec-item">
                <span class="spec-item-label">Conservation</span>
                <span class="spec-item-val">Entre +2°C et +6°C</span>
              </div>
              <div class="spec-item">
                <span class="spec-item-label">Prix Conseillé</span>
                <span class="spec-item-val">1 000 FCFA</span>
              </div>
            </div>

            <div class="hero-cta-group" style="margin-top: 20px;">
              <a href="/saveurs/cocktail-bissap" class="btn btn-primary">
                <span>Découvrir la page dédiée</span>
                <span class="btn-arrow-circle" aria-hidden="true">↗</span>
              </a>
              <button type="button" class="btn btn-outline order-flavor-btn" data-flavor-name="Cocktail de Bissap">
                <span>Commander</span>
              </button>
              <a href="/points-de-vente" class="btn btn-ghost">
                <span>Points de vente</span>
              </a>
            </div>
          </div>
        </article>

        <!-- Product 2: Jus d'Ananas Gingembre -->
        <article id="ananas" class="product-deep-card">
          <div class="product-stage-box ananas">
            <img 
              src="/assets/images/bottle-ananas.png" 
              alt="Bouteille Nidj Juice Ananas Gingembre" 
              class="product-stage-img"
              loading="lazy"
            />
          </div>
          <div class="product-deep-content">
            <span class="product-category-pill pill-ananas">Énergie Pure & Tonus Naturel</span>
            <h2>Jus d'Ananas Gingembre</h2>
            <p class="product-story-quote">
              « Le soleil généreux de l'ananas camerounais réveillé par la force revigorante du gingembre sauvage. »
            </p>
            <p class="editorial-body">
              Pressé à partir d'ananas gorgés de soleil récoltés sur les terroirs fertiles du Cameroun, ce nectar offre une attaque ronde et fruitée immédiatement sublimée par la chaleur épicée du gingembre frais. Recommandé pour stimuler le système immunitaire, faciliter la digestion et apporter une vitalité naturelle sans coup de fatigue.
            </p>

            <div class="product-specs-grid">
              <div class="spec-item">
                <span class="spec-item-label">Contenance</span>
                <span class="spec-item-val">50 cl</span>
              </div>
              <div class="spec-item">
                <span class="spec-item-label">Origine Fruits</span>
                <span class="spec-item-val">Penja & Centre</span>
              </div>
              <div class="spec-item">
                <span class="spec-item-label">Bienfaits</span>
                <span class="spec-item-val">Digestion & Énergie</span>
              </div>
              <div class="spec-item">
                <span class="spec-item-label">Prix Conseillé</span>
                <span class="spec-item-val">1 000 FCFA</span>
              </div>
            </div>

            <div class="hero-cta-group" style="margin-top: 20px;">
              <a href="/saveurs/ananas-gingembre" class="btn btn-primary">
                <span>Découvrir la page dédiée</span>
                <span class="btn-arrow-circle" aria-hidden="true">↗</span>
              </a>
              <button type="button" class="btn btn-outline order-flavor-btn" data-flavor-name="Ananas Gingembre">
                <span>Commander</span>
              </button>
              <a href="/points-de-vente" class="btn btn-ghost">
                <span>Points de vente</span>
              </a>
            </div>
          </div>
        </article>

        <!-- Product 3: Pur Jus d'Ananas -->
        <article id="pur-ananas" class="product-deep-card">
          <div class="product-stage-box" style="background: radial-gradient(circle, rgba(212, 136, 6, 0.12) 0%, transparent 70%);">
            <img 
              src="/assets/images/bottle-ananas.png" 
              alt="Bouteille Nidj Juice Pur Jus d'Ananas" 
              class="product-stage-img"
              loading="lazy"
            />
          </div>
          <div class="product-deep-content">
            <span class="product-category-pill" style="background: rgba(212, 136, 6, 0.15); color: #B57400;">Pureté Solaire 100%</span>
            <h2>Pur Jus d'Ananas</h2>
            <p class="product-story-quote">
              « La quintessence du fruit pur cueilli à maturité parfaite sous le ciel tropical : une pulpe veloutée et une caresse dorée. »
            </p>
            <p class="editorial-body">
              100% pur jus extrait à froid sans aucune dilution ni sucre ajouté. Récolté dans les bassins alluviaux fertiles de Penja et du Littoral, ce nectar offre une douceur soyeuse et la fraîcheur authentique de l'ananas camerounais en bouteille.
            </p>

            <div class="product-specs-grid">
              <div class="spec-item">
                <span class="spec-item-label">Contenance</span>
                <span class="spec-item-val">50 cl</span>
              </div>
              <div class="spec-item">
                <span class="spec-item-label">Origine Fruits</span>
                <span class="spec-item-val">Penja & Littoral</span>
              </div>
              <div class="spec-item">
                <span class="spec-item-label">Bienfaits</span>
                <span class="spec-item-val">Vitamines C & Minéraux</span>
              </div>
              <div class="spec-item">
                <span class="spec-item-label">Prix Conseillé</span>
                <span class="spec-item-val">1 000 FCFA</span>
              </div>
            </div>

            <div class="hero-cta-group" style="margin-top: 20px;">
              <a href="/saveurs/pur-ananas" class="btn btn-primary">
                <span>Découvrir la page dédiée</span>
                <span class="btn-arrow-circle" aria-hidden="true">↗</span>
              </a>
              <button type="button" class="btn btn-outline order-flavor-btn" data-flavor-name="Pur Jus d'Ananas">
                <span>Commander</span>
              </button>
              <a href="/points-de-vente" class="btn btn-ghost">
                <span>Points de vente</span>
              </a>
            </div>
          </div>
        </article>

        <!-- Product 4: Pastèque Orange -->
        <article id="pasteque-orange" class="product-deep-card">
          <div class="product-stage-box" style="background: radial-gradient(circle, rgba(230, 57, 70, 0.12) 0%, transparent 70%);">
            <img 
              src="/assets/images/bottle-bissap.png" 
              alt="Bouteille Nidj Juice Pastèque Orange" 
              class="product-stage-img"
              loading="lazy"
            />
          </div>
          <div class="product-deep-content">
            <span class="product-category-pill" style="background: rgba(230, 57, 70, 0.15); color: #C40026;">Fraîcheur & Hydratation</span>
            <h2>Pastèque Orange</h2>
            <p class="product-story-quote">
              « La fraîcheur cristalline et désaltérante de la pastèque juteuse exaltée par le peps vitaminé de l'orange dorée. »
            </p>
            <p class="editorial-body">
              La rencontre ultra-désaltérante de la pastèque juteuse et de l'orange gorgée de soleil. Conçu pour apporter une sensation d'hydratation immédiate et revigorante lors des journées ensoleillées à Douala, Yaoundé et Kribi.
            </p>

            <div class="product-specs-grid">
              <div class="spec-item">
                <span class="spec-item-label">Contenance</span>
                <span class="spec-item-val">50 cl</span>
              </div>
              <div class="spec-item">
                <span class="spec-item-label">Origine Fruits</span>
                <span class="spec-item-val">Sud & Ouest</span>
              </div>
              <div class="spec-item">
                <span class="spec-item-label">Bienfaits</span>
                <span class="spec-item-val">Hydratation & Lycopène</span>
              </div>
              <div class="spec-item">
                <span class="spec-item-label">Prix Conseillé</span>
                <span class="spec-item-val">1 000 FCFA</span>
              </div>
            </div>

            <div class="hero-cta-group" style="margin-top: 20px;">
              <a href="/saveurs/pasteque-orange" class="btn btn-primary">
                <span>Découvrir la page dédiée</span>
                <span class="btn-arrow-circle" aria-hidden="true">↗</span>
              </a>
              <button type="button" class="btn btn-outline order-flavor-btn" data-flavor-name="Pastèque Orange">
                <span>Commander</span>
              </button>
              <a href="/points-de-vente" class="btn btn-ghost">
                <span>Points de vente</span>
              </a>
            </div>
          </div>
        </article>

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
                  <th>Cocktail de Bissap</th>
                  <th>Ananas Gingembre</th>
                  <th>Standard Industriel Moyen</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Énergie</strong></td>
                  <td>38 kcal / 160 kJ</td>
                  <td>46 kcal / 195 kJ</td>
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
                  <td>8,9 g</td>
                  <td>11,2 g</td>
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
                  <td>18 mg (22% VNR)</td>
                  <td>26 mg (32% VNR)</td>
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
                  <td><span style="color: #58A826; font-weight:800;">AUCUN (Couleur 100% fleur)</span></td>
                  <td><span style="color: #58A826; font-weight:800;">AUCUN (Couleur 100% pulpe)</span></td>
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
  }
}
