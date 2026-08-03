import React from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import styles from '../styles/DrawerStyles';

export default function AppHeader({ title, onMenuPress }) {
  return (
    <View style={styles.appHeader}>
      <StatusBar barStyle="light-content" backgroundColor="#1a3a5c" />
      <TouchableOpacity onPress={onMenuPress} style={styles.menuButton} hitSlop={{top:10,bottom:10,left:10,right:10}}>
        <View style={styles.hamburgerLine} />
        <View style={styles.hamburgerLine} />
        <View style={styles.hamburgerLine} />
      </TouchableOpacity>
      <Text style={styles.appHeaderTitle}>{title}</Text>
    </View>
  );
}