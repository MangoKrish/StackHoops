import { useState, useCallback } from 'react';

export function useUndoStack(maxSize = 10) {
  const [stack, setStack] = useState([]);

  const pushAction = useCallback((action) => {
    setStack(prev => {
      const next = [...prev, { ...action, timestamp: Date.now() }];
      if (next.length > maxSize) next.shift();
      return next;
    });
  }, [maxSize]);

  const undoLast = useCallback(() => {
    let action = null;
    setStack(prev => {
      if (prev.length === 0) return prev;
      action = prev[prev.length - 1];
      return prev.slice(0, -1);
    });
    return action;
  }, []);

  const clearStack = useCallback(() => {
    setStack([]);
  }, []);

  return {
    pushAction,
    undoLast,
    canUndo: stack.length > 0,
    undoCount: stack.length,
    lastAction: stack.length > 0 ? stack[stack.length - 1] : null,
    clearStack,
  };
}
