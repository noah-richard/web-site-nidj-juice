/* ==========================================================================
   NIDJ JUICE — LOCATIONS PAGE (/points-de-vente)
   Full Interactive Store Locator & Cameroon Distribution Network
   ========================================================================== */

import { StoreLocator } from '../components/locator/StoreLocator';

export class LocationsPage {
  private element: HTMLElement;

  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'page page-locations';
    this.render();
  }

  public getElement(): HTMLElement {
    return this.element;
  }

  private render(): void {
    const heroHeader = document.createElement('section');
    heroHeader.className = 'page-hero';
    heroHeader.innerHTML = `
      <div class="page-hero-glow" aria-hidden="true"></div>
      <div class="container">
        <nav class="page-breadcrumbs" aria-label="Fil d'Ariane">
          <a href="/">Accueil</a>
          <span class="breadcrumb-sep">/</span>
          <span>Points de vente</span>
        </nav>
        
        <div class="page-hero-tag">Réseau National • Cameroun</div>
        <h1 class="page-hero-title">Où trouver et déguster Nidj Juice au Cameroun ?</h1>
        <p class="page-hero-subtitle">
          Découvrez notre réseau officiel de supermarchés, boutiques fines, stations et lounges partenaires à Douala, Yaoundé, Bafoussam et Kribi.
        </p>
      </div>
    `;

    this.element.appendChild(heroHeader);

    // Mount interactive Store Locator
    const locator = new StoreLocator();
    this.element.appendChild(locator.getElement());
  }
}
