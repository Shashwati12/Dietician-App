// app/index.tsx
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

const COLORS = { background: '#f2e8df' };

export default function Index(){
  const router = useRouter();
  const ready = useFrameworkReady();

  useEffect(() => {
    if (!ready) return;
    router.replace('/welcome');
  }, [ready, router]);

  return <View style={styles.container} />;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
});
