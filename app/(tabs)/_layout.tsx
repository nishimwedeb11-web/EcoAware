import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Palette, Radius } from '@/constants/design';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: Palette.bg },
        tabBarStyle: {
          position: 'absolute',
          left: 14,
          right: 14,
          bottom: 14,
          height: 68,
          borderTopWidth: 1,
          borderTopColor: Palette.border,
          backgroundColor: Palette.surface,
          borderRadius: Radius.lg,
          paddingTop: 10,
          paddingBottom: 10,
          ...{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.35,
            shadowRadius: 18,
            elevation: 12,
          },
        },
        tabBarActiveTintColor: Palette.accent,
        tabBarInactiveTintColor: '#4f6f63',
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
          letterSpacing: 0.4,
          marginTop: 2,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name="home" size={focused ? 22 : 20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="issues"
        options={{
          title: 'Issues',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name="earth" size={focused ? 22 : 20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="videos"
        options={{
          title: 'Videos',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name="play-circle" size={focused ? 22 : 20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="quiz"
        options={{
          title: 'Quiz',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name="sparkles" size={focused ? 22 : 20} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
