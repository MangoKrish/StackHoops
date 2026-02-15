import { createContext, useContext } from 'react';
import { useGames } from '../hooks/useGames';

const GamesContext = createContext(null);

export function GamesProvider({ children }) {
  const gamesHook = useGames();
  return (
    <GamesContext.Provider value={gamesHook}>
      {children}
    </GamesContext.Provider>
  );
}

export function useGamesContext() {
  const context = useContext(GamesContext);
  if (!context) {
    throw new Error('useGamesContext must be used within a GamesProvider');
  }
  return context;
}
