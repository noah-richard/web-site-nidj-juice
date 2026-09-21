/* ==========================================================================
   NIDJ JUICE — REACTIVE FLAVOR & THEME CONTROLLER
   State Machine & Event Dispatcher for Dynamic Sensory Changes
   ========================================================================== */

import type { FlavorId } from '../types/product.types';

type ThemeChangeListener = (newFlavor: FlavorId, oldFlavor: FlavorId) => void;

class ThemeController {
  private currentFlavor: FlavorId = 'bissap';
  private listeners: Set<ThemeChangeListener> = new Set();

  constructor() {
    this.init();
  }

  private init(): void {
    if (typeof document !== 'undefined') {
      document.body.dataset.theme = this.currentFlavor;
    }
  }

  public getFlavor(): FlavorId {
    return this.currentFlavor;
  }

  public setFlavor(flavor: FlavorId): void {
    if (flavor === this.currentFlavor) return;
    const oldFlavor = this.currentFlavor;
    this.currentFlavor = flavor;

    if (typeof document !== 'undefined') {
      document.body.dataset.theme = flavor;
    }

    // Notify listeners
    this.listeners.forEach((listener) => {
      try {
        listener(flavor, oldFlavor);
      } catch (err) {
        console.error('Error in theme listener:', err);
      }
    });

    // Custom DOM event
    window.dispatchEvent(
      new CustomEvent('nidj:flavor-change', {
        detail: { newFlavor: flavor, oldFlavor }
      })
    );
  }

  public subscribe(listener: ThemeChangeListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
}

export const themeController = new ThemeController();
