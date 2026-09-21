/* ==========================================================================
   NIDJ JUICE — B2B & PARTNERS PAGE (/b2b)
   Dedicated Portal for Wholesalers, Retailers, Cafés, Hotels & Supermarkets
   ========================================================================== */

import { OFFICIAL_CONTACT } from '../data/stores.data';

export class B2BPage {
  private element: HTMLElement;

  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'page page-b2b';
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
            <span>B2B & Réseau</span>
          </nav>
          
          <div class="page-hero-tag">Espace Professionnels • Société Nidjeu</div>
          <h1 class="page-hero-title">Rejoignez le réseau officiel de distribution Nidj Juice au Cameroun.</h1>
          <p class="page-hero-subtitle">
            Hôteliers, restaurateurs, gérants de supermarchés et organisateurs d'événements : proposez à votre clientèle l'excellence d'un jus 100% naturel plébiscité pour son authenticité et son goût d'exception.
          </p>
        </div>
      </section>

      <!-- Main Content -->
      <div class="container section">

        <!-- 4 Key B2B Advantages -->
        <div class="stat-pillars-grid">
          <div class="stat-pillar-card">
            <div class="stat-pillar-number">30%</div>
            <div class="stat-pillar-title">Marge Grossiste Attractive</div>
            <div class="stat-pillar-desc">Grille tarifaire dégressive par carton permettant une rentabilité immédiate et pérenne.</div>
          </div>
          <div class="stat-pillar-card">
            <div class="stat-pillar-number">24h</div>
            <div class="stat-pillar-title">Livraison Réfrigérée</div>
            <div class="stat-pillar-desc">Réapprovisionnement rapide à Douala et Yaoundé pour garantir un produit toujours ultra-frais.</div>
          </div>
          <div class="stat-pillar-card">
            <div class="stat-pillar-number">100%</div>
            <div class="stat-pillar-title">Supports PLV Fournis</div>
            <div class="stat-pillar-desc">Chevalets de table, vitrines réfrigérées brandées et affiches haute visibilité offertes.</div>
          </div>
          <div class="stat-pillar-card">
            <div class="stat-pillar-number">0</div>
            <div class="stat-pillar-title">Frais d'Adhésion</div>
            <div class="stat-pillar-desc">Contrat de distribution simple, transparent et sans engagement contraignant.</div>
          </div>
        </div>

        <!-- B2B Presentation & Benefits -->
        <section class="editorial-split-grid">
          <div class="editorial-text-box">
            <span class="page-hero-tag">Solutions Sur-Mesure</span>
            <h2>Une offre adaptée à chaque secteur d'activité</h2>
            <p class="editorial-lead">
              Nidj Juice sublime votre carte des boissons et valorise votre image de marque.
            </p>
            <div style="margin-bottom: 20px;">
              <h4 style="color: var(--color-brand-deep-green); margin-bottom: 4px;">Hôtels, Restaurants & Lounges (CHR)</h4>
              <p class="editorial-body">Offrez une alternative saine et raffinée aux sodas standards lors des petits-déjeuners, buffets et cocktails dînatoires.</p>
              
              <h4 style="color: var(--color-brand-deep-green); margin-bottom: 4px;">Supermarchés & Épiceries Fines</h4>
              <p class="editorial-body">Répondez à la demande croissante des consommateurs camerounais pour des boissons sans additifs chimiques produites localement.</p>
              
              <h4 style="color: var(--color-brand-deep-green); margin-bottom: 4px;">Événements & Séminaires d'Entreprise</h4>
              <p class="editorial-body">Commandes en volume par cartons de 12 ou 24 bouteilles avec étiquetage personnalisé possible pour vos réceptions d'envergure.</p>
            </div>
          </div>
          
          <!-- B2B Contact & Quote Form Card -->
          <div class="b2b-form-card">
            <span class="page-hero-tag">Formulaire Agréé</span>
            <h3 style="margin-bottom: 8px;">Demande d'Ouverture de Compte Pro</h3>
            <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 20px;">
              Remplissez ce formulaire pour recevoir la grille tarifaire grossiste sous 2 heures ouvrées.
            </p>

            <form id="b2bInquiryForm">
              <div class="form-row-2">
                <div class="form-group">
                  <label class="form-label" for="b2bCompany">Nom de votre Établissement *</label>
                  <input type="text" id="b2bCompany" class="form-control" placeholder="Hôtel, Restaurant, Boutique..." required />
                </div>
                <div class="form-group">
                  <label class="form-label" for="b2bCity">Ville d'Implantation *</label>
                  <select id="b2bCity" class="form-control" required>
                    <option value="Douala">Douala</option>
                    <option value="Yaoundé">Yaoundé</option>
                    <option value="Bafoussam">Bafoussam</option>
                    <option value="Kribi">Kribi</option>
                    <option value="Autre Ville">Autre Ville (Cameroun)</option>
                  </select>
                </div>
              </div>

              <div class="form-row-2">
                <div class="form-group">
                  <label class="form-label" for="b2bContactName">Nom du Responsable *</label>
                  <input type="text" id="b2bContactName" class="form-control" placeholder="M. / Mme..." required />
                </div>
                <div class="form-group">
                  <label class="form-label" for="b2bPhone">Téléphone / WhatsApp *</label>
                  <input type="tel" id="b2bPhone" class="form-control" placeholder="+237 6XX XX XX XX" required />
                </div>
              </div>

              <div class="form-group">
                <label class="form-label" for="b2bVolume">Volume Prévisionnel Mensuel</label>
                <select id="b2bVolume" class="form-control">
                  <option value="5 à 15 cartons / mois">5 à 15 cartons / mois (Boutique / Lounge)</option>
                  <option value="15 à 50 cartons / mois">15 à 50 cartons / mois (Restaurant / Hôtel)</option>
                  <option value="+50 cartons / mois">+50 cartons / mois (Supermarché / Grossiste)</option>
                  <option value="Commande ponctuelle Événement">Commande ponctuelle Événement</option>
                </select>
              </div>

              <button type="submit" class="btn btn-primary w-full" style="width: 100%; padding: 14px;">
                <span>Transmettre ma Demande Pro</span>
                <span class="btn-arrow-circle">→</span>
              </button>
            </form>

            <div style="margin-top: 20px; text-align: center;">
              <span style="font-size: 0.8rem; color: var(--text-muted);">Ou contact direct : </span>
              <a 
                href="https://wa.me/${OFFICIAL_CONTACT.whatsappNumber}?text=Bonjour%20Soci%C3%A9t%C3%A9%20Nidjeu,%20je%20souhaite%20ouvrir%20un%20compte%20professionnel%20distributeur." 
                target="_blank" 
                rel="noopener noreferrer" 
                style="color: var(--color-brand-green); font-weight: 700; text-decoration: none;"
              >
                WhatsApp Direct Distributeur (+237)
              </a>
            </div>

          </div>
        </section>

      </div>
    `;
  }

  private bindEvents(): void {
    const form = this.element.querySelector('#b2bInquiryForm') as HTMLFormElement;
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const company = (this.element.querySelector('#b2bCompany') as HTMLInputElement).value;
      const city = (this.element.querySelector('#b2bCity') as HTMLSelectElement).value;
      const name = (this.element.querySelector('#b2bContactName') as HTMLInputElement).value;
      const phone = (this.element.querySelector('#b2bPhone') as HTMLInputElement).value;
      const volume = (this.element.querySelector('#b2bVolume') as HTMLSelectElement).value;

      const message = `Bonjour Société Nidjeu, je souhaite devenir distributeur agréé Nidj Juice.\n\nÉtablissement : ${company}\nVille : ${city}\nResponsable : ${name}\nTéléphone : ${phone}\nVolume prévisionnel : ${volume}`;
      const waUrl = `https://wa.me/${OFFICIAL_CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`;

      window.open(waUrl, '_blank');
    });
  }
}
