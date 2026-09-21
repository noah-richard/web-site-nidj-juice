/* ==========================================================================
   NIDJ JUICE (MOBILE) — CART & CHECKOUT SCREEN
   Studio Minimalist Clean Aesthetic • Pure Vector Icons • Zero Emojis
   ========================================================================== */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Linking,
  Platform,
} from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS, TOUCH } from '../theme/tokens';
import { useCart } from '../context/CartContext';
import type { PaymentMethod, CameroonCity } from '../types/product.types';
import {
  TrashIcon,
  CheckIcon,
  ChevronRightIcon,
  BagIcon,
} from '../components/Icons';

interface CartScreenProps {
  onNavigateToFlavors: () => void;
}

export const CartScreen: React.FC<CartScreenProps> = ({ onNavigateToFlavors }) => {
  const { items, totalCount, totalAmount, updateQuantity, removeFromCart, clearCart } =
    useCart();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [selectedCity, setSelectedCity] = useState<CameroonCity>('Douala');
  const [neighborhood, setNeighborhood] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('momo');
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const deliveryFee = totalAmount > 0 ? (totalAmount >= 10000 ? 0 : 1000) : 0;
  const grandTotal = totalAmount + deliveryFee;

  const handleConfirmOrder = () => {
    if (items.length === 0) {
      Alert.alert('Panier vide', 'Veuillez ajouter des jus avant de commander.');
      return;
    }
    if (!customerPhone.trim() || customerPhone.trim().length < 9) {
      Alert.alert(
        'Numéro requis',
        'Veuillez renseigner votre numéro de téléphone camerounais (+237) pour la livraison.'
      );
      return;
    }

    const itemsSummary = items
      .map((i) => `• ${i.quantity}x ${i.name} (${i.format}) — ${(i.unitPrice * i.quantity).toLocaleString('fr-FR')} FCFA`)
      .join('\n');

    const paymentLabel =
      paymentMethod === 'momo'
        ? 'MTN Mobile Money'
        : paymentMethod === 'om'
        ? 'Orange Money'
        : 'Paiement Cash à la livraison';

    const message = encodeURIComponent(
      `*COMMANDE NIDJ JUICE (APP MOBILE)*\n\n` +
      `Client : ${customerName || 'Client Nidj'}\n` +
      `Téléphone : ${customerPhone}\n` +
      `Ville & Quartier : ${selectedCity}, ${neighborhood || 'Non précisé'}\n` +
      `Paiement : ${paymentLabel}\n\n` +
      `Articles :\n${itemsSummary}\n\n` +
      `Livraison : ${deliveryFee === 0 ? 'Offerte' : `${deliveryFee} FCFA`}\n` +
      `Total : ${grandTotal.toLocaleString('fr-FR')} FCFA\n\n` +
      `Société Nidjeu — Cameroun`
    );

    setOrderConfirmed(true);
    setTimeout(() => {
      Linking.openURL(`https://wa.me/237699000000?text=${message}`);
    }, 500);
  };

  if (orderConfirmed) {
    return (
      <View style={styles.successContainer}>
        <View style={styles.successIconCircle}>
          <CheckIcon size={32} color="#FFFFFF" />
        </View>
        <Text style={styles.successTitle}>Commande Confirmée</Text>
        <Text style={styles.successDesc}>
          Merci pour votre confiance. Vos bouteilles fraîches de la Société Nidjeu sont en cours d'acheminement à {selectedCity}.
        </Text>
        <TouchableOpacity
          onPress={() => {
            clearCart();
            setOrderConfirmed(false);
          }}
          style={styles.primaryButton}
        >
          <Text style={styles.primaryButtonText}>Nouvelle Commande</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <View style={styles.emptyIconCircle}>
          <BagIcon size={36} color={COLORS.textMuted} />
        </View>
        <Text style={styles.emptyTitle}>Votre panier est vide</Text>
        <Text style={styles.emptyDesc}>
          Sélectionnez nos nectars 100% naturels pressés par la société Nidjeu.
        </Text>
        <TouchableOpacity
          onPress={onNavigateToFlavors}
          style={styles.primaryButton}
        >
          <Text style={styles.primaryButtonText}>Explorer les Saveurs</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.headerRow}>
          <Text style={styles.pageTitle}>Mon Panier</Text>
          <TouchableOpacity onPress={clearCart}>
            <Text style={styles.clearText}>Vider le panier</Text>
          </TouchableOpacity>
        </View>

        {/* Cart Items List */}
        <View style={styles.cardContainer}>
          {items.map((item) => (
            <View key={item.id} style={styles.itemRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemFormat}>{item.format}</Text>
                <Text style={styles.itemPrice}>
                  {(item.unitPrice * item.quantity).toLocaleString('fr-FR')} FCFA
                </Text>
              </View>

              {/* Minimalist Stepper */}
              <View style={styles.stepper}>
                <TouchableOpacity
                  onPress={() => updateQuantity(item.id, item.quantity - 1)}
                  style={styles.stepBtn}
                >
                  <Text style={styles.stepText}>−</Text>
                </TouchableOpacity>
                <Text style={styles.stepValue}>{item.quantity}</Text>
                <TouchableOpacity
                  onPress={() => updateQuantity(item.id, item.quantity + 1)}
                  style={styles.stepBtn}
                >
                  <Text style={styles.stepText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Delivery Details */}
        <View style={styles.cardContainer}>
          <Text style={styles.cardTitle}>Livraison au Cameroun</Text>

          <Text style={styles.inputLabel}>Nom complet</Text>
          <TextInput
            placeholder="Ex: Jean-Paul M."
            placeholderTextColor={COLORS.textMuted}
            value={customerName}
            onChangeText={setCustomerName}
            style={styles.textInput}
          />

          <Text style={styles.inputLabel}>Téléphone (MTN / Orange) *</Text>
          <TextInput
            placeholder="Ex: 699 00 00 00"
            placeholderTextColor={COLORS.textMuted}
            keyboardType="phone-pad"
            value={customerPhone}
            onChangeText={setCustomerPhone}
            style={styles.textInput}
          />

          <Text style={styles.inputLabel}>Ville de livraison</Text>
          <View style={styles.cityGrid}>
            {(['Douala', 'Yaoundé', 'Bafoussam', 'Kribi'] as CameroonCity[]).map((c) => (
              <TouchableOpacity
                key={c}
                onPress={() => setSelectedCity(c)}
                style={[styles.cityChip, selectedCity === c && styles.cityChipActive]}
              >
                <Text
                  style={[
                    styles.cityChipText,
                    selectedCity === c && styles.cityChipTextActive,
                  ]}
                >
                  {c}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.inputLabel}>Quartier & Précision</Text>
          <TextInput
            placeholder="Ex: Bonapriso, Rue des Palmiers"
            placeholderTextColor={COLORS.textMuted}
            value={neighborhood}
            onChangeText={setNeighborhood}
            style={styles.textInput}
          />
        </View>

        {/* Payment Methods */}
        <View style={styles.cardContainer}>
          <Text style={styles.cardTitle}>Mode de Règlement</Text>

          {/* MTN */}
          <TouchableOpacity
            onPress={() => setPaymentMethod('momo')}
            style={[styles.payOption, paymentMethod === 'momo' && styles.payOptionActive]}
          >
            <View style={[styles.radioCircle, paymentMethod === 'momo' && styles.radioCircleActive]} />
            <View style={{ flex: 1 }}>
              <Text style={styles.payName}>MTN Mobile Money</Text>
              <Text style={styles.paySub}>Paiement mobile instantané</Text>
            </View>
            <View style={styles.momoPill}>
              <Text style={styles.momoText}>MTN</Text>
            </View>
          </TouchableOpacity>

          {/* OM */}
          <TouchableOpacity
            onPress={() => setPaymentMethod('om')}
            style={[styles.payOption, paymentMethod === 'om' && styles.payOptionActive]}
          >
            <View style={[styles.radioCircle, paymentMethod === 'om' && styles.radioCircleActive]} />
            <View style={{ flex: 1 }}>
              <Text style={styles.payName}>Orange Money</Text>
              <Text style={styles.paySub}>Transfert sécurisé sans frais</Text>
            </View>
            <View style={styles.omPill}>
              <Text style={styles.omText}>ORANGE</Text>
            </View>
          </TouchableOpacity>

          {/* Cash */}
          <TouchableOpacity
            onPress={() => setPaymentMethod('cash')}
            style={[styles.payOption, paymentMethod === 'cash' && styles.payOptionActive]}
          >
            <View style={[styles.radioCircle, paymentMethod === 'cash' && styles.radioCircleActive]} />
            <View style={{ flex: 1 }}>
              <Text style={styles.payName}>Cash à la livraison</Text>
              <Text style={styles.paySub}>Règlement à la réception des bouteilles</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Recap */}
        <View style={styles.cardContainer}>
          <View style={styles.recapRow}>
            <Text style={styles.recapLabel}>Sous-total jus</Text>
            <Text style={styles.recapVal}>{totalAmount.toLocaleString('fr-FR')} FCFA</Text>
          </View>
          <View style={styles.recapRow}>
            <Text style={styles.recapLabel}>Frais de livraison</Text>
            <Text style={styles.recapVal}>
              {deliveryFee === 0 ? 'Offert' : `${deliveryFee.toLocaleString('fr-FR')} FCFA`}
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.recapTotalRow}>
            <Text style={styles.totalTitle}>Total à Payer</Text>
            <Text style={styles.totalVal}>{grandTotal.toLocaleString('fr-FR')} FCFA</Text>
          </View>

          <TouchableOpacity
            onPress={handleConfirmOrder}
            style={styles.checkoutButton}
          >
            <Text style={styles.checkoutButtonText}>
              Confirmer la Commande • {grandTotal.toLocaleString('fr-FR')} FCFA
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.xl,
    paddingBottom: 110,
    gap: SPACING.lg,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  pageTitle: {
    ...TYPOGRAPHY.display,
    color: COLORS.textPrimary,
  },
  clearText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.brandOrange,
    fontWeight: '700',
  },
  cardContainer: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.soft,
  },
  cardTitle: {
    ...TYPOGRAPHY.headline,
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderSoft,
  },
  itemName: {
    ...TYPOGRAPHY.headline,
    color: COLORS.textPrimary,
  },
  itemFormat: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginTop: 1,
  },
  itemPrice: {
    ...TYPOGRAPHY.bodyBold,
    color: COLORS.brandOrange,
    marginTop: 2,
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceSubtle,
    borderRadius: RADIUS.pill,
  },
  stepBtn: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  stepValue: {
    ...TYPOGRAPHY.headline,
    color: COLORS.textPrimary,
    paddingHorizontal: SPACING.sm,
  },
  inputLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    fontWeight: '700',
    marginTop: SPACING.sm,
    marginBottom: 4,
  },
  textInput: {
    backgroundColor: COLORS.surfaceSubtle,
    height: 42,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    ...TYPOGRAPHY.body,
    color: COLORS.textPrimary,
  },
  cityGrid: {
    flexDirection: 'row',
    gap: SPACING.xs,
    marginVertical: 4,
  },
  cityChip: {
    flex: 1,
    height: 34,
    backgroundColor: COLORS.surfaceSubtle,
    borderRadius: RADIUS.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cityChipActive: {
    backgroundColor: COLORS.textPrimary,
  },
  cityChipText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  cityChipTextActive: {
    color: COLORS.textLight,
  },
  payOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceSubtle,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  payOptionActive: {
    borderColor: COLORS.brandOrange,
    backgroundColor: COLORS.brandOrangeSoft,
  },
  radioCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: COLORS.border,
    marginRight: SPACING.md,
  },
  radioCircleActive: {
    borderColor: COLORS.brandOrange,
    backgroundColor: COLORS.brandOrange,
  },
  payName: {
    ...TYPOGRAPHY.headline,
    color: COLORS.textPrimary,
  },
  paySub: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    fontSize: 10,
  },
  momoPill: {
    backgroundColor: COLORS.mtnYellow,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: RADIUS.sm,
  },
  momoText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#000',
  },
  omPill: {
    backgroundColor: COLORS.orangeMoney,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: RADIUS.sm,
  },
  omText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#FFF',
  },
  recapRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.xs,
  },
  recapLabel: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
  },
  recapVal: {
    ...TYPOGRAPHY.bodyBold,
    color: COLORS.textPrimary,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.sm,
  },
  recapTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: SPACING.md,
  },
  totalTitle: {
    ...TYPOGRAPHY.title1,
    color: COLORS.textPrimary,
  },
  totalVal: {
    ...TYPOGRAPHY.title1,
    color: COLORS.brandOrange,
    fontWeight: '800',
  },
  checkoutButton: {
    backgroundColor: COLORS.brandOrange,
    height: 50,
    borderRadius: RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.card,
  },
  checkoutButtonText: {
    ...TYPOGRAPHY.headline,
    color: COLORS.textLight,
    fontWeight: '800',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xxxl,
  },
  emptyIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.surfaceSubtle,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  emptyTitle: {
    ...TYPOGRAPHY.title1,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  emptyDesc: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.xl,
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xxxl,
  },
  successIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.brandGreen,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  successTitle: {
    ...TYPOGRAPHY.display,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  successDesc: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.xl,
    lineHeight: 20,
  },
  primaryButton: {
    backgroundColor: COLORS.brandOrange,
    paddingHorizontal: SPACING.xxl,
    height: 46,
    borderRadius: RADIUS.pill,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButtonText: {
    ...TYPOGRAPHY.headline,
    color: COLORS.textLight,
  },
});
