/* ==========================================================================
   NIDJ JUICE — BRAND SHOWCASE: FLAVORS DATA
   Authentic NIDJ products configured for horizontal showcase carousel
   ========================================================================== */

import type { ShowcaseProduct } from '../components/showcase/showcase.types';

export const SHOWCASE_PRODUCTS: ShowcaseProduct[] = [
  {
    id: 'ananas-gingembre',
    name: 'ANANAS GINGEMBRE',
    subtitle: 'Ananas & gingembre',
    tagline: 'Une combinaison fraîche et intense',
    description: 'L’élan vital du terroir camerounais : la douceur de l’ananas mûr mariée à la chaleur noble du gingembre sauvage fraîchement pressé.',
    bottleImage: '/assets/images/bottle-ananas.png',
    brandWatermark: 'ANANAS GINGEMBRE',
    accentColor: '#E08700',
    glowColor: 'rgba(224, 135, 0, 0.35)',
    haloColor: 'rgba(254, 240, 199, 0.75)',
    badges: ['100% Naturel', 'Zéro sucres ajoutés', 'Pressé au Cameroun'],
    ctaText: 'Commander ce parfum',
    tastingHint: 'Douceur fruitée • Énergie vive'
  },
  {
    id: 'cocktail-bissap',
    name: 'COCKTAIL DE BISSAP',
    subtitle: 'Fleur d’hibiscus & notes tropicales',
    tagline: 'L’élégance florale et la fraîcheur royale',
    description: 'Une robe rouge rubis étincelante issue de l’infusion traditionnelle de calices de bissap et de la rondeur de l’ananas local.',
    bottleImage: '/assets/images/bottle-bissap.png',
    brandWatermark: 'COCKTAIL DE BISSAP',
    accentColor: '#C4003E',
    glowColor: 'rgba(196, 0, 62, 0.35)',
    haloColor: 'rgba(255, 218, 225, 0.75)',
    badges: ['Fleur d’Hibiscus', 'Riche en antioxydants', 'Recette Traditionnelle'],
    ctaText: 'Commander ce parfum',
    tastingHint: 'Fleur royale • Fraîcheur acidulée'
  },
  {
    id: 'pur-ananas',
    name: 'PUR JUS D’ANANAS',
    subtitle: 'Le goût authentique de l’ananas',
    tagline: 'La douceur solaire du fruit pur pressé',
    description: '100% pur jus extrait à froid : toute la richesse aromatique et les vitamines vivantes de l’ananas gorgé du soleil camerounais.',
    bottleImage: '/assets/images/bottle-ananas.png',
    brandWatermark: 'PUR JUS D’ANANAS',
    accentColor: '#D48806',
    glowColor: 'rgba(212, 136, 6, 0.35)',
    haloColor: 'rgba(254, 243, 199, 0.75)',
    badges: ['100% Pur Jus', 'Vitamines C & Manganèse', 'Plaisir Solaire'],
    ctaText: 'Commander ce parfum',
    tastingHint: 'Pulpe veloutée • 100% Solaire'
  },
  {
    id: 'pasteque-orange',
    name: 'PASTÈQUE ORANGE',
    subtitle: 'Une association fruitée et rafraîchissante',
    tagline: 'L’accord parfait entre fraîcheur et vitalité',
    description: 'La rencontre désaltérante de la pastèque juteuse et de l’orange vitaminée pour une sensation de pure fraîcheur à chaque gorgée.',
    bottleImage: '/assets/images/bottle-bissap.png',
    brandWatermark: 'PASTÈQUE ORANGE',
    accentColor: '#E63946',
    glowColor: 'rgba(230, 57, 70, 0.35)',
    haloColor: 'rgba(255, 226, 226, 0.75)',
    badges: ['Fraîcheur Vive', 'Hydratation Maximale', 'Saveur Fruitée'],
    ctaText: 'Commander ce parfum',
    tastingHint: 'Pastèque désaltérante • Agrumes doux'
  }
];
