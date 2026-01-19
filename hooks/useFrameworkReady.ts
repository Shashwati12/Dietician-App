// hooks/useFrameworkReady.ts
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

declare global {
  interface Window {
    frameworkReady?: () => void;
  }
}

export function useFrameworkReady(): boolean {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (Platform.OS === 'web') {
      window.frameworkReady?.();
    }
    setReady(true);
  }, []);

  return ready;
}
