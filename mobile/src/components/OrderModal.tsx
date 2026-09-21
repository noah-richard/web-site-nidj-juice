/* ==========================================================================
   NIDJ JUICE (MOBILE) — ORDER / PACK SELECTION MODAL (BOTTOMSHEET FEEL)
   Société Nidjeu — Cameroun
   ========================================================================== */

import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { COLORS, TYPOGRAPHY, RADIUS, SPACING, SHADOWS, TOUCH } from '../theme/tokens';
import type { Flavor } from '../types/product.types';
import { Button } from './Button';
import { Badge } from './Badge';
import { useCart } from '../context/CartContext';

interface OrderModalProps {
  visible: boolean;
  flavor: Flavor | null;
  onClose: () => void;
  onGoToCart: () => void;
}

type SelectedPack = 'Bouteille 50cl' | 'Pack 6x 50cl' | 'Carton 12x 50cl';

export const OrderModal: React.FC<OrderModalProps> = ({
  visible,
  flavor,
  onClose,
  onGoToCart,
}) => {
  const { addToCart } = useCart();
  const [selectedFormat, setSelectedFormat] = useState<SelectedPack>('Pack 6x 50cl');
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  if (!flavor) return null;

  const getPriceForFormat = (fmt: SelectedPack) => {
    switch (fmt) {
      case 'Carton 12x 50cl':
        return flavor.pricePack12;
      case 'Pack 6x 50cl':
        return flavor.pricePack6;
      case 'Bouteille 50cl':
      default:
        return flavor.pricePerUnit;
    }
  };

  const currentUnitPrice = getPriceForFormat(selectedFormat);
  const totalPrice = currentUnitPrice * quantity;

  const handleAddToCart = () => {
    addToCart(flavor.id, flavor.name, selectedFormat, currentUnitPrice, quantity);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      onClose();
    }, 900);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onClose}
        />
        <View style={styles.sheetContainer}>
          <View style={styles.grabber} />

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Header Product Info */}
            <View style={styles.productHeader}>
              <Image
                source={flavor.bottleImage}
                style={styles.bottleThumb}
                resizeMode="contain"
              />
              <View style={styles.productMeta}>
                <Badge
                  label={flavor.badgeText}
                  variant={flavor.id === 'ananas' ? 'gold' : flavor.id === 'bissap' ? 'ruby' : 'green'}
                />
                <Text style={styles.productTitle}>{flavor.name}</Text>
                <Text style={styles.productSubtitle}>{flavor.subtitle}</Text>
                <Text style={styles.productPrice}>
                  {currentUnitPrice.toLocaleString('fr-FR')} FCFA{' '}
                  <Text style={styles.priceUnit}>/ {selectedFormat}</Text>
                </Text>
              </View>
            </View>

            {/* Format Selector */}
            <Text style={styles.sectionTitle}>Choisir le format :</Text>
            <View style={styles.formatsRow}>
              {(['Bouteille 50cl', 'Pack 6x 50cl', 'Carton 12x 50cl'] as SelectedPack[]).map(
                (fmt) => {
                  const isSelected = selectedFormat === fmt;
                  const price = getPriceForFormat(fmt);
                  return (
                    <TouchableOpacity
                      key={fmt}
                      onPress={() => setSelectedFormat(fmt)}
                      activeOpacity={0.7}
                      style={[
                        styles.formatCard,
                        isSelected && styles.formatCardActive,
                      ]}
                    >
                      <Text
                        style={[
                          styles.formatLabel,
                          isSelected && styles.formatLabelActive,
                        ]}
                      >
                        {fmt}
                      </Text>
                      <Text
                        style={[
                          styles.formatPrice,
                          isSelected && styles.formatPriceActive,
                        ]}
                      >
                        {price.toLocaleString('fr-FR')} F
                      </Text>
                    </TouchableOpacity>
                  );
                }
              )}
            </View>

            {/* Quantity Selector */}
            <View style={styles.quantityRow}>
              <Text style={styles.sectionTitle}>Quantité :</Text>
              <View style={styles.stepper}>
                <TouchableOpacity
                  onPress={() => setQuantity((q) => Math.max(1, q - 1))}
                  style={styles.stepperBtn}
                >
                  <Text style={styles.stepperBtnText}>−</Text>
                </TouchableOpacity>
                <Text style={styles.stepperValue}>{quantity}</Text>
                <TouchableOpacity
                  onPress={() => setQuantity((q) => q + 1)}
                  style={styles.stepperBtn}
                >
                  <Text style={styles.stepperBtnText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Total recap */}
            <View style={styles.totalBox}>
              <Text style={styles.totalLabel}>Total commande :</Text>
              <Text style={styles.totalValue}>
                {totalPrice.toLocaleString('fr-FR')} FCFA
              </Text>
            </View>

            {/* CTA Buttons */}
            <View style={styles.ctaGroup}>
              <Button
                title={justAdded ? '✓ Ajouté au Panier !' : 'Ajouter au Panier'}
                onPress={handleAddToCart}
                variant={justAdded ? 'dark' : 'primary'}
                size="large"
              />
              <View style={{ height: SPACING.sm }} />
              <Button
                title="Consulter le Panier"
                onPress={() => {
                  onClose();
                  onGoToCart();
                }}
                variant="outline"
                size="normal"
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(10, 61, 34, 0.45)',
    justifyContent: 'flex-end',
  },
  backdrop: {
    flex: 1,
  },
  sheetContainer: {
    backgroundColor: COLORS.surface,
    borderTopLeftRadius: RADIUS.lg,
    borderTopRightRadius: RADIUS.lg,
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.md,
    paddingBottom: SPACING.xxxl,
    maxHeight: '85%',
    ...SHADOWS.floating,
  },
  grabber: {
    width: 44,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: COLORS.border,
    alignSelf: 'center',
    marginBottom: SPACING.lg,
  },
  productHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  bottleThumb: {
    width: 65,
    height: 110,
    marginRight: SPACING.md,
  },
  productMeta: {
    flex: 1,
    justifyContent: 'center',
  },
  productTitle: {
    ...TYPOGRAPHY.title2,
    color: COLORS.primaryDark,
    marginTop: 4,
  },
  productSubtitle: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  productPrice: {
    ...TYPOGRAPHY.title2,
    color: COLORS.primary,
    fontWeight: '800',
  },
  priceUnit: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  sectionTitle: {
    ...TYPOGRAPHY.headline,
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  formatsRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginBottom: SPACING.lg,
  },
  formatCard: {
    flex: 1,
    backgroundColor: COLORS.surfaceSubtle,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    alignItems: 'center',
  },
  formatCardActive: {
    backgroundColor: '#EEF7E8',
    borderColor: COLORS.primary,
  },
  formatLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
  },
  formatLabelActive: {
    color: COLORS.primaryDark,
    fontWeight: '700',
  },
  formatPrice: {
    ...TYPOGRAPHY.bodyBold,
    color: COLORS.textPrimary,
  },
  formatPriceActive: {
    color: COLORS.primary,
    fontWeight: '800',
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.lg,
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceSubtle,
    borderRadius: RADIUS.pill,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 4,
  },
  stepperBtn: {
    width: TOUCH.minTarget - 10,
    height: TOUCH.minTarget - 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepperBtnText: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.primaryDark,
  },
  stepperValue: {
    ...TYPOGRAPHY.headline,
    fontWeight: '800',
    color: COLORS.primaryDark,
    paddingHorizontal: SPACING.md,
  },
  totalBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.md,
    backgroundColor: COLORS.surfaceSubtle,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.lg,
  },
  totalLabel: {
    ...TYPOGRAPHY.headline,
    color: COLORS.textSecondary,
  },
  totalValue: {
    ...TYPOGRAPHY.title1,
    color: COLORS.primaryDark,
    fontWeight: '800',
  },
  ctaGroup: {
    marginTop: SPACING.xs,
  },
});
