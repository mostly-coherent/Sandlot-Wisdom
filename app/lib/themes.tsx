'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// Theme Configuration Interface
export interface ThemeConfig {
  id: 'sandlot' | 'peanuts';
  name: string;
  colors: {
    primary: string; // Header bg
    secondary: string; // Accent/Border
    background: string; // Main gradient start
    text: string;
    cardBg: string;
    cardBorder: string;
    buttonPrimary: string;
    buttonSecondary: string;
  };
  styles: {
    fontBody: string;
    fontHeader: string;
    borderRadius: string;
    shadow: string;
  };
  content: {
    title: string;
    subtitle: string;
    greetings: string[];
    mascotEmoji: string;
    mascotName: string;
    footerQuote: {
      text: string;
      author: string;
    };
    footerTagline: string;
    funFact: {
      title: string;
      text: string;
    };
  };
  commentary: {
    tie: string[];
    winningBig: (team: string) => string[];
    losingBig: (team: string, diff: number) => string[];
    winningClose: (team: string, diff: number) => string[];
    losingClose: (team: string, diff: number) => string[];
    inningStart: (inning: number, total: number) => string;
    gameEnd: (winner: string, diff: number) => string;
    startQuote: string[];
  };
}

// Default Theme: Sandlot Wisdom (Backyard Baseball)
export const sandlotTheme: ThemeConfig = {
  id: 'sandlot',
  name: 'Sandlot Wisdom',
  colors: {
    primary: 'bg-emerald-800', // Deep grass green
    secondary: 'border-amber-700', // Worn leather/dirt
    background: 'from-stone-100 to-amber-50', // Dusty, warm
    text: 'text-stone-800',
    cardBg: 'bg-orange-50', // Parchment-like
    cardBorder: 'border-stone-300',
    buttonPrimary: 'bg-emerald-700 hover:bg-emerald-800 text-white',
    buttonSecondary: 'bg-amber-700 hover:bg-amber-800 text-white',
  },
  styles: {
    fontBody: 'font-sans', // Could use a serif for nostalgia if available
    fontHeader: 'font-serif tracking-wide',
    borderRadius: 'rounded-sm', // Slightly rougher edges
    shadow: 'shadow-md',
  },
  content: {
    title: 'Sandlot Wisdom',
    subtitle: 'Where legends are made before the streetlights come on.',
    greetings: [
      "Welcome to the Sandlot!",
      "Grab your glove, the sun's still out!",
      "Ghost runners on first and second!",
      "Play ball! Call your own outs!",
      "Don't worry about the score, just play the game!"
    ],
    mascotEmoji: '🧢',
    mascotName: 'The Backyard Coach',
    footerQuote: {
      text: "You can't steal second base and keep your foot on first.",
      author: "Sandlot Wisdom"
    },
    footerTagline: "Life's a pitch. Swing hard.",
    funFact: {
      title: "Sandlot Rule #1",
      text: "If you hit it over the fence, you have to go get it. And watch out for the neighbor's dog!"
    }
  },
  commentary: {
    tie: [
      "It's a tie! Tighter than a new pair of cleats!",
      "All square! Next run wins... or until dinner time!",
      "Dead even! The tension is thick enough to cut with a bat!",
      "Neck and neck! Who's gonna be the neighborhood hero?",
      "Tied up! Time to dig deep and get your uniform dirty!"
    ],
    winningBig: (team) => [
      `${team} is crushing it! Like hitting a homer onto the roof!`,
      `${team} is on fire! The scouts are watching from behind the fence!`,
      `${team} is dominating! Pure sandlot magic!`,
      `Wow! ${team} is playing like the '27 Yankees!`,
      `${team} is unstoppable! That one's going into the history books!`
    ],
    losingBig: (team, diff) => [
      `${team} is down by ${diff}... but the game ain't over 'til the streetlights come on!`,
      `Down by ${diff}? Just means a bigger comeback story for the grandkids!`,
      `${team} needs a rally! Rally caps on backwards!`,
      `Tough inning for ${team}, but remember: even the pros strike out.`,
      `Losing by ${diff}? Dig in! Sandlot legends never quit!`
    ],
    winningClose: (team, diff) => [
      `${team} leads by ${diff}! Hold the line!`,
      `Narrow lead for ${team}! Stay focused!`,
      `${team} is ahead! Keep the pressure on!`,
      `Close game! ${team} is grinding it out in the dirt!`
    ],
    losingClose: (team, diff) => [
      `${team} is down by just ${diff}! One swing changes everything!`,
      `Only down by ${diff}? You got this!`,
      `Close game! ${team} is knocking on the door!`,
      `Rally caps on! ${team} can still take this!`
    ],
    inningStart: (inning, total) => {
      if (inning === 1) return "Play ball! Let's see what you got!";
      if (inning === total) return "Final inning! Leave it all on the field!";
      if (inning === Math.floor(total / 2)) return "Halfway point! Stretch it out!";
      return `Inning ${inning}! Keep hustling!`;
    },
    gameEnd: (winner, diff) => {
      if (diff === 0) return `It's a tie! A classic sandlot draw! Shake hands! 🤝`;
      if (diff >= 10) return `${winner} wins big! That one reached the parking lot! 🏆`;
      if (diff >= 5) return `${winner} takes it! Great hustle out there! 🎉`;
      return `${winner} wins a nail-biter! An instant classic! ⚾`;
    },
    startQuote: [
      "\"Every strike brings me closer to the next home run.\" - Babe Ruth",
      "\"It ain't over 'til it's over.\" - Yogi Berra",
      "\"Baseball is 90 percent mental. The other half is physical.\" - Yogi Berra",
      "\"You can't win unless you learn how to lose.\" - Kareem Abdul-Jabbar (applies here too!)",
      "\"Play hard, have fun, and don't break any windows.\""
    ]
  }
};

// Private Theme: Peanuts (Nutty Baseball)
export const peanutsTheme: ThemeConfig = {
  id: 'peanuts',
  name: 'Nutty Baseball',
  colors: {
    primary: 'bg-yellow-400 text-black', // Charlie Brown shirt yellow
    secondary: 'border-black', // Comic outlines
    background: 'from-sky-300 to-sky-100', // Cartoon sky
    text: 'text-black',
    cardBg: 'bg-white',
    cardBorder: 'border-black border-2', // Comic panel style
    buttonPrimary: 'bg-red-500 hover:bg-red-600 text-white border-2 border-black',
    buttonSecondary: 'bg-blue-500 hover:bg-blue-600 text-white border-2 border-black',
  },
  styles: {
    fontBody: 'font-comic-sans', // Or closest playful font
    fontHeader: 'font-comic-sans font-bold',
    borderRadius: 'rounded-xl', // Playful, bubbly
    shadow: 'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]', // Hard comic shadow
  },
  content: {
    title: 'Nutty Baseball',
    subtitle: 'Learn baseball with Charlie Brown & friends!',
    greetings: [
      "Good grief! Let's learn some baseball!",
      "You're a good man, Charlie Brown! Ready to play?",
      "Happiness is a warm baseball glove!",
      "It's not whether you win or lose... wait, yes it is!",
      "Let's play ball, blockhead!"
    ],
    mascotEmoji: '🥜',
    mascotName: 'Snoopy',
    footerQuote: {
      text: "\"In the book of life, the answers aren't in the back.\"",
      author: "Charlie Brown"
    },
    footerTagline: "But in baseball, you can always learn the rules!",
    funFact: {
      title: "Did You Know?",
      text: "In the Peanuts comic strip, Charlie Brown's baseball team never won a game in the entire 50-year run! But that didn't stop him from trying. That's the spirit of baseball - it's about having fun and never giving up!"
    }
  },
  commentary: {
    tie: [
      "It's a tie! Just like Charlie Brown's chances of winning... wait, that's not encouraging! 😅",
      "Tied up! This game is tighter than Linus's grip on his blanket! 🧸",
      "All square! Even Snoopy couldn't predict this one! 🐕",
      "Neck and neck! This is more suspenseful than waiting for the Great Pumpkin! 🎃",
      "Dead even! Lucy would charge 5 cents for advice on how to break this tie! 💰"
    ],
    winningBig: (team) => [
      `${team} is crushing it! Even Charlie Brown would be proud! 🎉`,
      `Wow! ${team} is on fire! Snoopy's doing his happy dance! 🕺`,
      `${team} is dominating! This is better than a kite that actually flies! 🪁`,
      `${team} might need Lucy's psychiatric help after this one! 😂`,
      `${team} is unstoppable! Good grief, what a performance! ⚾`
    ],
    losingBig: (team, diff) => [
      `${team} is down by ${diff}... but Charlie Brown lost 999 games in a row and never gave up! 💪`,
      `Oof! ${team} is really bringing it today. Time to channel your inner Peppermint Patty! 🏃`,
      `${team} is struggling, but remember: "In the book of life, the answers aren't in the back!" Keep playing! 📖`,
      `Down by ${diff}? That's nothing! Charlie Brown once got hit by a line drive and kept playing! 😅`,
      `Losing by ${diff}? Good grief! But hey, at least the kite isn't stuck in a tree! 🪁`
    ],
    winningClose: (team, diff) => [
      `${team} leads by ${diff}! Keep it up, blockhead! 😄`,
      `Narrow lead for ${team}! Don't pull a Charlie Brown and lose it now! ⚾`,
      `${team} is ahead! Snoopy approves! 🐕`,
      `Close game! ${team} is showing some Peppermint Patty energy! 💪`
    ],
    losingClose: (team, diff) => [
      `${team} is down by just ${diff}! Rally time! 📣`,
      `Only down by ${diff}? That's nothing! Time for a comeback! 💪`,
      `Close game! ${team} can still pull this off! 🎯`,
      `Close game! Don't give up!`
    ],
    inningStart: (inning, total) => {
      if (inning === 1) return "Play ball! Let's have some fun out there! ⚾";
      if (inning === total) return "Final inning! Give it everything you've got! 🔥";
      if (inning === Math.floor(total / 2)) return "Halfway there! Time for some Cracker Jack! 🥜";
      return `Inning ${inning}! Keep that baseball spirit alive! 💪`;
    },
    gameEnd: (winner, diff) => {
      if (diff === 0) return `It's a tie! Just like Charlie Brown's kite - stuck in the middle! Nobody wins, nobody loses! 🤝`;
      if (diff >= 10) return `${winner} wins big! That was a shellacking! Even Lucy would be impressed! 🏆`;
      if (diff >= 5) return `${winner} takes it! Great game! Snoopy's doing his victory dance! 🎉`;
      return `${winner} wins a nail-biter! What a game! Charlie Brown would be proud! ⚾`;
    },
    startQuote: [
      "\"I've developed a new philosophy... I only dread one day at a time.\" - Charlie Brown (But today, we PLAY! ⚾)",
      "\"Keep looking up... that's the secret of life!\" - Snoopy 🐕",
      "\"In the book of life, the answers aren't in the back.\" - Charlie Brown 📖",
      "\"Learn from yesterday, live for today, look to tomorrow, rest this afternoon.\" - Charlie Brown ☀️",
      "\"All you need is love. But a little chocolate now and then doesn't hurt.\" - Lucy (Or baseball! ⚾)"
    ]
  }
};

type ThemeContextType = {
  theme: ThemeConfig;
  setThemeId: (id: 'sandlot' | 'peanuts') => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeId, setThemeId] = useState<'sandlot' | 'peanuts'>('sandlot');
  const [theme, setTheme] = useState<ThemeConfig>(sandlotTheme);

  useEffect(() => {
    // Load persisted theme
    const savedTheme = localStorage.getItem('baseball-theme') as 'sandlot' | 'peanuts';
    if (savedTheme) {
      setThemeId(savedTheme);
    }
  }, []);

  useEffect(() => {
    const newTheme = themeId === 'peanuts' ? peanutsTheme : sandlotTheme;
    setTheme(newTheme);
    localStorage.setItem('baseball-theme', themeId);
    
    // Update CSS variables if needed, or just rely on the theme object
    document.documentElement.setAttribute('data-theme', themeId);
  }, [themeId]);

  const toggleTheme = () => {
    setThemeId(prev => prev === 'sandlot' ? 'peanuts' : 'sandlot');
  };

  return (
    <ThemeContext.Provider value={{ theme, setThemeId, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
