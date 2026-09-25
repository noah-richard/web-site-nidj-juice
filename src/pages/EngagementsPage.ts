/* ==========================================================================
   NIDJ JUICE — ENGAGEMENTS PAGE (/engagements)
   Corporate Social Responsibility & Sustainability (Coca-Cola / Pepsi Standard)
   Dynamically connected in Real-Time to CMS Service
   ========================================================================== */

import { cmsService } from '../services/cms.service';

export class EngagementsPage {
  private element: HTMLElement;
  private unsubscribeCms: (() => void) | null = null;

  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'page page-engagements';
    this.render();
    this.bindEvents();
  }

  public getElement(): HTMLElement {
    return this.element;
  }

  private render(): void {
    const engagements = cmsService.getEngagementsContent();

    this.element.innerHTML = `
      <!-- Page Hero Header -->
      <section class="page-hero">
        <div class="page-hero-glow" aria-hidden="true"></div>
        <div class="container">
          <nav class="page-breadcrumbs" aria-label="Fil d'Ariane">
            <a href="/">Accueil</a>
            <span class="breadcrumb-sep">/</span>
            <span>Engagements</span>
          </nav>
          
          <div class="page-hero-tag">RSE & Développement Durable • Société Nidjeu</div>
          <h1 class="page-hero-title">${engagements.heroTitle || 'Produire durablement, valoriser nos planteurs et préserver la nature.'}</h1>
          <p class="page-hero-subtitle">
            ${engagements.heroSubtitle || "Chaque gorgée de Nidj Juice s'inscrit dans un engagement sociétal et environnemental fort : circuits courts, zéro chimie, rémunération juste de nos coopératives camerounaises et recyclage actif de nos contenants."}
          </p>
        </div>
      </section>

      <!-- Sticky Subnav Anchors -->
      <nav class="page-subnav-bar" aria-label="Navigation des engagements">
        <div class="container">
          <ul class="page-subnav-list">
            <li><a href="/engagements#filieres" class="page-subnav-link">Filière Équitable</a></li>
            <li><a href="/engagements#naturel" class="page-subnav-link">Zéro Chimie & Santé</a></li>
            <li><a href="/engagements#producteurs" class="page-subnav-link">Soutien aux Agriculteurs</a></li>
            <li><a href="/engagements#recyclage" class="page-subnav-link">Recyclage & Consigne</a></li>
            <li><a href="/engagements#froid" class="page-subnav-link">Énergie & Chaîne du Froid</a></li>
          </ul>
        </div>
      </nav>

      <!-- Main Engagements Content -->
      <div class="container section">

        <!-- 4 Key Impact Stat Cards -->
        <div class="stat-pillars-grid">
          <div class="stat-pillar-card">
            <div class="stat-pillar-number">${engagements.localImpactNum || '100%'}</div>
            <div class="stat-pillar-title">${engagements.localImpactLabel || 'Terroir Camerounais'}</div>
            <div class="stat-pillar-desc">Fruits et fleurs cultivés exclusivement par nos agriculteurs partenaires locaux.</div>
          </div>
          <div class="stat-pillar-card">
            <div class="stat-pillar-number">0%</div>
            <div class="stat-pillar-title">Pesticides & Chimie Ajoutée</div>
            <div class="stat-pillar-desc">Sélection de vergers respectueux des équilibres agronomiques naturels.</div>
          </div>
          <div class="stat-pillar-card">
            <div class="stat-pillar-number">+40</div>
            <div class="stat-pillar-title">Familles Agricoles Soutenues</div>
            <div class="stat-pillar-desc">Revenu garanti et contrats pluriannuels équitables avec nos coopératives.</div>
          </div>
          <div class="stat-pillar-card">
            <div class="stat-pillar-number">100%</div>
            <div class="stat-pillar-title">Bouteilles Recyclables</div>
            <div class="stat-pillar-desc">Programme de collecte et consigne responsable dans nos points de vente.</div>
          </div>
        </div>

        <!-- Pillar 1: Filières Équitables & Coopératives -->
        <section id="filieres" class="editorial-split-grid">
          <div class="editorial-text-box">
            <span class="page-hero-tag">Circuits Courts</span>
            <h2>${engagements.filieresTitle || "Filières d'approvisionnement équitable"}</h2>
            <p class="editorial-lead">
              Donner un pouvoir économique réel aux producteurs de nos campagnes.
            </p>
            <p class="editorial-body">
              ${engagements.filieresDesc || "Au lieu de passer par des intermédiaires spéculatifs, la Société Nidjeu contractualise directement avec les groupements de producteurs d'ananas de la région du Littoral et les cultivateurs traditionnels de calices d'hibiscus du Grand Nord et de l'Ouest."}
            </p>
            <p class="editorial-body">
              Cette approche garantit un prix d'achat supérieur au cours moyen du marché, assurant la stabilité financière des exploitations familiales et stimulant une agriculture de qualité.
            </p>
          </div>
          <div class="editorial-media-box">
            <img 
              src="${engagements.filieresImage || '/assets/images/gallery-3.webp'}" 
              alt="Planteurs partenaires Société Nidjeu" 
              class="editorial-img"
              loading="lazy"
            />
            <div class="media-caption-badge">
              Partenariat équitable et direct avec les coopératives camerounaises
            </div>
          </div>
        </section>

        <!-- Pillar 2: Zéro Conservateur Chimique -->
        <section id="naturel" class="editorial-split-grid reverse">
          <div class="editorial-text-box">
            <span class="page-hero-tag">Santé & Nutrition</span>
            <h2>Zéro conservateur chimique ni OGM</h2>
            <p class="editorial-lead">
              Protéger la santé des familles camerounaises avec des boissons vivantes.
            </p>
            <p class="editorial-body">
              Alors que de nombreux jus industriels utilisent le benzoate de sodium ou le sorbate de potassium pour masquer une hygiène défaillante ou prolonger artificiellement la durée de vie en rayon, Nidj Juice mise sur l'excellence technique.
            </p>
            <p class="editorial-body">
              Une chaîne du froid stricte et une pasteurisation flash à température maîtrisée suffisent à garantir une stabilité exemplaire, sans altérer les vitamines ni introduire de molécules cancérigènes ou allergènes.
            </p>
          </div>
          <div class="editorial-media-box">
            <img 
              src="${engagements.qualityImage || '/assets/images/gallery-1.webp'}" 
              alt="Contrôle qualité sans produit chimique" 
              class="editorial-img"
              loading="lazy"
            />
            <div class="media-caption-badge">
              Analyse physico-chimique sans additifs de synthèse
            </div>
          </div>
        </section>

        <!-- Pillar 3: Recyclage & Économie Circulaire -->
        <section id="recyclage" class="editorial-split-grid">
          <div class="editorial-text-box">
            <span class="page-hero-tag">Écologie & Zéro Déchet</span>
            <h2>${engagements.ecoTitle || 'Programme de recyclage et consigne responsable'}</h2>
            <p class="editorial-lead">
              Agir concrètement pour la propreté de nos villes à Douala, Yaoundé et Kribi.
            </p>
            <p class="editorial-body">
              ${engagements.ecoDesc || "Chaque bouteille Nidj Juice est conçue à partir de matériaux 100% recyclables. En partenariat avec les supermarchés et boutiques dépositaires, nous mettons en place des bacs de collecte dédiés permettant de récupérer les bouteilles usagées afin de les réintégrer dans les filières de valorisation plastique et verre au Cameroun."}
            </p>
            <p class="editorial-body">
              Rapporter vos bouteilles vides dans un point de vente agréé vous donne droit à des remises sur vos prochains achats !
            </p>
          </div>
          <div class="editorial-media-box">
            <img 
              src="${engagements.recyclingImage || '/assets/images/gallery-4.webp'}" 
              alt="Programme de recyclage des emballages" 
              class="editorial-img"
              loading="lazy"
            />
            <div class="media-caption-badge">
              Économie circulaire et préservation de l'environnement
            </div>
          </div>
        </section>

        <!-- Pillar 4: Chaîne du froid et Énergie Solaire -->
        <section id="froid" class="section">
          <div class="section-header">
            <span class="page-hero-tag">Logistique Verte</span>
            <h2 class="section-title">Consommation Énergétique & Chaîne du Froid</h2>
            <p class="section-subtitle">
              Des chambres froides modernes équipées de panneaux solaires pour limiter notre empreinte carbone.
            </p>
          </div>

          <div class="stat-pillars-grid">
            <div class="stat-pillar-card">
              <div class="stat-pillar-number">-35%</div>
              <div class="stat-pillar-title">Émissions Carbone Réduites</div>
              <div class="stat-pillar-desc">Optimisation des tournées de livraison et circuits d'approvisionnement courts.</div>
            </div>
            <div class="stat-pillar-card">
              <div class="stat-pillar-number">100%</div>
              <div class="stat-pillar-title">Froid Contrôlé</div>
              <div class="stat-pillar-desc">Capteurs thermiques temps réel pour garantir la qualité de la production à la dégustation.</div>
            </div>
          </div>
        </section>

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
