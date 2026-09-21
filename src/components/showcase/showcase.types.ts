/* ==========================================================================
   NIDJ JUICE — BRAND SHOWCASE: TYPES & INTERFACES
   Modular types for horizontal infinite carousel & dynamic product depth
   ========================================================================== */

export interface ShowcaseProduct {
  id: string;
  name: string;
  subtitle: string;
  tagline: string;
  description: string;
  bottleImage: string;
  brandWatermark: string;
  accentColor: string;
  glowColor: string;
  haloColor: string;
  badges: string[];
  ctaText: string;
  tastingHint: string;
}

export interface CarouselItemState {
  index: number;
  product: ShowcaseProduct;
  element: HTMLElement;
  haloEl: HTMLElement;
  bottleEl: HTMLElement;
  watermarkEl: HTMLElement;
  ctaEl: HTMLElement;
  currentX: number;
  scale: number;
  opacity: number;
  zIndex: number;
  isCenter: boolean;
}

export interface CarouselEvents {
  onActiveChange?: (activeProduct: ShowcaseProduct, activeIndex: number) => void;
  onInteractionStart?: () => void;
  onInteractionEnd?: () => void;
}
