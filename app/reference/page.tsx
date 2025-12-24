'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useTheme } from '../lib/themes';

const terms = [
  { term: 'Ace', def: 'The best pitcher on the team.' },
  { term: 'Balk', def: 'An illegal motion by the pitcher with runners on base.' },
  { term: 'Cleanup', def: 'The 4th batter in the lineup, usually a power hitter.' },
  { term: 'Double Play', def: 'A defensive play that records two outs.' },
  { term: 'ERA', def: 'Earned Run Average - runs allowed per 9 innings.' },
  { term: 'Full Count', def: '3 balls and 2 strikes on the batter.' },
  { term: 'Grand Slam', def: 'A home run with the bases loaded (4 runs).' },
  { term: 'Hot Corner', def: 'Third base, because hard hits come fast.' },
  { term: 'Infield Fly', def: 'A rule preventing easy double plays on pop-ups.' },
  { term: 'Jack', def: 'Slang for a home run.' },
  { term: 'Knuckleball', def: 'A pitch that floats and moves unpredictably.' },
  { term: 'Lead', def: 'Distance a runner takes from a base before the pitch.' },
  { term: 'Mendoza Line', def: 'A batting average of .200 (struggling).' },
  { term: 'No-Hitter', def: 'A game where a team gets zero hits.' },
  { term: 'On Deck', def: 'The next batter waiting to hit.' },
  { term: 'Pickle', def: 'A rundown where a runner is trapped between bases.' },
  { term: 'RBI', def: 'Run Batted In - credit for scoring a run.' },
  { term: 'Southpaw', def: 'A left-handed pitcher.' },
  { term: 'Triple Crown', def: 'Leading league in AVG, HR, and RBI.' },
  { term: 'Utility Player', def: 'Someone who can play multiple positions.' },
  { term: 'Walk-off', def: 'A hit that ends the game in the bottom of the last inning.' },
  { term: 'Yard', def: 'The baseball field ("Going yard" = home run).' },
  { term: 'Zip', def: 'Fast speed on a pitch.' }
];

export default function ReferencePage() {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTerms = terms.filter(item => 
    item.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.def.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              <span aria-hidden="true">📖</span> Rule Book
            </h1>
            <div className="w-24" aria-hidden="true"></div>
          </div>
        </div>
      </header>

      <main id="main-content" className="container mx-auto px-4 py-8" tabIndex={-1}>
        {/* Field Diagram Card */}
        <section aria-labelledby="field-heading" className={`${theme.colors.cardBg} backdrop-blur-sm rounded-lg shadow-lg p-8 mb-12 border-2 ${theme.colors.cardBorder} max-w-4xl mx-auto`}>
          <h2 id="field-heading" className={`text-3xl font-bold mb-8 text-center ${theme.styles.fontHeader}`}>Field Positions</h2>
          
          <div className="relative aspect-[4/3] bg-emerald-600 rounded-lg overflow-hidden border-4 border-white/20 shadow-inner">
            {/* Field Markings */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(194,178,128,0.4)_0%,rgba(194,178,128,0.4)_25%,transparent_25%)]"></div>
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-48 h-48 border-2 border-white/50 rotate-45"></div>
            
            {/* Position Markers */}
            {[
              { id: 'P', name: 'Pitcher', top: '65%', left: '50%' },
              { id: 'C', name: 'Catcher', top: '90%', left: '50%' },
              { id: '1B', name: 'First Base', top: '60%', left: '70%' },
              { id: '2B', name: 'Second Base', top: '45%', left: '60%' },
              { id: '3B', name: 'Third Base', top: '60%', left: '30%' },
              { id: 'SS', name: 'Shortstop', top: '45%', left: '40%' },
              { id: 'LF', name: 'Left Field', top: '25%', left: '20%' },
              { id: 'CF', name: 'Center Field', top: '15%', left: '50%' },
              { id: 'RF', name: 'Right Field', top: '25%', left: '80%' },
            ].map(pos => (
              <div 
                key={pos.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-help"
                style={{ top: pos.top, left: pos.left }}
                aria-label={pos.name}
              >
                <div className={`w-10 h-10 ${theme.colors.cardBg} rounded-full flex items-center justify-center font-bold border-2 ${theme.colors.cardBorder} shadow-lg group-hover:scale-125 transition-transform text-black`}>
                  {pos.id}
                </div>
                <span className="text-white text-xs font-bold mt-1 bg-black/50 px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {pos.name}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Glossary */}
        <section aria-labelledby="glossary-heading" className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <h2 id="glossary-heading" className={`text-3xl font-bold ${theme.styles.fontHeader}`}>Baseball Glossary</h2>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl opacity-50" aria-hidden="true">🔍</span>
              <input
                type="search"
                placeholder="Search terms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-12 pr-6 py-3 rounded-lg border-2 ${theme.colors.cardBorder} w-full md:w-80 focus:ring-4 focus:ring-current/20 focus:outline-none text-lg bg-white/80`}
                aria-label="Search glossary terms"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {filteredTerms.length > 0 ? (
              filteredTerms.map((item, i) => (
                <div 
                  key={i}
                  className={`${theme.colors.cardBg} backdrop-blur-sm rounded-lg p-6 border-l-4 ${theme.colors.secondary} shadow-md hover:shadow-lg transition-shadow`}
                >
                  <dt className="text-xl font-bold mb-2 flex items-center gap-2">
                    {item.term}
                  </dt>
                  <dd className="text-lg opacity-80 leading-relaxed">
                    {item.def}
                  </dd>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center py-12 opacity-70 text-xl italic">
                No terms found matching "{searchTerm}"
              </div>
            )}
          </div>
        </section>

        {/* Footer Quote */}
        <figure className={`mt-16 text-center max-w-2xl mx-auto ${theme.colors.cardBg} p-8 rounded-lg border-2 ${theme.colors.cardBorder} transform -rotate-1 shadow-lg`}>
          <blockquote className={`text-2xl italic mb-4 opacity-90 ${theme.styles.fontHeader}`}>
            "{theme.content.footerQuote.text}"
          </blockquote>
          <figcaption className="text-lg font-bold opacity-70 flex items-center justify-center gap-2">
            — {theme.content.footerQuote.author} <span aria-hidden="true">{theme.content.mascotEmoji}</span>
          </figcaption>
        </figure>
      </main>
    </div>
  );
}
