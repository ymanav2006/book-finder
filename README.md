# BookVerse

BookVerse is a premium, responsive book discovery experience: a personal AI librarian that helps readers find books by title, plot, mood, theme, memory, and reading intention.

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Included experience

- Universal natural-language search with filters and typo suggestions
- Personalized discovery feed, mood selector, world map, and reading paths
- AI Book Finder with preference-based recommendations and explanations
- Quote and “I forgot the book” memory search
- Book detail pages with spoiler-free mode, Book DNA, journey, themes, and similar books
- Two-to-four book comparison tray and side-by-side strengths view
- Local guest library, reading queue, goals, streaks, collections, and profile preferences
- Light/dark themes, keyboard search shortcut (`/`), reduced motion, and responsive mobile navigation
- Saved state persists locally in the browser for the guest experience

## Data and API integration

The guest experience is powered by the verified editorial sample catalog in `src/data/books.js`. The UI keeps metadata and recommendation signals explicit, avoids invented availability and prices, and labels fields that are not yet verified. A production adapter can be added behind the existing `books` data boundary with a server-side book metadata provider, full-text search index, and a server-only AI endpoint. Never put provider keys in the browser; use environment variables in the server/API layer.

## Suggested production services

- Open Library / trusted library catalogs for editions and availability
- PostgreSQL for users, books, authors, genres, series, reviews, collections, progress, goals, clubs, and recommendations
- A secure authentication provider for email, Google, and guest upgrade flows
- A server-side AI service for natural-language discovery and concise transformative summaries
