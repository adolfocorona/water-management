import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      {/* Módulo Inicio */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />

      {/* Módulo Mapa de Consumo */}
      <Tabs.Screen
        name="consumption-map"
        options={{
          title: 'Mapa de Consumo',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'map' : 'map-outline'} color={color} />
          ),
        }}
      />

      {/* Módulo Alertas */}
      <Tabs.Screen
        name="alerts"
        options={{
          title: 'Alertas',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'notifications' : 'notifications-outline'} color={color} />
          ),
        }}
      />

      {/* Módulo Zonas Críticas */}
      <Tabs.Screen
        name="critical-zones"
        options={{
          title: 'Zonas Críticas',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'warning' : 'warning-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
