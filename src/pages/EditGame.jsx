import { useState, useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGamesContext } from '../context/GamesContext';
import { validateStatChange, validateGame } from '../utils/validation';
import GameMetaSection from '../components/game-form/GameMetaSection';
import ShootingSection from '../components/game-form/ShootingSection';
import PlaymakingSection from '../components/game-form/PlaymakingSection';
import DefenseSection from '../components/game-form/DefenseSection';
import LiveScoreBar from '../components/game-form/LiveScoreBar';
import Modal from '../components/shared/Modal';
import Toast from '../components/shared/Toast';

export default function EditGame() {
  const { id } = useParams();
  const { getGame, updateGame, deleteGame } = useGamesContext();
  const navigate = useNavigate();

  const game = getGame(id);

  const [stats, setStats] = useState({
    fgm: 0, fga: 0, ftm: 0, fta: 0,
    reb: 0, ast: 0, stocks: 0, tov: 0, pf: 0,
  });
  const [meta, setMeta] = useState({ date: '', opponent: '', notes: '' });
  const [warnings, setWarnings] = useState({});
  const [toast, setToast] = useState(null);
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    if (game) {
      setStats({
        fgm: game.fgm || 0, fga: game.fga || 0,
        ftm: game.ftm || 0, fta: game.fta || 0,
        reb: game.reb || 0, ast: game.ast || 0,
        stocks: game.stocks || 0, tov: game.tov || 0, pf: game.pf || 0,
      });
      setMeta({
        date: game.date || '',
        opponent: game.opponent || '',
        notes: game.notes || '',
      });
    }
  }, [game]);

  const updateStat = useCallback((field, delta) => {
    setStats(prev => {
      const newValue = Math.max(0, prev[field] + delta);
      const { warnings: newWarnings, autoAdjustments } = validateStatChange(prev, field, newValue);

      if (newWarnings.length > 0) {
        setWarnings(w => ({ ...w, [field]: newWarnings[0] }));
        setTimeout(() => setWarnings(w => ({ ...w, [field]: undefined })), 3000);
      }

      return { ...prev, [field]: newValue, ...autoAdjustments };
    });
  }, []);

  const handleSave = useCallback(() => {
    const updatedGame = { ...meta, ...stats };
    const { valid, errors } = validateGame(updatedGame);

    if (!valid) {
      setToast({ message: errors[0], type: 'error' });
      return;
    }

    updateGame(id, updatedGame);
    setToast({ message: 'Game updated!', type: 'success' });
    setTimeout(() => navigate(`/games/${id}`), 500);
  }, [meta, stats, updateGame, id, navigate]);

  const handleDelete = () => {
    deleteGame(id);
    navigate('/games');
  };

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

  return (
    <div>
      {toast && <Toast {...toast} onDismiss={() => setToast(null)} />}

      <h1 className="text-xl font-bold text-text-primary mb-4">Edit Game</h1>

      <LiveScoreBar stats={stats} />
      <GameMetaSection {...meta} onChange={(updates) => setMeta(prev => ({ ...prev, ...updates }))} />
      <ShootingSection stats={stats} onStatChange={updateStat} warnings={warnings} />
      <PlaymakingSection stats={stats} onStatChange={updateStat} warnings={warnings} />
      <DefenseSection stats={stats} onStatChange={updateStat} warnings={warnings} />

      <div className="flex gap-3 mt-6">
        <button
          onClick={() => navigate(`/games/${id}`)}
          className="flex-1 py-3 rounded-xl text-sm font-medium text-text-secondary bg-surface-secondary hover:bg-surface-elevated transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="flex-[2] py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-hoop-orange to-hoop-red active:scale-[0.98] transition-transform"
        >
          Save Changes
        </button>
      </div>

      <button
        onClick={() => setShowDelete(true)}
        className="w-full mt-4 py-3 rounded-xl text-sm font-medium text-hoop-red border border-hoop-red/30 hover:bg-hoop-red/10 transition-colors"
      >
        Delete Game
      </button>

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
