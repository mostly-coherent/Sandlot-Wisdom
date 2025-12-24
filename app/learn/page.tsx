'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useTheme } from '../lib/themes';

type Difficulty = 'beginner' | 'intermediate' | 'advanced';

interface Lesson {
  id: string;
  title: string;
  difficulty: Difficulty;
  emoji: string;
  description: string;
  content: string[];
}

const lessons: Lesson[] = [
  {
    id: 'basics',
    title: 'Baseball Basics',
    difficulty: 'beginner',
    emoji: '⚾',
    description: 'Learn the fundamental rules and how the game works',
    content: [
      '**The Goal:** Score more runs than the other team by hitting the ball and running around 4 bases.',
      '**Teams:** Two teams take turns batting (offense) and fielding (defense).',
      '**Innings:** A game has 9 innings. Each inning, both teams get a turn to bat.',
      '**Outs:** The batting team gets 3 outs per inning. After 3 outs, teams switch.',
      '**Runs:** A run scores when a player touches all 4 bases (1st, 2nd, 3rd, Home) in order.',
      '**Strikes & Balls:** 3 strikes = out. 4 balls = walk to first base.',
      '**Fair vs Foul:** The ball must land in fair territory (between the white lines) to be in play.'
    ]
  },
  {
    id: 'positions',
    title: 'Field Positions',
    difficulty: 'beginner',
    emoji: '🧢',
    description: 'Who plays where and what they do',
    content: [
      '**Pitcher (P):** Throws the ball to the batter. The most important defensive position.',
      '**Catcher (C):** Catches pitches behind home plate. Calls the game and prevents stolen bases.',
      '**First Base (1B):** Catches throws from other fielders to get runners out at first.',
      '**Second Base (2B):** Covers the area between 1st and 2nd base.',
      '**Shortstop (SS):** Plays between 2nd and 3rd base. Often the best fielder.',
      '**Third Base (3B):** Guards third base, needs quick reflexes for hard-hit balls.',
      '**Left Field (LF), Center Field (CF), Right Field (RF):** Catch fly balls and prevent extra-base hits.',
      '**Little League Tip:** In youth baseball, every position matters! Encourage your son to try different spots.'
    ]
  },
  {
    id: 'scoring',
    title: 'How Scoring Works',
    difficulty: 'beginner',
    emoji: '📊',
    description: 'Understanding runs, hits, and errors',
    content: [
      '**Run (R):** Scored when a player touches home plate safely.',
      '**Hit (H):** When the batter safely reaches base by hitting the ball.',
      '**Single:** Batter reaches 1st base.',
      '**Double:** Batter reaches 2nd base.',
      '**Triple:** Batter reaches 3rd base.',
      '**Home Run:** Batter hits the ball out of the park and scores automatically!',
      '**RBI (Run Batted In):** Credit given to the batter who hit the ball that allowed a run to score.',
      '**Error:** When a fielder makes a mistake that allows a runner to reach base or advance.'
    ]
  },
  {
    id: 'little-league',
    title: 'Little League Rules',
    difficulty: 'intermediate',
    emoji: '🏆',
    description: 'Special rules for youth baseball',
    content: [
      '**Game Length:** Usually 6 innings (not 9 like MLB).',
      '**Pitch Count:** Strict limits on how many pitches a player can throw to protect young arms.',
      '**Batting Order:** All players bat, even if they don\'t play in the field.',
      '**Mercy Rule:** Game ends early if one team is ahead by 10+ runs after 4 innings.',
      '**Base Running:** Runners can\'t lead off until the ball crosses home plate.',
      '**Equipment:** Batting helmets are mandatory. Some leagues require face guards.',
      '**Participation:** Most leagues ensure every player gets to play at least 2 innings.',
      '**Parent Tip:** Focus on fun and learning, not winning. Your encouragement matters more than the score!'
    ]
  },
  {
    id: 'umpire-calls',
    title: 'Common Umpire Calls',
    difficulty: 'intermediate',
    emoji: '👨‍⚖️',
    description: 'What those hand signals mean',
    content: [
      '**Strike:** Umpire raises right hand with fist. Called when pitch is in strike zone or batter swings and misses.',
      '**Ball:** No signal, just verbal call. Pitch outside strike zone that batter doesn\'t swing at.',
      '**Out:** Umpire makes a fist and pumps arm. Runner or batter is out.',
      '**Safe:** Umpire spreads arms horizontally. Runner reaches base safely.',
      '**Fair Ball:** Umpire points toward fair territory.',
      '**Foul Ball:** Umpire raises hands and calls "Foul!"',
      '**Time Out:** Umpire raises both hands. Play is stopped.',
      '**Infield Fly:** Umpire points up. Special rule to prevent double plays on pop-ups with runners on base.'
    ]
  },
  {
    id: 'strategy',
    title: 'Basic Strategy',
    difficulty: 'intermediate',
    emoji: '🧠',
    description: 'Understanding game situations',
    content: [
      '**Count Matters:** 3-0 count (3 balls, 0 strikes) = pitcher must throw a strike. Good time to swing!',
      '**0-2 Count:** Batter is in trouble. Protect the plate and don\'t strike out looking.',
      '**Sacrifice Bunt:** Batter intentionally gets out to move a runner forward.',
      '**Stolen Base:** Runner tries to advance while pitcher is throwing.',
      '**Double Play:** Defense gets 2 outs on one play (usually 2B to SS to 1B).',
      '**Situational Hitting:** With runner on 3rd and less than 2 outs, just need to hit the ball to score.',
      '**Defensive Shifts:** Fielders position based on where batter usually hits.',
      '**Watching Tip:** Notice how teams adjust strategy based on the score and inning!'
    ]
  },
  {
    id: 'mlb-rules',
    title: 'MLB Advanced Rules',
    difficulty: 'advanced',
    emoji: '⚡',
    description: 'Rules for watching professional games',
    content: [
      '**Designated Hitter (DH):** In American League, a player bats for the pitcher (National League pitchers bat).',
      '**Balks:** Illegal motion by pitcher that advances all runners one base.',
      '**Interference:** When a player illegally impedes another player (catcher interference, fan interference, etc.).',
      '**Check Swing:** If batter starts to swing but stops, umpire decides if it counts as a strike.',
      '**Infield Fly Rule:** With runners on 1st & 2nd (or bases loaded) and less than 2 outs, pop-up in infield is automatic out.',
      '**Appeal Plays:** Defense can appeal if runner missed a base or left early on a fly ball.',
      '**Extra Innings:** If tied after 9 innings, play continues until one team leads after a complete inning.',
      '**Pitch Clock (New 2023):** Pitchers have 15-20 seconds to throw, keeps game moving faster.'
    ]
  },
  {
    id: 'stats',
    title: 'Understanding Stats',
    difficulty: 'advanced',
    emoji: '📈',
    description: 'What those numbers mean',
    content: [
      '**Batting Average (AVG):** Hits divided by at-bats. .300 is excellent, .250 is average.',
      '**On-Base Percentage (OBP):** How often a player reaches base (includes walks). More important than AVG!',
      '**Slugging Percentage (SLG):** Measures power. Total bases divided by at-bats.',
      '**OPS:** OBP + SLG. Quick way to measure overall offensive value. .800+ is very good.',
      '**ERA (Earned Run Average):** For pitchers. Average runs allowed per 9 innings. Under 3.00 is excellent.',
      '**WHIP:** Walks + Hits per Inning Pitched. Lower is better. Under 1.00 is elite.',
      '**WAR (Wins Above Replacement):** Advanced stat measuring total player value. 5+ WAR = All-Star level.',
      '**Watching Tip:** Don\'t get overwhelmed by stats. Focus on AVG, OBP, and ERA to start!'
    ]
  }
];

export default function LearnPage() {
  const { theme } = useTheme();
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'all'>('all');
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());

  // Load completed lessons from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sandlot-wisdom-completed-lessons');
      if (saved) {
        try {
          setCompletedLessons(new Set(JSON.parse(saved)));
        } catch {
          console.error('Failed to parse completed lessons from localStorage');
        }
      }
    }
  }, []);

  const filteredLessons = selectedDifficulty === 'all' 
    ? lessons 
    : lessons.filter(l => l.difficulty === selectedDifficulty);

  const handleCompleteLesson = (lessonId: string) => {
    const updated = new Set([...completedLessons, lessonId]);
    setCompletedLessons(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('sandlot-wisdom-completed-lessons', JSON.stringify([...updated]));
    }
  };

  const getDifficultyColor = (difficulty: Difficulty) => {
    switch(difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 border-green-300';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'advanced': return 'bg-red-100 text-red-800 border-red-300';
    }
  };

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
              <span aria-hidden="true">📚</span> Learn Baseball
            </h1>
            <div className="w-24" aria-hidden="true"></div>
          </div>
        </div>
      </header>

      <main id="main-content" className="container mx-auto px-4 py-8" tabIndex={-1}>
        {!selectedLesson ? (
          <>
            {/* Difficulty Filter */}
            <section aria-labelledby="difficulty-heading" className={`${theme.colors.cardBg} backdrop-blur-sm rounded-lg shadow-lg p-6 mb-8 border-2 ${theme.colors.cardBorder}`}>
              <h2 id="difficulty-heading" className={`text-xl font-bold mb-4 opacity-90 ${theme.styles.fontHeader}`}>Choose Your Level:</h2>
              <div className="flex flex-wrap gap-3" role="group" aria-label="Filter by difficulty level">
                <button
                  onClick={() => setSelectedDifficulty('all')}
                  aria-pressed={selectedDifficulty === 'all'}
                  className={`px-6 py-3 rounded-lg font-bold transition-all border-2 border-transparent ${
                    selectedDifficulty === 'all' 
                      ? `${theme.colors.buttonPrimary} shadow-lg scale-105` 
                      : 'bg-white/50 hover:bg-white/80'
                  }`}
                >
                  All Lessons
                </button>
                <button
                  onClick={() => setSelectedDifficulty('beginner')}
                  aria-pressed={selectedDifficulty === 'beginner'}
                  className={`px-6 py-3 rounded-lg font-bold transition-all border-2 ${
                    selectedDifficulty === 'beginner' 
                      ? 'bg-green-500 text-white border-green-600 shadow-lg scale-105' 
                      : 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100'
                  }`}
                >
                  <span aria-hidden="true">🌱</span> Beginner
                </button>
                <button
                  onClick={() => setSelectedDifficulty('intermediate')}
                  aria-pressed={selectedDifficulty === 'intermediate'}
                  className={`px-6 py-3 rounded-lg font-bold transition-all border-2 ${
                    selectedDifficulty === 'intermediate' 
                      ? 'bg-yellow-500 text-white border-yellow-600 shadow-lg scale-105' 
                      : 'bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100'
                  }`}
                >
                  <span aria-hidden="true">⭐</span> Intermediate
                </button>
                <button
                  onClick={() => setSelectedDifficulty('advanced')}
                  aria-pressed={selectedDifficulty === 'advanced'}
                  className={`px-6 py-3 rounded-lg font-bold transition-all border-2 ${
                    selectedDifficulty === 'advanced' 
                      ? 'bg-red-500 text-white border-red-600 shadow-lg scale-105' 
                      : 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'
                  }`}
                >
                  <span aria-hidden="true">🔥</span> Advanced
                </button>
              </div>
            </section>

            {/* Progress */}
            <div 
              className={`bg-white/80 rounded-lg p-6 mb-8 border-l-8 ${theme.colors.secondary} shadow-md`}
              role="status"
              aria-live="polite"
            >
              <p className="text-xl font-medium">
                <strong>Progress:</strong> {completedLessons.size} of {lessons.length} lessons completed
                {completedLessons.size === lessons.length && (
                  <span className="ml-2 block mt-2 text-emerald-700"> <span aria-hidden="true">🎉</span> You're a baseball expert!</span>
                )}
              </p>
            </div>

            {/* Lessons Grid */}
            <section aria-label="Available lessons">
              <h2 className="sr-only">Lessons</h2>
              <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 list-none">
                {filteredLessons.map(lesson => (
                  <li key={lesson.id}>
                    <button
                      onClick={() => setSelectedLesson(lesson)}
                      className={`w-full ${theme.colors.cardBg} backdrop-blur-sm rounded-lg p-6 hover:shadow-xl transition-all transform hover:-translate-y-1 text-left border-2 ${theme.colors.cardBorder} h-full flex flex-col`}
                      aria-label={`${lesson.title} - ${lesson.difficulty} level${completedLessons.has(lesson.id) ? ', completed' : ''}`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <span className="text-5xl filter drop-shadow-md" aria-hidden="true">{lesson.emoji}</span>
                        {completedLessons.has(lesson.id) && (
                          <span className="text-3xl text-emerald-600" aria-hidden="true">✅</span>
                        )}
                      </div>
                      <h3 className={`text-2xl font-bold mb-3 ${theme.styles.fontHeader}`}>{lesson.title}</h3>
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold mb-4 border uppercase tracking-wider ${getDifficultyColor(lesson.difficulty)}`}>
                        {lesson.difficulty}
                      </span>
                      <p className="text-lg opacity-80 leading-relaxed">{lesson.description}</p>
                    </button>
                  </li>
                ))}
              </ul>
            </section>

            {/* Theme Quote */}
            <figure className={`mt-12 ${theme.colors.cardBg} rounded-lg p-8 text-center border-2 ${theme.colors.cardBorder} max-w-2xl mx-auto transform rotate-1`}>
              <blockquote className={`text-2xl italic mb-4 opacity-90 ${theme.styles.fontHeader}`}>
                "{theme.content.footerQuote.text}"
              </blockquote>
              <figcaption className="text-lg font-bold opacity-70">
                — {theme.content.footerQuote.author}
              </figcaption>
            </figure>
          </>
        ) : (
          /* Lesson Detail View */
          <article className={`${theme.colors.cardBg} backdrop-blur-sm rounded-lg p-8 max-w-3xl mx-auto border-2 ${theme.colors.cardBorder} shadow-2xl`}>
            <button
              onClick={() => setSelectedLesson(null)}
              className="text-blue-700 hover:text-blue-900 font-bold mb-6 flex items-center gap-2 text-lg group"
              aria-label="Back to all lessons"
            >
              <span aria-hidden="true" className="group-hover:-translate-x-1 transition-transform">←</span> Back to Lessons
            </button>

            <header className="flex items-center gap-6 mb-8 pb-8 border-b-2 border-current/10">
              <span className="text-7xl filter drop-shadow-lg" aria-hidden="true">{selectedLesson.emoji}</span>
              <div>
                <h2 className={`text-4xl font-bold mb-2 ${theme.styles.fontHeader}`}>{selectedLesson.title}</h2>
                <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold border uppercase tracking-wider ${getDifficultyColor(selectedLesson.difficulty)}`}>
                  {selectedLesson.difficulty}
                </span>
              </div>
            </header>

            <div className="prose prose-lg max-w-none">
              {selectedLesson.content.map((paragraph, index) => {
                const parts = paragraph.split('**');
                return (
                  <p key={index} className="mb-6 text-xl leading-relaxed opacity-90">
                    {parts.map((part, i) => 
                      i % 2 === 1 ? <strong key={i} className="text-current font-bold bg-white/50 px-1 rounded">{part}</strong> : part
                    )}
                  </p>
                );
              })}
            </div>

            <div className="mt-12 pt-8 border-t-2 border-current/10">
              <button
                onClick={() => {
                  handleCompleteLesson(selectedLesson.id);
                  setSelectedLesson(null);
                }}
                className={`w-full ${theme.colors.buttonPrimary} font-bold py-5 px-8 rounded-lg text-2xl transition-all transform hover:scale-[1.02] shadow-xl flex items-center justify-center gap-3`}
                aria-label={completedLessons.has(selectedLesson.id) ? 'Lesson already completed, return to lessons' : 'Mark lesson as complete and return to lessons'}
              >
                {completedLessons.has(selectedLesson.id) ? (
                  <><span aria-hidden="true">✅</span> Completed!</>
                ) : (
                  <><span aria-hidden="true">✓</span> Mark as Complete</>
                )}
              </button>
            </div>
          </article>
        )}
      </main>
    </div>
  );
}
