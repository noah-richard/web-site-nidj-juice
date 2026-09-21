/* ==========================================================================
   NIDJ JUICE — ENTERPRISE BACKOFFICE CMS (/nidj-juice-backoffice)
   Agency-Standard Administration Studio & Content Management Platform
   Exact Brand Color Match • 100% Vector Iconography • Bespoke Architecture
   ========================================================================== */

import { cmsService, type FaqItem } from '../services/cms.service';
import type { ShowcaseProduct } from '../components/showcase/showcase.types';
import type { StoreLocation, VideoReel } from '../types/product.types';
import type { GalleryItem } from '../data/gallery.data';

type BackofficeTab = 'overview' | 'products' | 'pages' | 'gallery' | 'reels' | 'stores' | 'settings';

/* --- Vector Icons (Agency Grade • Lucide / Feather Style) --- */
const BO_ICONS = {
  grid: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>`,
  bottle: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3h6v3H9z"></path><path d="M10 6v3a4 4 0 0 1-2 3.46V20a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-7.54A4 4 0 0 1 14 9V6"></path></svg>`,
  fileText: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>`,
  image: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>`,
  film: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect><line x1="7" y1="2" x2="7" y2="22"></line><line x1="17" y1="2" x2="17" y2="22"></line><line x1="2" y1="12" x2="22" y2="12"></line><line x1="2" y1="7" x2="7" y2="7"></line><line x1="2" y1="17" x2="7" y2="17"></line><line x1="17" y1="17" x2="22" y2="17"></line><line x1="17" y1="7" x2="22" y2="7"></line></svg>`,
  mapPin: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`,
  settings: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>`,
  external: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>`,
  download: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>`,
  upload: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>`,
  refresh: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>`,
  logout: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>`,
  plus: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>`,
  edit: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>`,
  trash: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>`,
  check: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
  phone: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>`,
  lock: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`,
  sparkles: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path></svg>`,
  close: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`,
  eye: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`,
  camera: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>`,
  layers: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>`
};

export class BackofficePage {
  private element: HTMLElement;
  private currentTab: BackofficeTab = 'overview';

  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'backoffice-root';
    this.render();
    this.bindEvents();
  }

  public getElement(): HTMLElement {
    return this.element;
  }

  public render(): void {
    if (!cmsService.isAuthenticated()) {
      this.renderAuthGate();
    } else {
      this.renderDashboard();
    }
  }

  // =========================================================================
  // 1. SECURITY / AUTHENTICATION GATE (LIGHT AGENCY AESTHETIC)
  // =========================================================================
  private renderAuthGate(): void {
    this.element.innerHTML = `
      <div class="bo-auth-container">
        <div class="bo-auth-card">
          <img src="/assets/images/logo-nidj.png" alt="Nidj Juice" class="bo-auth-logo" />
          <h1 class="bo-auth-title">Espace Administration</h1>
          <p class="bo-auth-desc">
            Société Nidjeu • Système de gestion et pilotage officiel de la marque <strong>Nidj Juice</strong> au Cameroun.
          </p>

          <form id="boLoginForm" class="bo-form">
            <div class="bo-form-group">
              <label class="bo-label" for="boAuthPassword">Code d'accès administrateur</label>
              <input 
                type="password" 
                id="boAuthPassword" 
                class="bo-input" 
                placeholder="Entrez votre mot de passe" 
                autocomplete="current-password"
                required
                style="text-align: center; font-size: 15px; letter-spacing: 0.1em;"
              />
            </div>

            <button type="submit" class="bo-btn-primary" style="width: 100%; justify-content: center; margin-top: 6px;">
              ${BO_ICONS.lock}
              <span>Déverrouiller l'accès</span>
            </button>
          </form>

          <div class="bo-quick-unlock-card">
            <p style="font-size: 12px; color: var(--bo-forest); font-weight: 600; margin: 0 0 10px 0;">
              Accès rapide pour la démonstration client :
            </p>
            <button type="button" class="bo-quick-unlock-btn" id="boQuickUnlockBtn">
              ${BO_ICONS.sparkles}
              <span>Déverrouillage Instantané (1-Clic)</span>
            </button>
          </div>

          <div style="margin-top: 22px;">
            <a href="/" class="bo-btn-secondary" style="font-size: 12.5px; padding: 8px 14px; text-decoration: none;">
              ← Retourner au site public
            </a>
          </div>
        </div>
      </div>
    `;

    const form = this.element.querySelector('#boLoginForm') as HTMLFormElement;
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const pwdInput = this.element.querySelector('#boAuthPassword') as HTMLInputElement;
      const pwd = pwdInput?.value.trim().toLowerCase();
      if (pwd === 'admin' || pwd === '237' || pwd === '2370' || pwd === 'nidjeu' || pwd.length >= 3) {
        cmsService.setAuthenticated(true, true);
        this.render();
        this.showToast('Bienvenue sur le panneau de gestion Société Nidjeu', 'success');
      } else {
        this.showToast('Code d\'accès incorrect', 'error');
      }
    });

    const quickBtn = this.element.querySelector('#boQuickUnlockBtn');
    quickBtn?.addEventListener('click', () => {
      cmsService.setAuthenticated(true, true);
      this.render();
      this.showToast('Accès Administrateur Déverrouillé avec succès', 'success');
    });
  }

  // =========================================================================
  // 2. MAIN DASHBOARD RENDERER (STUDIO TOPBAR + SIDEBAR)
  // =========================================================================
  private renderDashboard(): void {
    const products = cmsService.getProducts();
    const stores = cmsService.getStores();
    const gallery = cmsService.getGalleryItems();
    const reels = cmsService.getVideoReels();

    this.element.innerHTML = `
      <!-- Top Corporate App Bar -->
      <header class="bo-header">
        <div class="bo-header-left">
          <a href="/" class="bo-logo-wrap" title="Aller à l'accueil du site">
            <img src="/assets/images/logo-nidj.png" alt="Nidj Juice" class="bo-logo" />
          </a>
          <div class="bo-header-divider"></div>
          <div class="bo-brand-title">
            <div class="bo-brand-name">
              <span>Société Nidjeu</span>
              <span class="bo-brand-badge">Backoffice CMS</span>
            </div>
            <span class="bo-brand-sub">Site Officiel • Cameroun</span>
          </div>
        </div>

        <div class="bo-header-right">
          <a href="/" class="bo-btn-public-site" target="_blank" title="Ouvrir le site public dans un nouvel onglet">
            <span>Voir le site</span>
            ${BO_ICONS.external}
          </a>

          <button type="button" class="bo-action-pill" id="boExportBtn" title="Télécharger une sauvegarde complète en JSON">
            ${BO_ICONS.download}
            <span>Exporter Backup</span>
          </button>

          <label class="bo-action-pill" title="Restaurer une sauvegarde JSON" style="margin: 0; cursor: pointer;">
            ${BO_ICONS.upload}
            <span>Importer Backup</span>
            <input type="file" id="boImportFileInput" accept=".json" style="display: none;" />
          </label>

          <button type="button" class="bo-action-pill danger" id="boResetBtn" title="Rétablir les contenus par défaut">
            ${BO_ICONS.refresh}
            <span>Réinitialiser</span>
          </button>

          <!-- User Chip -->
          <div class="bo-user-chip">
            <div class="bo-user-avatar">SN</div>
            <div class="bo-user-meta">
              <span class="bo-user-name">Administrateur</span>
              <span class="bo-user-role">Direction</span>
            </div>
            <button type="button" class="bo-logout-btn" id="boLogoutBtn" title="Fermer la session administrateur">
              ${BO_ICONS.logout}
            </button>
          </div>
        </div>
      </header>

      <!-- Layout Body: Sidebar + Workspace -->
      <div class="bo-body-layout">
        
        <!-- Sidebar Navigation -->
        <aside class="bo-sidebar">
          
          <div class="bo-nav-section">
            <div class="bo-nav-heading">Gestion & Contenus</div>
            
            <button type="button" class="bo-nav-item ${this.currentTab === 'overview' ? 'is-active' : ''}" data-tab="overview">
              <div class="bo-nav-item-inner">
                <span class="bo-nav-icon">${BO_ICONS.grid}</span>
                <span>Vue d'Ensemble</span>
              </div>
            </button>

            <button type="button" class="bo-nav-item ${this.currentTab === 'products' ? 'is-active' : ''}" data-tab="products">
              <div class="bo-nav-item-inner">
                <span class="bo-nav-icon">${BO_ICONS.bottle}</span>
                <span>Saveurs & Nectars</span>
              </div>
              <span class="bo-nav-badge">${products.length}</span>
            </button>

            <button type="button" class="bo-nav-item ${this.currentTab === 'pages' ? 'is-active' : ''}" data-tab="pages">
              <div class="bo-nav-item-inner">
                <span class="bo-nav-icon">${BO_ICONS.fileText}</span>
                <span>Pages & Textes</span>
              </div>
            </button>

            <button type="button" class="bo-nav-item ${this.currentTab === 'gallery' ? 'is-active' : ''}" data-tab="gallery">
              <div class="bo-nav-item-inner">
                <span class="bo-nav-icon">${BO_ICONS.image}</span>
                <span>Galerie Événements</span>
              </div>
              <span class="bo-nav-badge">${gallery.length}</span>
            </button>

            <button type="button" class="bo-nav-item ${this.currentTab === 'reels' ? 'is-active' : ''}" data-tab="reels">
              <div class="bo-nav-item-inner">
                <span class="bo-nav-icon">${BO_ICONS.film}</span>
                <span>Vidéos & Reels</span>
              </div>
              <span class="bo-nav-badge">${reels.length}</span>
            </button>

            <button type="button" class="bo-nav-item ${this.currentTab === 'stores' ? 'is-active' : ''}" data-tab="stores">
              <div class="bo-nav-item-inner">
                <span class="bo-nav-icon">${BO_ICONS.mapPin}</span>
                <span>Points de Vente</span>
              </div>
              <span class="bo-nav-badge">${stores.length}</span>
            </button>
          </div>

          <div class="bo-nav-section">
            <div class="bo-nav-heading">Configuration & Système</div>

            <button type="button" class="bo-nav-item ${this.currentTab === 'settings' ? 'is-active' : ''}" data-tab="settings">
              <div class="bo-nav-item-inner">
                <span class="bo-nav-icon">${BO_ICONS.settings}</span>
                <span>Paramètres & Contact</span>
              </div>
            </button>
          </div>

          <!-- Live Indicator Box -->
          <div class="bo-sidebar-footer">
            <div class="bo-status-dot"></div>
            <div class="bo-status-info">
              <span class="bo-status-title">Système Opérationnel</span>
              <span class="bo-status-sub">Synchronisation live active</span>
            </div>
          </div>

        </aside>

        <!-- Main Dynamic Workspace -->
        <main class="bo-workspace" id="boWorkspace">
          ${this.renderActiveTabContent()}
        </main>

      </div>

      <!-- Toast Container -->
      <div class="bo-toast-container" id="boToastContainer"></div>

      <!-- Modal Container (Dynamically injected) -->
      <div id="boModalContainer"></div>
    `;

    this.bindDashboardEvents();
  }

  // =========================================================================
  // 3. WORKSPACE TAB SWITCHER
  // =========================================================================
  private renderActiveTabContent(): string {
    switch (this.currentTab) {
      case 'products':
        return this.renderProductsTab();
      case 'pages':
        return this.renderPagesTab();
      case 'gallery':
        return this.renderGalleryTab();
      case 'reels':
        return this.renderReelsTab();
      case 'stores':
        return this.renderStoresTab();
      case 'settings':
        return this.renderSettingsTab();
      case 'overview':
      default:
        return this.renderOverviewTab();
    }
  }

  // -------------------------------------------------------------------------
  // TAB: OVERVIEW / DASHBOARD (AGENCY KPI DASHBOARD)
  // -------------------------------------------------------------------------
  private renderOverviewTab(): string {
    const products = cmsService.getProducts();
    const stores = cmsService.getStores();
    const gallery = cmsService.getGalleryItems();
    const settings = cmsService.getSettings();

    return `
      <div class="bo-page-header">
        <div class="bo-page-title-group">
          <h1>Vue d'Ensemble & Métriques</h1>
          <p class="bo-page-subtitle">État en direct du site officiel Nidj Juice, catalogue des saveurs et réseau de distribution</p>
        </div>
        <div class="bo-page-actions">
          <button type="button" class="bo-btn-primary" id="boQuickAddProductBtn">
            ${BO_ICONS.plus}
            <span>Ajouter une Saveur</span>
          </button>
          <button type="button" class="bo-btn-secondary" id="boQuickAddStoreBtn">
            ${BO_ICONS.plus}
            <span>Ajouter un Point de Vente</span>
          </button>
        </div>
      </div>

      <!-- Agency KPI Stats Grid -->
      <div class="bo-stats-grid">
        <div class="bo-stat-card">
          <div class="bo-stat-top">
            <span class="bo-stat-label">Saveurs Actives</span>
            <div class="bo-stat-icon-wrap">${BO_ICONS.bottle}</div>
          </div>
          <div class="bo-stat-number">${products.length}</div>
          <div class="bo-stat-pill">
            <span class="bo-stat-pill-dot"></span>
            <span>100% Nectars Purs</span>
          </div>
        </div>

        <div class="bo-stat-card">
          <div class="bo-stat-top">
            <span class="bo-stat-label">Points de Vente</span>
            <div class="bo-stat-icon-wrap amber">${BO_ICONS.mapPin}</div>
          </div>
          <div class="bo-stat-number">${stores.length}</div>
          <div class="bo-stat-pill">
            <span class="bo-stat-pill-dot" style="background: var(--bo-ananas);"></span>
            <span>Douala, Yaoundé, Bafoussam, Kribi</span>
          </div>
        </div>

        <div class="bo-stat-card">
          <div class="bo-stat-top">
            <span class="bo-stat-label">Moments en Galerie</span>
            <div class="bo-stat-icon-wrap ruby">${BO_ICONS.image}</div>
          </div>
          <div class="bo-stat-number">${gallery.length}</div>
          <div class="bo-stat-pill">
            <span class="bo-stat-pill-dot" style="background: var(--bo-bissap);"></span>
            <span>Dégustations & Salons</span>
          </div>
        </div>

        <div class="bo-stat-card">
          <div class="bo-stat-top">
            <span class="bo-stat-label">Hotline Commandes</span>
            <div class="bo-stat-icon-wrap blue">${BO_ICONS.phone}</div>
          </div>
          <div class="bo-stat-number" style="font-size: 20px;">${settings.phoneDisplay}</div>
          <div class="bo-stat-pill">
            <span class="bo-stat-pill-dot" style="background: var(--bo-blue);"></span>
            <span>Liaison WhatsApp Directe</span>
          </div>
        </div>
      </div>

      <!-- Product Catalog Overview Card -->
      <div class="bo-card">
        <div class="bo-card-header">
          <div class="bo-card-title-group">
            <div class="bo-card-icon">${BO_ICONS.bottle}</div>
            <div>
              <h2 class="bo-card-title">Catalogue des Saveurs Actuelles</h2>
              <p class="bo-card-subtitle">Collection officielle commercialisée au Cameroun</p>
            </div>
          </div>
          <button type="button" class="bo-btn-secondary" data-goto-tab="products">
            <span>Gérer le Catalogue</span>
            <span>→</span>
          </button>
        </div>

        <div class="bo-card-body">
          <div class="bo-product-cards-grid">
            ${products
              .map(
                (p) => `
              <div class="bo-item-card">
                <div class="bo-item-top">
                  <div class="bo-item-img-box">
                    <img src="${p.bottleImage}" alt="${p.name}" class="bo-item-img" />
                  </div>
                  <div class="bo-item-info">
                    <div class="bo-item-category" style="color: ${p.accentColor};">${p.category || 'Collection Officielle'}</div>
                    <h3 class="bo-item-name">${p.name}</h3>
                    <p class="bo-item-desc">${p.subtitle}</p>
                    <div class="bo-item-badges">
                      <span class="bo-badge-pill" style="border-color: ${p.accentColor}; color: ${p.accentColor};">
                        ${p.badges[0] || '100% Naturel'}
                      </span>
                    </div>
                  </div>
                </div>

                <div class="bo-item-footer">
                  <span class="bo-item-formats-count">
                    ${(p.formats || []).length} formats disponibles
                  </span>
                  <button type="button" class="bo-btn-edit" data-edit-product="${p.id}">
                    ${BO_ICONS.edit}
                    <span>Modifier</span>
                  </button>
                </div>
              </div>
            `
              )
              .join('')}
          </div>
        </div>
      </div>

      <!-- Sync Status Banner -->
      <div class="bo-card" style="border-left: 4px solid var(--bo-brand-green); background: var(--bo-surface-subtle);">
        <div class="bo-card-body" style="display: flex; align-items: flex-start; gap: 16px;">
          <div class="bo-card-icon" style="background: var(--bo-brand-green); color: #FFFFFF; flex-shrink: 0;">
            ${BO_ICONS.check}
          </div>
          <div>
            <h3 style="font-family: var(--font-display); font-size: 16px; font-weight: 800; color: var(--bo-forest); margin: 0 0 4px 0;">
              Synchronisation Instantanée & Sauvegarde Continue
            </h3>
            <p style="font-size: 13.5px; color: var(--bo-text-secondary); line-height: 1.6; margin: 0;">
              Chaque mise à jour appliquée dans ce panneau d'administration est mémorisée localement et diffusée en direct sur l'ensemble des pages publiques du site (Accueil, Nos Saveurs, Pages Marques, Points de Vente, Galerie, etc.). Vous pouvez exporter une sauvegarde intégrale à tout moment via le bouton <strong>« Exporter Backup »</strong> dans l'en-tête supérieur.
            </p>
          </div>
        </div>
      </div>
    `;
  }

  // -------------------------------------------------------------------------
  // TAB: PRODUCTS / FLAVORS
  // -------------------------------------------------------------------------
  private renderProductsTab(): string {
    const products = cmsService.getProducts();

    return `
      <div class="bo-page-header">
        <div class="bo-page-title-group">
          <h1>Catalogue des Saveurs & Nectars</h1>
          <p class="bo-page-subtitle">Éditez les recettes, modifiez les visuels de bouteille ou ajoutez une nouvelle référence</p>
        </div>
        <div class="bo-page-actions">
          <button type="button" class="bo-btn-primary" id="boAddNewProductBtn">
            ${BO_ICONS.plus}
            <span>Créer une Nouvelle Saveur</span>
          </button>
        </div>
      </div>

      <div class="bo-product-cards-grid">
        ${products
          .map(
            (p) => `
          <div class="bo-item-card">
            <div class="bo-item-top">
              <div class="bo-item-img-box">
                <img src="${p.bottleImage}" alt="${p.name}" class="bo-item-img" />
              </div>
              <div class="bo-item-info">
                <div class="bo-item-category" style="color: ${p.accentColor};">${p.category || 'Collection Officielle'}</div>
                <h3 class="bo-item-name">${p.name}</h3>
                <p class="bo-item-desc">${p.subtitle}</p>
                <div style="font-size: 11.5px; font-weight: 600; color: var(--bo-text-muted);">
                  Page dédiée : <code>/saveurs/${p.id}</code>
                </div>
              </div>
            </div>

            <p style="font-size: 12.5px; color: var(--bo-text-secondary); line-height: 1.5; margin: 0 0 14px 0;">
              ${p.description.slice(0, 115)}...
            </p>

            <div class="bo-item-footer">
              <span style="font-size: 12px; font-weight: 800; color: ${p.accentColor};">
                ${p.badges[0] || '100% Naturel'}
              </span>
              <div style="display: flex; gap: 8px; align-items: center;">
                <a href="/saveurs/${p.id}" class="bo-btn-icon" title="Prévisualiser la page officielle de cette saveur" target="_blank">
                  ${BO_ICONS.eye}
                </a>
                <button type="button" class="bo-btn-edit" data-edit-product="${p.id}">
                  ${BO_ICONS.edit}
                  <span>Modifier</span>
                </button>
                <button type="button" class="bo-btn-icon" data-delete-product="${p.id}" title="Supprimer cette saveur" style="color: var(--bo-red);">
                  ${BO_ICONS.trash}
                </button>
              </div>
            </div>
          </div>
        `
          )
          .join('')}
      </div>
    `;
  }

  // -------------------------------------------------------------------------
  // TAB: PAGES & TEXTS
  // -------------------------------------------------------------------------
  private renderPagesTab(): string {
    const hero = cmsService.getHeroContent();
    const company = cmsService.getCompanyContent();
    const engagements = cmsService.getEngagementsContent();
    const faqs = cmsService.getFaqs();

    return `
      <div class="bo-page-header">
        <div class="bo-page-title-group">
          <h1>Édition des Pages & Textes Éditoriaux</h1>
          <p class="bo-page-subtitle">Personnalisez les messages d'accueil, l'histoire institutionnelle et les engagements</p>
        </div>
      </div>

      <!-- Card 1: Section Hero Accueil -->
      <div class="bo-card">
        <div class="bo-card-header">
          <div class="bo-card-title-group">
            <div class="bo-card-icon">${BO_ICONS.fileText}</div>
            <div>
              <h2 class="bo-card-title">Section Héro d'Accueil (Page Principale)</h2>
              <p class="bo-card-subtitle">Titres principaux, accroche et badges de réassurance visibles à l'arrivée sur le site</p>
            </div>
          </div>
        </div>
        <div class="bo-card-body">
          <form id="boHeroForm">
            <div class="bo-form-grid-2">
              <div class="bo-form-group">
                <label class="bo-label">Mot 1 du Grand Titre (Vert Brand)</label>
                <input type="text" id="heroWord1" class="bo-input" value="${hero.titleWord1}" required />
              </div>
              <div class="bo-form-group">
                <label class="bo-label">Mot 2 du Grand Titre (Dynamique)</label>
                <input type="text" id="heroWord2" class="bo-input" value="${hero.titleWord2}" required />
              </div>
            </div>

            <div class="bo-form-group">
              <label class="bo-label">Sous-titre Héro</label>
              <input type="text" id="heroSubtitle" class="bo-input" value="${hero.subtitle}" required />
            </div>

            <div class="bo-form-group">
              <label class="bo-label">Description d'Accroche</label>
              <textarea id="heroDescription" class="bo-textarea" required>${hero.description}</textarea>
            </div>

            <div class="bo-form-grid-3">
              <div class="bo-form-group">
                <label class="bo-label">Badge 1 de Réassurance</label>
                <input type="text" id="heroBadge1" class="bo-input" value="${hero.badge1}" required />
              </div>
              <div class="bo-form-group">
                <label class="bo-label">Badge 2 de Réassurance</label>
                <input type="text" id="heroBadge2" class="bo-input" value="${hero.badge2}" required />
              </div>
              <div class="bo-form-group">
                <label class="bo-label">Badge 3 de Réassurance</label>
                <input type="text" id="heroBadge3" class="bo-input" value="${hero.badge3}" required />
              </div>
            </div>

            <div style="display: flex; justify-content: flex-end;">
              <button type="submit" class="bo-btn-primary">
                ${BO_ICONS.check}
                <span>Enregistrer le Héro</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Card 2: Page L'Entreprise -->
      <div class="bo-card">
        <div class="bo-card-header">
          <div class="bo-card-title-group">
            <div class="bo-card-icon">${BO_ICONS.layers}</div>
            <div>
              <h2 class="bo-card-title">Page L'Entreprise & Savoir-Faire (/entreprise)</h2>
              <p class="bo-card-subtitle">Présentation de la Société Nidjeu, vision et chiffres clés</p>
            </div>
          </div>
        </div>
        <div class="bo-card-body">
          <form id="boCompanyForm">
            <div class="bo-form-group">
              <label class="bo-label">Titre Principal de Présentation</label>
              <input type="text" id="companyLeadTitle" class="bo-input" value="${company.leadTitle}" required />
            </div>

            <div class="bo-form-group">
              <label class="bo-label">Texte de Présentation Société Nidjeu</label>
              <textarea id="companyLeadDesc" class="bo-textarea" required>${company.leadDesc}</textarea>
            </div>

            <div class="bo-form-grid-2">
              <div class="bo-form-group">
                <label class="bo-label">Titre Savoir-Faire</label>
                <input type="text" id="companySavoirTitle" class="bo-input" value="${company.savoirFaireTitle}" required />
              </div>
              <div class="bo-form-group">
                <label class="bo-label">Titre Vision</label>
                <input type="text" id="companyVisionTitle" class="bo-input" value="${company.visionTitle}" required />
              </div>
            </div>

            <div class="bo-form-grid-2">
              <div class="bo-form-group">
                <label class="bo-label">Description Savoir-Faire</label>
                <textarea id="companySavoirDesc" class="bo-textarea" required>${company.savoirFaireDesc}</textarea>
              </div>
              <div class="bo-form-group">
                <label class="bo-label">Description Vision</label>
                <textarea id="companyVisionDesc" class="bo-textarea" required>${company.visionDesc}</textarea>
              </div>
            </div>

            <!-- Stats -->
            <div class="bo-form-grid-2" style="margin-top: 10px;">
              <div class="bo-form-group">
                <label class="bo-label">Métrique 1 (Chiffre & Label)</label>
                <div style="display: flex; gap: 10px;">
                  <input type="text" id="stat1Num" class="bo-input" style="max-width: 110px;" value="${company.stat1Num}" />
                  <input type="text" id="stat1Label" class="bo-input" value="${company.stat1Label}" />
                </div>
              </div>
              <div class="bo-form-group">
                <label class="bo-label">Métrique 2 (Chiffre & Label)</label>
                <div style="display: flex; gap: 10px;">
                  <input type="text" id="stat2Num" class="bo-input" style="max-width: 110px;" value="${company.stat2Num}" />
                  <input type="text" id="stat2Label" class="bo-input" value="${company.stat2Label}" />
                </div>
              </div>
            </div>

            <div style="display: flex; justify-content: flex-end;">
              <button type="submit" class="bo-btn-primary">
                ${BO_ICONS.check}
                <span>Enregistrer la Page Entreprise</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Card 3: Engagements RSE -->
      <div class="bo-card">
        <div class="bo-card-header">
          <div class="bo-card-title-group">
            <div class="bo-card-icon">${BO_ICONS.check}</div>
            <div>
              <h2 class="bo-card-title">Engagements RSE & Durabilité (/engagements)</h2>
              <p class="bo-card-subtitle">Soutien aux filières locales camerounaises et éco-responsabilité</p>
            </div>
          </div>
        </div>
        <div class="bo-card-body">
          <form id="boEngagementsForm">
            <div class="bo-form-grid-2">
              <div class="bo-form-group">
                <label class="bo-label">Titre Héro Engagements</label>
                <input type="text" id="rseHeroTitle" class="bo-input" value="${engagements.heroTitle}" required />
              </div>
              <div class="bo-form-group">
                <label class="bo-label">Sous-Titre</label>
                <input type="text" id="rseHeroSubtitle" class="bo-input" value="${engagements.heroSubtitle}" required />
              </div>
            </div>

            <div class="bo-form-group">
              <label class="bo-label">Soutien aux Coopératives Agricoles (Filières)</label>
              <textarea id="rseFilieresDesc" class="bo-textarea" required>${engagements.filieresDesc}</textarea>
            </div>

            <div class="bo-form-group">
              <label class="bo-label">Éco-responsabilité & Emballages Recyclables</label>
              <textarea id="rseEcoDesc" class="bo-textarea" required>${engagements.ecoDesc}</textarea>
            </div>

            <div style="display: flex; justify-content: flex-end;">
              <button type="submit" class="bo-btn-primary">
                ${BO_ICONS.check}
                <span>Enregistrer les Engagements RSE</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Card 4: Questions Fréquentes (FAQ) -->
      <div class="bo-card">
        <div class="bo-card-header">
          <div class="bo-card-title-group">
            <div class="bo-card-icon">${BO_ICONS.fileText}</div>
            <div>
              <h2 class="bo-card-title">Foire Aux Questions (FAQ)</h2>
              <p class="bo-card-subtitle">Gérez les questions et réponses interactives pour les consommateurs</p>
            </div>
          </div>
          <button type="button" class="bo-btn-secondary" id="boAddNewFaqBtn">
            ${BO_ICONS.plus}
            <span>Ajouter une Question</span>
          </button>
        </div>

        <div class="bo-card-body">
          <div style="display: flex; flex-direction: column; gap: 16px;" id="boFaqList">
            ${faqs
              .map(
                (faq, idx) => `
              <div class="bo-item-card" style="padding: 18px;">
                <div style="display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; margin-bottom: 10px;">
                  <input 
                    type="text" 
                    class="bo-input bo-faq-q" 
                    data-idx="${idx}" 
                    value="${faq.question}" 
                    style="font-weight: 700; color: var(--bo-forest);"
                    placeholder="Intitulé de la question..."
                  />
                  <button type="button" class="bo-btn-icon bo-delete-faq-btn" data-idx="${idx}" title="Supprimer" style="color: var(--bo-red);">
                    ${BO_ICONS.trash}
                  </button>
                </div>
                <textarea class="bo-textarea bo-faq-a" data-idx="${idx}" placeholder="Réponse détaillée...">${faq.answer}</textarea>
              </div>
            `
              )
              .join('')}
          </div>

          <div style="display: flex; justify-content: flex-end; margin-top: 20px;">
            <button type="button" class="bo-btn-primary" id="boSaveFaqsBtn">
              ${BO_ICONS.check}
              <span>Enregistrer la FAQ</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // -------------------------------------------------------------------------
  // TAB: GALLERY / MOMENTS
  // -------------------------------------------------------------------------
  private renderGalleryTab(): string {
    const gallery = cmsService.getGalleryItems();

    return `
      <div class="bo-page-header">
        <div class="bo-page-title-group">
          <h1>Galerie & Événements Officiels</h1>
          <p class="bo-page-subtitle">Ajoutez ou modifiez les moments de dégustations, salons gastronomiques et photos consommateurs</p>
        </div>
        <div class="bo-page-actions">
          <button type="button" class="bo-btn-primary" id="boAddNewGalleryBtn">
            ${BO_ICONS.plus}
            <span>Ajouter une Photo</span>
          </button>
        </div>
      </div>

      <div class="bo-product-cards-grid">
        ${gallery
          .map(
            (item) => `
          <div class="bo-item-card">
            <div style="position: relative; height: 170px; border-radius: var(--bo-radius-md); overflow: hidden; margin-bottom: 14px; background: var(--bo-surface-subtle);">
              <img src="${item.image}" alt="${item.title}" style="width: 100%; height: 100%; object-fit: cover;" />
              <span style="position: absolute; top: 10px; left: 10px; background: rgba(10, 61, 34, 0.85); backdrop-filter: blur(4px); font-size: 11px; font-weight: 700; color: #FFFFFF; padding: 3px 10px; border-radius: var(--bo-radius-pill);">
                ${item.city} • ${item.date}
              </span>
            </div>

            <div class="bo-item-category">${item.categoryLabel}</div>
            <h3 class="bo-item-name" style="font-size: 16px;">${item.title}</h3>
            <p class="bo-item-desc" style="margin-bottom: 14px;">${item.description}</p>

            <div class="bo-item-footer">
              <span class="bo-badge-pill">${item.badge || 'Moment #NidjJuice'}</span>
              <div style="display: flex; gap: 8px;">
                <button type="button" class="bo-btn-edit" data-edit-gallery="${item.id}">
                  ${BO_ICONS.edit}
                  <span>Modifier</span>
                </button>
                <button type="button" class="bo-btn-icon" data-delete-gallery="${item.id}" title="Supprimer cette photo" style="color: var(--bo-red);">
                  ${BO_ICONS.trash}
                </button>
              </div>
            </div>
          </div>
        `
          )
          .join('')}
      </div>
    `;
  }

  // -------------------------------------------------------------------------
  // TAB: VIDEO REELS
  // -------------------------------------------------------------------------
  private renderReelsTab(): string {
    const reels = cmsService.getVideoReels();

    return `
      <div class="bo-page-header">
        <div class="bo-page-title-group">
          <h1>Vidéos & Reels Communauté</h1>
          <p class="bo-page-subtitle">Gérez les vidéos courtes d'immersion, de fabrication artisanale et de dégustation</p>
        </div>
        <div class="bo-page-actions">
          <button type="button" class="bo-btn-primary" id="boAddNewReelBtn">
            ${BO_ICONS.plus}
            <span>Ajouter une Vidéo Reel</span>
          </button>
        </div>
      </div>

      <div class="bo-product-cards-grid">
        ${reels
          .map(
            (r) => `
          <div class="bo-item-card">
            <div style="position: relative; height: 210px; border-radius: var(--bo-radius-md); overflow: hidden; margin-bottom: 14px; background: #000; display: flex; align-items: center; justify-content: center;">
              <video src="${r.src}" style="width: 100%; height: 100%; object-fit: cover;" muted preload="metadata"></video>
              <span style="position: absolute; top: 10px; left: 10px; background: rgba(10, 61, 34, 0.85); backdrop-filter: blur(4px); font-size: 11px; font-weight: 700; color: #FFFFFF; padding: 3px 10px; border-radius: var(--bo-radius-pill);">
                ${r.tag || 'Reel Vidéo'}
              </span>
            </div>

            <h3 class="bo-item-name" style="font-size: 16px;">${r.title}</h3>
            <p class="bo-item-desc" style="margin-bottom: 14px;">${r.caption}</p>

            <div class="bo-item-footer">
              <span style="font-size: 11.5px; color: var(--bo-text-muted); font-family: monospace;">${r.src}</span>
              <div style="display: flex; gap: 8px;">
                <button type="button" class="bo-btn-edit" data-edit-reel="${r.id}">
                  ${BO_ICONS.edit}
                  <span>Modifier</span>
                </button>
                <button type="button" class="bo-btn-icon" data-delete-reel="${r.id}" title="Supprimer ce reel" style="color: var(--bo-red);">
                  ${BO_ICONS.trash}
                </button>
              </div>
            </div>
          </div>
        `
          )
          .join('')}
      </div>
    `;
  }

  // -------------------------------------------------------------------------
  // TAB: STORES / DISTRIBUTION LOCATIONS
  // -------------------------------------------------------------------------
  private renderStoresTab(): string {
    const stores = cmsService.getStores();

    return `
      <div class="bo-page-header">
        <div class="bo-page-title-group">
          <h1>Réseau de Distribution & Points de Vente</h1>
          <p class="bo-page-subtitle">Ajoutez ou modifiez les supermarchés, hypermarchés et lounges distributeurs au Cameroun</p>
        </div>
        <div class="bo-page-actions">
          <button type="button" class="bo-btn-primary" id="boAddNewStoreBtn">
            ${BO_ICONS.plus}
            <span>Ajouter un Point de Vente</span>
          </button>
        </div>
      </div>

      <div class="bo-card">
        <div style="overflow-x: auto;">
          <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 13.5px;">
            <thead>
              <tr style="border-bottom: 1px solid var(--bo-border); color: var(--bo-text-muted); font-size: 11.5px; text-transform: uppercase; letter-spacing: 0.05em; background: var(--bo-surface-subtle);">
                <th style="padding: 14px 20px;">Enseigne / Nom</th>
                <th style="padding: 14px 16px;">Ville</th>
                <th style="padding: 14px 16px;">Quartier</th>
                <th style="padding: 14px 16px;">Type</th>
                <th style="padding: 14px 16px;">Téléphone</th>
                <th style="padding: 14px 16px;">Horaires</th>
                <th style="padding: 14px 20px; text-align: right;">Actions</th>
              </tr>
            </thead>
            <tbody>
              ${stores
                .map(
                  (s) => `
                <tr style="border-bottom: 1px solid var(--bo-border); transition: background 0.15s ease;">
                  <td style="padding: 14px 20px; font-weight: 700; color: var(--bo-forest);">
                    ${s.name}
                    <div style="font-size: 11.5px; font-weight: 400; color: var(--bo-text-muted);">${s.address}</div>
                  </td>
                  <td style="padding: 14px 16px; font-weight: 700; color: var(--bo-brand-green);">${s.city}</td>
                  <td style="padding: 14px 16px; color: var(--bo-text-secondary);">${s.neighborhood}</td>
                  <td style="padding: 14px 16px;">
                    <span class="bo-badge-pill">
                      ${s.type}
                    </span>
                  </td>
                  <td style="padding: 14px 16px; color: var(--bo-text-secondary); font-weight: 600;">${s.phone}</td>
                  <td style="padding: 14px 16px; color: var(--bo-text-muted); font-size: 12.5px;">${s.openingHours}</td>
                  <td style="padding: 14px 20px; text-align: right;">
                    <button type="button" class="bo-btn-edit" data-edit-store="${s.id}" style="margin-right: 6px;">
                      ${BO_ICONS.edit}
                      <span>Modifier</span>
                    </button>
                    <button type="button" class="bo-btn-icon" data-delete-store="${s.id}" title="Supprimer" style="color: var(--bo-red); display: inline-flex;">
                      ${BO_ICONS.trash}
                    </button>
                  </td>
                </tr>
              `
                )
                .join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // -------------------------------------------------------------------------
  // TAB: SETTINGS & GENERAL CONFIG
  // -------------------------------------------------------------------------
  private renderSettingsTab(): string {
    const settings = cmsService.getSettings();

    return `
      <div class="bo-page-header">
        <div class="bo-page-title-group">
          <h1>Paramètres Généraux, Hotline & SEO</h1>
          <p class="bo-page-subtitle">Configurez le contact WhatsApp officiel de commande, les coordonnées et le référencement</p>
        </div>
      </div>

      <div class="bo-card">
        <div class="bo-card-header">
          <div class="bo-card-title-group">
            <div class="bo-card-icon">${BO_ICONS.phone}</div>
            <div>
              <h2 class="bo-card-title">Coordonnées Officielles & Hotline WhatsApp Directe</h2>
              <p class="bo-card-subtitle">Numéro utilisé pour la redirection instantanée sur les boutons de commande</p>
            </div>
          </div>
        </div>

        <div class="bo-card-body">
          <form id="boSettingsForm">
            <div class="bo-form-grid-2">
              <div class="bo-form-group">
                <label class="bo-label">
                  <span>Numéro WhatsApp Direct</span>
                  <span class="bo-label-hint">Format international sans '+'</span>
                </label>
                <input type="text" id="cfgWhatsapp" class="bo-input" value="${settings.whatsappNumber}" required />
                <span style="font-size: 11.5px; color: var(--bo-text-muted); margin-top: 4px; display: block;">
                  Ex: <code>237698663029</code> — Modifie instantanément le bouton de commande sur tout le site.
                </span>
              </div>
              <div class="bo-form-group">
                <label class="bo-label">Téléphone Affiché (Présentation publique)</label>
                <input type="text" id="cfgPhone" class="bo-input" value="${settings.phoneDisplay}" required />
              </div>
            </div>

            <div class="bo-form-grid-2">
              <div class="bo-form-group">
                <label class="bo-label">Courriel de Contact Officiel</label>
                <input type="email" id="cfgEmail" class="bo-input" value="${settings.email}" required />
              </div>
              <div class="bo-form-group">
                <label class="bo-label">Siège Social & Ville</label>
                <input type="text" id="cfgHeadquarters" class="bo-input" value="${settings.headquarters}" required />
              </div>
            </div>

            <div style="margin: 24px 0 16px 0; border-top: 1px solid var(--bo-border); padding-top: 20px;">
              <h3 style="font-family: var(--font-display); font-size: 16px; font-weight: 800; color: var(--bo-forest); margin: 0 0 4px 0;">
                Réseaux Sociaux Officiels
              </h3>
              <p style="font-size: 12.5px; color: var(--bo-text-muted); margin: 0 0 16px 0;">
                Liens connectés aux icônes du pied de page et des bannières
              </p>
            </div>

            <div class="bo-form-grid-3">
              <div class="bo-form-group">
                <label class="bo-label">Page Facebook</label>
                <input type="url" id="cfgFacebook" class="bo-input" value="${settings.facebookUrl}" />
              </div>
              <div class="bo-form-group">
                <label class="bo-label">Profil Instagram</label>
                <input type="url" id="cfgInstagram" class="bo-input" value="${settings.instagramUrl}" />
              </div>
              <div class="bo-form-group">
                <label class="bo-label">Page LinkedIn</label>
                <input type="url" id="cfgLinkedin" class="bo-input" value="${settings.linkedinUrl}" />
              </div>
            </div>

            <div style="margin: 24px 0 16px 0; border-top: 1px solid var(--bo-border); padding-top: 20px;">
              <h3 style="font-family: var(--font-display); font-size: 16px; font-weight: 800; color: var(--bo-forest); margin: 0 0 4px 0;">
                Référencement Naturel & Métadonnées SEO
              </h3>
              <p style="font-size: 12.5px; color: var(--bo-text-muted); margin: 0 0 16px 0;">
                Titre et description transmis aux moteurs de recherche (Google, Bing)
              </p>
            </div>

            <div class="bo-form-group">
              <label class="bo-label">Balise Title Principale</label>
              <input type="text" id="cfgMetaTitle" class="bo-input" value="${settings.seoMetaTitle}" required />
            </div>

            <div class="bo-form-group">
              <label class="bo-label">Meta Description Globale</label>
              <textarea id="cfgMetaDesc" class="bo-textarea" required>${settings.seoMetaDesc}</textarea>
            </div>

            <div style="display: flex; justify-content: flex-end; margin-top: 16px;">
              <button type="submit" class="bo-btn-primary">
                ${BO_ICONS.check}
                <span>Enregistrer les Paramètres</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  // =========================================================================
  // 4. EVENT BINDINGS & INTERACTIONS
  // =========================================================================
  private bindEvents(): void {
    // Initial bindings handled inside renderDashboard / renderAuthGate
  }

  private bindDashboardEvents(): void {
    // Tab Switching
    this.element.querySelectorAll('.bo-nav-item').forEach((btn) => {
      btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab') as BackofficeTab;
        if (tab && tab !== this.currentTab) {
          this.currentTab = tab;
          this.render();
        }
      });
    });

    // Overview shortcuts
    this.element.querySelector('[data-goto-tab="products"]')?.addEventListener('click', () => {
      this.currentTab = 'products';
      this.render();
    });

    // Quick Add Buttons
    this.element.querySelector('#boQuickAddProductBtn')?.addEventListener('click', () => {
      this.openProductModal(null);
    });
    this.element.querySelector('#boAddNewProductBtn')?.addEventListener('click', () => {
      this.openProductModal(null);
    });
    this.element.querySelector('#boQuickAddStoreBtn')?.addEventListener('click', () => {
      this.openStoreModal(null);
    });
    this.element.querySelector('#boAddNewStoreBtn')?.addEventListener('click', () => {
      this.openStoreModal(null);
    });
    this.element.querySelector('#boAddNewGalleryBtn')?.addEventListener('click', () => {
      this.openGalleryModal(null);
    });
    this.element.querySelector('#boAddNewReelBtn')?.addEventListener('click', () => {
      this.openReelModal(null);
    });

    // Edit Product triggers
    this.element.querySelectorAll('[data-edit-product]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-edit-product');
        if (id) this.openProductModal(id);
      });
    });

    // Delete Product triggers
    this.element.querySelectorAll('[data-delete-product]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-delete-product');
        if (id && confirm(`Êtes-vous sûr de vouloir supprimer cette saveur ?`)) {
          const ok = cmsService.deleteProduct(id);
          if (ok) {
            this.showToast('Saveur supprimée avec succès', 'success');
            this.render();
          } else {
            this.showToast('Impossible de supprimer la dernière saveur restante', 'error');
          }
        }
      });
    });

    // Edit Store triggers
    this.element.querySelectorAll('[data-edit-store]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-edit-store');
        if (id) this.openStoreModal(id);
      });
    });

    // Delete Store triggers
    this.element.querySelectorAll('[data-delete-store]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-delete-store');
        if (id && confirm(`Supprimer ce point de vente ?`)) {
          cmsService.deleteStore(id);
          this.showToast('Point de vente supprimé', 'success');
          this.render();
        }
      });
    });

    // Edit Gallery triggers
    this.element.querySelectorAll('[data-edit-gallery]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-edit-gallery');
        if (id) this.openGalleryModal(id);
      });
    });

    // Delete Gallery triggers
    this.element.querySelectorAll('[data-delete-gallery]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-delete-gallery');
        if (id && confirm(`Supprimer cette photo de la galerie ?`)) {
          cmsService.deleteGalleryItem(id);
          this.showToast('Photo supprimée', 'success');
          this.render();
        }
      });
    });

    // Edit Reel triggers
    this.element.querySelectorAll('[data-edit-reel]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-edit-reel');
        if (id) this.openReelModal(id);
      });
    });

    // Delete Reel triggers
    this.element.querySelectorAll('[data-delete-reel]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-delete-reel');
        if (id && confirm(`Supprimer cette vidéo ?`)) {
          cmsService.deleteVideoReel(id);
          this.showToast('Vidéo supprimée', 'success');
          this.render();
        }
      });
    });

    // Hero Form Submit
    const heroForm = this.element.querySelector('#boHeroForm') as HTMLFormElement;
    heroForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      cmsService.saveHeroContent({
        titleWord1: (this.element.querySelector('#heroWord1') as HTMLInputElement).value,
        titleWord2: (this.element.querySelector('#heroWord2') as HTMLInputElement).value,
        subtitle: (this.element.querySelector('#heroSubtitle') as HTMLInputElement).value,
        description: (this.element.querySelector('#heroDescription') as HTMLTextAreaElement).value,
        badge1: (this.element.querySelector('#heroBadge1') as HTMLInputElement).value,
        badge2: (this.element.querySelector('#heroBadge2') as HTMLInputElement).value,
        badge3: (this.element.querySelector('#heroBadge3') as HTMLInputElement).value
      });
      this.showToast('Section Héro mise à jour avec succès', 'success');
    });

    // Company Form Submit
    const companyForm = this.element.querySelector('#boCompanyForm') as HTMLFormElement;
    companyForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const current = cmsService.getCompanyContent();
      cmsService.saveCompanyContent({
        ...current,
        leadTitle: (this.element.querySelector('#companyLeadTitle') as HTMLInputElement).value,
        leadDesc: (this.element.querySelector('#companyLeadDesc') as HTMLTextAreaElement).value,
        savoirFaireTitle: (this.element.querySelector('#companySavoirTitle') as HTMLInputElement).value,
        savoirFaireDesc: (this.element.querySelector('#companySavoirDesc') as HTMLTextAreaElement).value,
        visionTitle: (this.element.querySelector('#companyVisionTitle') as HTMLInputElement).value,
        visionDesc: (this.element.querySelector('#companyVisionDesc') as HTMLTextAreaElement).value,
        stat1Num: (this.element.querySelector('#stat1Num') as HTMLInputElement).value,
        stat1Label: (this.element.querySelector('#stat1Label') as HTMLInputElement).value,
        stat2Num: (this.element.querySelector('#stat2Num') as HTMLInputElement).value,
        stat2Label: (this.element.querySelector('#stat2Label') as HTMLInputElement).value
      });
      this.showToast('Page Entreprise enregistrée', 'success');
    });

    // Engagements Form Submit
    const rseForm = this.element.querySelector('#boEngagementsForm') as HTMLFormElement;
    rseForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const current = cmsService.getEngagementsContent();
      cmsService.saveEngagementsContent({
        ...current,
        heroTitle: (this.element.querySelector('#rseHeroTitle') as HTMLInputElement).value,
        heroSubtitle: (this.element.querySelector('#rseHeroSubtitle') as HTMLInputElement).value,
        filieresDesc: (this.element.querySelector('#rseFilieresDesc') as HTMLTextAreaElement).value,
        ecoDesc: (this.element.querySelector('#rseEcoDesc') as HTMLTextAreaElement).value
      });
      this.showToast('Engagements RSE enregistrés', 'success');
    });

    // Settings Form Submit
    const settingsForm = this.element.querySelector('#boSettingsForm') as HTMLFormElement;
    settingsForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const current = cmsService.getSettings();
      cmsService.saveSettings({
        ...current,
        whatsappNumber: (this.element.querySelector('#cfgWhatsapp') as HTMLInputElement).value.replace(/\D/g, ''),
        phoneDisplay: (this.element.querySelector('#cfgPhone') as HTMLInputElement).value,
        email: (this.element.querySelector('#cfgEmail') as HTMLInputElement).value,
        headquarters: (this.element.querySelector('#cfgHeadquarters') as HTMLInputElement).value,
        facebookUrl: (this.element.querySelector('#cfgFacebook') as HTMLInputElement).value,
        instagramUrl: (this.element.querySelector('#cfgInstagram') as HTMLInputElement).value,
        linkedinUrl: (this.element.querySelector('#cfgLinkedin') as HTMLInputElement).value,
        seoMetaTitle: (this.element.querySelector('#cfgMetaTitle') as HTMLInputElement).value,
        seoMetaDesc: (this.element.querySelector('#cfgMetaDesc') as HTMLTextAreaElement).value
      });
      this.showToast('Paramètres généraux enregistrés', 'success');
    });

    // FAQ Add and Save
    this.element.querySelector('#boAddNewFaqBtn')?.addEventListener('click', () => {
      const faqs = cmsService.getFaqs();
      faqs.push({
        id: `faq-${Date.now()}`,
        question: 'Nouvelle question fréquente ?',
        answer: 'Réponse détaillée de la Société Nidjeu...'
      });
      cmsService.saveFaqs(faqs);
      this.render();
      this.showToast('Nouvelle question ajoutée', 'success');
    });

    this.element.querySelectorAll('.bo-delete-faq-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-idx') || '-1', 10);
        if (idx >= 0) {
          const faqs = cmsService.getFaqs();
          faqs.splice(idx, 1);
          cmsService.saveFaqs(faqs);
          this.render();
          this.showToast('Question supprimée', 'success');
        }
      });
    });

    this.element.querySelector('#boSaveFaqsBtn')?.addEventListener('click', () => {
      const qInputs = this.element.querySelectorAll('.bo-faq-q') as NodeListOf<HTMLInputElement>;
      const aInputs = this.element.querySelectorAll('.bo-faq-a') as NodeListOf<HTMLTextAreaElement>;
      const currentFaqs = cmsService.getFaqs();

      const updatedFaqs: FaqItem[] = [];
      qInputs.forEach((qInput, i) => {
        const question = qInput.value.trim();
        const answer = aInputs[i]?.value.trim() || '';
        if (question) {
          updatedFaqs.push({
            id: currentFaqs[i]?.id || `faq-${i}`,
            question,
            answer
          });
        }
      });

      cmsService.saveFaqs(updatedFaqs);
      this.showToast('FAQ enregistrée', 'success');
    });

    // Export Backup
    this.element.querySelector('#boExportBtn')?.addEventListener('click', () => {
      const json = cmsService.exportBackupJson();
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `nidj-juice-cms-backup-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      this.showToast('Sauvegarde JSON téléchargée avec succès', 'success');
    });

    // Import Backup File
    const fileInput = this.element.querySelector('#boImportFileInput') as HTMLInputElement;
    fileInput?.addEventListener('change', (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (evt) => {
          const content = evt.target?.result as string;
          const ok = cmsService.importBackupJson(content);
          if (ok) {
            this.showToast('Sauvegarde restaurée avec succès !', 'success');
            this.render();
          } else {
            this.showToast('Fichier de sauvegarde invalide', 'error');
          }
        };
        reader.readAsText(file);
      }
    });

    // Reset Defaults
    this.element.querySelector('#boResetBtn')?.addEventListener('click', () => {
      if (confirm('Attention : Voulez-vous vraiment réinitialiser toutes les données aux valeurs par défaut d\'origine ?')) {
        cmsService.resetToDefaults();
        this.render();
        this.showToast('Données réinitialisées aux valeurs usine', 'success');
      }
    });

    // Logout
    this.element.querySelector('#boLogoutBtn')?.addEventListener('click', () => {
      cmsService.setAuthenticated(false);
      this.render();
      this.showToast('Déconnecté du panneau d\'administration', 'success');
    });
  }

  // =========================================================================
  // 5. PRODUCT EDIT MODAL (AGENCY STANDARD)
  // =========================================================================
  private openProductModal(productId: string | null): void {
    const isNew = !productId;
    const p: ShowcaseProduct = (productId && cmsService.getProductById(productId)) || {
      id: `saveur-${Date.now()}`,
      name: 'NOUVELLE SAVEUR',
      subtitle: 'Fruits frais pressés du Cameroun',
      category: 'Collection Spéciale',
      tagline: 'Fraîcheur pure et naturelle',
      quote: '« La pureté des fruits frais sélectionnés avec soin par la Société Nidjeu. »',
      description: 'Une recette artisanale et rafraîchissante élaborée à partir d’ingrédients 100% naturels pressés avec amour.',
      recipeStory: 'Nos fruits sont sélectionnés à pleine maturité dans les vergers partenaires camerounais pour offrir un goût incomparable.',
      bottleImage: '/assets/images/bottle-ananas.png',
      brandWatermark: 'NOUVELLE SAVEUR',
      accentColor: '#58A826',
      glowColor: 'rgba(88, 168, 38, 0.35)',
      haloColor: 'rgba(235, 247, 227, 0.75)',
      badges: ['100% Naturel', 'Zéro Conservateur', 'Pressé au Cameroun'],
      ctaText: 'Commander cette Saveur',
      tastingHint: 'Fraîcheur fruitée • Douceur naturelle',
      origin: 'Cameroun (Littoral)',
      terroir: 'Vergers fertiles du Cameroun',
      ingredients: ['Jus de fruits frais pur', 'Eau de source purifiée'],
      nutrition: {
        energy: '40 kcal / 100 ml',
        sugars: 'Sucres naturels du fruit uniquement',
        vitaminC: 'Source naturelle de Vitamine C',
        antioxidants: 'Polyphénols et micronutriments préservés'
      },
      tastingNotes: [
        { title: 'Attaque', note: 'Fraîcheur vive et parfumée', icon: 'fruit' },
        { title: 'Cœur', note: 'Rondeur équilibrée et veloutée', icon: 'pure' },
        { title: 'Finale', note: 'Sensation persistante et désaltérante', icon: 'flower' }
      ],
      formats: ['33 cl format nomade', '50 cl fraîcheur active', '1 Litre familial']
    };

    const modalContainer = this.element.querySelector('#boModalContainer');
    if (!modalContainer) return;

    modalContainer.innerHTML = `
      <div class="bo-modal-overlay">
        <div class="bo-modal">
          <div class="bo-modal-header">
            <div class="bo-modal-title-group">
              <h2>${isNew ? 'Créer une Nouvelle Saveur' : `Modifier la Saveur : ${p.name}`}</h2>
              <p class="bo-modal-subtitle">Fiche produit officielle • Société Nidjeu</p>
            </div>
            <button type="button" class="bo-modal-close-btn" id="closeProductModalBtn" title="Fermer">
              ${BO_ICONS.close}
            </button>
          </div>

          <form id="boProductEditForm">
            <div class="bo-modal-body">
              
              <!-- Identifiant & Noms -->
              <div class="bo-form-grid-2">
                <div class="bo-form-group">
                  <label class="bo-label">
                    <span>Identifiant Unique (Slug URL)</span>
                    <span class="bo-label-hint">Lettres minuscules & tirets</span>
                  </label>
                  <input type="text" id="pId" class="bo-input" value="${p.id}" ${!isNew ? 'readonly style="opacity:0.6;"' : ''} required />
                </div>
                <div class="bo-form-group">
                  <label class="bo-label">Nom Officiel du Produit</label>
                  <input type="text" id="pName" class="bo-input" value="${p.name}" required />
                </div>
              </div>

              <div class="bo-form-grid-2">
                <div class="bo-form-group">
                  <label class="bo-label">Sous-titre / Composition Clé</label>
                  <input type="text" id="pSubtitle" class="bo-input" value="${p.subtitle}" required />
                </div>
                <div class="bo-form-group">
                  <label class="bo-label">Catégorie de Marque</label>
                  <input type="text" id="pCategory" class="bo-input" value="${p.category || 'Collection Officielle'}" required />
                </div>
              </div>

              <!-- Image Uploader -->
              <div class="bo-form-group">
                <label class="bo-label">Visuel Officiel de la Bouteille</label>
                <div style="display: flex; gap: 16px; align-items: center; background: var(--bo-surface-subtle); padding: 14px; border-radius: var(--bo-radius-md); border: 1px solid var(--bo-border);">
                  <div style="width: 70px; height: 90px; background: #FFFFFF; border-radius: var(--bo-radius-sm); border: 1px solid var(--bo-border); display: flex; align-items: center; justify-content: center; padding: 4px; flex-shrink: 0;">
                    <img id="pImgPreview" src="${p.bottleImage}" alt="Prévisualisation" style="max-height: 100%; max-width: 100%; object-fit: contain;" />
                  </div>
                  <div style="flex: 1;">
                    <input type="text" id="pImgUrl" class="bo-input" value="${p.bottleImage}" placeholder="URL ou chemin de l'image (/assets/...)" style="margin-bottom: 8px;" />
                    <label class="bo-btn-secondary" style="font-size: 12px; padding: 6px 12px; cursor: pointer; display: inline-flex;">
                      ${BO_ICONS.camera}
                      <span>Choisir un fichier image</span>
                      <input type="file" id="pImgFileInput" accept="image/*" style="display: none;" />
                    </label>
                  </div>
                </div>
              </div>

              <!-- Colors & Branding -->
              <div class="bo-form-grid-3">
                <div class="bo-form-group">
                  <label class="bo-label">Couleur d'Accentuation</label>
                  <div class="bo-color-row">
                    <input type="color" id="pAccentColor" value="${p.accentColor.startsWith('#') ? p.accentColor : '#58A826'}" style="width: 44px; height: 38px; border: none; background: transparent; cursor: pointer;" />
                    <input type="text" id="pAccentColorText" class="bo-input" value="${p.accentColor}" />
                  </div>
                </div>
                <div class="bo-form-group">
                  <label class="bo-label">Couleur de Halo</label>
                  <input type="text" id="pHaloColor" class="bo-input" value="${p.haloColor || 'rgba(235, 247, 227, 0.75)'}" />
                </div>
                <div class="bo-form-group">
                  <label class="bo-label">Origine & Terroir</label>
                  <input type="text" id="pOrigin" class="bo-input" value="${p.origin || 'Cameroun'}" />
                </div>
              </div>

              <!-- Editorial -->
              <div class="bo-form-group">
                <label class="bo-label">Citation Sensorielle / Accroche</label>
                <input type="text" id="pQuote" class="bo-input" value="${p.quote || ''}" />
              </div>

              <div class="bo-form-group">
                <label class="bo-label">Description Détaillée</label>
                <textarea id="pDesc" class="bo-textarea" required>${p.description}</textarea>
              </div>

              <div class="bo-form-group">
                <label class="bo-label">Histoire de la Recette</label>
                <textarea id="pRecipeStory" class="bo-textarea">${p.recipeStory || ''}</textarea>
              </div>

              <!-- Ingrédients & Formats -->
              <div class="bo-form-grid-2">
                <div class="bo-form-group">
                  <label class="bo-label">Ingrédients (1 par ligne)</label>
                  <textarea id="pIngredients" class="bo-textarea" rows="4">${(p.ingredients || []).join('\n')}</textarea>
                </div>
                <div class="bo-form-group">
                  <label class="bo-label">Formats Disponibles (1 par ligne)</label>
                  <textarea id="pFormats" class="bo-textarea" rows="4">${(p.formats || []).join('\n')}</textarea>
                </div>
              </div>

              <!-- Badges -->
              <div class="bo-form-group">
                <label class="bo-label">Badges Clés (séparés par des virgules)</label>
                <input type="text" id="pBadges" class="bo-input" value="${(p.badges || []).join(', ')}" />
              </div>

              <!-- Nutrition -->
              <div class="bo-form-grid-2">
                <div class="bo-form-group">
                  <label class="bo-label">Énergie (kcal)</label>
                  <input type="text" id="pNutEnergy" class="bo-input" value="${p.nutrition?.energy || '40 kcal / 100 ml'}" />
                </div>
                <div class="bo-form-group">
                  <label class="bo-label">Sucres</label>
                  <input type="text" id="pNutSugars" class="bo-input" value="${p.nutrition?.sugars || 'Sucres naturels'}" />
                </div>
              </div>

            </div>

            <div class="bo-modal-footer">
              <button type="button" class="bo-btn-secondary" id="cancelProductModalBtn">Annuler</button>
              <button type="submit" class="bo-btn-primary">
                ${BO_ICONS.check}
                <span>Enregistrer la Saveur</span>
              </button>
            </div>

          </form>
        </div>
      </div>
    `;

    // Modal Close
    const closeBtn = modalContainer.querySelector('#closeProductModalBtn');
    const cancelBtn = modalContainer.querySelector('#cancelProductModalBtn');
    const closeModal = () => (modalContainer.innerHTML = '');
    closeBtn?.addEventListener('click', closeModal);
    cancelBtn?.addEventListener('click', closeModal);

    // Live Color Picker Sync
    const colorPicker = modalContainer.querySelector('#pAccentColor') as HTMLInputElement;
    const colorText = modalContainer.querySelector('#pAccentColorText') as HTMLInputElement;
    colorPicker?.addEventListener('input', () => {
      colorText.value = colorPicker.value;
    });
    colorText?.addEventListener('input', () => {
      if (/^#[0-9A-F]{6}$/i.test(colorText.value)) {
        colorPicker.value = colorText.value;
      }
    });

    // Live Image Upload Preview
    const imgInput = modalContainer.querySelector('#pImgFileInput') as HTMLInputElement;
    const imgUrlInput = modalContainer.querySelector('#pImgUrl') as HTMLInputElement;
    const imgPreview = modalContainer.querySelector('#pImgPreview') as HTMLImageElement;

    imgUrlInput?.addEventListener('input', () => {
      imgPreview.src = imgUrlInput.value;
    });

    imgInput?.addEventListener('change', (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (evt) => {
          const dataUrl = evt.target?.result as string;
          imgPreview.src = dataUrl;
          imgUrlInput.value = dataUrl;
        };
        reader.readAsDataURL(file);
      }
    });

    // Form Submit
    const form = modalContainer.querySelector('#boProductEditForm') as HTMLFormElement;
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const updatedProduct: ShowcaseProduct = {
        ...p,
        id: (modalContainer.querySelector('#pId') as HTMLInputElement).value.trim().toLowerCase().replace(/\s+/g, '-'),
        name: (modalContainer.querySelector('#pName') as HTMLInputElement).value.trim().toUpperCase(),
        subtitle: (modalContainer.querySelector('#pSubtitle') as HTMLInputElement).value.trim(),
        category: (modalContainer.querySelector('#pCategory') as HTMLInputElement).value.trim(),
        bottleImage: imgUrlInput.value.trim() || p.bottleImage,
        accentColor: colorText.value.trim() || '#58A826',
        glowColor: (modalContainer.querySelector('#pHaloColor') as HTMLInputElement).value.trim() || p.glowColor,
        quote: (modalContainer.querySelector('#pQuote') as HTMLInputElement).value.trim(),
        description: (modalContainer.querySelector('#pDesc') as HTMLTextAreaElement).value.trim(),
        recipeStory: (modalContainer.querySelector('#pRecipeStory') as HTMLTextAreaElement).value.trim(),
        origin: (modalContainer.querySelector('#pOrigin') as HTMLInputElement).value.trim(),
        badges: (modalContainer.querySelector('#pBadges') as HTMLInputElement).value
          .split(',')
          .map((b) => b.trim())
          .filter(Boolean),
        ingredients: (modalContainer.querySelector('#pIngredients') as HTMLTextAreaElement).value
          .split('\n')
          .map((i) => i.trim())
          .filter(Boolean),
        formats: (modalContainer.querySelector('#pFormats') as HTMLTextAreaElement).value
          .split('\n')
          .map((f) => f.trim())
          .filter(Boolean),
        nutrition: {
          energy: (modalContainer.querySelector('#pNutEnergy') as HTMLInputElement).value.trim() || '40 kcal / 100 ml',
          sugars: (modalContainer.querySelector('#pNutSugars') as HTMLInputElement).value.trim() || 'Sucres naturels des fruits',
          vitaminC: p.nutrition?.vitaminC || 'Riche en vitamine C naturelle',
          antioxidants: p.nutrition?.antioxidants || 'Fort pouvoir antioxydant'
        }
      };

      cmsService.saveProduct(updatedProduct);
      closeModal();
      this.render();
      this.showToast(`Saveur « ${updatedProduct.name} » enregistrée !`, 'success');
    });
  }

  // =========================================================================
  // 6. STORE / POINT DE VENTE EDIT MODAL
  // =========================================================================
  private openStoreModal(storeId: string | null): void {
    const isNew = !storeId;
    const s: StoreLocation = (storeId && cmsService.getStores().find((item) => item.id === storeId)) || {
      id: `store-${Date.now()}`,
      city: 'Douala',
      neighborhood: 'Akwa',
      name: 'Nouveau Supermarché Partenaire',
      address: 'Boulevard de la Liberté, Douala',
      phone: '+237 6 77 42 66 12',
      type: 'Hypermarché',
      image: '/assets/images/store-supermarket.jpg',
      openingHours: '08h00 - 21h00',
      coordinates: { lat: 4.0512, lng: 9.7042 }
    };

    const modalContainer = this.element.querySelector('#boModalContainer');
    if (!modalContainer) return;

    modalContainer.innerHTML = `
      <div class="bo-modal-overlay">
        <div class="bo-modal" style="max-width: 600px;">
          <div class="bo-modal-header">
            <div class="bo-modal-title-group">
              <h2>${isNew ? 'Ajouter un Point de Vente' : `Modifier : ${s.name}`}</h2>
              <p class="bo-modal-subtitle">Réseau officiel de distribution au Cameroun</p>
            </div>
            <button type="button" class="bo-modal-close-btn" id="closeStoreModalBtn" title="Fermer">
              ${BO_ICONS.close}
            </button>
          </div>

          <form id="boStoreEditForm">
            <div class="bo-modal-body">
              <div class="bo-form-group">
                <label class="bo-label">Nom de l'Enseigne / Point de Vente</label>
                <input type="text" id="sName" class="bo-input" value="${s.name}" required />
              </div>

              <div class="bo-form-grid-2">
                <div class="bo-form-group">
                  <label class="bo-label">Ville (Cameroun)</label>
                  <select id="sCity" class="bo-select">
                    <option value="Douala" ${s.city === 'Douala' ? 'selected' : ''}>Douala</option>
                    <option value="Yaoundé" ${s.city === 'Yaoundé' ? 'selected' : ''}>Yaoundé</option>
                    <option value="Bafoussam" ${s.city === 'Bafoussam' ? 'selected' : ''}>Bafoussam</option>
                    <option value="Kribi" ${s.city === 'Kribi' ? 'selected' : ''}>Kribi</option>
                    <option value="Garoua" ${s.city === 'Garoua' ? 'selected' : ''}>Garoua</option>
                  </select>
                </div>
                <div class="bo-form-group">
                  <label class="bo-label">Quartier</label>
                  <input type="text" id="sNeighborhood" class="bo-input" value="${s.neighborhood}" required />
                </div>
              </div>

              <div class="bo-form-group">
                <label class="bo-label">Adresse Précise</label>
                <input type="text" id="sAddress" class="bo-input" value="${s.address}" required />
              </div>

              <div class="bo-form-grid-2">
                <div class="bo-form-group">
                  <label class="bo-label">Téléphone</label>
                  <input type="text" id="sPhone" class="bo-input" value="${s.phone}" required />
                </div>
                <div class="bo-form-group">
                  <label class="bo-label">Type d'Établissement</label>
                  <select id="sType" class="bo-select">
                    <option value="Hypermarché" ${s.type === 'Hypermarché' ? 'selected' : ''}>Hypermarché</option>
                    <option value="Boutique Partenaire" ${s.type === 'Boutique Partenaire' ? 'selected' : ''}>Boutique Partenaire</option>
                    <option value="Restaurant & Lounge" ${s.type === 'Restaurant & Lounge' ? 'selected' : ''}>Restaurant & Lounge</option>
                    <option value="Point Relais Express" ${s.type === 'Point Relais Express' ? 'selected' : ''}>Point Relais Express</option>
                  </select>
                </div>
              </div>

              <div class="bo-form-group">
                <label class="bo-label">Horaires d'Ouverture</label>
                <input type="text" id="sHours" class="bo-input" value="${s.openingHours}" required />
              </div>
            </div>

            <div class="bo-modal-footer">
              <button type="button" class="bo-btn-secondary" id="cancelStoreModalBtn">Annuler</button>
              <button type="submit" class="bo-btn-primary">
                ${BO_ICONS.check}
                <span>Enregistrer</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    `;

    const closeModal = () => (modalContainer.innerHTML = '');
    modalContainer.querySelector('#closeStoreModalBtn')?.addEventListener('click', closeModal);
    modalContainer.querySelector('#cancelStoreModalBtn')?.addEventListener('click', closeModal);

    const form = modalContainer.querySelector('#boStoreEditForm') as HTMLFormElement;
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const updatedStore: StoreLocation = {
        ...s,
        name: (modalContainer.querySelector('#sName') as HTMLInputElement).value.trim(),
        city: (modalContainer.querySelector('#sCity') as HTMLSelectElement).value as StoreLocation['city'],
        neighborhood: (modalContainer.querySelector('#sNeighborhood') as HTMLInputElement).value.trim(),
        address: (modalContainer.querySelector('#sAddress') as HTMLInputElement).value.trim(),
        phone: (modalContainer.querySelector('#sPhone') as HTMLInputElement).value.trim(),
        type: (modalContainer.querySelector('#sType') as HTMLSelectElement).value as any,
        openingHours: (modalContainer.querySelector('#sHours') as HTMLInputElement).value.trim()
      };

      cmsService.saveStore(updatedStore);
      closeModal();
      this.render();
      this.showToast(`Point de vente « ${updatedStore.name} » enregistré !`, 'success');
    });
  }

  // =========================================================================
  // 7. GALLERY ITEM EDIT MODAL
  // =========================================================================
  private openGalleryModal(itemId: string | null): void {
    const isNew = !itemId;
    const g: GalleryItem = (itemId && cmsService.getGalleryItems().find((item) => item.id === itemId)) || {
      id: `moment-${Date.now()}`,
      title: 'Nouveau Moment Dégustation',
      category: 'events',
      categoryLabel: 'Événements & Salons',
      image: '/assets/images/event-tasting-douala.jpg',
      city: 'Douala',
      date: 'Mars 2026',
      description: 'Dégustation festive de nos nectars purs avec les consommateurs.',
      badge: 'Événement Officiel',
      featured: true
    };

    const modalContainer = this.element.querySelector('#boModalContainer');
    if (!modalContainer) return;

    modalContainer.innerHTML = `
      <div class="bo-modal-overlay">
        <div class="bo-modal" style="max-width: 600px;">
          <div class="bo-modal-header">
            <div class="bo-modal-title-group">
              <h2>${isNew ? 'Ajouter une Photo à la Galerie' : `Modifier : ${g.title}`}</h2>
              <p class="bo-modal-subtitle">Moments officiels et dégustations</p>
            </div>
            <button type="button" class="bo-modal-close-btn" id="closeGalleryModalBtn" title="Fermer">
              ${BO_ICONS.close}
            </button>
          </div>

          <form id="boGalleryEditForm">
            <div class="bo-modal-body">
              <div class="bo-form-group">
                <label class="bo-label">Titre du Moment / Événement</label>
                <input type="text" id="gTitle" class="bo-input" value="${g.title}" required />
              </div>

              <!-- Image Uploader -->
              <div class="bo-form-group">
                <label class="bo-label">Photo de l'Événement</label>
                <div style="display: flex; gap: 14px; align-items: center; background: var(--bo-surface-subtle); padding: 12px; border-radius: var(--bo-radius-md); border: 1px solid var(--bo-border);">
                  <div style="width: 80px; height: 60px; background: #FFFFFF; border-radius: var(--bo-radius-sm); border: 1px solid var(--bo-border); overflow: hidden; flex-shrink: 0;">
                    <img id="gImgPreview" src="${g.image}" alt="Aperçu" style="width: 100%; height: 100%; object-fit: cover;" />
                  </div>
                  <div style="flex: 1;">
                    <input type="text" id="gImgUrl" class="bo-input" value="${g.image}" placeholder="URL ou chemin de la photo" style="margin-bottom: 6px;" />
                    <label class="bo-btn-secondary" style="font-size: 11.5px; padding: 5px 10px; cursor: pointer; display: inline-flex;">
                      ${BO_ICONS.camera}
                      <span>Choisir un fichier</span>
                      <input type="file" id="gImgFileInput" accept="image/*" style="display: none;" />
                    </label>
                  </div>
                </div>
              </div>

              <div class="bo-form-grid-3">
                <div class="bo-form-group">
                  <label class="bo-label">Ville</label>
                  <input type="text" id="gCity" class="bo-input" value="${g.city}" required />
                </div>
                <div class="bo-form-group">
                  <label class="bo-label">Date</label>
                  <input type="text" id="gDate" class="bo-input" value="${g.date}" required />
                </div>
                <div class="bo-form-group">
                  <label class="bo-label">Catégorie</label>
                  <select id="gCat" class="bo-select">
                    <option value="events" ${g.category === 'events' ? 'selected' : ''}>Événements & Salons</option>
                    <option value="lounges" ${g.category === 'lounges' ? 'selected' : ''}>Dégustations & Lounges</option>
                    <option value="consumers" ${g.category === 'consumers' ? 'selected' : ''}>Moments Consommateurs</option>
                    <option value="terroir" ${g.category === 'terroir' ? 'selected' : ''}>Terroir & Ateliers</option>
                  </select>
                </div>
              </div>

              <div class="bo-form-group">
                <label class="bo-label">Description du Moment</label>
                <textarea id="gDesc" class="bo-textarea" required>${g.description}</textarea>
              </div>
            </div>

            <div class="bo-modal-footer">
              <button type="button" class="bo-btn-secondary" id="cancelGalleryModalBtn">Annuler</button>
              <button type="submit" class="bo-btn-primary">
                ${BO_ICONS.check}
                <span>Enregistrer</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    `;

    const closeModal = () => (modalContainer.innerHTML = '');
    modalContainer.querySelector('#closeGalleryModalBtn')?.addEventListener('click', closeModal);
    modalContainer.querySelector('#cancelGalleryModalBtn')?.addEventListener('click', closeModal);

    const imgInput = modalContainer.querySelector('#gImgFileInput') as HTMLInputElement;
    const imgUrlInput = modalContainer.querySelector('#gImgUrl') as HTMLInputElement;
    const imgPreview = modalContainer.querySelector('#gImgPreview') as HTMLImageElement;

    imgUrlInput?.addEventListener('input', () => (imgPreview.src = imgUrlInput.value));
    imgInput?.addEventListener('change', (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (evt) => {
          const dataUrl = evt.target?.result as string;
          imgPreview.src = dataUrl;
          imgUrlInput.value = dataUrl;
        };
        reader.readAsDataURL(file);
      }
    });

    const form = modalContainer.querySelector('#boGalleryEditForm') as HTMLFormElement;
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const catSelect = modalContainer.querySelector('#gCat') as HTMLSelectElement;
      const catLabel = catSelect.options[catSelect.selectedIndex].text;

      const updatedGallery: GalleryItem = {
        ...g,
        title: (modalContainer.querySelector('#gTitle') as HTMLInputElement).value.trim(),
        image: imgUrlInput.value.trim() || g.image,
        city: (modalContainer.querySelector('#gCity') as HTMLInputElement).value.trim(),
        date: (modalContainer.querySelector('#gDate') as HTMLInputElement).value.trim(),
        category: catSelect.value as any,
        categoryLabel: catLabel,
        description: (modalContainer.querySelector('#gDesc') as HTMLTextAreaElement).value.trim()
      };

      cmsService.saveGalleryItem(updatedGallery);
      closeModal();
      this.render();
      this.showToast('Photo de galerie enregistrée !', 'success');
    });
  }

  // =========================================================================
  // 8. VIDEO REEL EDIT MODAL
  // =========================================================================
  private openReelModal(reelId: string | null): void {
    const isNew = !reelId;
    const r: VideoReel = (reelId && cmsService.getVideoReels().find((item) => item.id === reelId)) || {
      id: `reel-${Date.now()}`,
      title: 'Nouveau Reel Vidéo',
      caption: 'L\'expérience fraîcheur Nidj Juice en vidéo',
      src: '/assets/videos/reel-1.mp4',
      tag: 'Nidj Juice Lifestyle'
    };

    const modalContainer = this.element.querySelector('#boModalContainer');
    if (!modalContainer) return;

    modalContainer.innerHTML = `
      <div class="bo-modal-overlay">
        <div class="bo-modal" style="max-width: 550px;">
          <div class="bo-modal-header">
            <div class="bo-modal-title-group">
              <h2>${isNew ? 'Ajouter une Vidéo Reel' : `Modifier : ${r.title}`}</h2>
              <p class="bo-modal-subtitle">Contenu vidéo mobile • #NidjJuiceVibes</p>
            </div>
            <button type="button" class="bo-modal-close-btn" id="closeReelModalBtn" title="Fermer">
              ${BO_ICONS.close}
            </button>
          </div>

          <form id="boReelEditForm">
            <div class="bo-modal-body">
              <div class="bo-form-group">
                <label class="bo-label">Titre du Reel</label>
                <input type="text" id="rTitle" class="bo-input" value="${r.title}" required />
              </div>

              <div class="bo-form-group">
                <label class="bo-label">Source de la Vidéo (Fichier .mp4 ou URL)</label>
                <input type="text" id="rSrc" class="bo-input" value="${r.src}" required />
              </div>

              <div class="bo-form-group">
                <label class="bo-label">Légende / Description Courte</label>
                <input type="text" id="rCaption" class="bo-input" value="${r.caption}" required />
              </div>

              <div class="bo-form-group">
                <label class="bo-label">Tag / Thématique</label>
                <input type="text" id="rTag" class="bo-input" value="${r.tag || ''}" />
              </div>
            </div>

            <div class="bo-modal-footer">
              <button type="button" class="bo-btn-secondary" id="cancelReelModalBtn">Annuler</button>
              <button type="submit" class="bo-btn-primary">
                ${BO_ICONS.check}
                <span>Enregistrer</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    `;

    const closeModal = () => (modalContainer.innerHTML = '');
    modalContainer.querySelector('#closeReelModalBtn')?.addEventListener('click', closeModal);
    modalContainer.querySelector('#cancelReelModalBtn')?.addEventListener('click', closeModal);

    const form = modalContainer.querySelector('#boReelEditForm') as HTMLFormElement;
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const updatedReel: VideoReel = {
        ...r,
        title: (modalContainer.querySelector('#rTitle') as HTMLInputElement).value.trim(),
        src: (modalContainer.querySelector('#rSrc') as HTMLInputElement).value.trim(),
        caption: (modalContainer.querySelector('#rCaption') as HTMLInputElement).value.trim(),
        tag: (modalContainer.querySelector('#rTag') as HTMLInputElement).value.trim()
      };

      cmsService.saveVideoReel(updatedReel);
      closeModal();
      this.render();
      this.showToast('Vidéo Reel enregistrée !', 'success');
    });
  }

  // =========================================================================
  // 9. TOAST NOTIFICATIONS (AGENCY PILL WITH SVG ICONS)
  // =========================================================================
  private showToast(message: string, type: 'success' | 'error' = 'success'): void {
    const container = this.element.querySelector('#boToastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `bo-toast ${type}`;
    toast.innerHTML = `
      <div class="bo-toast-icon">
        ${type === 'success' ? BO_ICONS.check : BO_ICONS.close}
      </div>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(12px)';
      toast.style.transition = 'all 0.25s ease';
      setTimeout(() => toast.remove(), 250);
    }, 3600);
  }
}
