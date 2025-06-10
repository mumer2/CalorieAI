import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeStackNavigator from './HomeStackNavigator';
import OnboardingScreen from '../screens/OnboardingScreen';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#2196F3',
        tabBarInactiveTintColor: '#888',
        tabBarIcon: ({ color, size }) => {
          const iconName =
            route.name === 'Recalculate' ? 'refresh-outline' : 'home-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      {/* Home tab contains the stack with Onboarding + Home */}
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={{ title: 'Home' }}
      />
      {/* Direct access to onboarding form */}
      <Tab.Screen
        name="Recalculate"
        component={OnboardingScreen}
      />
    </Tab.Navigator>
  );
}
