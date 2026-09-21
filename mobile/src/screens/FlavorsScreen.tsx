/* ==========================================================================
   NIDJ JUICE (MOBILE) — FLAVORS & NUTRITION CATALOG SCREEN
   Studio Minimalist Clean Aesthetic • Pure Typography & Vectors
   ========================================================================== */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS, TOUCH } from '../theme/tokens';
import { FLAVORS_DATA } from '../data/flavors.data';
import type { Flavor, FlavorId } from '../types/product.types';
import {
  PlusIcon,
  ChevronRightIcon,
  VolumeIcon,
  LeafIcon,
  DropIcon,
} from '../components/Icons';
import { useCart } from '../context/CartContext';

interface FlavorsScreenProps {
  onSelectFlavor: (flavor: Flavor) => void;
  onNavigateToCart: () => void;
}

export const FlavorsScreen: React.FC<FlavorsScreenProps> = ({
  onSelectFlavor,
  onNavigateToCart,
}) => {
  const { addToCart } = useCart();
  const [activeFilter, setActiveFilter] = useState<'all' | FlavorId>('all');

  const filteredFlavors =
    activeFilter === 'all'
      ? FLAVORS_DATA
      : FLAVORS_DATA.filter((f) => f.id === activeFilter);

  return (
    <View style={styles.container}>
      {/* Category Pills Bar */}
      <View style={styles.filterBar}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScroll}
        >
          {[
            { key: 'all', label: 'Toutes les Saveurs' },
            { key: 'bissap', label: 'Cocktail Bissap' },
            { key: 'ananas', label: 'Ananas Gingembre' },
            { key: 'duo', label: 'Packs Découverte' },
          ].map((tab) => {
            const isSelected = activeFilter === tab.key;
            return (
              <TouchableOpacity
                key={tab.key}
                onPress={() => setActiveFilter(tab.key as any)}
                activeOpacity={0.7}
                style={[
                  styles.filterPill,
                  isSelected && styles.filterPillActive,
                ]}
              >
                <Text
                  style={[
                    styles.filterText,
                    isSelected && styles.filterTextActive,
                  ]}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Products List */}
      <ScrollView
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredFlavors.map((flavor) => {
          const isBissap = flavor.id === 'bissap';
          const cardBg = isBissap ? COLORS.cardBissap : COLORS.cardAnanas;

          return (
            <TouchableOpacity
              key={flavor.id}
              activeOpacity={0.92}
              onPress={() => onSelectFlavor(flavor)}
              style={styles.catalogCard}
            >
              <View style={styles.cardMainRow}>
                {/* Bottle Visual on Soft Tinted Backdrop */}
                <View style={[styles.bottleVisualBox, { backgroundColor: cardBg }]}>
                  <Image
                    source={flavor.bottleImage}
                    style={styles.bottleVisual}
                    resizeMode="contain"
                  />
                </View>

                {/* Details */}
                <View style={styles.detailsCol}>
                  <Text style={styles.categoryLabel}>{flavor.category}</Text>
                  <Text style={styles.flavorTitle}>{flavor.name}</Text>
                  <Text style={styles.flavorDesc} numberOfLines={2}>
                    {flavor.description}
                  </Text>
                  <View style={styles.priceRow}>
                    <Text style={styles.priceValue}>
                      {flavor.pricePerUnit.toLocaleString('fr-FR')}{' '}
                      <Text style={styles.priceUnit}>FCFA / 50cl</Text>
                    </Text>
                  </View>
                </View>
              </View>

              {/* Attributes Mini-Pills (No emojis, clean vector icons) */}
              <View style={styles.attributeRow}>
                <View style={styles.attrPill}>
                  <VolumeIcon size={14} color={COLORS.textSecondary} />
                  <Text style={styles.attrText}>500 ml</Text>
                </View>
                <View style={styles.attrPill}>
                  <LeafIcon size={14} color={COLORS.brandGreen} />
                  <Text style={styles.attrText}>100% Naturel</Text>
                </View>
                <View style={styles.attrPill}>
                  <DropIcon size={14} color={COLORS.brandOrange} />
                  <Text style={styles.attrText}>0% Sucre raffiné</Text>
                </View>
              </View>

              {/* Action Bar */}
              <View style={styles.cardFooter}>
                <Text style={styles.viewDetailText}>Découvrir la fiche produit</Text>
                <ChevronRightIcon size={14} color={COLORS.brandOrange} />
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  filterBar: {
    backgroundColor: COLORS.surface,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  filterScroll: {
    paddingHorizontal: SPACING.xl,
    gap: SPACING.sm,
  },
  filterPill: {
    paddingHorizontal: SPACING.lg,
    height: 36,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.surfaceSubtle,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterPillActive: {
    backgroundColor: COLORS.textPrimary,
  },
  filterText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  filterTextActive: {
    color: COLORS.textLight,
  },
  listContent: {
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.lg,
    paddingBottom: 110,
    gap: SPACING.lg,
  },
  catalogCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.soft,
  },
  cardMainRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottleVisualBox: {
    width: 85,
    height: 120,
    borderRadius: RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  bottleVisual: {
    width: 55,
    height: 110,
  },
  detailsCol: {
    flex: 1,
  },
  categoryLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.brandOrange,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  flavorTitle: {
    ...TYPOGRAPHY.title1,
    color: COLORS.textPrimary,
    marginTop: 2,
    marginBottom: 4,
  },
  flavorDesc: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    fontSize: 12,
    lineHeight: 16,
  },
  priceRow: {
    marginTop: SPACING.xs,
  },
  priceValue: {
    ...TYPOGRAPHY.title2,
    color: COLORS.textPrimary,
    fontWeight: '800',
  },
  priceUnit: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    fontWeight: '400',
  },
  attributeRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginTop: SPACING.md,
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderSoft,
  },
  attrPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.surfaceSubtle,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: RADIUS.sm,
  },
  attrText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.sm,
  },
  viewDetailText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.brandOrange,
    fontWeight: '700',
  },
});
