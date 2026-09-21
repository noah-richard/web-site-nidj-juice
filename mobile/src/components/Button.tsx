/* ==========================================================================
   NIDJ JUICE (MOBILE) — BUTTON COMPONENT
   Société Nidjeu — Cameroun
   48dp Minimum Touch Target • Haptic Feedback Ergonomics
   ========================================================================== */

import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
} from 'react-native';
import { COLORS, TYPOGRAPHY, RADIUS, SPACING, TOUCH } from '../theme/tokens';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'dark' | 'ruby' | 'gold' | 'outline';
  size?: 'normal' | 'large' | 'small';
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  style?: any;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'normal',
  icon,
  iconRight,
  loading = false,
  disabled = false,
  style,
}) => {
  const getContainerStyle = () => {
    switch (variant) {
      case 'dark':
        return { backgroundColor: COLORS.primaryDark, borderColor: COLORS.primaryDark };
      case 'ruby':
        return { backgroundColor: COLORS.accentBissap, borderColor: COLORS.accentBissap };
      case 'gold':
        return { backgroundColor: COLORS.accentAnanas, borderColor: COLORS.accentAnanas };
      case 'outline':
        return { backgroundColor: 'transparent', borderColor: COLORS.border, borderWidth: 1.5 };
      case 'primary':
      default:
        return { backgroundColor: COLORS.primary, borderColor: COLORS.primary };
    }
  };

  const getTextStyle = () => {
    if (variant === 'outline') {
      return { color: COLORS.textPrimary };
    }
    return { color: COLORS.textLight };
  };

  const getSizeStyle = () => {
    switch (size) {
      case 'small':
        return { height: 40, paddingHorizontal: SPACING.md };
      case 'large':
        return { height: 56, paddingHorizontal: SPACING.xxl };
      case 'normal':
      default:
        return { height: TOUCH.minTarget, paddingHorizontal: SPACING.xl };
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.82}
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        getContainerStyle(),
        getSizeStyle(),
        disabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'outline' ? COLORS.primary : COLORS.textLight}
          size="small"
        />
      ) : (
        <View style={styles.contentRow}>
          {icon && <View style={styles.iconLeft}>{icon}</View>}
          <Text style={[styles.text, getTextStyle()]}>{title}</Text>
          {iconRight && <View style={styles.iconRight}>{iconRight}</View>}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: RADIUS.pill,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: TOUCH.minTarget,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconLeft: {
    marginRight: SPACING.sm,
  },
  iconRight: {
    marginLeft: SPACING.sm,
  },
  text: {
    ...TYPOGRAPHY.headline,
    fontWeight: '700',
  },
  disabled: {
    opacity: 0.5,
  },
});
