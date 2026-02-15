import StatCounter from '../shared/StatCounter';
import StatBar from '../shared/StatBar';
import { calculatePercentage } from '../../utils/gameCalculations';

export default function ShootingSection({ stats, onStatChange, warnings = {} }) {
  const fgPct = calculatePercentage(stats.fgm, stats.fga);
  const ftPct = calculatePercentage(stats.ftm, stats.fta);

  return (
    <div className="bg-surface-secondary rounded-2xl p-4 mb-4">
      <h3 className="text-xs font-semibold text-hoop-orange uppercase tracking-wider mb-4">Shooting</h3>

      <div className="grid grid-cols-2 gap-4 mb-3">
        <StatCounter
          label="Field Goals Made" shortLabel="FGM"
          value={stats.fgm}
          onIncrement={() => onStatChange('fgm', 1)}
          onDecrement={() => onStatChange('fgm', -1)}
          warning={warnings.fgm}
        />
        <StatCounter
          label="Field Goals Attempted" shortLabel="FGA"
          value={stats.fga}
          onIncrement={() => onStatChange('fga', 1)}
          onDecrement={() => onStatChange('fga', -1)}
          warning={warnings.fga}
        />
      </div>

      <StatBar label="FG%" value={fgPct} className="mb-4" />

      <div className="grid grid-cols-2 gap-4 mb-3">
        <StatCounter
          label="Free Throws Made" shortLabel="FTM"
          value={stats.ftm}
          onIncrement={() => onStatChange('ftm', 1)}
          onDecrement={() => onStatChange('ftm', -1)}
          warning={warnings.ftm}
        />
        <StatCounter
          label="Free Throws Attempted" shortLabel="FTA"
          value={stats.fta}
          onIncrement={() => onStatChange('fta', 1)}
          onDecrement={() => onStatChange('fta', -1)}
          warning={warnings.fta}
        />
      </div>

      <StatBar label="FT%" value={ftPct} />
    </div>
  );
}
