'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useTheme } from '../lib/themes';
import { Game, getGames, clearGames } from '../lib/storage';

export default function HistoryPage() {
  const { theme } = useTheme();
  const [games, setGames] = useState<Game[]>([]);
  const [filter, setFilter] = useState<'all' | 'wins' | 'losses'>('all');

  useEffect(() => {
    setGames(getGames().reverse()); // Show newest first
  }, []);

  const handleClearHistory = () => {
    if (confirm('Are you sure you want to clear all game history? This cannot be undone.')) {
      clearGames();
      setGames([]);
    }
  };

  const getWinner = (game: Game) => {
    const t1 = game.scores.team1.reduce((a, b) => a + b, 0);
    const t2 = game.scores.team2.reduce((a, b) => a + b, 0);
    if (t1 > t2) return { name: game.team1, score: t1, opponent: t2, isTeam1: true };
    if (t2 > t1) return { name: game.team2, score: t2, opponent: t1, isTeam1: false };
    return { name: 'Tie', score: t1, opponent: t2, isTeam1: null }; // Tie
  };

  // Basic stats
  const totalGames = games.length;
  const totalInnings = games.reduce((acc, g) => acc + g.innings, 0);
  const totalRuns = games.reduce((acc, g) => {
    return acc + g.scores.team1.reduce((a, b) => a + b, 0) + g.scores.team2.reduce((a, b) => a + b, 0);
  }, 0);

  return (
    <div className="min-h-screen pb-12">
      {/* Header */}
      <header className={`${theme.colors.primary} text-white ${theme.styles.shadow} transition-colors duration-500`}>
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link 
              href="/" 
              className="text-2xl hover:opacity-80 transition-opacity font-bold"
              aria-label="Back to home page"
            >
              <span aria-hidden="true">←</span> Back
            </Link>
            <h1 className={`text-4xl font-bold flex items-center gap-3 ${theme.styles.fontHeader}`}>
              <span aria-hidden="true">🏆</span> Game History
            </h1>
            <div className="w-24" aria-hidden="true"></div>
          </div>
        </div>
      </header>

      <main id="main-content" className="container mx-auto px-4 py-8" tabIndex={-1}>
        {/* Stats Summary */}
        <section aria-labelledby="stats-heading" className="grid md:grid-cols-3 gap-6 mb-12">
          <h2 id="stats-heading" className="sr-only">Career Statistics</h2>
          <div className={`${theme.colors.cardBg} backdrop-blur-sm p-6 rounded-lg text-center border-2 ${theme.colors.cardBorder} shadow-lg`}>
            <div className="text-5xl font-bold mb-2 opacity-80">{totalGames}</div>
            <div className="text-sm uppercase tracking-widest font-bold opacity-60">Games Played</div>
          </div>
          <div className={`${theme.colors.cardBg} backdrop-blur-sm p-6 rounded-lg text-center border-2 ${theme.colors.cardBorder} shadow-lg`}>
            <div className="text-5xl font-bold mb-2 opacity-80">{totalRuns}</div>
            <div className="text-sm uppercase tracking-widest font-bold opacity-60">Total Runs</div>
          </div>
          <div className={`${theme.colors.cardBg} backdrop-blur-sm p-6 rounded-lg text-center border-2 ${theme.colors.cardBorder} shadow-lg`}>
            <div className="text-5xl font-bold mb-2 opacity-80">{totalInnings}</div>
            <div className="text-sm uppercase tracking-widest font-bold opacity-60">Innings Played</div>
          </div>
        </section>

        {/* History List */}
        <section aria-labelledby="history-heading" className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 id="history-heading" className={`text-3xl font-bold ${theme.styles.fontHeader}`}>Match Log</h2>
            
            {games.length > 0 && (
              <button
                onClick={handleClearHistory}
                className="text-red-600 hover:text-red-800 text-sm font-bold border-2 border-red-200 hover:border-red-400 px-4 py-2 rounded-lg transition-colors"
              >
                Clear History
              </button>
            )}
          </div>

          {games.length === 0 ? (
            <div className={`${theme.colors.cardBg} backdrop-blur-sm rounded-lg p-12 text-center border-2 ${theme.colors.cardBorder} border-dashed`}>
              <div className="text-6xl mb-6 opacity-50" aria-hidden="true">{theme.content.mascotEmoji}</div>
              <h3 className={`text-2xl font-bold mb-4 ${theme.styles.fontHeader}`}>No Games Yet!</h3>
              <p className="text-xl opacity-80 mb-8">
                The field is empty. Why not start a game?
              </p>
              <Link 
                href="/play"
                className={`inline-block ${theme.colors.buttonPrimary} font-bold py-3 px-8 rounded-lg text-xl transition-all shadow-lg hover:-translate-y-1`}
              >
                Start a Game
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {games.map((game) => {
                const result = getWinner(game);
                const scoreDisplay = `${game.scores.team1.reduce((a,b)=>a+b,0)} - ${game.scores.team2.reduce((a,b)=>a+b,0)}`;
                
                return (
                  <article 
                    key={game.id} 
                    className={`${theme.colors.cardBg} backdrop-blur-sm rounded-lg p-6 border-l-8 ${theme.colors.secondary} shadow-md hover:shadow-lg transition-shadow`}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <div className="text-sm opacity-60 font-bold mb-1">
                          {new Date(game.date).toLocaleDateString()} • {game.innings} Innings
                        </div>
                        <h3 className={`text-2xl font-bold ${theme.styles.fontHeader}`}>
                          {game.team1} vs {game.team2}
                        </h3>
                        <div className="mt-2 text-lg opacity-90">
                          Winner: <strong>{result.name}</strong>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className={`text-4xl font-bold ${theme.styles.fontHeader} bg-white/50 px-6 py-2 rounded-lg border-2 ${theme.colors.cardBorder}`}>
                          {scoreDisplay}
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        {/* Footer Quote */}
        {games.length > 0 && (
          <figure className={`mt-16 text-center max-w-2xl mx-auto ${theme.colors.cardBg} p-8 rounded-lg border-2 ${theme.colors.cardBorder} transform rotate-1 shadow-lg`}>
            <blockquote className={`text-2xl italic mb-4 opacity-90 ${theme.styles.fontHeader}`}>
              "{theme.content.footerQuote.text}"
            </blockquote>
            <figcaption className="text-lg font-bold opacity-70">
              — {theme.content.footerQuote.author}
            </figcaption>
          </figure>
        )}
      </main>
    </div>
  );
}
