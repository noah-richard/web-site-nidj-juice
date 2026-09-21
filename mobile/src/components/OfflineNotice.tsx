/* ==========================================================================
   NIDJ JUICE (MOBILE) — OFFLINE NOTICE & NETWORK STATUS
   Société Nidjeu — Cameroun
   ========================================================================== */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING } from '../theme/tokens';

interface OfflineNoticeProps {
  isOffline?: boolean;
}

export const OfflineNotice: React.FC<OfflineNoticeProps> = ({ isOffline = false }) => {
  if (!isOffline) return null;

  return (
    <View style={styles.banner}>
      <Text style={styles.icon}>📡</Text>
      <Text style={styles.text}>
        Mode Hors-Ligne actif • Catalogue et points de vente consultables
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#37474F',
    paddingVertical: SPACING.xs + 2,
    paddingHorizontal: SPACING.md,
  },
  icon: {
    fontSize: 12,
    marginRight: SPACING.xs,
  },
  text: {
    ...TYPOGRAPHY.caption,
    color: '#ECEFF1',
    fontWeight: '600',
  },
});
