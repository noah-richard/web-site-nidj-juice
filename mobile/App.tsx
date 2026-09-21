/* ==========================================================================
   NIDJ JUICE (MOBILE) — ROOT APPLICATION
   Studio-Grade Architecture • International Agency Standards
   Matching Reference Mockup (Left Store / Right Product Detail)
   ========================================================================== */

import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, StatusBar, Platform } from 'react-native';
import { CartProvider } from './src/context/CartContext';
import { BottomNav, type TabKey } from './src/components/BottomNav';
import { HomeScreen } from './src/screens/HomeScreen';
import { FlavorsScreen } from './src/screens/FlavorsScreen';
import { StoresScreen } from './src/screens/StoresScreen';
import { CartScreen } from './src/screens/CartScreen';
import { ProductDetailScreen } from './src/screens/ProductDetailScreen';
import type { Flavor } from './src/types/product.types';
import { COLORS } from './src/theme/tokens';

function MainApp() {
  const [activeTab, setActiveTab] = useState<TabKey>('home');
  const [detailFlavor, setDetailFlavor] = useState<Flavor | null>(null);

  const handleSelectFlavor = (flavor: Flavor) => {
    setDetailFlavor(flavor);
  };

  const handleBackFromDetail = () => {
    setDetailFlavor(null);
  };

  const renderActiveScreen = () => {
    if (detailFlavor) {
      return (
        <ProductDetailScreen
          flavor={detailFlavor}
          onBack={handleBackFromDetail}
          onNavigateToCart={() => {
            setDetailFlavor(null);
            setActiveTab('cart');
          }}
        />
      );
    }

    switch (activeTab) {
      case 'flavors':
        return (
          <FlavorsScreen
            onSelectFlavor={handleSelectFlavor}
            onNavigateToCart={() => setActiveTab('cart')}
          />
        );
      case 'stores':
        return <StoresScreen />;
      case 'cart':
        return (
          <CartScreen
            onNavigateToFlavors={() => setActiveTab('flavors')}
          />
        );
      case 'home':
      default:
        return (
          <HomeScreen
            onSelectFlavor={handleSelectFlavor}
            onNavigateToFlavors={() => setActiveTab('flavors')}
            onNavigateToCart={() => setActiveTab('cart')}
          />
        );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={detailFlavor ? (detailFlavor.id === 'bissap' ? '#FF8754' : '#F5A623') : COLORS.background}
      />
      <View style={styles.rootContainer}>
        {/* Main Content Area */}
        <View style={styles.screenContainer}>
          {renderActiveScreen()}
        </View>

        {/* Floating Bottom Nav (hidden during Product Detail Screen for clean Buy Dock) */}
        {!detailFlavor && (
          <BottomNav
            activeTab={activeTab}
            onTabChange={(tab) => {
              setDetailFlavor(null);
              setActiveTab(tab);
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <CartProvider>
      <MainApp />
    </CartProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  rootContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  screenContainer: {
    flex: 1,
  },
});
