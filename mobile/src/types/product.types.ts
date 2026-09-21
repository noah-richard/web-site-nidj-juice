/* ==========================================================================
   NIDJ JUICE (MOBILE) — DOMAIN TYPESCRIPT INTERFACES
   Société Nidjeu — Cameroun
   ========================================================================== */

export type FlavorId = 'bissap' | 'ananas' | 'duo';

export interface NutritionInfo {
  energy: string;
  sugars: string;
  vitaminC: string;
  antioxidants: string;
}

export interface Flavor {
  id: FlavorId;
  name: string;
  subtitle: string;
  category: string;
  tagline: string;
  quote: string;
  description: string;
  bottleImage: any; // React Native ImageRequireSource
  splashImage?: any;
  heroColor: string;
  accentGlow: string;
  badgeText: string;
  pricePerUnit: number; // in FCFA (e.g. 1 000 FCFA)
  pricePack6: number;   // in FCFA (e.g. 5 500 FCFA)
  pricePack12: number;  // in FCFA (e.g. 10 500 FCFA)
  formatAvailable: string[];
  tastingNotes: { title: string; note: string; icon: string }[];
  ingredients: string[];
  nutrition: NutritionInfo;
  craftingMethod: string;
}

export type CameroonCity = 'Douala' | 'Yaoundé' | 'Bafoussam' | 'Kribi';

export interface StoreLocation {
  id: string;
  city: CameroonCity;
  neighborhood: string;
  name: string;
  address: string;
  phone: string;
  type: 'Hypermarché' | 'Boutique Partenaire' | 'Restaurant & Lounge' | 'Point Relais Express';
  distanceKm?: number;
  isOpenNow: boolean;
}

export interface CartItem {
  id: string;
  flavorId: FlavorId;
  name: string;
  format: 'Bouteille 50cl' | 'Pack 6x 50cl' | 'Carton 12x 50cl' | 'Bouteille 1L';
  unitPrice: number;
  quantity: number;
}

export type PaymentMethod = 'momo' | 'om' | 'cash';

export interface MobileOrder {
  id: string;
  createdAt: string;
  items: CartItem[];
  totalAmount: number;
  customerName: string;
  customerPhone: string;
  city: CameroonCity;
  neighborhood: string;
  deliveryAddress: string;
  paymentMethod: PaymentMethod;
  notes?: string;
  status: 'PENDING' | 'CONFIRMED' | 'DELIVERING' | 'DELIVERED';
}
