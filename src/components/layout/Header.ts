/* ==========================================================================
   NIDJ JUICE — CORPORATE HEADER & ANIMATED MEGA-MENU (COCA-COLA STYLE)
   High-End FMCG Corporate Standard • Smooth Hover Flyouts • Active Indicator
   ========================================================================== */

import { OFFICIAL_CONTACT } from '../../data/stores.data';

export class Header {
  private element: HTMLElement;
  private isMenuOpen: boolean = false;
  private isSearchOpen: boolean = false;
  private activeMegaId: string | null = null;
  private megaCloseTimeout: number | null = null;

  public isMobileMenuOpen(): boolean {
    return this.isMenuOpen;
  }

  constructor() {
    this.element = document.createElement('header');
    this.element.className = 'site-header';
    this.render();
    this.bindEvents();
  }

  public getElement(): HTMLElement {
    return this.element;
  }

  private render(): void {
    this.element.innerHTML = `
      <div class="header-main-bar">
        <div class="header-container container">
          
          <!-- Left: Brand Logo + Region/Country Selector (Coca-Cola Style) -->
          <div class="header-brand-group">
            <a href="#" class="brand-logo-link" aria-label="Nidj Juice — Société Nidjeu">
              <span class="brand-company-prefix">THE</span>
              <img 
                src="/assets/images/logo-nidj.png" 
                alt="Nidj Juice — Société Nidjeu" 
                class="brand-logo-img"
                width="120"
                height="42"
              />
              <span class="brand-company-suffix">COMPANY</span>
            </a>

            <!-- Country / Region Selector Pill -->
            <div class="region-pill" title="Cameroun — Siège Douala" role="button" tabindex="0">
              <svg class="globe-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
              <span class="region-code">CM</span>
            </div>
          </div>

          <!-- Center: Corporate Navigation with Animated Underline -->
          <nav class="desktop-nav" aria-label="Navigation institutionnelle">
            <ul class="nav-list" id="mainNavList">
              
              <!-- Tab 1: Entreprise -->
              <li class="nav-item" data-mega-target="megaEntreprise">
                <a href="#story" class="nav-link" data-link="entreprise">
                  Entreprise
                </a>
              </li>

              <!-- Tab 2: Marques -->
              <li class="nav-item" data-mega-target="megaMarques">
                <a href="#flavors" class="nav-link" data-link="marques">
                  Nos Saveurs
                </a>
              </li>

              <!-- Tab 3: Engagements RSE -->
              <li class="nav-item" data-mega-target="megaEngagements">
                <a href="#story" class="nav-link" data-link="engagements">
                  Engagements
                </a>
              </li>

              <!-- Tab 4: Points de vente -->
              <li class="nav-item">
                <a href="#locator" class="nav-link" data-link="locator">
                  Points de vente
                </a>
              </li>

              <!-- Tab 5: Partenaires & B2B (with diagonal arrow) -->
              <li class="nav-item">
                <a 
                  href="https://wa.me/${OFFICIAL_CONTACT.whatsappNumber}?text=Bonjour%20Soci%C3%A9t%C3%A9%20Nidjeu,%20je%20souhaite%20des%20informations%20B2B%20et%20revendeurs" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  class="nav-link nav-link-external"
                >
                  B2B & Réseau
                  <span class="external-arrow">↗</span>
                </a>
              </li>

            </ul>

            <!-- Sliding Indicator Bar (Coca-Cola Style Underline) -->
            <div class="nav-indicator" id="navIndicator"></div>
          </nav>

          <!-- Right: Circular Search Trigger + WhatsApp + Green Pill CTA -->
          <div class="header-actions">
            
            <!-- Circular Search Button (Coca-Cola Iconic Style) -->
            <button 
              type="button" 
              class="icon-circle-btn search-trigger-btn" 
              id="searchTriggerBtn"
              title="Rechercher sur le site"
              aria-label="Rechercher"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>

            <!-- WhatsApp Direct Hotline Button -->
            <a 
              href="https://wa.me/${OFFICIAL_CONTACT.whatsappNumber}" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="icon-circle-btn hotline-btn" 
              title="Hotline WhatsApp (+237)"
              aria-label="WhatsApp Hotline"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
            </a>

            <!-- Green Pill CTA with Arrow -->
            <button type="button" class="btn btn-primary header-cta-btn" id="headerOrderBtn">
              <span>Commander</span>
              <span class="btn-arrow-circle" aria-hidden="true">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </span>
            </button>

            <!-- Mobile menu trigger -->
            <button 
              type="button" 
              class="mobile-menu-btn" 
              id="mobileMenuBtn" 
              aria-expanded="false" 
              aria-label="Menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>

          </div>

        </div>
      </div>

      <!-- ===================================================================
           COCA-COLA STYLE ANIMATED MEGA-MENUS (FLYOUT PANELS)
           =================================================================== -->
      <div class="mega-menu-wrapper" id="megaMenuWrapper">
        
        <!-- Mega Menu 1: ENTREPRISE (Matches Coca-Cola Screenshot Exactly) -->
        <div class="mega-panel" id="megaEntreprise" role="region" aria-label="Menu Entreprise">
          <div class="mega-container container">
            
            <!-- Left: Feature Showcase Card (Coca-Cola Style Image + Heading + CTA) -->
            <div class="mega-card-feature">
              <div class="mega-card-img-box">
                <img 
                  src="/assets/images/gallery-1.webp" 
                  alt="Société Nidjeu Siège & Laboratoire" 
                  class="mega-card-img"
                  loading="lazy"
                />
              </div>
              <div class="mega-card-content">
                <h3 class="mega-card-title">Entreprise</h3>
                <p class="mega-card-desc">
                  Depuis sa création, Société Nidjeu valorise la richesse naturelle du Cameroun à travers des nectars d'exception 100% purs. Découvrez notre vision, nos coopératives partenaires et nos procédés d'embouteillage haute exigence.
                </p>
                <a href="#story" class="mega-action-pill-btn">
                  <span>Apprendre Encore Plus</span>
                  <span class="btn-arrow">→</span>
                </a>
              </div>
            </div>

            <!-- Center: Structured Corporate Directory -->
            <div class="mega-column-links">
              <ul class="mega-links-list">
                <li><a href="#story" class="mega-link-item">Notre vision et notre raison d'être</a></li>
                <li><a href="#story" class="mega-link-item">Le savoir-faire Société Nidjeu</a></li>
                <li><a href="#story" class="mega-link-item">Direction & Gouvernance camerounaise</a></li>
                <li><a href="#story" class="mega-link-item has-arrow"><span>Durabilité & Coopératives agricoles</span><span class="chevron">›</span></a></li>
                <li><a href="#story" class="mega-link-item has-arrow"><span>Histoire de Nidj Juice</span><span class="chevron">›</span></a></li>
                <li><a href="#story" class="mega-link-item has-arrow"><span>Normes de qualité et traçabilité</span><span class="chevron">›</span></a></li>
              </ul>
            </div>

            <!-- Right: Corporate Highlights & Metrics -->
            <div class="mega-column-stats">
              <div class="mega-stat-box">
                <span class="stat-number">100%</span>
                <span class="stat-label">Naturel & Authentique</span>
                <span class="stat-sub">Zéro colorant ni conservateur chimique</span>
              </div>
              <div class="mega-stat-box">
                <span class="stat-number">237</span>
                <span class="stat-label">Fierté Camerounaise</span>
                <span class="stat-sub">Produit et conditionné à Douala</span>
              </div>
              <div class="mega-stat-box">
                <span class="stat-number">+10</span>
                <span class="stat-label">Points de Vente Agréés</span>
                <span class="stat-sub">Douala, Yaoundé, Bafoussam, Kribi</span>
              </div>
            </div>

          </div>
        </div>

        <!-- Mega Menu 2: MARQUES & SAVEURS -->
        <div class="mega-panel" id="megaMarques" role="region" aria-label="Menu Saveurs">
          <div class="mega-container container">
            
            <!-- Left: Feature Card for Juices -->
            <div class="mega-card-feature">
              <div class="mega-card-img-box">
                <img 
                  src="/assets/images/gallery-2.webp" 
                  alt="Cocktail de Bissap et Ananas Gingembre" 
                  class="mega-card-img"
                  loading="lazy"
                />
              </div>
              <div class="mega-card-content">
                <h3 class="mega-card-title">Nos Saveurs</h3>
                <p class="mega-card-desc">
                  Chaque recette est élaborée à partir d'ingrédients bruts rigoureusement sélectionnés : l'infusion florale d'hibiscus royal et la fraîcheur solaire de l'ananas mûri sous le soleil du Cameroun combiné au gingembre sauvage.
                </p>
                <a href="#flavors" class="mega-action-pill-btn">
                  <span>Explorer le Catalogue</span>
                  <span class="btn-arrow">→</span>
                </a>
              </div>
            </div>

            <!-- Center: Product Quick Links -->
            <div class="mega-column-links">
              <ul class="mega-links-list">
                <li><a href="#flavors" class="mega-link-item">Cocktail de Bissap (Hibiscus & Ananas)</a></li>
                <li><a href="#flavors" class="mega-link-item">Jus d’Ananas Gingembre (Vitalité Pure)</a></li>
                <li><a href="#order" class="mega-link-item has-arrow"><span>Pack Découverte Duo 6x 50cl</span><span class="chevron">›</span></a></li>
                <li><a href="#order" class="mega-link-item has-arrow"><span>Carton 12x Familial & Événements</span><span class="chevron">›</span></a></li>
                <li><a href="#flavors" class="mega-link-item has-arrow"><span>Tableau de transparence nutritionnelle</span><span class="chevron">›</span></a></li>
              </ul>
            </div>

            <!-- Right: Visual Flavor Teasers -->
            <div class="mega-column-products">
              <div class="flavor-mini-card" data-flavor="bissap">
                <img src="/assets/images/bottle-bissap.png" alt="Bissap" class="mini-bottle-img" />
                <div class="mini-card-text">
                  <span class="mini-tag ruby">Hibiscus Royal</span>
                  <span class="mini-name">Cocktail de Bissap</span>
                  <span class="mini-price">1 000 FCFA</span>
                </div>
              </div>

              <div class="flavor-mini-card" data-flavor="ananas">
                <img src="/assets/images/bottle-ananas.png" alt="Ananas" class="mini-bottle-img" />
                <div class="mini-card-text">
                  <span class="mini-tag gold">Énergie Terroir</span>
                  <span class="mini-name">Ananas Gingembre</span>
                  <span class="mini-price">1 000 FCFA</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        <!-- Mega Menu 3: ENGAGEMENTS RSE -->
        <div class="mega-panel" id="megaEngagements" role="region" aria-label="Menu Engagements">
          <div class="mega-container container">
            
            <div class="mega-card-feature">
              <div class="mega-card-img-box">
                <img 
                  src="/assets/images/gallery-3.webp" 
                  alt="Coopératives et terroirs du Cameroun" 
                  class="mega-card-img"
                  loading="lazy"
                />
              </div>
              <div class="mega-card-content">
                <h3 class="mega-card-title">Durabilité & Terroir</h3>
                <p class="mega-card-desc">
                  Notre modèle s'appuie sur le respect absolu de l'environnement : circuits courts, approvisionnement auprès des petits exploitants agricoles du Cameroun et consigne de recyclage pour un impact écologique minimal.
                </p>
                <a href="#story" class="mega-action-pill-btn">
                  <span>Nos Engagements RSE</span>
                  <span class="btn-arrow">→</span>
                </a>
              </div>
            </div>

            <div class="mega-column-links">
              <ul class="mega-links-list">
                <li><a href="#story" class="mega-link-item">Filière d'approvisionnement équitable</a></li>
                <li><a href="#story" class="mega-link-item">Zéro conservateur chimique ni OGM</a></li>
                <li><a href="#story" class="mega-link-item">Soutien aux agriculteurs locaux</a></li>
                <li><a href="#story" class="mega-link-item has-arrow"><span>Programme de recyclage des emballages</span><span class="chevron">›</span></a></li>
                <li><a href="#story" class="mega-link-item has-arrow"><span>Consommation énergétique & chaîne du froid</span><span class="chevron">›</span></a></li>
              </ul>
            </div>

            <div class="mega-column-stats">
              <div class="mega-stat-box">
                <span class="stat-number">100%</span>
                <span class="stat-label">Ingrédients Locaux</span>
                <span class="stat-sub">Issus des terres agricoles camerounaises</span>
              </div>
              <div class="mega-stat-box">
                <span class="stat-number">0%</span>
                <span class="stat-label">Conservateurs de Synthèse</span>
                <span class="stat-sub">Pasteurisation douce respectueuse</span>
              </div>
            </div>

          </div>
        </div>

      </div>

      <!-- ===================================================================
           INTERACTIVE SEARCH FLYOUT PANEL
           =================================================================== -->
      <div class="header-search-flyout" id="searchFlyout" aria-hidden="true">
        <div class="search-flyout-container container">
          <div class="search-input-box">
            <svg class="search-icon-input" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input 
              type="text" 
              id="headerSearchInput" 
              placeholder="Rechercher une saveur, un point de vente, une information Société Nidjeu..." 
              autocomplete="off"
            />
            <button type="button" class="close-search-btn" id="closeSearchBtn" aria-label="Fermer la recherche">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <div class="search-quick-tags">
            <span class="tag-label">Recherches populaires :</span>
            <a href="#flavors" class="search-tag-chip">Cocktail Bissap</a>
            <a href="#flavors" class="search-tag-chip">Ananas Gingembre</a>
            <a href="#locator" class="search-tag-chip">Douala (Bonapriso)</a>
            <a href="#locator" class="search-tag-chip">Yaoundé (Bastos)</a>
            <a href="#order" class="search-tag-chip">Commande Express</a>
          </div>
        </div>
      </div>

      <!-- Backdrop for Mega-Menu & Search -->
      <div class="header-dim-backdrop" id="headerDimBackdrop"></div>

      <!-- Mobile Drawer -->
      <div class="mobile-drawer" id="mobileMenuDrawer" aria-hidden="true">
        <div class="mobile-drawer-backdrop" id="drawerBackdrop"></div>
        <div class="mobile-drawer-content">
          <div class="mobile-drawer-header">
            <img src="/assets/images/logo-nidj.png" alt="Nidj Juice" class="mobile-drawer-logo" width="110" />
            <button type="button" class="close-drawer-btn" id="closeDrawerBtn" aria-label="Fermer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <nav class="mobile-nav">
            <ul class="mobile-nav-list">
              <li><a href="#hero" class="mobile-nav-link">Accueil</a></li>
              <li><a href="#story" class="mobile-nav-link">Entreprise & Histoire</a></li>
              <li><a href="#flavors" class="mobile-nav-link">Nos Saveurs</a></li>
              <li><a href="#locator" class="mobile-nav-link">Points de vente (Cameroun)</a></li>
              <li><a href="#contact" class="mobile-nav-link">Contact & Hotline</a></li>
            </ul>
          </nav>
          <div class="mobile-drawer-footer">
            <button type="button" class="btn btn-primary w-full" id="mobileDrawerOrderBtn">
              <span>Commander maintenant</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  private bindEvents(): void {
    const mainNavList = this.element.querySelector('#mainNavList');
    const navIndicator = this.element.querySelector('#navIndicator') as HTMLElement;
    const megaWrapper = this.element.querySelector('#megaMenuWrapper') as HTMLElement;
    const dimBackdrop = this.element.querySelector('#headerDimBackdrop') as HTMLElement;
    const searchTriggerBtn = this.element.querySelector('#searchTriggerBtn');
    const searchFlyout = this.element.querySelector('#searchFlyout') as HTMLElement;
    const closeSearchBtn = this.element.querySelector('#closeSearchBtn');

    // Scroll listener for sticky elevation
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        this.element.classList.add('is-scrolled');
      } else {
        this.element.classList.remove('is-scrolled');
      }
    }, { passive: true });

    // Handle Animated Sliding Indicator & Mega Menus (Jitter-Free Architecture)
    if (mainNavList && navIndicator) {
      const navItems = mainNavList.querySelectorAll('.nav-item');

      const updateIndicator = (el: HTMLElement) => {
        const itemRect = el.getBoundingClientRect();
        const navRect = mainNavList.getBoundingClientRect();
        const left = itemRect.left - navRect.left;
        const width = itemRect.width;

        navIndicator.style.opacity = '1';
        navIndicator.style.transform = `translateX(${left}px)`;
        navIndicator.style.width = `${width}px`;
      };

      navItems.forEach((item) => {
        const itemEl = item as HTMLElement;
        const targetMega = itemEl.dataset.megaTarget;

        // Hover enter
        itemEl.addEventListener('mouseenter', () => {
          if (this.megaCloseTimeout) {
            clearTimeout(this.megaCloseTimeout);
            this.megaCloseTimeout = null;
          }

          updateIndicator(itemEl);

          if (targetMega) {
            this.openMegaMenu(targetMega);
          } else {
            // Delay close for items without a mega menu to prevent accidental collapses
            this.megaCloseTimeout = window.setTimeout(() => {
              this.closeAllMegaMenus();
            }, 240);
          }
        });
      });

      // Keep menu open when hovering inside the mega-menu itself
      if (megaWrapper) {
        megaWrapper.addEventListener('mouseenter', () => {
          if (this.megaCloseTimeout) {
            clearTimeout(this.megaCloseTimeout);
            this.megaCloseTimeout = null;
          }
        });
      }

      // Cancel close timer whenever cursor re-enters the header
      this.element.addEventListener('mouseenter', () => {
        if (this.megaCloseTimeout) {
          clearTimeout(this.megaCloseTimeout);
          this.megaCloseTimeout = null;
        }
      });

      // Single authoritative mouseleave on the entire header
      this.element.addEventListener('mouseleave', () => {
        if (this.megaCloseTimeout) {
          clearTimeout(this.megaCloseTimeout);
        }
        this.megaCloseTimeout = window.setTimeout(() => {
          this.closeAllMegaMenus();
          navIndicator.style.opacity = '0';
        }, 280);
      });
    }

    // Close on backdrop click
    if (dimBackdrop) {
      dimBackdrop.addEventListener('click', () => {
        this.closeAllMegaMenus();
        this.closeSearch();
      });
    }

    // Search Toggle
    if (searchTriggerBtn && searchFlyout) {
      searchTriggerBtn.addEventListener('click', () => {
        this.toggleSearch();
      });
    }

    if (closeSearchBtn) {
      closeSearchBtn.addEventListener('click', () => {
        this.closeSearch();
      });
    }

    // Close on Escape
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeAllMegaMenus();
        this.closeSearch();
        this.toggleMobileMenu(false);
      }
    });

    // Mobile Drawer events
    const mobileBtn = this.element.querySelector('#mobileMenuBtn');
    const closeDrawerBtn = this.element.querySelector('#closeDrawerBtn');
    const drawerBackdrop = this.element.querySelector('#drawerBackdrop');
    const drawerOrderBtn = this.element.querySelector('#mobileDrawerOrderBtn');
    const headerOrderBtn = this.element.querySelector('#headerOrderBtn');

    mobileBtn?.addEventListener('click', () => this.toggleMobileMenu(true));
    closeDrawerBtn?.addEventListener('click', () => this.toggleMobileMenu(false));
    drawerBackdrop?.addEventListener('click', () => this.toggleMobileMenu(false));

    const scrollToOrder = () => {
      const orderSec = document.getElementById('order');
      if (orderSec) {
        orderSec.scrollIntoView({ behavior: 'smooth' });
      }
      this.toggleMobileMenu(false);
      this.closeAllMegaMenus();
    };

    headerOrderBtn?.addEventListener('click', scrollToOrder);
    drawerOrderBtn?.addEventListener('click', scrollToOrder);

    // Close menus when clicking any internal link in mega-menu
    this.element.querySelectorAll('.mega-link-item, .mega-action-pill-btn').forEach((link) => {
      link.addEventListener('click', () => {
        this.closeAllMegaMenus();
      });
    });
  }

  private openMegaMenu(panelId: string): void {
    const megaWrapper = this.element.querySelector('#megaMenuWrapper') as HTMLElement;
    const dimBackdrop = this.element.querySelector('#headerDimBackdrop') as HTMLElement;
    const panels = this.element.querySelectorAll('.mega-panel');

    panels.forEach((p) => p.classList.remove('is-active'));

    const targetPanel = this.element.querySelector(`#${panelId}`);
    if (targetPanel) {
      targetPanel.classList.add('is-active');
      megaWrapper?.classList.add('is-open');
      dimBackdrop?.classList.add('is-visible');
      this.activeMegaId = panelId;
      this.element.classList.add('mega-open');
    }
  }

  private closeAllMegaMenus(): void {
    const megaWrapper = this.element.querySelector('#megaMenuWrapper') as HTMLElement;
    const dimBackdrop = this.element.querySelector('#headerDimBackdrop') as HTMLElement;
    const panels = this.element.querySelectorAll('.mega-panel');

    panels.forEach((p) => p.classList.remove('is-active'));
    megaWrapper?.classList.remove('is-open');
    dimBackdrop?.classList.remove('is-visible');
    this.element.classList.remove('mega-open');
    this.activeMegaId = null;
  }

  private toggleSearch(): void {
    const searchFlyout = this.element.querySelector('#searchFlyout') as HTMLElement;
    const dimBackdrop = this.element.querySelector('#headerDimBackdrop') as HTMLElement;
    const searchInput = this.element.querySelector('#headerSearchInput') as HTMLInputElement;

    this.isSearchOpen = !this.isSearchOpen;
    if (this.isSearchOpen) {
      this.closeAllMegaMenus();
      searchFlyout?.classList.add('is-open');
      dimBackdrop?.classList.add('is-visible');
      this.element.classList.add('search-open');
      setTimeout(() => searchInput?.focus(), 150);
    } else {
      this.closeSearch();
    }
  }

  private closeSearch(): void {
    const searchFlyout = this.element.querySelector('#searchFlyout') as HTMLElement;
    const dimBackdrop = this.element.querySelector('#headerDimBackdrop') as HTMLElement;

    this.isSearchOpen = false;
    searchFlyout?.classList.remove('is-open');
    if (!this.activeMegaId) {
      dimBackdrop?.classList.remove('is-visible');
      this.element.classList.remove('search-open');
    }
  }

  private toggleMobileMenu(open: boolean): void {
    this.isMenuOpen = open;
    const drawer = this.element.querySelector('#mobileMenuDrawer');
    const btn = this.element.querySelector('#mobileMenuBtn');

    if (open) {
      drawer?.classList.add('is-open');
      btn?.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    } else {
      drawer?.classList.remove('is-open');
      btn?.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  }
}
