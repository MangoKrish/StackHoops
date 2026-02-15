import { useCallback, useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { generateId } from '../utils/id';
import { calculateDerivedStats, calculateSeasonAverages, calculateRecentAverages } from '../utils/gameCalculations';

export function useGames() {
  const [games, setGames] = useLocalStorage('hoopstats-games', []);

  const sortedGames = useMemo(() => {
    return [...games].sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [games]);

  const addGame = useCallback((gameData) => {
    const now = Date.now();
    const derived = calculateDerivedStats(gameData);
    const newGame = {
      ...gameData,
      ...derived,
      id: generateId(),
      createdAt: now,
      updatedAt: now,
    };
    setGames(prev => [...prev, newGame]);
    return newGame;
  }, [setGames]);

  const updateGame = useCallback((id, updates) => {
    setGames(prev => prev.map(game => {
      if (game.id !== id) return game;
      const updated = { ...game, ...updates, updatedAt: Date.now() };
      const derived = calculateDerivedStats(updated);
      return { ...updated, ...derived };
    }));
  }, [setGames]);

  const deleteGame = useCallback((id) => {
    setGames(prev => prev.filter(game => game.id !== id));
  }, [setGames]);

  const getGame = useCallback((id) => {
    return games.find(game => game.id === id) || null;
  }, [games]);

  const seasonAverages = useMemo(() => {
    return calculateSeasonAverages(games);
  }, [games]);

  const recentAverages = useMemo(() => {
    return calculateRecentAverages(sortedGames, 5);
  }, [sortedGames]);

  const getRecentGames = useCallback((n = 5) => {
    return sortedGames.slice(0, n);
  }, [sortedGames]);

  const importGames = useCallback((importedGames) => {
    setGames(prev => {
      const existingIds = new Set(prev.map(g => g.id));
      const newGames = importedGames.filter(g => !existingIds.has(g.id));
      return [...prev, ...newGames];
    });
  }, [setGames]);

  return {
    games: sortedGames,
    addGame,
    updateGame,
    deleteGame,
    getGame,
    seasonAverages,
    recentAverages,
    getRecentGames,
    importGames,
    totalGames: games.length,
  };
}
