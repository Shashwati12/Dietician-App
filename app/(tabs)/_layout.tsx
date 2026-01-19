// app/(tabs)/_layout.tsx
import { getData } from '@/utils/storage'; // adjust path if needed
import { Tabs, useRouter } from 'expo-router';
import { BarChart3, Calendar, Home, User, Users } from 'lucide-react-native';
import React, { useEffect, useMemo } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const COLORS = {
  primary: '#6c412f',
  inactive: '#9ca3af',
  background: '#f2e8df',
  borderTop: '#e6ccb2',
};

export default function TabLayout(){
  const insets = useSafeAreaInsets();
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const user = await getData('currentUser');
      if (!user) {
        router.replace('/login');
      }
    };
    checkAuth();
  }, [router]);

  const tabBarStyle = useMemo(
    () => ({
      backgroundColor: COLORS.background,
      borderTopColor: COLORS.borderTop,
      paddingBottom: Math.max(8, insets.bottom),
      height: 65 + insets.bottom,
    }),
    [insets.bottom]
  );

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.inactive,
        tabBarStyle,
        tabBarLabelStyle: { fontSize: 12, fontWeight: '600', marginTop: 4 },
        lazy: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: 'Dashboard', tabBarIcon: ({ size, color }) => <Home size={size} color={color} /> }}
      />
      <Tabs.Screen
        name="appointments"
        options={{ title: 'Appointments', tabBarIcon: ({ size, color }) => <Calendar size={size} color={color} /> }}
      />
      <Tabs.Screen
        name="patients"
        options={{ title: 'Patients', tabBarIcon: ({ size, color }) => <Users size={size} color={color} /> }}
      />
      <Tabs.Screen
        name="analytics"
        options={{ title: 'Analytics', tabBarIcon: ({ size, color }) => <BarChart3 size={size} color={color} /> }}
      />
      <Tabs.Screen
        name="profile"
        options={{ title: 'Profile', tabBarIcon: ({ size, color }) => <User size={size} color={color} /> }}
      />
    </Tabs>
  );
}
