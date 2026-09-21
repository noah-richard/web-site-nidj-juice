/* ==========================================================================
   NIDJ JUICE — VIDEO REELS & COMMUNITY SHOWCASE (#NidjJuiceVibes)
   Authentic mobile reels highlighting the bottling and lifestyle in Cameroon
   ========================================================================== */

import { cmsService } from '../../services/cms.service';
import type { VideoReel } from '../../types/product.types';

export class VideoReelsSection {
  private element: HTMLElement;

  constructor() {
    this.element = document.createElement('section');
    this.element.id = 'reels';
    this.element.className = 'section reels-section';
    this.render();
    this.bindEvents();
  }

  public getElement(): HTMLElement {
    return this.element;
  }

  private render(): void {
    const reels: VideoReel[] = cmsService.getVideoReels();

    this.element.innerHTML = `
      <div class="container">
        
        <div class="section-header">
          <div class="badge">
            <span>En Direct Du Terrain • Cameroun</span>
          </div>
          <h2 class="section-title">L’Expérience Nidj Juice En Mouvement</h2>
          <p class="section-subtitle">
            Plongez dans les coulisses de notre production et ressentez l'énergie rafraîchissante partagée par notre communauté.
          </p>
        </div>

        <div class="reels-grid">
          ${reels.map((reel: VideoReel) => `
            <div class="reel-card" data-reel-id="${reel.id}">
              <div class="reel-video-wrapper">
                <video 
                  src="${reel.src}" 
                  class="reel-video" 
                  loop 
                  muted 
                  playsinline 
                  preload="metadata"
                ></video>
                
                <div class="reel-overlay">
                  <div class="reel-top-bar">
                    <span class="reel-tag">${reel.tag}</span>
                    <button type="button" class="reel-mute-btn" aria-label="Activer le son de la vidéo">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                        <line x1="23" y1="9" x2="17" y2="15"></line>
                        <line x1="17" y1="9" x2="23" y2="15"></line>
                      </svg>
                    </button>
                  </div>

                  <div class="reel-play-indicator" aria-hidden="true">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                  </div>

                  <div class="reel-info">
                    <h3 class="reel-title">${reel.title}</h3>
                    <p class="reel-caption">${reel.caption}</p>
                  </div>
                </div>
              </div>
            </div>
          `).join('')}

          <!-- Instagram / TikTok Community CTA Card -->
          <div class="reel-community-card">
            <div class="community-content">
              <span class="community-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                  <line x1="12" y1="18" x2="12.01" y2="18"></line>
                </svg>
              </span>
              <h3 class="community-title">Rejoignez La Vague #NidjJuice</h3>
              <p class="community-desc">
                Partagez votre moment dégustation avec le hashtag <strong>#NidjJuiceVibes</strong> et tentez de remporter un pack découverte chaque mois !
              </p>
              <div class="community-actions">
                <a 
                  href="https://wa.me/237699000000?text=Bonjour%20Nidj%20Juice%2C%20je%20souhaite%20rejoindre%20la%20communaut%C3%A9%20des%20amateurs%20de%20jus%20naturels%20!" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  class="btn btn-primary"
                >
                  <span>Rejoindre sur WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    `;
  }

  private bindEvents(): void {
    const reelCards = this.element.querySelectorAll('.reel-card');

    reelCards.forEach((card) => {
      const video = card.querySelector('.reel-video') as HTMLVideoElement;
      const muteBtn = card.querySelector('.reel-mute-btn') as HTMLButtonElement;
      const playIndicator = card.querySelector('.reel-play-indicator') as HTMLElement;

      if (!video) return;

      // Play / Pause toggle on click
      card.addEventListener('click', (e) => {
        // If mute button was clicked, don't toggle play
        if ((e.target as HTMLElement).closest('.reel-mute-btn')) return;

        if (video.paused) {
          video.play().catch(() => {});
          playIndicator.style.opacity = '0';
        } else {
          video.pause();
          playIndicator.style.opacity = '1';
        }
      });

      // Mute / Unmute
      muteBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        video.muted = !video.muted;
        muteBtn.classList.toggle('is-unmuted', !video.muted);
        muteBtn.setAttribute('aria-label', video.muted ? 'Activer le son' : 'Couper le son');
      });

      // Autoplay muted when scrolled into viewport
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              video.play().catch(() => {});
              playIndicator.style.opacity = '0';
            } else {
              video.pause();
              playIndicator.style.opacity = '1';
            }
          });
        },
        { threshold: 0.4 }
      );

      observer.observe(video);
    });
  }
}
