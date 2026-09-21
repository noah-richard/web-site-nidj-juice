/* ==========================================================================
   NIDJ JUICE — CONVERSION & ORDER MODAL (WHATSAPP CAMEROON INTEGRATED)
   High-converting direct order flow • Accessible with focus trapping & validation
   ========================================================================== */

import { OFFICIAL_CONTACT } from '../../data/stores.data';
import { themeController } from '../../features/theme-controller';
import { audioController } from '../../features/audio-controller';
import { cmsService } from '../../services/cms.service';

export class OrderModal {
  private element: HTMLElement;
  private isOpen: boolean = false;
  private previouslyFocusedElement: HTMLElement | null = null;

  constructor() {
    this.element = document.createElement('div');
    this.element.id = 'orderModalContainer';
    this.element.className = 'modal-backdrop';
    this.element.setAttribute('role', 'dialog');
    this.element.setAttribute('aria-modal', 'true');
    this.element.setAttribute('aria-hidden', 'true');
    this.element.setAttribute('aria-labelledby', 'orderModalTitle');
    this.render();
    this.bindEvents();
  }

  public getElement(): HTMLElement {
    return this.element;
  }

  public refresh(): void {
    if (!this.isOpen) {
      this.render();
      this.bindEvents();
    }
  }

  private render(): void {
    const activeFlavor = themeController.getFlavor();
    const products = cmsService.getProducts();

    this.element.innerHTML = `
      <div class="modal-dialog">
        <div class="modal-content">
          
          <!-- Modal Header -->
          <div class="modal-header">
            <div class="modal-title-group">
              <span class="badge">Commande Express Cameroun</span>
              <h3 class="modal-title" id="orderModalTitle">Votre Pack Nidj Juice Frais</h3>
            </div>
            <button type="button" class="modal-close-btn" id="modalCloseBtn" aria-label="Fermer la fenêtre de commande">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <!-- Form Body -->
          <form class="order-form" id="nidjOrderForm" novalidate>
            
            <!-- Flavor Selection -->
            <div class="form-group">
              <label class="form-label" for="orderFlavor">Senteur Souhaitée *</label>
              <select class="form-select" id="orderFlavor" required>
                ${products.map((p) => `
                  <option value="${p.name}" ${p.id.includes(activeFlavor) ? 'selected' : ''}>${p.name} (${p.tag || p.subtitle})</option>
                `).join('')}
                <option value="Pack Mixte Découverte">Pack Découverte (Toutes Saveurs)</option>
              </select>
            </div>

            <!-- Format & Quantity Row -->
            <div class="form-row">
              <div class="form-group">
                <label class="form-label" for="orderFormat">Format de Bouteille *</label>
                <select class="form-select" id="orderFormat" required>
                  <option value="Pack 6x Bouteilles 50cl">Pack 6x Bouteilles 50 cl (Recommandé)</option>
                  <option value="Pack 12x Bouteilles 50cl">Carton 12x Bouteilles 50 cl</option>
                  <option value="Bouteille 1 Litre Familiale">Bouteille 1 Litre Familiale</option>
                  <option value="Pack 6x 1 Litre">Carton 6x 1 Litre</option>
                  <option value="Bouteille Unique 50cl">Bouteille individuelle 50 cl</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label" for="orderQuantity">Quantité</label>
                <div class="quantity-stepper">
                  <button type="button" class="stepper-btn" id="qtyMinus" aria-label="Diminuer la quantité">-</button>
                  <input type="number" id="orderQuantity" class="form-input text-center" value="1" min="1" max="50" />
                  <button type="button" class="stepper-btn" id="qtyPlus" aria-label="Augmenter la quantité">+</button>
                </div>
              </div>
            </div>

            <!-- Delivery Location -->
            <div class="form-row">
              <div class="form-group">
                <label class="form-label" for="orderCity">Ville au Cameroun *</label>
                <select class="form-select" id="orderCity" required>
                  <option value="Douala">Douala</option>
                  <option value="Yaoundé">Yaoundé</option>
                  <option value="Bafoussam">Bafoussam</option>
                  <option value="Kribi">Kribi</option>
                  <option value="Autre ville">Autre ville</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label" for="orderNeighborhood">Quartier & Précision *</label>
                <input 
                  type="text" 
                  id="orderNeighborhood" 
                  class="form-input" 
                  placeholder="Ex: Bonapriso, Bastos, Akwa..." 
                  required 
                />
              </div>
            </div>

            <!-- Contact Customer -->
            <div class="form-row">
              <div class="form-group">
                <label class="form-label" for="orderName">Votre Nom Complet *</label>
                <input 
                  type="text" 
                  id="orderName" 
                  class="form-input" 
                  placeholder="Ex: Paul Mbarga" 
                  required 
                />
              </div>

              <div class="form-group">
                <label class="form-label" for="orderPhone">Numéro WhatsApp / Appel *</label>
                <input 
                  type="tel" 
                  id="orderPhone" 
                  class="form-input" 
                  placeholder="Ex: 699 00 00 00" 
                  required 
                />
              </div>
            </div>

            <!-- Optional Store Hint -->
            <input type="hidden" id="orderStoreHint" value="" />

            <!-- Submit Button with WhatsApp Hook -->
            <div class="modal-footer">
              <button type="submit" class="btn btn-primary w-full btn-whatsapp-submit" id="submitOrderBtn">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                <span>Finaliser sur WhatsApp (+237)</span>
              </button>
              <p class="modal-guarantee">
                Vos informations sont transmises directement à l'équipe commerciale officielle de la Société Nidjeu.
              </p>
            </div>

          </form>

        </div>
      </div>
    `;
  }

  private bindEvents(): void {
    const closeBtn = this.element.querySelector('#modalCloseBtn');
    closeBtn?.addEventListener('click', () => this.close());

    // Steppers
    const minusBtn = this.element.querySelector('#qtyMinus');
    const plusBtn = this.element.querySelector('#qtyPlus');
    const qtyInput = this.element.querySelector('#orderQuantity') as HTMLInputElement;

    minusBtn?.addEventListener('click', () => {
      const val = parseInt(qtyInput.value, 10) || 1;
      if (val > 1) qtyInput.value = String(val - 1);
    });

    plusBtn?.addEventListener('click', () => {
      const val = parseInt(qtyInput.value, 10) || 1;
      if (val < 50) qtyInput.value = String(val + 1);
    });

    // Close on backdrop click
    this.element.addEventListener('click', (e) => {
      if (e.target === this.element) {
        this.close();
      }
    });

    // Close on ESC key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });

    // Form submit -> WhatsApp redirect
    const form = this.element.querySelector('#nidjOrderForm') as HTMLFormElement;
    form?.addEventListener('submit', (e) => {
      e.preventDefault();

      const flavor = (this.element.querySelector('#orderFlavor') as HTMLSelectElement).value;
      const format = (this.element.querySelector('#orderFormat') as HTMLSelectElement).value;
      const qty = (this.element.querySelector('#orderQuantity') as HTMLInputElement).value;
      const city = (this.element.querySelector('#orderCity') as HTMLSelectElement).value;
      const neighborhood = (this.element.querySelector('#orderNeighborhood') as HTMLInputElement).value.trim();
      const name = (this.element.querySelector('#orderName') as HTMLInputElement).value.trim();
      const phone = (this.element.querySelector('#orderPhone') as HTMLInputElement).value.trim();
      const storeHint = (this.element.querySelector('#orderStoreHint') as HTMLInputElement).value;

      if (!neighborhood || !name || !phone) {
        alert('Veuillez renseigner votre nom, quartier et numéro de téléphone.');
        return;
      }

      audioController.playPop();

      // Construct professional WhatsApp message
      let message = `*COMMANDE NIDJ JUICE — SITE OFFICIEL*\n\n`;
      message += `• Client : ${name}\n`;
      message += `• Téléphone : ${phone}\n`;
      message += `• Ville / Quartier : ${city} - ${neighborhood}\n\n`;
      message += `• Parfum : ${flavor}\n`;
      message += `• Format : ${format}\n`;
      message += `• Quantité : ${qty}\n`;

      if (storeHint) {
        message += `• Point de vente de référence : ${storeHint}\n`;
      }

      message += `\n_Message généré depuis le site officiel Nidj Juice (Société Nidjeu)_`;

      const encodedMsg = encodeURIComponent(message);
      const settings = cmsService.getSettings();
      const whatsappNum = settings.whatsappNumber ? settings.whatsappNumber.replace(/[^0-9]/g, '') : OFFICIAL_CONTACT.whatsappNumber;
      const whatsappUrl = `https://wa.me/${whatsappNum}?text=${encodedMsg}`;

      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      this.close();
    });

    // Global listener to open modal from any CTA
    window.addEventListener('nidj:open-order-modal', ((e: CustomEvent) => {
      const hint = e.detail?.storeHint;
      this.open(hint);
    }) as EventListener);
  }

  public open(storeHint?: string): void {
    this.previouslyFocusedElement = document.activeElement as HTMLElement;
    this.isOpen = true;
    this.element.classList.add('is-open');
    this.element.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Update flavor selector with current active theme
    const flavorSelect = this.element.querySelector('#orderFlavor') as HTMLSelectElement;
    if (flavorSelect) {
      const active = themeController.getFlavor();
      flavorSelect.value = active === 'bissap' ? 'Cocktail de Bissap' : "Jus d'Ananas Gingembre";
    }

    const hintInput = this.element.querySelector('#orderStoreHint') as HTMLInputElement;
    if (hintInput && storeHint) {
      hintInput.value = storeHint;
    }

    // Focus first input
    setTimeout(() => {
      const firstInput = this.element.querySelector('#orderFlavor') as HTMLElement;
      firstInput?.focus();
    }, 100);
  }

  public close(): void {
    this.isOpen = false;
    this.element.classList.remove('is-open');
    this.element.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    this.previouslyFocusedElement?.focus();
  }
}
