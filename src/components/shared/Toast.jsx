import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const typeStyles = {
  success: 'bg-hoop-green/90 text-white',
  warning: 'bg-hoop-yellow/90 text-surface-primary',
  error: 'bg-hoop-red/90 text-white',
  info: 'bg-hoop-blue/90 text-white',
};

export default function Toast({ message, type = 'success', duration = 3000, onDismiss }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onDismiss?.(), 300);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onDismiss]);

  return createPortal(
    <div
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-[200] px-5 py-3 rounded-xl text-sm font-medium shadow-lg ${typeStyles[type]} ${visible ? 'animate-slide-in-top' : 'animate-slide-out-top'}`}
      role="alert"
    >
      {message}
    </div>,
    document.body
  );
}
