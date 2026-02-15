export default function GameMetaSection({ date, opponent, notes, onChange }) {
  return (
    <div className="space-y-3 mb-6">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-[10px] text-text-muted uppercase tracking-wider block mb-1">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => onChange({ date: e.target.value })}
            className="w-full bg-surface-elevated border border-surface-hover rounded-xl px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-hoop-orange/50"
            required
          />
        </div>
        <div>
          <label className="text-[10px] text-text-muted uppercase tracking-wider block mb-1">Opponent</label>
          <input
            type="text"
            value={opponent}
            onChange={(e) => onChange({ opponent: e.target.value })}
            placeholder="e.g., Lakers pickup"
            className="w-full bg-surface-elevated border border-surface-hover rounded-xl px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-hoop-orange/50"
          />
        </div>
      </div>
      <div>
        <label className="text-[10px] text-text-muted uppercase tracking-wider block mb-1">Notes</label>
        <textarea
          value={notes}
          onChange={(e) => onChange({ notes: e.target.value })}
          placeholder="How did you play? Any highlights?"
          rows={2}
          className="w-full bg-surface-elevated border border-surface-hover rounded-xl px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-hoop-orange/50 resize-y"
        />
      </div>
    </div>
  );
}
