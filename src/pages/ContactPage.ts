/* ==========================================================================
   NIDJ JUICE — CONTACT PAGE (/contact)
   Consumer & Corporate Contact Portal with Interactive FAQ
   ========================================================================== */

import { OFFICIAL_CONTACT } from '../data/stores.data';

export class ContactPage {
  private element: HTMLElement;

  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'page page-contact';
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
            <span>Contact</span>
          </nav>
          
          <div class="page-hero-tag">Service Consommateurs & Siège • Société Nidjeu</div>
          <h1 class="page-hero-title">Comment pouvons-nous vous aider aujourd'hui ?</h1>
          <p class="page-hero-subtitle">
            Une question sur nos ingrédients ? Une commande personnalisée ? Notre équipe camerounaise est à votre écoute du lundi au samedi de 8h à 18h.
          </p>
        </div>
      </section>

      <!-- Main Contact Content -->
      <div class="container section">

        <!-- 3 Contact Cards -->
        <div class="stat-pillars-grid" style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));">
          
          <!-- Card 1: WhatsApp Hotline -->
          <div class="stat-pillar-card">
            <div style="font-size: 2rem; margin-bottom: 8px;">💬</div>
            <div class="stat-pillar-title">Hotline WhatsApp Directe</div>
            <div class="stat-pillar-desc" style="margin-bottom: 16px;">Réponse instantanée pour commandes rapides et livraisons.</div>
            <a 
              href="https://wa.me/${OFFICIAL_CONTACT.whatsappNumber}?text=Bonjour%20Soci%C3%A9t%C3%A9%20Nidjeu,%20j'ai%20une%20question%20sur%20Nidj%20Juice." 
              target="_blank" 
              rel="noopener noreferrer" 
              class="btn btn-primary"
              style="padding: 8px 18px; font-size: 0.8rem;"
            >
              <span>Discuter sur WhatsApp</span>
            </a>
          </div>

          <!-- Card 2: Appel & Service Client -->
          <div class="stat-pillar-card">
            <div style="font-size: 2rem; margin-bottom: 8px;">📞</div>
            <div class="stat-pillar-title">Téléphone & Service Client</div>
            <div class="stat-pillar-desc" style="margin-bottom: 16px;">Appelez notre standard au Cameroun pour vos réservations.</div>
            <a 
              href="tel:+237699000000" 
              class="btn btn-outline"
              style="padding: 8px 18px; font-size: 0.8rem;"
            >
              <span>${OFFICIAL_CONTACT.phoneDisplay}</span>
            </a>
          </div>

          <!-- Card 3: Email & Siège Social -->
          <div class="stat-pillar-card">
            <div style="font-size: 2rem; margin-bottom: 8px;">✉️</div>
            <div class="stat-pillar-title">Courrier Électronique</div>
            <div class="stat-pillar-desc" style="margin-bottom: 16px;">Pour les partenariats institutionnels et candidatures.</div>
            <a 
              href="mailto:${OFFICIAL_CONTACT.email}" 
              class="btn btn-outline"
              style="padding: 8px 18px; font-size: 0.8rem;"
            >
              <span>${OFFICIAL_CONTACT.email}</span>
            </a>
          </div>

        </div>

        <!-- Split Grid: Interactive Message Form & Offices Location -->
        <div class="editorial-split-grid" style="margin-top: var(--space-12);">
          
          <div class="b2b-form-card">
            <span class="page-hero-tag">Écrivez-nous</span>
            <h3 style="margin-bottom: 8px;">Envoyer un message en ligne</h3>
            <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 20px;">
              Transmettez-nous vos remarques, suggestions ou demandes spécifiques.
            </p>

            <form id="consumerContactForm">
              <div class="form-row-2">
                <div class="form-group">
                  <label class="form-label" for="contactName">Votre Nom Complet *</label>
                  <input type="text" id="contactName" class="form-control" placeholder="Jean Dupont" required />
                </div>
                <div class="form-group">
                  <label class="form-label" for="contactPhone">Numéro de Téléphone *</label>
                  <input type="tel" id="contactPhone" class="form-control" placeholder="+237 6XX XX XX XX" required />
                </div>
              </div>

              <div class="form-group">
                <label class="form-label" for="contactSubject">Objet de la Demande</label>
                <select id="contactSubject" class="form-control">
                  <option value="Information sur les produits">Information sur les produits</option>
                  <option value="Suivi de commande & livraison">Suivi de commande & livraison</option>
                  <option value="Partenariat ou distribution">Partenariat ou distribution</option>
                  <option value="Autre demande">Autre demande</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label" for="contactMsg">Votre Message *</label>
                <textarea id="contactMsg" class="form-control" rows="4" placeholder="Comment pouvons-nous vous renseigner ?" required></textarea>
              </div>

              <button type="submit" class="btn btn-primary w-full" style="width: 100%; padding: 14px;">
                <span>Envoyer le Message</span>
                <span class="btn-arrow-circle">→</span>
              </button>
            </form>
          </div>

          <!-- Offices & Headquarters info -->
          <div class="editorial-text-box">
            <span class="page-hero-tag">Implantation</span>
            <h2>Siège Social & Ateliers</h2>
            
            <div style="margin-top: 20px;">
              <h4 style="color: var(--color-brand-deep-green); margin-bottom: 4px;">Atelier & Direction Douala</h4>
              <p class="editorial-body">
                Société Nidjeu, Zone industrielle & commerciale, Douala, Région du Littoral, Cameroun.<br />
                Ouvert du lundi au vendredi de 8h00 à 18h00, samedi de 8h00 à 13h00.
              </p>

              <h4 style="color: var(--color-brand-deep-green); margin-bottom: 4px; margin-top: 16px;">Antenne de Liaison Yaoundé</h4>
              <p class="editorial-body">
                Plateforme logistique Bastos / Centre-ville, Yaoundé, Région du Centre, Cameroun.<br />
                Coordination des approvisionnements et livraisons régionales.
              </p>
            </div>
          </div>

        </div>

        <!-- Section: Interactive FAQ Accordion -->
        <section class="section" style="margin-top: var(--space-8);">
          <div class="section-header">
            <span class="page-hero-tag">Foire Aux Questions</span>
            <h2 class="section-title">Questions Fréquentes</h2>
            <p class="section-subtitle">
              Retrouvez rapidement les réponses aux interrogations les plus courantes sur nos boissons et nos services.
            </p>
          </div>

          <div class="faq-accordion">
            
            <div class="faq-item is-open">
              <button type="button" class="faq-trigger">
                <span>Combien de temps se conservent les jus Nidj Juice ?</span>
                <span class="faq-chevron">▾</span>
              </button>
              <div class="faq-content">
                Nos jus étant 100% naturels sans aucun conservateur chimique, ils doivent être conservés au frais entre +2°C et +6°C. Une fois ouverts, nous vous conseillons de les consommer dans les 48 heures pour profiter de toute la vivacité des vitamines et des arômes de fruits frais.
              </div>
            </div>

            <div class="faq-item">
              <button type="button" class="faq-trigger">
                <span>Les jus contiennent-ils du sucre ajouté ?</span>
                <span class="faq-chevron">▾</span>
              </button>
              <div class="faq-content">
                Non ! La saveur douce et généreuse de nos nectars provient exclusivement du jus naturel des ananas mûris au soleil camerounais et des arômes intenses des fleurs d'hibiscus et du gingembre sauvage. Aucun sucre raffiné ni sirop de maïs n'est ajouté.
              </div>
            </div>

            <div class="faq-item">
              <button type="button" class="faq-trigger">
                <span>Puis-je commander pour un mariage ou une cérémonie ?</span>
                <span class="faq-chevron">▾</span>
              </button>
              <div class="faq-content">
                Absolument. Nous disposons d'offres événementielles par cartons de 12 et 24 bouteilles avec tarif dégressif. Nous assurons la livraison directement sur le lieu de votre réception dans des bacs isothermes avec glace pour un service parfait.
              </div>
            </div>

            <div class="faq-item">
              <button type="button" class="faq-trigger">
                <span>Quels sont les délais de livraison à Douala et Yaoundé ?</span>
                <span class="faq-chevron">▾</span>
              </button>
              <div class="faq-content">
                Pour les commandes passées avant 12h, nous assurons la livraison le jour même à Douala et Yaoundé. Pour les autres villes (Bafoussam, Kribi), un délai de 24h est appliqué pour préserver l'intégrité de la chaîne du froid.
              </div>
            </div>

          </div>
        </section>

      </div>
    `;
  }

  private bindEvents(): void {
    // Accordion toggle
    const triggers = this.element.querySelectorAll('.faq-trigger');
    triggers.forEach((trigger) => {
      trigger.addEventListener('click', (e) => {
        const item = (e.currentTarget as HTMLElement).closest('.faq-item');
        item?.classList.toggle('is-open');
      });
    });

    // Form submit via WhatsApp
    const form = this.element.querySelector('#consumerContactForm') as HTMLFormElement;
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = (this.element.querySelector('#contactName') as HTMLInputElement).value;
      const phone = (this.element.querySelector('#contactPhone') as HTMLInputElement).value;
      const subject = (this.element.querySelector('#contactSubject') as HTMLSelectElement).value;
      const msg = (this.element.querySelector('#contactMsg') as HTMLTextAreaElement).value;

      const message = `Bonjour Société Nidjeu,\n\nNom : ${name}\nTéléphone : ${phone}\nObjet : ${subject}\n\nMessage : ${msg}`;
      const waUrl = `https://wa.me/${OFFICIAL_CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`;

      window.open(waUrl, '_blank');
    });
  }
}
