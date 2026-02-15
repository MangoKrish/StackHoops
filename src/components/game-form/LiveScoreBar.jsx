import { calculatePoints, calculatePercentage } from '../../utils/gameCalculations';
import { formatPercent } from '../../utils/formatters';

export default function LiveScoreBar({ stats }) {
  const pts = calculatePoints(stats.fgm, stats.ftm);
  const fgPct = calculatePercentage(stats.fgm, stats.fga);
  const ftPct = calculatePercentage(stats.ftm, stats.fta);

  return (
    <div className="sticky top-0 md:top-16 z-10 bg-surface-primary/95 backdrop-blur-sm border-b border-surface-elevated -mx-4 md:-mx-6 px-4 md:px-6 py-3 mb-4">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-extrabold text-hoop-orange tabular-nums">{pts}</span>
          <span className="text-xs text-text-muted uppercase tracking-wider">PTS</span>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="text-center">
            <span className="text-text-primary font-semibold tabular-nums">{formatPercent(fgPct)}</span>
            <span className="text-[10px] text-text-muted block">FG</span>
          </div>
          <div className="text-center">
            <span className="text-text-primary font-semibold tabular-nums">{formatPercent(ftPct)}</span>
            <span className="text-[10px] text-text-muted block">FT</span>
          </div>
        </div>
      </div>
    </div>
  );
}
