# Sandlot-Wisdom - AI Assistant Context

> **Purpose:** Technical context for AI coding assistants
> - Development commands and paths
> - Project structure and dependencies
> - Environment setup and troubleshooting
> - NOT for human readers (see README.md)

## 🚨 CRITICAL: GitHub Safety

**This project syncs to personal GitHub only.**

Git remote: Check with `git remote -v`
Git author: Check with `git config user.email`

**Vercel:** DO NOT push/deploy unless explicitly requested (git push = auto-deploy)

## Project Type
Next.js 16 App Router with TypeScript, Tailwind CSS 4, and local storage

*Follows root CLAUDE.md Core Web defaults. No AI/LLM or backend features—pure client-side app.*

## Key Commands

### Development
```bash
npm run dev          # Start dev server on http://localhost:3000
npm run build        # Production build
npm run lint         # Run ESLint
npm run start        # Start production server
```

### Deployment
```bash
vercel --prod
```

## Vercel Optimization
- **Static Generation:** All pages are statically pre-rendered
- **Image Optimization:** AVIF/WebP formats, responsive sizing
- **Security Headers:** X-Content-Type-Options, X-Frame-Options, X-XSS-Protection
- **SEO:** Full Open Graph + Twitter Card metadata
- **PWA:** Web manifest with installable app support
- **CSS Optimization:** Experimental optimizeCss enabled

### Required Assets (TODO: Create these)
- `/public/icon-192.png` - 192x192 app icon
- `/public/icon-512.png` - 512x512 app icon  
- `/public/apple-touch-icon.png` - 180x180 iOS icon
- `/public/og-image.png` - 1200x630 social preview

## Project Structure
- `/app` - Next.js App Router pages and layouts
- `/app/components` - React components
- `/app/lib` - Utility functions and data models
- `/app/styles` - Global styles
- `/public` - Static assets (images, icons)

## Tech Stack
*Follows root CLAUDE.md Core Web defaults:*

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** React hooks + Context API
- **Data Storage:** Browser localStorage/IndexedDB (no backend for MVP)
- **Deployment:** Vercel

## Environment Variables
No external API keys required for MVP. All data stored locally in browser.

## Development Notes
- Server runs on http://localhost:3000
- Data persists in browser localStorage (survives page refresh)
- No authentication/login required
- Responsive design for mobile, tablet, and desktop
- PWA-ready (can be installed on home screen)

## Feature Modules
- **Learn:** Interactive baseball lessons with difficulty levels
- **Play:** Game setup wizard and score tracker
- **Reference:** Quick rule lookups and diagrams
- **History:** Past game records and stats

## Data Models
- **Game:** id, date, teams, innings, scores, rules, status
- **LearningProgress:** completedLessons, currentLevel, achievements
- **User:** preferences, favoriteTeam, displayName

---

**Last Updated:** 2025-12-10 (Vercel optimization added)
