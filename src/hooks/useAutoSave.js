import { useState, useEffect, useCallback } from 'react';

export function useAutoSave(key, data, delay = 3000) {
  const [hasDraft, setHasDraft] = useState(() => {
    return window.localStorage.getItem(key) !== null;
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        window.localStorage.setItem(key, JSON.stringify(data));
        setHasDraft(true);
      } catch (e) {
        console.error('Auto-save failed:', e);
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [key, data, delay]);

  const loadDraft = useCallback(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  }, [key]);

  const clearDraft = useCallback(() => {
    window.localStorage.removeItem(key);
    setHasDraft(false);
  }, [key]);

  return { hasDraft, loadDraft, clearDraft };
}
