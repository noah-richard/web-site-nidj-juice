/* ==========================================================================
   NIDJ JUICE — STRICT DOMAIN TYPESCRIPT INTERFACES
   ========================================================================== */

export type FlavorId = 'bissap' | 'ananas' | 'nature';

export interface NutritionInfo {
  energy: string;        // e.g. "42 kcal / 100ml"
  sugars: string;        // e.g. "Naturellement présents (0% sucre raffiné ajouté)"
  vitaminC: string;      // e.g. "Riche en Vitamine C & Minéraux"
  antioxidants: string;  // e.g. "Polyphénols & Anthocyanes actifs"
}

export interface Flavor {
  id: FlavorId;
  name: string;
  category: string;
  tagline: string;
  quote: string;
  description: string;
  bottleImage: string;
  heroColor: string;
  accentGlow: string;
  badgeText: string;
  formatAvailable: string[];
  tastingNotes: { title: string; note: string; icon: string }[];
  ingredients: string[];
  nutrition: NutritionInfo;
  craftingMethod: string;
}

export interface StoreLocation {
  id: string;
  city: 'Douala' | 'Yaoundé' | 'Bafoussam' | 'Kribi' | 'Garoua';
  neighborhood: string;
  name: string;
  address: string;
  phone: string;
  type: 'Hypermarché' | 'Boutique Partenaire' | 'Restaurant & Lounge' | 'Point Relais Express';
  image: string;
  openingHours?: string;
  coordinates: { lat: number; lng: number };
}

export interface VideoReel {
  id: string;
  title: string;
  caption: string;
  src: string;
  poster?: string;
  tag: string;
}

export interface OrderPayload {
  flavorId: FlavorId;
  format: string;
  quantity: number;
  city: string;
  deliveryAddress: string;
  customerName: string;
  customerPhone: string;
  notes?: string;
}
