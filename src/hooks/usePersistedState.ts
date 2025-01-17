import { useState, useEffect, Dispatch, SetStateAction } from 'react';

export function usePersistedState<T>(
  key: string,
  initialValue: T,
  storage = localStorage
): [T, Dispatch<SetStateAction<T>>] {
  // 初期値の取得
  const [state, setState] = useState<T>(() => {
    const storedValue = storage.getItem(key);
    if (storedValue !== null) {
      try {
        return JSON.parse(storedValue);
      } catch {
        return initialValue;
      }
    }
    return initialValue;
  });

  // 値の変更を監視して保存
  useEffect(() => {
    storage.setItem(key, JSON.stringify(state));
  }, [key, state, storage]);

  return [state, setState];
}