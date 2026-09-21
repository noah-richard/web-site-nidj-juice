/* ==========================================================================
   NIDJ JUICE — DATA REPOSITORY: FLAVORS & SENSORY PROFILES
   Authentic Cameroonian Ingredients & Pure Craftsmanship by Société Nidjeu
   ========================================================================== */

import type { Flavor, VideoReel } from '../types/product.types';

export const FLAVORS_DATA: Flavor[] = [
  {
    id: 'bissap',
    name: 'Cocktail de Bissap',
    category: 'Infusion Royale & Fruits',
    tagline: 'La nature dans votre bouteille',
    quote: 'L’intensité envoûtante de l’hibiscus alliée à la rondeur fruitée de l’ananas mûri sous le soleil du Cameroun.',
    description: 'Une robe rouge rubis étincelante, une fraîcheur exaltante et une note acidulée parfaitement équilibrée. Récolté et préparé selon les traditions avec l’exigence moderne de la société Nidjeu, notre Cocktail de Bissap réinvente le trésor gustatif de notre terre.',
    bottleImage: '/assets/images/bottle-bissap.png',
    heroColor: '#C4003E',
    accentGlow: 'rgba(196, 0, 62, 0.55)',
    badgeText: '100% Naturel • Fleur de Bissap & Ananas',
    formatAvailable: ['33 cl format nomade', '50 cl fraîcheur active', '1 Litre familial'],
    tastingNotes: [
      { title: 'Attaque', note: 'Fraîcheur vive et notes florales d’hibiscus pur', icon: 'flower' },
      { title: 'Cœur', note: 'Douceur acidulée et velouté de l’ananas tropical', icon: 'fruit' },
      { title: 'Finale', note: 'Sensation désaltérante persistante et pure', icon: 'pure' }
    ],
    ingredients: [
      'Infusion de calices d’Hibiscus Sabdariffa (Bissap)',
      'Pur jus d’ananas frais sélectionné',
      'Eau de source purifiée',
      'Infusion de menthe sauvage locale'
    ],
    nutrition: {
      energy: '38 kcal / 100 ml',
      sugars: 'Uniquement les sucres naturels des fruits',
      vitaminC: 'Source naturelle de Vitamine C',
      antioxidants: 'Haute concentration d’anthocyanes protecteurs'
    },
    craftingMethod: 'Infusion lente à température contrôlée & filtration délicate préservant tous les micronutriments vivants.'
  },
  {
    id: 'ananas',
    name: 'Jus d’Ananas Gingembre',
    category: 'Énergie & Vitalité Pure',
    tagline: 'L’élan vital et tonifiant du Cameroun',
    quote: 'L’explosion solaire du fruit sucré de nos terroirs, exaltée par la flamme noble du gingembre frais.',
    description: 'Conçu pour revitaliser le corps et l’esprit, ce nectar réunit le jus doré des ananas de nos plantations camerounaises et le piquant revigorant du gingembre sauvage. Une sensation vive et chaude qui stimule la digestion et insuffle une vigueur instantanée.',
    bottleImage: '/assets/images/bottle-ananas.png',
    heroColor: '#E08700',
    accentGlow: 'rgba(224, 135, 0, 0.55)',
    badgeText: '100% Naturel • Ananas Doré & Gingembre Pur',
    formatAvailable: ['50 cl fraîcheur active', '1 Litre Prestige grand format'],
    tastingNotes: [
      { title: 'Attaque', note: 'Douceur sucrée et pulpeuse de l’ananas gorgé de soleil', icon: 'fruit' },
      { title: 'Cœur', note: 'Montée en puissance aromatique et piquant chaleureux', icon: 'warmth' },
      { title: 'Finale', note: 'Clarté tonifiante et dynamisme corporel immédiat', icon: 'vitality' }
    ],
    ingredients: [
      'Jus d’ananas mûr 100% pur jus',
      'Extrait pressé de rhizomes de gingembre frais',
      'Zeste subtil d’agrumes tropicaux',
      'Eau de source ultra-pure'
    ],
    nutrition: {
      energy: '44 kcal / 100 ml',
      sugars: 'Zéro saccharose ajouté, 100% fructose du fruit',
      vitaminC: 'Teneur élevée en Vitamine C & Manganèse',
      antioxidants: 'Gingérols et enzymes digestives actives'
    },
    craftingMethod: 'Extraction douce à froid respectant les enzymes naturelles de la pulpe et les huiles essentielles du gingembre.'
  }
];

export const BRAND_VALUES = [
  {
    title: '100% Naturel & Authentique',
    desc: 'Zéro conservateur chimique, zéro colorant artificiel, zéro arôme de synthèse. Chaque goutte provient directement de la nature camerounaise.',
    icon: 'natural'
  },
  {
    title: 'Fierté & Savoir-faire Camerounais',
    desc: 'Créé, produit et conditionné au Cameroun par la société Nidjeu. Nous soutenons directement les coopératives agricoles locales.',
    icon: 'cameroon'
  },
  {
    title: 'Fraîcheur & Préservation des Nutriments',
    desc: 'Nos procédés de pasteurisation douce préservent l’intégrité des vitamines et des antioxydants pour une vitalité réelle.',
    icon: 'freshness'
  },
  {
    title: 'Standard Mondial de Qualité',
    desc: 'Conformité stricte aux normes d’hygiène et de traçabilité agroalimentaire internationale. Un produit camerounais au sommet de l’exigence.',
    icon: 'quality'
  }
];

export const VIDEO_REELS: VideoReel[] = [
  {
    id: 'reel-1',
    title: 'Fraîcheur & Embouteillage',
    caption: 'L’art du conditionnement soigné chez Société Nidjeu',
    src: '/assets/videos/reel-1.mp4',
    tag: 'Production Locale'
  },
  {
    id: 'reel-2',
    title: 'L’Instant Dégustation',
    caption: 'Le plaisir d’un jus glacé sous la chaleur de Douala & Yaoundé',
    src: '/assets/videos/reel-2.mp4',
    tag: 'Lifestyle Cameroun'
  }
];
