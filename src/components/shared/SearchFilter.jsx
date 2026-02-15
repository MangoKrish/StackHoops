import { useState } from 'react';

export default function SearchFilter({ onFilterChange }) {
  const [search, setSearch] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [sortBy, setSortBy] = useState('date-desc');
  const [showFilters, setShowFilters] = useState(false);

  const emitChange = (overrides = {}) => {
    onFilterChange({
      search: overrides.search ?? search,
      dateFrom: overrides.dateFrom ?? dateFrom,
      dateTo: overrides.dateTo ?? dateTo,
      sortBy: overrides.sortBy ?? sortBy,
    });
  };

  return (
    <div className="space-y-3 mb-4">
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); emitChange({ search: e.target.value }); }}
            placeholder="Search by opponent..."
            className="w-full bg-surface-elevated border border-surface-hover rounded-xl px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-hoop-orange/50"
            aria-label="Search games"
          />
          {search && (
            <button
              onClick={() => { setSearch(''); emitChange({ search: '' }); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary text-sm"
              aria-label="Clear search"
            >
              x
            </button>
          )}
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
            showFilters ? 'bg-hoop-orange/15 text-hoop-orange' : 'bg-surface-elevated text-text-secondary hover:text-text-primary'
          }`}
          aria-label="Toggle filters"
          aria-expanded={showFilters}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
          </svg>
        </button>
      </div>

      {showFilters && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-3 bg-surface-secondary rounded-xl animate-fade-in">
          <div>
            <label className="text-[10px] text-text-muted uppercase tracking-wider block mb-1">From</label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => { setDateFrom(e.target.value); emitChange({ dateFrom: e.target.value }); }}
              className="w-full bg-surface-elevated border border-surface-hover rounded-lg px-3 py-2 text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-hoop-orange/50"
            />
          </div>
          <div>
            <label className="text-[10px] text-text-muted uppercase tracking-wider block mb-1">To</label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => { setDateTo(e.target.value); emitChange({ dateTo: e.target.value }); }}
              className="w-full bg-surface-elevated border border-surface-hover rounded-lg px-3 py-2 text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-hoop-orange/50"
            />
          </div>
          <div className="col-span-2 md:col-span-1">
            <label className="text-[10px] text-text-muted uppercase tracking-wider block mb-1">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => { setSortBy(e.target.value); emitChange({ sortBy: e.target.value }); }}
              className="w-full bg-surface-elevated border border-surface-hover rounded-lg px-3 py-2 text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-hoop-orange/50"
            >
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="pts-desc">Most Points</option>
              <option value="pts-asc">Fewest Points</option>
              <option value="fg-desc">Best FG%</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
