import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGamesContext } from '../context/GamesContext';
import StatSummaryCard from '../components/analytics/StatSummaryCard';
import GameCard from '../components/shared/GameCard';
import EmptyState from '../components/shared/EmptyState';

export default function Dashboard() {
  const { games, seasonAverages, recentAverages, getRecentGames, totalGames } = useGamesContext();
  const navigate = useNavigate();

  const recentGames = useMemo(() => getRecentGames(5), [getRecentGames]);

  const trends = useMemo(() => {
    if (totalGames < 6) return {};
    return {
      pts: recentAverages.pts - seasonAverages.pts,
      reb: recentAverages.reb - seasonAverages.reb,
      ast: recentAverages.ast - seasonAverages.ast,
      fg: recentAverages.fgPercent - seasonAverages.fgPercent,
    };
  }, [totalGames, recentAverages, seasonAverages]);

  if (totalGames === 0) {
    return (
      <EmptyState
        title="No Games Yet"
        message="Start tracking your basketball stats by logging your first game."
        actionLabel="Log Your First Game"
        onAction={() => navigate('/add')}
      />
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-hoop-orange to-hoop-red bg-clip-text text-transparent">
            HoopStats
          </h1>
          <p className="text-sm text-text-secondary mt-0.5">
            {totalGames} game{totalGames !== 1 ? 's' : ''} logged
          </p>
        </div>
        <button
          onClick={() => navigate('/add')}
          className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-hoop-orange to-hoop-red text-white font-semibold text-sm active:scale-95 transition-transform"
        >
          + Log Game
        </button>
      </div>

      {/* Season Averages */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <StatSummaryCard label="PPG" value={seasonAverages.pts} trend={trends.pts} trendLabel="L5" />
        <StatSummaryCard label="RPG" value={seasonAverages.reb} trend={trends.reb} trendLabel="L5" />
        <StatSummaryCard label="APG" value={seasonAverages.ast} trend={trends.ast} trendLabel="L5" />
        <StatSummaryCard label="FG%" value={seasonAverages.fgPercent} format="percent" trend={trends.fg} trendLabel="L5" />
      </div>

      {/* Recent Games */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wider">Recent Games</h2>
          {totalGames > 5 && (
            <button
              onClick={() => navigate('/games')}
              className="text-xs text-hoop-orange font-medium hover:underline"
            >
              View All
            </button>
          )}
        </div>
        <div className="space-y-2">
          {recentGames.map(game => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </div>
    </div>
  );
}
