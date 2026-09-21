/* ==========================================================================
   NIDJ JUICE — POINTS OF SALE & DISTRIBUTION NETWORK (CAMEROUN)
   Douala, Yaoundé, Bafoussam, Kribi & Commande Express Directe
   ========================================================================== */

import type { StoreLocation } from '../types/product.types';

export const OFFICIAL_CONTACT = {
  brandName: 'Nidj Juice',
  companyName: 'Société Nidjeu',
  country: 'Cameroun',
  phoneDisplay: '+237 699 00 00 00',
  whatsappNumber: '237699000000', // Format international sans '+' pour lien direct wa.me
  email: 'contact@nidj-juice.cm',
  headquarters: 'Douala, Cameroun'
};

export const STORE_LOCATIONS: StoreLocation[] = [
  {
    id: 'dla-01',
    city: 'Douala',
    neighborhood: 'Bonapriso',
    name: 'Carrefour Market Bonapriso',
    address: 'Rue Tobie Kuoh, Bonapriso, Douala',
    phone: '+237 690 12 34 56',
    type: 'Hypermarché',
    image: '/assets/images/store-supermarket.jpg',
    openingHours: '08h00 - 21h00',
    coordinates: { lat: 4.0285, lng: 9.6978 }
  },
  {
    id: 'dla-02',
    city: 'Douala',
    neighborhood: 'Akwa',
    name: 'Supermarché Santa Lucia Akwa',
    address: 'Boulevard de la Liberté, Akwa, Douala',
    phone: '+237 691 23 45 67',
    type: 'Hypermarché',
    image: '/assets/images/store-supermarket.jpg',
    openingHours: '07h30 - 21h30',
    coordinates: { lat: 4.0512, lng: 9.7042 }
  },
  {
    id: 'dla-03',
    city: 'Douala',
    neighborhood: 'Bonamoussadi',
    name: 'Boutique Fraîcheur Nidj Express',
    address: 'Rond-point Express, Bonamoussadi, Douala',
    phone: '+237 677 88 99 00',
    type: 'Boutique Partenaire',
    image: '/assets/images/store-boutique.jpg',
    openingHours: '08h30 - 20h00',
    coordinates: { lat: 4.0934, lng: 9.7321 }
  },
  {
    id: 'dla-04',
    city: 'Douala',
    neighborhood: 'Douala Grand Mall',
    name: 'Comptoir Gourmet DGM',
    address: 'Aéroport International, Douala',
    phone: '+237 699 11 22 33',
    type: 'Restaurant & Lounge',
    image: '/assets/images/store-mall.jpg',
    openingHours: '09h00 - 22h00',
    coordinates: { lat: 4.0125, lng: 9.7198 }
  },
  {
    id: 'yde-01',
    city: 'Yaoundé',
    neighborhood: 'Bastos',
    name: 'Dovv Bastos Prestige',
    address: 'Nouvelle Route Bastos, Yaoundé',
    phone: '+237 694 56 78 90',
    type: 'Hypermarché',
    image: '/assets/images/store-bastos.jpg',
    openingHours: '08h00 - 22h00',
    coordinates: { lat: 3.8967, lng: 11.5134 }
  },
  {
    id: 'yde-02',
    city: 'Yaoundé',
    neighborhood: 'Omnisports',
    name: 'Supermarché Casino Yaoundé',
    address: 'Avenue Kennedy / Omnisports, Yaoundé',
    phone: '+237 695 67 89 01',
    type: 'Hypermarché',
    image: '/assets/images/store-supermarket.jpg',
    openingHours: '08h00 - 21h00',
    coordinates: { lat: 3.8745, lng: 11.5342 }
  },
  {
    id: 'yde-03',
    city: 'Yaoundé',
    neighborhood: 'Mendong',
    name: 'Point Relais Fraîcheur Mendong',
    address: 'Carrefour Simbock / Mendong, Yaoundé',
    phone: '+237 678 12 34 56',
    type: 'Point Relais Express',
    image: '/assets/images/store-boutique.jpg',
    openingHours: '08h00 - 19h30',
    coordinates: { lat: 3.8321, lng: 11.4876 }
  },
  {
    id: 'bfs-01',
    city: 'Bafoussam',
    neighborhood: 'Centre Commercial',
    name: 'Comptoir de l’Ouest Nidj',
    address: 'Place des Fêtes, Bafoussam',
    phone: '+237 692 34 56 78',
    type: 'Boutique Partenaire',
    image: '/assets/images/store-boutique.jpg',
    openingHours: '08h30 - 19h00',
    coordinates: { lat: 5.4789, lng: 10.4215 }
  },
  {
    id: 'krb-01',
    city: 'Kribi',
    neighborhood: 'Plage & Tourisme',
    name: 'Oasis Plage Kribi',
    address: 'Boulevard Maritime, Kribi',
    phone: '+237 693 45 67 89',
    type: 'Restaurant & Lounge',
    image: '/assets/images/store-kribi.jpg',
    openingHours: '10h00 - 23h00',
    coordinates: { lat: 2.9412, lng: 9.9124 }
  }
];
