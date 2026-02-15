import { useState, useCallback } from 'react';

export default function StatCounter({ label, shortLabel, value, onIncrement, onDecrement, min = 0, warning, className = '' }) {
  const [isPulsing, setIsPulsing] = useState(false);

  const triggerPulse = useCallback(() => {
    setIsPulsing(true);
    setTimeout(() => setIsPulsing(false), 200);
  }, []);

  const handleIncrement = () => {
    onIncrement();
    triggerPulse();
  };

  const handleDecrement = () => {
    if (value > min) {
      onDecrement();
      triggerPulse();
    }
  };

  return (
    <div className={`flex flex-col items-center gap-1 ${className}`}>
      <span className="text-xs font-medium text-text-secondary uppercase tracking-wider">{shortLabel || label}</span>
      <div className="flex items-center gap-3">
        <button
          onClick={handleDecrement}
          disabled={value <= min}
          aria-label={`Decrease ${label}`}
          className="w-11 h-11 flex items-center justify-center rounded-xl bg-surface-elevated text-text-primary text-xl font-bold
            hover:bg-surface-hover active:scale-90 transition-all duration-75
            disabled:opacity-30 disabled:cursor-not-allowed disabled:active:scale-100
            focus-visible:ring-2 focus-visible:ring-hoop-orange focus-visible:ring-offset-2 focus-visible:ring-offset-surface-primary"
        >
          -
        </button>
        <span
          className={`w-12 text-center text-2xl font-bold tabular-nums ${isPulsing ? 'animate-scale-pulse' : ''} ${warning ? 'text-hoop-yellow' : 'text-text-primary'}`}
          aria-live="polite"
          aria-label={`${label}: ${value}`}
        >
          {value}
        </span>
        <button
          onClick={handleIncrement}
          aria-label={`Increase ${label}`}
          className="w-11 h-11 flex items-center justify-center rounded-xl bg-surface-elevated text-text-primary text-xl font-bold
            hover:bg-surface-hover active:scale-90 transition-all duration-75
            focus-visible:ring-2 focus-visible:ring-hoop-orange focus-visible:ring-offset-2 focus-visible:ring-offset-surface-primary"
        >
          +
        </button>
      </div>
      {warning && (
        <span className="text-[10px] text-hoop-yellow font-medium mt-0.5">{warning}</span>
      )}
    </div>
  );
}
