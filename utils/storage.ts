import { Platform } from 'react-native';

let AsyncStorage: any = null;
if (Platform.OS !== 'web') {
  AsyncStorage = require('@react-native-async-storage/async-storage').default;
}

export async function saveData<T = unknown>(key: string, value: T): Promise<void> {
  try {
    const serialized = JSON.stringify(value);
    if (Platform.OS === 'web') {
      localStorage.setItem(key, serialized);
    } else {
      await AsyncStorage.setItem(key, serialized);
    }
  } catch (error) {
    console.error(`saveData error (${key})`, error);
  }
}

export async function getData<T = unknown>(key: string): Promise<T | null> {
  try {
    const raw = Platform.OS === 'web' ? localStorage.getItem(key) : await AsyncStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch (error) {
    console.error(`getData error (${key})`, error);
    return null;
  }
}
