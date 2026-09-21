/* ==========================================================================
   NIDJ JUICE — GLOBAL FOOTER (MOCKUP COMPLIANT)
   Wavy top border, deep forest green, corporate Nidjeu contacts
   ========================================================================== */

import { OFFICIAL_CONTACT } from '../../data/stores.data';

export class Footer {
  private element: HTMLElement;

  constructor() {
    this.element = document.createElement('footer');
    this.element.id = 'contact';
    this.element.className = 'site-footer';
    this.render();
  }

  public getElement(): HTMLElement {
    return this.element;
  }

  private render(): void {
    const currentYear = new Date().getFullYear();

    this.element.innerHTML = `
      <!-- Organic Wavy Curve matching Mockup -->
      <div class="footer-wave-top" aria-hidden="true">
        <svg viewBox="0 0 1440 120" fill="none" preserveAspectRatio="none">
          <path d="M0,40 C320,120 480,0 720,50 C960,100 1120,20 1440,60 L1440,120 L0,120 Z" fill="#0A3D22"></path>
        </svg>
      </div>

      <div class="footer-main-body">
        <div class="container footer-container">
          
          <div class="footer-columns-grid">
            
            <!-- Column 1: Brand & Cameroonian Heritage -->
            <div class="footer-col-brand">
              <a href="#" class="footer-brand-link" aria-label="Nidj Juice">
                <img 
                  src="/assets/images/logo-nidj.png" 
                  alt="Nidj Juice — Société Nidjeu" 
                  class="footer-logo-img"
                  width="140"
                />
              </a>

              <p class="footer-brand-text">
                Jus 100% naturels pour une vie saine et radieuse. Fièrement conçu et produit au Cameroun par la <strong>Société Nidjeu</strong>.
              </p>

              <div class="footer-social-row">
                <a 
                  href="https://wa.me/${OFFICIAL_CONTACT.whatsappNumber}" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  class="footer-social-pill"
                  aria-label="WhatsApp"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                </a>
                <a href="#" class="footer-social-pill" aria-label="Instagram">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
              </div>
            </div>

            <!-- Column 2: Navigation Links -->
            <div class="footer-col-nav">
              <h3 class="footer-title">Navigation</h3>
              <ul class="footer-nav-list">
                <li><a href="#story" class="footer-nav-link">À propos</a></li>
                <li><a href="#flavors" class="footer-nav-link">Nos Saveurs</a></li>
                <li><a href="#order" class="footer-nav-link">Commander</a></li>
                <li><a href="#locator" class="footer-nav-link">Points de vente</a></li>
                <li><a href="#reels" class="footer-nav-link">Vidéos</a></li>
              </ul>
            </div>

            <!-- Column 3: Corporate Contacts -->
            <div class="footer-col-contacts">
              <h3 class="footer-title">Contacts</h3>
              <ul class="footer-contacts-list">
                <li>
                  <a href="tel:+237699000000" class="footer-contact-link">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    <span>${OFFICIAL_CONTACT.phoneDisplay}</span>
                  </a>
                </li>
                <li>
                  <a href="mailto:${OFFICIAL_CONTACT.email}" class="footer-contact-link">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    <span>${OFFICIAL_CONTACT.email}</span>
                  </a>
                </li>
                <li>
                  <div class="footer-contact-item">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <span>Société Nidjeu, Douala & Yaoundé, Cameroun</span>
                  </div>
                </li>
              </ul>
            </div>

          </div>

          <!-- Bottom Copyright -->
          <div class="footer-copyright-bar">
            <p>&copy; ${currentYear} <strong>Nidj Juice</strong> — Société Nidjeu. Tous droits réservés.</p>
          </div>

        </div>
      </div>
    `;
  }
}
