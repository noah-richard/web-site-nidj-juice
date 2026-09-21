/* ==========================================================================
   NIDJ JUICE (MOBILE) — STORES & DISTRIBUTION NETWORK
   Studio Minimalist Clean Aesthetic • Pure Vector Icons • Zero Emojis
   ========================================================================== */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS, TOUCH } from '../theme/tokens';
import { STORES_DATA, COMPANY_CONTACT } from '../data/stores.data';
import type { CameroonCity } from '../types/product.types';
import {
  SearchIcon,
  PhoneIcon,
  MessageSquareIcon,
  StoreIcon,
} from '../components/Icons';

export const StoresScreen: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<'All' | CameroonCity>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const cities: ('All' | CameroonCity)[] = ['All', 'Douala', 'Yaoundé', 'Bafoussam', 'Kribi'];

  const filteredStores = STORES_DATA.filter((store) => {
    const matchesCity = selectedCity === 'All' || store.city === selectedCity;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      query === '' ||
      store.name.toLowerCase().includes(query) ||
      store.neighborhood.toLowerCase().includes(query) ||
      store.address.toLowerCase().includes(query);
    return matchesCity && matchesSearch;
  });

  const handleCall = (phone: string) => {
    Linking.openURL(`tel:${phone.replace(/\s+/g, '')}`);
  };

  const handleWhatsApp = (storeName: string) => {
    const text = encodeURIComponent(
      `Bonjour Société Nidjeu, je recherche des bouteilles de Nidj Juice au point de vente : ${storeName}`
    );
    Linking.openURL(`https://wa.me/237699000000?text=${text}`);
  };

  return (
    <View style={styles.container}>
      {/* Header Search & Filter */}
      <View style={styles.headerSection}>
        <Text style={styles.headerTitle}>Points de Vente</Text>
        <Text style={styles.headerSubtitle}>
          Réseau officiel de distribution • Cameroun
        </Text>

        {/* Minimalist Search Input */}
        <View style={styles.searchBar}>
          <SearchIcon size={18} color={COLORS.textSecondary} />
          <TextInput
            placeholder="Rechercher un quartier ou supermarché..."
            placeholderTextColor={COLORS.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
          />
        </View>

        {/* City Filter Pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.cityScroll}
        >
          {cities.map((city) => {
            const isSelected = selectedCity === city;
            return (
              <TouchableOpacity
                key={city}
                onPress={() => setSelectedCity(city)}
                style={[styles.cityPill, isSelected && styles.cityPillActive]}
              >
                <Text
                  style={[
                    styles.cityText,
                    isSelected && styles.cityTextActive,
                  ]}
                >
                  {city === 'All' ? 'Tous' : city}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Stores List */}
      <ScrollView
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.counterRow}>
          <Text style={styles.counterText}>
            {filteredStores.length} boutique{filteredStores.length > 1 ? 's' : ''} disponible{filteredStores.length > 1 ? 's' : ''}
          </Text>
          <Text style={styles.cacheNotice}>Sauvegardé hors-ligne</Text>
        </View>

        {filteredStores.map((store) => (
          <View key={store.id} style={styles.storeCard}>
            <View style={styles.cardTop}>
              <View style={{ flex: 1 }}>
                <View style={styles.typeRow}>
                  <Text style={styles.typeBadge}>{store.type.toUpperCase()}</Text>
                  <View
                    style={[
                      styles.statusDot,
                      { backgroundColor: store.isOpenNow ? COLORS.brandGreen : COLORS.textMuted },
                    ]}
                  />
                  <Text style={styles.statusText}>
                    {store.isOpenNow ? 'Ouvert' : 'Fermé'}
                  </Text>
                </View>
                <Text style={styles.storeName}>{store.name}</Text>
                <Text style={styles.storeLocation}>
                  {store.neighborhood} — {store.address}
                </Text>
              </View>

              {store.distanceKm && (
                <View style={styles.distanceBadge}>
                  <Text style={styles.distanceVal}>{store.distanceKm} km</Text>
                </View>
              )}
            </View>

            {/* Actions: Call & WhatsApp */}
            <View style={styles.cardActions}>
              <TouchableOpacity
                onPress={() => handleCall(store.phone)}
                activeOpacity={0.7}
                style={styles.callButton}
              >
                <PhoneIcon size={14} color={COLORS.textPrimary} />
                <Text style={styles.callButtonText}>{store.phone}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleWhatsApp(store.name)}
                activeOpacity={0.7}
                style={styles.waButton}
              >
                <MessageSquareIcon size={14} color="#FFFFFF" />
                <Text style={styles.waButtonText}>WhatsApp</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerSection: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    ...TYPOGRAPHY.display,
    color: COLORS.textPrimary,
  },
  headerSubtitle: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginTop: 2,
    marginBottom: SPACING.md,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceSubtle,
    borderRadius: RADIUS.pill,
    height: 44,
    paddingHorizontal: SPACING.md,
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  searchInput: {
    flex: 1,
    ...TYPOGRAPHY.body,
    color: COLORS.textPrimary,
  },
  cityScroll: {
    gap: SPACING.xs,
  },
  cityPill: {
    paddingHorizontal: SPACING.lg,
    height: 34,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.surfaceSubtle,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cityPillActive: {
    backgroundColor: COLORS.brandOrange,
  },
  cityText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  cityTextActive: {
    color: COLORS.textLight,
  },
  listContent: {
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.lg,
    paddingBottom: 110,
    gap: SPACING.md,
  },
  counterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  counterText: {
    ...TYPOGRAPHY.caption,
    fontWeight: '700',
    color: COLORS.textSecondary,
  },
  cacheNotice: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.brandGreen,
  },
  storeCard: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    ...SHADOWS.soft,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
  },
  typeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  typeBadge: {
    ...TYPOGRAPHY.badge,
    color: COLORS.brandOrange,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  storeName: {
    ...TYPOGRAPHY.title2,
    color: COLORS.textPrimary,
  },
  storeLocation: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  distanceBadge: {
    backgroundColor: COLORS.brandOrangeSoft,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: RADIUS.sm,
  },
  distanceVal: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.brandOrange,
  },
  cardActions: {
    flexDirection: 'row',
    gap: SPACING.sm,
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderSoft,
  },
  callButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.surfaceSubtle,
    height: 38,
    borderRadius: RADIUS.pill,
    gap: 6,
  },
  callButtonText: {
    ...TYPOGRAPHY.caption,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  waButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#25D366',
    paddingHorizontal: SPACING.lg,
    height: 38,
    borderRadius: RADIUS.pill,
    gap: 6,
  },
  waButtonText: {
    ...TYPOGRAPHY.caption,
    fontWeight: '700',
    color: COLORS.textLight,
  },
});
