/* ==========================================================================
   NIDJ JUICE — COMPANY PAGE (/entreprise)
   The Nidj Company Corporate Portal (Coca-Cola / Pepsi Standard)
   Dynamically connected in Real-Time to CMS Service
   ========================================================================== */

import { cmsService } from '../services/cms.service';

export class CompanyPage {
  private element: HTMLElement;
  private unsubscribeCms: (() => void) | null = null;

  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'page page-company';
    this.render();
    this.bindEvents();
  }

  public getElement(): HTMLElement {
    return this.element;
  }

  private render(): void {
    const company = cmsService.getCompanyContent();

    this.element.innerHTML = `
      <!-- Page Hero Header -->
      <section class="page-hero">
        <div class="page-hero-glow" aria-hidden="true"></div>
        <div class="container">
          <nav class="page-breadcrumbs" aria-label="Fil d'Ariane">
            <a href="/">Accueil</a>
            <span class="breadcrumb-sep">/</span>
            <span>Entreprise</span>
          </nav>
          
          <div class="page-hero-tag">${company.tagline || 'Institutionnel • Société Nidjeu'}</div>
          <h1 class="page-hero-title">${company.leadTitle || "Valoriser la richesse naturelle du Cameroun à travers des nectars purs d'exception."}</h1>
          <p class="page-hero-subtitle">
            ${company.leadDesc || "Depuis sa création à Douala, la Société Nidjeu s'engage pour une nouvelle ère de boissons saines : des fruits frais locaux récoltés à maturité, une chaîne de transformation exigeante et la fierté d'un savoir-faire 100% camerounais."}
          </p>
        </div>
      </section>

      <!-- Sticky Quick Navigation Anchors -->
      <nav class="page-subnav-bar" aria-label="Navigation interne">
        <div class="container">
          <ul class="page-subnav-list">
            <li><a href="/entreprise#vision" class="page-subnav-link">Vision & Raison d'être</a></li>
            <li><a href="/entreprise#histoire" class="page-subnav-link">Histoire de Nidj Juice</a></li>
            <li><a href="/entreprise#savoir-faire" class="page-subnav-link">Le Savoir-Faire</a></li>
            <li><a href="/entreprise#gouvernance" class="page-subnav-link">Gouvernance Camerounaise</a></li>
            <li><a href="/entreprise#qualite" class="page-subnav-link">Normes & Traçabilité</a></li>
          </ul>
        </div>
      </nav>

      <!-- Main Corporate Content -->
      <div class="container section">
        
        <!-- Key Metrics Highlights -->
        <div class="stat-pillars-grid">
          <div class="stat-pillar-card">
            <div class="stat-pillar-number">${company.stat1Num || '100%'}</div>
            <div class="stat-pillar-title">${company.stat1Label || 'Naturel & Authentique'}</div>
            <div class="stat-pillar-desc">${company.stat1Desc || 'Zéro colorant chimique, aucun conservateur de synthèse ni sucre raffiné.'}</div>
          </div>
          <div class="stat-pillar-card">
            <div class="stat-pillar-number">${company.stat2Num || '237'}</div>
            <div class="stat-pillar-title">${company.stat2Label || 'Fierté Camerounaise'}</div>
            <div class="stat-pillar-desc">${company.stat2Desc || 'Fruits récoltés, pressés et conditionnés localement dans nos ateliers à Douala.'}</div>
          </div>
          <div class="stat-pillar-card">
            <div class="stat-pillar-number">${company.stat3Num || '+10'}</div>
            <div class="stat-pillar-title">${company.stat3Label || 'Points de Vente Agréés'}</div>
            <div class="stat-pillar-desc">${company.stat3Desc || 'Présence à Douala, Yaoundé, Bafoussam et Kribi avec livraison réfrigérée.'}</div>
          </div>
          <div class="stat-pillar-card">
            <div class="stat-pillar-number">${company.stat4Num || '1000+'}</div>
            <div class="stat-pillar-title">${company.stat4Label || 'Familles Agricoles'}</div>
            <div class="stat-pillar-desc">${company.stat4Desc || 'Partenariat direct avec les coopératives d’hibiscus du Nord et de fruits du Littoral.'}</div>
          </div>
        </div>

        <!-- Section 1: Vision & Raison d'être -->
        <section id="vision" class="editorial-split-grid">
          <div class="editorial-text-box">
            <span class="page-hero-tag">Mission 2030</span>
            <h2>${company.visionTitle || "Notre vision et notre raison d'être"}</h2>
            <p class="editorial-lead">
              ${company.visionDesc || "Redéfinir le marché des boissons en Afrique avec des créations saines, vivifiantes et fièrement ancrées dans nos terroirs."}
            </p>
            <p class="editorial-body">
              Face à l'omniprésence des sodas industriels surchargés en sucres raffinés et arômes synthétiques, la <strong>Société Nidjeu</strong> a fait le choix audacieux de l'intransigeance : redonner leurs lettres de noblesse aux trésors botaniques d'Afrique centrale. 
            </p>
            <p class="editorial-body">
              Notre raison d'être est simple : prouver qu'une entreprise camerounaise peut atteindre les plus hauts standards internationaux de qualité tout en valorisant les agriculteurs locaux et en promouvant la santé de nos consommateurs.
            </p>
            <div class="about-action">
              <a href="/saveurs" class="btn btn-primary">
                <span>Découvrir nos créations</span>
                <span class="btn-arrow-circle" aria-hidden="true">→</span>
              </a>
            </div>
          </div>
          <div class="editorial-media-box">
            <img 
              src="/assets/images/gallery-1.webp" 
              alt="Laboratoire et embouteillage Société Nidjeu" 
              class="editorial-img"
              loading="lazy"
            />
            <div class="media-caption-badge">
              Site de production Société Nidjeu • Douala, Cameroun
            </div>
          </div>
        </section>

        <!-- Section 2: Histoire de Nidj Juice (Timeline) -->
        <section id="histoire" class="section">
          <div class="section-header">
            <span class="page-hero-tag">L'Épopée</span>
            <h2 class="section-title">L'Histoire de Nidj Juice</h2>
            <p class="section-subtitle">D'un projet passionné à une référence incontournable de jus naturels au Cameroun.</p>
          </div>

          <div class="timeline-track">
            <div class="timeline-item">
              <span class="timeline-year">2023 — L'Idée Fondatrice</span>
              <h3 class="timeline-title">La redécouverte du Bissap et de l'Ananas</h3>
              <p class="timeline-desc">
                Constatant le manque de boissons artisanales prêtes à boire de qualité supérieure, les fondateurs de la Société Nidjeu initient des recettes secrètes sublimant l'infusion d'hibiscus royal et l'ananas de Penja.
              </p>
            </div>

            <div class="timeline-item">
              <span class="timeline-year">2024 — Le Laboratoire & Les Premières Bouteilles</span>
              <h3 class="timeline-title">Standardisation de la chaîne de fraîcheur</h3>
              <p class="timeline-desc">
                Mise en place d'un atelier d'extraction moderne à Douala. Élimination totale des conservateurs chimiques au profit d'un protocole d'hygiène stricte et d'un embouteillage sous atmosphère sécurisée.
              </p>
            </div>

            <div class="timeline-item">
              <span class="timeline-year">2025 — Expansion Nationale</span>
              <h3 class="timeline-title">Entrée dans les supermarchés et lounges</h3>
              <p class="timeline-desc">
                Nidj Juice conquiert les tables des grands restaurants et les rayons des supermarchés de référence à Douala (Akwa, Bonapriso) et Yaoundé (Bastos), gagnant la confiance de milliers d'amateurs de pure fraîcheur.
              </p>
            </div>

            <div class="timeline-item">
              <span class="timeline-year">2026 & Au-delà — Le Standard FMCG</span>
              <h3 class="timeline-title">Vers un rayonnement sous-régional</h3>
              <p class="timeline-desc">
                Structuration de la marque avec une plateforme digitale moderne, une application mobile dédiée et une logistique B2B capable d'approvisionner l'ensemble du réseau national.
              </p>
            </div>
          </div>
        </section>

        <!-- Section 3: Le Savoir-Faire Société Nidjeu -->
        <section id="savoir-faire" class="editorial-split-grid reverse">
          <div class="editorial-text-box">
            <span class="page-hero-tag">Excellence Agro-Industrielle</span>
            <h2>${company.savoirFaireTitle || "Le savoir-faire Société Nidjeu"}</h2>
            <p class="editorial-lead">
              ${company.savoirFaireDesc || "Une alliance subtile entre tradition africaine et rigueur technologique contemporaine."}
            </p>
            <p class="editorial-body">
              Chaque bouteille de <strong>Nidj Juice</strong> passe par un processus méticuleux :
            </p>
            <ul class="editorial-body" style="padding-left: 20px; margin-bottom: 20px;">
              <li><strong>Sélection manuelle :</strong> Tri rigoureux des fruits à maturité optimale sur les plantations camerounaises.</li>
              <li><strong>Extraction douce :</strong> Pressage ménageant les fibres et conservant les antioxydants naturels.</li>
              <li><strong>Infusion lente :</strong> Les calices d'hibiscus sont infusés à température contrôlée pour libérer leur robe pourpre et leurs arômes floraux.</li>
              <li><strong>Mise en bouteille hermétique :</strong> Conditionnement immédiat pour préserver le pétillement naturel et la fraîcheur en bouche.</li>
            </ul>
          </div>
          <div class="editorial-media-box">
            <img 
              src="/assets/images/gallery-2.webp" 
              alt="Sélection des fruits frais et embouteillage" 
              class="editorial-img"
              loading="lazy"
            />
            <div class="media-caption-badge">
              Contrôle qualité permanent en laboratoire certifié
            </div>
          </div>
        </section>

        <!-- Section 4: Direction & Gouvernance Camerounaise -->
        <section id="gouvernance" class="section">
          <div class="section-header">
            <span class="page-hero-tag">Leadership</span>
            <h2 class="section-title">Direction & Gouvernance Camerounaise</h2>
            <p class="section-subtitle">
              Une gouvernance ancrée dans les réalités économiques du pays, portée par une équipe passionnée d'ingénieurs agronomes, de maîtres de chai et de logisticiens.
            </p>
          </div>

          <div class="editorial-split-grid">
            <div class="editorial-media-box">
              <img 
                src="/assets/images/gallery-3.webp" 
                alt="Équipe Société Nidjeu" 
                class="editorial-img"
                loading="lazy"
              />
            </div>
            <div class="editorial-text-box">
              <h3>Une éthique d'entreprise exemplaire</h3>
              <p class="editorial-body">
                La <strong>Société Nidjeu</strong> applique les principes de bonne gouvernance d'entreprise : transparence comptable, rémunération équitable des collaborateurs et des producteurs, et réinvestissement constant dans la modernisation des équipements de production au Cameroun.
              </p>
              <p class="editorial-body">
                Nous croyons fermement à la création de valeur locale. Tous nos emplois directs et indirects contribuent à dynamiser le tissu économique de la région du Littoral et du Centre.
              </p>
            </div>
          </div>
        </section>

        <!-- Section 5: Normes de Qualité et Traçabilité -->
        <section id="qualite" class="editorial-split-grid">
          <div class="editorial-text-box">
            <span class="page-hero-tag">Sécurité Sanitaire</span>
            <h2>Normes de qualité et traçabilité</h2>
            <p class="editorial-lead">
              Votre santé et votre plaisir gustatif ne font aucun compromis.
            </p>
            <p class="editorial-body">
              Chaque lot produit dispose d'un numéro d'identification unique permettant de remonter jusqu'à la coopérative d'origine des fruits. Nos bouteilles sont contrôlées pour leur étanchéité, leur niveau de pH naturel et leur stabilité microbiologique avant toute mise sur le marché.
            </p>
            <div class="about-action">
              <a href="/points-de-vente" class="btn btn-outline">
                <span>Trouver nos points de vente agréés</span>
              </a>
            </div>
          </div>
          <div class="editorial-media-box">
            <img 
              src="/assets/images/gallery-4.webp" 
              alt="Normes et traçabilité Nidj Juice" 
              class="editorial-img"
              loading="lazy"
            />
            <div class="media-caption-badge">
              Traçabilité totale du verger au verre
            </div>
          </div>
        </section>

        <!-- Bottom Corporate CTA Banner -->
        <div class="b2b-distributor-card" style="margin-top: var(--space-12);">
          <div class="b2b-content">
            <span class="badge">Partenariat & Distribution</span>
            <h3 class="b2b-title">Vous partagez notre exigence d'excellence ?</h3>
            <p class="b2b-desc">
              Que vous soyez restaurateur, gérant d'hôtel ou acheteur pour la grande distribution, rejoignez le réseau officiel de la Société Nidjeu.
            </p>
          </div>
          <div class="b2b-actions">
            <a href="/b2b" class="btn btn-primary">
              <span>Espace Professionnels & B2B</span>
              <span class="btn-arrow-circle">→</span>
            </a>
          </div>
        </div>

      </div>
    `;
  }

  private bindEvents(): void {
    if (!this.unsubscribeCms) {
      this.unsubscribeCms = cmsService.onDataChanged(() => {
        this.render();
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
