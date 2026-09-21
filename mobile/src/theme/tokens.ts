/* ==========================================================================
   NIDJ JUICE (MOBILE) — PREMIUM AGENCY DESIGN SYSTEM TOKENS
   Inspired by Top-Tier International Mobile Studio Reference
   Pure Minimalist Editorial Aesthetic • Warm Terroir Palette
   ========================================================================== */

export const COLORS = {
  // Brand Warm Accents (Mockup Inspiration)
  brandOrange: '#FF6428',     // Terracotta vibrant CTA
  brandOrangeDark: '#E8521A', // Hover/Active state
  brandOrangeSoft: '#FFF2EB', // Tinted card pill / background
  brandOrangeLight: '#FFE7D9',// Soft blush coral container

  // Secondary Heritage (Société Nidjeu Cameroun)
  brandGreen: '#2B8A3E',      // Vert d'origine naturelle
  brandGreenDark: '#0A3D22',  // Vert forêt corporate Nidjeu
  brandGreenSoft: '#EBF7EE',  // Tinted green sage pill

  // Backward-compatible semantic aliases
  primary: '#FF6428',
  primaryDark: '#14171A',
  primaryLight: '#FFF2EB',
  accentBissap: '#FF6428',
  accentAnanas: '#F5A623',

  // Product Flavor Specific Tints
  cardBissap: '#FFECE2',      // Pastel corail pour Cocktail de Bissap
  cardAnanas: '#FFF4D6',      // Pastel or ambré pour Ananas Gingembre
  cardDuo: '#EBF5EE',         // Pastel menthe douce pour Pack Duo

  // Canvas & Surfaces
  background: '#F9F9FB',      // Fond épuré studio
  surface: '#FFFFFF',         // Cartes blanches élevées
  surfaceSubtle: '#F4F4F6',   // Badges et champs discrets
  surfaceDark: '#14171A',

  // Typography
  textPrimary: '#14171A',     // Titres et textes majeurs profonds
  textSecondary: '#657786',   // Sous-titres et métadonnées
  textMuted: '#AAB8C2',       // Espaceurs et placeholders
  textLight: '#FFFFFF',       // Blanc pur

  // Borders
  border: '#EFF1F3',
  borderSoft: '#F6F7F9',

  // Status & Telemetry
  success: '#2B8A3E',
  warning: '#F59E0B',
  starGold: '#F59E0B',
  error: '#D32F2F',

  // Cameroon Payments
  mtnYellow: '#FFCC00',
  orangeMoney: '#FF6600',
  cashGreen: '#2B8A3E',
};

export const TYPOGRAPHY = {
  displayLarge: {
    fontSize: 32,
    lineHeight: 38,
    fontWeight: '800' as const,
    letterSpacing: -0.6,
  },
  display: {
    fontSize: 26,
    lineHeight: 32,
    fontWeight: '800' as const,
    letterSpacing: -0.4,
  },
  title1: {
    fontSize: 20,
    lineHeight: 26,
    fontWeight: '700' as const,
    letterSpacing: -0.3,
  },
  title2: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '700' as const,
  },
  headline: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '600' as const,
  },
  body: {
    fontSize: 13,
    lineHeight: 19,
    fontWeight: '400' as const,
  },
  bodyBold: {
    fontSize: 13,
    lineHeight: 19,
    fontWeight: '700' as const,
  },
  caption: {
    fontSize: 11,
    lineHeight: 15,
    fontWeight: '500' as const,
  },
  badge: {
    fontSize: 10,
    lineHeight: 13,
    fontWeight: '700' as const,
    letterSpacing: 0.4,
  },
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const RADIUS = {
  sm: 10,
  md: 16,
  lg: 24,
  xl: 32,
  pill: 9999,
};

export const TOUCH = {
  minTarget: 48,
};

export const SHADOWS = {
  soft: {
    shadowColor: '#14171A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.04,
    shadowRadius: 16,
    elevation: 2,
  },
  card: {
    shadowColor: '#14171A',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.06,
    shadowRadius: 24,
    elevation: 4,
  },
  heroProduct: {
    shadowColor: '#E8521A',
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.14,
    shadowRadius: 28,
    elevation: 8,
  },
  floating: {
    shadowColor: '#14171A',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 8,
  },
  bottomBar: {
    shadowColor: '#14171A',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 10,
  },
};
