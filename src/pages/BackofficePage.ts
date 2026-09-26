/* ==========================================================================
   NIDJ JUICE — ENTERPRISE BACKOFFICE CMS (/nidj-juice-backoffice)
   Agency-Standard Administration Studio & Content Management Platform
   Exact Brand Color Match • 100% Vector Iconography • Bespoke Architecture
   ========================================================================== */

import { cmsService, type FaqItem } from '../services/cms.service';
import { cloudinaryService } from '../services/cloudinary.service';
import { supabaseService, type AdminUser } from '../services/supabase.service';
import type { ShowcaseProduct } from '../components/showcase/showcase.types';
import type { StoreLocation, VideoReel, JuiceCollection, CmsCustomPage } from '../types/product.types';
import type { GalleryItem } from '../data/gallery.data';

type BackofficeTab = 'overview' | 'products' | 'collections' | 'pages' | 'gallery' | 'reels' | 'stores' | 'settings';

/* --- Vector Icons (Agency Grade • Lucide / Feather Style) --- */
const BO_ICONS = {
  grid: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>`,
  bottle: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3h6v3H9z"></path><path d="M10 6v3a4 4 0 0 1-2 3.46V20a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-7.54A4 4 0 0 1 14 9V6"></path></svg>`,
  layers: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>`,
  folder: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>`,
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
  menu: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`,
  cloud: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path></svg>`,
  database: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>`,
  loader: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="bo-spin"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>`
};

export class BackofficePage {
  private element: HTMLElement;
  private currentTab: BackofficeTab = 'overview';
  private authMode: 'login' | 'register' = 'login';

  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'backoffice-root';
    this.render();
    this.bindEvents();
  }

  public getElement(): HTMLElement {
    return this.element;
  }

  public closeMobileSidebar(): void {
    const sidebar = this.element.querySelector('#boSidebar');
    const backdrop = this.element.querySelector('#boSidebarBackdrop');
    sidebar?.classList.remove('is-mobile-open');
    backdrop?.classList.remove('is-active');
    document.body.classList.remove('bo-sidebar-locked');
  }

  public toggleMobileSidebar(): void {
    const sidebar = this.element.querySelector('#boSidebar');
    const backdrop = this.element.querySelector('#boSidebarBackdrop');
    const isOpen = sidebar?.classList.contains('is-mobile-open');
    if (isOpen) {
      this.closeMobileSidebar();
    } else {
      sidebar?.classList.add('is-mobile-open');
      backdrop?.classList.add('is-active');
      document.body.classList.add('bo-sidebar-locked');
    }
  }

  public destroy(): void {
    document.body.classList.remove('bo-sidebar-locked');
  }

  public render(): void {
    document.body.classList.remove('bo-sidebar-locked');
    if (!cmsService.isAuthenticated()) {
      this.renderAuthGate();
    } else {
      this.renderDashboard();
    }
  }

  // =========================================================================
  // 1. SECURITY & ADMINISTRATOR AUTHENTICATION GATE (SUPABASE CLOUD AUTH)
  // =========================================================================
  private renderAuthGate(): void {
    const settings = cmsService.getSettings();
    const isCloudConfigured = supabaseService.isConfigured();

    this.element.innerHTML = `
      <div class="bo-auth-container">
        <div class="bo-auth-card">
          <img src="${settings.brandLogoUrl || '/assets/images/logo-nidj.png'}" alt="Nidj Juice" class="bo-auth-logo" />
          <h1 class="bo-auth-title">Espace Administration</h1>
          <p class="bo-auth-desc">
            Société Nidjeu • Plateforme sécurisée de pilotage officiel de la marque <strong>Nidj Juice</strong> au Cameroun.
          </p>

          <!-- Supabase Cloud Connection Status Badge -->
          <div style="margin-bottom: 16px;">
            ${isCloudConfigured 
              ? `<span class="bo-auth-badge-status is-cloud">${BO_ICONS.check} Authentification Supabase Cloud Active</span>`
              : `<span class="bo-auth-badge-status is-local">⚠️ Mode Local (Supabase à configurer)</span>`}
          </div>

          <!-- Auth Mode Tabs (Connexion / Nouvel Administrateur) -->
          <div class="bo-auth-tabs">
            <button type="button" class="bo-auth-tab-btn ${this.authMode === 'login' ? 'is-active' : ''}" id="boTabLoginBtn">
              Connexion
            </button>
            <button type="button" class="bo-auth-tab-btn ${this.authMode === 'register' ? 'is-active' : ''}" id="boTabRegisterBtn">
              Créer un Administrateur
            </button>
          </div>

          <!-- Dynamic Form Container -->
          ${this.authMode === 'login' ? `
            <form id="boLoginForm" class="bo-form">
              <div class="bo-form-group">
                <label class="bo-label" for="boAuthEmail">Adresse Email Administrateur</label>
                <input 
                  type="email" 
                  id="boAuthEmail" 
                  class="bo-input" 
                  placeholder="ex: nidjeuinsarl@gmail.com ou admin" 
                  value="nidjeuinsarl@gmail.com"
                  autocomplete="username"
                  required
                />
              </div>

              <div class="bo-form-group">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                  <label class="bo-label" for="boAuthPassword" style="margin: 0;">Mot de passe</label>
                  <span style="font-size: 11px; color: var(--bo-brand-green); font-weight: 700;">Supabase Auth</span>
                </div>
                <input 
                  type="password" 
                  id="boAuthPassword" 
                  class="bo-input" 
                  placeholder="Entrez votre mot de passe" 
                  autocomplete="current-password"
                  required
                />
              </div>

              <div style="display: flex; align-items: center; justify-content: space-between; margin: 8px 0 14px 0;">
                <label style="display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--bo-text-muted); cursor: pointer;">
                  <input type="checkbox" id="boRememberMe" checked style="accent-color: var(--bo-brand-green); width: 15px; height: 15px;" />
                  <span>Rester connecté</span>
                </label>
              </div>

              <div id="boAuthFeedback" style="margin-bottom: 12px;"></div>

              <button type="submit" class="bo-btn-primary" id="boLoginSubmitBtn" style="width: 100%; justify-content: center; margin-top: 4px;">
                ${BO_ICONS.lock}
                <span>Se Connecter au Backoffice</span>
              </button>
            </form>
          ` : `
            <form id="boRegisterForm" class="bo-form">
              <div class="bo-form-group">
                <label class="bo-label" for="boRegName">Nom et Prénom de l'Administrateur</label>
                <input 
                  type="text" 
                  id="boRegName" 
                  class="bo-input" 
                  placeholder="ex: Noah Richard - Direction" 
                  required
                />
              </div>

              <div class="bo-form-group">
                <label class="bo-label" for="boRegEmail">Adresse Email Professionnelle</label>
                <input 
                  type="email" 
                  id="boRegEmail" 
                  class="bo-input" 
                  placeholder="ex: nidjeuinsarl@gmail.com" 
                  required
                />
              </div>

              <div class="bo-form-group">
                <label class="bo-label" for="boRegRole">Rôle Administratif</label>
                <select id="boRegRole" class="bo-select" required>
                  <option value="Direction Générale">Direction Générale</option>
                  <option value="Responsable Ventes & Distribution">Responsable Ventes & Distribution</option>
                  <option value="Gestionnaire Catalogue & Contenus">Gestionnaire Catalogue & Contenus</option>
                  <option value="Superviseur Production">Superviseur Production</option>
                </select>
              </div>

              <div class="bo-form-group">
                <label class="bo-label" for="boRegPassword">Mot de passe Supabase (Min. 6 caractères)</label>
                <input 
                  type="password" 
                  id="boRegPassword" 
                  class="bo-input" 
                  placeholder="••••••••" 
                  required
                  minlength="6"
                />
              </div>

              <div id="boAuthFeedback" style="margin-bottom: 12px;"></div>

              <button type="submit" class="bo-btn-primary" id="boRegisterSubmitBtn" style="width: 100%; justify-content: center; background: #2ea069; border-color: #2ea069; margin-top: 4px;">
                ${BO_ICONS.plus}
                <span>Créer l'Administrateur sur Supabase</span>
              </button>
            </form>
          `}

          <!-- Quick Unlock for Demo -->
          <div class="bo-quick-unlock-card">
            <p style="font-size: 12px; color: var(--bo-forest); font-weight: 600; margin: 0 0 10px 0;">
              Accès rapide de démonstration client :
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

    // Tab buttons switching
    this.element.querySelector('#boTabLoginBtn')?.addEventListener('click', () => {
      this.authMode = 'login';
      this.renderAuthGate();
    });
    this.element.querySelector('#boTabRegisterBtn')?.addEventListener('click', () => {
      this.authMode = 'register';
      this.renderAuthGate();
    });

    // Login Form Submit (Supabase Auth + Fallback)
    const loginForm = this.element.querySelector('#boLoginForm') as HTMLFormElement;
    loginForm?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = (this.element.querySelector('#boAuthEmail') as HTMLInputElement)?.value.trim();
      const password = (this.element.querySelector('#boAuthPassword') as HTMLInputElement)?.value;
      const remember = (this.element.querySelector('#boRememberMe') as HTMLInputElement)?.checked ?? true;
      const submitBtn = this.element.querySelector('#boLoginSubmitBtn') as HTMLButtonElement;
      const feedback = this.element.querySelector('#boAuthFeedback') as HTMLElement;

      submitBtn.disabled = true;
      submitBtn.innerHTML = `${BO_ICONS.loader} <span>Connexion en cours...</span>`;
      if (feedback) feedback.innerHTML = '';

      const res = await supabaseService.signInAdmin(email, password);
      submitBtn.disabled = false;
      submitBtn.innerHTML = `${BO_ICONS.lock} <span>Se Connecter au Backoffice</span>`;

      if (res.success && res.user) {
        cmsService.setCurrentAdmin(res.user, remember);
        this.render();
        this.showToast(`Bienvenue ${res.user.fullName} (${res.user.role}) !`, 'success');
      } else {
        if (feedback) {
          feedback.innerHTML = `
            <div style="background: rgba(220, 38, 38, 0.1); border: 1px solid rgba(220, 38, 38, 0.3); color: #DC2626; padding: 9px 12px; border-radius: var(--bo-radius-sm); font-size: 12px; font-weight: 600; text-align: left;">
              ❌ ${res.message}
            </div>
          `;
        }
        this.showToast('Identifiants incorrects', 'error');
      }
    });

    // Registration Form Submit (Supabase Auth Sign Up)
    const regForm = this.element.querySelector('#boRegisterForm') as HTMLFormElement;
    regForm?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = (this.element.querySelector('#boRegName') as HTMLInputElement)?.value.trim();
      const email = (this.element.querySelector('#boRegEmail') as HTMLInputElement)?.value.trim();
      const role = (this.element.querySelector('#boRegRole') as HTMLSelectElement)?.value;
      const password = (this.element.querySelector('#boRegPassword') as HTMLInputElement)?.value;
      const submitBtn = this.element.querySelector('#boRegisterSubmitBtn') as HTMLButtonElement;
      const feedback = this.element.querySelector('#boAuthFeedback') as HTMLElement;

      if (!name || !email || !password) {
        this.showToast('Veuillez renseigner tous les champs.', 'error');
        return;
      }

      submitBtn.disabled = true;
      submitBtn.innerHTML = `${BO_ICONS.loader} <span>Création sur Supabase...</span>`;
      if (feedback) feedback.innerHTML = '';

      const res = await supabaseService.signUpAdmin(email, password, name, role);
      submitBtn.disabled = false;
      submitBtn.innerHTML = `${BO_ICONS.plus} <span>Créer l'Administrateur sur Supabase</span>`;

      if (res.success && res.user) {
        cmsService.setCurrentAdmin(res.user, true);
        this.render();
        this.showToast('Compte administrateur créé et enregistré avec succès dans Supabase !', 'success');
      } else {
        if (feedback) {
          feedback.innerHTML = `
            <div style="background: rgba(220, 38, 38, 0.1); border: 1px solid rgba(220, 38, 38, 0.3); color: #DC2626; padding: 9px 12px; border-radius: var(--bo-radius-sm); font-size: 12px; font-weight: 600; text-align: left;">
              ❌ ${res.message}
            </div>
          `;
        }
        this.showToast('Erreur création administrateur', 'error');
      }
    });

    // 1-Click demo unlock
    const quickBtn = this.element.querySelector('#boQuickUnlockBtn');
    quickBtn?.addEventListener('click', () => {
      const demoUser: AdminUser = {
        email: 'direction@nidj-juice.cm',
        fullName: 'Direction Société Nidjeu',
        role: 'Direction Générale',
        lastLogin: new Date().toISOString()
      };
      cmsService.setCurrentAdmin(demoUser, true);
      this.render();
      this.showToast('Accès Administrateur Déverrouillé avec succès', 'success');
    });
  }

  // =========================================================================
  // 2. MAIN DASHBOARD RENDERER (STUDIO TOPBAR + SIDEBAR)
  // =========================================================================
  private renderDashboard(): void {
    const settings = cmsService.getSettings();
    const currentAdmin = cmsService.getCurrentAdmin();
    const adminInitials = currentAdmin.fullName
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0].toUpperCase())
      .join('') || 'SN';

    const products = cmsService.getProducts();
    const collections = cmsService.getCollections();
    const customPages = cmsService.getCustomPages();
    const stores = cmsService.getStores();
    const gallery = cmsService.getGalleryItems();
    const reels = cmsService.getVideoReels();

    this.element.innerHTML = `
      <!-- Top Corporate App Bar -->
      <header class="bo-header">
        <div class="bo-header-left">
          <button type="button" class="bo-menu-toggle-btn" id="boMenuToggleBtn" aria-label="Menu de navigation" title="Menu de navigation">
            ${BO_ICONS.menu}
          </button>
          <a href="/" class="bo-logo-wrap" title="Aller à l'accueil du site">
            <img src="${settings.brandLogoUrl || '/assets/images/logo-nidj.png'}" alt="Nidj Juice" class="bo-logo" />
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
          <!-- Desktop Action Buttons -->
          <div class="bo-desktop-actions">
            <a href="/" class="bo-btn-public-site" target="_blank" title="Ouvrir le site public dans un nouvel onglet">
              <span>Voir le site</span>
              ${BO_ICONS.external}
            </a>

            <button type="button" class="bo-action-pill" id="boTopSyncSupabaseBtn" title="Sauvegarder immédiatement toutes les données vers Supabase (Push Cloud)">
              ${BO_ICONS.database}
              <span>Sync Cloud</span>
            </button>

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
          </div>

          <!-- User Chip with Supabase Admin Identity -->
          <div class="bo-user-chip" title="Connecté : ${currentAdmin.email}">
            <div class="bo-user-avatar">${adminInitials}</div>
            <div class="bo-user-meta">
              <span class="bo-user-name">${currentAdmin.fullName}</span>
              <span class="bo-user-role">${currentAdmin.role}</span>
            </div>
            <button type="button" class="bo-logout-btn" id="boLogoutBtn" title="Fermer la session administrateur">
              ${BO_ICONS.logout}
            </button>
          </div>
        </div>
      </header>

      <!-- Layout Body: Sidebar Drawer + Workspace -->
      <div class="bo-body-layout">
        
        <!-- Mobile Drawer Backdrop Overlay -->
        <div class="bo-sidebar-backdrop" id="boSidebarBackdrop"></div>

        <!-- Sidebar Navigation (Desktop Anchor / Mobile Off-Canvas Drawer) -->
        <aside class="bo-sidebar" id="boSidebar">
          
          <!-- Mobile Drawer Top Bar -->
          <div class="bo-sidebar-mobile-header">
            <div class="bo-sidebar-mobile-title">
              <img src="${settings.brandLogoUrl || '/assets/images/logo-nidj.png'}" alt="Nidj Juice" style="height: 26px; width: auto;" />
              <span>Panneau de Gestion</span>
            </div>
            <button type="button" class="bo-sidebar-close-btn" id="boSidebarCloseBtn" aria-label="Fermer le menu" title="Fermer">
              ${BO_ICONS.close}
            </button>
          </div>

          <!-- Mobile Drawer User Summary -->
          <div class="bo-sidebar-mobile-user">
            <div class="bo-user-avatar">${adminInitials}</div>
            <div class="bo-sidebar-user-details">
              <div class="bo-sidebar-user-name">${currentAdmin.fullName}</div>
              <div class="bo-sidebar-user-role">${currentAdmin.role}</div>
            </div>
            <button type="button" class="bo-logout-btn" id="boMobileLogoutBtn" title="Déconnexion" style="background: var(--bo-surface); border: 1px solid var(--bo-border);">
              ${BO_ICONS.logout}
            </button>
          </div>
          
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

            <button type="button" class="bo-nav-item ${this.currentTab === 'collections' ? 'is-active' : ''}" data-tab="collections">
              <div class="bo-nav-item-inner">
                <span class="bo-nav-icon">${BO_ICONS.layers}</span>
                <span>Collections de Jus</span>
              </div>
              <span class="bo-nav-badge">${collections.length}</span>
            </button>

            <button type="button" class="bo-nav-item ${this.currentTab === 'pages' ? 'is-active' : ''}" data-tab="pages">
              <div class="bo-nav-item-inner">
                <span class="bo-nav-icon">${BO_ICONS.fileText}</span>
                <span>Pages & Textes</span>
              </div>
              <span class="bo-nav-badge">${customPages.length}</span>
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

          <!-- Mobile Actions in Drawer (Backups, Reset) -->
          <div class="bo-sidebar-mobile-actions">
            <div class="bo-nav-heading">Outils & Sauvegardes</div>
            <a href="/" target="_blank" class="bo-mobile-action-link">
              ${BO_ICONS.external}
              <span>Ouvrir le Site Public</span>
            </a>
            <button type="button" class="bo-mobile-action-link" id="boMobileSyncSupabaseBtn">
              ${BO_ICONS.database}
              <span>Sauvegarder sur Supabase</span>
            </button>
            <button type="button" class="bo-mobile-action-link" id="boMobileExportBtn">
              ${BO_ICONS.download}
              <span>Exporter Backup JSON</span>
            </button>
            <label class="bo-mobile-action-link" style="margin: 0; cursor: pointer;">
              ${BO_ICONS.upload}
              <span>Importer Backup JSON</span>
              <input type="file" id="boMobileImportFileInput" accept=".json" style="display: none;" />
            </label>
            <button type="button" class="bo-mobile-action-link danger" id="boMobileResetBtn">
              ${BO_ICONS.refresh}
              <span>Rétablir Valeurs Usine</span>
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
          <!-- Mobile Horizontal Quick Tab Bar -->
          <nav class="bo-mobile-tab-strip" role="tablist" aria-label="Navigation rapide">
            <button type="button" class="bo-mobile-tab-btn ${this.currentTab === 'overview' ? 'is-active' : ''}" data-tab="overview">
              ${BO_ICONS.grid}
              <span>Aperçu</span>
            </button>
            <button type="button" class="bo-mobile-tab-btn ${this.currentTab === 'products' ? 'is-active' : ''}" data-tab="products">
              ${BO_ICONS.bottle}
              <span>Saveurs</span>
              <span class="bo-mobile-tab-badge">${products.length}</span>
            </button>
            <button type="button" class="bo-mobile-tab-btn ${this.currentTab === 'collections' ? 'is-active' : ''}" data-tab="collections">
              ${BO_ICONS.layers}
              <span>Collections</span>
              <span class="bo-mobile-tab-badge">${collections.length}</span>
            </button>
            <button type="button" class="bo-mobile-tab-btn ${this.currentTab === 'pages' ? 'is-active' : ''}" data-tab="pages">
              ${BO_ICONS.fileText}
              <span>Pages</span>
              <span class="bo-mobile-tab-badge">${customPages.length}</span>
            </button>
            <button type="button" class="bo-mobile-tab-btn ${this.currentTab === 'gallery' ? 'is-active' : ''}" data-tab="gallery">
              ${BO_ICONS.image}
              <span>Galerie</span>
              <span class="bo-mobile-tab-badge">${gallery.length}</span>
            </button>
            <button type="button" class="bo-mobile-tab-btn ${this.currentTab === 'reels' ? 'is-active' : ''}" data-tab="reels">
              ${BO_ICONS.film}
              <span>Reels</span>
              <span class="bo-mobile-tab-badge">${reels.length}</span>
            </button>
            <button type="button" class="bo-mobile-tab-btn ${this.currentTab === 'stores' ? 'is-active' : ''}" data-tab="stores">
              ${BO_ICONS.mapPin}
              <span>Stores</span>
              <span class="bo-mobile-tab-badge">${stores.length}</span>
            </button>
            <button type="button" class="bo-mobile-tab-btn ${this.currentTab === 'settings' ? 'is-active' : ''}" data-tab="settings">
              ${BO_ICONS.settings}
              <span>Paramètres</span>
            </button>
          </nav>

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
      case 'collections':
        return this.renderCollectionsTab();
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
  // TAB: COLLECTIONS DE JUS
  // -------------------------------------------------------------------------
  private renderCollectionsTab(): string {
    const collections = cmsService.getCollections();
    const products = cmsService.getProducts();

    return `
      <div class="bo-page-header">
        <div class="bo-page-title-group">
          <h1>Gestion des Gammes & Collections de Jus</h1>
          <p class="bo-page-subtitle">Organisez l'univers de vos nectars en collections prestigieuses (Royale, Énergie, Pureté, Fraîcheur...)</p>
        </div>
        <button type="button" class="bo-btn-primary" id="boAddNewCollectionBtn">
          ${BO_ICONS.plus}
          <span>Nouvelle Collection</span>
        </button>
      </div>

      ${
        collections.length === 0
          ? `
        <div class="bo-empty-state">
          <div class="bo-empty-icon">${BO_ICONS.layers}</div>
          <h3>Aucune collection créée</h3>
          <p>Commencez par créer votre première gamme pour y regrouper vos saveurs.</p>
        </div>
      `
          : `
        <div class="bo-collections-grid">
          ${collections
            .map((c) => {
              const assignedCount = products.filter(
                (p) => p.category?.trim().toLowerCase() === c.name.trim().toLowerCase()
              ).length;

              return `
              <div class="bo-collection-card">
                <div class="bo-collection-banner" style="border-top: 4px solid ${c.accentColor};">
                  <img src="${c.bannerImage || '/assets/images/gallery-1.webp'}" alt="${c.name}" />
                  <div class="bo-collection-banner-overlay"></div>
                  <div class="bo-collection-banner-content">
                    <span class="bo-collection-badge" style="color: ${c.accentColor};">
                      ${c.badge || 'Gamme Exclusive'}
                    </span>
                    ${c.featured ? `<span class="bo-badge-pill success">${BO_ICONS.sparkles} Vedette</span>` : ''}
                  </div>
                </div>

                <div class="bo-collection-body">
                  <div class="bo-collection-header">
                    <div>
                      <h3 class="bo-collection-title">${c.name}</h3>
                      <div class="bo-collection-tagline">${c.tagline || ''}</div>
                    </div>
                  </div>

                  <p class="bo-collection-desc">${c.description || 'Collection de nectars artisanaux pressés avec amour.'}</p>

                  <div class="bo-collection-meta-bar">
                    <div class="bo-collection-flavors-count">
                      ${BO_ICONS.bottle}
                      <span><strong>${assignedCount}</strong> saveur(s) associée(s)</span>
                    </div>

                    <div class="bo-collection-actions">
                      <button type="button" class="bo-btn-edit" data-edit-collection="${c.id}" title="Modifier cette collection">
                        ${BO_ICONS.edit}
                        <span>Modifier</span>
                      </button>
                      <button type="button" class="bo-btn-icon" data-delete-collection="${c.id}" title="Supprimer la collection" style="color: var(--bo-red);">
                        ${BO_ICONS.trash}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            `;
            })
            .join('')}
        </div>
      `
      }
    `;
  }

  // -------------------------------------------------------------------------
  // TAB: PAGES & TEXTS
  // -------------------------------------------------------------------------
  private renderPagesTab(): string {
    const customPages = cmsService.getCustomPages();
    const hero = cmsService.getHeroContent();
    const company = cmsService.getCompanyContent();
    const engagements = cmsService.getEngagementsContent();
    const faqs = cmsService.getFaqs();

    return `
      <div class="bo-page-header">
        <div class="bo-page-title-group">
          <h1>Édition des Pages & Textes Éditoriaux</h1>
          <p class="bo-page-subtitle">Créez de nouvelles pages sur-mesure ou personnalisez les messages d'accueil et institutionnels</p>
        </div>
      </div>

      <!-- Card 0: Pages Sur-Mesure & Marketing (Nouvelles Pages) -->
      <div class="bo-card" style="margin-bottom: 28px; border: 1.5px solid var(--bo-border);">
        <div class="bo-card-header" style="background: linear-gradient(135deg, var(--bo-surface) 0%, var(--bo-surface-subtle) 100%);">
          <div class="bo-card-title-group">
            <div class="bo-card-icon" style="background: var(--bo-brand-green-tint); color: var(--bo-forest);">${BO_ICONS.folder}</div>
            <div>
              <h2 class="bo-card-title">Pages Sur-Mesure & Nouvelles Pages CMS</h2>
              <p class="bo-card-subtitle">Créez et publiez de nouvelles pages complètes avec leur propre URL (ex: /page/recettes-cocktails, partenariats, etc.)</p>
            </div>
          </div>
          <button type="button" class="bo-btn-primary" id="boAddNewCustomPageBtn">
            ${BO_ICONS.plus}
            <span>Créer une Nouvelle Page</span>
          </button>
        </div>
        <div class="bo-card-body" style="padding: 0;">
          ${
            customPages.length === 0
              ? `
            <div class="bo-empty-state" style="padding: 30px;">
              <div class="bo-empty-icon">${BO_ICONS.fileText}</div>
              <h3>Aucune page sur-mesure</h3>
              <p>Cliquez sur « Créer une Nouvelle Page » pour publier votre premier contenu sur-mesure.</p>
            </div>
          `
              : `
            <div class="bo-table-container" style="border: none; border-radius: 0;">
              <table class="bo-custom-pages-table">
                <thead>
                  <tr>
                    <th>Page & URL</th>
                    <th>Titre & Slogan</th>
                    <th>Statut</th>
                    <th>Emplacements</th>
                    <th>Dernière Révision</th>
                    <th style="text-align: right;">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  ${customPages
                    .map(
                      (page) => `
                    <tr>
                      <td>
                        <div style="font-weight: 700; color: var(--bo-forest); font-family: var(--font-display);">${page.title}</div>
                        <div style="font-size: 11px; color: var(--bo-brand-green); font-family: monospace;">/page/${page.id}</div>
                      </td>
                      <td>
                        <div style="font-weight: 600; color: var(--bo-text-primary); font-size: 12.5px;">${page.subtitle || '—'}</div>
                        <div style="font-size: 11.5px; color: var(--bo-text-muted); max-width: 280px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                          ${page.metaDescription || page.content.slice(0, 60)}...
                        </div>
                      </td>
                      <td>
                        ${
                          page.isPublished
                            ? `<span class="bo-badge-pill success">${BO_ICONS.check} En ligne</span>`
                            : `<span class="bo-badge-pill draft">Brouillon</span>`
                        }
                      </td>
                      <td>
                        <div style="display: flex; gap: 5px; flex-wrap: wrap;">
                          ${page.showInNav ? `<span class="bo-badge-pill tag">Menu Nav</span>` : ''}
                          ${page.showInFooter ? `<span class="bo-badge-pill tag">Pied de Page</span>` : ''}
                          ${!page.showInNav && !page.showInFooter ? `<span style="font-size: 11px; color: var(--bo-text-light);">Lien direct seul</span>` : ''}
                        </div>
                      </td>
                      <td>
                        <span style="font-size: 12px; color: var(--bo-text-secondary);">
                          ${new Date(page.lastModified).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </span>
                      </td>
                      <td>
                        <div style="display: flex; gap: 8px; justify-content: flex-end; align-items: center;">
                          <a href="/page/${page.id}" class="bo-btn-icon" target="_blank" title="Aperçu public de la page">
                            ${BO_ICONS.eye}
                          </a>
                          <button type="button" class="bo-btn-edit" data-edit-custom-page="${page.id}" title="Éditer la page">
                            ${BO_ICONS.edit}
                            <span>Éditer</span>
                          </button>
                          <button type="button" class="bo-btn-icon" data-delete-custom-page="${page.id}" title="Supprimer la page" style="color: var(--bo-red);">
                            ${BO_ICONS.trash}
                          </button>
                        </div>
                      </td>
                    </tr>
                  `
                    )
                    .join('')}
                </tbody>
              </table>
            </div>
          `
          }
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

            <!-- Hero Background Banner Image -->
            <div class="bo-form-group" style="margin-top: 14px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <label class="bo-label" style="margin: 0;">Image d'Arrière-Plan / Bannière Décorative Héro</label>
                <span style="font-size: 11px; color: var(--bo-brand-green); font-weight: 700; display: inline-flex; align-items: center; gap: 4px;">
                  ${BO_ICONS.cloud}
                  <span>CDN Cloudinary</span>
                </span>
              </div>
              <div class="bo-modal-image-row" style="display: flex; gap: 14px; align-items: center; background: var(--bo-surface-subtle); padding: 12px; border-radius: var(--bo-radius-md); border: 1px solid var(--bo-border);">
                <div style="width: 100px; height: 60px; background: #FFFFFF; border-radius: var(--bo-radius-sm); border: 1px solid var(--bo-border); display: flex; align-items: center; justify-content: center; padding: 2px; flex-shrink: 0; overflow: hidden;">
                  <img id="heroBgBannerPreview" src="${hero.bgBannerImage || '/assets/images/gallery-1.webp'}" alt="Bannière Héro" style="max-height: 100%; max-width: 100%; object-fit: cover;" />
                </div>
                <div style="flex: 1; min-width: 0;">
                  <input type="text" id="heroBgBannerUrl" class="bo-input" value="${hero.bgBannerImage || ''}" placeholder="URL image Cloudinary ou chemin local (/assets/images/...)" style="margin-bottom: 8px;" />
                  <label class="bo-upload-action-btn" style="cursor: pointer;">
                    ${BO_ICONS.camera}
                    <span>Téléverser vers Cloudinary</span>
                    <input type="file" id="heroBgBannerFile" accept="image/*" style="display: none;" />
                  </label>
                  <div id="heroBgBannerProgress" style="display: none;"></div>
                </div>
              </div>
            </div>

            <div style="display: flex; justify-content: flex-end; margin-top: 16px;">
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

            <!-- Editorial Photos Company -->
            <div style="margin: 24px 0 16px 0; border-top: 1px solid var(--bo-border); padding-top: 20px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <h3 style="font-family: var(--font-display); font-size: 15px; font-weight: 800; color: var(--bo-forest); margin: 0;">
                  Photos Éditoriales Page Entreprise
                </h3>
                <span style="font-size: 11px; color: var(--bo-brand-green); font-weight: 700; display: inline-flex; align-items: center; gap: 4px;">
                  ${BO_ICONS.cloud}
                  <span>CDN Cloudinary</span>
                </span>
              </div>
              <p style="font-size: 12px; color: var(--bo-text-muted); margin: 0 0 14px 0;">
                Images officielles du laboratoire, de la cueillette des fruits, de l'équipe et des normes
              </p>
            </div>

            <div class="bo-form-grid-2">
              <!-- Production Photo -->
              <div class="bo-form-group">
                <label class="bo-label">Photo 1 : Laboratoire & Embouteillage</label>
                <div class="bo-modal-image-row" style="display: flex; gap: 12px; align-items: center; background: var(--bo-surface-subtle); padding: 12px; border-radius: var(--bo-radius-md); border: 1px solid var(--bo-border);">
                  <div style="width: 75px; height: 55px; background: #fff; border-radius: 4px; overflow: hidden; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                    <img id="compProdImgPreview" src="${company.productionImage || '/assets/images/gallery-1.webp'}" alt="Laboratoire" style="max-height: 100%; max-width: 100%; object-fit: cover;" />
                  </div>
                  <div style="flex: 1; min-width: 0;">
                    <input type="text" id="compProdImgUrl" class="bo-input" value="${company.productionImage || '/assets/images/gallery-1.webp'}" style="margin-bottom: 6px; font-size: 12px;" />
                    <label class="bo-upload-action-btn" style="cursor: pointer;">
                      ${BO_ICONS.camera} <span>Téléverser vers Cloudinary</span>
                      <input type="file" id="compProdImgFile" accept="image/*" style="display: none;" />
                    </label>
                    <div id="compProdImgProgress" style="display: none;"></div>
                  </div>
                </div>
              </div>

              <!-- Savoir-Faire Photo -->
              <div class="bo-form-group">
                <label class="bo-label">Photo 2 : Cueillette & Savoir-Faire</label>
                <div class="bo-modal-image-row" style="display: flex; gap: 12px; align-items: center; background: var(--bo-surface-subtle); padding: 12px; border-radius: var(--bo-radius-md); border: 1px solid var(--bo-border);">
                  <div style="width: 75px; height: 55px; background: #fff; border-radius: 4px; overflow: hidden; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                    <img id="compSavoirImgPreview" src="${company.savoirFaireImage || '/assets/images/gallery-2.webp'}" alt="Savoir-Faire" style="max-height: 100%; max-width: 100%; object-fit: cover;" />
                  </div>
                  <div style="flex: 1; min-width: 0;">
                    <input type="text" id="compSavoirImgUrl" class="bo-input" value="${company.savoirFaireImage || '/assets/images/gallery-2.webp'}" style="margin-bottom: 6px; font-size: 12px;" />
                    <label class="bo-upload-action-btn" style="cursor: pointer;">
                      ${BO_ICONS.camera} <span>Téléverser vers Cloudinary</span>
                      <input type="file" id="compSavoirImgFile" accept="image/*" style="display: none;" />
                    </label>
                    <div id="compSavoirImgProgress" style="display: none;"></div>
                  </div>
                </div>
              </div>

              <!-- Governance Photo -->
              <div class="bo-form-group">
                <label class="bo-label">Photo 3 : Équipe & Gouvernance</label>
                <div class="bo-modal-image-row" style="display: flex; gap: 12px; align-items: center; background: var(--bo-surface-subtle); padding: 12px; border-radius: var(--bo-radius-md); border: 1px solid var(--bo-border);">
                  <div style="width: 75px; height: 55px; background: #fff; border-radius: 4px; overflow: hidden; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                    <img id="compGovImgPreview" src="${company.governanceImage || '/assets/images/gallery-3.webp'}" alt="Équipe" style="max-height: 100%; max-width: 100%; object-fit: cover;" />
                  </div>
                  <div style="flex: 1; min-width: 0;">
                    <input type="text" id="compGovImgUrl" class="bo-input" value="${company.governanceImage || '/assets/images/gallery-3.webp'}" style="margin-bottom: 6px; font-size: 12px;" />
                    <label class="bo-upload-action-btn" style="cursor: pointer;">
                      ${BO_ICONS.camera} <span>Téléverser vers Cloudinary</span>
                      <input type="file" id="compGovImgFile" accept="image/*" style="display: none;" />
                    </label>
                    <div id="compGovImgProgress" style="display: none;"></div>
                  </div>
                </div>
              </div>

              <!-- Quality Photo -->
              <div class="bo-form-group">
                <label class="bo-label">Photo 4 : Normes & Traçabilité</label>
                <div class="bo-modal-image-row" style="display: flex; gap: 12px; align-items: center; background: var(--bo-surface-subtle); padding: 12px; border-radius: var(--bo-radius-md); border: 1px solid var(--bo-border);">
                  <div style="width: 75px; height: 55px; background: #fff; border-radius: 4px; overflow: hidden; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                    <img id="compQualityImgPreview" src="${company.qualityImage || '/assets/images/gallery-4.webp'}" alt="Qualité" style="max-height: 100%; max-width: 100%; object-fit: cover;" />
                  </div>
                  <div style="flex: 1; min-width: 0;">
                    <input type="text" id="compQualityImgUrl" class="bo-input" value="${company.qualityImage || '/assets/images/gallery-4.webp'}" style="margin-bottom: 6px; font-size: 12px;" />
                    <label class="bo-upload-action-btn" style="cursor: pointer;">
                      ${BO_ICONS.camera} <span>Téléverser vers Cloudinary</span>
                      <input type="file" id="compQualityImgFile" accept="image/*" style="display: none;" />
                    </label>
                    <div id="compQualityImgProgress" style="display: none;"></div>
                  </div>
                </div>
              </div>
            </div>

            <div style="display: flex; justify-content: flex-end; margin-top: 16px;">
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

            <!-- Editorial Photos Engagements -->
            <div style="margin: 24px 0 16px 0; border-top: 1px solid var(--bo-border); padding-top: 20px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <h3 style="font-family: var(--font-display); font-size: 15px; font-weight: 800; color: var(--bo-forest); margin: 0;">
                  Photos Éditoriales Engagements RSE
                </h3>
                <span style="font-size: 11px; color: var(--bo-brand-green); font-weight: 700; display: inline-flex; align-items: center; gap: 4px;">
                  ${BO_ICONS.cloud}
                  <span>CDN Cloudinary</span>
                </span>
              </div>
              <p style="font-size: 12px; color: var(--bo-text-muted); margin: 0 0 14px 0;">
                Images officielles des coopératives agricoles, de la traçabilité et du recyclage
              </p>
            </div>

            <div class="bo-form-grid-3">
              <!-- Filieres Photo -->
              <div class="bo-form-group">
                <label class="bo-label">Photo 1 : Planteurs & Filières</label>
                <div class="bo-modal-image-row" style="display: flex; gap: 10px; align-items: center; background: var(--bo-surface-subtle); padding: 10px; border-radius: var(--bo-radius-md); border: 1px solid var(--bo-border);">
                  <div style="width: 60px; height: 50px; background: #fff; border-radius: 4px; overflow: hidden; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                    <img id="rseFilieresImgPreview" src="${engagements.filieresImage || '/assets/images/gallery-3.webp'}" alt="Filières" style="max-height: 100%; max-width: 100%; object-fit: cover;" />
                  </div>
                  <div style="flex: 1; min-width: 0;">
                    <input type="text" id="rseFilieresImgUrl" class="bo-input" value="${engagements.filieresImage || '/assets/images/gallery-3.webp'}" style="margin-bottom: 6px; font-size: 11.5px;" />
                    <label class="bo-upload-action-btn" style="cursor: pointer;">
                      ${BO_ICONS.camera} <span>Cloudinary</span>
                      <input type="file" id="rseFilieresImgFile" accept="image/*" style="display: none;" />
                    </label>
                    <div id="rseFilieresImgProgress" style="display: none;"></div>
                  </div>
                </div>
              </div>

              <!-- Quality Photo -->
              <div class="bo-form-group">
                <label class="bo-label">Photo 2 : Contrôle Qualité</label>
                <div class="bo-modal-image-row" style="display: flex; gap: 10px; align-items: center; background: var(--bo-surface-subtle); padding: 10px; border-radius: var(--bo-radius-md); border: 1px solid var(--bo-border);">
                  <div style="width: 60px; height: 50px; background: #fff; border-radius: 4px; overflow: hidden; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                    <img id="rseQualityImgPreview" src="${engagements.qualityImage || '/assets/images/gallery-1.webp'}" alt="Qualité" style="max-height: 100%; max-width: 100%; object-fit: cover;" />
                  </div>
                  <div style="flex: 1; min-width: 0;">
                    <input type="text" id="rseQualityImgUrl" class="bo-input" value="${engagements.qualityImage || '/assets/images/gallery-1.webp'}" style="margin-bottom: 6px; font-size: 11.5px;" />
                    <label class="bo-upload-action-btn" style="cursor: pointer;">
                      ${BO_ICONS.camera} <span>Cloudinary</span>
                      <input type="file" id="rseQualityImgFile" accept="image/*" style="display: none;" />
                    </label>
                    <div id="rseQualityImgProgress" style="display: none;"></div>
                  </div>
                </div>
              </div>

              <!-- Recycling Photo -->
              <div class="bo-form-group">
                <label class="bo-label">Photo 3 : Éco-Recyclage</label>
                <div class="bo-modal-image-row" style="display: flex; gap: 10px; align-items: center; background: var(--bo-surface-subtle); padding: 10px; border-radius: var(--bo-radius-md); border: 1px solid var(--bo-border);">
                  <div style="width: 60px; height: 50px; background: #fff; border-radius: 4px; overflow: hidden; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                    <img id="rseRecyclingImgPreview" src="${engagements.recyclingImage || '/assets/images/gallery-4.webp'}" alt="Recyclage" style="max-height: 100%; max-width: 100%; object-fit: cover;" />
                  </div>
                  <div style="flex: 1; min-width: 0;">
                    <input type="text" id="rseRecyclingImgUrl" class="bo-input" value="${engagements.recyclingImage || '/assets/images/gallery-4.webp'}" style="margin-bottom: 6px; font-size: 11.5px;" />
                    <label class="bo-upload-action-btn" style="cursor: pointer;">
                      ${BO_ICONS.camera} <span>Cloudinary</span>
                      <input type="file" id="rseRecyclingImgFile" accept="image/*" style="display: none;" />
                    </label>
                    <div id="rseRecyclingImgProgress" style="display: none;"></div>
                  </div>
                </div>
              </div>
            </div>

            <div style="display: flex; justify-content: flex-end; margin-top: 16px;">
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
        <div class="bo-table-scroll-hint">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8L22 12L18 16"/><path d="M6 8L2 12L6 16"/><path d="M2 12H22"/></svg>
          <span>Faites défiler le tableau horizontalement</span>
        </div>
        <div class="bo-table-responsive">
          <table class="bo-table">
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
                  <td style="padding: 14px 20px; text-align: right; white-space: nowrap;">
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
    const supabaseConfig = supabaseService.getConfig();
    const sqlScript = supabaseService.getSqlSetupScript();

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

            <!-- Visual Brand Identity & Logo -->
            <div style="margin: 28px 0 16px 0; border-top: 1px solid var(--bo-border); padding-top: 24px;">
              <h3 style="font-family: var(--font-display); font-size: 16px; font-weight: 800; color: var(--bo-forest); margin: 0 0 4px 0;">
                Identité Visuelle & Logos Officiels
              </h3>
              <p style="font-size: 12.5px; color: var(--bo-text-muted); margin: 0 0 16px 0;">
                Logo de marque et favicon affichés dans l'en-tête, le pied de page et l'onglet navigateur
              </p>
            </div>

            <div class="bo-form-grid-2">
              <!-- Brand Logo -->
              <div class="bo-form-group">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                  <label class="bo-label" style="margin: 0;">Logo Officiel Nidj Juice (PNG, SVG, WEBP)</label>
                  <span style="font-size: 11px; color: var(--bo-brand-green); font-weight: 700; display: inline-flex; align-items: center; gap: 4px;">
                    ${BO_ICONS.cloud}
                    <span>CDN Cloudinary</span>
                  </span>
                </div>
                <div class="bo-modal-image-row" style="display: flex; gap: 14px; align-items: center; background: var(--bo-surface-subtle); padding: 12px; border-radius: var(--bo-radius-md); border: 1px solid var(--bo-border);">
                  <div style="width: 75px; height: 60px; background: #FFFFFF; border-radius: var(--bo-radius-sm); border: 1px solid var(--bo-border); display: flex; align-items: center; justify-content: center; padding: 4px; flex-shrink: 0;">
                    <img id="cfgBrandLogoPreview" src="${settings.brandLogoUrl || '/assets/images/logo-nidj.png'}" alt="Logo Aperçu" style="max-height: 100%; max-width: 100%; object-fit: contain;" />
                  </div>
                  <div style="flex: 1; min-width: 0;">
                    <input type="text" id="cfgBrandLogoUrl" class="bo-input" value="${settings.brandLogoUrl || '/assets/images/logo-nidj.png'}" placeholder="URL CDN ou chemin local" style="margin-bottom: 8px;" />
                    <label class="bo-upload-action-btn" style="cursor: pointer;">
                      ${BO_ICONS.camera}
                      <span>Téléverser vers Cloudinary</span>
                      <input type="file" id="cfgBrandLogoFile" accept="image/*" style="display: none;" />
                    </label>
                    <div id="cfgBrandLogoProgress" style="display: none;"></div>
                  </div>
                </div>
              </div>

              <!-- Favicon -->
              <div class="bo-form-group">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                  <label class="bo-label" style="margin: 0;">Favicon du Site (Icône Navigateur)</label>
                  <span style="font-size: 11px; color: var(--bo-brand-green); font-weight: 700; display: inline-flex; align-items: center; gap: 4px;">
                    ${BO_ICONS.cloud}
                    <span>CDN Cloudinary</span>
                  </span>
                </div>
                <div class="bo-modal-image-row" style="display: flex; gap: 14px; align-items: center; background: var(--bo-surface-subtle); padding: 12px; border-radius: var(--bo-radius-md); border: 1px solid var(--bo-border);">
                  <div style="width: 60px; height: 60px; background: #FFFFFF; border-radius: var(--bo-radius-sm); border: 1px solid var(--bo-border); display: flex; align-items: center; justify-content: center; padding: 4px; flex-shrink: 0;">
                    <img id="cfgFaviconPreview" src="${settings.faviconUrl || '/favicon.svg'}" alt="Favicon Aperçu" style="max-height: 100%; max-width: 100%; object-fit: contain;" />
                  </div>
                  <div style="flex: 1; min-width: 0;">
                    <input type="text" id="cfgFaviconUrl" class="bo-input" value="${settings.faviconUrl || '/favicon.svg'}" placeholder="URL Favicon" style="margin-bottom: 8px;" />
                    <label class="bo-upload-action-btn" style="cursor: pointer;">
                      ${BO_ICONS.camera}
                      <span>Téléverser vers Cloudinary</span>
                      <input type="file" id="cfgFaviconFile" accept="image/*" style="display: none;" />
                    </label>
                    <div id="cfgFaviconProgress" style="display: none;"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Cloudinary Integration Section -->
            <div style="margin: 28px 0 16px 0; border-top: 1px solid var(--bo-border); padding-top: 24px;">
              <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-bottom: 8px;">
                <div style="display: flex; align-items: center; gap: 10px;">
                  <div class="bo-card-icon" style="width: 32px; height: 32px; font-size: 15px;">${BO_ICONS.cloud}</div>
                  <div>
                    <h3 style="font-family: var(--font-display); font-size: 16px; font-weight: 800; color: var(--bo-forest); margin: 0;">
                      Hébergement Médias Cloudinary (Images & Vidéos)
                    </h3>
                    <p style="font-size: 12px; color: var(--bo-text-muted); margin: 2px 0 0 0;">
                      Les images de bouteilles, photos de galerie et vidéos de reels sont automatiquement sauvegardées sur votre compte Cloudinary
                    </p>
                  </div>
                </div>
                <div>
                  ${cloudinaryService.isConfigured()
                    ? `<span class="bo-cloudinary-badge-pill is-active">${BO_ICONS.check} Cloudinary Connecté</span>`
                    : `<span class="bo-cloudinary-badge-pill is-inactive">Non configuré</span>`}
                </div>
              </div>

              <div class="bo-form-grid-3" style="margin-top: 16px;">
                <div class="bo-form-group">
                  <label class="bo-label">
                    <span>Cloud Name Cloudinary</span>
                    <span class="bo-label-hint">Identifiant de votre cloud</span>
                  </label>
                  <input type="text" id="cfgCloudinaryCloudName" class="bo-input" value="${settings.cloudinaryCloudName || ''}" placeholder="Ex: nidj-juice ou dxxxxxxx" />
                </div>
                <div class="bo-form-group">
                  <label class="bo-label">
                    <span>Upload Preset (Mode Unsigned)</span>
                    <span class="bo-label-hint">Preset non-signé</span>
                  </label>
                  <input type="text" id="cfgCloudinaryUploadPreset" class="bo-input" value="${settings.cloudinaryUploadPreset || ''}" placeholder="Ex: nidj_preset ou ml_default" />
                </div>
                <div class="bo-form-group">
                  <label class="bo-label">
                    <span>Dossier Racine (Optionnel)</span>
                    <span class="bo-label-hint">Organisation</span>
                  </label>
                  <input type="text" id="cfgCloudinaryFolder" class="bo-input" value="${settings.cloudinaryFolder || 'nidj_juice'}" placeholder="nidj_juice" />
                </div>
              </div>

              <div style="background: var(--bo-surface-subtle); border: 1px solid var(--bo-border); border-radius: var(--bo-radius-md); padding: 14px 16px; margin-top: 12px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;">
                <div style="font-size: 12px; color: var(--bo-text-secondary); line-height: 1.5; max-width: 680px;">
                  💡 <strong>Comment créer un Upload Preset en 1 minute ?</strong><br/>
                  1. Connectez-vous sur votre compte gratuit <a href="https://cloudinary.com" target="_blank" rel="noopener" style="color: var(--bo-brand-green); font-weight: 700; text-decoration: underline;">Cloudinary.com</a><br/>
                  2. Allez dans <strong>Settings (⚙️) &rarr; Upload &rarr; Upload presets</strong><br/>
                  3. Cliquez sur <strong>Add upload preset</strong>, réglez <strong>Signing Mode</strong> sur <strong>Unsigned</strong>, puis enregistrez et collez son nom ci-dessus.
                </div>
                <button type="button" class="bo-btn-secondary" id="boTestCloudinaryBtn" style="font-size: 12px; padding: 7px 14px; white-space: nowrap;">
                  ${BO_ICONS.refresh}
                  <span>Tester la connexion</span>
                </button>
              </div>
              <div id="boCloudinaryTestResult" style="margin-top: 8px;"></div>
            </div>

            <div style="display: flex; justify-content: flex-end; margin-top: 20px;">
              <button type="submit" class="bo-btn-primary">
                ${BO_ICONS.check}
                <span>Enregistrer les Paramètres</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Standalone Media Uploader Card -->
      <div class="bo-card" style="margin-top: 24px;">
        <div class="bo-card-header">
          <div class="bo-card-title-group">
            <div class="bo-card-icon">${BO_ICONS.upload}</div>
            <div>
              <h2 class="bo-card-title">Centre de Téléversement Direct Cloudinary</h2>
              <p class="bo-card-subtitle">Téléversez n'importe quelle image ou vidéo pour obtenir son URL CDN Cloudinary instantanément</p>
            </div>
          </div>
        </div>
        <div class="bo-card-body">
          <div style="border: 2px dashed var(--bo-border); border-radius: var(--bo-radius-md); padding: 24px 20px; text-align: center; background: var(--bo-surface-subtle);">
            <div style="margin-bottom: 10px; color: var(--bo-forest);">
              ${BO_ICONS.cloud}
            </div>
            <p style="font-weight: 700; color: var(--bo-forest); margin: 0 0 6px 0; font-size: 14px;">
              Sélectionnez une image ou une vidéo à sauvegarder sur Cloudinary
            </p>
            <p style="font-size: 12px; color: var(--bo-text-muted); margin: 0 0 16px 0;">
              Formats supportés : JPG, PNG, WEBP, SVG, MP4, MOV, WEBM. Téléversement haute vitesse vers votre CDN.
            </p>
            <label class="bo-btn-primary" style="display: inline-flex; cursor: pointer;">
              ${BO_ICONS.upload}
              <span>Sélectionner un fichier média</span>
              <input type="file" id="boDirectMediaUploadInput" accept="image/*,video/*" style="display: none;" />
            </label>
            <div id="boDirectUploadProgress" style="display: none; max-width: 480px; margin: 16px auto 0 auto;"></div>
            <div id="boDirectUploadResult" style="margin-top: 16px;"></div>
          </div>
        </div>
      </div>

      <!-- Supabase Cloud Database Persistence & Sync Card -->
      <div class="bo-card" style="margin-top: 24px;">
        <div class="bo-card-header">
          <div class="bo-card-title-group">
            <div class="bo-card-icon" style="background: rgba(46, 160, 105, 0.15); color: #2ea069;">
              ${BO_ICONS.database}
            </div>
            <div>
              <h2 class="bo-card-title">Base de Données Cloud Supabase (Sauvegarde Complète & Synchronisation)</h2>
              <p class="bo-card-subtitle">
                Stockage cloud persistant de toutes les données du site (Saveurs, Collections, Pages, Points de vente, Commandes & Paramètres)
              </p>
            </div>
          </div>
          <div>
            ${supabaseService.isConfigured()
              ? `<span class="bo-cloudinary-badge-pill is-active">${BO_ICONS.check} Supabase Connecté</span>`
              : `<span class="bo-cloudinary-badge-pill is-inactive">Non configuré</span>`}
          </div>
        </div>

        <div class="bo-card-body">
          <form id="boSupabaseConfigForm">
            <div class="bo-form-grid-2">
              <div class="bo-form-group">
                <label class="bo-label">
                  <span>URL du Projet Supabase</span>
                  <span class="bo-label-hint">https://xxxx.supabase.co</span>
                </label>
                <input 
                  type="url" 
                  id="cfgSupabaseUrl" 
                  class="bo-input" 
                  value="${supabaseConfig.url || ''}" 
                  placeholder="https://xyzabcdefg.supabase.co" 
                  required 
                />
                <span style="font-size: 11px; color: var(--bo-text-muted); margin-top: 4px; display: block;">
                  Trouvez-la dans Supabase : <strong>Project Settings &rarr; API &rarr; Project URL</strong>
                </span>
              </div>

              <div class="bo-form-group">
                <label class="bo-label">
                  <span>Clé API Publique Supabase (Anon Key)</span>
                  <span class="bo-label-hint">anon / public</span>
                </label>
                <input 
                  type="text" 
                  id="cfgSupabaseAnonKey" 
                  class="bo-input" 
                  value="${supabaseConfig.anonKey || ''}" 
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." 
                  required 
                />
                <span style="font-size: 11px; color: var(--bo-text-muted); margin-top: 4px; display: block;">
                  Trouvez-la dans Supabase : <strong>Project Settings &rarr; API &rarr; Project API keys &rarr; anon public</strong>
                </span>
              </div>
            </div>

            <div style="margin-top: 14px; background: var(--bo-surface-subtle); border: 1px solid var(--bo-border); border-radius: var(--bo-radius-md); padding: 14px 16px;">
              <label style="display: flex; align-items: center; gap: 10px; cursor: pointer; font-size: 13px; font-weight: 700; color: var(--bo-forest);">
                <input type="checkbox" id="cfgSupabaseAutoSync" ${supabaseConfig.autoSync !== false ? 'checked' : ''} style="width: 18px; height: 18px; accent-color: var(--bo-brand-green); cursor: pointer;" />
                <span>Synchronisation automatique en direct (Auto-Push à chaque sauvegarde de produit, collection ou page)</span>
              </label>
              <p style="font-size: 12px; color: var(--bo-text-muted); margin: 6px 0 0 28px;">
                Lorsque cette option est cochée, toute modification effectuée dans ce Backoffice est immédiatement répercutée dans votre base de données Supabase.
              </p>
            </div>

            <!-- Action Buttons Row -->
            <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-top: 20px;">
              <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
                <button type="submit" class="bo-btn-primary" id="boSaveSupabaseConfigBtn">
                  ${BO_ICONS.check}
                  <span>Enregistrer la Configuration</span>
                </button>

                <button type="button" class="bo-btn-secondary" id="boTestSupabaseBtn">
                  ${BO_ICONS.refresh}
                  <span>Tester la Connexion</span>
                </button>
              </div>

              <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
                <button type="button" class="bo-btn-primary" id="boPushSupabaseBtn" style="background: #2ea069; border-color: #2ea069;" title="Envoyer toutes les données locales vers Supabase">
                  ${BO_ICONS.upload}
                  <span>Sauvegarder tout sur Supabase (Push)</span>
                </button>

                <button type="button" class="bo-btn-secondary" id="boPullSupabaseBtn" title="Récupérer la version stockée sur Supabase">
                  ${BO_ICONS.download}
                  <span>Restaurer depuis Supabase (Pull)</span>
                </button>
              </div>
            </div>
            <div id="boSupabaseResultBox" style="margin-top: 14px;"></div>
          </form>

          <!-- Expandable SQL Schema Setup Box -->
          <details style="margin-top: 24px; border: 1px solid var(--bo-border); border-radius: var(--bo-radius-md); background: var(--bo-surface); overflow: hidden;">
            <summary style="padding: 14px 18px; font-weight: 700; color: var(--bo-forest); cursor: pointer; display: flex; align-items: center; justify-content: space-between; user-select: none; background: var(--bo-surface-subtle);">
              <span style="display: flex; align-items: center; gap: 8px;">
                ${BO_ICONS.database}
                <span>Script SQL d'initialisation Supabase (Cliquez pour afficher / copier)</span>
              </span>
              <span style="font-size: 12px; color: var(--bo-brand-green); font-weight: 700;">Afficher le script &darr;</span>
            </summary>
            <div style="padding: 16px 18px; border-top: 1px solid var(--bo-border);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; flex-wrap: wrap; gap: 10px;">
                <p style="font-size: 12.5px; color: var(--bo-text-muted); margin: 0;">
                  Exécutez ce script une seule fois dans votre espace <a href="https://supabase.com/dashboard" target="_blank" rel="noopener" style="color: var(--bo-brand-green); font-weight: 700;">Supabase &rarr; SQL Editor</a> pour créer automatiquement les tables et les permissions :
                </p>
                <button type="button" class="bo-btn-secondary" id="boCopySqlScriptBtn" style="font-size: 12px; padding: 6px 12px;">
                  ${BO_ICONS.sparkles}
                  <span id="boCopySqlLabel">Copier le Script SQL (1-Clic)</span>
                </button>
              </div>
              <pre style="background: #0f172a; color: #f8fafc; padding: 16px; border-radius: var(--bo-radius-sm); font-size: 12px; line-height: 1.5; overflow-x: auto; max-height: 320px; font-family: monospace; border: 1px solid #334155;"><code>${sqlScript}</code></pre>
            </div>
          </details>

        </div>
      </div>

      <!-- Administrator Management & Team Card -->
      <div class="bo-card" style="margin-top: 24px;">
        <div class="bo-card-header">
          <div class="bo-card-title-group">
            <div class="bo-card-icon" style="background: rgba(10, 61, 34, 0.12); color: var(--bo-forest);">
              ${BO_ICONS.lock}
            </div>
            <div>
              <h2 class="bo-card-title">Équipe Administrative & Comptes Autorisés (Supabase)</h2>
              <p class="bo-card-subtitle">
                Gérez les accès à ce Backoffice, les rôles de l'équipe et visualisez les dernières connexions
              </p>
            </div>
          </div>
          <button type="button" class="bo-btn-primary" id="boOpenAddAdminModalBtn">
            ${BO_ICONS.plus}
            <span>Ajouter un Administrateur</span>
          </button>
        </div>

        <div class="bo-card-body">
          <div id="boAdminUsersContainer">
            <div style="text-align: center; padding: 24px 16px; color: var(--bo-text-muted); font-size: 13px;">
              ${BO_ICONS.loader} <span>Chargement des administrateurs depuis Supabase...</span>
            </div>
          </div>
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
    // Mobile Drawer Hamburger Toggle & Close
    this.element.querySelector('#boMenuToggleBtn')?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleMobileSidebar();
    });

    this.element.querySelector('#boSidebarCloseBtn')?.addEventListener('click', () => {
      this.closeMobileSidebar();
    });

    this.element.querySelector('#boSidebarBackdrop')?.addEventListener('click', () => {
      this.closeMobileSidebar();
    });

    // Mobile Horizontal Quick Tab Bar Switching
    this.element.querySelectorAll('.bo-mobile-tab-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab') as BackofficeTab;
        if (tab && tab !== this.currentTab) {
          this.currentTab = tab;
          this.closeMobileSidebar();
          this.render();
        }
      });
    });

    // Desktop/Drawer Tab Switching
    this.element.querySelectorAll('.bo-nav-item').forEach((btn) => {
      btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab') as BackofficeTab;
        if (tab && tab !== this.currentTab) {
          this.currentTab = tab;
          this.closeMobileSidebar();
          this.render();
        } else {
          this.closeMobileSidebar();
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
    this.element.querySelector('#boAddNewCollectionBtn')?.addEventListener('click', () => {
      this.openCollectionModal(null);
    });
    this.element.querySelector('#boAddNewCustomPageBtn')?.addEventListener('click', () => {
      this.openCustomPageModal(null);
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

    // Edit Collection triggers
    this.element.querySelectorAll('[data-edit-collection]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-edit-collection');
        if (id) this.openCollectionModal(id);
      });
    });

    // Delete Collection triggers
    this.element.querySelectorAll('[data-delete-collection]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-delete-collection');
        if (id && confirm(`Êtes-vous sûr de vouloir supprimer cette collection ?`)) {
          const ok = cmsService.deleteCollection(id);
          if (ok) {
            this.showToast('Collection supprimée avec succès', 'success');
            this.render();
          } else {
            this.showToast('Impossible de supprimer la dernière collection', 'error');
          }
        }
      });
    });

    // Edit Custom Page triggers
    this.element.querySelectorAll('[data-edit-custom-page]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-edit-custom-page');
        if (id) this.openCustomPageModal(id);
      });
    });

    // Delete Custom Page triggers
    this.element.querySelectorAll('[data-delete-custom-page]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-delete-custom-page');
        if (id && confirm(`Êtes-vous sûr de vouloir supprimer cette page ?`)) {
          const ok = cmsService.deleteCustomPage(id);
          if (ok) {
            this.showToast('Page supprimée avec succès', 'success');
            this.render();
          }
        }
      });
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
      const current = cmsService.getHeroContent();
      cmsService.saveHeroContent({
        ...current,
        titleWord1: (this.element.querySelector('#heroWord1') as HTMLInputElement).value,
        titleWord2: (this.element.querySelector('#heroWord2') as HTMLInputElement).value,
        subtitle: (this.element.querySelector('#heroSubtitle') as HTMLInputElement).value,
        description: (this.element.querySelector('#heroDescription') as HTMLTextAreaElement).value,
        badge1: (this.element.querySelector('#heroBadge1') as HTMLInputElement).value,
        badge2: (this.element.querySelector('#heroBadge2') as HTMLInputElement).value,
        badge3: (this.element.querySelector('#heroBadge3') as HTMLInputElement).value,
        bgBannerImage: (this.element.querySelector('#heroBgBannerUrl') as HTMLInputElement)?.value.trim() || current.bgBannerImage || ''
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
        stat2Label: (this.element.querySelector('#stat2Label') as HTMLInputElement).value,
        productionImage: (this.element.querySelector('#compProdImgUrl') as HTMLInputElement)?.value.trim() || current.productionImage,
        savoirFaireImage: (this.element.querySelector('#compSavoirImgUrl') as HTMLInputElement)?.value.trim() || current.savoirFaireImage,
        governanceImage: (this.element.querySelector('#compGovImgUrl') as HTMLInputElement)?.value.trim() || current.governanceImage,
        qualityImage: (this.element.querySelector('#compQualityImgUrl') as HTMLInputElement)?.value.trim() || current.qualityImage
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
        ecoDesc: (this.element.querySelector('#rseEcoDesc') as HTMLTextAreaElement).value,
        filieresImage: (this.element.querySelector('#rseFilieresImgUrl') as HTMLInputElement)?.value.trim() || current.filieresImage,
        qualityImage: (this.element.querySelector('#rseQualityImgUrl') as HTMLInputElement)?.value.trim() || current.qualityImage,
        recyclingImage: (this.element.querySelector('#rseRecyclingImgUrl') as HTMLInputElement)?.value.trim() || current.recyclingImage
      });
      this.showToast('Engagements RSE enregistrés', 'success');
    });

    // Wire up Pages Tab Cloudinary Image Uploaders
    this.setupImageUploader({
      fileInputId: '#heroBgBannerFile',
      urlInputId: '#heroBgBannerUrl',
      previewId: '#heroBgBannerPreview',
      progressBoxId: '#heroBgBannerProgress',
      folder: 'nidj_juice/pages',
      onSuccessToast: 'Bannière Héro sauvegardée sur Cloudinary !'
    });
    this.setupImageUploader({
      fileInputId: '#compProdImgFile',
      urlInputId: '#compProdImgUrl',
      previewId: '#compProdImgPreview',
      progressBoxId: '#compProdImgProgress',
      folder: 'nidj_juice/company',
      onSuccessToast: 'Photo Laboratoire sauvegardée sur Cloudinary !'
    });
    this.setupImageUploader({
      fileInputId: '#compSavoirImgFile',
      urlInputId: '#compSavoirImgUrl',
      previewId: '#compSavoirImgPreview',
      progressBoxId: '#compSavoirImgProgress',
      folder: 'nidj_juice/company',
      onSuccessToast: 'Photo Savoir-Faire sauvegardée sur Cloudinary !'
    });
    this.setupImageUploader({
      fileInputId: '#compGovImgFile',
      urlInputId: '#compGovImgUrl',
      previewId: '#compGovImgPreview',
      progressBoxId: '#compGovImgProgress',
      folder: 'nidj_juice/company',
      onSuccessToast: 'Photo Équipe & Gouvernance sauvegardée sur Cloudinary !'
    });
    this.setupImageUploader({
      fileInputId: '#compQualityImgFile',
      urlInputId: '#compQualityImgUrl',
      previewId: '#compQualityImgPreview',
      progressBoxId: '#compQualityImgProgress',
      folder: 'nidj_juice/company',
      onSuccessToast: 'Photo Normes sauvegardée sur Cloudinary !'
    });
    this.setupImageUploader({
      fileInputId: '#rseFilieresImgFile',
      urlInputId: '#rseFilieresImgUrl',
      previewId: '#rseFilieresImgPreview',
      progressBoxId: '#rseFilieresImgProgress',
      folder: 'nidj_juice/engagements',
      onSuccessToast: 'Photo Filières Terroirs sauvegardée sur Cloudinary !'
    });
    this.setupImageUploader({
      fileInputId: '#rseQualityImgFile',
      urlInputId: '#rseQualityImgUrl',
      previewId: '#rseQualityImgPreview',
      progressBoxId: '#rseQualityImgProgress',
      folder: 'nidj_juice/engagements',
      onSuccessToast: 'Photo Contrôle Qualité sauvegardée sur Cloudinary !'
    });
    this.setupImageUploader({
      fileInputId: '#rseRecyclingImgFile',
      urlInputId: '#rseRecyclingImgUrl',
      previewId: '#rseRecyclingImgPreview',
      progressBoxId: '#rseRecyclingImgProgress',
      folder: 'nidj_juice/engagements',
      onSuccessToast: 'Photo Éco-Recyclage sauvegardée sur Cloudinary !'
    });

    // Settings Form Submit
    const settingsForm = this.element.querySelector('#boSettingsForm') as HTMLFormElement;
    settingsForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const current = cmsService.getSettings();
      const cName = (this.element.querySelector('#cfgCloudinaryCloudName') as HTMLInputElement)?.value.trim() || '';
      const cPreset = (this.element.querySelector('#cfgCloudinaryUploadPreset') as HTMLInputElement)?.value.trim() || '';
      const cFolder = (this.element.querySelector('#cfgCloudinaryFolder') as HTMLInputElement)?.value.trim() || 'nidj_juice';

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
        seoMetaDesc: (this.element.querySelector('#cfgMetaDesc') as HTMLTextAreaElement).value,
        brandLogoUrl: (this.element.querySelector('#cfgBrandLogoUrl') as HTMLInputElement)?.value.trim() || current.brandLogoUrl,
        faviconUrl: (this.element.querySelector('#cfgFaviconUrl') as HTMLInputElement)?.value.trim() || current.faviconUrl,
        cloudinaryCloudName: cName,
        cloudinaryUploadPreset: cPreset,
        cloudinaryFolder: cFolder
      });

      // Synchronize Cloudinary config storage
      cloudinaryService.saveConfig({ cloudName: cName, uploadPreset: cPreset, folder: cFolder });

      this.showToast('Paramètres généraux et Cloudinary enregistrés avec succès !', 'success');
      this.render();
    });

    // Setup Brand Logo and Favicon Cloudinary Uploaders
    this.setupImageUploader({
      fileInputId: '#cfgBrandLogoFile',
      urlInputId: '#cfgBrandLogoUrl',
      previewId: '#cfgBrandLogoPreview',
      progressBoxId: '#cfgBrandLogoProgress',
      folder: 'nidj_juice/brand',
      onSuccessToast: 'Logo officiel sauvegardé sur Cloudinary !'
    });
    this.setupImageUploader({
      fileInputId: '#cfgFaviconFile',
      urlInputId: '#cfgFaviconUrl',
      previewId: '#cfgFaviconPreview',
      progressBoxId: '#cfgFaviconProgress',
      folder: 'nidj_juice/brand',
      onSuccessToast: 'Favicon du site sauvegardé sur Cloudinary !'
    });

    // Cloudinary Test Connection Button
    const testCloudinaryBtn = this.element.querySelector('#boTestCloudinaryBtn') as HTMLButtonElement;
    const testResultBox = this.element.querySelector('#boCloudinaryTestResult') as HTMLElement;
    testCloudinaryBtn?.addEventListener('click', async () => {
      const cName = (this.element.querySelector('#cfgCloudinaryCloudName') as HTMLInputElement)?.value.trim();
      const cPreset = (this.element.querySelector('#cfgCloudinaryUploadPreset') as HTMLInputElement)?.value.trim();
      const cFolder = (this.element.querySelector('#cfgCloudinaryFolder') as HTMLInputElement)?.value.trim() || 'nidj_juice';

      if (!cName || !cPreset) {
        if (testResultBox) {
          testResultBox.innerHTML = `
            <div style="background: rgba(220, 38, 38, 0.1); border: 1px solid rgba(220, 38, 38, 0.3); color: #DC2626; padding: 10px 14px; border-radius: var(--bo-radius-sm); font-size: 12px; font-weight: 600;">
              ⚠️ Veuillez d'abord renseigner le Cloud Name et l'Upload Preset ci-dessus.
            </div>
          `;
        }
        return;
      }

      cloudinaryService.saveConfig({ cloudName: cName, uploadPreset: cPreset, folder: cFolder });

      testCloudinaryBtn.disabled = true;
      testCloudinaryBtn.innerHTML = `${BO_ICONS.loader} <span>Test de connexion en cours...</span>`;
      if (testResultBox) {
        testResultBox.innerHTML = `<div style="font-size: 12px; color: var(--bo-text-muted);">Vérification de l'endpoint Cloudinary...</div>`;
      }

      const res = await cloudinaryService.testConnection();
      testCloudinaryBtn.disabled = false;
      testCloudinaryBtn.innerHTML = `${BO_ICONS.refresh} <span>Tester la connexion</span>`;

      if (res.success) {
        if (testResultBox) {
          testResultBox.innerHTML = `
            <div style="background: rgba(88, 168, 38, 0.12); border: 1px solid rgba(88, 168, 38, 0.3); color: var(--bo-forest); padding: 10px 14px; border-radius: var(--bo-radius-sm); font-size: 12px; font-weight: 700;">
              ${res.message}
            </div>
          `;
        }
        this.showToast('Connexion Cloudinary réussie !', 'success');
      } else {
        if (testResultBox) {
          testResultBox.innerHTML = `
            <div style="background: rgba(220, 38, 38, 0.1); border: 1px solid rgba(220, 38, 38, 0.3); color: #DC2626; padding: 10px 14px; border-radius: var(--bo-radius-sm); font-size: 12px; font-weight: 600;">
              ❌ Erreur de configuration : ${res.message}
            </div>
          `;
        }
        this.showToast('Échec du test Cloudinary', 'error');
      }
    });

    // Standalone Direct Media Upload Dropzone
    const directUploadInput = this.element.querySelector('#boDirectMediaUploadInput') as HTMLInputElement;
    const directUploadProgress = this.element.querySelector('#boDirectUploadProgress') as HTMLElement;
    const directUploadResult = this.element.querySelector('#boDirectUploadResult') as HTMLElement;

    directUploadInput?.addEventListener('change', async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      if (!cloudinaryService.isConfigured()) {
        this.showToast('Veuillez renseigner et enregistrer votre Cloud Name et Upload Preset d\'abord.', 'error');
        return;
      }

      try {
        if (directUploadProgress) {
          directUploadProgress.style.display = 'block';
          directUploadProgress.innerHTML = `
            <div class="bo-upload-progress-box">
              <div class="bo-upload-progress-header">
                <span>Téléversement vers Cloudinary...</span>
                <span id="directUploadPercent">0%</span>
              </div>
              <div class="bo-upload-progress-track">
                <div class="bo-upload-progress-fill" id="directUploadFill" style="width: 0%;"></div>
              </div>
            </div>
          `;
        }
        if (directUploadResult) directUploadResult.innerHTML = '';

        const isVideo = file.type.startsWith('video/');
        const res = await cloudinaryService.upload(file, {
          resourceType: isVideo ? 'video' : 'image',
          folder: 'nidj_juice/media',
          onProgress: (percent) => {
            const pLabel = this.element.querySelector('#directUploadPercent');
            const pFill = this.element.querySelector('#directUploadFill') as HTMLElement;
            if (pLabel) pLabel.textContent = `${percent}%`;
            if (pFill) pFill.style.width = `${percent}%`;
          }
        });

        if (directUploadProgress) directUploadProgress.style.display = 'none';
        if (directUploadResult) {
          directUploadResult.innerHTML = `
            <div style="background: #FFFFFF; border: 1px solid var(--bo-border); border-radius: var(--bo-radius-md); padding: 16px; text-align: left; display: flex; gap: 14px; align-items: center; max-width: 620px; margin: 0 auto; box-shadow: var(--bo-shadow-sm);">
              ${isVideo 
                ? `<video src="${res.secureUrl}" style="width: 80px; height: 60px; object-fit: cover; border-radius: 4px; background: #000;" controls></video>`
                : `<img src="${res.secureUrl}" alt="Aperçu" style="width: 60px; height: 60px; object-fit: cover; border-radius: 4px; border: 1px solid var(--bo-border);" />`}
              <div style="flex: 1; min-width: 0;">
                <div style="font-size: 12px; font-weight: 700; color: var(--bo-forest); margin-bottom: 4px;">✓ Fichier hébergé sur Cloudinary CDN</div>
                <input type="text" class="bo-input" value="${res.secureUrl}" readonly style="font-size: 11px; padding: 6px 10px;" id="directUploadedUrlInput" />
              </div>
              <button type="button" class="bo-btn-secondary" id="boCopyUploadedUrlBtn" style="font-size: 12px; padding: 6px 12px; white-space: nowrap;">
                Copier l'URL
              </button>
            </div>
          `;

          const copyBtn = directUploadResult.querySelector('#boCopyUploadedUrlBtn') as HTMLButtonElement;
          copyBtn?.addEventListener('click', () => {
            navigator.clipboard.writeText(res.secureUrl);
            this.showToast('URL Cloudinary copiée dans le presse-papiers !', 'success');
          });
        }
        this.showToast('Média sauvegardé avec succès sur Cloudinary !', 'success');
      } catch (err: any) {
        if (directUploadProgress) directUploadProgress.style.display = 'none';
        this.showToast(`Échec du téléversement : ${err.message}`, 'error');
      }
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

    // --- Supabase Cloud Sync Quick Topbar Actions (Desktop + Mobile) ---
    const handleTopSyncSupabase = async (btn: HTMLElement | null) => {
      if (!supabaseService.isConfigured()) {
        this.showToast('Veuillez d\'abord configurer Supabase dans l\'onglet Paramètres.', 'error');
        this.currentTab = 'settings';
        this.render();
        return;
      }

      if (btn) {
        btn.style.pointerEvents = 'none';
        btn.innerHTML = `${BO_ICONS.loader} <span>Synchronisation...</span>`;
      }

      const res = await cmsService.syncToSupabase();
      if (btn) {
        btn.style.pointerEvents = 'auto';
        btn.innerHTML = `${BO_ICONS.database} <span>Sync Cloud</span>`;
      }

      if (res.success) {
        this.showToast(res.message, 'success');
      } else {
        this.showToast(res.message, 'error');
      }
    };

    this.element.querySelector('#boTopSyncSupabaseBtn')?.addEventListener('click', (e) => {
      handleTopSyncSupabase(e.currentTarget as HTMLElement);
    });
    this.element.querySelector('#boMobileSyncSupabaseBtn')?.addEventListener('click', (e) => {
      this.closeMobileSidebar();
      handleTopSyncSupabase(e.currentTarget as HTMLElement);
    });

    // --- Supabase Configuration Form Submit ---
    const supabaseConfigForm = this.element.querySelector('#boSupabaseConfigForm') as HTMLFormElement;
    supabaseConfigForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const urlInput = (this.element.querySelector('#cfgSupabaseUrl') as HTMLInputElement)?.value.trim() || '';
      const keyInput = (this.element.querySelector('#cfgSupabaseAnonKey') as HTMLInputElement)?.value.trim() || '';
      const autoSync = (this.element.querySelector('#cfgSupabaseAutoSync') as HTMLInputElement)?.checked ?? true;

      if (!urlInput || !keyInput) {
        this.showToast('Veuillez renseigner l\'URL et la clé Anon de Supabase.', 'error');
        return;
      }

      supabaseService.saveConfig({ url: urlInput, anonKey: keyInput, autoSync });

      const current = cmsService.getSettings();
      cmsService.saveSettings({
        ...current,
        supabaseUrl: urlInput,
        supabaseAnonKey: keyInput,
        supabaseAutoSync: autoSync
      });

      this.showToast('Configuration Supabase enregistrée avec succès !', 'success');
      this.render();
    });

    // --- Supabase Test Connection Button ---
    const testSupabaseBtn = this.element.querySelector('#boTestSupabaseBtn') as HTMLButtonElement;
    const supabaseResultBox = this.element.querySelector('#boSupabaseResultBox') as HTMLElement;
    testSupabaseBtn?.addEventListener('click', async () => {
      const urlInput = (this.element.querySelector('#cfgSupabaseUrl') as HTMLInputElement)?.value.trim() || '';
      const keyInput = (this.element.querySelector('#cfgSupabaseAnonKey') as HTMLInputElement)?.value.trim() || '';
      const autoSync = (this.element.querySelector('#cfgSupabaseAutoSync') as HTMLInputElement)?.checked ?? true;

      if (!urlInput || !keyInput) {
        if (supabaseResultBox) {
          supabaseResultBox.innerHTML = `
            <div style="background: rgba(220, 38, 38, 0.1); border: 1px solid rgba(220, 38, 38, 0.3); color: #DC2626; padding: 10px 14px; border-radius: var(--bo-radius-sm); font-size: 12px; font-weight: 600;">
              ⚠️ Veuillez renseigner l'URL et la clé Anon Key ci-dessus avant de tester.
            </div>
          `;
        }
        return;
      }

      supabaseService.saveConfig({ url: urlInput, anonKey: keyInput, autoSync });

      testSupabaseBtn.disabled = true;
      testSupabaseBtn.innerHTML = `${BO_ICONS.loader} <span>Vérification...</span>`;
      if (supabaseResultBox) {
        supabaseResultBox.innerHTML = `<div style="font-size: 12px; color: var(--bo-text-muted);">Connexion au serveur Supabase en cours...</div>`;
      }

      const res = await supabaseService.testConnection();
      testSupabaseBtn.disabled = false;
      testSupabaseBtn.innerHTML = `${BO_ICONS.refresh} <span>Tester la Connexion</span>`;

      if (res.success) {
        if (supabaseResultBox) {
          supabaseResultBox.innerHTML = `
            <div style="background: rgba(88, 168, 38, 0.12); border: 1px solid rgba(88, 168, 38, 0.3); color: var(--bo-forest); padding: 12px 14px; border-radius: var(--bo-radius-sm); font-size: 12.5px; font-weight: 700;">
              ✓ ${res.message}
            </div>
          `;
        }
        this.showToast('Connexion Supabase réussie !', 'success');
      } else {
        if (supabaseResultBox) {
          supabaseResultBox.innerHTML = `
            <div style="background: rgba(220, 38, 38, 0.1); border: 1px solid rgba(220, 38, 38, 0.3); color: #DC2626; padding: 12px 14px; border-radius: var(--bo-radius-sm); font-size: 12px; font-weight: 600; line-height: 1.5;">
              ❌ <strong>Échec de connexion :</strong> ${res.message}
            </div>
          `;
        }
        this.showToast('Erreur de connexion Supabase', 'error');
      }
    });

    // --- Supabase Push (Save All to Cloud) Button ---
    const pushSupabaseBtn = this.element.querySelector('#boPushSupabaseBtn') as HTMLButtonElement;
    pushSupabaseBtn?.addEventListener('click', async () => {
      if (!supabaseService.isConfigured()) {
        this.showToast('Veuillez d\'abord renseigner et enregistrer vos identifiants Supabase.', 'error');
        return;
      }

      pushSupabaseBtn.disabled = true;
      pushSupabaseBtn.innerHTML = `${BO_ICONS.loader} <span>Sauvegarde vers Supabase...</span>`;
      if (supabaseResultBox) {
        supabaseResultBox.innerHTML = `<div style="font-size: 12px; color: var(--bo-text-muted);">Envoi des données vers la table site_database...</div>`;
      }

      const res = await cmsService.syncToSupabase();
      pushSupabaseBtn.disabled = false;
      pushSupabaseBtn.innerHTML = `${BO_ICONS.upload} <span>Sauvegarder tout sur Supabase (Push)</span>`;

      if (res.success) {
        if (supabaseResultBox) {
          supabaseResultBox.innerHTML = `
            <div style="background: rgba(88, 168, 38, 0.12); border: 1px solid rgba(88, 168, 38, 0.3); color: var(--bo-forest); padding: 12px 14px; border-radius: var(--bo-radius-sm); font-size: 12.5px; font-weight: 700;">
              ✓ ${res.message}
            </div>
          `;
        }
        this.showToast('Sauvegarde Supabase réussie avec succès !', 'success');
      } else {
        if (supabaseResultBox) {
          supabaseResultBox.innerHTML = `
            <div style="background: rgba(220, 38, 38, 0.1); border: 1px solid rgba(220, 38, 38, 0.3); color: #DC2626; padding: 12px 14px; border-radius: var(--bo-radius-sm); font-size: 12px; font-weight: 600;">
              ❌ ${res.message}
            </div>
          `;
        }
        this.showToast('Erreur lors de la sauvegarde Supabase', 'error');
      }
    });

    // --- Supabase Pull (Restore from Cloud) Button ---
    const pullSupabaseBtn = this.element.querySelector('#boPullSupabaseBtn') as HTMLButtonElement;
    pullSupabaseBtn?.addEventListener('click', async () => {
      if (!supabaseService.isConfigured()) {
        this.showToast('Veuillez d\'abord configurer Supabase.', 'error');
        return;
      }

      if (!confirm('Attention : Cette action va synchroniser et remplacer les données locales par la version actuellement stockée sur votre Supabase. Voulez-vous continuer ?')) {
        return;
      }

      pullSupabaseBtn.disabled = true;
      pullSupabaseBtn.innerHTML = `${BO_ICONS.loader} <span>Récupération...</span>`;

      const res = await cmsService.syncFromSupabase();
      pullSupabaseBtn.disabled = false;
      pullSupabaseBtn.innerHTML = `${BO_ICONS.download} <span>Restaurer depuis Supabase (Pull)</span>`;

      if (res.success) {
        this.showToast(res.message, 'success');
        this.render();
      } else {
        if (supabaseResultBox) {
          supabaseResultBox.innerHTML = `
            <div style="background: rgba(220, 38, 38, 0.1); border: 1px solid rgba(220, 38, 38, 0.3); color: #DC2626; padding: 12px 14px; border-radius: var(--bo-radius-sm); font-size: 12px; font-weight: 600;">
              ❌ ${res.message}
            </div>
          `;
        }
        this.showToast('Échec de synchronisation depuis Supabase', 'error');
      }
    });

    // --- Supabase Copy SQL Script Button ---
    const copySqlBtn = this.element.querySelector('#boCopySqlScriptBtn') as HTMLButtonElement;
    copySqlBtn?.addEventListener('click', () => {
      const sql = supabaseService.getSqlSetupScript();
      navigator.clipboard.writeText(sql);
      const label = this.element.querySelector('#boCopySqlLabel');
      if (label) label.textContent = '✓ Script SQL Copié !';
      this.showToast('Script SQL copié dans le presse-papiers ! Collez-le dans Supabase SQL Editor.', 'success');
      setTimeout(() => {
        if (label) label.textContent = 'Copier le Script SQL (1-Clic)';
      }, 2500);
    });

    // Export Backup (Desktop + Mobile)
    const handleExport = () => {
      const json = cmsService.exportBackupJson();
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `nidj-juice-cms-backup-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      this.closeMobileSidebar();
      this.showToast('Sauvegarde JSON téléchargée avec succès', 'success');
    };
    this.element.querySelector('#boExportBtn')?.addEventListener('click', handleExport);
    this.element.querySelector('#boMobileExportBtn')?.addEventListener('click', handleExport);

    // Import Backup File (Desktop + Mobile)
    const handleImportFile = (inputEl: HTMLInputElement | null) => {
      inputEl?.addEventListener('change', (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (evt) => {
            const content = evt.target?.result as string;
            const ok = cmsService.importBackupJson(content);
            if (ok) {
              this.closeMobileSidebar();
              this.showToast('Sauvegarde restaurée avec succès !', 'success');
              this.render();
            } else {
              this.showToast('Fichier de sauvegarde invalide', 'error');
            }
          };
          reader.readAsText(file);
        }
      });
    };
    handleImportFile(this.element.querySelector('#boImportFileInput') as HTMLInputElement);
    handleImportFile(this.element.querySelector('#boMobileImportFileInput') as HTMLInputElement);

    // Reset Defaults (Desktop + Mobile)
    const handleReset = () => {
      if (confirm('Attention : Voulez-vous vraiment réinitialiser toutes les données aux valeurs par défaut d\'origine ?')) {
        cmsService.resetToDefaults();
        this.closeMobileSidebar();
        this.render();
        this.showToast('Données réinitialisées aux valeurs usine', 'success');
      }
    };
    this.element.querySelector('#boResetBtn')?.addEventListener('click', handleReset);
    this.element.querySelector('#boMobileResetBtn')?.addEventListener('click', handleReset);

    // Load admin users list if on settings tab
    if (this.currentTab === 'settings') {
      this.loadAndRenderAdminUsers();
      this.element.querySelector('#boOpenAddAdminModalBtn')?.addEventListener('click', () => {
        this.openAddAdminModal();
      });
    }

    // Logout (Desktop + Mobile)
    const handleLogout = async () => {
      this.closeMobileSidebar();
      await supabaseService.signOutAdmin();
      cmsService.setCurrentAdmin(null);
      this.render();
      this.showToast('Déconnecté du panneau d\'administration', 'success');
    };
    this.element.querySelector('#boLogoutBtn')?.addEventListener('click', handleLogout);
    this.element.querySelector('#boMobileLogoutBtn')?.addEventListener('click', handleLogout);
  }

  // =========================================================================
  // ADMINISTRATOR TEAM MANAGEMENT HELPERS
  // =========================================================================
  private async loadAndRenderAdminUsers(): Promise<void> {
    const container = this.element.querySelector('#boAdminUsersContainer');
    if (!container) return;

    if (!supabaseService.isConfigured()) {
      const current = cmsService.getCurrentAdmin();
      container.innerHTML = `
        <div style="background: var(--bo-surface-subtle); border: 1px solid var(--bo-border); border-radius: var(--bo-radius-md); padding: 18px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <div class="bo-user-avatar" style="width: 42px; height: 42px; font-size: 15px;">SN</div>
            <div>
              <div style="font-weight: 700; color: var(--bo-forest); font-size: 14px;">${current.fullName} (${current.email})</div>
              <div style="font-size: 12px; color: var(--bo-text-muted);">${current.role} • Session locale active</div>
            </div>
          </div>
          <span class="bo-cloudinary-badge-pill is-active">🟢 Administrateur Actif</span>
        </div>
        <p style="font-size: 12px; color: var(--bo-text-muted); margin: 12px 0 0 4px;">
          💡 <em>Configurez vos clés Supabase ci-dessus pour inviter et synchroniser d'autres administrateurs sur votre base cloud.</em>
        </p>
      `;
      return;
    }

    container.innerHTML = `
      <div style="text-align: center; padding: 24px; color: var(--bo-text-muted); font-size: 13px;">
        ${BO_ICONS.loader} <span>Récupération des administrateurs depuis Supabase...</span>
      </div>
    `;

    const res = await supabaseService.getAdminUsers();
    if (!res.success || !res.data || res.data.length === 0) {
      const current = cmsService.getCurrentAdmin();
      container.innerHTML = `
        <div style="background: var(--bo-surface-subtle); border: 1px solid var(--bo-border); border-radius: var(--bo-radius-md); padding: 18px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;">
          <div style="display: flex; align-items: center; gap: 12px;">
            <div class="bo-user-avatar" style="width: 42px; height: 42px; font-size: 15px;">
              ${current.fullName.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div style="font-weight: 700; color: var(--bo-forest); font-size: 14px;">${current.fullName} (${current.email})</div>
              <div style="font-size: 12px; color: var(--bo-text-muted);">${current.role} • Session active</div>
            </div>
          </div>
          <span class="bo-cloudinary-badge-pill is-active">🟢 Session Active</span>
        </div>
        <div style="margin-top: 14px; text-align: center;">
          <p style="font-size: 12.5px; color: var(--bo-text-muted); margin: 0 0 10px 0;">
            Aucun autre compte enregistré dans la table <code>admin_users</code>. Utilisez le bouton ci-dessus pour en ajouter.
          </p>
        </div>
      `;
      return;
    }

    const currentAdmin = cmsService.getCurrentAdmin();

    container.innerHTML = `
      <div class="bo-table-wrapper" style="border: 1px solid var(--bo-border); border-radius: var(--bo-radius-md); overflow-x: auto;">
        <table class="bo-table" style="width: 100%; border-collapse: collapse; text-align: left; font-size: 13px;">
          <thead style="background: var(--bo-surface-subtle); border-bottom: 1px solid var(--bo-border);">
            <tr>
              <th style="padding: 12px 16px; font-weight: 700; color: var(--bo-forest);">Administrateur</th>
              <th style="padding: 12px 16px; font-weight: 700; color: var(--bo-forest);">Rôle</th>
              <th style="padding: 12px 16px; font-weight: 700; color: var(--bo-forest);">Dernière Connexion</th>
              <th style="padding: 12px 16px; font-weight: 700; color: var(--bo-forest);">Statut</th>
              <th style="padding: 12px 16px; font-weight: 700; color: var(--bo-forest); text-align: right;">Actions</th>
            </tr>
          </thead>
          <tbody>
            ${res.data.map((admin) => {
              const initials = admin.fullName.split(' ').filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join('') || 'AD';
              const isCurrent = admin.email.toLowerCase() === currentAdmin.email.toLowerCase();
              const dateStr = admin.lastLogin ? new Date(admin.lastLogin).toLocaleString('fr-FR') : 'Jamais connecté';
              return `
                <tr style="border-bottom: 1px solid var(--bo-border);">
                  <td style="padding: 14px 16px;">
                    <div style="display: flex; align-items: center; gap: 10px;">
                      <div class="bo-user-avatar" style="width: 34px; height: 34px; font-size: 12px;">${initials}</div>
                      <div>
                        <div style="font-weight: 700; color: var(--bo-forest);">${admin.fullName} ${isCurrent ? '<span style="font-size: 11px; color: var(--bo-brand-green); font-weight: 700;">(Vous)</span>' : ''}</div>
                        <div style="font-size: 11.5px; color: var(--bo-text-muted);">${admin.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style="padding: 14px 16px;">
                    <span style="display: inline-block; background: var(--bo-brand-green-tint); border: 1px solid rgba(88,168,38,0.25); color: var(--bo-forest); font-weight: 700; font-size: 11px; padding: 3px 8px; border-radius: var(--bo-radius-pill);">
                      ${admin.role}
                    </span>
                  </td>
                  <td style="padding: 14px 16px; color: var(--bo-text-muted); font-size: 12px;">
                    ${dateStr}
                  </td>
                  <td style="padding: 14px 16px;">
                    <span style="color: #2ea069; font-weight: 700; font-size: 11.5px; display: inline-flex; align-items: center; gap: 4px;">
                      <span style="width: 7px; height: 7px; border-radius: 50%; background: #2ea069;"></span> Actif
                    </span>
                  </td>
                  <td style="padding: 14px 16px; text-align: right;">
                    ${isCurrent ? `
                      <span style="font-size: 11px; color: var(--bo-text-muted); font-style: italic;">Compte actif</span>
                    ` : `
                      <button type="button" class="bo-action-pill danger bo-delete-admin-btn" data-id="${admin.id || ''}" data-email="${admin.email}" title="Supprimer cet administrateur" style="padding: 4px 8px; font-size: 11px;">
                        ${BO_ICONS.trash} Supprimer
                      </button>
                    `}
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;

    // Bind delete buttons
    container.querySelectorAll('.bo-delete-admin-btn').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-id');
        const email = btn.getAttribute('data-email');
        if (!id) return;
        if (confirm(`Êtes-vous sûr de vouloir supprimer l'administrateur ${email} ?`)) {
          const delRes = await supabaseService.deleteAdminUser(id);
          if (delRes.success) {
            this.showToast('Administrateur supprimé avec succès', 'success');
            this.loadAndRenderAdminUsers();
          } else {
            this.showToast(delRes.message, 'error');
          }
        }
      });
    });
  }

  private openAddAdminModal(): void {
    const modalContainer = this.element.querySelector('#boModalContainer');
    if (!modalContainer) return;

    modalContainer.innerHTML = `
      <div class="bo-modal-backdrop" id="boAddAdminModalBackdrop">
        <div class="bo-modal-card" style="max-width: 480px;">
          <div class="bo-modal-header">
            <div class="bo-modal-title-group">
              <div class="bo-card-icon" style="background: rgba(10, 61, 34, 0.12); color: var(--bo-forest);">${BO_ICONS.plus}</div>
              <div>
                <h3 class="bo-modal-title">Créer un Nouvel Administrateur</h3>
                <p class="bo-modal-subtitle">Le compte sera enregistré directement dans Supabase Auth & admin_users</p>
              </div>
            </div>
            <button type="button" class="bo-modal-close-btn" id="boCloseAdminModalBtn">${BO_ICONS.close}</button>
          </div>

          <form id="boModalAddAdminForm" style="padding: 20px 24px;">
            <div class="bo-form-group">
              <label class="bo-label">Nom et Prénom</label>
              <input type="text" id="modalAdminName" class="bo-input" placeholder="ex: Richard N. - Direction" required />
            </div>

            <div class="bo-form-group">
              <label class="bo-label">Adresse Email Professionnelle</label>
              <input type="email" id="modalAdminEmail" class="bo-input" placeholder="ex: commercial@nidj-juice.cm" required />
            </div>

            <div class="bo-form-group">
              <label class="bo-label">Rôle Administratif</label>
              <select id="modalAdminRole" class="bo-select" required>
                <option value="Direction Générale">Direction Générale</option>
                <option value="Responsable Ventes & Distribution">Responsable Ventes & Distribution</option>
                <option value="Gestionnaire Catalogue & Contenus">Gestionnaire Catalogue & Contenus</option>
                <option value="Superviseur Production">Superviseur Production</option>
              </select>
            </div>

            <div class="bo-form-group">
              <label class="bo-label">Mot de passe provisoire (Min. 6 caractères)</label>
              <input type="password" id="modalAdminPassword" class="bo-input" placeholder="••••••••" minlength="6" required />
            </div>

            <div id="modalAdminFeedback" style="margin-top: 10px;"></div>

            <div style="display: flex; justify-content: flex-end; gap: 10px; margin-top: 24px;">
              <button type="button" class="bo-btn-secondary" id="modalCancelAdminBtn">Annuler</button>
              <button type="submit" class="bo-btn-primary" id="modalSubmitAdminBtn">
                ${BO_ICONS.check}
                <span>Enregistrer dans Supabase</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    `;

    const close = () => {
      modalContainer.innerHTML = '';
    };

    modalContainer.querySelector('#boCloseAdminModalBtn')?.addEventListener('click', close);
    modalContainer.querySelector('#modalCancelAdminBtn')?.addEventListener('click', close);
    modalContainer.querySelector('#boAddAdminModalBackdrop')?.addEventListener('click', (e) => {
      if (e.target === e.currentTarget) close();
    });

    const form = modalContainer.querySelector('#boModalAddAdminForm') as HTMLFormElement;
    form?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = (modalContainer.querySelector('#modalAdminName') as HTMLInputElement)?.value.trim();
      const email = (modalContainer.querySelector('#modalAdminEmail') as HTMLInputElement)?.value.trim();
      const role = (modalContainer.querySelector('#modalAdminRole') as HTMLSelectElement)?.value;
      const pwd = (modalContainer.querySelector('#modalAdminPassword') as HTMLInputElement)?.value;
      const submitBtn = modalContainer.querySelector('#modalSubmitAdminBtn') as HTMLButtonElement;
      const feedback = modalContainer.querySelector('#modalAdminFeedback') as HTMLElement;

      submitBtn.disabled = true;
      submitBtn.innerHTML = `${BO_ICONS.loader} <span>Création sur Supabase...</span>`;

      const res = await supabaseService.signUpAdmin(email, pwd, name, role);
      submitBtn.disabled = false;
      submitBtn.innerHTML = `${BO_ICONS.check} <span>Enregistrer dans Supabase</span>`;

      if (res.success) {
        this.showToast('Nouvel administrateur enregistré sur Supabase !', 'success');
        close();
        this.loadAndRenderAdminUsers();
      } else {
        if (feedback) {
          feedback.innerHTML = `
            <div style="background: rgba(220, 38, 38, 0.1); border: 1px solid rgba(220, 38, 38, 0.3); color: #DC2626; padding: 10px 12px; border-radius: var(--bo-radius-sm); font-size: 12px; font-weight: 600;">
              ❌ ${res.message}
            </div>
          `;
        }
      }
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
        <form class="bo-modal" id="boProductEditForm">
          <div class="bo-modal-header">
            <div class="bo-modal-title-group">
              <h2>${isNew ? 'Créer une Nouvelle Saveur' : `Modifier la Saveur : ${p.name}`}</h2>
              <p class="bo-modal-subtitle">Fiche produit officielle • Société Nidjeu</p>
            </div>
            <button type="button" class="bo-modal-close-btn" id="closeProductModalBtn" title="Fermer">
              ${BO_ICONS.close}
            </button>
          </div>

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
                  <label class="bo-label">Collection / Gamme de Nectars</label>
                  <div style="display: flex; gap: 8px;">
                    <select id="pCollectionSelect" class="bo-input" style="flex: 1.2;">
                      <option value="">-- Choisir une gamme --</option>
                      ${cmsService
                        .getCollections()
                        .map(
                          (c) =>
                            `<option value="${c.name}" ${p.category?.toLowerCase() === c.name.toLowerCase() ? 'selected' : ''}>${c.name}</option>`
                        )
                        .join('')}
                      <option value="__custom__">Autre collection libre...</option>
                    </select>
                    <input type="text" id="pCategory" class="bo-input" value="${p.category || 'Collection Royale'}" style="flex: 1;" required />
                  </div>
                </div>
              </div>

              <!-- Image Uploader -->
              <div class="bo-form-group">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                  <label class="bo-label" style="margin: 0;">Visuel Officiel de la Bouteille</label>
                  <span style="font-size: 11px; color: var(--bo-brand-green); font-weight: 700; display: inline-flex; align-items: center; gap: 4px;">
                    ${BO_ICONS.cloud}
                    <span>CDN Cloudinary</span>
                  </span>
                </div>
                <div class="bo-modal-image-row" style="display: flex; gap: 16px; align-items: center; background: var(--bo-surface-subtle); padding: 14px; border-radius: var(--bo-radius-md); border: 1px solid var(--bo-border);">
                  <div style="width: 70px; height: 90px; background: #FFFFFF; border-radius: var(--bo-radius-sm); border: 1px solid var(--bo-border); display: flex; align-items: center; justify-content: center; padding: 4px; flex-shrink: 0;">
                    <img id="pImgPreview" src="${p.bottleImage}" alt="Prévisualisation" style="max-height: 100%; max-width: 100%; object-fit: contain;" />
                  </div>
                  <div style="flex: 1; min-width: 0;">
                    <input type="text" id="pImgUrl" class="bo-input" value="${p.bottleImage}" placeholder="URL Cloudinary ou chemin local" style="margin-bottom: 8px;" />
                    <label class="bo-upload-action-btn" style="cursor: pointer;">
                      ${BO_ICONS.camera}
                      <span>Téléverser vers Cloudinary</span>
                      <input type="file" id="pImgFileInput" accept="image/*" style="display: none;" />
                    </label>
                    <div id="pUploadProgress" style="display: none;"></div>
                  </div>
                </div>
              </div>

              <!-- Splash Image Uploader -->
              <div class="bo-form-group">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                  <label class="bo-label" style="margin: 0;">Visuel Décoratif / Éclaboussure de Fruits (Splash Image)</label>
                  <span style="font-size: 11px; color: var(--bo-brand-green); font-weight: 700; display: inline-flex; align-items: center; gap: 4px;">
                    ${BO_ICONS.cloud}
                    <span>CDN Cloudinary</span>
                  </span>
                </div>
                <div class="bo-modal-image-row" style="display: flex; gap: 16px; align-items: center; background: var(--bo-surface-subtle); padding: 14px; border-radius: var(--bo-radius-md); border: 1px solid var(--bo-border);">
                  <div style="width: 70px; height: 70px; background: #FFFFFF; border-radius: var(--bo-radius-sm); border: 1px solid var(--bo-border); display: flex; align-items: center; justify-content: center; padding: 4px; flex-shrink: 0;">
                    <img id="pSplashImgPreview" src="${p.splashImage || '/assets/images/splash-bissap.png'}" alt="Prévisualisation Splash" style="max-height: 100%; max-width: 100%; object-fit: contain;" />
                  </div>
                  <div style="flex: 1; min-width: 0;">
                    <input type="text" id="pSplashImgUrl" class="bo-input" value="${p.splashImage || ''}" placeholder="URL Cloudinary ou chemin local (/assets/images/...)" style="margin-bottom: 8px;" />
                    <label class="bo-upload-action-btn" style="cursor: pointer;">
                      ${BO_ICONS.camera}
                      <span>Téléverser vers Cloudinary</span>
                      <input type="file" id="pSplashImgFileInput" accept="image/*" style="display: none;" />
                    </label>
                    <div id="pSplashUploadProgress" style="display: none;"></div>
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
                <div class="bo-form-group">
                  <label class="bo-label">Vitamine C</label>
                  <input type="text" id="pNutVitC" class="bo-input" value="${p.nutrition?.vitaminC || 'Riche en vitamine C naturelle'}" />
                </div>
                <div class="bo-form-group">
                  <label class="bo-label">Antioxydants</label>
                  <input type="text" id="pNutAntiOx" class="bo-input" value="${p.nutrition?.antioxidants || 'Fort pouvoir antioxydant'}" />
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
    `;

    // Modal Close
    const overlay = modalContainer.querySelector('.bo-modal-overlay');
    const closeBtn = modalContainer.querySelector('#closeProductModalBtn');
    const cancelBtn = modalContainer.querySelector('#cancelProductModalBtn');
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    const closeModal = () => {
      modalContainer.innerHTML = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
    closeBtn?.addEventListener('click', closeModal);
    cancelBtn?.addEventListener('click', closeModal);
    overlay?.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });
    window.addEventListener('keydown', handleKeyDown);

    // Collection Select Sync
    const collSelect = modalContainer.querySelector('#pCollectionSelect') as HTMLSelectElement;
    const catInput = modalContainer.querySelector('#pCategory') as HTMLInputElement;
    collSelect?.addEventListener('change', () => {
      if (collSelect.value && collSelect.value !== '__custom__') {
        catInput.value = collSelect.value;
      }
    });

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

    imgInput?.addEventListener('change', async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const progressBox = modalContainer.querySelector('#pUploadProgress') as HTMLElement;
      const saveBtn = modalContainer.querySelector('button[type="submit"]') as HTMLButtonElement;

      if (cloudinaryService.isConfigured()) {
        try {
          if (progressBox) {
            progressBox.style.display = 'block';
            progressBox.innerHTML = `
              <div class="bo-upload-progress-box">
                <div class="bo-upload-progress-header">
                  <span>Envoi Cloudinary en cours...</span>
                  <span id="pUploadPercent">0%</span>
                </div>
                <div class="bo-upload-progress-track">
                  <div class="bo-upload-progress-fill" id="pUploadFill" style="width: 0%;"></div>
                </div>
              </div>
            `;
          }
          if (saveBtn) {
            saveBtn.disabled = true;
            saveBtn.innerHTML = `${BO_ICONS.loader} <span>Upload en cours...</span>`;
          }

          // Local instant preview
          imgPreview.src = URL.createObjectURL(file);

          const result = await cloudinaryService.upload(file, {
            resourceType: 'image',
            folder: 'nidj_juice/products',
            onProgress: (percent) => {
              const pLabel = modalContainer.querySelector('#pUploadPercent');
              const pFill = modalContainer.querySelector('#pUploadFill') as HTMLElement;
              if (pLabel) pLabel.textContent = `${percent}%`;
              if (pFill) pFill.style.width = `${percent}%`;
            }
          });

          imgUrlInput.value = result.secureUrl;
          imgPreview.src = result.secureUrl;
          this.showToast('Visuel produit sauvegardé sur Cloudinary !', 'success');
        } catch (err: any) {
          console.error('Cloudinary product upload error', err);
          this.showToast(`Échec Cloudinary : ${err.message}`, 'error');
          const reader = new FileReader();
          reader.onload = (evt) => {
            const dataUrl = evt.target?.result as string;
            imgPreview.src = dataUrl;
            imgUrlInput.value = dataUrl;
          };
          reader.readAsDataURL(file);
        } finally {
          if (progressBox) progressBox.style.display = 'none';
          if (saveBtn) {
            saveBtn.disabled = false;
            saveBtn.innerHTML = `${BO_ICONS.check} <span>Enregistrer</span>`;
          }
        }
      } else {
        const reader = new FileReader();
        reader.onload = (evt) => {
          const dataUrl = evt.target?.result as string;
          imgPreview.src = dataUrl;
          imgUrlInput.value = dataUrl;
        };
        reader.readAsDataURL(file);
        this.showToast(
          'Image chargée localement. Pour héberger sur Cloudinary, renseignez vos identifiants dans les Paramètres.',
          'error'
        );
      }
    });

    // Splash Image Uploader binding
    this.setupImageUploader({
      fileInputId: '#pSplashImgFileInput',
      urlInputId: '#pSplashImgUrl',
      previewId: '#pSplashImgPreview',
      progressBoxId: '#pSplashUploadProgress',
      folder: 'nidj_juice/products',
      onSuccessToast: 'Éclaboussure de fruits sauvegardée sur Cloudinary !',
      container: modalContainer as HTMLElement
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
        splashImage: (modalContainer.querySelector('#pSplashImgUrl') as HTMLInputElement)?.value.trim() || p.splashImage || '',
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
          vitaminC: (modalContainer.querySelector('#pNutVitC') as HTMLInputElement)?.value.trim() || p.nutrition?.vitaminC || 'Riche en vitamine C naturelle',
          antioxidants: (modalContainer.querySelector('#pNutAntiOx') as HTMLInputElement)?.value.trim() || p.nutrition?.antioxidants || 'Fort pouvoir antioxydant'
        }
      };

      cmsService.saveProduct(updatedProduct);
      closeModal();
      this.render();
      this.showToast(`Saveur « ${updatedProduct.name} » enregistrée !`, 'success');
    });
  }

  // =========================================================================
  // 5B. COLLECTION EDIT MODAL (AGENCY STANDARD)
  // =========================================================================
  private openCollectionModal(collectionId: string | null): void {
    const isNew = !collectionId;
    const c: JuiceCollection = (collectionId && cmsService.getCollectionById(collectionId)) || {
      id: `collection-${Date.now()}`,
      name: 'Nouvelle Collection',
      slug: 'nouvelle-collection',
      tagline: 'L’excellence des vergers camerounais',
      description: 'Une gamme de nectars authentiques alliant fraîcheur et bienfaits naturels.',
      accentColor: '#58A826',
      badge: 'Gamme Exclusive',
      bannerImage: '/assets/images/gallery-1.webp',
      featured: false,
      sortOrder: cmsService.getCollections().length + 1
    };

    const modalContainer = this.element.querySelector('#boModalContainer');
    if (!modalContainer) return;

    modalContainer.innerHTML = `
      <div class="bo-modal-overlay">
        <form class="bo-modal" id="boCollectionEditForm" style="max-width: 640px;">
          <div class="bo-modal-header">
            <div class="bo-modal-title-group">
              <h2>${isNew ? 'Créer une Nouvelle Collection' : `Modifier la Collection : ${c.name}`}</h2>
              <p class="bo-modal-subtitle">Gamme de jus et univers de marque Société Nidjeu</p>
            </div>
            <button type="button" class="bo-modal-close-btn" id="closeCollectionModalBtn" title="Fermer">
              ${BO_ICONS.close}
            </button>
          </div>

          <div class="bo-modal-body">
            <div class="bo-form-grid-2">
              <div class="bo-form-group">
                <label class="bo-label">Nom de la Collection</label>
                <input type="text" id="collName" class="bo-input" value="${c.name}" required />
              </div>
              <div class="bo-form-group">
                <label class="bo-label">
                  <span>Identifiant / Slug</span>
                  <span class="bo-label-hint">minuscules & tirets</span>
                </label>
                <input type="text" id="collSlug" class="bo-input" value="${c.slug || c.id}" required />
              </div>
            </div>

            <div class="bo-form-grid-2">
              <div class="bo-form-group">
                <label class="bo-label">Slogan d'Accroche (Tagline)</label>
                <input type="text" id="collTagline" class="bo-input" value="${c.tagline || ''}" placeholder="Ex: L'or pur des vergers" />
              </div>
              <div class="bo-form-group">
                <label class="bo-label">Badge de Prestige</label>
                <input type="text" id="collBadge" class="bo-input" value="${c.badge || 'Gamme Spéciale'}" placeholder="Ex: Prestige Camerounais" />
              </div>
            </div>

            <div class="bo-form-group">
              <label class="bo-label">Description Complète</label>
              <textarea id="collDesc" class="bo-textarea" rows="3" required>${c.description}</textarea>
            </div>

            <div class="bo-form-grid-2">
              <div class="bo-form-group">
                <label class="bo-label">Couleur Thématique Accent</label>
                <div style="display: flex; gap: 10px; align-items: center;">
                  <input type="color" id="collColorPicker" value="${c.accentColor || '#58A826'}" style="width: 44px; height: 38px; border: 1px solid var(--bo-border); border-radius: var(--bo-radius-sm); cursor: pointer; padding: 2px;" />
                  <input type="text" id="collColorText" class="bo-input" value="${c.accentColor || '#58A826'}" style="flex: 1;" />
                </div>
              </div>
              <div class="bo-form-group">
                <label class="bo-label">Ordre d'Affichage</label>
                <input type="number" id="collSortOrder" class="bo-input" value="${c.sortOrder || 1}" min="1" max="99" />
              </div>
            </div>

            <!-- Banner Image Uploader -->
            <div class="bo-form-group">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <label class="bo-label" style="margin: 0;">Bannière Visuelle de la Collection</label>
                <span style="font-size: 11px; color: var(--bo-brand-green); font-weight: 700; display: inline-flex; align-items: center; gap: 4px;">
                  ${BO_ICONS.cloud} <span>CDN Cloudinary</span>
                </span>
              </div>
              <div class="bo-modal-image-row" style="display: flex; gap: 14px; align-items: center; background: var(--bo-surface-subtle); padding: 12px; border-radius: var(--bo-radius-md); border: 1px solid var(--bo-border);">
                <div style="width: 100px; height: 60px; background: #FFF; border-radius: var(--bo-radius-sm); border: 1px solid var(--bo-border); display: flex; align-items: center; justify-content: center; overflow: hidden; flex-shrink: 0;">
                  <img id="collBannerPreview" src="${c.bannerImage || '/assets/images/gallery-1.webp'}" alt="Bannière" style="width: 100%; height: 100%; object-fit: cover;" />
                </div>
                <div style="flex: 1; min-width: 0;">
                  <input type="text" id="collBannerUrl" class="bo-input" value="${c.bannerImage || ''}" placeholder="URL image Cloudinary ou locale" style="margin-bottom: 8px;" />
                  <label class="bo-upload-action-btn" style="cursor: pointer;">
                    ${BO_ICONS.camera} <span>Téléverser vers Cloudinary</span>
                    <input type="file" id="collBannerFile" accept="image/*" style="display: none;" />
                  </label>
                  <div id="collBannerProgress" style="display: none;"></div>
                </div>
              </div>
            </div>

            <div class="bo-form-group" style="margin-top: 10px;">
              <label style="display: flex; align-items: center; gap: 10px; cursor: pointer; font-size: 13px; font-weight: 600; color: var(--bo-forest);">
                <input type="checkbox" id="collFeatured" ${c.featured ? 'checked' : ''} style="width: 18px; height: 18px; accent-color: var(--bo-brand-green);" />
                <span>Mettre cette collection en vedette</span>
              </label>
            </div>
          </div>

          <div class="bo-modal-footer">
            <button type="button" class="bo-btn-secondary" id="cancelCollBtn">Annuler</button>
            <button type="submit" class="bo-btn-primary" id="saveCollBtn">
              ${BO_ICONS.check}
              <span>${isNew ? 'Créer la Collection' : 'Enregistrer les Modifications'}</span>
            </button>
          </div>
        </form>
      </div>
    `;

    // Modal Close Handlers
    const overlay = modalContainer.querySelector('.bo-modal-overlay');
    const closeBtn = modalContainer.querySelector('#closeCollectionModalBtn');
    const cancelBtn = modalContainer.querySelector('#cancelCollBtn');
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    const closeModal = () => {
      modalContainer.innerHTML = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
    closeBtn?.addEventListener('click', closeModal);
    cancelBtn?.addEventListener('click', closeModal);
    overlay?.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });
    window.addEventListener('keydown', handleKeyDown);

    // Live Color Picker Sync
    const colorPicker = modalContainer.querySelector('#collColorPicker') as HTMLInputElement;
    const colorText = modalContainer.querySelector('#collColorText') as HTMLInputElement;
    colorPicker?.addEventListener('input', () => {
      colorText.value = colorPicker.value;
    });
    colorText?.addEventListener('input', () => {
      if (/^#[0-9A-F]{6}$/i.test(colorText.value)) {
        colorPicker.value = colorText.value;
      }
    });

    // Auto slug on typing name if new
    const nameInput = modalContainer.querySelector('#collName') as HTMLInputElement;
    const slugInput = modalContainer.querySelector('#collSlug') as HTMLInputElement;
    if (isNew) {
      nameInput?.addEventListener('input', () => {
        slugInput.value = nameInput.value
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');
      });
    }

    // Banner Uploader
    this.setupImageUploader({
      fileInputId: '#collBannerFile',
      urlInputId: '#collBannerUrl',
      previewId: '#collBannerPreview',
      progressBoxId: '#collBannerProgress',
      folder: 'nidj_juice/collections',
      onSuccessToast: 'Bannière de collection sauvegardée sur Cloudinary !',
      container: modalContainer as HTMLElement
    });

    // Form Submit
    const form = modalContainer.querySelector('#boCollectionEditForm') as HTMLFormElement;
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const updatedCollection: JuiceCollection = {
        ...c,
        id: slugInput.value.trim().toLowerCase() || c.id,
        name: nameInput.value.trim(),
        slug: slugInput.value.trim().toLowerCase(),
        tagline: (modalContainer.querySelector('#collTagline') as HTMLInputElement).value.trim(),
        description: (modalContainer.querySelector('#collDesc') as HTMLTextAreaElement).value.trim(),
        accentColor: colorText.value.trim() || '#58A826',
        badge: (modalContainer.querySelector('#collBadge') as HTMLInputElement).value.trim() || 'Gamme Exclusive',
        bannerImage: (modalContainer.querySelector('#collBannerUrl') as HTMLInputElement).value.trim() || c.bannerImage,
        sortOrder: parseInt((modalContainer.querySelector('#collSortOrder') as HTMLInputElement).value, 10) || 1,
        featured: (modalContainer.querySelector('#collFeatured') as HTMLInputElement).checked
      };

      cmsService.saveCollection(updatedCollection);
      closeModal();
      this.render();
      this.showToast(`Collection « ${updatedCollection.name} » enregistrée !`, 'success');
    });
  }

  // =========================================================================
  // 5C. CUSTOM PAGE EDIT MODAL (AGENCY STANDARD)
  // =========================================================================
  private openCustomPageModal(pageId: string | null): void {
    const isNew = !pageId;
    const p: CmsCustomPage = (pageId && cmsService.getCustomPageBySlug(pageId)) || {
      id: `nouvelle-page-${Date.now()}`,
      title: 'Nouvelle Page Éditoriale',
      subtitle: 'Sous-titre et présentation thématique',
      metaDescription: 'Découvrez cette page officielle de la Société Nidjeu au Cameroun.',
      heroBannerImage: '/assets/images/gallery-2.webp',
      content: `<h2>L'excellence au cœur de nos nectars</h2>\n<p>Bienvenue sur cette page dédiée à nos innovations et nos engagements culinaires et artisanaux.</p>\n<p>Retrouvez ici des inspirations uniques, des conseils et nos actualités camerounaises.</p>`,
      ctaText: 'Commander nos Saveurs',
      ctaLink: '/saveurs',
      showInNav: false,
      showInFooter: true,
      isPublished: true,
      lastModified: new Date().toISOString()
    };

    const modalContainer = this.element.querySelector('#boModalContainer');
    if (!modalContainer) return;

    modalContainer.innerHTML = `
      <div class="bo-modal-overlay">
        <form class="bo-modal" id="boCustomPageEditForm" style="max-width: 720px;">
          <div class="bo-modal-header">
            <div class="bo-modal-title-group">
              <h2>${isNew ? 'Créer une Nouvelle Page CMS' : `Modifier la Page : ${p.title}`}</h2>
              <p class="bo-modal-subtitle">Page dynamique accessible sur l'URL /page/<strong>${p.id}</strong></p>
            </div>
            <button type="button" class="bo-modal-close-btn" id="closeCustomPageModalBtn" title="Fermer">
              ${BO_ICONS.close}
            </button>
          </div>

          <div class="bo-modal-body">
            <div class="bo-form-grid-2">
              <div class="bo-form-group">
                <label class="bo-label">
                  <span>Slug URL de la Page</span>
                  <span class="bo-label-hint">minuscules, tirets uniquement</span>
                </label>
                <div style="display: flex; align-items: center; gap: 4px;">
                  <span style="font-size: 13px; font-weight: 700; color: var(--bo-brand-green); font-family: monospace;">/page/</span>
                  <input type="text" id="cpId" class="bo-input" value="${p.id}" ${!isNew ? 'readonly style="opacity:0.7;"' : ''} placeholder="ex: partenariats-pro" required />
                </div>
              </div>
              <div class="bo-form-group">
                <label class="bo-label">Grand Titre Principal de la Page</label>
                <input type="text" id="cpTitle" class="bo-input" value="${p.title}" required />
              </div>
            </div>

            <div class="bo-form-grid-2">
              <div class="bo-form-group">
                <label class="bo-label">Sous-titre / Slogan Héro</label>
                <input type="text" id="cpSubtitle" class="bo-input" value="${p.subtitle || ''}" />
              </div>
              <div class="bo-form-group">
                <label class="bo-label">Description SEO & Partage (Meta)</label>
                <input type="text" id="cpMetaDesc" class="bo-input" value="${p.metaDescription || ''}" placeholder="Courte phrase optimisée Google" />
              </div>
            </div>

            <!-- Hero Banner Image -->
            <div class="bo-form-group">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <label class="bo-label" style="margin: 0;">Image Bannière Héro de la Page</label>
                <span style="font-size: 11px; color: var(--bo-brand-green); font-weight: 700; display: inline-flex; align-items: center; gap: 4px;">
                  ${BO_ICONS.cloud} <span>CDN Cloudinary</span>
                </span>
              </div>
              <div class="bo-modal-image-row" style="display: flex; gap: 14px; align-items: center; background: var(--bo-surface-subtle); padding: 12px; border-radius: var(--bo-radius-md); border: 1px solid var(--bo-border);">
                <div style="width: 100px; height: 60px; background: #FFF; border-radius: var(--bo-radius-sm); border: 1px solid var(--bo-border); display: flex; align-items: center; justify-content: center; overflow: hidden; flex-shrink: 0;">
                  <img id="cpBannerPreview" src="${p.heroBannerImage || '/assets/images/gallery-2.webp'}" alt="Bannière" style="width: 100%; height: 100%; object-fit: cover;" />
                </div>
                <div style="flex: 1; min-width: 0;">
                  <input type="text" id="cpBannerUrl" class="bo-input" value="${p.heroBannerImage || ''}" placeholder="URL image Cloudinary ou locale" style="margin-bottom: 8px;" />
                  <label class="bo-upload-action-btn" style="cursor: pointer;">
                    ${BO_ICONS.camera} <span>Téléverser vers Cloudinary</span>
                    <input type="file" id="cpBannerFile" accept="image/*" style="display: none;" />
                  </label>
                  <div id="cpBannerProgress" style="display: none;"></div>
                </div>
              </div>
            </div>

            <!-- Main Content HTML/Markdown Area -->
            <div class="bo-form-group">
              <label class="bo-label">
                <span>Corps & Contenu Éditorial de la Page</span>
                <span class="bo-label-hint">HTML structuré (&lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, etc.)</span>
              </label>
              <textarea id="cpContent" class="bo-textarea" rows="8" style="font-family: monospace; font-size: 13px;" required>${p.content}</textarea>
            </div>

            <div class="bo-form-grid-2">
              <div class="bo-form-group">
                <label class="bo-label">Texte du Bouton d'Action (CTA)</label>
                <input type="text" id="cpCtaText" class="bo-input" value="${p.ctaText || 'Commander nos Saveurs'}" />
              </div>
              <div class="bo-form-group">
                <label class="bo-label">Lien du Bouton d'Action</label>
                <input type="text" id="cpCtaLink" class="bo-input" value="${p.ctaLink || '/saveurs'}" />
              </div>
            </div>

            <!-- Publication & Visibility Options -->
            <div style="background: var(--bo-surface-subtle); padding: 14px 16px; border-radius: var(--bo-radius-md); border: 1px solid var(--bo-border); margin-top: 8px;">
              <div style="font-size: 13px; font-weight: 700; color: var(--bo-forest); margin-bottom: 10px;">Options de Visibilité & Publication</div>
              
              <div style="display: flex; flex-direction: column; gap: 8px;">
                <label style="display: flex; align-items: center; gap: 10px; cursor: pointer; font-size: 13px; font-weight: 600; color: var(--bo-text-primary);">
                  <input type="checkbox" id="cpIsPublished" ${p.isPublished ? 'checked' : ''} style="width: 18px; height: 18px; accent-color: var(--bo-brand-green);" />
                  <span>Publier immédiatement cette page (Statut En Ligne)</span>
                </label>

                <label style="display: flex; align-items: center; gap: 10px; cursor: pointer; font-size: 13px; color: var(--bo-text-secondary);">
                  <input type="checkbox" id="cpShowInNav" ${p.showInNav ? 'checked' : ''} style="width: 18px; height: 18px; accent-color: var(--bo-brand-green);" />
                  <span>Afficher le lien dans le menu principal de navigation (Header & Menu Mobile)</span>
                </label>

                <label style="display: flex; align-items: center; gap: 10px; cursor: pointer; font-size: 13px; color: var(--bo-text-secondary);">
                  <input type="checkbox" id="cpShowInFooter" ${p.showInFooter ? 'checked' : ''} style="width: 18px; height: 18px; accent-color: var(--bo-brand-green);" />
                  <span>Afficher le lien dans le pied de page (Footer)</span>
                </label>
              </div>
            </div>
          </div>

          <div class="bo-modal-footer">
            <button type="button" class="bo-btn-secondary" id="cancelCustomPageBtn">Annuler</button>
            <button type="submit" class="bo-btn-primary" id="saveCustomPageBtn">
              ${BO_ICONS.check}
              <span>${isNew ? 'Publier la Page' : 'Enregistrer la Page'}</span>
            </button>
          </div>
        </form>
      </div>
    `;

    // Modal Close Handlers
    const overlay = modalContainer.querySelector('.bo-modal-overlay');
    const closeBtn = modalContainer.querySelector('#closeCustomPageModalBtn');
    const cancelBtn = modalContainer.querySelector('#cancelCustomPageBtn');
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    const closeModal = () => {
      modalContainer.innerHTML = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
    closeBtn?.addEventListener('click', closeModal);
    cancelBtn?.addEventListener('click', closeModal);
    overlay?.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });
    window.addEventListener('keydown', handleKeyDown);

    // Auto slug on typing title if new
    const titleInput = modalContainer.querySelector('#cpTitle') as HTMLInputElement;
    const idInput = modalContainer.querySelector('#cpId') as HTMLInputElement;
    if (isNew) {
      titleInput?.addEventListener('input', () => {
        idInput.value = titleInput.value
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');
      });
    }

    // Hero Banner Uploader
    this.setupImageUploader({
      fileInputId: '#cpBannerFile',
      urlInputId: '#cpBannerUrl',
      previewId: '#cpBannerPreview',
      progressBoxId: '#cpBannerProgress',
      folder: 'nidj_juice/pages',
      onSuccessToast: 'Bannière de la page sauvegardée sur Cloudinary !',
      container: modalContainer as HTMLElement
    });

    // Form Submit
    const form = modalContainer.querySelector('#boCustomPageEditForm') as HTMLFormElement;
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const rawId = idInput.value
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, '-');
      const updatedPage: CmsCustomPage = {
        ...p,
        id: rawId || p.id,
        title: titleInput.value.trim(),
        subtitle: (modalContainer.querySelector('#cpSubtitle') as HTMLInputElement).value.trim(),
        metaDescription: (modalContainer.querySelector('#cpMetaDesc') as HTMLInputElement).value.trim(),
        heroBannerImage: (modalContainer.querySelector('#cpBannerUrl') as HTMLInputElement).value.trim() || p.heroBannerImage,
        content: (modalContainer.querySelector('#cpContent') as HTMLTextAreaElement).value.trim(),
        ctaText: (modalContainer.querySelector('#cpCtaText') as HTMLInputElement).value.trim(),
        ctaLink: (modalContainer.querySelector('#cpCtaLink') as HTMLInputElement).value.trim(),
        isPublished: (modalContainer.querySelector('#cpIsPublished') as HTMLInputElement).checked,
        showInNav: (modalContainer.querySelector('#cpShowInNav') as HTMLInputElement).checked,
        showInFooter: (modalContainer.querySelector('#cpShowInFooter') as HTMLInputElement).checked,
        lastModified: new Date().toISOString()
      };

      cmsService.saveCustomPage(updatedPage);
      closeModal();
      this.render();
      this.showToast(`Page « ${updatedPage.title} » enregistrée avec succès !`, 'success');
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
        <form class="bo-modal" id="boStoreEditForm" style="max-width: 600px;">
          <div class="bo-modal-header">
            <div class="bo-modal-title-group">
              <h2>${isNew ? 'Ajouter un Point de Vente' : `Modifier : ${s.name}`}</h2>
              <p class="bo-modal-subtitle">Réseau officiel de distribution au Cameroun</p>
            </div>
            <button type="button" class="bo-modal-close-btn" id="closeStoreModalBtn" title="Fermer">
              ${BO_ICONS.close}
            </button>
          </div>

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

              <!-- Store Photo Uploader -->
              <div class="bo-form-group">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                  <label class="bo-label" style="margin: 0;">Photo de la Façade / Rayon</label>
                  <span style="font-size: 11px; color: var(--bo-brand-green); font-weight: 700; display: inline-flex; align-items: center; gap: 4px;">
                    ${BO_ICONS.cloud}
                    <span>CDN Cloudinary</span>
                  </span>
                </div>
                <div class="bo-modal-image-row" style="display: flex; gap: 14px; align-items: center; background: var(--bo-surface-subtle); padding: 12px; border-radius: var(--bo-radius-md); border: 1px solid var(--bo-border);">
                  <div style="width: 75px; height: 60px; background: #FFFFFF; border-radius: var(--bo-radius-sm); border: 1px solid var(--bo-border); display: flex; align-items: center; justify-content: center; overflow: hidden; flex-shrink: 0;">
                    <img id="sImgPreview" src="${s.image || '/assets/images/store-supermarket.jpg'}" alt="Point de Vente" style="max-height: 100%; max-width: 100%; object-fit: cover;" />
                  </div>
                  <div style="flex: 1; min-width: 0;">
                    <input type="text" id="sImgUrl" class="bo-input" value="${s.image || '/assets/images/store-supermarket.jpg'}" placeholder="URL Cloudinary ou chemin local" style="margin-bottom: 8px;" />
                    <label class="bo-upload-action-btn" style="cursor: pointer;">
                      ${BO_ICONS.camera}
                      <span>Téléverser vers Cloudinary</span>
                      <input type="file" id="sImgFileInput" accept="image/*" style="display: none;" />
                    </label>
                    <div id="sUploadProgress" style="display: none;"></div>
                  </div>
                </div>
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
    `;

    const overlay = modalContainer.querySelector('.bo-modal-overlay');
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    const closeModal = () => {
      modalContainer.innerHTML = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
    modalContainer.querySelector('#closeStoreModalBtn')?.addEventListener('click', closeModal);
    modalContainer.querySelector('#cancelStoreModalBtn')?.addEventListener('click', closeModal);
    overlay?.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });
    window.addEventListener('keydown', handleKeyDown);

    // Store Photo Uploader binding
    this.setupImageUploader({
      fileInputId: '#sImgFileInput',
      urlInputId: '#sImgUrl',
      previewId: '#sImgPreview',
      progressBoxId: '#sUploadProgress',
      folder: 'nidj_juice/stores',
      onSuccessToast: 'Photo du point de vente sauvegardée sur Cloudinary !',
      container: modalContainer as HTMLElement
    });

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
        openingHours: (modalContainer.querySelector('#sHours') as HTMLInputElement).value.trim(),
        image: (modalContainer.querySelector('#sImgUrl') as HTMLInputElement)?.value.trim() || s.image
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
        <form class="bo-modal" id="boGalleryEditForm" style="max-width: 600px;">
          <div class="bo-modal-header">
            <div class="bo-modal-title-group">
              <h2>${isNew ? 'Ajouter une Photo à la Galerie' : `Modifier : ${g.title}`}</h2>
              <p class="bo-modal-subtitle">Moments officiels et dégustations</p>
            </div>
            <button type="button" class="bo-modal-close-btn" id="closeGalleryModalBtn" title="Fermer">
              ${BO_ICONS.close}
            </button>
          </div>

          <div class="bo-modal-body">
              <div class="bo-form-group">
                <label class="bo-label">Titre du Moment / Événement</label>
                <input type="text" id="gTitle" class="bo-input" value="${g.title}" required />
              </div>

              <!-- Image Uploader -->
              <div class="bo-form-group">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                  <label class="bo-label" style="margin: 0;">Photo de l'Événement</label>
                  <span style="font-size: 11px; color: var(--bo-brand-green); font-weight: 700; display: inline-flex; align-items: center; gap: 4px;">
                    ${BO_ICONS.cloud}
                    <span>CDN Cloudinary</span>
                  </span>
                </div>
                <div class="bo-modal-image-row" style="display: flex; gap: 14px; align-items: center; background: var(--bo-surface-subtle); padding: 12px; border-radius: var(--bo-radius-md); border: 1px solid var(--bo-border);">
                  <div style="width: 80px; height: 60px; background: #FFFFFF; border-radius: var(--bo-radius-sm); border: 1px solid var(--bo-border); overflow: hidden; flex-shrink: 0;">
                    <img id="gImgPreview" src="${g.image}" alt="Aperçu" style="width: 100%; height: 100%; object-fit: cover;" />
                  </div>
                  <div style="flex: 1; min-width: 0;">
                    <input type="text" id="gImgUrl" class="bo-input" value="${g.image}" placeholder="URL Cloudinary ou chemin local" style="margin-bottom: 6px;" />
                    <label class="bo-upload-action-btn" style="cursor: pointer;">
                      ${BO_ICONS.camera}
                      <span>Téléverser vers Cloudinary</span>
                      <input type="file" id="gImgFileInput" accept="image/*" style="display: none;" />
                    </label>
                    <div id="gUploadProgress" style="display: none;"></div>
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
    `;

    const overlay = modalContainer.querySelector('.bo-modal-overlay');
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    const closeModal = () => {
      modalContainer.innerHTML = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
    modalContainer.querySelector('#closeGalleryModalBtn')?.addEventListener('click', closeModal);
    modalContainer.querySelector('#cancelGalleryModalBtn')?.addEventListener('click', closeModal);
    overlay?.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });
    window.addEventListener('keydown', handleKeyDown);

    const imgInput = modalContainer.querySelector('#gImgFileInput') as HTMLInputElement;
    const imgUrlInput = modalContainer.querySelector('#gImgUrl') as HTMLInputElement;
    const imgPreview = modalContainer.querySelector('#gImgPreview') as HTMLImageElement;

    imgUrlInput?.addEventListener('input', () => (imgPreview.src = imgUrlInput.value));
    imgInput?.addEventListener('change', async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const progressBox = modalContainer.querySelector('#gUploadProgress') as HTMLElement;
      const saveBtn = modalContainer.querySelector('button[type="submit"]') as HTMLButtonElement;

      if (cloudinaryService.isConfigured()) {
        try {
          if (progressBox) {
            progressBox.style.display = 'block';
            progressBox.innerHTML = `
              <div class="bo-upload-progress-box">
                <div class="bo-upload-progress-header">
                  <span>Envoi photo vers Cloudinary...</span>
                  <span id="gUploadPercent">0%</span>
                </div>
                <div class="bo-upload-progress-track">
                  <div class="bo-upload-progress-fill" id="gUploadFill" style="width: 0%;"></div>
                </div>
              </div>
            `;
          }
          if (saveBtn) {
            saveBtn.disabled = true;
            saveBtn.innerHTML = `${BO_ICONS.loader} <span>Upload en cours...</span>`;
          }

          // Local instant preview
          imgPreview.src = URL.createObjectURL(file);

          const result = await cloudinaryService.upload(file, {
            resourceType: 'image',
            folder: 'nidj_juice/gallery',
            onProgress: (percent) => {
              const pLabel = modalContainer.querySelector('#gUploadPercent');
              const pFill = modalContainer.querySelector('#gUploadFill') as HTMLElement;
              if (pLabel) pLabel.textContent = `${percent}%`;
              if (pFill) pFill.style.width = `${percent}%`;
            }
          });

          imgUrlInput.value = result.secureUrl;
          imgPreview.src = result.secureUrl;
          this.showToast('Photo de galerie sauvegardée sur Cloudinary !', 'success');
        } catch (err: any) {
          console.error('Cloudinary gallery upload error', err);
          this.showToast(`Échec Cloudinary : ${err.message}`, 'error');
          const reader = new FileReader();
          reader.onload = (evt) => {
            const dataUrl = evt.target?.result as string;
            imgPreview.src = dataUrl;
            imgUrlInput.value = dataUrl;
          };
          reader.readAsDataURL(file);
        } finally {
          if (progressBox) progressBox.style.display = 'none';
          if (saveBtn) {
            saveBtn.disabled = false;
            saveBtn.innerHTML = `${BO_ICONS.check} <span>Enregistrer</span>`;
          }
        }
      } else {
        const reader = new FileReader();
        reader.onload = (evt) => {
          const dataUrl = evt.target?.result as string;
          imgPreview.src = dataUrl;
          imgUrlInput.value = dataUrl;
        };
        reader.readAsDataURL(file);
        this.showToast(
          'Photo chargée localement. Pour héberger sur Cloudinary, configurez vos identifiants dans les Paramètres.',
          'error'
        );
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
        <form class="bo-modal" id="boReelEditForm" style="max-width: 550px;">
          <div class="bo-modal-header">
            <div class="bo-modal-title-group">
              <h2>${isNew ? 'Ajouter une Vidéo Reel' : `Modifier : ${r.title}`}</h2>
              <p class="bo-modal-subtitle">Contenu vidéo mobile • #NidjJuiceVibes</p>
            </div>
            <button type="button" class="bo-modal-close-btn" id="closeReelModalBtn" title="Fermer">
              ${BO_ICONS.close}
            </button>
          </div>

          <div class="bo-modal-body">
              <div class="bo-form-group">
                <label class="bo-label">Titre du Reel</label>
                <input type="text" id="rTitle" class="bo-input" value="${r.title}" required />
              </div>

              <div class="bo-form-group">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                  <label class="bo-label" style="margin: 0;">Fichier Vidéo du Reel (.mp4, .webm, .mov)</label>
                  <span style="font-size: 11px; color: var(--bo-brand-green); font-weight: 700; display: inline-flex; align-items: center; gap: 4px;">
                    ${BO_ICONS.cloud}
                    <span>CDN Cloudinary</span>
                  </span>
                </div>
                <div style="background: var(--bo-surface-subtle); padding: 14px; border-radius: var(--bo-radius-md); border: 1px solid var(--bo-border);">
                  <div style="display: flex; gap: 10px; align-items: center; margin-bottom: 8px; flex-wrap: wrap;">
                    <label class="bo-upload-action-btn" style="cursor: pointer;">
                      ${BO_ICONS.film}
                      <span>Choisir une vidéo (.mp4, .mov, .webm)</span>
                      <input type="file" id="rVideoFileInput" accept="video/*" style="display: none;" />
                    </label>
                    <span style="font-size: 11.5px; color: var(--bo-text-muted);">
                      Téléversement direct sur Cloudinary
                    </span>
                  </div>

                  <input type="text" id="rSrc" class="bo-input" value="${r.src}" placeholder="URL Cloudinary (https://res.cloudinary.com/...)" required />

                  <div id="rUploadProgress" style="display: none;"></div>

                  <div class="bo-video-preview-box" id="rVideoPreviewWrapper" style="${r.src ? '' : 'display: none;'}">
                    <video id="rVideoPreview" src="${r.src}" controls playsinline style="max-width: 100%; max-height: 200px; border-radius: var(--bo-radius-sm);"></video>
                  </div>
                </div>
              </div>

              <!-- Poster Thumbnail Uploader -->
              <div class="bo-form-group">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                  <label class="bo-label" style="margin: 0;">Image Miniature / Poster (.webp, .jpg, .png)</label>
                  <span style="font-size: 11px; color: var(--bo-brand-green); font-weight: 700; display: inline-flex; align-items: center; gap: 4px;">
                    ${BO_ICONS.cloud}
                    <span>CDN Cloudinary</span>
                  </span>
                </div>
                <div class="bo-modal-image-row" style="display: flex; gap: 14px; align-items: center; background: var(--bo-surface-subtle); padding: 12px; border-radius: var(--bo-radius-md); border: 1px solid var(--bo-border);">
                  <div style="width: 60px; height: 75px; background: #000; border-radius: var(--bo-radius-sm); border: 1px solid var(--bo-border); display: flex; align-items: center; justify-content: center; overflow: hidden; flex-shrink: 0;">
                    <img id="rPosterPreview" src="${r.poster || ''}" alt="Poster" style="max-height: 100%; max-width: 100%; object-fit: cover; ${r.poster ? '' : 'display: none;'}" />
                  </div>
                  <div style="flex: 1; min-width: 0;">
                    <input type="text" id="rPosterUrl" class="bo-input" value="${r.poster || ''}" placeholder="URL Miniature Cloudinary (optionnel)" style="margin-bottom: 8px;" />
                    <label class="bo-upload-action-btn" style="cursor: pointer;">
                      ${BO_ICONS.camera}
                      <span>Téléverser Miniature vers Cloudinary</span>
                      <input type="file" id="rPosterFileInput" accept="image/*" style="display: none;" />
                    </label>
                    <div id="rPosterUploadProgress" style="display: none;"></div>
                  </div>
                </div>
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
    `;

    const overlay = modalContainer.querySelector('.bo-modal-overlay');
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    const closeModal = () => {
      modalContainer.innerHTML = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
    modalContainer.querySelector('#closeReelModalBtn')?.addEventListener('click', closeModal);
    modalContainer.querySelector('#cancelReelModalBtn')?.addEventListener('click', closeModal);
    overlay?.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });
    window.addEventListener('keydown', handleKeyDown);

    const videoInput = modalContainer.querySelector('#rVideoFileInput') as HTMLInputElement;
    const videoSrcInput = modalContainer.querySelector('#rSrc') as HTMLInputElement;
    const videoPreview = modalContainer.querySelector('#rVideoPreview') as HTMLVideoElement;
    const videoPreviewWrapper = modalContainer.querySelector('#rVideoPreviewWrapper') as HTMLElement;
    const progressBox = modalContainer.querySelector('#rUploadProgress') as HTMLElement;
    const saveBtn = modalContainer.querySelector('button[type="submit"]') as HTMLButtonElement;

    videoSrcInput?.addEventListener('input', () => {
      const val = videoSrcInput.value.trim();
      if (val) {
        videoPreview.src = val;
        videoPreviewWrapper.style.display = 'flex';
      } else {
        videoPreviewWrapper.style.display = 'none';
      }
    });

    videoInput?.addEventListener('change', async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      if (cloudinaryService.isConfigured()) {
        try {
          if (progressBox) {
            progressBox.style.display = 'block';
            progressBox.innerHTML = `
              <div class="bo-upload-progress-box">
                <div class="bo-upload-progress-header">
                  <span>Téléversement vidéo vers Cloudinary...</span>
                  <span id="rUploadPercent">0%</span>
                </div>
                <div class="bo-upload-progress-track">
                  <div class="bo-upload-progress-fill" id="rUploadFill" style="width: 0%;"></div>
                </div>
              </div>
            `;
          }
          if (saveBtn) {
            saveBtn.disabled = true;
            saveBtn.innerHTML = `${BO_ICONS.loader} <span>Upload Vidéo en cours...</span>`;
          }

          // Local preview
          videoPreview.src = URL.createObjectURL(file);
          videoPreviewWrapper.style.display = 'flex';

          const result = await cloudinaryService.upload(file, {
            resourceType: 'video',
            folder: 'nidj_juice/reels',
            onProgress: (percent) => {
              const pLabel = modalContainer.querySelector('#rUploadPercent');
              const pFill = modalContainer.querySelector('#rUploadFill') as HTMLElement;
              if (pLabel) pLabel.textContent = `${percent}%`;
              if (pFill) pFill.style.width = `${percent}%`;
            }
          });

          videoSrcInput.value = result.secureUrl;
          videoPreview.src = result.secureUrl;
          this.showToast('Vidéo Reel sauvegardée sur Cloudinary avec succès !', 'success');
        } catch (err: any) {
          console.error('Cloudinary video upload error', err);
          this.showToast(`Échec du téléversement vidéo : ${err.message}`, 'error');
        } finally {
          if (progressBox) progressBox.style.display = 'none';
          if (saveBtn) {
            saveBtn.disabled = false;
            saveBtn.innerHTML = `${BO_ICONS.check} <span>Enregistrer</span>`;
          }
        }
      } else {
        this.showToast(
          'Pour téléverser vos vidéos sur Cloudinary, renseignez vos identifiants dans l\'onglet Paramètres.',
          'error'
        );
      }
    });

    // Poster Thumbnail Uploader binding
    this.setupImageUploader({
      fileInputId: '#rPosterFileInput',
      urlInputId: '#rPosterUrl',
      previewId: '#rPosterPreview',
      progressBoxId: '#rPosterUploadProgress',
      folder: 'nidj_juice/reels',
      onSuccessToast: 'Miniature du Reel sauvegardée sur Cloudinary !',
      container: modalContainer as HTMLElement
    });

    const form = modalContainer.querySelector('#boReelEditForm') as HTMLFormElement;
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const updatedReel: VideoReel = {
        ...r,
        title: (modalContainer.querySelector('#rTitle') as HTMLInputElement).value.trim(),
        src: videoSrcInput.value.trim() || r.src,
        poster: (modalContainer.querySelector('#rPosterUrl') as HTMLInputElement)?.value.trim() || r.poster || '',
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
  // 8. REUSABLE CLOUDINARY IMAGE UPLOADER HANDLER
  // =========================================================================
  private setupImageUploader(options: {
    fileInputId: string;
    urlInputId: string;
    previewId: string;
    progressBoxId: string;
    folder: string;
    onSuccessToast?: string;
    container?: HTMLElement;
  }): void {
    const root = options.container || this.element;
    const fileInput = root.querySelector(options.fileInputId) as HTMLInputElement;
    const urlInput = root.querySelector(options.urlInputId) as HTMLInputElement;
    const preview = root.querySelector(options.previewId) as HTMLImageElement;
    const progressBox = root.querySelector(options.progressBoxId) as HTMLElement;

    if (!fileInput || !urlInput) return;

    urlInput.addEventListener('input', () => {
      const val = urlInput.value.trim();
      if (preview && val) {
        preview.src = val;
        preview.style.display = 'block';
      }
    });

    fileInput.addEventListener('change', async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      if (cloudinaryService.isConfigured()) {
        try {
          if (progressBox) {
            progressBox.style.display = 'block';
            progressBox.innerHTML = `
              <div class="bo-upload-progress-box">
                <div class="bo-upload-progress-header">
                  <span>Envoi Cloudinary en cours...</span>
                  <span class="upload-percent">0%</span>
                </div>
                <div class="bo-upload-progress-track">
                  <div class="bo-upload-progress-fill" style="width: 0%;"></div>
                </div>
              </div>
            `;
          }

          if (preview) {
            preview.src = URL.createObjectURL(file);
            preview.style.display = 'block';
          }

          const result = await cloudinaryService.upload(file, {
            resourceType: 'image',
            folder: options.folder,
            onProgress: (percent) => {
              const pLabel = progressBox?.querySelector('.upload-percent');
              const pFill = progressBox?.querySelector('.bo-upload-progress-fill') as HTMLElement;
              if (pLabel) pLabel.textContent = `${percent}%`;
              if (pFill) pFill.style.width = `${percent}%`;
            }
          });

          urlInput.value = result.secureUrl;
          if (preview) {
            preview.src = result.secureUrl;
            preview.style.display = 'block';
          }
          this.showToast(options.onSuccessToast || 'Image sauvegardée sur Cloudinary !', 'success');
        } catch (err: any) {
          console.error('Cloudinary upload error', err);
          this.showToast(`Échec Cloudinary : ${err.message}`, 'error');
          const reader = new FileReader();
          reader.onload = (evt) => {
            const dataUrl = evt.target?.result as string;
            if (preview) {
              preview.src = dataUrl;
              preview.style.display = 'block';
            }
            urlInput.value = dataUrl;
          };
          reader.readAsDataURL(file);
        } finally {
          if (progressBox) progressBox.style.display = 'none';
        }
      } else {
        const reader = new FileReader();
        reader.onload = (evt) => {
          const dataUrl = evt.target?.result as string;
          if (preview) {
            preview.src = dataUrl;
            preview.style.display = 'block';
          }
          urlInput.value = dataUrl;
        };
        reader.readAsDataURL(file);
        this.showToast(
          'Image chargée localement. Pour héberger sur Cloudinary, renseignez vos identifiants dans les Paramètres.',
          'error'
        );
      }
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
