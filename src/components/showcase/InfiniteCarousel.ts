/* ==========================================================================
   NIDJ JUICE — BRAND SHOWCASE: CONTINUOUS INFINITE CAROUSEL ENGINE
   Continuous 60FPS gliding conveyor, precision center alignment, drag & snap
   ========================================================================== */

import type { ShowcaseProduct, CarouselEvents } from './showcase.types';
import { ShowcaseCard } from './ShowcaseCard';
import { audioController } from '../../features/audio-controller';
import { router } from '../../router/Router';

export class InfiniteCarousel {
  public readonly container: HTMLElement;
  public readonly track: HTMLElement;
  private products: ShowcaseProduct[];
  private cards: ShowcaseCard[] = [];
  private events: CarouselEvents;

  // Geometry & Spacing
  private setsCount: number = 6; // 6 identical product cycles for seamless infinite buffer
  private cardSpacing: number = 340;

  // Continuous Glide Physics
  private baseSpeed: number = 0.85; // Natural continuous conveyor drift speed (~50px/sec)
  private currentSpeed: number = 0.85;
  private targetSpeed: number = 0.85;
  private scrollPos: number = 0;
  private isHovered: boolean = false;
  private isDragging: boolean = false;
  private isSnapping: boolean = false;
  private targetSnapPos: number = 0;

  // Drag interaction tracking
  private dragStartX: number = 0;
  private dragStartScroll: number = 0;
  private lastDragX: number = 0;
  private lastDragTime: number = 0;
  private dragVelocity: number = 0;
  private snapResumeTimer: number | null = null;

  // Active tracking & RAF
  private activeProductIndex: number = 0;
  private rafId: number | null = null;
  private prefersReducedMotion: boolean = false;

  constructor(container: HTMLElement, products: ShowcaseProduct[], events: CarouselEvents = {}) {
    this.container = container;
    this.products = products;
    this.events = events;

    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (this.prefersReducedMotion) {
      this.baseSpeed = 0;
      this.currentSpeed = 0;
      this.targetSpeed = 0;
    }

    // Inner track
    this.track = document.createElement('div');
    this.track.className = 'showcase-track';
    this.container.appendChild(this.track);

    this.updateDimensions();
    this.initCards();

    // Start centered in set #3
    const startCycle = Math.floor(this.setsCount / 2);
    this.scrollPos = startCycle * this.products.length * this.cardSpacing;
    this.targetSnapPos = this.scrollPos;

    this.bindEvents();
    this.startLoop();

    window.addEventListener('resize', this.onResize);
  }

  private initCards(): void {
    let globalIndex = 0;
    for (let s = 0; s < this.setsCount; s++) {
      for (let p = 0; p < this.products.length; p++) {
        const product = this.products[p];
        const card = new ShowcaseCard(product, globalIndex);
        this.cards.push(card);
        this.track.appendChild(card.element);

        // Click card: if already centered, navigate to product page; if not centered, snap to center
        card.element.addEventListener('click', (e) => {
          if (Math.abs(this.dragVelocity) > 0.15) return;
          if ((e.target as HTMLElement).closest('.showcase-floating-cta')) {
            // Already handled by ctaEl
            return;
          }
          const isCenter = card.element.classList.contains('is-center');
          if (isCenter) {
            audioController.playPop();
            router.navigate(`/saveurs/${product.id}`);
          } else {
            audioController.playPop();
            this.snapToCard(card.index);
          }
        });

        // Click floating CTA on card: always navigate directly to dedicated product page
        card.ctaEl.addEventListener('click', (e) => {
          e.stopPropagation();
          e.preventDefault();
          audioController.playPop();
          router.navigate(`/saveurs/${product.id}`);
        });

        globalIndex++;
      }
    }
  }

  private updateDimensions = (): void => {
    const width = window.innerWidth;
    if (width < 640) {
      this.cardSpacing = 240; // Mobile
    } else if (width < 1024) {
      this.cardSpacing = 290; // Tablet
    } else {
      this.cardSpacing = 360; // Desktop
    }
  };

  private onResize = (): void => {
    this.updateDimensions();
  };

  /**
   * Continuous 60 FPS animation loop
   */
  private startLoop(): void {
    const cycleWidth = this.products.length * this.cardSpacing;
    const minScroll = cycleWidth * 2;
    const maxScroll = cycleWidth * 4;

    const tick = () => {
      // 1. Continuous drift or snap interpolation
      if (this.isDragging) {
        // Position directly follows drag
      } else if (this.isSnapping) {
        const diff = this.targetSnapPos - this.scrollPos;
        this.scrollPos += diff * 0.085;

        if (Math.abs(diff) < 0.4) {
          this.scrollPos = this.targetSnapPos;
          this.isSnapping = false;
          this.scheduleContinuousResume(2500); // Resume continuous drift after 2.5s hold
        }
      } else {
        // Smooth speed transition (eases to 0 on hover, eases back to baseSpeed on leave)
        this.currentSpeed += (this.targetSpeed - this.currentSpeed) * 0.06;
        this.scrollPos += this.currentSpeed;
      }

      // 2. Seamless infinite loop wrap (§8)
      if (this.scrollPos >= maxScroll) {
        this.scrollPos -= cycleWidth;
        if (this.isSnapping) this.targetSnapPos -= cycleWidth;
      } else if (this.scrollPos < minScroll) {
        this.scrollPos += cycleWidth;
        if (this.isSnapping) this.targetSnapPos += cycleWidth;
      }

      // 3. Position and style all cards relative to center
      let closestCard: ShowcaseCard | null = null;
      let minDistance = Infinity;

      this.cards.forEach((card) => {
        const cardTrackX = card.index * this.cardSpacing;
        const centerOffset = cardTrackX - this.scrollPos;
        const normDist = centerOffset / this.cardSpacing;

        // Apply translate3d: centered at 50% + centerOffset
        card.element.style.transform = `translate3d(calc(-50% + ${centerOffset.toFixed(1)}px), -50%, 0)`;

        const absDist = Math.abs(normDist);
        if (absDist < minDistance) {
          minDistance = absDist;
          closestCard = card;
        }

        const isCenter = absDist < 0.48;
        card.updateVisuals(normDist, isCenter);
      });

      // 4. Synchronize active product info panel & dots (§10, §11)
      if (closestCard) {
        const productIndex = (closestCard as ShowcaseCard).index % this.products.length;
        if (productIndex !== this.activeProductIndex) {
          this.activeProductIndex = productIndex;
          this.events.onActiveChange?.(this.products[productIndex], productIndex);
        }
      }

      this.rafId = requestAnimationFrame(tick);
    };

    this.rafId = requestAnimationFrame(tick);
  }

  /**
   * Pointer & Gesture Interactions
   */
  private bindEvents(): void {
    // Pointer Drag (Mouse & Touch)
    this.container.addEventListener('pointerdown', (e) => {
      if (e.button !== 0 && e.pointerType === 'mouse') return;
      this.isDragging = true;
      this.isSnapping = false;
      this.dragStartX = e.clientX;
      this.dragStartScroll = this.scrollPos;
      this.lastDragX = e.clientX;
      this.lastDragTime = performance.now();
      this.dragVelocity = 0;

      this.container.classList.add('is-dragging');
      this.container.setPointerCapture(e.pointerId);
      this.events.onInteractionStart?.();
    });

    this.container.addEventListener('pointermove', (e) => {
      if (!this.isDragging) return;
      const dx = e.clientX - this.dragStartX;
      this.scrollPos = this.dragStartScroll - dx;

      const now = performance.now();
      const dt = Math.max(1, now - this.lastDragTime);
      this.dragVelocity = (e.clientX - this.lastDragX) / dt;
      this.lastDragX = e.clientX;
      this.lastDragTime = now;
    });

    const endDrag = (e: PointerEvent) => {
      if (!this.isDragging) return;
      this.isDragging = false;
      this.container.classList.remove('is-dragging');

      try {
        this.container.releasePointerCapture(e.pointerId);
      } catch (_) {}

      // Add momentum decay and snap to nearest card
      const momentum = this.dragVelocity * 160;
      const projected = this.scrollPos - momentum;
      const nearestSlot = Math.round(projected / this.cardSpacing);

      this.targetSnapPos = nearestSlot * this.cardSpacing;
      this.isSnapping = true;
      this.events.onInteractionEnd?.();
    };

    this.container.addEventListener('pointerup', endDrag);
    this.container.addEventListener('pointercancel', endDrag);

    // Trackpad / Horizontal Wheel
    this.container.addEventListener('wheel', (e) => {
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : (e.shiftKey ? e.deltaY : 0);
      if (Math.abs(delta) > 2) {
        e.preventDefault();
        this.isSnapping = false;
        this.scrollPos += delta * 1.1;
        this.debouncedSnap();
      }
    }, { passive: false });

    // Slow down on hover, resume continuous drift on leave
    this.container.addEventListener('mouseenter', () => {
      this.isHovered = true;
      if (!this.isSnapping) {
        this.targetSpeed = 0.15; // Slow crawl while inspecting
      }
    });

    this.container.addEventListener('mouseleave', () => {
      this.isHovered = false;
      if (!this.isSnapping && !this.prefersReducedMotion) {
        this.targetSpeed = this.baseSpeed;
      }
    });

    // Keyboard Arrow Accessibility
    this.container.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        this.prev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        this.next();
      }
    });
  }

  private debounceTimer: number | null = null;
  private debouncedSnap(): void {
    if (this.debounceTimer) window.clearTimeout(this.debounceTimer);
    this.debounceTimer = window.setTimeout(() => {
      const nearestSlot = Math.round(this.scrollPos / this.cardSpacing);
      this.targetSnapPos = nearestSlot * this.cardSpacing;
      this.isSnapping = true;
    }, 150);
  }

  private scheduleContinuousResume(delayMs: number): void {
    if (this.prefersReducedMotion) return;
    if (this.snapResumeTimer) window.clearTimeout(this.snapResumeTimer);

    this.snapResumeTimer = window.setTimeout(() => {
      if (!this.isHovered && !this.isDragging) {
        this.targetSpeed = this.baseSpeed;
      }
    }, delayMs);
  }

  public snapToCard(globalIndex: number): void {
    this.targetSnapPos = globalIndex * this.cardSpacing;
    this.isSnapping = true;
  }

  public selectProductIndex(productIndex: number): void {
    const currentSlot = Math.round(this.scrollPos / this.cardSpacing);
    let bestSlot = currentSlot;
    let minDiff = Infinity;

    this.cards.forEach((card) => {
      if (card.index % this.products.length === productIndex) {
        const diff = Math.abs(card.index - currentSlot);
        if (diff < minDiff) {
          minDiff = diff;
          bestSlot = card.index;
        }
      }
    });

    this.targetSnapPos = bestSlot * this.cardSpacing;
    this.isSnapping = true;
  }

  public next(): void {
    const currentSlot = Math.round(this.scrollPos / this.cardSpacing);
    this.targetSnapPos = (currentSlot + 1) * this.cardSpacing;
    this.isSnapping = true;
  }

  public prev(): void {
    const currentSlot = Math.round(this.scrollPos / this.cardSpacing);
    this.targetSnapPos = (currentSlot - 1) * this.cardSpacing;
    this.isSnapping = true;
  }

  public destroy(): void {
    if (this.rafId) cancelAnimationFrame(this.rafId);
    if (this.snapResumeTimer) window.clearTimeout(this.snapResumeTimer);
    window.removeEventListener('resize', this.onResize);
  }
}
