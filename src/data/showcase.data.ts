/* ==========================================================================
   NIDJ JUICE — BRAND SHOWCASE: FLAVORS DATA
   Authentic NIDJ products configured for horizontal showcase carousel
   and dedicated brand/flavor pages.
   ========================================================================== */

import type { ShowcaseProduct } from '../components/showcase/showcase.types';

export const SHOWCASE_PRODUCTS: ShowcaseProduct[] = [
  {
    id: 'cocktail-bissap',
    name: 'COCKTAIL DE BISSAP',
    subtitle: 'Fleur d’hibiscus & notes tropicales',
    category: 'Infusion Royale & Fruits',
    tagline: 'L’élégance florale et la fraîcheur royale',
    quote: '« La profondeur pourpre des calices d’hibiscus du Grand Nord alliée à la fraîcheur vive de la menthe et à la rondeur du jus d’ananas pressé. »',
    description: 'Une robe rouge rubis étincelante issue de l’infusion délicate à température maîtrisée de calices de bissap et de la douceur de l’ananas camerounais. Un trésor gustatif célébrant la tradition avec l’exigence moderne de la Société Nidjeu.',
    recipeStory: 'Récoltées à la main par les coopératives traditionnelles du Grand Nord camerounais, les fleurs d’Hibiscus Sabdariffa sont séchées naturellement sous le soleil sahélien. Dans nos ateliers certifiés de Douala, les calices font l’objet d’une infusion douce et prolongée afin d’extraire l’intégralité de leurs pigments pourpres et de leur puissant complexe d’anthocyanes protecteurs, sans jamais altérer leur fraîcheur originelle.',
    bottleImage: '/assets/images/bottle-bissap.png',
    brandWatermark: 'COCKTAIL DE BISSAP',
    accentColor: '#C4003E',
    glowColor: 'rgba(196, 0, 62, 0.35)',
    haloColor: 'rgba(255, 218, 225, 0.75)',
    badges: ['100% Naturel', 'Fleur d’Hibiscus', 'Riche en antioxydants', 'Zéro Conservateur'],
    ctaText: 'Commander du Bissap',
    tastingHint: 'Fleur royale • Fraîcheur acidulée',
    origin: 'Cameroun (Nord & Littoral)',
    terroir: 'Terroirs sahéliens du Grand Nord et vergers fertiles de Penja',
    ingredients: [
      'Infusion pure de calices d’Hibiscus Sabdariffa (Bissap)',
      'Pur jus d’ananas frais sélectionné',
      'Eau de source purifiée filtrée sous micro-membranes',
      'Infusion légère de menthe sauvage locale'
    ],
    nutrition: {
      energy: '38 kcal / 100 ml',
      sugars: 'Uniquement les sucres naturels des fruits (zéro sucre raffiné)',
      vitaminC: 'Source naturelle de Vitamine C (18 mg / 100 ml)',
      antioxidants: 'Haute concentration d’anthocyanes et polyphénols actifs'
    },
    tastingNotes: [
      { title: 'Attaque', note: 'Fraîcheur vive et notes florales d’hibiscus pur saisissantes', icon: 'flower' },
      { title: 'Cœur', note: 'Douceur acidulée et velouté d’ananas tropical en parfait équilibre', icon: 'fruit' },
      { title: 'Finale', note: 'Sensation désaltérante persistante, pure et revigorante', icon: 'pure' }
    ],
    formats: ['33 cl format nomade', '50 cl fraîcheur active', '1 Litre familial', 'Carton Découverte 12x']
  },
  {
    id: 'ananas-gingembre',
    name: 'ANANAS GINGEMBRE',
    subtitle: 'Ananas & gingembre sauvage',
    category: 'Énergie & Vitalité Pure',
    tagline: 'Une combinaison fraîche et intense',
    quote: '« Le soleil éclatant de l’ananas camerounais réveillé par la force chaleureuse du gingembre sauvage fraîchement râpé. »',
    description: 'L’élan vital du terroir camerounais : la douceur de l’ananas mûr mariée à la chaleur noble du gingembre sauvage fraîchement pressé. Une sensation vivifiante qui stimule le corps et l’esprit.',
    recipeStory: 'Nos ananas poussent sur les sols volcaniques et généreux des bassins de Penja et du Littoral, où l’alternance des pluies tropicales et d’un ensoleillement continu confère au fruit un taux de sucre naturel et une jutosité incomparables. Le gingembre frais, récolté à pleine maturité aromatique, est extrait à froid pour préserver ses précieux gingérols.',
    bottleImage: '/assets/images/bottle-ananas.png',
    brandWatermark: 'ANANAS GINGEMBRE',
    accentColor: '#E08700',
    glowColor: 'rgba(224, 135, 0, 0.35)',
    haloColor: 'rgba(254, 240, 199, 0.75)',
    badges: ['100% Naturel', 'Zéro sucres ajoutés', 'Pressé au Cameroun', 'Tonus Immédiat'],
    ctaText: 'Commander de l’Ananas',
    tastingHint: 'Douceur fruitée • Énergie vive',
    origin: 'Cameroun (Penja & Centre)',
    terroir: 'Sols volcaniques du Moungo et piémonts de Penja',
    ingredients: [
      'Jus d’ananas mûr 100% pur jus non concentré',
      'Extrait pressé de rhizomes de gingembre sauvage frais',
      'Zeste d’agrumes tropicaux',
      'Eau de source purifiée'
    ],
    nutrition: {
      energy: '44 kcal / 100 ml',
      sugars: 'Zéro saccharose ajouté, 100% fructose naturel du fruit',
      vitaminC: 'Teneur élevée en Vitamine C et Manganèse protecteur',
      antioxidants: 'Gingérols stimulants et enzymes bromélaïques digestives'
    },
    tastingNotes: [
      { title: 'Attaque', note: 'Douceur sucrée et pulpeuse de l’ananas gorgé de soleil', icon: 'fruit' },
      { title: 'Cœur', note: 'Montée en puissance aromatique et piquant noble et chaleureux', icon: 'warmth' },
      { title: 'Finale', note: 'Clarté tonifiante et fraîcheur corporelle immédiate', icon: 'vitality' }
    ],
    formats: ['33 cl format nomade', '50 cl fraîcheur active', '1 Litre Prestige grand format', 'Carton 12x']
  },
  {
    id: 'pur-ananas',
    name: 'PUR JUS D’ANANAS',
    subtitle: 'Le goût authentique de l’ananas',
    category: 'Pureté Solaire 100%',
    tagline: 'La douceur solaire du fruit pur pressé',
    quote: '« La quintessence du fruit cueilli à maturité parfaite sous le ciel tropical : une pulpe veloutée et une caresse dorée. »',
    description: '100% pur jus extrait à froid : toute la richesse aromatique, les micronutriments et les vitamines vivantes de l’ananas sans aucune dilution ni conservateur.',
    recipeStory: 'Contrairement aux jus industriels issus de concentrés pasteurisés à outrance, le Pur Jus d’Ananas Société Nidjeu est un pur jus direct. Les fruits sont sélectionnés pièce par pièce pour leur taux de brix optimal, épluchés délicatement puis passés dans notre pressoir pneumatique à basse friction pour recueillir le cœur le plus parfumé du fruit.',
    bottleImage: '/assets/images/bottle-ananas.png',
    brandWatermark: 'PUR JUS D’ANANAS',
    accentColor: '#D48806',
    glowColor: 'rgba(212, 136, 6, 0.35)',
    haloColor: 'rgba(254, 243, 199, 0.75)',
    badges: ['100% Pur Jus', 'Vitamines C & Manganèse', 'Plaisir Solaire', 'Sans Aucun Additif'],
    ctaText: 'Commander le Pur Ananas',
    tastingHint: 'Pulpe veloutée • 100% Solaire',
    origin: 'Cameroun (Bassin du Littoral & Penja)',
    terroir: 'Plantations durables certifiées du Littoral camerounais',
    ingredients: [
      '100% Pur jus d’ananas de Penja fraîchement pressé',
      'Pulpe naturelle filtrée avec délicatesse'
    ],
    nutrition: {
      energy: '46 kcal / 100 ml',
      sugars: 'Uniquement les sucres naturels du fruit mûri sur pied',
      vitaminC: 'Excellente source de Vitamine C et potassium',
      antioxidants: 'Enzymes digestives naturelles et polyphénols bienfaisants'
    },
    tastingNotes: [
      { title: 'Attaque', note: 'Texture soyeuse et éclat franc d’ananas frais cueilli', icon: 'pure' },
      { title: 'Cœur', note: 'Rondeur opulente et parfum exotique généreux', icon: 'fruit' },
      { title: 'Finale', note: 'Douceur naturelle désaltérante sans acidité rugueuse', icon: 'flower' }
    ],
    formats: ['33 cl format nomade', '50 cl fraîcheur active', '1 Litre familial', 'Carton Pro 24x']
  },
  {
    id: 'pasteque-orange',
    name: 'PASTÈQUE ORANGE',
    subtitle: 'Une association fruitée et rafraîchissante',
    category: 'Fraîcheur & Hydratation',
    tagline: 'L’accord parfait entre fraîcheur et vitalité',
    quote: '« La fraîcheur cristalline et désaltérante de la pastèque juteuse exaltée par le peps vitaminé de l’orange dorée. »',
    description: 'La rencontre ultra-désaltérante de la pastèque juteuse de nos vallées fertiles et de l’orange gorgée de soleil. Conçu pour apporter une sensation d’hydratation instantanée lors des journées chaudes du Cameroun.',
    recipeStory: 'Créé pour répondre aux climats chauds et ensoleillés de Douala, Yaoundé et Kribi, ce nectar associe la pastèque cultivée le long des rivières camerounaises à des oranges douces sélectionnées pour leur équilibre parfait entre sucre et acidité. Ce mariage unique offre un pouvoir hydratant hors pair.',
    bottleImage: '/assets/images/bottle-bissap.png',
    brandWatermark: 'PASTÈQUE ORANGE',
    accentColor: '#E63946',
    glowColor: 'rgba(230, 57, 70, 0.35)',
    haloColor: 'rgba(255, 226, 226, 0.75)',
    badges: ['Fraîcheur Vive', 'Hydratation Maximale', 'Riche en Lycopène', 'Sans Sucres Ajoutés'],
    ctaText: 'Commander Pastèque Orange',
    tastingHint: 'Pastèque désaltérante • Agrumes doux',
    origin: 'Cameroun (Région du Sud & Littoral)',
    terroir: 'Bordures alluviales de Sanaga et vergers d’agrumes de l’Ouest',
    ingredients: [
      'Pur jus de pastèque rouge fraîchement pressée',
      'Jus d’orange camerounaise mûrie sous le soleil',
      'Eau de source purifiée',
      'Une touche de jus de citron vert local'
    ],
    nutrition: {
      energy: '36 kcal / 100 ml',
      sugars: 'Fructose naturel hautement assimilable (très léger)',
      vitaminC: 'Haute concentration de Vitamine C et Lycopène',
      antioxidants: 'Minéraux électrolytiques essentiels et caroténoïdes'
    },
    tastingNotes: [
      { title: 'Attaque', note: 'Vague de fraîcheur désaltérante immédiate, très légère', icon: 'pure' },
      { title: 'Cœur', note: 'Notes gourmandes d’orange douce et fruité aérien de pastèque', icon: 'fruit' },
      { title: 'Finale', note: 'Sensation purifiante et vivifiante qui coupe la soif durablement', icon: 'vitality' }
    ],
    formats: ['33 cl format nomade', '50 cl fraîcheur active', '1 Litre familial', 'Carton Événements 12x']
  }
];
