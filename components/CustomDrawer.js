import React, { useRef, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, Animated,
  Dimensions, TouchableWithoutFeedback, StatusBar, Platform
} from 'react-native';
import styles from '../styles/DrawerStyles';

const SCREEN_WIDTH = Dimensions.get('window').width;
const DRAWER_WIDTH = Math.min(280, SCREEN_WIDTH * 0.78);

export default function CustomDrawer({ isOpen, onClose, activeScreen, onNavigate, menu }) {
  const slideAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: isOpen ? 0 : -DRAWER_WIDTH,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: isOpen ? 1 : 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isOpen]);

  if (!isOpen && fadeAnim.__getValue() === 0) return null;

  return (
    <View style={styles.overlayContainer} pointerEvents={isOpen ? 'auto' : 'none'}>
      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View style={[styles.backdrop, { opacity: fadeAnim }]} />
      </TouchableWithoutFeedback>

      <Animated.View
        style={[
          styles.drawer,
          { width: DRAWER_WIDTH, transform: [{ translateX: slideAnim }] },
        ]}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>FuelOps</Text>
          <Text style={styles.headerSubtitle}>Field Operations Tool</Text>
        </View>

        <View style={styles.menuList}>
          {menu.map(item => {
            const isActive = activeScreen === item.key;
            return (
              <TouchableOpacity
                key={item.key}
                style={[styles.menuItem, isActive && styles.menuItemActive]}
                onPress={() => { onNavigate(item.key); onClose(); }}
                activeOpacity={0.7}
              >
                <Text style={styles.menuIcon}>{item.icon}</Text>
                <Text style={[styles.menuLabel, isActive && styles.menuLabelActive]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>ASTM D1250 Compliant</Text>
          <Text style={styles.footerVersion}>v1.0.0</Text>
        </View>
      </Animated.View>
    </View>
  );
}