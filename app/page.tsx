'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useTheme } from './lib/themes';

export default function Home() {
  const { theme } = useTheme();
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    setGreeting(theme.content.greetings[Math.floor(Math.random() * theme.content.greetings.length)]);
  }, [theme]);

  return (
    <div className="min-h-screen pb-12">
      {/* Header */}
      <header className={`${theme.colors.primary} text-white ${theme.styles.shadow} transition-colors duration-500`}>
        <div className="container mx-auto px-4 py-8">
          <h1 className={`text-5xl text-center flex items-center justify-center gap-4 ${theme.styles.fontHeader}`}>
            <span className="animate-bounce-ball" aria-hidden="true">{theme.content.mascotEmoji}</span>
            {theme.content.title}
            <span className="animate-bounce-ball" aria-hidden="true">{theme.content.mascotEmoji}</span>
          </h1>
          <p className="text-center mt-3 text-xl opacity-90 font-medium">
            {theme.content.subtitle}
          </p>
        </div>
      </header>

      <main id="main-content" className="container mx-auto px-4 py-12 space-y-12" tabIndex={-1}>
        {/* Welcome Message */}
        <section 
          aria-labelledby="welcome-heading" 
          className={`${theme.colors.cardBg} backdrop-blur-sm p-8 border-4 ${theme.colors.secondary} ${theme.styles.borderRadius} ${theme.styles.shadow} max-w-3xl mx-auto text-center transform hover:scale-[1.01] transition-transform duration-300`}
        >
          <h2 id="welcome-heading" className={`text-3xl font-bold mb-4 ${theme.styles.fontHeader}`} aria-live="polite">
            {greeting}
          </h2>
          <p className="text-xl leading-relaxed opacity-90">
            Whether you're a rookie or a veteran, <br/>
            there's always room on the roster.
          </p>
        </section>

        {/* Navigation Cards */}
        <nav aria-label="Main features" className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link 
            href="/learn" 
            className={`group block ${theme.colors.cardBg} p-6 border-2 ${theme.colors.cardBorder} ${theme.styles.borderRadius} ${theme.styles.shadow} hover:shadow-xl transition-all transform hover:-translate-y-1`}
            aria-describedby="learn-desc"
          >
            <div className="text-5xl mb-4 text-center transform group-hover:scale-110 transition-transform duration-300" aria-hidden="true">📚</div>
            <h3 className={`text-2xl font-bold text-center mb-2 ${theme.styles.fontHeader}`}>Learn</h3>
            <p id="learn-desc" className="text-center opacity-80">
              Interactive lessons on rules, positions, and strategy
            </p>
          </Link>

          <Link 
            href="/play" 
            className={`group block ${theme.colors.cardBg} p-6 border-2 ${theme.colors.cardBorder} ${theme.styles.borderRadius} ${theme.styles.shadow} hover:shadow-xl transition-all transform hover:-translate-y-1`}
            aria-describedby="play-desc"
          >
            <div className="text-5xl mb-4 text-center transform group-hover:scale-110 transition-transform duration-300" aria-hidden="true">⚾</div>
            <h3 className={`text-2xl font-bold text-center mb-2 ${theme.styles.fontHeader}`}>Play</h3>
            <p id="play-desc" className="text-center opacity-80">
              Start a new game and track scores inning by inning
            </p>
          </Link>

          <Link 
            href="/reference" 
            className={`group block ${theme.colors.cardBg} p-6 border-2 ${theme.colors.cardBorder} ${theme.styles.borderRadius} ${theme.styles.shadow} hover:shadow-xl transition-all transform hover:-translate-y-1`}
            aria-describedby="ref-desc"
          >
            <div className="text-5xl mb-4 text-center transform group-hover:scale-110 transition-transform duration-300" aria-hidden="true">📖</div>
            <h3 className={`text-2xl font-bold text-center mb-2 ${theme.styles.fontHeader}`}>Reference</h3>
            <p id="ref-desc" className="text-center opacity-80">
              Quick rule lookups and position diagrams
            </p>
          </Link>

          <Link 
            href="/history" 
            className={`group block ${theme.colors.cardBg} p-6 border-2 ${theme.colors.cardBorder} ${theme.styles.borderRadius} ${theme.styles.shadow} hover:shadow-xl transition-all transform hover:-translate-y-1`}
            aria-describedby="history-desc"
          >
            <div className="text-5xl mb-4 text-center transform group-hover:scale-110 transition-transform duration-300" aria-hidden="true">🏆</div>
            <h3 className={`text-2xl font-bold text-center mb-2 ${theme.styles.fontHeader}`}>History</h3>
            <p id="history-desc" className="text-center opacity-80">
              View past games and your baseball journey
            </p>
          </Link>
        </nav>

        {/* Fun Facts Section */}
        <section 
          aria-labelledby="funfact-heading" 
          className={`${theme.colors.cardBg} p-8 border-l-8 ${theme.colors.secondary} ${theme.styles.borderRadius} ${theme.styles.shadow} max-w-4xl mx-auto`}
        >
          <h3 id="funfact-heading" className={`text-2xl font-bold mb-3 flex items-center gap-3 ${theme.styles.fontHeader}`}>
            <span aria-hidden="true">💡</span> {theme.content.funFact.title}
          </h3>
          <p className="text-xl leading-relaxed opacity-90 italic">
            "{theme.content.funFact.text}"
          </p>
        </section>

        {/* Quick Start Tips */}
        <section aria-labelledby="quickstart-heading" className={`bg-white/80 backdrop-blur p-8 border ${theme.colors.cardBorder} ${theme.styles.borderRadius} ${theme.styles.shadow}`}>
          <h3 id="quickstart-heading" className={`text-2xl font-bold text-center mb-8 ${theme.styles.fontHeader}`}>
            Quick Start Guide
          </h3>
          <ol className="grid md:grid-cols-3 gap-8 list-none">
            <li className="text-center relative">
              <div className={`w-12 h-12 ${theme.colors.primary} text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 ${theme.styles.shadow}`}>1</div>
              <h4 className="font-bold mb-2 text-lg">New to Baseball?</h4>
              <p className="opacity-80">Start with the <strong>Learn</strong> section to understand the basics</p>
            </li>
            <li className="text-center relative">
              <div className={`w-12 h-12 ${theme.colors.primary} text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 ${theme.styles.shadow}`}>2</div>
              <h4 className="font-bold mb-2 text-lg">Ready to Play?</h4>
              <p className="opacity-80">Head to <strong>Play</strong> to set up your first backyard game</p>
            </li>
            <li className="text-center relative">
              <div className={`w-12 h-12 ${theme.colors.primary} text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 ${theme.styles.shadow}`}>3</div>
              <h4 className="font-bold mb-2 text-lg">Need Quick Help?</h4>
              <p className="opacity-80">Check <strong>Reference</strong> for instant rule lookups</p>
            </li>
          </ol>
        </section>
      </main>

      {/* Footer */}
      <footer className={`${theme.colors.primary} text-white py-12 mt-12 transition-colors duration-500`}>
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <blockquote className={`text-2xl italic mb-6 ${theme.styles.fontHeader} opacity-90`}>
            "{theme.content.footerQuote.text}"
          </blockquote>
          <cite className="block text-lg opacity-80 not-italic mb-8">
            — {theme.content.footerQuote.author}
          </cite>
          <div className="w-16 h-1 bg-white/20 mx-auto mb-8 rounded-full"></div>
          <p className="opacity-70 font-medium">
            {theme.content.footerTagline} <span aria-hidden="true" className="ml-2">{theme.content.mascotEmoji}</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
