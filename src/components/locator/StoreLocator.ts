/* ==========================================================================
   NIDJ JUICE — STORE LOCATOR & CAMEROON DISTRIBUTION NETWORK
   Interactive directory for Douala, Yaoundé, Bafoussam, Kribi + B2B Inquiries
   ========================================================================== */

import { STORE_LOCATIONS, OFFICIAL_CONTACT } from '../../data/stores.data';
import type { StoreLocation } from '../../types/product.types';

export class StoreLocator {
  private element: HTMLElement;
  private currentCityFilter: string = 'all';
  private searchQuery: string = '';

  constructor() {
    this.element = document.createElement('section');
    this.element.id = 'locator';
    this.element.className = 'section locator-section';
    this.render();
    this.bindEvents();
  }

  public getElement(): HTMLElement {
    return this.element;
  }

  private getFilteredStores(): StoreLocation[] {
    return STORE_LOCATIONS.filter((store) => {
      const matchCity = this.currentCityFilter === 'all' || store.city.toLowerCase() === this.currentCityFilter.toLowerCase();
      const matchQuery =
        !this.searchQuery ||
        store.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        store.neighborhood.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        store.address.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchCity && matchQuery;
    });
  }

  private render(): void {
    const stores = this.getFilteredStores();

    this.element.innerHTML = `
      <div class="container">
        
        <div class="section-header">
          <div class="badge">
            <span>Réseau De Distribution National</span>
          </div>
          <h2 class="section-title">Où Savourer Nidj Juice Au Cameroun ?</h2>
          <p class="section-subtitle">
            Retrouvez nos bouteilles fraîches dans les meilleurs supermarchés, boutiques et lounges partenaires, ou faites-vous livrer en quelques clics.
          </p>
        </div>

        <!-- Filter Controls -->
        <div class="locator-controls">
          <div class="city-filter-tabs" role="tablist" aria-label="Filtrer par ville">
            <button type="button" class="city-tab is-active" data-city="all" role="tab" aria-selected="true">Toutes les villes</button>
            <button type="button" class="city-tab" data-city="Douala" role="tab" aria-selected="false">Douala</button>
            <button type="button" class="city-tab" data-city="Yaoundé" role="tab" aria-selected="false">Yaoundé</button>
            <button type="button" class="city-tab" data-city="Bafoussam" role="tab" aria-selected="false">Bafoussam</button>
            <button type="button" class="city-tab" data-city="Kribi" role="tab" aria-selected="false">Kribi</button>
          </div>

          <div class="locator-search-wrapper">
            <svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input 
              type="text" 
              class="locator-search-input" 
              id="locatorSearchInput" 
              placeholder="Rechercher un quartier (Bastos, Akwa, Bonapriso...)"
              aria-label="Rechercher un point de vente par quartier ou nom"
            />
          </div>
        </div>

        <!-- Stores Grid -->
        <div class="stores-grid" id="storesGrid">
          ${this.renderStoreCards(stores)}
        </div>

        <!-- B2B Distribution Banner -->
        <div class="b2b-distributor-card">
          <div class="b2b-content">
            <span class="badge">Espace Professionnel & Revendeurs</span>
            <h3 class="b2b-title">Vous Êtes Restaurateur, Hôtelier Ou Gérant De Supermarché ?</h3>
            <p class="b2b-desc">
              Rejoignez le réseau officiel de distribution de la <strong>Société Nidjeu</strong>. Bénéficiez de conditions tarifaires grossistes exclusives, d’une livraison régulière sur site et d’une PLV rafraîchissante haute visibilité.
            </p>
          </div>
          <div class="b2b-actions">
            <a 
              href="https://wa.me/${OFFICIAL_CONTACT.whatsappNumber}?text=Bonjour%20Soci%C3%A9t%C3%A9%20Nidjeu%2C%20je%20suis%20un%20professionnel%20et%20souhaite%20distribuer%20Nidj%20Juice." 
              target="_blank" 
              rel="noopener noreferrer" 
              class="btn btn-primary"
            >
              <span>Devenir Distributeur Agréé</span>
            </a>
          </div>
        </div>

      </div>
    `;
  }

  private renderStoreCards(stores: StoreLocation[]): string {
    if (stores.length === 0) {
      return `
        <div class="empty-stores-state">
          <span class="empty-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </span>
          <p class="empty-text">Aucun point de vente ne correspond à votre recherche.</p>
          <button type="button" class="btn btn-secondary btn-reset-search" id="resetSearchBtn">
            Réinitialiser les filtres
          </button>
        </div>
      `;
    }

    return stores.map((store) => `
      <div class="store-card">
        <!-- Store Image Banner -->
        <div class="store-image-wrap">
          <img 
            src="${store.image}" 
            alt="${store.name} — Point de vente Nidj Juice" 
            class="store-card-img" 
            loading="lazy" 
          />
          <div class="store-image-gradient" aria-hidden="true"></div>
          <span class="store-type-badge">${store.type}</span>
          <span class="store-city-pill">${store.city}</span>
        </div>

        <!-- Store Details Body -->
        <div class="store-card-body">
          <div class="store-meta-row">
            <span class="store-neighborhood-tag">${store.neighborhood}</span>
            ${store.openingHours ? `<span class="store-hours-tag">${store.openingHours}</span>` : ''}
          </div>
          
          <h3 class="store-name">${store.name}</h3>
          <p class="store-address">${store.address}</p>
          
          <div class="store-contact-row">
            <a href="tel:${store.phone.replace(/\s+/g, '')}" class="store-phone-link" aria-label="Appeler ${store.name}">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <span>${store.phone}</span>
            </a>
          </div>

          <div class="store-card-footer">
            <button type="button" class="btn btn-secondary store-order-trigger" data-store-name="${store.name}">
              <span>Commander ici</span>
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  private bindEvents(): void {
    // City tab switching
    const cityTabs = this.element.querySelectorAll('.city-tab');
    cityTabs.forEach((tab) => {
      tab.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        this.currentCityFilter = target.dataset.city || 'all';

        cityTabs.forEach((t) => {
          t.classList.remove('is-active');
          t.setAttribute('aria-selected', 'false');
        });
        target.classList.add('is-active');
        target.setAttribute('aria-selected', 'true');

        this.updateStoreList();
      });
    });

    // Search input
    const searchInput = this.element.querySelector('#locatorSearchInput') as HTMLInputElement;
    searchInput?.addEventListener('input', (e) => {
      this.searchQuery = (e.target as HTMLInputElement).value.trim();
      this.updateStoreList();
    });

    // Delegate store order triggers
    this.element.addEventListener('click', (e) => {
      const target = (e.target as HTMLElement).closest('.store-order-trigger') as HTMLElement;
      if (target) {
        const storeName = target.dataset.storeName || '';
        window.dispatchEvent(
          new CustomEvent('nidj:open-order-modal', {
            detail: { storeHint: storeName }
          })
        );
      }

      if ((e.target as HTMLElement).id === 'resetSearchBtn') {
        this.currentCityFilter = 'all';
        this.searchQuery = '';
        if (searchInput) searchInput.value = '';
        cityTabs.forEach((t, idx) => {
          t.classList.toggle('is-active', idx === 0);
          t.setAttribute('aria-selected', String(idx === 0));
        });
        this.updateStoreList();
      }
    });
  }

  private updateStoreList(): void {
    const grid = this.element.querySelector('#storesGrid');
    if (grid) {
      grid.innerHTML = this.renderStoreCards(this.getFilteredStores());
    }
  }
}
