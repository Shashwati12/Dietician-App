import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View, StyleSheet } from 'react-native';


const COLORS = {
  background: '#f2e8df',
};

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    // Navigate to welcome screen after a brief delay
    const timer = setTimeout(() => {
      router.replace('/welcome');
    }, 100);

    return () => clearTimeout(timer);
  }, [router]);

  return <View style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});