/* ==========================================================================
   NIDJ JUICE — PROMO ORDER BANNER (MOCKUP COMPLIANT)
   Horizontal berry/fruit banner with embedded instant order form & floating bottle
   ========================================================================== */

import { audioController } from '../../features/audio-controller';
import { cmsService } from '../../services/cms.service';

export class PromoOrderBanner {
  private element: HTMLElement;

  constructor() {
    this.element = document.createElement('section');
    this.element.id = 'order';
    this.element.className = 'section promo-banner-section';
    this.render();
    this.bindEvents();
  }

  public getElement(): HTMLElement {
    return this.element;
  }

  private render(): void {
    this.element.innerHTML = `
      <div class="container">
        
        <div class="promo-banner-card">
          
          <!-- Background Splash Overlay -->
          <div class="promo-splash-overlay" aria-hidden="true"></div>

          <div class="promo-grid">
            
            <!-- Left Text Column -->
            <div class="promo-content">
              <h2 class="promo-title">
                Choisissez <br />
                <strong>Nidj Juice</strong>
              </h2>
              <p class="promo-desc">
                Faites le plein d’énergie et de vitamines chaque jour ! Livraison express de vos packs frais à Douala, Yaoundé et dans tout le Cameroun.
              </p>
            </div>

            <!-- Center Visual Bottle with Splash -->
            <div class="promo-visual">
              <img 
                src="/assets/images/splash-bissap.png" 
                alt="Splash" 
                class="promo-splash-img" 
                aria-hidden="true"
              />
              <img 
                src="/assets/images/bottle-bissap.png" 
                alt="Bouteille Nidj Juice" 
                class="promo-bottle-img"
              />
            </div>

            <!-- Right Direct Quick Form matching Mockup -->
            <div class="promo-form-wrapper">
              <form class="promo-inline-form" id="promoInlineForm" novalidate>
                
                <div class="promo-input-group">
                  <input 
                    type="text" 
                    id="promoName" 
                    class="promo-input" 
                    placeholder="Votre nom complet" 
                    required 
                  />
                </div>

                <div class="promo-input-group">
                  <input 
                    type="tel" 
                    id="promoPhone" 
                    class="promo-input" 
                    placeholder="Numéro WhatsApp (ex: 699 00 00 00)" 
                    required 
                  />
                </div>

                <div class="promo-input-group">
                  <input 
                    type="text" 
                    id="promoCity" 
                    class="promo-input" 
                    placeholder="Ville & Quartier (ex: Douala - Akwa)" 
                    required 
                  />
                </div>

                <button type="submit" class="btn btn-primary promo-submit-btn">
                  <span>Envoyer ma commande</span>
                  <span class="btn-arrow-circle" aria-hidden="true">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </span>
                </button>

              </form>
            </div>

          </div>

        </div>

      </div>
    `;
  }

  private bindEvents(): void {
    const form = this.element.querySelector('#promoInlineForm') as HTMLFormElement;
    form?.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = (this.element.querySelector('#promoName') as HTMLInputElement).value.trim();
      const phone = (this.element.querySelector('#promoPhone') as HTMLInputElement).value.trim();
      const city = (this.element.querySelector('#promoCity') as HTMLInputElement).value.trim();

      if (!name || !phone || !city) {
        alert('Veuillez renseigner votre nom, téléphone et quartier de livraison.');
        return;
      }

      audioController.playPop();

      const message = `*NOUVELLE COMMANDE RAPIDE — NIDJ JUICE*\n\n` +
        `• Client : ${name}\n` +
        `• WhatsApp / Tel : ${phone}\n` +
        `• Lieu de livraison : ${city}\n\n` +
        `_Commande initiée depuis la bannière officielle Nidj Juice (Société Nidjeu)_`;

      const settings = cmsService.getSettings();
      const whatsappNum = settings.whatsappNumber ? settings.whatsappNumber.replace(/[^0-9]/g, '') : '237677426612';
      const url = `https://wa.me/${whatsappNum}?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  }
}
