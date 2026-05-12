import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

import HomeScreen from './screens/HomeScreen';
import DensityScreen from './screens/DensityScreen';
import ConverterScreen from './screens/ConverterScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#1a3a5c' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
          tabBarStyle: { backgroundColor: '#1a3a5c' },
          tabBarActiveTintColor: '#a0c4e8',
          tabBarInactiveTintColor: '#ffffff',
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'Home', tabBarIcon: () => <Text>🏠</Text> }} />
        <Tab.Screen name="Density" component={DensityScreen} options={{ tabBarLabel: 'Density', tabBarIcon: () => <Text>⛽</Text> }} />
        <Tab.Screen name="Converter" component={ConverterScreen} options={{ tabBarLabel: 'Convert', tabBarIcon: () => <Text>🔄</Text> }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}