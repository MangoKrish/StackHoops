export default function StatBar({ label, value = 0, showValue = true, className = '' }) {
  const clampedValue = Math.min(100, Math.max(0, value));

  const getColor = (v) => {
    if (v >= 50) return 'bg-hoop-green';
    if (v >= 30) return 'bg-hoop-yellow';
    return 'bg-hoop-red';
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {label && <span className="text-xs font-medium text-text-secondary w-10 shrink-0">{label}</span>}
      <div className="flex-1 h-2 bg-surface-elevated rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${getColor(clampedValue)}`}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
      {showValue && (
        <span className="text-xs font-semibold text-text-primary w-12 text-right tabular-nums">
          {value.toFixed(1)}%
        </span>
      )}
    </div>
  );
}
