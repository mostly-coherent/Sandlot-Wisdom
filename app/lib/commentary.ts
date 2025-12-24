import { ThemeConfig } from './themes';

interface CommentaryContext {
  team1Score: number;
  team2Score: number;
  inning: number;
  team1Name: string;
  team2Name: string;
}

export const getCommentary = (context: CommentaryContext, theme: ThemeConfig): string => {
  const { team1Score, team2Score, inning, team1Name, team2Name } = context;
  const scoreDiff = Math.abs(team1Score - team2Score);
  const isWinning = team1Score > team2Score;
  const isTied = team1Score === team2Score;
  const isLosing = team1Score < team2Score;

  let comments: string[] = [];

  // Tied game
  if (isTied) {
    comments = theme.commentary.tie;
  }
  // Winning by a lot
  else if (isWinning && scoreDiff >= 5) {
    comments = theme.commentary.winningBig(team1Name);
  }
  // Losing by a lot (gentle teasing/encouragement)
  else if (isLosing && scoreDiff >= 5) {
    comments = theme.commentary.losingBig(team1Name, scoreDiff);
  }
  // Close game - winning
  else if (isWinning && scoreDiff <= 2) {
    comments = theme.commentary.winningClose(team1Name, scoreDiff);
  }
  // Close game - losing
  else if (isLosing && scoreDiff <= 2) {
    comments = theme.commentary.losingClose(team1Name, scoreDiff);
  }
  else {
    return `${team1Name}: ${team1Score}, ${team2Name}: ${team2Score}. Keep playing! ⚾`;
  }

  return comments[Math.floor(Math.random() * comments.length)];
};

export const getInningCommentary = (inning: number, totalInnings: number, theme: ThemeConfig): string => {
  return theme.commentary.inningStart(inning, totalInnings);
};

export const getGameEndCommentary = (winner: string, loser: string, finalScore: { winner: number, loser: number }, theme: ThemeConfig): string => {
  const scoreDiff = finalScore.winner - finalScore.loser;
  return theme.commentary.gameEnd(winner, scoreDiff);
};

export const getStartGameQuote = (theme: ThemeConfig): string => {
  const quotes = theme.commentary.startQuote;
  return quotes[Math.floor(Math.random() * quotes.length)];
};
