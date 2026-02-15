import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatDate, formatPercent, formatStat } from '../../utils/formatters';
import { calculatePoints, calculatePercentage } from '../../utils/gameCalculations';

export default function GameCard({ game, onDelete }) {
  const touchStartX = useRef(0);
  const [translateX, setTranslateX] = useState(0);
  const [swiping, setSwiping] = useState(false);

  const pts = game.pts ?? calculatePoints(game.fgm, game.ftm);
  const fgPct = game.fgPercent ?? calculatePercentage(game.fgm, game.fga);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    setSwiping(true);
  };

  const handleTouchMove = (e) => {
    if (!swiping) return;
    const diff = e.touches[0].clientX - touchStartX.current;
    if (diff < 0) setTranslateX(Math.max(diff, -100));
  };

  const handleTouchEnd = () => {
    if (translateX < -60 && onDelete) {
      onDelete(game.id);
    }
    setTranslateX(0);
    setSwiping(false);
  };

  return (
    <div className="relative overflow-hidden rounded-xl">
      {/* Delete zone behind card */}
      <div className="absolute inset-0 bg-hoop-red flex items-center justify-end pr-6 rounded-xl">
        <span className="text-white font-semibold text-sm">Delete</span>
      </div>

      <Link
        to={`/games/${game.id}`}
        className="block relative bg-surface-secondary rounded-xl p-4 transition-all duration-150 hover:bg-surface-elevated group no-underline"
        style={{ transform: `translateX(${translateX}px)`, transition: swiping ? 'none' : 'transform 0.2s ease-out' }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex items-start justify-between mb-2">
          <div>
            <p className="text-sm text-text-secondary">{formatDate(game.date)}</p>
            {game.opponent && (
              <p className="text-base font-semibold text-text-primary mt-0.5">vs {game.opponent}</p>
            )}
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-hoop-orange tabular-nums">{pts}</p>
            <p className="text-[10px] text-text-muted uppercase tracking-wider">PTS</p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <StatPill label="REB" value={game.reb} />
          <StatPill label="AST" value={game.ast} />
          <StatPill label="FG" value={formatPercent(fgPct)} />
          <StatPill label="STK" value={game.stocks} />
        </div>

        {/* Expanded preview on hover (desktop) */}
        <div className="hidden group-hover:flex items-center gap-4 mt-2 pt-2 border-t border-surface-elevated text-xs text-text-secondary">
          <span>FG: {game.fgm}/{game.fga}</span>
          <span>FT: {game.ftm}/{game.fta}</span>
          <span>TOV: {game.tov}</span>
          <span>PF: {game.pf}</span>
        </div>
      </Link>
    </div>
  );
}

function StatPill({ label, value }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-text-muted text-xs">{label}</span>
      <span className="text-text-primary font-semibold tabular-nums">{typeof value === 'number' ? formatStat(value) : value}</span>
    </div>
  );
}
