import StatCounter from '../shared/StatCounter';

export default function DefenseSection({ stats, onStatChange, warnings = {} }) {
  return (
    <div className="bg-surface-secondary rounded-2xl p-4 mb-4">
      <h3 className="text-xs font-semibold text-hoop-red uppercase tracking-wider mb-4">Defense & Fouls</h3>
      <div className="grid grid-cols-3 gap-3">
        <StatCounter
          label="Steals + Blocks" shortLabel="STK"
          value={stats.stocks}
          onIncrement={() => onStatChange('stocks', 1)}
          onDecrement={() => onStatChange('stocks', -1)}
          warning={warnings.stocks}
        />
        <StatCounter
          label="Turnovers" shortLabel="TOV"
          value={stats.tov}
          onIncrement={() => onStatChange('tov', 1)}
          onDecrement={() => onStatChange('tov', -1)}
          warning={warnings.tov}
        />
        <StatCounter
          label="Personal Fouls" shortLabel="PF"
          value={stats.pf}
          onIncrement={() => onStatChange('pf', 1)}
          onDecrement={() => onStatChange('pf', -1)}
          warning={warnings.pf}
        />
      </div>
    </div>
  );
}
