import { useState, useEffect } from 'react';

const memoryStorage: Record<string, any> = {};

export function useSessionStorage<T>(
  key: string,
  initialValue: T,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    if (key in memoryStorage) {
      return memoryStorage[key];
    }
    memoryStorage[key] = initialValue;
    return initialValue;
  });

  useEffect(() => {
    memoryStorage[key] = value;
  }, [key, value]);

  return [value, setValue];
}
