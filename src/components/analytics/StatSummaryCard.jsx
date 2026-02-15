export default function StatSummaryCard({ label, value, format = 'number', trend, trendLabel }) {
  const formatted = format === 'percent'
    ? `${value.toFixed(1)}%`
    : value.toFixed(1);

  return (
    <div className="bg-surface-secondary rounded-2xl p-4 flex flex-col items-center">
      <span className="text-[10px] text-text-muted uppercase tracking-wider mb-1">{label}</span>
      <span className="text-2xl font-bold text-text-primary tabular-nums">{formatted}</span>
      {trend !== undefined && trend !== null && (
        <div className={`flex items-center gap-1 mt-1 ${trend >= 0 ? 'text-hoop-green' : 'text-hoop-red'}`}>
          <span className="text-xs">{trend >= 0 ? '+' : ''}{trend.toFixed(1)}</span>
          {trendLabel && <span className="text-[10px] text-text-muted">{trendLabel}</span>}
        </div>
      )}
    </div>
  );
}
