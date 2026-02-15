import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Home', icon: HomeIcon },
  { to: '/add', label: 'Add Game', icon: PlusIcon, isAction: true },
  { to: '/games', label: 'Games', icon: ListIcon },
  { to: '/analytics', label: 'Stats', icon: ChartIcon },
];

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" className="w-7 h-7">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function ListIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" />
      <line x1="3" y1="12" x2="3.01" y2="12" />
      <line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}

export default function Navigation() {
  return (
    <>
      {/* Desktop top nav */}
      <nav className="hidden md:block sticky top-0 z-50 bg-surface-secondary/95 backdrop-blur-sm border-b border-surface-elevated" aria-label="Main navigation">
        <div className="max-w-4xl mx-auto px-6 flex items-center h-16">
          <NavLink to="/" className="text-xl font-bold bg-gradient-to-r from-hoop-orange to-hoop-red bg-clip-text text-transparent mr-8">
            HoopStats
          </NavLink>
          <div className="flex items-center gap-1">
            {navItems.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-hoop-orange/15 text-hoop-orange'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface-elevated/50'
                  }`
                }
              >
                <item.icon />
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-surface-secondary/95 backdrop-blur-sm border-t border-surface-elevated safe-area-bottom" aria-label="Main navigation">
        <div className="flex items-center justify-around h-16 px-2">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                item.isAction
                  ? `flex items-center justify-center w-14 h-14 -mt-6 rounded-full bg-gradient-to-br from-hoop-orange to-hoop-red text-white shadow-lg shadow-hoop-orange/25 active:scale-95 transition-transform`
                  : `flex flex-col items-center gap-0.5 py-1 px-3 rounded-lg transition-colors ${
                      isActive
                        ? 'text-hoop-orange'
                        : 'text-text-muted'
                    }`
              }
            >
              <item.icon />
              {!item.isAction && <span className="text-[10px] font-medium">{item.label}</span>}
            </NavLink>
          ))}
        </div>
      </nav>
    </>
  );
}
