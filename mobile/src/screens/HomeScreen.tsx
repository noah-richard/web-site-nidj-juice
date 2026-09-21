/* ==========================================================================
   NIDJ JUICE (MOBILE) — HOME STORE SCREEN
   Faithful recreation of the studio reference mockup (Left Screen)
   Pure Agency Aesthetic • Popping Bottle Hero Cards • Docked Corner Plus Buttons
   ========================================================================== */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS, TOUCH } from '../theme/tokens';
import { FLAVORS_DATA } from '../data/flavors.data';
import type { Flavor } from '../types/product.types';
import {
  SunCloudIcon,
  ChevronRightIcon,
  PlusIcon,
  CheckIcon,
} from '../components/Icons';
import { useCart } from '../context/CartContext';

const { width } = Dimensions.get('window');

interface HomeScreenProps {
  onSelectFlavor: (flavor: Flavor) => void;
  onNavigateToFlavors: () => void;
  onNavigateToCart: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onSelectFlavor,
  onNavigateToFlavors,
  onNavigateToCart,
}) => {
  const { addToCart } = useCart();
  const [activeCarouselIndex, setActiveCarouselIndex] = useState(0);
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const handleQuickAdd = (flavor: Flavor, e?: any) => {
    addToCart(flavor.id, flavor.name, 'Bouteille 50cl', flavor.pricePerUnit, 1);
    setJustAddedId(flavor.id);
    setTimeout(() => setJustAddedId(null), 1000);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Top Header Row (Store + Date/City + Weather Pill) */}
      <View style={styles.topHeader}>
        <View>
          <Text style={styles.storeTitle}>Boutique</Text>
          <TouchableOpacity
            style={styles.dateCityRow}
            activeOpacity={0.7}
            onPress={onNavigateToFlavors}
          >
            <Text style={styles.dateCityText}>Société Nidjeu • Douala</Text>
            <ChevronRightIcon size={12} color={COLORS.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Freshness / Weather badge pill */}
        <View style={styles.weatherBadge}>
          <SunCloudIcon size={18} color="#F59E0B" />
          <Text style={styles.weatherText}>28°C Frais</Text>
        </View>
      </View>

      {/* Featured Products Horizontal Scroll (The Signature Cards from Mockup) */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.carouselContainer}
        snapToInterval={width * 0.65 + SPACING.lg}
        decelerationRate="fast"
        onScroll={(e) => {
          const offsetX = e.nativeEvent.contentOffset.x;
          const index = Math.round(offsetX / (width * 0.65));
          setActiveCarouselIndex(index);
        }}
        scrollEventThrottle={16}
      >
        {/* Card 1: Cocktail de Bissap */}
        {FLAVORS_DATA.slice(0, 2).map((flavor, index) => {
          const isBissap = flavor.id === 'bissap';
          const cardBg = isBissap ? COLORS.cardBissap : COLORS.cardAnanas;
          const isAdded = justAddedId === flavor.id;

          return (
            <TouchableOpacity
              key={flavor.id}
              activeOpacity={0.92}
              onPress={() => onSelectFlavor(flavor)}
              style={[styles.featuredCard, { backgroundColor: cardBg }]}
            >
              {/* Floating Majestic Bottle Popping Over Card Edge */}
              <View style={styles.cardBottleContainer}>
                <Image
                  source={flavor.bottleImage}
                  style={styles.cardBottleImg}
                  resizeMode="contain"
                />
              </View>

              {/* Card Text Content */}
              <View style={styles.cardTextContent}>
                <Text style={styles.cardBadge}>
                  {isBissap ? 'Populaire' : 'Vitalité pure'}
                </Text>
                <Text style={styles.cardFlavorName}>{flavor.name}</Text>
                <Text style={styles.cardPrice}>
                  {flavor.pricePerUnit.toLocaleString('fr-FR')}{' '}
                  <Text style={styles.currency}>FCFA</Text>
                </Text>
              </View>

              {/* Docked Terracotta Corner Plus Button */}
              <TouchableOpacity
                onPress={() => handleQuickAdd(flavor)}
                activeOpacity={0.8}
                style={[
                  styles.cornerAddButton,
                  isAdded && styles.cornerAddButtonSuccess,
                ]}
              >
                {isAdded ? (
                  <CheckIcon size={18} color="#FFFFFF" />
                ) : (
                  <PlusIcon size={18} color="#FFFFFF" />
                )}
              </TouchableOpacity>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Carousel Pagination Dots */}
      <View style={styles.carouselDots}>
        <View
          style={[
            styles.dotPill,
            activeCarouselIndex === 0 && styles.dotPillActive,
          ]}
        />
        <View
          style={[
            styles.dotPill,
            activeCarouselIndex === 1 && styles.dotPillActive,
          ]}
        />
      </View>

      {/* Section "Nos Sélections Exclusives" (Mockup: Will Buy >) */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Nos Sélections Exclusives</Text>
        <TouchableOpacity
          onPress={onNavigateToFlavors}
          style={styles.sectionLink}
        >
          <ChevronRightIcon size={16} color={COLORS.textSecondary} />
        </TouchableOpacity>
      </View>

      {/* Horizontal Elevated Product Cards */}
      <View style={styles.listContainer}>
        {/* Item 1: Pack Découverte Duo */}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => onSelectFlavor(FLAVORS_DATA[2] || FLAVORS_DATA[0])}
          style={styles.horizontalCard}
        >
          <View style={[styles.thumbBox, { backgroundColor: COLORS.cardBissap }]}>
            <Image
              source={require('../../assets/images/bottle-bissap.png')}
              style={styles.thumbImage}
              resizeMode="contain"
            />
          </View>
          <View style={styles.horizontalCardInfo}>
            <Text style={styles.horizontalCardTitle}>Pack Découverte Duo</Text>
            <Text style={styles.horizontalCardDesc}>3x Bissap + 3x Ananas (50cl)</Text>
            <Text style={styles.horizontalCardPrice}>5 500 FCFA</Text>
          </View>
          <TouchableOpacity
            onPress={() => handleQuickAdd(FLAVORS_DATA[2] || FLAVORS_DATA[0])}
            activeOpacity={0.8}
            style={styles.horizontalAddButton}
          >
            <PlusIcon size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </TouchableOpacity>

        {/* Item 2: Jus d'Ananas Gingembre */}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => onSelectFlavor(FLAVORS_DATA[1])}
          style={styles.horizontalCard}
        >
          <View style={[styles.thumbBox, { backgroundColor: COLORS.cardAnanas }]}>
            <Image
              source={require('../../assets/images/bottle-ananas.png')}
              style={styles.thumbImage}
              resizeMode="contain"
            />
          </View>
          <View style={styles.horizontalCardInfo}>
            <Text style={styles.horizontalCardTitle}>Ananas Gingembre Pur</Text>
            <Text style={styles.horizontalCardDesc}>Énergie tonique du terroir</Text>
            <Text style={styles.horizontalCardPrice}>1 000 FCFA</Text>
          </View>
          <TouchableOpacity
            onPress={() => handleQuickAdd(FLAVORS_DATA[1])}
            activeOpacity={0.8}
            style={styles.horizontalAddButton}
          >
            <PlusIcon size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </TouchableOpacity>

        {/* Item 3: Cocktail de Bissap */}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => onSelectFlavor(FLAVORS_DATA[0])}
          style={styles.horizontalCard}
        >
          <View style={[styles.thumbBox, { backgroundColor: COLORS.cardBissap }]}>
            <Image
              source={require('../../assets/images/bottle-bissap.png')}
              style={styles.thumbImage}
              resizeMode="contain"
            />
          </View>
          <View style={styles.horizontalCardInfo}>
            <Text style={styles.horizontalCardTitle}>Cocktail de Bissap</Text>
            <Text style={styles.horizontalCardDesc}>Infusion royale d’hibiscus</Text>
            <Text style={styles.horizontalCardPrice}>1 000 FCFA</Text>
          </View>
          <TouchableOpacity
            onPress={() => handleQuickAdd(FLAVORS_DATA[0])}
            activeOpacity={0.8}
            style={styles.horizontalAddButton}
          >
            <PlusIcon size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingBottom: 90,
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.lg,
  },
  storeTitle: {
    ...TYPOGRAPHY.displayLarge,
    color: COLORS.textPrimary,
  },
  dateCityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  dateCityText: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    fontSize: 12,
  },
  weatherBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs + 2,
    borderRadius: RADIUS.pill,
    gap: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.soft,
  },
  weatherText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textPrimary,
    fontWeight: '700',
  },
  carouselContainer: {
    paddingLeft: SPACING.xl,
    paddingRight: SPACING.xl,
    paddingTop: 45,
    paddingBottom: SPACING.lg,
    gap: SPACING.lg,
  },
  featuredCard: {
    width: width * 0.58,
    height: 250,
    borderRadius: RADIUS.lg,
    position: 'relative',
    justifyContent: 'flex-end',
    padding: SPACING.lg,
    ...SHADOWS.card,
  },
  cardBottleContainer: {
    position: 'absolute',
    top: -42,
    right: 18,
    zIndex: 10,
    ...SHADOWS.heroProduct,
  },
  cardBottleImg: {
    width: 105,
    height: 195,
    transform: [{ rotate: '8deg' }],
  },
  cardTextContent: {
    marginBottom: SPACING.xs,
    paddingRight: SPACING.xl,
  },
  cardBadge: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    fontWeight: '700',
    marginBottom: 2,
  },
  cardFlavorName: {
    ...TYPOGRAPHY.title2,
    color: COLORS.textPrimary,
    marginBottom: 6,
  },
  cardPrice: {
    ...TYPOGRAPHY.headline,
    color: COLORS.brandOrange,
    fontWeight: '800',
  },
  currency: {
    fontSize: 10,
    fontWeight: '600',
  },
  cornerAddButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 44,
    height: 44,
    borderTopLeftRadius: 16,
    borderBottomRightRadius: RADIUS.lg,
    backgroundColor: COLORS.brandOrange,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cornerAddButtonSuccess: {
    backgroundColor: COLORS.brandGreen,
  },
  carouselDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    marginBottom: SPACING.xl,
  },
  dotPill: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.border,
  },
  dotPillActive: {
    width: 18,
    backgroundColor: COLORS.brandOrange,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    ...TYPOGRAPHY.title1,
    color: COLORS.textPrimary,
  },
  sectionLink: {
    padding: SPACING.xs,
  },
  listContainer: {
    paddingHorizontal: SPACING.xl,
    gap: SPACING.md,
  },
  horizontalCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    position: 'relative',
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.soft,
  },
  thumbBox: {
    width: 58,
    height: 58,
    borderRadius: RADIUS.sm,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  thumbImage: {
    width: 32,
    height: 54,
  },
  horizontalCardInfo: {
    flex: 1,
    paddingRight: SPACING.xl,
  },
  horizontalCardTitle: {
    ...TYPOGRAPHY.headline,
    color: COLORS.textPrimary,
  },
  horizontalCardDesc: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginTop: 1,
  },
  horizontalCardPrice: {
    ...TYPOGRAPHY.bodyBold,
    color: COLORS.brandOrange,
    marginTop: 3,
  },
  horizontalAddButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 38,
    height: 38,
    borderTopLeftRadius: 14,
    borderBottomRightRadius: RADIUS.md,
    backgroundColor: COLORS.brandOrange,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
