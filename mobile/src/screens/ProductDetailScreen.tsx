/* ==========================================================================
   NIDJ JUICE (MOBILE) — PRODUCT DETAIL SCREEN
   Faithful recreation of the studio reference mockup (Right Screen)
   Wavy Organic Gradient • Popping Bottle Visual • Minimalist Attribute Cards
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
  SafeAreaView,
  Platform,
} from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS, TOUCH } from '../theme/tokens';
import type { Flavor } from '../types/product.types';
import {
  ArrowBackIcon,
  MoreDotsIcon,
  PlusIcon,
  VolumeIcon,
  LeafIcon,
  DropIcon,
  StarFilledIcon,
  ChevronRightIcon,
  CheckIcon,
} from '../components/Icons';
import { useCart } from '../context/CartContext';

const { width } = Dimensions.get('window');

interface ProductDetailScreenProps {
  flavor: Flavor;
  onBack: () => void;
  onNavigateToCart: () => void;
}

export const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({
  flavor,
  onBack,
  onNavigateToCart,
}) => {
  const { addToCart } = useCart();
  const [selectedFormat, setSelectedFormat] = useState<'50cl' | 'pack6'>('50cl');
  const [addedAnimation, setAddedAnimation] = useState(false);

  const price50cl = flavor.pricePerUnit;
  const pricePack6 = flavor.pricePack6;
  const currentPrice = selectedFormat === '50cl' ? price50cl : pricePack6;
  const currentFormatLabel = selectedFormat === '50cl' ? 'Bouteille 50cl' : 'Pack 6x 50cl';

  const handleAddToCart = () => {
    addToCart(flavor.id, flavor.name, currentFormatLabel, currentPrice, 1);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
    }, 1200);
  };

  const isBissap = flavor.id === 'bissap';
  const headerBgColor = isBissap ? '#FF8754' : '#F5A623';

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Top Organic Gradient Section */}
        <View style={[styles.headerHero, { backgroundColor: headerBgColor }]}>
          {/* Navigation Bar */}
          <SafeAreaView>
            <View style={styles.navRow}>
              <TouchableOpacity
                onPress={onBack}
                activeOpacity={0.7}
                style={styles.navIconButton}
              >
                <ArrowBackIcon color="#FFFFFF" size={22} />
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.7} style={styles.navIconButton}>
                <MoreDotsIcon color="#FFFFFF" size={20} />
              </TouchableOpacity>
            </View>
          </SafeAreaView>

          {/* Floating Price Pills on Left */}
          <View style={styles.pricePillsContainer}>
            <TouchableOpacity
              onPress={() => setSelectedFormat('50cl')}
              activeOpacity={0.8}
              style={[
                styles.pricePill,
                selectedFormat === '50cl' && styles.pricePillActive,
              ]}
            >
              <Text style={styles.pillPrice}>
                {price50cl.toLocaleString('fr-FR')} F
              </Text>
              <Text style={styles.pillLabel}>50cl</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setSelectedFormat('pack6')}
              activeOpacity={0.8}
              style={[
                styles.pricePill,
                selectedFormat === 'pack6' && styles.pricePillActive,
              ]}
            >
              <Text style={styles.pillPrice}>
                {pricePack6.toLocaleString('fr-FR')} F
              </Text>
              <Text style={styles.pillLabel}>Pack 6x</Text>
            </TouchableOpacity>
          </View>

          {/* Tilted Majestic Bottle Breaking Out */}
          <View style={styles.bottleContainer}>
            <Image
              source={flavor.bottleImage}
              style={styles.heroBottle}
              resizeMode="contain"
            />
          </View>

          {/* Organic Wave Divider */}
          <View style={styles.waveCurvature} />
        </View>

        {/* Floating Indicator Dots */}
        <View style={styles.dotsRow}>
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

        {/* Content Sheet Section */}
        <View style={styles.sheetSection}>
          {/* Title and Floating Quick-Add Button */}
          <View style={styles.titleActionRow}>
            <View style={{ flex: 1, paddingRight: SPACING.md }}>
              <Text style={styles.productTitle}>{flavor.name}</Text>
              <Text style={styles.productCategory}>{flavor.category}</Text>
            </View>

            {/* Docked Brand Orange Add Button */}
            <TouchableOpacity
              onPress={handleAddToCart}
              activeOpacity={0.8}
              style={[
                styles.quickAddButton,
                addedAnimation && styles.quickAddButtonSuccess,
              ]}
            >
              {addedAnimation ? (
                <CheckIcon size={20} color="#FFFFFF" />
              ) : (
                <PlusIcon size={20} color="#FFFFFF" />
              )}
            </TouchableOpacity>
          </View>

          {/* Description */}
          <Text style={styles.productDescription}>{flavor.description}</Text>

          {/* 3 Square Attribute Cards (Volume, Naturel, Sucre) */}
          <View style={styles.attributesGrid}>
            <View style={styles.attributeCard}>
              <View style={styles.attributeIconBox}>
                <VolumeIcon size={22} color={COLORS.brandOrange} />
              </View>
              <Text style={styles.attributeValue}>500 ml</Text>
              <Text style={styles.attributeLabel}>Format</Text>
            </View>

            <View style={styles.attributeCard}>
              <View style={styles.attributeIconBox}>
                <LeafIcon size={22} color={COLORS.brandOrange} />
              </View>
              <Text style={styles.attributeValue}>100% Frais</Text>
              <Text style={styles.attributeLabel}>Sans conservateur</Text>
            </View>

            <View style={styles.attributeCard}>
              <View style={styles.attributeIconBox}>
                <DropIcon size={22} color={COLORS.brandOrange} />
              </View>
              <Text style={styles.attributeValue}>0% Ajout</Text>
              <Text style={styles.attributeLabel}>Sucre naturel</Text>
            </View>
          </View>

          {/* Service & Guarantee Row */}
          <View style={styles.serviceSection}>
            <Text style={styles.serviceSectionTitle}>Origine & Garantie</Text>
            <View style={styles.serviceCard}>
              <Image
                source={require('../../assets/images/logo-nidj.png')}
                style={styles.brandAvatar}
                resizeMode="contain"
              />
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceBrandName}>Société Nidjeu</Text>
                <View style={styles.ratingRow}>
                  <StarFilledIcon size={13} color={COLORS.starGold} />
                  <StarFilledIcon size={13} color={COLORS.starGold} />
                  <StarFilledIcon size={13} color={COLORS.starGold} />
                  <StarFilledIcon size={13} color={COLORS.starGold} />
                  <StarFilledIcon size={13} color={COLORS.starGold} />
                  <Text style={styles.ratingScore}>4.9 (Douala, Cameroun)</Text>
                </View>
              </View>
              <ChevronRightIcon size={18} color={COLORS.textSecondary} />
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Sticky Bottom Dock Action */}
      <View style={styles.bottomDock}>
        <View style={styles.dockPriceBox}>
          <Text style={styles.dockPriceLabel}>Total à régler</Text>
          <Text style={styles.dockPriceValue}>
            {currentPrice.toLocaleString('fr-FR')} FCFA
          </Text>
        </View>

        <TouchableOpacity
          onPress={handleAddToCart}
          activeOpacity={0.85}
          style={styles.dockBuyBtn}
        >
          <Text style={styles.dockBuyText}>
            {addedAnimation ? 'Ajouté au Panier ✓' : 'Acheter'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  scrollContent: {
    paddingBottom: 110,
  },
  headerHero: {
    height: 380,
    position: 'relative',
    paddingHorizontal: SPACING.lg,
  },
  navRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 10 : 20,
  },
  navIconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.22)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pricePillsContainer: {
    position: 'absolute',
    left: SPACING.lg,
    top: 130,
    zIndex: 10,
    gap: SPACING.md,
  },
  pricePill: {
    backgroundColor: 'rgba(255, 255, 255, 0.28)',
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    minWidth: 78,
  },
  pricePillActive: {
    backgroundColor: COLORS.surface,
    ...SHADOWS.card,
  },
  pillPrice: {
    ...TYPOGRAPHY.bodyBold,
    color: COLORS.textPrimary,
  },
  pillLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    fontSize: 10,
  },
  bottleContainer: {
    position: 'absolute',
    right: 35,
    top: 80,
    zIndex: 8,
    ...SHADOWS.heroProduct,
  },
  heroBottle: {
    width: 170,
    height: 320,
    transform: [{ rotate: '8deg' }],
  },
  waveCurvature: {
    position: 'absolute',
    bottom: -1,
    left: 0,
    right: 0,
    height: 48,
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginTop: SPACING.xs,
    marginBottom: SPACING.sm,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.border,
  },
  dotActive: {
    width: 18,
    backgroundColor: COLORS.brandOrange,
  },
  sheetSection: {
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.sm,
  },
  titleActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  productTitle: {
    ...TYPOGRAPHY.display,
    color: COLORS.textPrimary,
  },
  productCategory: {
    ...TYPOGRAPHY.caption,
    color: COLORS.brandOrange,
    fontWeight: '700',
    marginTop: 2,
    letterSpacing: 0.5,
  },
  quickAddButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: COLORS.brandOrange,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.soft,
  },
  quickAddButtonSuccess: {
    backgroundColor: COLORS.brandGreen,
  },
  productDescription: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    lineHeight: 20,
    marginVertical: SPACING.md,
  },
  attributesGrid: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginVertical: SPACING.md,
  },
  attributeCard: {
    flex: 1,
    backgroundColor: COLORS.brandOrangeSoft,
    borderRadius: RADIUS.md,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.sm,
    alignItems: 'center',
  },
  attributeIconBox: {
    marginBottom: SPACING.xs,
  },
  attributeValue: {
    ...TYPOGRAPHY.bodyBold,
    color: COLORS.textPrimary,
    marginTop: 2,
  },
  attributeLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    fontSize: 10,
    marginTop: 1,
    textAlign: 'center',
  },
  serviceSection: {
    marginTop: SPACING.lg,
  },
  serviceSectionTitle: {
    ...TYPOGRAPHY.headline,
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  serviceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceSubtle,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
  },
  brandAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    marginRight: SPACING.md,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceBrandName: {
    ...TYPOGRAPHY.headline,
    color: COLORS.textPrimary,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginTop: 2,
  },
  ratingScore: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    fontSize: 10,
    marginLeft: 4,
  },
  bottomDock: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.md,
    paddingBottom: Platform.OS === 'ios' ? 32 : SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...SHADOWS.bottomBar,
  },
  dockPriceBox: {
    justifyContent: 'center',
  },
  dockPriceLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
  },
  dockPriceValue: {
    ...TYPOGRAPHY.title1,
    color: COLORS.textPrimary,
    fontWeight: '800',
  },
  dockBuyBtn: {
    backgroundColor: COLORS.brandOrange,
    paddingHorizontal: SPACING.xxxl,
    height: 50,
    borderRadius: RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.card,
  },
  dockBuyText: {
    ...TYPOGRAPHY.headline,
    color: COLORS.textLight,
    fontWeight: '800',
  },
});
