/* ==========================================================================
   NIDJ JUICE — GALLERY DATA (EVENTS, TASTINGS & CONSUMER MOMENTS)
   Rich documentary archive of official events & Cameroonian community moments
   ========================================================================== */

export type GalleryCategory = 'all' | 'events' | 'lounges' | 'consumers' | 'terroir';

export interface GalleryItem {
  id: string;
  title: string;
  category: 'events' | 'lounges' | 'consumers' | 'terroir';
  categoryLabel: string;
  image: string;
  city: string;
  date: string;
  description: string;
  badge?: string;
  featured?: boolean;
}

export const GALLERY_CATEGORIES: { id: GalleryCategory; label: string }[] = [
  { id: 'all', label: 'Tous les moments' },
  { id: 'events', label: 'Événements & Salons' },
  { id: 'lounges', label: 'Dégustations & Lounges' },
  { id: 'consumers', label: 'Moments Consommateurs' },
  { id: 'terroir', label: 'Terroir & Ateliers' }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'festival-gastronomique-douala',
    title: 'Festival Gastronomique Africain',
    category: 'events',
    categoryLabel: 'Événements & Salons',
    image: '/assets/images/event-tasting-douala.jpg',
    city: 'Douala',
    date: 'Janvier 2026',
    description: 'Le stand officiel de dégustation Société Nidjeu a accueilli plus de 3 000 visiteurs pour faire découvrir la fraîcheur naturelle de notre Cocktail de Bissap et notre Ananas Gingembre fraîchement pressé.',
    badge: 'Événement Officiel',
    featured: true
  },
  {
    id: 'terrasse-lounge-bastos',
    title: 'Pause Rafraîchissante sur le Rooftop Bastos',
    category: 'consumers',
    categoryLabel: 'Moments Consommateurs',
    image: '/assets/images/consumer-lounge-yaounde.jpg',
    city: 'Yaoundé',
    date: 'Février 2026',
    description: 'Entre amis sous le soleil de la capitale, savourer un jus 100% naturel sans aucun conservateur. Un pur moment de convivialité et de sourires partagés.',
    badge: 'Communauté #NidjJuice',
    featured: true
  },
  {
    id: 'coucher-soleil-kribi',
    title: 'Coucher de Soleil & Dégustation Océan',
    category: 'lounges',
    categoryLabel: 'Dégustations & Lounges',
    image: '/assets/images/consumer-beach-kribi.jpg',
    city: 'Kribi',
    date: 'Mars 2026',
    description: 'Le seau à glace rempli de bouteilles de Bissap et d’Ananas au bord de l’océan Atlantique. La boisson idéale après une journée en bord de mer.',
    badge: 'Expérience Bord de Mer',
    featured: true
  },
  {
    id: 'degustation-bastos-yaounde',
    title: 'Pop-Up Bar Gourmet Bastos',
    category: 'lounges',
    categoryLabel: 'Dégustations & Lounges',
    image: '/assets/images/store-bastos.jpg',
    city: 'Yaoundé',
    date: 'Décembre 2025',
    description: 'Animation exclusive dans notre boutique partenaire du quartier Bastos, avec initiation aux accords mets et nectars de fruits naturels.',
    badge: 'Dégustation Privée'
  },
  {
    id: 'cooperatives-planteurs-terroir',
    title: 'Au Cœur des Plantations Fruitières',
    category: 'terroir',
    categoryLabel: 'Terroir & Ateliers',
    image: '/assets/images/gallery-3.webp',
    city: 'Région du Littoral',
    date: 'Novembre 2025',
    description: 'Rencontre avec les familles de planteurs d’ananas et les coopératives traditionnelles d’hibiscus partenaires de la Société Nidjeu.',
    badge: 'Filière Équitable'
  },
  {
    id: 'atelier-embouteillage-douala',
    title: 'Atelier d’Embouteillage & Hygiène de Pointe',
    category: 'terroir',
    categoryLabel: 'Terroir & Ateliers',
    image: '/assets/images/gallery-1.webp',
    city: 'Douala',
    date: 'Octobre 2025',
    description: 'Visite de notre atelier certifié à Douala. Contrôle microbiologique continu et mise en bouteille hermétique sous atmosphère protectrice.',
    badge: 'Savoir-Faire 237'
  },
  {
    id: 'grande-distribution-mall',
    title: 'Présentoir Fraîcheur Douala Grand Mall',
    category: 'events',
    categoryLabel: 'Événements & Salons',
    image: '/assets/images/store-mall.jpg',
    city: 'Douala',
    date: 'Septembre 2025',
    description: 'Mise en avant de la gamme Nidj Juice en tête de gondole réfrigérée dans le plus grand centre commercial du Cameroun.',
    badge: 'Distribution Nationale'
  },
  {
    id: 'lounge-terrasse-plage-kribi',
    title: 'Espace Partenaire Lounge Kribi',
    category: 'lounges',
    categoryLabel: 'Dégustations & Lounges',
    image: '/assets/images/store-kribi.jpg',
    city: 'Kribi',
    date: 'Août 2025',
    description: 'Les vacanciers et résidents savourent nos bouteilles fraîches dans un cadre tropical décontracté.',
    badge: 'Point Partenaire'
  },
  {
    id: 'pack-prestige-ceremonie',
    title: 'Coffrets Prestige & Cérémonies',
    category: 'events',
    categoryLabel: 'Événements & Salons',
    image: '/assets/images/gallery-2.webp',
    city: 'Douala',
    date: 'Juillet 2025',
    description: 'Les bouteilles Nidj Juice habillent les tables des séminaires d’entreprise et des réceptions officielles au Cameroun.',
    badge: 'Événements d’Entreprise'
  },
  {
    id: 'eco-recyclage-engagement',
    title: 'Opération Collecte & Recyclage Vert',
    category: 'terroir',
    categoryLabel: 'Terroir & Ateliers',
    image: '/assets/images/gallery-4.webp',
    city: 'Douala & Yaoundé',
    date: 'Juin 2025',
    description: 'Sensibilisation au recyclage de nos contenants et récupération des bouteilles consignées avec nos jeunes ambassadeurs.',
    badge: 'Engagement RSE'
  }
];
