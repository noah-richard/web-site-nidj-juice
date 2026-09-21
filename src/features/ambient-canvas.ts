/* ==========================================================================
   NIDJ JUICE — AMBIENT LIQUID & BUBBLE CANVAS (60 FPS HARDWARE ACCELERATED)
   Dynamic particle physics representing natural juice carbonation and pulp
   ========================================================================== */

import { themeController } from './theme-controller';
import type { FlavorId } from '../types/product.types';

interface Particle {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  speedX: number;
  alpha: number;
  maxAlpha: number;
  wobble: number;
  wobbleSpeed: number;
  glow: number;
}

export class AmbientCanvas {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D | null = null;
  private particles: Particle[] = [];
  private animationFrameId: number | null = null;
  private width: number = 0;
  private height: number = 0;
  private mouseX: number = 0;
  private mouseY: number = 0;
  private targetColor = { r: 196, g: 0, b: 62 }; // Default Bissap red
  private currentColor = { r: 196, g: 0, b: 62 };
  private isRunning: boolean = false;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.init();
  }

  private init(): void {
    if (!this.ctx) return;
    this.resize();
    this.createParticles(45); // Ideal density for buttery 60fps on mobile & desktop
    this.bindEvents();
    this.updateThemeColors(themeController.getFlavor());
    this.start();
  }

  private resize(): void {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width * window.devicePixelRatio;
    this.canvas.height = this.height * window.devicePixelRatio;
    this.ctx?.scale(window.devicePixelRatio, window.devicePixelRatio);
  }

  private createParticles(count: number): void {
    this.particles = [];
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        radius: Math.random() * 4.5 + 1.2,
        speedY: Math.random() * 0.9 + 0.35,
        speedX: (Math.random() - 0.5) * 0.4,
        alpha: Math.random() * 0.5 + 0.1,
        maxAlpha: Math.random() * 0.6 + 0.25,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.03 + 0.015,
        glow: Math.random() * 12 + 6
      });
    }
  }

  private bindEvents(): void {
    window.addEventListener('resize', () => this.resize(), { passive: true });

    window.addEventListener('mousemove', (e) => {
      this.mouseX = (e.clientX - this.width / 2) * 0.03;
      this.mouseY = (e.clientY - this.height / 2) * 0.03;
    }, { passive: true });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.stop();
      } else {
        this.start();
      }
    });

    themeController.subscribe((newFlavor) => {
      this.updateThemeColors(newFlavor);
    });
  }

  private updateThemeColors(flavor: FlavorId): void {
    if (flavor === 'bissap') {
      this.targetColor = { r: 212, g: 0, b: 68 }; // Ruby red
    } else if (flavor === 'ananas') {
      this.targetColor = { r: 245, g: 158, b: 11 }; // Tropical gold
    } else {
      this.targetColor = { r: 22, g: 163, b: 74 }; // Emerald green
    }
  }

  private update(): void {
    // Smooth color interpolation
    this.currentColor.r += (this.targetColor.r - this.currentColor.r) * 0.05;
    this.currentColor.g += (this.targetColor.g - this.currentColor.g) * 0.05;
    this.currentColor.b += (this.targetColor.b - this.currentColor.b) * 0.05;

    for (const p of this.particles) {
      p.y -= p.speedY + this.mouseY * 0.02;
      p.wobble += p.wobbleSpeed;
      p.x += Math.sin(p.wobble) * 0.6 + p.speedX + this.mouseX * 0.05;

      // Wrap around screen edges
      if (p.y < -20) {
        p.y = this.height + 20;
        p.x = Math.random() * this.width;
      }
      if (p.x < -20) p.x = this.width + 20;
      if (p.x > this.width + 20) p.x = -20;
    }
  }

  private render(): void {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.width, this.height);

    const r = Math.round(this.currentColor.r);
    const g = Math.round(this.currentColor.g);
    const b = Math.round(this.currentColor.b);

    for (const p of this.particles) {
      // Glow outer gradient
      const grad = this.ctx.createRadialGradient(
        p.x, p.y, p.radius * 0.2,
        p.x, p.y, p.radius * 2.8
      );
      grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${p.alpha * 1.2})`);
      grad.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${p.alpha * 0.4})`);
      grad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius * 2.8, 0, Math.PI * 2);
      this.ctx.fillStyle = grad;
      this.ctx.fill();

      // Shiny micro-highlight on bubble rim
      this.ctx.beginPath();
      this.ctx.arc(p.x - p.radius * 0.35, p.y - p.radius * 0.35, p.radius * 0.4, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * 0.9})`;
      this.ctx.fill();
    }
  }

  private loop = (): void => {
    if (!this.isRunning) return;
    this.update();
    this.render();
    this.animationFrameId = requestAnimationFrame(this.loop);
  };

  public start(): void {
    if (this.isRunning) return;
    // Check reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    this.isRunning = true;
    this.loop();
  }

  public stop(): void {
    this.isRunning = false;
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }
}
