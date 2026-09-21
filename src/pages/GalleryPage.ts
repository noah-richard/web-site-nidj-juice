/* ==========================================================================
   NIDJ JUICE — GALLERY PAGE (/galerie)
   Interactive Community, Events & Consumer Moments Gallery with Lightbox
   ========================================================================== */

import { GALLERY_CATEGORIES, GALLERY_ITEMS, type GalleryCategory, type GalleryItem } from '../data/gallery.data';
import { OFFICIAL_CONTACT } from '../data/stores.data';

export class GalleryPage {
  private element: HTMLElement;
  private currentCategory: GalleryCategory = 'all';
  private activeItem: GalleryItem | null = null;

  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'page page-gallery';
    this.render();
    this.bindEvents();
  }

  public getElement(): HTMLElement {
    return this.element;
  }

  public getActiveItem(): GalleryItem | null {
    return this.activeItem;
  }

  private getFilteredItems(): GalleryItem[] {
    if (this.currentCategory === 'all') {
      return GALLERY_ITEMS;
    }
    return GALLERY_ITEMS.filter((item) => item.category === this.currentCategory);
  }

  private render(): void {
    const items = this.getFilteredItems();

    this.element.innerHTML = `
      <!-- Page Hero Header -->
      <section class="page-hero">
        <div class="page-hero-glow" aria-hidden="true"></div>
        <div class="container">
          <nav class="page-breadcrumbs" aria-label="Fil d'Ariane">
            <a href="/">Accueil</a>
            <span class="breadcrumb-sep">/</span>
            <span>Galerie & Événements</span>
          </nav>
          
          <div class="page-hero-tag">Moments de Partage • Société Nidjeu</div>
          <h1 class="page-hero-title">Nos événements, nos dégustations et les sourires de nos consommateurs.</h1>
          <p class="page-hero-subtitle">
            Du Festival Gastronomique de Douala aux terrasses animées de Bastos à Yaoundé, en passant par les couchers de soleil de Kribi : revivez l'énergie vivifiante de Nidj Juice à travers le Cameroun.
          </p>
        </div>
      </section>

      <!-- Main Gallery Content -->
      <div class="container section">

        <!-- Category Filters Bar -->
        <div class="gallery-filter-bar" role="tablist" aria-label="Filtrer les photos">
          ${GALLERY_CATEGORIES.map((cat) => `
            <button 
              type="button" 
              class="gallery-pill ${this.currentCategory === cat.id ? 'is-active' : ''}" 
              data-category="${cat.id}"
              role="tab"
              aria-selected="${this.currentCategory === cat.id ? 'true' : 'false'}"
            >
              ${cat.label}
            </button>
          `).join('')}

          <span class="gallery-count-badge" id="galleryCountBadge">
            ${items.length} moments en images
          </span>
        </div>

        <!-- Gallery Grid -->
        <div class="gallery-grid" id="galleryGrid">
          ${this.renderGalleryCards(items)}
        </div>

        <!-- Community Callout Banner (#NidjJuiceMoments) -->
        <div class="community-callout-card">
          <div class="community-callout-text">
            <span class="page-hero-tag">Rejoignez le Mouvement</span>
            <h3>Partagez votre moment #NidjJuice !</h3>
            <p>
              Envoyez-nous vos plus beaux clichés en train de savourer votre bouteille de Bissap ou d'Ananas. Les meilleures photos seront publiées dans notre galerie officielle et sélectionnées pour remporter un pack découverte chaque mois.
            </p>
          </div>
          <div style="margin-top: 16px;">
            <a 
              href="https://wa.me/${OFFICIAL_CONTACT.whatsappNumber}?text=Bonjour%20Soci%C3%A9t%C3%A9%20Nidjeu,%20voici%20ma%20photo%20pour%20la%20galerie%20%23NidjJuiceMoments%20!" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="btn btn-primary"
            >
              <span>Envoyer ma photo sur WhatsApp</span>
              <span class="btn-arrow-circle">→</span>
            </a>
          </div>
        </div>

      </div>

      <!-- Lightbox Modal -->
      <div class="lightbox-modal" id="lightboxModal" role="dialog" aria-modal="true" aria-hidden="true">
        <div class="lightbox-backdrop" id="lightboxBackdrop"></div>
        
        <div class="lightbox-dialog">
          <button type="button" class="lightbox-close-btn" id="lightboxCloseBtn" aria-label="Fermer">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <div class="lightbox-img-box">
            <img src="" alt="" class="lightbox-img" id="lightboxImg" />
          </div>

          <div class="lightbox-caption-box">
            <div class="lightbox-meta-row">
              <span class="lightbox-badge" id="lightboxBadge">Événement</span>
              <span class="lightbox-city" id="lightboxCity">Douala • Janvier 2026</span>
            </div>
            <h3 class="lightbox-title" id="lightboxTitle">Titre de l'événement</h3>
            <p class="lightbox-desc" id="lightboxDesc">Description détaillée...</p>
          </div>
        </div>
      </div>
    `;
  }

  private renderGalleryCards(items: GalleryItem[]): string {
    return items.map((item) => `
      <article class="gallery-card ${item.featured ? 'featured' : ''}" data-item-id="${item.id}">
        <div class="gallery-card-img-wrap">
          <img 
            src="${item.image}" 
            alt="${item.title}" 
            class="gallery-card-img" 
            loading="lazy"
          />
          <div class="gallery-card-gradient" aria-hidden="true"></div>
          ${item.badge ? `<span class="gallery-top-badge">${item.badge}</span>` : ''}
          <span class="gallery-city-badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            ${item.city}
          </span>
          <span class="gallery-zoom-icon" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              <line x1="11" y1="8" x2="11" y2="14"></line>
              <line x1="8" y1="11" x2="14" y2="11"></line>
            </svg>
          </span>
        </div>
        <div class="gallery-card-body">
          <span class="gallery-card-date">${item.date} • ${item.categoryLabel}</span>
          <h3 class="gallery-card-title">${item.title}</h3>
          <p class="gallery-card-desc">${item.description}</p>
        </div>
      </article>
    `).join('');
  }

  private bindEvents(): void {
    // Category pill click
    const pills = this.element.querySelectorAll('.gallery-pill');
    pills.forEach((pill) => {
      pill.addEventListener('click', (e) => {
        const cat = (e.currentTarget as HTMLElement).dataset.category as GalleryCategory;
        if (!cat) return;

        this.currentCategory = cat;

        pills.forEach((p) => {
          p.classList.remove('is-active');
          p.setAttribute('aria-selected', 'false');
        });
        (e.currentTarget as HTMLElement).classList.add('is-active');
        (e.currentTarget as HTMLElement).setAttribute('aria-selected', 'true');

        this.updateGrid();
      });
    });

    // Delegate Card click to open Lightbox
    const grid = this.element.querySelector('#galleryGrid');
    grid?.addEventListener('click', (e) => {
      const card = (e.target as HTMLElement).closest('.gallery-card') as HTMLElement;
      if (!card) return;

      const itemId = card.dataset.itemId;
      const found = GALLERY_ITEMS.find((it) => it.id === itemId);
      if (found) {
        this.openLightbox(found);
      }
    });

    // Close Lightbox events
    const modal = this.element.querySelector('#lightboxModal') as HTMLElement;
    const backdrop = this.element.querySelector('#lightboxBackdrop');
    const closeBtn = this.element.querySelector('#lightboxCloseBtn');

    const close = () => this.closeLightbox();
    backdrop?.addEventListener('click', close);
    closeBtn?.addEventListener('click', close);

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal?.classList.contains('is-open')) {
        this.closeLightbox();
      }
    });
  }

  private updateGrid(): void {
    const grid = this.element.querySelector('#galleryGrid');
    const countBadge = this.element.querySelector('#galleryCountBadge');
    const items = this.getFilteredItems();

    if (grid) {
      grid.innerHTML = this.renderGalleryCards(items);
    }
    if (countBadge) {
      countBadge.textContent = `${items.length} moments en images`;
    }
  }

  private openLightbox(item: GalleryItem): void {
    this.activeItem = item;
    const modal = this.element.querySelector('#lightboxModal') as HTMLElement;
    const img = this.element.querySelector('#lightboxImg') as HTMLImageElement;
    const title = this.element.querySelector('#lightboxTitle') as HTMLElement;
    const badge = this.element.querySelector('#lightboxBadge') as HTMLElement;
    const city = this.element.querySelector('#lightboxCity') as HTMLElement;
    const desc = this.element.querySelector('#lightboxDesc') as HTMLElement;

    if (img) {
      img.src = item.image;
      img.alt = item.title;
    }
    if (title) title.textContent = item.title;
    if (badge) badge.textContent = item.badge || item.categoryLabel;
    if (city) city.textContent = `${item.city} • ${item.date}`;
    if (desc) desc.textContent = item.description;

    modal?.classList.add('is-open');
    modal?.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  private closeLightbox(): void {
    const modal = this.element.querySelector('#lightboxModal') as HTMLElement;
    modal?.classList.remove('is-open');
    modal?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    this.activeItem = null;
  }
}
