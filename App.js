import React, { useState } from 'react';
import { View, StyleSheet, Platform, StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import HomeScreen from './screens/HomeScreen';
import DensityScreen from './screens/DensityScreen';
import ConverterScreen from './screens/ConverterScreen';
import CustomDrawer from './components/CustomDrawer';
import AppHeader from './components/AppHeader';
import CompressibilityScreen from './screens/CompressibilityScreen';
import MeterCalibrationScreen from './screens/MeterCalibrationScreen';
import HistoryScreen from './screens/HistoryScreen';

const MENU = [
  { key: 'Compress',  label: 'Compressibility', icon: '📊', title: 'Compressibility Factor' },
  { key: 'Density',   label: 'API Gravity',     icon: '⛽', title: 'API Gravity' },
  { key: 'Meter',     label: 'Meter Factor',    icon: '📐', title: 'Meter Calibration' },
  { key: 'Converter', label: 'Unit Converter',  icon: '🔄', title: 'Unit Converter' },
  { key: 'History',   label: 'Saved Records',   icon: '📋', title: 'Saved Records' },
];

export default function App() {
const [activeScreen, setActiveScreen] = useState('Compress');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const current = MENU.find(m => m.key === activeScreen);

  function renderScreen() {
    switch (activeScreen) {
      case 'Compress':  return <CompressibilityScreen />;
      case 'Density':   return <DensityScreen />;
      case 'Meter':     return <MeterCalibrationScreen />;
      case 'Converter': return <ConverterScreen />;
      case 'History':   return <HistoryScreen />;
      default:          return <CompressibilityScreen />;
    }
  }
  return (
    <SafeAreaProvider>
    <SafeAreaView style={appStyles.root}>
      <AppHeader title={current.title} onMenuPress={() => setDrawerOpen(true)} />
      <View style={appStyles.content}>
        {renderScreen()}
      </View>
      <CustomDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        activeScreen={activeScreen}
        onNavigate={setActiveScreen}
        menu={MENU}
      />
    </SafeAreaView>
    </SafeAreaProvider>
  );
}

const appStyles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#1a3a5c' },
  content: { flex: 1, backgroundColor: '#f0f4f8' },
});