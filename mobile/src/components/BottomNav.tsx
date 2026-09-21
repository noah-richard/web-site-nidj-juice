/* ==========================================================================
   NIDJ JUICE (MOBILE) — MINIMALIST AGENCY BOTTOM NAVIGATION BAR
   Pure Vector SVG Icons • Floating White Dock • 48dp Touch Targets
   ========================================================================== */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, TOUCH, SHADOWS, RADIUS } from '../theme/tokens';
import {
  HomeIcon,
  CompassIcon,
  StoreIcon,
  BagIcon,
} from './Icons';
import { useCart } from '../context/CartContext';

export type TabKey = 'home' | 'flavors' | 'stores' | 'cart';

interface BottomNavProps {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
}) => {
  const { totalCount } = useCart();

  const tabs: { key: TabKey; label: string; icon: any }[] = [
    { key: 'home', label: 'Boutique', icon: HomeIcon },
    { key: 'flavors', label: 'Saveurs', icon: CompassIcon },
    { key: 'stores', label: 'Points de Vente', icon: StoreIcon },
    { key: 'cart', label: 'Panier', icon: BagIcon },
  ];

  return (
    <View style={styles.dockWrapper}>
      <View style={styles.dockContainer}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          const IconComponent = tab.icon;
          const iconColor = isActive ? COLORS.brandOrange : COLORS.textMuted;

          return (
            <TouchableOpacity
              key={tab.key}
              onPress={() => onTabChange(tab.key)}
              activeOpacity={0.7}
              style={styles.tabItem}
            >
              <View style={styles.iconBox}>
                <IconComponent
                  color={iconColor}
                  size={21}
                  strokeWidth={isActive ? 2.3 : 1.8}
                />
                {Boolean(tab.key === 'cart' && totalCount > 0) && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{totalCount}</Text>
                  </View>
                )}
              </View>
              <Text
                style={[
                  styles.tabLabel,
                  isActive && styles.tabLabelActive,
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dockWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    paddingHorizontal: SPACING.md,
    paddingBottom: Platform.OS === 'ios' ? 24 : 12,
  },
  dockContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.pill,
    height: 62,
    alignItems: 'center',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: SPACING.sm,
    ...SHADOWS.bottomBar,
  },
  tabItem: {
    flex: 1,
    height: TOUCH.minTarget,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBox: {
    position: 'relative',
    marginBottom: 2,
  },
  tabLabel: {
    ...TYPOGRAPHY.caption,
    fontSize: 10,
    color: COLORS.textMuted,
    fontWeight: '500',
  },
  tabLabelActive: {
    color: COLORS.brandOrange,
    fontWeight: '700',
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -10,
    backgroundColor: COLORS.brandOrange,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 3,
    borderWidth: 1.5,
    borderColor: COLORS.surface,
  },
  badgeText: {
    color: COLORS.textLight,
    fontSize: 9,
    fontWeight: '800',
  },
});
