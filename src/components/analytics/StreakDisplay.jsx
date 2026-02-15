import { calculateStreaks } from '../../utils/gameCalculations';

const streakConfigs = [
  { label: '10+ Points', statKey: 'pts', threshold: 10 },
  { label: '15+ Points', statKey: 'pts', threshold: 15 },
  { label: '20+ Points', statKey: 'pts', threshold: 20 },
  { label: '5+ Rebounds', statKey: 'reb', threshold: 5 },
  { label: '5+ Assists', statKey: 'ast', threshold: 5 },
];

export default function StreakDisplay({ games }) {
  if (!games || games.length === 0) return null;

  const streaks = streakConfigs.map(config => ({
    ...config,
    ...calculateStreaks(games, config.statKey, config.threshold),
  }));

  const activeStreaks = streaks.filter(s => s.current > 0 || s.best > 0);
  if (activeStreaks.length === 0) return null;

  return (
    <div className="bg-surface-secondary rounded-2xl p-4 mb-4">
      <h3 className="text-sm font-semibold text-text-primary mb-4">Streaks</h3>
      <div className="space-y-3">
        {activeStreaks.map(streak => (
          <div key={streak.label} className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">{streak.label}</span>
            <div className="flex items-center gap-4">
              {streak.current > 0 && (
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-hoop-green animate-pulse" />
                  <span className="text-sm font-semibold text-hoop-green">{streak.current}</span>
                  <span className="text-[10px] text-text-muted">current</span>
                </div>
              )}
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-semibold text-text-primary">{streak.best}</span>
                <span className="text-[10px] text-text-muted">best</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
