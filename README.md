# ⚾ Nutty Baseball

> *"Good grief! I need to learn baseball!"* — Every parent whose kid just joined Little League

**Your fun, Peanuts-themed companion for learning baseball alongside your kids.** Interactive lessons, game tracking, and Charlie Brown–approved commentary when you're losing to your 10-year-old in the backyard.

---

## 🚀 See It Running

### Option A: Auto-Generate Server Scripts (Recommended)

In Cursor Chat, type:

```
@Generate-server-scripts.md @nutty_baseball
```

This creates `start-servers.sh`, `stop-servers.sh`, and `check-servers.sh` for one-command startup.

### Option B: Manual Quick Start

```bash
npm install
npm run dev
```

Open **http://localhost:3000** in your browser.

**No API keys needed!** Everything runs locally in your browser.

---

## ✨ Features

### 📚 Learn Baseball
Interactive lessons from "What's an inning?" to "Actually, that was a balk":
- **Beginner** — Positions, scoring, how not to embarrass yourself
- **Intermediate** — Little League rules and umpire signals
- **Advanced** — MLB strategy and stats

### ⚾ Game Tracker
Track backyard or Little League games with flexible rules:
- **Backyard Mode** — Simplified rules for casual play
- **Little League Mode** — Official youth baseball rules
- **MLB Mode** — Full professional rules
- Inning-by-inning scoring and game history

### 💬 Peanuts Commentary
Real-time encouragement and gentle ribbing:
- *"You're down by 5? Good grief! But Charlie Brown lost 999 games and never gave up!"*
- *"Tied game! More suspenseful than waiting for the Great Pumpkin!"*

### 📖 Quick Reference
Searchable rules for instant answers at the game:
- Position diagrams and strategy tips
- "What happens on a foul ball?"
- "What's the infield fly rule?"

## 🎮 How to Use

1. **New to Baseball?** → Start with **Learn** section
2. **Ready to Play?** → Head to **Play** for game tracking
3. **At a Game?** → Use **Reference** for quick rule lookups
4. **Track Progress** → Check **History** for past games

## 🎨 What Makes This Special

- **No login required** — Everything stored locally in your browser
- **Works offline** — Perfect for the ballpark or backyard
- **Peanuts theme** — Learning shouldn't feel like homework
- **Parent-friendly** — Built by a parent learning alongside their kid

---

## 💭 What I Learned

My son's love for Peanuts comics inspired him to explore baseball, so the Peanuts theme wasn't just decoration—it reframed "I don't know baseball" from embarrassing to endearing. Adults relax when the UI winks at their confusion. Built with zero backend—local storage only—for zero friction.

## 🔮 What's Next

Working on **ambient listening for backyard games**—automatically tracking scores by listening to our natural conversation. Same audio recognition complexity as Allegro, but now filtering signal from noise in real-time.

---

**Status:** Active Development  
**Stack:** Next.js 15 · TypeScript · Tailwind · Local Storage (no backend)

See `CLAUDE.md` for detailed technical setup and development commands.
