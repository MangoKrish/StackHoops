import { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGamesContext } from '../context/GamesContext';
import { calculatePoints, calculatePercentage } from '../utils/gameCalculations';
import { formatDate, formatPercent, formatStat } from '../utils/formatters';
import StatBar from '../components/shared/StatBar';
import Modal from '../components/shared/Modal';

export default function GameDetail() {
  const { id } = useParams();
  const { getGame, deleteGame, seasonAverages } = useGamesContext();
  const navigate = useNavigate();
  const [showDelete, setShowDelete] = useState(false);

  const game = getGame(id);

  const derived = useMemo(() => {
    if (!game) return {};
    return {
      pts: game.pts ?? calculatePoints(game.fgm, game.ftm),
      fgPercent: game.fgPercent ?? calculatePercentage(game.fgm, game.fga),
      ftPercent: game.ftPercent ?? calculatePercentage(game.ftm, game.fta),
    };
  }, [game]);

  if (!game) {
    return (
      <div className="text-center py-16">
        <p className="text-text-secondary">Game not found</p>
        <button onClick={() => navigate('/games')} className="text-hoop-orange text-sm mt-2 hover:underline">
          Back to Games
        </button>
      </div>
    );
  }

  const handleDelete = () => {
    deleteGame(id);
    navigate('/games');
  };

  const ComparisonStat = ({ label, value, avg, format = 'number' }) => {
    const diff = value - avg;
    const formatted = format === 'percent' ? formatPercent(value) : formatStat(value);
    const avgFormatted = format === 'percent' ? formatPercent(avg) : formatStat(avg);

    return (
      <div className="flex items-center justify-between py-2">
        <span className="text-sm text-text-secondary">{label}</span>
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-text-primary tabular-nums">{formatted}</span>
          {seasonAverages.gamesPlayed > 1 && (
            <span className={`text-xs tabular-nums ${diff >= 0 ? 'text-hoop-green' : 'text-hoop-red'}`}>
              {diff >= 0 ? '+' : ''}{format === 'percent' ? diff.toFixed(1) + '%' : diff.toFixed(1)}
              <span className="text-text-muted ml-1">avg {avgFormatted}</span>
            </span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div>
      {/* Header */}
      <button
        onClick={() => navigate('/games')}
        className="flex items-center gap-1 text-sm text-text-secondary hover:text-text-primary mb-4 transition-colors"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Back
      </button>

      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-sm text-text-secondary">{formatDate(game.date)}</p>
          {game.opponent && (
            <h1 className="text-xl font-bold text-text-primary mt-1">vs {game.opponent}</h1>
          )}
        </div>
        <div className="text-right">
          <p className="text-4xl font-extrabold text-hoop-orange tabular-nums">{derived.pts}</p>
          <p className="text-xs text-text-muted uppercase tracking-wider">Points</p>
        </div>
      </div>

      {/* Shooting */}
      <div className="bg-surface-secondary rounded-2xl p-4 mb-3">
        <h3 className="text-xs font-semibold text-hoop-orange uppercase tracking-wider mb-3">Shooting</h3>
        <div className="grid grid-cols-2 gap-x-6 mb-3">
          <div className="text-center">
            <p className="text-lg font-bold text-text-primary tabular-nums">{game.fgm}/{game.fga}</p>
            <p className="text-[10px] text-text-muted">Field Goals</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-text-primary tabular-nums">{game.ftm}/{game.fta}</p>
            <p className="text-[10px] text-text-muted">Free Throws</p>
          </div>
        </div>
        <StatBar label="FG%" value={derived.fgPercent} className="mb-2" />
        <StatBar label="FT%" value={derived.ftPercent} />
      </div>

      {/* Other Stats */}
      <div className="bg-surface-secondary rounded-2xl p-4 mb-3">
        <h3 className="text-xs font-semibold text-hoop-blue uppercase tracking-wider mb-2">Performance</h3>
        <ComparisonStat label="Points" value={derived.pts} avg={seasonAverages.pts} />
        <ComparisonStat label="Rebounds" value={game.reb} avg={seasonAverages.reb} />
        <ComparisonStat label="Assists" value={game.ast} avg={seasonAverages.ast} />
        <ComparisonStat label="Stocks" value={game.stocks} avg={seasonAverages.stocks} />
        <ComparisonStat label="Turnovers" value={game.tov} avg={seasonAverages.tov} />
        <ComparisonStat label="Fouls" value={game.pf} avg={seasonAverages.pf} />
        <ComparisonStat label="FG%" value={derived.fgPercent} avg={seasonAverages.fgPercent} format="percent" />
        <ComparisonStat label="FT%" value={derived.ftPercent} avg={seasonAverages.ftPercent} format="percent" />
      </div>

      {/* Notes */}
      {game.notes && (
        <div className="bg-surface-secondary rounded-2xl p-4 mb-3">
          <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Notes</h3>
          <p className="text-sm text-text-primary leading-relaxed whitespace-pre-wrap">{game.notes}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3 mt-6">
        <button
          onClick={() => navigate(`/edit/${id}`)}
          className="flex-1 py-3 rounded-xl text-sm font-semibold text-hoop-orange border border-hoop-orange/30 hover:bg-hoop-orange/10 transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => setShowDelete(true)}
          className="flex-1 py-3 rounded-xl text-sm font-semibold text-hoop-red border border-hoop-red/30 hover:bg-hoop-red/10 transition-colors"
        >
          Delete
        </button>
      </div>

      <Modal
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        title="Delete Game?"
        confirmLabel="Delete"
        onConfirm={handleDelete}
        destructive
      >
        <p>This action cannot be undone. This game's stats will be permanently removed.</p>
      </Modal>
    </div>
  );
}
