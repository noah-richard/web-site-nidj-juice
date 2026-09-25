/* ==========================================================================
   NIDJ JUICE — DYNAMIC CMS CUSTOM PAGE VIEW (/page/:slug)
   Renders user-defined editorial and marketing pages created by administrators
   ========================================================================== */

import { cmsService } from '../services/cms.service';
import type { CmsCustomPage } from '../types/product.types';

export class CustomPageView {
  private element: HTMLElement;
  private slug: string;
  private unsubscribeCms: (() => void) | null = null;

  constructor(path: string) {
    this.element = document.createElement('div');
    this.element.className = 'page page-custom-cms';
    this.slug = path.replace(/^\/page\//, '').replace(/^\//, '');
    this.render();
    this.bindEvents();
  }

  public getElement(): HTMLElement {
    return this.element;
  }

  public destroy(): void {
    if (this.unsubscribeCms) {
      this.unsubscribeCms();
      this.unsubscribeCms = null;
    }
  }

  private bindEvents(): void {
    this.unsubscribeCms = cmsService.onDataChanged(() => {
      this.render();
    });
  }

  private render(): void {
    const page: CmsCustomPage | undefined = cmsService.getCustomPageBySlug(this.slug);
    const isAdmin = cmsService.isAuthenticated();

    if (!page || (!page.isPublished && !isAdmin)) {
      this.element.innerHTML = `
        <section class="page-hero">
          <div class="page-hero-glow" aria-hidden="true"></div>
          <div class="container" style="text-align: center; padding: 60px 20px;">
            <div class="page-hero-tag" style="margin-bottom: 12px;">Information Société Nidjeu</div>
            <h1 class="page-hero-title">Page non disponible</h1>
            <p class="page-hero-subtitle" style="margin: 0 auto 28px auto; max-width: 580px;">
              Cette page est actuellement en cours de préparation ou a été déplacée par l'administration.
            </p>
            <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
              <a href="/" class="btn btn-primary">Retour à l'accueil</a>
              <a href="/saveurs" class="btn btn-outline">Explorer nos saveurs</a>
            </div>
          </div>
        </section>
      `;
      return;
    }

    this.element.innerHTML = `
      <!-- Page Hero Header -->
      <section class="page-hero">
        <div class="page-hero-glow" aria-hidden="true"></div>
        <div class="container">
          <nav class="page-breadcrumbs" aria-label="Fil d'Ariane">
            <a href="/">Accueil</a>
            <span class="breadcrumb-sep">/</span>
            <span>Pages</span>
            <span class="breadcrumb-sep">/</span>
            <span>${page.title}</span>
          </nav>
          
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px;">
            <div class="page-hero-tag" style="margin: 0;">Page Officielle • Société Nidjeu</div>
            ${!page.isPublished ? '<span style="font-size: 11px; font-weight: 700; background: #FEF3C7; color: #92400E; padding: 3px 8px; border-radius: 99px; border: 1px solid #FDE68A;">Brouillon (Non publié)</span>' : ''}
          </div>

          <h1 class="page-hero-title">${page.title}</h1>
          ${page.subtitle ? `<p class="page-hero-subtitle">${page.subtitle}</p>` : ''}
        </div>
      </section>

      <!-- Main Custom Page Body -->
      <div class="container section" style="padding-top: 20px; padding-bottom: 70px;">
        
        ${page.heroBannerImage ? `
          <div class="custom-page-banner-wrap" style="width: 100%; max-height: 420px; border-radius: var(--radius-xl, 16px); overflow: hidden; margin-bottom: 40px; box-shadow: 0 10px 30px rgba(10, 61, 34, 0.08); border: 1px solid rgba(10, 61, 34, 0.1);">
            <img src="${page.heroBannerImage}" alt="${page.title}" style="width: 100%; height: 100%; object-fit: cover; display: block;" />
          </div>
        ` : ''}

        <div class="custom-page-content-card" style="background: #FFFFFF; border: 1px solid rgba(10, 61, 34, 0.1); border-radius: var(--radius-xl, 16px); padding: 40px; box-shadow: 0 4px 20px rgba(0,0,0,0.03); max-width: 920px; margin: 0 auto;">
          <div class="custom-page-rich-content editorial-body" style="font-size: 16px; line-height: 1.8; color: var(--color-text, #2D3748);">
            ${page.content}
          </div>

          ${page.ctaText && page.ctaLink ? `
            <div class="custom-page-cta-box" style="margin-top: 40px; padding-top: 30px; border-top: 1px solid rgba(10, 61, 34, 0.1); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px;">
              <div>
                <span style="font-weight: 700; color: var(--color-forest, #0A3D22); font-size: 15px; display: block;">Envie d'en savoir plus ou de commander ?</span>
                <span style="font-size: 13px; color: #718096;">Nos équipes sont à votre entière disposition à Douala et Yaoundé.</span>
              </div>
              <a href="${page.ctaLink}" class="btn btn-primary">
                <span>${page.ctaText}</span>
                <span class="btn-arrow-circle" aria-hidden="true">↗</span>
              </a>
            </div>
          ` : ''}
        </div>

        <!-- Back Links -->
        <div style="max-width: 920px; margin: 24px auto 0 auto; display: flex; justify-content: space-between; align-items: center;">
          <a href="/" class="btn btn-ghost" style="padding-left: 0;">← Retourner à l'accueil</a>
          <span style="font-size: 12px; color: #A0AEC0;">Dernière mise à jour le ${new Date(page.lastModified).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
        </div>

      </div>
    `;
  }
}
