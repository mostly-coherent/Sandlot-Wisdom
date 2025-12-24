// Local storage utilities for game data

export interface Game {
  id: string;
  date: string;
  team1: string;
  team2: string;
  innings: number;
  ruleSet: 'simplified' | 'little-league' | 'mlb';
  scores: {
    team1: number[];
    team2: number[];
  };
  currentInning: number;
  status: 'setup' | 'in-progress' | 'completed';
  winner?: string;
}

const GAMES_KEY = 'sandlot-wisdom-games';
const CURRENT_GAME_KEY = 'sandlot-wisdom-current-game';

export const saveGame = (game: Game): void => {
  if (typeof window === 'undefined') return;
  
  const games = getGames();
  const existingIndex = games.findIndex(g => g.id === game.id);
  
  if (existingIndex >= 0) {
    games[existingIndex] = game;
  } else {
    games.push(game);
  }
  
  localStorage.setItem(GAMES_KEY, JSON.stringify(games));
};

export const getGames = (): Game[] => {
  if (typeof window === 'undefined') return [];
  
  const stored = localStorage.getItem(GAMES_KEY);
  if (!stored) return [];
  
  try {
    return JSON.parse(stored);
  } catch {
    console.error('Failed to parse games from localStorage');
    return [];
  }
};

export const getGame = (id: string): Game | null => {
  const games = getGames();
  return games.find(g => g.id === id) || null;
};

export const deleteGame = (id: string): void => {
  if (typeof window === 'undefined') return;
  
  const games = getGames().filter(g => g.id !== id);
  localStorage.setItem(GAMES_KEY, JSON.stringify(games));
};

export const setCurrentGame = (game: Game | null): void => {
  if (typeof window === 'undefined') return;
  
  if (game) {
    localStorage.setItem(CURRENT_GAME_KEY, JSON.stringify(game));
  } else {
    localStorage.removeItem(CURRENT_GAME_KEY);
  }
};

export const getCurrentGame = (): Game | null => {
  if (typeof window === 'undefined') return null;
  
  const stored = localStorage.getItem(CURRENT_GAME_KEY);
  if (!stored) return null;
  
  try {
    return JSON.parse(stored);
  } catch {
    console.error('Failed to parse current game from localStorage');
    return null;
  }
};

export const clearGames = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(GAMES_KEY);
};

