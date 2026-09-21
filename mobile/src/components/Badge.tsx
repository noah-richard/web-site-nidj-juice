/* ==========================================================================
   NIDJ JUICE (MOBILE) — BADGE COMPONENT
   Société Nidjeu — Cameroun
   ========================================================================== */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, TYPOGRAPHY, RADIUS, SPACING } from '../theme/tokens';

interface BadgeProps {
  label: string;
  variant?: 'green' | 'ruby' | 'gold' | 'dark' | 'outline';
  icon?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'green',
  icon,
}) => {
  const getBadgeStyle = () => {
    switch (variant) {
      case 'ruby':
        return { backgroundColor: '#FDE8EE', borderColor: '#F8B4C8' };
      case 'gold':
        return { backgroundColor: '#FFF4E5', borderColor: '#FFE0B2' };
      case 'dark':
        return { backgroundColor: COLORS.primaryDark, borderColor: COLORS.primaryDark };
      case 'outline':
        return { backgroundColor: 'transparent', borderColor: COLORS.border };
      case 'green':
      default:
        return { backgroundColor: '#EEF7E8', borderColor: '#C8E6B8' };
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'ruby':
        return { color: COLORS.accentBissap };
      case 'gold':
        return { color: COLORS.accentAnanas };
      case 'dark':
        return { color: COLORS.textLight };
      case 'outline':
        return { color: COLORS.textSecondary };
      case 'green':
      default:
        return { color: COLORS.primaryDark };
    }
  };

  return (
    <View style={[styles.badgeContainer, getBadgeStyle()]}>
      {icon && <Text style={styles.icon}>{icon}</Text>}
      <Text style={[styles.badgeText, getTextStyle()]}>{label.toUpperCase()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs + 2,
    borderRadius: RADIUS.pill,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  icon: {
    fontSize: 12,
    marginRight: SPACING.xs,
  },
  badgeText: {
    ...TYPOGRAPHY.badge,
  },
});
