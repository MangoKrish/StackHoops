import { useState, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGamesContext } from '../context/GamesContext';
import { calculatePoints, calculatePercentage } from '../utils/gameCalculations';
import { exportGames, importGames } from '../utils/exportImport';
import GameCard from '../components/shared/GameCard';
import SearchFilter from '../components/shared/SearchFilter';
import EmptyState from '../components/shared/EmptyState';
import Modal from '../components/shared/Modal';
import Toast from '../components/shared/Toast';

export default function GamesList() {
  const { games, deleteGame, importGames: importToContext, totalGames } = useGamesContext();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [filters, setFilters] = useState({ search: '', dateFrom: '', dateTo: '', sortBy: 'date-desc' });
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast] = useState(null);

  const filteredGames = useMemo(() => {
    let result = [...games];

    // Search filter
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(g => g.opponent?.toLowerCase().includes(q));
    }

    // Date range
    if (filters.dateFrom) {
      result = result.filter(g => g.date >= filters.dateFrom);
    }
    if (filters.dateTo) {
      result = result.filter(g => g.date <= filters.dateTo);
    }

    // Sort
    switch (filters.sortBy) {
      case 'date-asc':
        result.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'pts-desc':
        result.sort((a, b) => {
          const ptsA = a.pts ?? calculatePoints(a.fgm, a.ftm);
          const ptsB = b.pts ?? calculatePoints(b.fgm, b.ftm);
          return ptsB - ptsA;
        });
        break;
      case 'pts-asc':
        result.sort((a, b) => {
          const ptsA = a.pts ?? calculatePoints(a.fgm, a.ftm);
          const ptsB = b.pts ?? calculatePoints(b.fgm, b.ftm);
          return ptsA - ptsB;
        });
        break;
      case 'fg-desc':
        result.sort((a, b) => {
          const fgA = a.fgPercent ?? calculatePercentage(a.fgm, a.fga);
          const fgB = b.fgPercent ?? calculatePercentage(b.fgm, b.fga);
          return fgB - fgA;
        });
        break;
      default: // date-desc
        result.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    return result;
  }, [games, filters]);

  const handleDelete = (id) => {
    setDeleteTarget(id);
  };

  const confirmDelete = () => {
    if (deleteTarget) {
      deleteGame(deleteTarget);
      setDeleteTarget(null);
      setToast({ message: 'Game deleted', type: 'success' });
    }
  };

  const handleExport = () => {
    exportGames(games);
    setToast({ message: 'Games exported', type: 'success' });
  };

  const handleImport = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const imported = await importGames(file);
      importToContext(imported);
      setToast({ message: `Imported ${imported.length} games`, type: 'success' });
    } catch (err) {
      setToast({ message: err.message, type: 'error' });
    }

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  if (totalGames === 0) {
    return (
      <EmptyState
        title="No Games Yet"
        message="Log your first game to start tracking your stats."
        actionLabel="Log a Game"
        onAction={() => navigate('/add')}
      />
    );
  }

  return (
    <div>
      {toast && <Toast {...toast} onDismiss={() => setToast(null)} />}

      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold text-text-primary">
          Your Games <span className="text-sm font-normal text-text-secondary">({totalGames})</span>
        </h1>
      </div>

      <SearchFilter onFilterChange={setFilters} />

      {filteredGames.length === 0 ? (
        <EmptyState
          title="No Matches"
          message="No games match your current filters. Try adjusting your search."
        />
      ) : (
        <div className="space-y-2 mb-6">
          {filteredGames.map(game => (
            <GameCard key={game.id} game={game} onDelete={handleDelete} />
          ))}
        </div>
      )}

      {/* Export/Import */}
      <div className="flex gap-3 mt-4">
        <button
          onClick={handleExport}
          className="flex-1 py-2.5 rounded-xl text-xs font-medium text-text-secondary bg-surface-secondary hover:bg-surface-elevated transition-colors"
        >
          Export JSON
        </button>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex-1 py-2.5 rounded-xl text-xs font-medium text-text-secondary bg-surface-secondary hover:bg-surface-elevated transition-colors"
        >
          Import JSON
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleImport}
          className="hidden"
        />
      </div>

      <Modal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Delete Game?"
        confirmLabel="Delete"
        onConfirm={confirmDelete}
        destructive
      >
        <p>This action cannot be undone.</p>
      </Modal>
    </div>
  );
}
