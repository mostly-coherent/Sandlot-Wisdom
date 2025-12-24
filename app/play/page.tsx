'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useTheme } from '../lib/themes';
import { Game, saveGame, getCurrentGame, setCurrentGame } from '../lib/storage';
import { getCommentary, getGameEndCommentary, getStartGameQuote } from '../lib/commentary';

export default function PlayPage() {
  const { theme } = useTheme();
  const [currentGame, setCurrentGameState] = useState<Game | null>(null);
  const [showSetup, setShowSetup] = useState(true);
  
  // Setup form state
  const [team1Name, setTeam1Name] = useState('');
  const [team2Name, setTeam2Name] = useState('');
  const [innings, setInnings] = useState(6);
  const [ruleSet, setRuleSet] = useState<'simplified' | 'little-league' | 'mlb'>('simplified');

  useEffect(() => {
    const game = getCurrentGame();
    if (game && game.status !== 'completed') {
      setCurrentGameState(game);
      setShowSetup(false);
    }
  }, []);

  const startNewGame = () => {
    if (!team1Name.trim() || !team2Name.trim()) {
      alert('Please enter names for both teams!');
      return;
    }

    const newGame: Game = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      team1: team1Name.trim(),
      team2: team2Name.trim(),
      innings,
      ruleSet,
      scores: {
        team1: Array(innings).fill(0),
        team2: Array(innings).fill(0)
      },
      currentInning: 1,
      status: 'in-progress'
    };

    setCurrentGameState(newGame);
    setCurrentGame(newGame);
    saveGame(newGame);
    setShowSetup(false);
  };

  const updateScore = (team: 'team1' | 'team2', inning: number, score: number) => {
    if (!currentGame) return;

    const updatedGame = { ...currentGame };
    updatedGame.scores[team][inning - 1] = Math.max(0, score);
    
    setCurrentGameState(updatedGame);
    setCurrentGame(updatedGame);
    saveGame(updatedGame);
  };

  const endGame = () => {
    if (!currentGame) return;

    const team1Total = currentGame.scores.team1.reduce((a, b) => a + b, 0);
    const team2Total = currentGame.scores.team2.reduce((a, b) => a + b, 0);
    
    const winner = team1Total > team2Total ? currentGame.team1 : 
                   team2Total > team1Total ? currentGame.team2 : 'Tie';

    const completedGame = {
      ...currentGame,
      status: 'completed' as const,
      winner
    };

    saveGame(completedGame);
    setCurrentGame(null);
    setCurrentGameState(completedGame);
  };

  const abandonGame = () => {
    if (confirm('Are you sure you want to abandon this game? This game will not be saved.')) {
      if (currentGame) {
        setCurrentGame(null);
      }
      setCurrentGameState(null);
      setShowSetup(true);
      setTeam1Name('');
      setTeam2Name('');
    }
  };

  const startAnotherGame = () => {
    setCurrentGameState(null);
    setShowSetup(true);
    setTeam1Name('');
    setTeam2Name('');
  };

  const team1Total = currentGame ? currentGame.scores.team1.reduce((a, b) => a + b, 0) : 0;
  const team2Total = currentGame ? currentGame.scores.team2.reduce((a, b) => a + b, 0) : 0;

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
              <span aria-hidden="true" className="animate-bounce-ball">⚾</span> Play Ball!
            </h1>
            <div className="w-24" aria-hidden="true"></div>
          </div>
        </div>
      </header>

      <main id="main-content" className="container mx-auto px-4 py-8" tabIndex={-1}>
        {showSetup ? (
          /* Game Setup */
          <section aria-labelledby="setup-heading" className={`${theme.colors.cardBg} backdrop-blur-sm rounded-lg p-8 max-w-2xl mx-auto border-2 ${theme.colors.cardBorder} ${theme.styles.shadow}`}>
            <h2 id="setup-heading" className={`text-3xl font-bold text-center mb-8 ${theme.styles.fontHeader}`}>
              <span aria-hidden="true">⚙️</span> Set Up Your Game
            </h2>
            
            <div className={`bg-white/50 rounded-lg p-6 mb-8 border-l-8 ${theme.colors.secondary}`}>
              <p className="text-xl italic text-center opacity-90">"{getStartGameQuote(theme)}"</p>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); startNewGame(); }} className="space-y-8">
              {/* Team Names */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="team1-name" className="block text-lg font-bold mb-2 opacity-90">
                    Home Team
                  </label>
                  <input
                    id="team1-name"
                    type="text"
                    value={team1Name}
                    onChange={(e) => setTeam1Name(e.target.value)}
                    placeholder="e.g. Tigers"
                    className={`w-full px-4 py-3 border-2 ${theme.colors.cardBorder} rounded-lg focus:outline-none focus:ring-2 focus:ring-current text-lg bg-white/80`}
                    aria-required="true"
                    autoComplete="off"
                  />
                </div>

                <div>
                  <label htmlFor="team2-name" className="block text-lg font-bold mb-2 opacity-90">
                    Away Team
                  </label>
                  <input
                    id="team2-name"
                    type="text"
                    value={team2Name}
                    onChange={(e) => setTeam2Name(e.target.value)}
                    placeholder="e.g. Giants"
                    className={`w-full px-4 py-3 border-2 ${theme.colors.cardBorder} rounded-lg focus:outline-none focus:ring-2 focus:ring-current text-lg bg-white/80`}
                    aria-required="true"
                    autoComplete="off"
                  />
                </div>
              </div>

              {/* Number of Innings */}
              <fieldset>
                <legend className="block text-lg font-bold mb-3 opacity-90">Length of Game</legend>
                <div className="flex gap-4" role="radiogroup">
                  {[3, 6, 9].map(num => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setInnings(num)}
                      aria-pressed={innings === num}
                      className={`flex-1 py-4 rounded-lg font-bold text-lg transition-all ${
                        innings === num
                          ? `${theme.colors.buttonPrimary} shadow-lg scale-105`
                          : 'bg-white/50 hover:bg-white/80 border-2 border-transparent'
                      }`}
                    >
                      {num} Innings
                    </button>
                  ))}
                </div>
              </fieldset>

              {/* Rule Set */}
              <fieldset>
                <legend className="block text-lg font-bold mb-3 opacity-90">Rules</legend>
                <div className="space-y-3" role="radiogroup">
                  {[
                    { id: 'simplified', icon: '🌱', label: 'Backyard', desc: 'Relaxed rules, maximum fun' },
                    { id: 'little-league', icon: '🏆', label: 'Little League', desc: 'Official youth rules' },
                    { id: 'mlb', icon: '⚡', label: 'Pro Rules', desc: 'Strict 3 outs, 9 innings' }
                  ].map((rule) => (
                    <button
                      key={rule.id}
                      type="button"
                      onClick={() => setRuleSet(rule.id as any)}
                      aria-pressed={ruleSet === rule.id}
                      className={`w-full p-4 rounded-lg text-left transition-all flex items-center gap-4 ${
                        ruleSet === rule.id
                          ? `${theme.colors.buttonSecondary} shadow-lg scale-[1.02]`
                          : 'bg-white/50 hover:bg-white/80 border-2 border-transparent'
                      }`}
                    >
                      <span className="text-3xl" aria-hidden="true">{rule.icon}</span>
                      <div>
                        <div className="font-bold text-lg">{rule.label}</div>
                        <div className="text-sm opacity-90">{rule.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </fieldset>

              <button
                type="submit"
                className={`w-full ${theme.colors.buttonPrimary} font-bold py-4 px-6 rounded-lg text-2xl transition-all transform hover:scale-[1.02] shadow-xl mt-8`}
              >
                Start Game!
              </button>
            </form>
          </section>
        ) : currentGame?.status === 'completed' ? (
          /* Game Completed */
          <section aria-labelledby="gameover-heading" className={`${theme.colors.cardBg} backdrop-blur-sm rounded-lg p-8 max-w-4xl mx-auto border-2 ${theme.colors.cardBorder} ${theme.styles.shadow}`}>
            <h2 id="gameover-heading" className={`text-5xl font-bold text-center mb-8 ${theme.styles.fontHeader}`}>
              Game Over!
            </h2>
            
            <div className={`bg-white/50 rounded-lg p-8 mb-8 border-l-8 ${theme.colors.secondary}`}>
              <p className="text-2xl text-center font-medium leading-relaxed">
                {currentGame.winner === 'Tie' ? 
                  getGameEndCommentary('Tie', '', { winner: team1Total, loser: team2Total }, theme) :
                  getGameEndCommentary(
                    currentGame.winner === currentGame.team1 ? currentGame.team1 : currentGame.team2,
                    currentGame.winner === currentGame.team1 ? currentGame.team2 : currentGame.team1,
                    {
                      winner: currentGame.winner === currentGame.team1 ? team1Total : team2Total,
                      loser: currentGame.winner === currentGame.team1 ? team2Total : team1Total
                    },
                    theme
                  )
                }
              </p>
            </div>

            <div className="text-center mb-12">
              <div className={`text-8xl font-bold mb-4 ${theme.styles.fontHeader}`}>
                {team1Total} - {team2Total}
              </div>
              <div className="text-3xl font-bold opacity-90">
                Winner: {currentGame.winner}! <span aria-hidden="true">🏆</span>
              </div>
            </div>

            <div className="flex gap-6">
              <Link 
                href="/history"
                className={`flex-1 ${theme.colors.buttonSecondary} font-bold py-4 px-6 rounded-lg text-xl text-center transition-all`}
              >
                View History
              </Link>
              <button
                onClick={startAnotherGame}
                className={`flex-1 ${theme.colors.buttonPrimary} font-bold py-4 px-6 rounded-lg text-xl transition-all`}
              >
                Play Again
              </button>
            </div>
          </section>
        ) : currentGame ? (
          /* Active Game */
          <div className="space-y-8 max-w-4xl mx-auto">
            {/* Commentary Banner */}
            <div 
              className={`${theme.colors.cardBg} rounded-lg shadow-lg p-6 border-l-8 ${theme.colors.secondary} transform hover:scale-[1.01] transition-transform`}
              role="status"
              aria-live="polite"
            >
              <p className="text-2xl text-center font-medium">
                {getCommentary({
                  team1Score: team1Total,
                  team2Score: team2Total,
                  inning: currentGame.currentInning,
                  team1Name: currentGame.team1,
                  team2Name: currentGame.team2
                }, theme)}
              </p>
            </div>

            {/* Scoreboard Card */}
            <section className={`${theme.colors.cardBg} rounded-lg shadow-xl p-8 border-2 ${theme.colors.cardBorder}`}>
              <div className="grid grid-cols-2 gap-8 text-center mb-8">
                <div className="p-6 bg-white/50 rounded-lg">
                  <h3 className={`text-3xl font-bold mb-2 ${theme.styles.fontHeader}`}>{currentGame.team1}</h3>
                  <div className="text-7xl font-bold text-blue-700">{team1Total}</div>
                </div>
                <div className="p-6 bg-white/50 rounded-lg">
                  <h3 className={`text-3xl font-bold mb-2 ${theme.styles.fontHeader}`}>{currentGame.team2}</h3>
                  <div className="text-7xl font-bold text-red-700">{team2Total}</div>
                </div>
              </div>

              {/* Inning Input Grid */}
              <div className="overflow-x-auto pb-4">
                <table className="w-full min-w-[600px]">
                  <thead>
                    <tr className="border-b-2 border-current opacity-50">
                      <th className="p-3 text-left w-32">Team</th>
                      {Array.from({ length: currentGame.innings }, (_, i) => (
                        <th key={i} className="p-3 text-center w-16">{i + 1}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-current/20">
                      <th className="p-4 text-left font-bold text-lg">{currentGame.team1}</th>
                      {currentGame.scores.team1.map((score, i) => (
                        <td key={i} className="p-2 text-center">
                          <input
                            type="number"
                            min="0"
                            value={score}
                            onChange={(e) => updateScore('team1', i + 1, parseInt(e.target.value) || 0)}
                            className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:border-blue-600 focus:outline-none"
                            aria-label={`${currentGame.team1} inning ${i + 1}`}
                          />
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <th className="p-4 text-left font-bold text-lg">{currentGame.team2}</th>
                      {currentGame.scores.team2.map((score, i) => (
                        <td key={i} className="p-2 text-center">
                          <input
                            type="number"
                            min="0"
                            value={score}
                            onChange={(e) => updateScore('team2', i + 1, parseInt(e.target.value) || 0)}
                            className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none"
                            aria-label={`${currentGame.team2} inning ${i + 1}`}
                          />
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Game Controls */}
            <div className="grid grid-cols-2 gap-6">
              <button
                onClick={endGame}
                className={`${theme.colors.buttonPrimary} font-bold py-4 px-6 rounded-lg text-xl transition-all shadow-lg hover:-translate-y-1`}
              >
                🏁 End Game
              </button>
              <button
                onClick={abandonGame}
                className="bg-red-100 hover:bg-red-200 text-red-800 font-bold py-4 px-6 rounded-lg text-xl transition-all border-2 border-red-200"
              >
                ❌ Abandon
              </button>
            </div>
          </div>
        ) : null}
      </main>
    </div>
  );
}
