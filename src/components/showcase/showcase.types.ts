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
  category?: string;
  quote?: string;
  recipeStory?: string;
  ingredients?: string[];
  nutrition?: {
    energy: string;
    sugars: string;
    vitaminC: string;
    antioxidants: string;
    potassium?: string;
  };
  tastingNotes?: { title: string; note: string; icon: string }[];
  formats?: string[];
  terroir?: string;
  origin?: string;
  tag?: string;
  price?: string;
  volume?: string;
  story?: string;
  calories?: string;
  sugar?: string;
  vitaminC?: string;
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
