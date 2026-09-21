/* ==========================================================================
   NIDJ JUICE (MOBILE) — HEADER BAR (APPBAR)
   Société Nidjeu — Cameroun
   ========================================================================== */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
  Platform,
} from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS } from '../theme/tokens';
import { COMPANY_CONTACT } from '../data/stores.data';
import { useCart } from '../context/CartContext';

interface HeaderBarProps {
  onCartPress?: () => void;
  title?: string;
  subtitle?: string;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  onCartPress,
  title,
  subtitle,
}) => {
  const { totalCount } = useCart();

  const handleCallHotline = () => {
    Linking.openURL(`tel:${COMPANY_CONTACT.phoneRaw}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <Image
          source={require('../../assets/images/logo-nidj.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.titleCol}>
          <Text style={styles.brandTitle}>{title || 'NIDJ JUICE'}</Text>
          <View style={styles.originRow}>
            <Text style={styles.flag}>🇨🇲</Text>
            <Text style={styles.originText}>{subtitle || 'Société Nidjeu'}</Text>
          </View>
        </View>
      </View>

      <View style={styles.rightSection}>
        {/* Quick Phone / WhatsApp Call */}
        <TouchableOpacity
          style={styles.hotlineBtn}
          onPress={handleCallHotline}
          activeOpacity={0.7}
        >
          <Text style={styles.hotlineIcon}>📞</Text>
          <Text style={styles.hotlineText}>+237</Text>
        </TouchableOpacity>

        {/* Cart Quick Button */}
        {onCartPress && (
          <TouchableOpacity
            style={styles.cartBtn}
            onPress={onCartPress}
            activeOpacity={0.7}
          >
            <Text style={styles.cartIcon}>🛒</Text>
            {totalCount > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{totalCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingTop: Platform.OS === 'ios' ? 50 : 16,
    paddingBottom: SPACING.md,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    ...SHADOWS.card,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 36,
    height: 36,
    marginRight: SPACING.sm + 2,
  },
  titleCol: {
    justifyContent: 'center',
  },
  brandTitle: {
    ...TYPOGRAPHY.title2,
    color: COLORS.primaryDark,
    letterSpacing: 0.5,
  },
  originRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 1,
  },
  flag: {
    fontSize: 11,
    marginRight: 4,
  },
  originText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  hotlineBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceSubtle,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs + 2,
    borderRadius: RADIUS.pill,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  hotlineIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  hotlineText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.primaryDark,
    fontWeight: '700',
  },
  cartBtn: {
    width: 42,
    height: 42,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.primaryDark,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  cartIcon: {
    fontSize: 18,
  },
  cartBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: COLORS.accentBissap,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.surface,
  },
  cartBadgeText: {
    color: COLORS.textLight,
    fontSize: 10,
    fontWeight: '800',
  },
});
