export default function UndoBar({ canUndo, undoCount, lastAction, onUndo }) {
  if (!canUndo) return null;

  const description = lastAction
    ? `${lastAction.field?.toUpperCase() || 'Action'} ${lastAction.type === 'preset' ? lastAction.label || '' : (lastAction.delta > 0 ? '+1' : '-1')}`
    : '';

  return (
    <div className="flex items-center justify-between bg-surface-secondary rounded-xl px-4 py-2.5 mb-4">
      <span className="text-xs text-text-secondary">
        {undoCount} action{undoCount !== 1 ? 's' : ''} to undo
      </span>
      <button
        onClick={onUndo}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-hoop-orange border border-hoop-orange/30 hover:bg-hoop-orange/10 active:scale-95 transition-all"
        aria-label={`Undo last action: ${description}`}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
          <polyline points="1 4 1 10 7 10" />
          <path d="M3.51 15a9 9 0 105.36-9.36L1 10" />
        </svg>
        Undo{description ? `: ${description}` : ''}
      </button>
    </div>
  );
}
