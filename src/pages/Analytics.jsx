import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGamesContext } from '../context/GamesContext';
import { calculatePoints, calculatePercentage } from '../utils/gameCalculations';
import { formatShortDate } from '../utils/formatters';
import StatSummaryCard from '../components/analytics/StatSummaryCard';
import TrendChart from '../components/analytics/TrendChart';
import StreakDisplay from '../components/analytics/StreakDisplay';
import EmptyState from '../components/shared/EmptyState';

export default function Analytics() {
  const { games, seasonAverages, totalGames } = useGamesContext();
  const navigate = useNavigate();

  // Prepare chronological data for charts
  const chartData = useMemo(() => {
    if (totalGames < 2) return [];

    return [...games]
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .map((game, i) => ({
        label: formatShortDate(game.date),
        game: i + 1,
        pts: game.pts ?? calculatePoints(game.fgm, game.ftm),
        reb: game.reb || 0,
        ast: game.ast || 0,
        stocks: game.stocks || 0,
        fgPct: Number((game.fgPercent ?? calculatePercentage(game.fgm, game.fga)).toFixed(1)),
        ftPct: Number((game.ftPercent ?? calculatePercentage(game.ftm, game.fta)).toFixed(1)),
      }));
  }, [games, totalGames]);

  if (totalGames === 0) {
    return (
      <EmptyState
        title="No Stats Yet"
        message="Log games to see your analytics and trends."
        actionLabel="Log a Game"
        onAction={() => navigate('/add')}
      />
    );
  }

  if (totalGames < 2) {
    return (
      <div>
        <h1 className="text-xl font-bold text-text-primary mb-6">Analytics</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <StatSummaryCard label="PPG" value={seasonAverages.pts} />
          <StatSummaryCard label="RPG" value={seasonAverages.reb} />
          <StatSummaryCard label="APG" value={seasonAverages.ast} />
          <StatSummaryCard label="FG%" value={seasonAverages.fgPercent} format="percent" />
        </div>
        <EmptyState
          title="Need More Data"
          message="Log at least 2 games to see trend charts."
          actionLabel="Log Another Game"
          onAction={() => navigate('/add')}
        />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-xl font-bold text-text-primary mb-6">Analytics</h1>

      {/* Season Summary */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
        <StatSummaryCard label="PPG" value={seasonAverages.pts} />
        <StatSummaryCard label="RPG" value={seasonAverages.reb} />
        <StatSummaryCard label="APG" value={seasonAverages.ast} />
        <StatSummaryCard label="FG%" value={seasonAverages.fgPercent} format="percent" />
        <StatSummaryCard label="FT%" value={seasonAverages.ftPercent} format="percent" />
      </div>

      {/* Shooting Trends */}
      <TrendChart
        title="Shooting Trends"
        data={chartData}
        xAxisKey="label"
        lines={[
          { dataKey: 'fgPct', label: 'FG%', color: '#f97316' },
          { dataKey: 'ftPct', label: 'FT%', color: '#06b6d4' },
        ]}
      />

      {/* Scoring & Playmaking Trends */}
      <TrendChart
        title="Scoring & Playmaking"
        data={chartData}
        xAxisKey="label"
        lines={[
          { dataKey: 'pts', label: 'Points', color: '#f97316' },
          { dataKey: 'reb', label: 'Rebounds', color: '#3b82f6' },
          { dataKey: 'ast', label: 'Assists', color: '#22c55e' },
        ]}
      />

      {/* Streaks */}
      <StreakDisplay games={games} />
    </div>
  );
}
