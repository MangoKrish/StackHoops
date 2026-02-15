import StatCounter from '../shared/StatCounter';

export default function PlaymakingSection({ stats, onStatChange, warnings = {} }) {
  return (
    <div className="bg-surface-secondary rounded-2xl p-4 mb-4">
      <h3 className="text-xs font-semibold text-hoop-blue uppercase tracking-wider mb-4">Rebounds & Assists</h3>
      <div className="grid grid-cols-2 gap-4">
        <StatCounter
          label="Rebounds" shortLabel="REB"
          value={stats.reb}
          onIncrement={() => onStatChange('reb', 1)}
          onDecrement={() => onStatChange('reb', -1)}
          warning={warnings.reb}
        />
        <StatCounter
          label="Assists" shortLabel="AST"
          value={stats.ast}
          onIncrement={() => onStatChange('ast', 1)}
          onDecrement={() => onStatChange('ast', -1)}
          warning={warnings.ast}
        />
      </div>
    </div>
  );
}
