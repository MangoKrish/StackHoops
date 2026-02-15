import { useState, useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGamesContext } from '../context/GamesContext';
import { useUndoStack } from '../hooks/useUndoStack';
import { useAutoSave } from '../hooks/useAutoSave';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';
import { DEFAULT_GAME_STATS } from '../constants/stats';
import { validateStatChange, validateGame } from '../utils/validation';
import { todayString } from '../utils/formatters';
import GameMetaSection from '../components/game-form/GameMetaSection';
import ShootingSection from '../components/game-form/ShootingSection';
import PlaymakingSection from '../components/game-form/PlaymakingSection';
import DefenseSection from '../components/game-form/DefenseSection';
import LiveScoreBar from '../components/game-form/LiveScoreBar';
import UndoBar from '../components/game-form/UndoBar';
import PresetButtons from '../components/game-form/PresetButtons';
import Toast from '../components/shared/Toast';

export default function AddGame() {
  const { addGame } = useGamesContext();
  const navigate = useNavigate();

  const [stats, setStats] = useState({ ...DEFAULT_GAME_STATS });
  const [meta, setMeta] = useState({ date: todayString(), opponent: '', notes: '' });
  const [warnings, setWarnings] = useState({});
  const [toast, setToast] = useState(null);
  const [draftPrompt, setDraftPrompt] = useState(false);

  const { pushAction, undoLast, canUndo, undoCount, lastAction, clearStack } = useUndoStack(10);
  const { hasDraft, loadDraft, clearDraft } = useAutoSave('hoopstats-draft', { stats, meta });
  const undoRef = useRef(null);

  // Check for draft on mount
  useEffect(() => {
    const existingDraft = loadDraft();
    if (existingDraft && (existingDraft.stats?.fgm > 0 || existingDraft.stats?.fga > 0 || existingDraft.meta?.opponent)) {
      setDraftPrompt(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const restoreDraft = () => {
    const draft = loadDraft();
    if (draft) {
      if (draft.stats) setStats(draft.stats);
      if (draft.meta) setMeta(draft.meta);
    }
    setDraftPrompt(false);
    setToast({ message: 'Draft restored', type: 'success' });
  };

  const dismissDraft = () => {
    clearDraft();
    setDraftPrompt(false);
  };

  const updateStat = useCallback((field, delta) => {
    setStats(prev => {
      const newValue = Math.max(0, prev[field] + delta);
      const { warnings: newWarnings, autoAdjustments } = validateStatChange(prev, field, newValue);

      // Build undo action
      const undoAction = { field, delta, previousValues: { [field]: prev[field] } };
      if (autoAdjustments && Object.keys(autoAdjustments).length > 0) {
        Object.keys(autoAdjustments).forEach(k => {
          undoAction.previousValues[k] = prev[k];
        });
      }

      // Use ref to push outside of setState
      undoRef.current = undoAction;

      // Update warnings
      if (newWarnings.length > 0) {
        setWarnings(w => ({ ...w, [field]: newWarnings[0] }));
        setTimeout(() => setWarnings(w => ({ ...w, [field]: undefined })), 3000);
      }

      return { ...prev, [field]: newValue, ...autoAdjustments };
    });
  }, []);

  // Push undo action after state update
  useEffect(() => {
    if (undoRef.current) {
      pushAction(undoRef.current);
      undoRef.current = null;
    }
  });

  const handleUndo = useCallback(() => {
    const action = undoLast();
    if (!action) return;

    setStats(prev => {
      const restored = { ...prev };
      if (action.previousValues) {
        Object.entries(action.previousValues).forEach(([key, val]) => {
          restored[key] = val;
        });
      }
      return restored;
    });
  }, [undoLast]);

  const handlePreset = useCallback((preset) => {
    setStats(prev => {
      const previousValues = {};
      const newStats = { ...prev };

      Object.entries(preset.changes).forEach(([key, delta]) => {
        previousValues[key] = prev[key];
        newStats[key] = Math.max(0, prev[key] + delta);
      });

      undoRef.current = { type: 'preset', label: preset.label, previousValues };
      return newStats;
    });
  }, []);

  const handleSave = useCallback(() => {
    const game = { ...meta, ...stats };
    const { valid, errors } = validateGame(game);

    if (!valid) {
      setToast({ message: errors[0], type: 'error' });
      return;
    }

    addGame(game);
    clearDraft();
    clearStack();
    setToast({ message: 'Game saved!', type: 'success' });
    setTimeout(() => navigate('/games'), 500);
  }, [meta, stats, addGame, clearDraft, clearStack, navigate]);

  useKeyboardShortcuts({
    'ctrl+z': handleUndo,
    'ctrl+s': handleSave,
  });

  return (
    <div>
      {toast && <Toast {...toast} onDismiss={() => setToast(null)} />}

      {/* Draft restore prompt */}
      {draftPrompt && (
        <div className="bg-hoop-blue/10 border border-hoop-blue/30 rounded-xl p-4 mb-4 flex items-center justify-between animate-fade-in">
          <span className="text-sm text-hoop-blue">Resume your previous draft?</span>
          <div className="flex gap-2">
            <button onClick={dismissDraft} className="px-3 py-1.5 text-xs text-text-secondary hover:text-text-primary rounded-lg">
              Discard
            </button>
            <button onClick={restoreDraft} className="px-3 py-1.5 text-xs font-semibold text-hoop-blue border border-hoop-blue/30 rounded-lg hover:bg-hoop-blue/10">
              Restore
            </button>
          </div>
        </div>
      )}

      <h1 className="text-xl font-bold text-text-primary mb-4">Log Game</h1>

      <LiveScoreBar stats={stats} />
      <UndoBar canUndo={canUndo} undoCount={undoCount} lastAction={lastAction} onUndo={handleUndo} />
      <PresetButtons onPreset={handlePreset} />
      <GameMetaSection {...meta} onChange={(updates) => setMeta(prev => ({ ...prev, ...updates }))} />
      <ShootingSection stats={stats} onStatChange={updateStat} warnings={warnings} />
      <PlaymakingSection stats={stats} onStatChange={updateStat} warnings={warnings} />
      <DefenseSection stats={stats} onStatChange={updateStat} warnings={warnings} />

      <div className="flex gap-3 mt-6">
        <button
          onClick={() => navigate('/')}
          className="flex-1 py-3 rounded-xl text-sm font-medium text-text-secondary bg-surface-secondary hover:bg-surface-elevated transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="flex-[2] py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-hoop-orange to-hoop-red active:scale-[0.98] transition-transform shadow-lg shadow-hoop-orange/20"
        >
          Save Game
        </button>
      </div>
    </div>
  );
}
