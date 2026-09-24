import { useEffect, useMemo, useRef, useState } from 'react'
import {
  Accessibility,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Bookmark,
  BookmarkCheck,
  BookHeart,
  BookOpen,
  BookOpenCheck,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Clock3,
  Command,
  Compass,
  Cpu,
  Download,
  ExternalLink,
  Flame,
  Globe2,
  Grid2X2,
  Heart,
  Info,
  Layers3,
  Library,
  Lightbulb,
  List,
  ListFilter,
  LockKeyhole,
  LogIn,
  Map,
  MapPin,
  Menu,
  MessageCircle,
  Moon,
  MoreHorizontal,
  Palette,
  Pause,
  Play,
  Plus,
  Quote,
  RefreshCw,
  RotateCcw,
  Search,
  SearchX,
  Send,
  Settings2,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Sparkle,
  Star,
  Sun,
  Target,
  Trophy,
  Type,
  UserRound,
  Users,
  WandSparkles,
  X,
  Zap,
} from 'lucide-react'
import { books as baseBooks, zones } from './data/books.js'

/*
 * BookVerse keeps the editorial metadata in the data layer and the discovery
 * experience in the UI. Replace the local catalog with a server/API adapter
 * when a verified provider is available; no credentials are needed for the
 * guest experience.
 */
const extraBooks = [
  {
    id: 'harry-potter-1',
    title: "Harry Potter and the Sorcerer's Stone",
    author: 'J.K. Rowling',
    year: 1997,
    zone: 'mind',
    genre: 'Fantasy',
    pages: 223,
    minutes: 420,
    rating: 4.7,
    origin: 'United Kingdom',
    language: 'English',
    pace: 'Expansive & immersive',
    level: 'Beginner',
    tags: ['magic', 'school', 'friendship', 'coming-of-age', 'wonder'],
    moods: ['Magical', 'Cozy', 'Exciting'],
    cover: { background: '#1f2d70', ink: '#f8d889', accent: '#ed725d', pattern: 'moon' },
    description: 'A young student discovers a hidden world of magic, friendship, and courage in the first chapter of a beloved fantasy series.',
    keyIdeas: ['Courage is often choosing to act before you feel ready.', 'Belonging can be found in unexpected places.', 'A small choice can change the shape of a story.'],
    prompt: 'What would you do if the ordinary world suddenly opened a door?',
    why: 'You are looking for a door you can walk through: inventive, warm, and full of wonder without losing the emotional stakes.',
    match: 96,
  },
  {
    id: 'tomorrow-tomorrow',
    title: 'Tomorrow, and Tomorrow, and Tomorrow',
    author: 'Gabrielle Zevin',
    year: 2022,
    zone: 'society',
    genre: 'Contemporary Fiction',
    pages: 401,
    minutes: 450,
    rating: 4.3,
    origin: 'United States',
    language: 'English',
    pace: 'Lyrical & character-led',
    level: 'Intermediate',
    tags: ['friendship', 'art', 'games', 'ambition', 'creative lives'],
    moods: ['Emotional', 'Thought-provoking', 'Romantic'],
    cover: { background: '#d4a5c7', ink: '#34213b', accent: '#f1e578', pattern: 'grid' },
    description: 'Two friends, a shared creative dream, and decades of collaboration unfold through the games they make and the lives they build around them.',
    keyIdeas: ['Creativity is a way of staying in conversation with another person.', 'A life can contain many kinds of success.', 'Friendship changes shape as people change.'],
    prompt: 'Which project made you feel most like yourself?',
    why: 'The story follows your interest in character-rich fiction with a tender, complicated relationship at its center.',
    match: 91,
  },
  {
    id: 'project-hail-mary',
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    year: 2021,
    zone: 'future',
    genre: 'Science Fiction',
    pages: 496,
    minutes: 500,
    rating: 4.8,
    origin: 'United States',
    language: 'English',
    pace: 'Propulsive & accessible',
    level: 'Beginner',
    tags: ['space', 'science', 'survival', 'friendship', 'problem-solving'],
    moods: ['Exciting', 'Curious', 'Cozy'],
    cover: { background: '#18333a', ink: '#eff6dc', accent: '#ed9d54', pattern: 'signal' },
    description: 'A lone astronaut must solve an impossible survival problem while rebuilding his understanding of science, duty, and connection.',
    keyIdeas: ['Curiosity is a practical survival skill.', 'The best solutions are often collaborative.', 'A clear problem can be more exciting than a perfect answer.'],
    prompt: 'Which question would you happily spend a year solving?',
    why: 'It gives you a smart, propulsive escape hatch with a beginner-friendly science spine and a surprisingly tender center.',
    match: 89,
  },
  {
    id: 'piranesi',
    title: 'Piranesi',
    author: 'Susanna Clarke',
    year: 2020,
    zone: 'arts',
    genre: 'Magical Fiction',
    pages: 272,
    minutes: 260,
    rating: 4.5,
    origin: 'United Kingdom',
    language: 'English',
    pace: 'Dreamlike & contemplative',
    level: 'Intermediate',
    tags: ['wonder', 'memory', 'mystery', 'solitude', 'imagination'],
    moods: ['Magical', 'Mysterious', 'Calm'],
    cover: { background: '#9ec5be', ink: '#173c47', accent: '#f5d477', pattern: 'portal' },
    description: 'A luminous, dreamlike mystery unfolds inside an infinite house where a solitary journal is slowly rewriting the world.',
    keyIdeas: ['Attention can turn an ordinary place into a world.', 'Memory shapes what we are able to notice.', 'A quiet story can contain enormous stakes.'],
    prompt: 'When did a familiar place suddenly feel like a completely different world?',
    why: 'You are drawn to atmosphere, mystery, and books that leave a little room for wonder after the last page.',
    match: 87,
  },
  {
    id: 'seven-husbands',
    title: 'The Seven Husbands of Evelyn Hugo',
    author: 'Taylor Jenkins Reid',
    year: 2017,
    zone: 'society',
    genre: 'Historical Fiction',
    pages: 400,
    minutes: 410,
    rating: 4.3,
    origin: 'United States',
    language: 'English',
    pace: 'Lush & propulsive',
    level: 'Easy',
    tags: ['romance', 'hollywood', 'secrets', 'ambition', 'second chances'],
    moods: ['Romantic', 'Emotional', 'Dramatic'],
    cover: { background: '#4d1831', ink: '#f1d3ae', accent: '#d88c56', pattern: 'floral' },
    description: 'An aging Hollywood icon finally tells the story behind the seven marriages that made her—and the love she could not forget.',
    keyIdeas: ['A public image is only one version of a life.', 'Love and ambition can refuse to stay in separate boxes.', 'Being seen is not the same as being known.'],
    prompt: 'Which version of yourself feels most visible to strangers?',
    why: 'It brings a strong emotional engine and a satisfying, page-turning shape to your taste for character-driven stories.',
    match: 84,
  },
  {
    id: 'thursday-murder-club',
    title: 'The Thursday Murder Club',
    author: 'Richard Osman',
    year: 2020,
    zone: 'society',
    genre: 'Mystery',
    pages: 382,
    minutes: 380,
    rating: 4.3,
    origin: 'United Kingdom',
    language: 'English',
    pace: 'Clever & cozy',
    level: 'Easy',
    tags: ['mystery', 'detective', 'friendship', 'cozy', 'small town'],
    moods: ['Mysterious', 'Cozy', 'Funny'],
    cover: { background: '#c9694f', ink: '#fff0d2', accent: '#6e9f94', pattern: 'circle' },
    description: 'Four friends meet over tea, cake, and a cold case—and find themselves investigating a very real murder in their peaceful village.',
    keyIdeas: ['A familiar community can hide complicated truths.', 'Observation is a team sport.', 'A mystery can be fun without losing its heart.'],
    prompt: 'What is the most reassuring place in your imagined future?',
    why: 'This one fits your desire for a mystery with a gentle pace, a warm ensemble cast, and no grimness for grimness’ sake.',
    match: 93,
  },
  {
    id: 'klara-sun',
    title: 'Klara and the Sun',
    author: 'Kazuo Ishiguro',
    year: 2021,
    zone: 'future',
    genre: 'Literary Science Fiction',
    pages: 303,
    minutes: 300,
    rating: 4.1,
    origin: 'United Kingdom',
    language: 'English',
    pace: 'Quiet & uncanny',
    level: 'Intermediate',
    tags: ['artificial intelligence', 'observation', 'love', 'future', 'belief'],
    moods: ['Thought-provoking', 'Emotional', 'Magical'],
    cover: { background: '#e4b83d', ink: '#263b50', accent: '#ef694b', pattern: 'sun' },
    description: 'Klara watches the world from a shop window and tries to understand love, loneliness, and what it means to hope for the people who choose her.',
    keyIdeas: ['A limited perspective can reveal a whole moral world.', 'Attention can be an expression of care.', 'The future is shaped by what we value in the present.'],
    prompt: 'What does it mean to be understood without being fully known?',
    why: 'It pairs a thought-provoking idea with a quiet, beautiful voice if you want fiction that lingers after reading.',
    match: 82,
  },
  {
    id: 'atomic-habits',
    title: 'Atomic Habits',
    author: 'James Clear',
    year: 2018,
    zone: 'practice',
    genre: 'Personal Growth',
    pages: 320,
    minutes: 310,
    rating: 4.5,
    origin: 'United States',
    language: 'English',
    pace: 'Practical & encouraging',
    level: 'Beginner',
    tags: ['habits', 'focus', 'systems', 'self-improvement', 'motivation'],
    moods: ['Inspirational', 'Motivational', 'Calm'],
    cover: { background: '#d8e85a', ink: '#20302a', accent: '#ed684e', pattern: 'loop' },
    description: 'A practical argument for making tiny improvements repeatedly, and for designing a life where good habits become easier to keep.',
    keyIdeas: ['Small changes compound when they are repeated.', 'Systems are more reliable than willpower.', 'Environment shapes behavior as much as intention.'],
    prompt: 'What would become easier if you changed one thing about your environment?',
    why: 'You are ready for a useful, encouraging reset with concrete ideas you can try this week.',
    match: 86,
  },
  {
    id: 'educated',
    title: 'Educated',
    author: 'Tara Westover',
    year: 2018,
    zone: 'mind',
    genre: 'Memoir',
    pages: 334,
    minutes: 390,
    rating: 4.5,
    origin: 'United States',
    language: 'English',
    pace: 'Reflective & candid',
    level: 'Intermediate',
    tags: ['memoir', 'education', 'family', 'identity', 'belonging'],
    moods: ['Emotional', 'Thought-provoking', 'Inspirational'],
    cover: { background: '#b6c9d6', ink: '#25364e', accent: '#e47c55', pattern: 'mountain' },
    description: 'A memoir about leaving a survivalist family for an education, and the cost and possibility of rewriting the story that shaped you.',
    keyIdeas: ['Education can be both liberation and a new kind of distance.', 'Memory is shaped by survival as well as fact.', 'Becoming yourself can involve leaving familiar versions of home.'],
    prompt: 'What belief about you has changed the most?',
    why: 'It matches your interest in honest, inward-looking nonfiction that leaves you with a larger question instead of a tidy answer.',
    match: 81,
  },
  {
    id: 'little-life',
    title: 'A Little Life',
    author: 'Hanya Yanagihara',
    year: 2015,
    zone: 'mind',
    genre: 'Literary Fiction',
    pages: 720,
    minutes: 760,
    rating: 4.2,
    origin: 'United States',
    language: 'English',
    pace: 'Intense & immersive',
    level: 'Advanced',
    tags: ['friendship', 'trauma', 'ambition', 'city', 'relationships'],
    moods: ['Emotional', 'Dramatic', 'Thought-provoking'],
    cover: { background: '#293b65', ink: '#f0d9b3', accent: '#df5e63', pattern: 'rain' },
    description: 'Four college friends move through ambition, love, and pain in New York, building a story that is intimate, difficult, and unforgettable.',
    keyIdeas: ['Friendship can hold more than one kind of truth.', 'Intensity is not the same as meaning.', 'Some stories ask us to sit with discomfort.'],
    prompt: 'What is the difference between a story that entertains you and one that changes you?',
    why: 'This is a deep, demanding pick for readers who want character complexity and an immersive emotional experience.',
    match: 78,
  },
]

const allBooks = [...baseBooks, ...extraBooks]
const zoneById = Object.fromEntries(zones.map((zone) => [zone.id, zone]))

const genres = [
  { name: 'Mystery', icon: '◉', color: '#d87859', sub: 'Clues · crime · intrigue' },
  { name: 'Romance', icon: '♡', color: '#d87891', sub: 'Love · longing · connection' },
  { name: 'Fantasy', icon: '✦', color: '#7166b6', sub: 'Magic · wonder · myth' },
  { name: 'Science Fiction', icon: '◌', color: '#4982b9', sub: 'Futures · ideas · worlds' },
  { name: 'Historical Fiction', icon: '⌁', color: '#ae7b3f', sub: 'Past lives · other eras' },
  { name: 'Memoir', icon: '✎', color: '#56836b', sub: 'True lives · lived worlds' },
  { name: 'Self Growth', icon: '↗', color: '#c18b31', sub: 'Habits · meaning · work' },
  { name: 'Thriller', icon: 'ϟ', color: '#62677c', sub: 'Tension · chase · risk' },
]

const moodOptions = [
  { label: 'Curious', emoji: '✦', color: '#c7a85a' },
  { label: 'Cozy', emoji: '☕', color: '#bf8a63' },
  { label: 'Inspired', emoji: '✦', color: '#d78b68' },
  { label: 'Escaped', emoji: '☾', color: '#7a76ad' },
  { label: 'Moved', emoji: '♡', color: '#c67889' },
  { label: 'Unsettled', emoji: 'ϟ', color: '#66718a' },
  { label: 'Mysterious', emoji: '◉', color: '#5b7e91' },
  { label: 'Dreamlike', emoji: '✧', color: '#7b9b93' },
  { label: 'Romantic', emoji: '♡', color: '#c66b8c' },
  { label: 'Magical', emoji: '✦', color: '#786db1' },
  { label: 'Funny', emoji: '☺', color: '#b79542' },
  { label: 'Calm', emoji: '≈', color: '#6c9b8a' },
]

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'discover', label: 'Discover' },
  { id: 'search', label: 'Search' },
  { id: 'library', label: 'My Library' },
]

const defaultReading = {
  reading: ['project-hail-mary'],
  want: ['piranesi', 'harry-potter-1'],
  finished: ['atomic-habits', 'educated'],
  abandoned: [],
}

const defaultCollections = [
  { id: 'slow', name: 'Slow mornings', count: 4, color: '#dba56c', icon: '☕' },
  { id: 'mystery', name: 'Small-town mysteries', count: 7, color: '#8c9ac1', icon: '◉' },
  { id: 'future', name: 'The near future', count: 5, color: '#a28ebc', icon: '✦' },
  { id: '2027', name: 'Books for 2027', count: 12, color: '#88a58c', icon: '↗' },
]

const searchStopWords = new Set(['about', 'after', 'again', 'and', 'book', 'books', 'but', 'find', 'for', 'from', 'have', 'like', 'something', 'that', 'the', 'this', 'want', 'with', 'you'])

function readStorage(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key))
    return value ?? fallback
  } catch {
    return fallback
  }
}

function getBookGenre(book) {
  if (book.genre) return book.genre
  if (book.tags.some((tag) => /mystery|crime|detective/.test(tag))) return 'Mystery'
  if (book.tags.some((tag) => /art|visual|design/.test(tag))) return 'Arts & Design'
  if (book.tags.some((tag) => /science|physics|evolution|space|technology/.test(tag))) return 'Science Fiction'
  if (book.tags.some((tag) => /history|ancient|world war/.test(tag))) return 'Historical Fiction'
  if (book.tags.some((tag) => /growth|leadership|business|product/.test(tag))) return 'Self Growth'
  return zoneById[book.zone]?.name || 'Literary Fiction'
}

function getBookDifficulty(book) {
  return book.level || 'Intermediate'
}

function getBookMoodTags(book) {
  return book.moods || book.tags.slice(0, 3).map((tag) => tag.charAt(0).toUpperCase() + tag.slice(1))
}

function getBookText(book) {
  return [
    book.title,
    book.author,
    book.description,
    book.year,
    book.origin,
    book.language,
    book.genre,
    book.level,
    book.pace,
    ...(book.tags || []),
    ...(book.keyIdeas || []),
    ...(book.moods || []),
  ]
    .join(' ')
    .toLowerCase()
}

function formatMinutes(minutes) {
  const hours = Math.floor(minutes / 60)
  const remaining = minutes % 60
  return `${hours}h ${remaining ? `${remaining}m` : ''}`.trim()
}

function getMatch(book) {
  return book.match || Math.max(68, Math.min(97, Math.round(72 + book.rating * 4)))
}

function BookCover({ book, size = 'medium', className = '' }) {
  const cover = book.cover || { background: '#283c48', ink: '#f8e6bd', accent: '#ef795c', pattern: 'default' }
  return (
    <div
      className={`book-cover book-cover--${size} cover-pattern--${cover.pattern} ${className}`}
      style={{ '--cover-bg': cover.background, '--cover-ink': cover.ink, '--cover-accent': cover.accent }}
      role="img"
      aria-label={`Cover of ${book.title} by ${book.author}`}
    >
      <span className="cover-spine" />
      <span className="cover-topline">BOOKVERSE <i>•</i> {book.year}</span>
      <span className="cover-art" aria-hidden="true">
        <i className="cover-art-dot" />
        <i className="cover-art-orbit" />
        <i className="cover-art-line cover-art-line--one" />
        <i className="cover-art-line cover-art-line--two" />
        <i className="cover-art-block" />
      </span>
      <span className="cover-copy">
        <strong>{book.title}</strong>
        <small>{book.author}</small>
      </span>
      <span className="cover-footer">A BOOKVERSE DISCOVERY</span>
    </div>
  )
}

function Rating({ value, small = false }) {
  return (
    <span className={`rating-display${small ? ' rating-display--small' : ''}`}>
      <Star size={small ? 12 : 14} fill="currentColor" />
      <strong>{Number(value).toFixed(1)}</strong>
    </span>
  )
}

function MatchBadge({ value, compact = false }) {
  return <span className={`match-badge${compact ? ' match-badge--compact' : ''}`}><Sparkle size={compact ? 10 : 12} /> {value}% match</span>
}

function IconButton({ label, children, className = '', onClick, active = false }) {
  return (
    <button type="button" className={`icon-button${active ? ' is-active' : ''} ${className}`} aria-label={label} title={label} onClick={onClick}>
      {children}
    </button>
  )
}

function SectionTitle({ eyebrow, title, body, action }) {
  return (
    <div className="section-title-row">
      <div>
        {eyebrow && <div className="eyebrow-label">{eyebrow}</div>}
        <h2>{title}</h2>
        {body && <p>{body}</p>}
      </div>
      {action}
    </div>
  )
}

function BookCard({ book, saved, onOpen, onToggleSaved, onCompare, compareSelected = false, compact = false }) {
  const genre = getBookGenre(book)
  const zone = zoneById[book.zone]
  return (
    <article className={`book-card${compact ? ' book-card--compact' : ''}`} tabIndex={0} onClick={onOpen} onKeyDown={(event) => event.key === 'Enter' && onOpen()}>
      <div className="book-card-cover-wrap">
        <BookCover book={book} size={compact ? 'small' : 'medium'} />
        <div className="cover-actions">
          <IconButton label={saved ? `Remove ${book.title} from saved books` : `Save ${book.title}`} active={saved} onClick={(event) => { event.stopPropagation(); onToggleSaved(book) }}>
            {saved ? <BookmarkCheck size={17} /> : <Bookmark size={17} />}
          </IconButton>
          <IconButton label={compareSelected ? `Remove ${book.title} from comparison` : `Compare ${book.title}`} active={compareSelected} onClick={(event) => { event.stopPropagation(); onCompare(book) }}>
            <Layers3 size={16} />
          </IconButton>
        </div>
        <span className="card-genre">{genre}</span>
        {!compact && <MatchBadge value={getMatch(book)} compact />}
      </div>
      <div className="book-card-body">
        <div className="book-card-meta"><span>{genre}</span><span>{book.year}</span></div>
        <h3>{book.title}</h3>
        <p className="book-author">{book.author}</p>
        <div className="book-card-facts">
          <Rating value={book.rating} small />
          <span><Clock3 size={13} /> {formatMinutes(book.minutes)}</span>
          <span className="level-tag">{getBookDifficulty(book)}</span>
        </div>
      </div>
      <span className="card-open-hint">View details <ArrowUpRight size={14} /></span>
    </article>
  )
}

function BookRow({ book, saved, status, onOpen, onToggleSaved, onStatus }) {
  return (
    <article className="book-row" tabIndex={0} onClick={onOpen} onKeyDown={(event) => event.key === 'Enter' && onOpen()}>
      <BookCover book={book} size="tiny" />
      <div className="book-row-main">
        <div className="book-row-title"><h3>{book.title}</h3>{book.series && <span className="series-label">{book.series}</span>}</div>
        <p>{book.author}</p>
      </div>
      <div className="book-row-progress"><span>{status === 'reading' ? '42%' : status === 'finished' ? '100%' : '—'}</span><div><i style={{ width: status === 'reading' ? '42%' : status === 'finished' ? '100%' : '0%' }} /></div></div>
      <Rating value={book.rating} small />
      <button type="button" className="row-status" onClick={(event) => { event.stopPropagation(); onStatus(status === 'reading' ? 'want' : 'reading') }}>{status === 'reading' ? 'Reading' : 'Start'}</button>
      <IconButton label={saved ? `Remove ${book.title} from saved books` : `Save ${book.title}`} active={saved} onClick={(event) => { event.stopPropagation(); onToggleSaved(book) }}>
        {saved ? <BookmarkCheck size={17} /> : <Bookmark size={17} />}
      </IconButton>
    </article>
  )
}

function ToolCard({ icon: Icon, label, title, body, color, onClick }) {
  return (
    <button className="tool-card" style={{ '--tool-color': color }} onClick={onClick}>
      <span className="tool-card-icon"><Icon size={21} /></span>
      <span className="tool-card-copy"><strong>{label}</strong><span>{title}</span><small>{body}</small></span>
      <ArrowUpRight size={17} className="tool-arrow" />
    </button>
  )
}

function HomePage({ savedIds, onOpenBook, onToggleSaved, onCompare, onNavigate, onOpenFinder, onSurprise, onOpenClues, onToast, activeMoods, setActiveMoods }) {
  const [homeMood, setHomeMood] = useState('Curious')
  const [heroQuery, setHeroQuery] = useState('')
  const heroBooks = ['harry-potter-1', 'tomorrow-tomorrow', 'project-hail-mary'].map((id) => allBooks.find((book) => book.id === id))
  const featured = allBooks.find((book) => book.id === 'thursday-murder-club')
  const pathBooks = ['selfish-gene', 'brief-history-time', 'surveillance-capitalism'].map((id) => allBooks.find((book) => book.id === id)).filter(Boolean)
  const toggleMood = (label) => {
    setHomeMood(label)
    setActiveMoods((current) => current.includes(label) ? current.filter((mood) => mood !== label) : [...current, label])
  }

  return (
    <div className="page home-page">
      <section className="hero-section page-shell">
        <div className="hero-copy">
          <div className="eyebrow-pill"><span className="pulse-dot" /> Your personal AI librarian <Sparkles size={13} /></div>
          <h1>Find your next <em>unforgettable</em> book.</h1>
          <p className="hero-subtitle">Tell us what you want to read. We’ll help you discover it.</p>
          <form className="universal-search" onSubmit={(event) => { event.preventDefault(); onNavigate('search', { query: heroQuery }) }}>
            <Search size={21} />
            <input aria-label="Search books" value={heroQuery} onChange={(event) => setHeroQuery(event.target.value)} placeholder="Search by title, author, genre, character, quote, plot, mood or anything you remember…" />
            <button type="submit" className="search-submit">Search <ArrowRight size={17} /></button>
          </form>
          <div className="hero-quick-actions">
            <button onClick={onSurprise}><ShuffleIcon /> Surprise me</button>
            <button onClick={() => onNavigate('discover', { moodFocus: true })}><Palette size={15} /> Find by mood</button>
            <button onClick={onOpenFinder}><WandSparkles size={15} /> AI Book Finder</button>
          </div>
          <div className="hero-proof"><div className="proof-avatars"><span>J</span><span>M</span><span>A</span><span>+</span></div><p><strong>12,000+ curious readers</strong><br />are finding their next chapter today</p></div>
        </div>
        <div className="hero-visual" aria-label="Featured book recommendations">
          <div className="hero-glow" />
          <div className="hero-orbit orbit-one" />
          <div className="hero-orbit orbit-two" />
          <span className="visual-caption caption-top">A little universe of stories <i /></span>
          <button className="hero-book hero-book--back" onClick={() => onOpenBook(heroBooks[1])}><BookCover book={heroBooks[1]} size="large" /></button>
          <button className="hero-book hero-book--front" onClick={() => onOpenBook(heroBooks[0])}><BookCover book={heroBooks[0]} size="hero" /></button>
          <button className="hero-book hero-book--float" onClick={() => onOpenBook(heroBooks[2])}><BookCover book={heroBooks[2]} size="medium" /></button>
          <div className="hero-mini-card">
            <div className="mini-card-top"><span className="live-dot" /> Today’s small discovery <span>✦</span></div>
            <strong>{featured.title}</strong>
            <p>A warm, clever mystery for a rainy afternoon.</p>
            <div><MatchBadge value={93} /><button onClick={() => onOpenBook(featured)}>Peek inside <ArrowUpRight size={13} /></button></div>
          </div>
          <span className="visual-caption caption-bottom">Curated for your current reading mood <i /></span>
        </div>
      </section>

      <div className="signal-strip">
        <div className="signal-track">
          {['Mystery nights', 'Begin somewhere beautiful', 'Books that stay with you', 'Your curiosity, curated', 'Mystery nights', 'Begin somewhere beautiful', 'Books that stay with you'].map((text, index) => <span key={`${text}-${index}`}>{text}<i>✦</i></span>)}
        </div>
      </div>

      <section className="section-shell home-discovery-section">
        <SectionTitle
          eyebrow="01 / A place to begin"
          title={<>Good books, <em>chosen</em> for you.</>}
          body="Your recommendations get better as you read, save, and follow your curiosity. Here’s a thoughtful place to start."
          action={<button className="text-button" onClick={() => onNavigate('discover')}>Explore your feed <ArrowRight size={16} /></button>}
        />
        <div className="home-feature-grid">
          <button className="feature-book-card" onClick={() => onOpenBook(featured)}>
            <BookCover book={featured} size="feature" />
            <span className="feature-book-overlay" />
            <div className="feature-book-content"><MatchBadge value={93} /><h3>{featured.title}</h3><p>A clever, cozy mystery where a little friendship goes a long way.</p><span className="feature-link">Why this is here <ArrowUpRight size={15} /></span></div>
          </button>
          <div className="home-side-stack">
            <div className="reading-orbit-card">
              <div className="orbit-card-header"><span className="eyebrow-label">Your reading orbit</span><button onClick={() => onNavigate('profile')}><MoreHorizontal size={18} /></button></div>
              <div className="orbit-donut"><div><strong>07</strong><span>books in your orbit</span></div></div>
              <div className="orbit-signals"><span><i className="signal-dot signal-dot--coral" />Mystery 42%</span><span><i className="signal-dot signal-dot--violet" />Thoughtful 31%</span><span><i className="signal-dot signal-dot--gold" />Wonderful 27%</span></div>
            </div>
            <div className="small-quote-card"><Quote size={20} /><p>“A book is a dream you don’t have to remember.”</p><span>— Unknown, nicely put</span></div>
          </div>
        </div>
      </section>

      <section className="section-shell mood-section">
        <div className="mood-intro"><div className="eyebrow-label">02 / How are you feeling?</div><h2>Let the mood <em>lead.</em></h2><p>Choose as many as you like. We’ll find the books that meet you there.</p><button className="quiet-link" onClick={() => onNavigate('discover', { moodFocus: true })}>Open mood finder <ArrowRight size={15} /></button></div>
        <div className="mood-picker">
          {moodOptions.slice(0, 8).map((mood) => <button key={mood.label} className={`mood-chip${homeMood === mood.label ? ' is-selected' : ''}`} style={{ '--mood-color': mood.color }} onClick={() => toggleMood(mood.label)}><span>{mood.emoji}</span>{mood.label}{homeMood === mood.label && <Check size={13} />}</button>)}
          <button className="mood-chip mood-chip--more" onClick={() => onNavigate('discover', { moodFocus: true })}>+ 8 more moods</button>
        </div>
        <div className="mood-result-strip"><div className="mood-result-icon"><Sparkles size={20} /></div><div><strong>{homeMood === 'Curious' ? 'A little curious is a great place to start.' : `${homeMood} reads are waiting in the wings.`}</strong><span>{homeMood === 'Curious' ? 'Here are three thoughtful doors into your next chapter.' : `We found books that carry the feeling of ${homeMood.toLowerCase()}.`}</span></div><button onClick={() => onNavigate('discover', { moodFocus: true })}>See matching books <ArrowRight size={15} /></button></div>
      </section>

      <section className="section-shell universe-preview">
        <SectionTitle eyebrow="03 / Browse by world" title={<>Follow a <em>rabbit hole.</em></>} body="Start with a genre, a place, a question, or simply a color that catches your eye." />
        <div className="genre-preview-grid">{genres.slice(0, 6).map((genre) => <button key={genre.name} className="genre-preview" style={{ '--genre-color': genre.color }} onClick={() => onNavigate('discover', { genre: genre.name })}><span className="genre-symbol">{genre.icon}</span><span><strong>{genre.name}</strong><small>{genre.sub}</small></span><ArrowUpRight size={16} /></button>)}</div>
      </section>

      <section className="section-shell path-section">
        <div className="path-art"><div className="path-sun" /><span className="path-line path-line--one" /><span className="path-line path-line--two" /><span className="path-star">✦</span><div className="path-stamp"><span>READING<br />PATH</span><small>01—03</small></div></div>
        <div className="path-copy"><div className="eyebrow-label">04 / Read with intention</div><h2>A little structure for <em>big ideas.</em></h2><p>Not sure where to begin? Follow a reading path built from books that genuinely lead somewhere.</p><div className="path-steps">{pathBooks.map((book, index) => <button key={book.id} onClick={() => onOpenBook(book)}><span>0{index + 1}</span><BookCover book={book} size="tiny" /><div><strong>{book.title}</strong><small>{book.author}</small></div><ArrowRight size={15} /></button>)}</div><button className="dark-button" onClick={() => onNavigate('discover', { paths: true })}>Explore reading paths <ArrowRight size={16} /></button></div>
      </section>

      <section className="section-shell home-tools-section">
        <div className="tools-intro"><div className="eyebrow-label">05 / Your shortcuts</div><h2>Start with a feeling.<br /><em>Leave with a book.</em></h2></div>
        <div className="tools-grid"><ToolCard icon={WandSparkles} label="AI BOOK FINDER" title="Tell me what you want" body="A few thoughtful questions, a shelf full of possibility." color="#d8b957" onClick={onOpenFinder} /><ToolCard icon={CircleHelp} label="I FORGOT THAT BOOK" title="Search by what you remember" body="Plot, setting, a face, a feeling—start anywhere." color="#9b8cbd" onClick={() => onOpenClues('forgot')} /><ToolCard icon={Quote} label="FROM A QUOTE" title="Remember a line, find its home" body="Short matching. No long passages. Just the right doorway." color="#c9837c" onClick={() => onOpenClues('quote')} /></div>
      </section>

      <section className="closing-band page-shell"><div><div className="eyebrow-label">A note from your future self</div><h2>There’s always<br /><em>one more book.</em></h2></div><div><p>Save what catches your eye. Build a little shelf of maybes. Let your reading life unfold one good story at a time.</p><button className="light-button" onClick={() => onNavigate('library')}>Visit my library <ArrowRight size={16} /></button></div><div className="closing-mark">✦</div></section>
    </div>
  )
}

function DiscoverPage({ savedIds, onOpenBook, onToggleSaved, onCompare, onOpenFinder, onOpenClues, onNavigate, activeGenre, setActiveGenre, activeMoods, setActiveMoods }) {
  const [discoverTab, setDiscoverTab] = useState(activeMoods.length ? 'moods' : 'for-you')
  const [country, setCountry] = useState('United Kingdom')
  const [era, setEra] = useState('2000s')
  const filteredForMood = useMemo(() => {
    let list = allBooks
    if (activeGenre !== 'All genres') list = list.filter((book) => getBookGenre(book).toLowerCase().includes(activeGenre.toLowerCase()) || zoneById[book.zone]?.name.toLowerCase().includes(activeGenre.toLowerCase()))
    if (activeMoods.length) list = list.filter((book) => activeMoods.some((mood) => getBookMoodTags(book).join(' ').toLowerCase().includes(mood.toLowerCase().replace('inspired', 'inspirational').replace('escaped', 'magical').replace('moved', 'emotional'))))
    return list.length ? list : allBooks.slice(0, 8)
  }, [activeGenre, activeMoods])
  const moodBooks = filteredForMood.slice(0, 6)
  const toggleMood = (mood) => setActiveMoods((current) => current.includes(mood) ? current.filter((item) => item !== mood) : [...current, mood])
  const countries = [
    { name: 'United Kingdom', count: 28, x: 47, y: 33, color: '#d9795d' },
    { name: 'United States', count: 41, x: 23, y: 40, color: '#6e83c7' },
    { name: 'Japan', count: 16, x: 84, y: 42, color: '#d29e4b' },
    { name: 'India', count: 19, x: 69, y: 56, color: '#7ca283' },
    { name: 'France', count: 14, x: 49, y: 45, color: '#aa7ba8' },
    { name: 'South Korea', count: 11, x: 80, y: 48, color: '#6994a1' },
  ]

  return (
    <div className="page discover-page page-shell page-top-space">
      <div className="page-heading-row"><div><div className="eyebrow-label">DISCOVERY ROOM</div><h1>Follow your <em>curiosity.</em></h1><p>There is no wrong way into a book. Choose a mood, a genre, a corner of the world—or hand the next decision to BookVerse.</p></div><div className="page-heading-orbit"><span>✦</span><small>12,408</small><em>books in the universe</em></div></div>
      <div className="discover-tabs" role="tablist" aria-label="Discovery modes">{[['for-you', 'For you', Sparkles], ['moods', 'By mood', Palette], ['map', 'World map', Globe2], ['paths', 'Reading paths', ListFilter]].map(([id, label, Icon]) => <button key={id} className={discoverTab === id ? 'is-active' : ''} onClick={() => setDiscoverTab(id)} role="tab"><Icon size={16} /> {label}</button>)}</div>

      {discoverTab === 'for-you' && <>
        <div className="discover-tool-row"><ToolCard icon={WandSparkles} label="AI BOOK FINDER" title="Make it personal" body="Answer five optional questions and get a shelf made around you." color="#d4b657" onClick={onOpenFinder} /><ToolCard icon={CircleHelp} label="REMEMBER A STORY" title="I forgot the book" body="A plot, a place, a face, a year. Start anywhere." color="#9c8cbe" onClick={() => onOpenClues('forgot')} /><ToolCard icon={Quote} label="REMEMBER A LINE" title="Quote finder" body="Find the book from a sentence you still carry." color="#c9827a" onClick={() => onOpenClues('quote')} /></div>
        <SectionTitle eyebrow="CURATED FOR YOUR CURRENT ORBIT" title={<>Books you might <em>love.</em></>} body="A mix of new ideas, old favorites, and the kind of surprising left turns that make a library feel alive." action={<button className="text-button" onClick={() => onNavigate('search')}>See all recommendations <ArrowRight size={16} /></button>} />
        <div className="book-wall">{filteredForMood.slice(0, 8).map((book) => <BookCard key={book.id} book={book} saved={savedIds.includes(book.id)} onOpen={() => onOpenBook(book)} onToggleSaved={onToggleSaved} onCompare={onCompare} compareSelected={false} />)}</div>
        <div className="hidden-gems"><div className="gem-copy"><div className="eyebrow-label">HIDDEN GEMS / 07</div><h2>Less famous.<br /><em>More unforgettable.</em></h2><p>These books may not be everywhere yet, but they match the shape of your curiosity better than the obvious choice.</p><button className="dark-button" onClick={() => setDiscoverTab('for-you')}>Reveal the hidden shelf <Sparkles size={15} /></button></div><div className="gem-book-stack"><BookCover book={allBooks.find((book) => book.id === 'klara-sun')} size="large" /><BookCover book={allBooks.find((book) => book.id === 'piranesi')} size="large" /><div className="gem-note"><span>Why this one?</span><strong>Quietly strange.<br />Impossible to forget.</strong><ArrowUpRight size={17} /></div></div></div>
      </>}

      {discoverTab === 'moods' && <section className="mood-discover-content"><div className="mood-discover-heading"><div><div className="eyebrow-label">MOOD-BASED DISCOVERY</div><h2>What kind of feeling<br />would feel <em>good right now?</em></h2></div><p>There is no right answer. Mix a few moods and we’ll make a little room for all of them.</p></div><div className="mood-wall">{moodOptions.map((mood) => <button key={mood.label} className={`mood-tile${activeMoods.includes(mood.label) ? ' is-active' : ''}`} style={{ '--mood-color': mood.color }} onClick={() => toggleMood(mood.label)}><span>{mood.emoji}</span><strong>{mood.label}</strong>{activeMoods.includes(mood.label) && <CheckCircle2 size={16} />}</button>)}</div><div className="mood-results-heading"><div><div className="eyebrow-label">MATCHING YOUR MOOD</div><h3>{activeMoods.length ? activeMoods.join(' + ') : 'Curious + open'}</h3></div><span>{moodBooks.length} books found</span></div><div className="book-wall">{moodBooks.map((book) => <BookCard key={book.id} book={book} saved={savedIds.includes(book.id)} onOpen={() => onOpenBook(book)} onToggleSaved={onToggleSaved} onCompare={onCompare} />)}</div></section>}

      {discoverTab === 'map' && <section className="map-discover-content"><div className="map-heading"><div><div className="eyebrow-label">THE WORLD BOOK MAP</div><h2>Read the world,<br /><em>one story at a time.</em></h2></div><p>From a small-town mystery to a city that only exists in your imagination, place is part of the plot.</p></div><div className="map-layout"><div className="world-map"><div className="map-grid" />{countries.map((place) => <button key={place.name} className={`map-pin${country === place.name ? ' is-active' : ''}`} style={{ '--pin-color': place.color, '--pin-x': `${place.x}%`, '--pin-y': `${place.y}%` }} onClick={() => setCountry(place.name)}><i /><span>{place.name}<small>{place.count} picks</small></span></button>)}<div className="map-route route-one" /><div className="map-route route-two" /><span className="map-label map-label--one">THE LONG WAY AROUND</span><span className="map-label map-label--two">EVERY STORY HAS A COORDINATE</span></div><div className="country-panel"><div className="country-panel-top"><span className="country-flag">{country === 'Japan' ? '✦' : country === 'France' ? '◌' : '◒'}</span><div><span className="eyebrow-label">EXPLORE LITERATURE FROM</span><h3>{country}</h3></div></div><div className="country-panel-rule" /><span className="eyebrow-label">POPULAR GENRES</span><div className="tag-row"><span>Literary fiction</span><span>Memoir</span><span>Historical</span></div><span className="eyebrow-label country-start-label">START HERE</span><button className="country-book" onClick={() => onOpenBook(allBooks.find((book) => book.origin === country) || allBooks[0])}><BookCover book={allBooks.find((book) => book.origin === country) || allBooks[0]} size="tiny" /><span><strong>{allBooks.find((book) => book.origin === country)?.title || 'The Book of the World'}</strong><small>{allBooks.find((book) => book.origin === country)?.author || 'A BookVerse guide'}</small></span><ArrowUpRight size={15} /></button><p className="country-note"><Info size={14} /> Availability and editions are checked at the point of purchase.</p></div></div></section>}

      {discoverTab === 'paths' && <section className="paths-discover-content"><div className="path-page-heading"><div><div className="eyebrow-label">READING PATHS</div><h2>Go deeper, one<br /><em>good step</em> at a time.</h2></div><p>Curated routes through ideas, authors, and questions—made for the curious person who likes a little signposting.</p></div><div className="path-cards"><div className="path-card path-card--gold"><div className="path-card-icon"><Cpu size={24} /></div><span>4 BOOKS / NONFICTION</span><h3>Learn artificial intelligence</h3><p>From your first model to the questions behind the tools.</p><div className="path-card-books"><BookCover book={allBooks.find((book) => book.id === 'coming-wave')} size="tiny" /><BookCover book={allBooks.find((book) => book.id === 'surveillance-capitalism')} size="tiny" /><BookCover book={allBooks.find((book) => book.id === 'selfish-gene')} size="tiny" /></div><button onClick={() => onOpenBook(allBooks.find((book) => book.id === 'coming-wave'))}>Start this path <ArrowRight size={15} /></button></div><div className="path-card path-card--lavender"><div className="path-card-icon"><Palette size={24} /></div><span>3 BOOKS / FICTION</span><h3>Find your way into a series</h3><p>A doorway into stories that grow bigger with every page.</p><div className="path-card-books"><BookCover book={allBooks.find((book) => book.id === 'harry-potter-1')} size="tiny" /><BookCover book={allBooks.find((book) => book.id === 'piranesi')} size="tiny" /><BookCover book={allBooks.find((book) => book.id === 'klara-sun')} size="tiny" /></div><button onClick={() => onOpenBook(allBooks.find((book) => book.id === 'harry-potter-1'))}>Start this path <ArrowRight size={15} /></button></div><div className="path-card path-card--green"><div className="path-card-icon"><Target size={24} /></div><span>5 BOOKS / PRACTICE</span><h3>Become better at finance</h3><p>Beginner to confident, with useful books between each step.</p><div className="path-card-books"><BookCover book={allBooks.find((book) => book.id === 'atomic-habits')} size="tiny" /><BookCover book={allBooks.find((book) => book.id === 'good-to-great')} size="tiny" /><BookCover book={allBooks.find((book) => book.id === 'design-everyday-things')} size="tiny" /></div><button onClick={() => onOpenBook(allBooks.find((book) => book.id === 'atomic-habits'))}>Start this path <ArrowRight size={15} /></button></div></div></section>}
    </div>
  )
}

function SearchPage({ query, setQuery, results, savedIds, onOpenBook, onToggleSaved, onCompare, compareIds, onOpenFinder, onOpenClues, intent, didYouMean, onSearch, filters, setFilters }) {
  const [showFilters, setShowFilters] = useState(true)
  const [view, setView] = useState('grid')
  const activeFilterCount = Object.entries(filters).filter(([key, value]) => key !== 'standalone' && value && value !== 'Any').length + (filters.standalone ? 1 : 0)
  const clearFilters = () => setFilters({ genre: 'Any', difficulty: 'Any', length: 'Any', mood: 'Any', year: 'Any', standalone: false })
  return (
    <div className="page search-page page-shell page-top-space">
      <div className="search-page-heading"><div><div className="eyebrow-label">SMART SEARCH</div><h1>Search by <em>anything.</em></h1><p>Title, author, plot, mood, a half-remembered detail—BookVerse understands the difference.</p></div><div className="search-heading-mark"><span>⌁</span><small>Natural language<br />search on</small></div></div>
      <form className="search-large-bar" onSubmit={(event) => { event.preventDefault(); onSearch() }}><Search size={21} /><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try “a short mystery with romance and a happy ending”" /><button type="submit">Search <ArrowRight size={17} /></button></form>
      <div className="search-intent-row"><span className="intent-label"><Sparkles size={14} /> I heard you say</span>{intent.length ? intent.map((item) => <span className="intent-chip" key={item}>{item}</span>) : <span className="intent-muted">Try a title, a feeling, or a story you half remember.</span>}{didYouMean && <button className="did-you-mean" onClick={() => setQuery(didYouMean)}>Did you mean <strong>{didYouMean}</strong>? <ArrowUpRight size={13} /></button>}</div>
      <div className="search-layout">
        <aside className={`filter-sidebar${showFilters ? '' : ' is-collapsed'}`}>
          <div className="filter-sidebar-head"><div><span className="eyebrow-label">REFINE RESULTS</span><strong>Search filters</strong></div><IconButton label={showFilters ? 'Hide filters' : 'Show filters'} onClick={() => setShowFilters((current) => !current)}>{showFilters ? <ChevronLeft size={17} /> : <SlidersHorizontal size={17} />}</IconButton></div>
          {showFilters && <div className="filter-fields">
            <FilterSelect label="Genre" value={filters.genre} options={['Any', ...genres.map((genre) => genre.name), 'Arts & Design', 'Science & Space']} onChange={(value) => setFilters({ ...filters, genre: value })} />
            <FilterSelect label="Reading level" value={filters.difficulty} options={['Any', 'Beginner', 'Easy', 'Intermediate', 'Advanced', 'Essential']} onChange={(value) => setFilters({ ...filters, difficulty: value })} />
            <FilterSelect label="Length" value={filters.length} options={['Any', 'Under 200 pages', '200–300 pages', '300–500 pages', '500+ pages', 'I only have 3 hours']} onChange={(value) => setFilters({ ...filters, length: value })} />
            <FilterSelect label="Mood" value={filters.mood} options={['Any', ...moodOptions.slice(0, 8).map((mood) => mood.label)]} onChange={(value) => setFilters({ ...filters, mood: value })} />
            <FilterSelect label="Publication era" value={filters.year} options={['Any', 'Before 1980', '1980s', '1990s', '2000s', '2010s', '2020s']} onChange={(value) => setFilters({ ...filters, year: value })} />
            <label className="checkbox-filter"><input type="checkbox" checked={filters.standalone} onChange={(event) => setFilters({ ...filters, standalone: event.target.checked })} /><span className="fake-checkbox"><Check size={12} /></span><span>Standalone only</span></label>
            <button className="clear-filters" onClick={clearFilters}><RotateCcw size={14} /> Clear all filters</button>
          </div>}
        </aside>
        <main className="search-results-area">
          <div className="results-toolbar"><div><span className="eyebrow-label">{query ? 'RESULTS FOR YOUR SEARCH' : 'ALL BOOKS'}</span><h2>{query ? <>Books that fit <em>“{query}”</em></> : <>A shelf full of <em>possibility.</em></>}</h2></div><div className="results-actions"><span className="result-count">{results.length} {results.length === 1 ? 'match' : 'matches'}</span><label className="sort-select"><span>Sort</span><select defaultValue="match"><option value="match">Best match</option><option value="rating">Highest rated</option><option value="newest">Recently published</option><option value="short">Shortest first</option></select><ChevronDown size={14} /></label><div className="view-toggle"><button className={view === 'grid' ? 'is-active' : ''} onClick={() => setView('grid')} aria-label="Grid view"><Grid2X2 size={16} /></button><button className={view === 'list' ? 'is-active' : ''} onClick={() => setView('list')} aria-label="List view"><List size={17} /></button></div></div></div>
          {results.length ? <div className={`search-book-grid is-${view}`}>{results.map((book) => <BookCard key={book.id} book={book} saved={savedIds.includes(book.id)} onOpen={() => onOpenBook(book)} onToggleSaved={onToggleSaved} onCompare={onCompare} compareSelected={compareIds.includes(book.id)} />)}</div> : <div className="no-results"><span className="no-results-icon"><SearchX size={28} /></span><h3>No books found—yet.</h3><p>Try describing the plot, loosening a filter, or telling us what kind of mood you are after.</p><div><button className="dark-button" onClick={() => setQuery('')}>Show all books</button><button className="light-outline-button" onClick={onOpenFinder}>Ask AI Book Finder</button></div></div>}
          {results.length > 0 && <div className="load-more"><span>Showing {results.length} of 12,408 books</span><button onClick={() => onToast('You’re all caught up for now — more discoveries are on their way.')}>Load more <RefreshCw size={15} /></button></div>}
        </main>
      </div>
    </div>
  )
}

function FilterSelect({ label, value, options, onChange }) {
  return <label className="filter-select"><span>{label}</span><div><select value={value} onChange={(event) => onChange(event.target.value)}>{options.map((option) => <option key={option} value={option}>{option}</option>)}</select><ChevronDown size={14} /></div></label>
}

function LibraryPage({ savedIds, reading, setReading, onOpenBook, onToggleSaved, onNavigate, onToast }) {
  const [libraryTab, setLibraryTab] = useState('reading')
  const tabs = [{ id: 'reading', label: 'Currently reading', icon: BookOpenCheck }, { id: 'want', label: 'Want to read', icon: Bookmark }, { id: 'finished', label: 'Finished', icon: CheckCircle2 }, { id: 'collections', label: 'Collections', icon: Library }]
  const visibleBooks = allBooks.filter((book) => reading[libraryTab]?.includes(book.id))
  const updateStatus = (book, from, to) => {
    setReading((current) => {
      const next = { ...current, [from]: current[from].filter((id) => id !== book.id) }
      next[to] = [...new Set([...next[to], book.id])]
      return next
    })
    onToast(`${book.title} moved to ${to === 'reading' ? 'Currently reading' : 'Want to read'}.`)
  }
  return (
    <div className="page library-page page-shell page-top-space">
      <div className="library-top"><div><div className="eyebrow-label">YOUR PERSONAL LIBRARY</div><h1>A little room for<br /><em>all your maybes.</em></h1><p>Your shelf is a conversation with your future self. Keep it close.</p></div><div className="library-profile-mini"><div className="profile-avatar">AV</div><div><strong>Alex’s reading room</strong><span>Curious since 2024</span></div><button onClick={() => onNavigate('profile')}><Settings2 size={16} /></button></div></div>
      <div className="reading-summary"><div className="summary-stat summary-stat--goal"><div className="goal-ring"><div><strong>68%</strong><span>of your goal</span></div></div><div><span className="eyebrow-label">2026 READING GOAL</span><h3>16 of 24 books</h3><p>Eight more good stories and you’ll be there.</p><div className="goal-bar"><i style={{ width: '68%' }} /></div><button onClick={() => onToast('Goal editor ready — choose your next milestone.')}>Edit goal <ArrowUpRight size={14} /></button></div></div><div className="summary-stat"><span className="eyebrow-label">READING STREAK</span><div className="big-number">07 <small>days</small></div><div className="streak-dots">{['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => <span className={index < 5 ? 'is-done' : index === 5 ? 'is-today' : ''} key={`${day}-${index}`}>{index < 5 ? <Check size={12} /> : day}</span>)}</div></div><div className="summary-stat"><span className="eyebrow-label">PAGES THIS MONTH</span><div className="big-number">1,248</div><div className="mini-chart">{[32, 47, 35, 68, 54, 82, 62, 91, 75, 100, 87, 96].map((height, index) => <i style={{ height: `${height}%` }} key={index} />)}</div><span className="chart-caption">↑ 18% from last month</span></div></div>
      <div className="library-tabs">{tabs.map(({ id, label, icon: Icon }) => <button key={id} className={libraryTab === id ? 'is-active' : ''} onClick={() => setLibraryTab(id)}><Icon size={16} /> {label}<span>{id === 'collections' ? defaultCollections.length : reading[id]?.length || 0}</span></button>)}</div>
      {libraryTab === 'collections' ? <div className="collections-grid">{defaultCollections.map((collection) => <button className="collection-card" key={collection.id} style={{ '--collection-color': collection.color }} onClick={() => onNavigate('search')}><div className="collection-top"><span>{collection.icon}</span><MoreHorizontal size={17} /></div><h3>{collection.name}</h3><p>{collection.count} books · Curated by you</p><div className="collection-book-stack">{allBooks.slice(collection.count % 4, collection.count % 4 + 3).map((book) => <BookCover key={book.id} book={book} size="tiny" />)}</div><span className="collection-open">Open collection <ArrowUpRight size={14} /></span></button>)}<button className="new-collection" onClick={() => onToast('New collection draft created. Add a name whenever you’re ready.')}><Plus size={21} /><strong>New collection</strong><span>Make a little room for a new idea.</span></button></div> : <div className="library-shelf"><div className="shelf-heading"><div><span className="eyebrow-label">{libraryTab === 'reading' ? 'IN PROGRESS' : libraryTab === 'want' ? 'FOR ANOTHER DAY' : 'THE BOOKS THAT STAYED WITH YOU'}</span><h2>{tabs.find((tab) => tab.id === libraryTab)?.label}</h2></div><span>{visibleBooks.length} books</span></div>{visibleBooks.length ? <div className="book-rows">{visibleBooks.map((book) => <BookRow key={book.id} book={book} status={libraryTab} saved={savedIds.includes(book.id)} onOpen={() => onOpenBook(book)} onToggleSaved={onToggleSaved} onStatus={(next) => updateStatus(book, libraryTab, next)} />)}</div> : <EmptyLibrary tab={libraryTab} onNavigate={onNavigate} />}</div>}
      <div className="library-bottom-grid"><div className="goal-card"><div className="goal-card-head"><div><div className="eyebrow-label">SMART READING QUEUE</div><h2>What should I read next?</h2></div><Sparkles size={22} /></div><p>Your queue balances a little momentum with a little challenge.</p><div className="queue-list">{[allBooks.find((book) => book.id === 'piranesi'), allBooks.find((book) => book.id === 'project-hail-mary'), allBooks.find((book) => book.id === 'atomic-habits')].map((book, index) => <button key={book.id} onClick={() => onOpenBook(book)}><span className="queue-number">0{index + 1}</span><BookCover book={book} size="tiny" /><span><strong>{book.title}</strong><small>{index === 0 ? 'A small, magical start' : index === 1 ? 'A bigger world to explore' : 'A practical reset'}</small></span><ArrowRight size={15} /></button>)}</div></div><div className="achievement-card"><div className="eyebrow-label">RECENTLY UNLOCKED</div><div className="achievement-badge"><Trophy size={26} /></div><h3>Curious mind</h3><p>You’ve explored 5 different reading worlds.</p><span>4 more to the next level <ArrowRight size={13} /></span><div className="achievement-progress"><i style={{ width: '62%' }} /></div></div></div>
    </div>
  )
}

function EmptyLibrary({ tab, onNavigate }) {
  return <div className="empty-library"><span><BookHeart size={25} /></span><h3>{tab === 'reading' ? 'Nothing on your reading desk yet.' : 'Your bookshelf is waiting.'}</h3><p>{tab === 'reading' ? 'Choose a book that makes you want to stay in.' : 'The first book is the hardest to save. Let BookVerse make it easy.'}</p><button className="dark-button" onClick={() => onNavigate('discover')}>Find a first book <ArrowRight size={15} /></button></div>
}

function ProfilePage({ savedIds, onNavigate, onOpenBook, onToast, reduceMotion, fontScale, onFontScale, onToggleMotion }) {
  const achievements = [{ icon: '✦', title: 'First light', text: 'Save your first book', done: true }, { icon: '◒', title: 'Seven-day glow', text: 'Read for 7 days', done: true }, { icon: '✺', title: 'World reader', text: 'Read from 5 places', done: false }, { icon: '☼', title: 'Deep dive', text: 'Finish 10 books', done: false }]
  return <div className="page profile-page page-shell page-top-space"><div className="profile-hero"><div className="profile-large-avatar">AV<span>✦</span></div><div className="profile-hero-copy"><div className="eyebrow-label">YOUR READING ROOM</div><h1>Alex’s <em>bookverse.</em></h1><p>Collecting questions, quiet afternoons, and books that make the world feel a little larger.</p><div className="profile-meta"><span><CalendarIcon /> Joined April 2024</span><span><Globe2 size={14} /> Reading in English</span><button onClick={() => onToast('Profile editing is ready for your next change.')}>Edit profile <ArrowUpRight size={13} /></button></div></div><div className="profile-level"><span>YOUR READING LEVEL</span><strong>Thoughtful<br />explorer</strong><div className="level-dots">{[1, 2, 3, 4, 5].map((dot) => <i className={dot < 4 ? 'is-on' : ''} key={dot} />)}</div><small>4 / 5 worlds explored</small></div></div><div className="profile-stats"><div><strong>24</strong><span>books finished</span></div><div><strong>8,420</strong><span>pages read</span></div><div><strong>07</strong><span>day streak</span></div><div><strong>06</strong><span>collections</span></div></div><div className="profile-grid"><div className="profile-dna-card"><div className="profile-card-heading"><div><div className="eyebrow-label">YOUR BOOK DNA</div><h2>What keeps you turning pages?</h2></div><button onClick={() => onToast('Your recommendations are tuned to these signals.')}>Why am I seeing this? <CircleHelp size={14} /></button></div><div className="dna-large-list">{[['Curiosity', 92, '#d4a15b'], ['Mystery & intrigue', 74, '#8d82b9'], ['Character-led', 88, '#6e9d8b'], ['Big ideas', 67, '#6a8fba'], ['Atmosphere', 81, '#c98278']].map(([label, value, color]) => <div className="dna-large-row" key={label}><div><span>{label}</span><strong>{value}%</strong></div><div><i style={{ width: `${value}%`, background: color }} /></div></div>)}</div><div className="profile-signal"><Sparkles size={16} /><span>Your strongest signal is <strong>curiosity with atmosphere</strong>. You like books that reward a slow entrance.</span></div></div><div className="profile-achievements"><div className="profile-card-heading"><div><div className="eyebrow-label">ACHIEVEMENTS</div><h2>Little milestones</h2></div><Trophy size={19} /></div><div className="achievement-grid">{achievements.map((achievement) => <div className={`achievement-item${achievement.done ? ' is-done' : ''}`} key={achievement.title}><span>{achievement.icon}</span><strong>{achievement.title}</strong><small>{achievement.text}</small></div>)}</div><button className="text-button" onClick={() => onToast('All achievements are visible in your reading history.')}>See all achievements <ArrowRight size={15} /></button></div><div className="profile-preferences"><div className="profile-card-heading"><div><div className="eyebrow-label">RECOMMENDATION CONTROLS</div><h2>You are in control.</h2></div><Settings2 size={19} /></div><div className="preference-toggles"><label><span><Heart size={15} /> Personalize my feed</span><input type="checkbox" defaultChecked /><i /></label><label><span><ShieldCheck size={15} /> Spoiler-free by default</span><input type="checkbox" defaultChecked /><i /></label><label><span><VolumeIcon /> Reduce motion</span><input type="checkbox" checked={reduceMotion} onChange={onToggleMotion} /><i /></label><div className="font-size-control"><span><Type size={15} /> Text size</span><div><button className={fontScale === 0.9 ? 'is-active' : ''} onClick={() => onFontScale(0.9)}>A</button><button className={fontScale === 1 ? 'is-active' : ''} onClick={() => onFontScale(1)}>A</button><button className={fontScale === 1.12 ? 'is-active' : ''} onClick={() => onFontScale(1.12)}>A</button></div></div></div><div className="profile-actions"><button onClick={() => onToast('Recommendation signals reset. Fresh discoveries are on their way.')}><RefreshCw size={14} /> Reset recommendations</button><button onClick={() => onNavigate('search')}><Settings2 size={14} /> Manage preferences</button></div></div><div className="profile-reading-path"><div className="eyebrow-label">CURRENTLY FOLLOWING</div><h2>Learn artificial intelligence</h2><p>2 of 4 books complete</p><div className="profile-path-progress"><i style={{ width: '50%' }} /></div><div className="profile-path-books"><BookCover book={allBooks.find((book) => book.id === 'coming-wave')} size="tiny" /><BookCover book={allBooks.find((book) => book.id === 'surveillance-capitalism')} size="tiny" /><BookCover book={allBooks.find((book) => book.id === 'selfish-gene')} size="tiny" /><span>+ 2 books</span></div><button className="dark-button" onClick={() => onOpenBook(allBooks.find((book) => book.id === 'coming-wave'))}>Continue path <ArrowRight size={15} /></button></div></div></div>
}

function BookDna({ book, expanded = false }) {
  const values = book.dna || [book.rating * 18 + 15, book.pages > 450 ? 76 : 42, book.tags.includes('mystery') ? 89 : 48, book.tags.includes('magic') ? 86 : 55, book.pace?.includes('Slow') ? 28 : 72, Math.min(92, 42 + book.keyIdeas.length * 13)]
  const labels = ['Emotional pull', 'Mystery / tension', 'Imagination', 'Complexity', 'Pace', 'World-building']
  return <div className={`book-dna${expanded ? ' book-dna--expanded' : ''}`}><div className="dna-heading"><span>BOOK DNA</span><small>Preference profile</small></div>{labels.map((label, index) => <div className="dna-row" key={label}><span>{label}</span><div><i style={{ width: `${Math.round(values[index])}%` }} /></div><strong>{Math.round(values[index])}</strong></div>)}</div>
}

function BookDetailModal({ book, saved, onClose, onToggleSaved, onOpenBook, onCompare, compareSelected, onToast }) {
  const [tab, setTab] = useState('Overview')
  const [spoilerFree, setSpoilerFree] = useState(true)
  const [deepAnalysis, setDeepAnalysis] = useState(false)
  const closeRef = useRef(null)
  const zone = zoneById[book.zone]
  const similar = useMemo(() => allBooks.filter((candidate) => candidate.id !== book.id && (candidate.zone === book.zone || candidate.tags.some((tag) => book.tags.includes(tag)))).slice(0, 4), [book])
  useEffect(() => { closeRef.current?.focus(); const previous = document.activeElement; const overflow = document.body.style.overflow; document.body.style.overflow = 'hidden'; return () => { document.body.style.overflow = overflow; previous?.focus?.() } }, [])
  return <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><section className="book-detail-modal" role="dialog" aria-modal="true" aria-labelledby="detail-title" style={{ '--detail-accent': zone?.color || '#d9795d' }}><header className="detail-modal-header"><div className="detail-breadcrumb"><span>BOOKVERSE</span><ChevronRight size={13} /><span>{getBookGenre(book).toUpperCase()}</span></div><div className="detail-header-actions"><button className="detail-share" onClick={() => onToast('A share link is ready to copy.')}><ArrowUpRight size={15} /> Share</button><IconButton label="Close book details" onClick={onClose}><X size={20} /></IconButton></div></header><div className="detail-scroll"><div className="detail-hero"><div className="detail-cover-column"><BookCover book={book} size="detail" /><div className="detail-cover-caption"><span><ShieldCheck size={13} /> Editorial metadata</span><button onClick={() => onToast('Edition links open through trusted library and bookseller sources.')}>Find an edition <ExternalLink size={12} /></button></div></div><div className="detail-intro"><div className="detail-topline"><span className="detail-genre-pill">{getBookGenre(book)}</span><MatchBadge value={getMatch(book)} /></div><h1 id="detail-title">{book.title}</h1><p className="detail-author">by <strong>{book.author}</strong></p><div className="detail-rating-line"><Rating value={book.rating} /><span className="detail-rating-note">Reader-loved · {book.year}</span><span className="detail-source"><Info size={13} /> Editorial score</span></div><p className="detail-description">{book.description}</p><div className="detail-actions"><button className="primary-button" onClick={() => onToggleSaved(book)}>{saved ? <BookmarkCheck size={17} /> : <Bookmark size={17} />}{saved ? 'Saved to shelf' : 'Save for later'}</button><button className={`secondary-button${compareSelected ? ' is-selected' : ''}`} onClick={() => onCompare(book)}><Layers3 size={16} />{compareSelected ? 'In comparison' : 'Compare'}</button><button className="quiet-icon-button" onClick={() => onToast('Audiobook availability will be shown when verified by a provider.')} aria-label="Listen to audiobook options"><HeadphoneIcon /></button></div><div className="detail-journey"><span className="eyebrow-label">YOUR BOOK JOURNEY</span><div>{['Discover', 'Save', 'Start', 'Read', 'Finish', 'Review'].map((step, index) => <span className={index < (saved ? 2 : 1) ? 'is-done' : ''} key={step}><i>{index < (saved ? 2 : 1) ? <Check size={10} /> : index + 1}</i>{step}</span>)}</div></div></div></div><nav className="detail-tabs" aria-label="Book detail sections">{['Overview', 'Book DNA', 'Similar books', 'Reviews'].map((item) => <button key={item} className={tab === item ? 'is-active' : ''} onClick={() => setTab(item)}>{item}{item === 'Reviews' && <span>24</span>}</button>)}</nav>{tab === 'Overview' && <div className="detail-content-grid"><div className="detail-main-column"><section className="ai-insight-card"><div className="ai-insight-icon"><Sparkles size={18} /></div><div><span className="eyebrow-label">WHY YOU MIGHT LIKE IT</span><p>{book.why || `Because it pairs ${getBookGenre(book).toLowerCase()} with a ${book.pace?.toLowerCase() || 'thoughtful'} pace and a question worth carrying.`}</p><div className="signal-list"><span><Check size={12} /> {getBookGenre(book)}</span><span><Check size={12} /> {book.pace || 'Thoughtful pace'}</span><span><Check size={12} /> {book.level || 'Accessible'}</span></div></div></section><section className="detail-section"><div className="detail-section-head"><div><span className="eyebrow-label">A QUICK LOOK</span><h2>The details</h2></div><button className="text-button" onClick={() => onToast('ISBN and publisher details are shown only when verified by a source.')}>Source notes <Info size={14} /></button></div><div className="details-grid"><DetailFact label="Published" value={book.year} /><DetailFact label="Pages" value={book.pages} /><DetailFact label="Language" value={book.language} /><DetailFact label="Origin" value={book.origin} /><DetailFact label="Reading time" value={formatMinutes(book.minutes)} /><DetailFact label="Difficulty" value={getBookDifficulty(book)} /><DetailFact label="Publisher" value="Not verified" muted /><DetailFact label="ISBN" value="Not verified" muted /></div></section><section className="detail-section themes-section"><div className="detail-section-head"><div><span className="eyebrow-label">IDEAS TO CARRY</span><h2>What you might be thinking about</h2></div></div><div className="idea-list">{book.keyIdeas.map((idea, index) => <div key={idea}><span>0{index + 1}</span><p>{idea}</p></div>)}</div></section><section className="content-note"><div><ShieldCheck size={17} /><span><strong>Content notes</strong><small>For a spoiler-free preview, start with the broad themes. Full content guidance can be added by an editor.</small></span></div><button onClick={() => setSpoilerFree((current) => !current)}>{spoilerFree ? 'Spoiler-free mode on' : 'Reveal deeper analysis'}<span className={`toggle ${spoilerFree ? 'is-on' : ''}`}><i /></span></button></section>{deepAnalysis && <section className="deep-analysis"><div><span className="eyebrow-label">DEEPER ANALYSIS</span><h2>The shape of the story</h2></div><p>{book.description} The narrative invites you to notice the small choices that carry the larger meaning, without giving away the turns that make the reading experience its own.</p><button className="text-button" onClick={() => setDeepAnalysis(false)}>Hide analysis <ChevronDown size={14} /></button></section>}<button className="deep-analysis-toggle" onClick={() => setDeepAnalysis((current) => !current)}>{deepAnalysis ? 'Hide deeper analysis' : 'Show deeper analysis'} <ArrowUpRight size={14} /></button></div><aside className="detail-side-column"><BookDna book={book} /><div className="detail-side-card"><span className="eyebrow-label">BEST FOR READERS WHO LIKE</span><div className="like-list"><span><Check size={13} /> A strong sense of place</span><span><Check size={13} /> Questions to carry forward</span><span><Check size={13} /> A pace that rewards attention</span></div></div><div className="detail-side-card reading-time-card"><div className="reading-time-top"><Clock3 size={17} /><strong>How long will this take?</strong></div><p>At an average pace of 40 pages/hour.</p><div className="time-options"><button className="is-active"><span>🐢</span> Slow <small>22h</small></button><button><span>🚶</span> Average <small>12h</small></button><button><span>⚡</span> Fast <small>9h</small></button></div><button className="outline-small" onClick={() => onToast('Reading-time calculator updated with your preference.')}>Use my reading speed <ArrowRight size={13} /></button></div><div className="detail-side-card similar-preview"><div className="similar-head"><span className="eyebrow-label">IF YOU LIKED THIS</span><button onClick={() => setTab('Similar books')}>See all <ArrowRight size={13} /></button></div>{similar.slice(0, 2).map((item) => <button className="mini-similar" key={item.id} onClick={() => onOpenBook(item)}><BookCover book={item} size="tiny" /><span><strong>{item.title}</strong><small>{getBookGenre(item)} · {item.author}</small></span><ArrowUpRight size={13} /></button>)}</div></aside></div>}{tab === 'Book DNA' && <div className="detail-tab-panel dna-tab"><div className="dna-tab-heading"><div><span className="eyebrow-label">A VISUAL PROFILE</span><h2>Book DNA</h2><p>A flexible way to understand the shape of a book—not a score, but a starting point for your own instinct.</p></div><div className="dna-match-large"><strong>{getMatch(book)}%</strong><span>preference match</span></div></div><BookDna book={book} expanded /><div className="dna-explanation"><Sparkles size={18} /><p>This recommendation is weighted by your interest in <strong>{getBookGenre(book).toLowerCase()}</strong>, your preference for <strong>{book.pace?.toLowerCase() || 'thoughtful'} pacing</strong>, and your saved books with related themes.</p></div></div>}{tab === 'Similar books' && <div className="detail-tab-panel similar-tab"><div className="detail-section-head"><div><span className="eyebrow-label">A FEW NEARBY DOORS</span><h2>If you liked this, you may like</h2></div><button className="text-button" onClick={() => onToast('Your “more like this” preferences are saved.')}>Tune recommendations <Settings2 size={14} /></button></div><div className="similar-reason-grid">{similar.map((item, index) => <BookCard key={item.id} book={item} saved={false} onOpen={() => onOpenBook(item)} onToggleSaved={onToggleSaved} onCompare={onCompare} />)}</div><div className="if-you-liked-tree"><span className="tree-root">IF YOU LIKED <strong>{book.title}</strong></span><div><span>Similar story</span><span>Similar atmosphere</span><span>Same reading energy</span><span>A beautiful left turn</span></div></div></div>}{tab === 'Reviews' && <div className="detail-tab-panel reviews-tab"><div className="review-summary"><div><strong>4.6</strong><Rating value={4.6} /><span>Based on 24 reader reviews</span></div><div className="review-bars">{[['Story', 92], ['Writing', 88], ['Characters', 94], ['Ideas', 81], ['Emotional impact', 90]].map(([label, value]) => <div key={label}><span>{label}</span><i><b style={{ width: `${value}%` }} /></i><strong>{value}%</strong></div>)}</div></div><div className="review-list"><ReviewItem name="Maya R." date="2 days ago" text="A beautifully paced reading experience. I finished it wanting to immediately text a friend about the last third." spoiler={false} /><ReviewItem name="Jonah K." date="1 week ago" text="The atmosphere stayed with me long after I closed the cover." spoiler={false} /><div className="spoiler-review"><ShieldCheck size={15} /><span><strong>Spoiler-protected review</strong> · 6 reviews contain spoilers and are hidden until you choose to reveal them.</span><button onClick={() => onToast('Spoiler reviews remain hidden until you explicitly reveal them.')}>Review spoiler policy <ArrowUpRight size={13} /></button></div></div></div>}</div></section></div>
}

function ReviewItem({ name, date, text, spoiler }) {
  return <article className="review-item"><div className="review-avatar">{name.charAt(0)}</div><div><div className="review-meta"><strong>{name}</strong><span>{date}</span><span className="spoiler-label"><ShieldCheck size={11} /> Spoiler-free</span></div><Rating value={4.8} small /><p>{text}</p></div></article>
}

function FinderModal({ onClose, onOpenBook, onToggleSaved, savedIds, onToast }) {
  const [step, setStep] = useState(1)
  const [prefs, setPrefs] = useState({ genre: 'Surprise me', moods: ['Curious'], length: 'Any length', type: 'Fiction', level: 'Any level', romance: 'Open to it', setting: 'Anywhere', period: 'Any era', language: 'English', series: 'Either', liked: '' })
  const [recommendations, setRecommendations] = useState(null)
  const update = (key, value) => setPrefs((current) => ({ ...current, [key]: value }))
  const toggleMood = (mood) => setPrefs((current) => ({ ...current, moods: current.moods.includes(mood) ? current.moods.filter((item) => item !== mood) : [...current.moods, mood] }))
  const generate = () => {
    const ranked = allBooks.map((book) => {
      let score = getMatch(book)
      if (prefs.genre !== 'Surprise me' && getBookGenre(book).toLowerCase().includes(prefs.genre.toLowerCase().slice(0, 5))) score += 12
      if (prefs.length === 'Short' && book.pages < 300) score += 8
      if (prefs.length === 'Long' && book.pages > 450) score += 8
      if (prefs.level === 'Beginner' && ['Beginner', 'Easy'].includes(getBookDifficulty(book))) score += 9
      if (prefs.moods.some((mood) => getBookMoodTags(book).some((tag) => tag.toLowerCase().includes(mood.toLowerCase().slice(0, 5))))) score += 10
      return { ...book, finderScore: Math.min(99, score) }
    }).sort((a, b) => b.finderScore - a.finderScore)
    setRecommendations(ranked.slice(0, 5))
  }
  return <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><section className="finder-modal" role="dialog" aria-modal="true" aria-labelledby="finder-title"><header className="finder-header"><div className="finder-brand"><span><Sparkles size={17} /></span><div><span className="eyebrow-label">BOOKVERSE / PERSONAL FINDER</span><h2 id="finder-title">Let’s find your kind of book.</h2></div></div><IconButton label="Close AI Book Finder" onClick={onClose}><X size={20} /></IconButton></header>{recommendations ? <div className="finder-results"><div className="finder-results-intro"><div><span className="eyebrow-label">YOUR PERSONAL SHELF / 05 PICKS</span><h3>Books with a little <em>something</em> for you.</h3><p>Based on your choices, these are the doors I’d nudge you toward first.</p></div><button className="text-button" onClick={() => setRecommendations(null)}>Change answers <Settings2 size={14} /></button></div><div className="finder-result-list">{recommendations.map((book, index) => <div className="finder-result" key={book.id}><span className="finder-result-number">0{index + 1}</span><BookCover book={book} size="small" /><div className="finder-result-main"><div><MatchBadge value={book.finderScore} /><span className="finder-genre">{getBookGenre(book)}</span></div><h4>{book.title}</h4><p>{book.author}</p><span className="finder-reason"><Sparkles size={13} /> {book.why || `A ${getBookGenre(book).toLowerCase()} pick with the pace and atmosphere you selected.`}</span><div className="finder-result-actions"><button onClick={() => onOpenBook(book)}>Read details <ArrowUpRight size={13} /></button><button onClick={() => onToggleSaved(book)}>{savedIds.includes(book.id) ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}</button></div></div></div>)}</div><div className="finder-footer"><ShieldCheck size={15} /> Your answers stay on this device. Recommendations can be reset anytime.</div></div> : <div className="finder-body"><aside className="finder-progress"><span>01</span><i className="is-active" /><small>YOUR MOOD</small><span>02</span><i className={step >= 2 ? 'is-active' : ''} /><small>YOUR DETAILS</small><span>03</span><i className={step >= 3 ? 'is-active' : ''} /><small>YOUR SHELF</small><div className="finder-progress-note"><WandSparkles size={17} /><p>There’s no perfect answer. “I don’t know yet” is a perfectly good place to start.</p></div></aside><div className="finder-questions">{step === 1 && <><div className="finder-step-heading"><span className="eyebrow-label">STEP 01 / START WITH A FEELING</span><h3>What are you in the mood for?</h3><p>Pick anything that sounds even slightly like you.</p></div><div className="question-grid question-grid--moods">{moodOptions.map((mood) => <button key={mood.label} className={`finder-mood${prefs.moods.includes(mood.label) ? ' is-active' : ''}`} style={{ '--mood-color': mood.color }} onClick={() => toggleMood(mood.label)}><span>{mood.emoji}</span><strong>{mood.label}</strong>{prefs.moods.includes(mood.label) && <Check size={14} />}</button>)}</div><div className="finder-next-row"><span>{prefs.moods.length || 'No'} mood{prefs.moods.length === 1 ? '' : 's'} selected</span><button className="dark-button" onClick={() => setStep(2)}>Next: a few details <ArrowRight size={16} /></button></div></>}{step === 2 && <><div className="finder-step-heading"><span className="eyebrow-label">STEP 02 / ADD A LITTLE CONTEXT</span><h3>What else should we know?</h3><p>These are optional, but they make the recommendations feel more like you.</p></div><div className="question-form"><QuestionSelect label="Genre" value={prefs.genre} options={['Surprise me', ...genres.map((genre) => genre.name), 'Fiction', 'Nonfiction']} onChange={(value) => update('genre', value)} /><QuestionSelect label="How long should it be?" value={prefs.length} options={['Any length', 'Short', 'Medium', 'Long']} onChange={(value) => update('length', value)} /><QuestionSelect label="Fiction or nonfiction?" value={prefs.type} options={['Fiction', 'Nonfiction', 'Either']} onChange={(value) => update('type', value)} /><QuestionSelect label="How difficult should it be?" value={prefs.level} options={['Any level', 'Beginner', 'Easy', 'Intermediate', 'Advanced']} onChange={(value) => update('level', value)} /><QuestionSelect label="Romance?" value={prefs.romance} options={['Open to it', 'Yes, bring it on', 'A little', 'No thanks']} onChange={(value) => update('romance', value)} /><QuestionSelect label="Setting" value={prefs.setting} options={['Anywhere', 'City', 'Small town', 'Nature', 'Space', 'Historical']} onChange={(value) => update('setting', value)} /></div><label className="liked-input"><span>Books you already love <small>optional</small></span><input value={prefs.liked} onChange={(event) => update('liked', event.target.value)} placeholder="e.g. Piranesi, The Night Circus…" /></label><div className="finder-next-row"><button className="back-button" onClick={() => setStep(1)}><ArrowLeft size={15} /> Back</button><button className="dark-button" onClick={generate}>Show me my shelf <Sparkles size={16} /></button></div></>}{step === 3 && <div className="finder-ready"><div className="ready-orbit"><Sparkles size={30} /></div><span className="eyebrow-label">YOUR READING ORBIT</span><h3>Ready to meet<br />your next book?</h3><p>We found a few places to start from your mood, your pace, and the questions you tend to follow.</p><div className="ready-summaries"><span><Palette size={14} /> {prefs.moods.join(' + ')}</span><span><BookOpen size={14} /> {prefs.length === 'Any length' ? 'Any length' : `${prefs.length} read`}</span><span><Target size={14} /> {prefs.level === 'Any level' ? 'Any level' : prefs.level}</span></div><div className="finder-next-row"><button className="back-button" onClick={() => setStep(2)}><ArrowLeft size={15} /> Change details</button><button className="dark-button" onClick={generate}>Reveal my shelf <Sparkles size={16} /></button></div></div>}</div></div>}</section></div>
}

function QuestionSelect({ label, value, options, onChange }) {
  return <label className="question-select"><span>{label}</span><div><select value={value} onChange={(event) => onChange(event.target.value)}>{options.map((option) => <option key={option}>{option}</option>)}</select><ChevronDown size={15} /></div></label>
}

function ClueModal({ mode, onClose, onOpenBook }) {
  const [clue, setClue] = useState('')
  const [searched, setSearched] = useState(false)
  const results = useMemo(() => {
    const text = clue.toLowerCase().trim()
    if (!text) return []
    return allBooks.map((book) => { const terms = text.split(/\s+/).filter((word) => word.length > 3); const matchCount = terms.filter((word) => getBookText(book).includes(word)).length; return { book, confidence: Math.min(97, 54 + matchCount * 12), matched: terms.filter((word) => getBookText(book).includes(word)) } }).sort((a, b) => b.confidence - a.confidence).slice(0, 3)
  }, [clue])
  const heading = mode === 'quote' ? 'Find the book from a quote.' : 'Help me find that book.'
  const subheading = mode === 'quote' ? 'Paste a sentence you remember. We’ll show a short, spoiler-free match—not the passage itself.' : 'Tell us the bits you still have. A plot, a place, a character, a year, a feeling—any clue can start the trail.'
  return <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><section className="clue-modal" role="dialog" aria-modal="true" aria-labelledby="clue-title"><header className="clue-header"><div className="clue-icon">{mode === 'quote' ? <Quote size={21} /> : <CircleHelp size={21} />}</div><div><span className="eyebrow-label">BOOKVERSE / MEMORY SEARCH</span><h2 id="clue-title">{heading}</h2><p>{subheading}</p></div><IconButton label="Close memory search" onClick={onClose}><X size={20} /></IconButton></header><form className="clue-form" onSubmit={(event) => { event.preventDefault(); setSearched(true) }}>{mode === 'quote' ? <Quote size={19} /> : <Search size={19} />}<textarea autoFocus value={clue} onChange={(event) => { setClue(event.target.value); setSearched(false) }} placeholder={mode === 'quote' ? 'Paste a short sentence or line you remember…' : 'I read a book around 2015… it had a female detective, a missing child, and a town near a lake…'} /><button className="dark-button" type="submit">Search my memory <Sparkles size={15} /></button></form><div className="clue-prompts"><span>Try adding</span>{['plot', 'setting', 'character', 'mood', 'cover'].map((prompt) => <button key={prompt} onClick={() => setClue((current) => current ? `${current}, ${prompt}` : `I remember the ${prompt} was`)}>+ {prompt}</button>)}</div>{searched && <div className="clue-results">{results.length ? <><div className="clue-results-heading"><div><span className="eyebrow-label">POSSIBLE MATCHES</span><h3>Here’s where the trail leads.</h3></div><span>Clues, not conclusions</span></div>{results.map(({ book, confidence, matched }) => <button className="clue-result" key={book.id} onClick={() => onOpenBook(book)}><BookCover book={book} size="small" /><div><div className="clue-result-meta"><MatchBadge value={confidence} compact /><span>{getBookGenre(book)}</span></div><h4>{book.title}</h4><p>{book.author}</p><span className="clue-explanation"><Check size={12} /> {matched.length ? `Your clues match: ${matched.join(', ')}.` : 'A nearby possibility based on the atmosphere of your memory.'}</span></div><ArrowUpRight size={16} /></button>)}</> : <div className="no-results no-results--small"><span className="no-results-icon"><SearchX size={24} /></span><h3>That trail is still a little quiet.</h3><p>Try one more concrete clue, like a character, a year, or a place.</p></div>}</div>}{!searched && <div className="clue-empty"><span className="clue-empty-doodle">⌁</span><p>Search by the parts that feel most certain.<br />We’ll do the looking.</p></div>}<div className="clue-footer"><ShieldCheck size={14} /> No long passages are shown. Book information is linked to trusted external sources when available.</div></section></div>
}

function CompareModal({ booksToCompare, onClose, onOpenBook, onRemove }) {
  const rows = [{ label: 'Best suited for', key: 'best' }, { label: 'Genre', key: 'genre' }, { label: 'Rating', key: 'rating' }, { label: 'Pages', key: 'pages' }, { label: 'Published', key: 'year' }, { label: 'Reading difficulty', key: 'level' }, { label: 'Reading time', key: 'time' }, { label: 'Themes', key: 'themes' }, { label: 'Mood', key: 'mood' }, { label: 'Pace', key: 'pace' }, { label: 'Standalone / series', key: 'series' }]
  const valueFor = (book, key) => ({ best: book.pages < 300 ? 'Quick reading' : book.level === 'Advanced' ? 'Deep thinkers' : book.tags.includes('magic') ? 'Fantasy readers' : book.tags.includes('science') ? 'Curious minds' : 'A steady night in', genre: getBookGenre(book), rating: <Rating value={book.rating} small />, pages: book.pages, year: book.year, level: getBookDifficulty(book), time: formatMinutes(book.minutes), themes: book.tags.slice(0, 3).join(' · '), mood: getBookMoodTags(book).slice(0, 2).join(' · '), pace: book.pace, series: book.series || 'Standalone' }[key])
  return <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><section className="compare-modal" role="dialog" aria-modal="true" aria-labelledby="compare-title"><header className="compare-header"><div><span className="eyebrow-label">BOOKVERSE / SIDE BY SIDE</span><h2 id="compare-title">Let their strengths speak.</h2><p>No winner here. Just a clearer sense of where each book might fit.</p></div><IconButton label="Close comparison" onClick={onClose}><X size={20} /></IconButton></header><div className="compare-scroll"><div className="compare-table" style={{ '--compare-count': Math.max(2, booksToCompare.length) }}><div className="compare-row compare-row--head"><div className="compare-label" /><>{booksToCompare.map((book) => <div className="compare-book-head" key={book.id}><button className="compare-remove" onClick={() => onRemove(book)} aria-label={`Remove ${book.title}`}><X size={13} /></button><BookCover book={book} size="small" /><h3>{book.title}</h3><p>{book.author}</p><MatchBadge value={getMatch(book)} compact /></div>)}</></div>{rows.map((row) => <div className={`compare-row${row.key === 'best' ? ' compare-row--best' : ''}`} key={row.key}><div className="compare-label">{row.label}</div>{booksToCompare.map((book) => <div className="compare-value" key={book.id}>{valueFor(book, row.key)}</div>)}</div>)}</div></div><div className="compare-footer"><span><ShieldCheck size={14} /> Preference signals are based on the filters and recommendations you can see.</span><button className="dark-button" onClick={onClose}>Back to browsing <ArrowRight size={15} /></button></div></section></div>
}

function ShuffleIcon() { return <span className="shuffle-icon">✣</span> }
function CalendarIcon() { return <span className="calendar-icon">▣</span> }
function VolumeIcon() { return <span className="volume-icon">◌</span> }
function HeadphoneIcon() { return <span className="headphone-icon">◖</span> }
function DetailFact({ label, value, muted }) { return <div className={muted ? 'is-muted' : ''}><span>{label}</span><strong>{value}</strong></div> }

function App() {
  const [activePage, setActivePage] = useState('home')
  const [query, setQuery] = useState('')
  const [savedIds, setSavedIds] = useState(() => readStorage('bookverse-saved', ['piranesi', 'project-hail-mary']))
  const [reading, setReading] = useState(() => readStorage('bookverse-reading', defaultReading))
  const [theme, setTheme] = useState(() => readStorage('bookverse-theme', 'light'))
  const [reduceMotion, setReduceMotion] = useState(() => readStorage('bookverse-reduce-motion', false))
  const [fontScale, setFontScale] = useState(1)
  const [selectedBook, setSelectedBook] = useState(null)
  const [compareIds, setCompareIds] = useState([])
  const [compareOpen, setCompareOpen] = useState(false)
  const [finderOpen, setFinderOpen] = useState(false)
  const [clueMode, setClueMode] = useState(null)
  const [toast, setToast] = useState('')
  const [mobileNav, setMobileNav] = useState(false)
  const [activeGenre, setActiveGenre] = useState('All genres')
  const [activeMoods, setActiveMoods] = useState([])
  const [filters, setFilters] = useState({ genre: 'Any', difficulty: 'Any', length: 'Any', mood: 'Any', year: 'Any', standalone: false })
  const searchRef = useRef(null)
  const toastTimer = useRef(null)
  const [surpriseIndex, setSurpriseIndex] = useState(0)

  useEffect(() => { localStorage.setItem('bookverse-saved', JSON.stringify(savedIds)) }, [savedIds])
  useEffect(() => { localStorage.setItem('bookverse-reading', JSON.stringify(reading)) }, [reading])
  useEffect(() => { localStorage.setItem('bookverse-theme', JSON.stringify(theme)) }, [theme])
  useEffect(() => { localStorage.setItem('bookverse-reduce-motion', JSON.stringify(reduceMotion)) }, [reduceMotion])
  useEffect(() => { document.body.classList.toggle('dark-mode', theme === 'dark'); document.body.classList.toggle('reduce-motion', reduceMotion); document.body.style.setProperty('--font-scale', fontScale) }, [theme, reduceMotion, fontScale])
  useEffect(() => { const onKey = (event) => { if (event.key === '/' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) { event.preventDefault(); setActivePage('search'); window.setTimeout(() => document.querySelector('.search-large-bar input')?.focus(), 50) } if (event.key === 'Escape') { setSelectedBook(null); setFinderOpen(false); setClueMode(null); setCompareOpen(false) } }; window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey) }, [])

  const showToast = (message) => { setToast(message); clearTimeout(toastTimer.current); toastTimer.current = setTimeout(() => setToast(''), 2600) }
  const navigate = (page, options = {}) => { setActivePage(page); setMobileNav(false); if (options.moodFocus) setActiveMoods((current) => current.length ? current : ['Curious']); if (options.genre) { setActiveGenre(options.genre); setActivePage('discover') } if (options.query !== undefined) setQuery(options.query); window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }) }
  const openBook = (book) => { if (book) setSelectedBook(book) }
  const toggleSaved = (book) => { const already = savedIds.includes(book.id); setSavedIds((current) => already ? current.filter((id) => id !== book.id) : [...current, book.id]); showToast(already ? `Removed “${book.title}” from your shelf.` : `Saved “${book.title}” for later.`) }
  const toggleCompare = (book) => { setCompareIds((current) => { if (current.includes(book.id)) return current.filter((id) => id !== book.id); if (current.length >= 4) { showToast('You can compare up to four books at a time.'); return current } return [...current, book.id] }) }
  const surprise = () => { const available = allBooks.filter((book) => !savedIds.includes(book.id)); const book = available[(surpriseIndex + 1) % available.length] || allBooks[0]; setSurpriseIndex((current) => current + 1); setSelectedBook(book); showToast('A little serendipity, just for you.') }
  const openClues = (mode) => setClueMode(mode)
  const intent = useMemo(() => { const text = query.toLowerCase(); const found = []; if (/mystery|detective|thriller|crime/.test(text)) found.push('Mystery'); if (/romance|love|romantic/.test(text)) found.push('Romance'); if (/short|quick|under \d+ pages|3 hours/.test(text)) found.push('Short read'); if (/beginner|easy|accessible/.test(text)) found.push('Accessible'); if (/dark|thought|philosoph/.test(text)) found.push('Thought-provoking'); if (/future|space|ai|artificial intelligence/.test(text)) found.push('Futuristic'); if (/happy ending|uplifting|cozy/.test(text)) found.push('Warm tone'); return found }, [query])
  const didYouMean = /poter|potter/.test(query) && !/potter/.test(query) ? 'Harry Potter' : ''
  const results = useMemo(() => {
    const text = query.toLowerCase().trim()
    const terms = text.split(/\s+/).filter((word) => word.length > 2 && !searchStopWords.has(word))
    const typoCorrected = text.includes('poter') ? `${text} potter` : text
    const correctedTerms = typoCorrected.split(/\s+/).filter((word) => word.length > 2 && !searchStopWords.has(word))
    return allBooks.map((book) => {
      const searchText = getBookText(book)
      let score = getMatch(book) / 2
      if (text) {
        const matchedTerms = terms.filter((term) => searchText.includes(term))
        const correctedMatches = correctedTerms.filter((term) => searchText.includes(term))
        const bestMatchCount = Math.max(matchedTerms.length, correctedMatches.length)
        if (bestMatchCount === 0) score = 0
        else score = Math.min(96, bestMatchCount * 17 + (bestMatchCount / Math.max(1, terms.length)) * 35)
        if (book.title.toLowerCase() === text) score += 100
        if (book.title.toLowerCase().startsWith(text)) score += 50
        if (book.author.toLowerCase().includes(text)) score += 45
        if (terms.length > 3 && matchedTerms.length / terms.length > 0.4) score += 10
        if (score < 18) score = 0
      }
      if (filters.genre !== 'Any' && !(getBookGenre(book).toLowerCase().includes(filters.genre.toLowerCase().slice(0, 5)) || zoneById[book.zone]?.name.toLowerCase().includes(filters.genre.toLowerCase()))) score = 0
      if (filters.difficulty !== 'Any' && getBookDifficulty(book) !== filters.difficulty) score = 0
      if (filters.length === 'Under 200 pages' && book.pages >= 200) score = 0
      if (filters.length === '200–300 pages' && (book.pages < 200 || book.pages > 300)) score = 0
      if (filters.length === '300–500 pages' && (book.pages <= 300 || book.pages > 500)) score = 0
      if (filters.length === '500+ pages' && book.pages < 500) score = 0
      if (filters.length === 'I only have 3 hours' && book.minutes > 180) score = 0
      if (filters.mood !== 'Any' && !getBookMoodTags(book).some((mood) => mood.toLowerCase().includes(filters.mood.toLowerCase()))) score = 0
      if (filters.year !== 'Any') { const ranges = { 'Before 1980': [0, 1979], '1980s': [1980, 1989], '1990s': [1990, 1999], '2000s': [2000, 2009], '2010s': [2010, 2019], '2020s': [2020, 2030] }; const range = ranges[filters.year]; if (!range || book.year < range[0] || book.year > range[1]) score = 0 }
      if (filters.standalone && book.series) score = 0
      return { ...book, searchScore: score }
    }).filter((book) => book.searchScore > 0).sort((a, b) => b.searchScore - a.searchScore)
  }, [query, filters])

  const currentPage = useMemo(() => {
    const common = { savedIds, onOpenBook: openBook, onToggleSaved: toggleSaved, onCompare: toggleCompare, onNavigate: navigate, onToast: showToast }
    if (activePage === 'discover') return <DiscoverPage {...common} onOpenFinder={() => setFinderOpen(true)} onOpenClues={openClues} activeGenre={activeGenre} setActiveGenre={setActiveGenre} activeMoods={activeMoods} setActiveMoods={setActiveMoods} />
    if (activePage === 'search') return <SearchPage query={query} setQuery={setQuery} results={results} {...common} onOpenFinder={() => setFinderOpen(true)} onOpenClues={openClues} compareIds={compareIds} onSearch={() => { window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }) }} intent={intent} didYouMean={didYouMean} filters={filters} setFilters={setFilters} />
    if (activePage === 'library') return <LibraryPage {...common} reading={reading} setReading={setReading} />
    if (activePage === 'profile') return <ProfilePage {...common} onOpenBook={openBook} reduceMotion={reduceMotion} fontScale={fontScale} onFontScale={setFontScale} onToggleMotion={() => setReduceMotion((current) => !current)} />
    return <HomePage {...common} onOpenFinder={() => setFinderOpen(true)} onOpenClues={openClues} onSurprise={surprise} activeMoods={activeMoods} setActiveMoods={setActiveMoods} />
  }, [activePage, savedIds, reading, query, results, activeGenre, activeMoods, compareIds, filters, intent, didYouMean, theme, reduceMotion, fontScale])

  return <div className="app-root"><div className="app-noise" /><header className="topbar page-shell"><button className={`brand-lockup${activePage === 'home' ? ' is-home' : ''}`} onClick={() => navigate('home')} aria-label="BookVerse home"><span className="brand-icon"><i /><i /><i /></span><span className="brand-word">BOOK<span>VERSE</span></span><small>PERSONAL LIBRARY</small></button><nav className="desktop-nav" aria-label="Main navigation">{navItems.map((item) => <button key={item.id} className={activePage === item.id ? 'is-active' : ''} onClick={() => navigate(item.id)}>{item.label}{item.id === 'library' && savedIds.length > 0 && <span className="nav-count">{savedIds.length}</span>}</button>)}</nav><div className="topbar-actions"><button className="header-search-trigger" onClick={() => navigate('search')}><Search size={16} /><span>Search books</span><kbd>/</kbd></button><IconButton label="Toggle color theme" onClick={() => setTheme((current) => current === 'light' ? 'dark' : 'light')}>{theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}</IconButton><button className="profile-trigger" onClick={() => navigate('profile')} aria-label="Open profile"><span>AV</span></button><button className="mobile-menu-trigger" onClick={() => setMobileNav((current) => !current)} aria-label="Toggle menu">{mobileNav ? <X size={20} /> : <Menu size={20} />}</button></div></header>{mobileNav && <div className="mobile-nav page-shell">{navItems.map((item) => <button key={item.id} className={activePage === item.id ? 'is-active' : ''} onClick={() => navigate(item.id)}>{item.label}<ArrowRight size={15} /></button>)}<button className={activePage === 'profile' ? 'is-active' : ''} onClick={() => navigate('profile')}>Profile<ArrowRight size={15} /></button><button onClick={() => { setMobileNav(false); setFinderOpen(true) }}><WandSparkles size={15} /> AI Book Finder<ArrowRight size={15} /></button></div>}<main>{currentPage}</main><footer className="site-footer page-shell"><div className="footer-brand"><button className="brand-lockup" onClick={() => navigate('home')}><span className="brand-icon"><i /><i /><i /></span><span className="brand-word">BOOK<span>VERSE</span></span></button><p>A personal AI librarian for the stories still waiting to find you.</p></div><div className="footer-links"><div><span>EXPLORE</span><button onClick={() => navigate('discover')}>Discover</button><button onClick={() => navigate('search')}>Search</button><button onClick={() => setFinderOpen(true)}>AI Book Finder</button></div><div><span>YOUR SPACE</span><button onClick={() => navigate('library')}>Library</button><button onClick={() => navigate('profile')}>Profile</button><button onClick={() => showToast('Reading paths are coming together in Discover.')}>Reading paths</button></div><div><span>QUIET CORNER</span><button onClick={() => showToast('Accessibility settings are available in Profile.')}>Accessibility</button><button onClick={() => showToast('BookVerse never shows long copyrighted passages.')}>Copyright & AI safety</button><button onClick={() => showToast('Guest mode is on. Your shelf is saved on this device.')}>Guest mode</button></div></div><div className="footer-bottom"><span>© 2026 BookVerse</span><span>Made for curious minds <i>✦</i></span><span>Data sources: trusted library catalogs & editorial metadata</span></div></footer>{compareIds.length > 0 && <div className="compare-tray"><div className="compare-tray-books">{compareIds.slice(0, 4).map((id) => { const book = allBooks.find((item) => item.id === id); return <span key={id} title={book.title}><BookCover book={book} size="tiny" /></span> })}<button className="compare-tray-add" onClick={() => { if (compareIds.length >= 2) setCompareOpen(true) }}><Layers3 size={17} /><span>{compareIds.length < 2 ? 'Add one more' : 'Compare books'}</span></button></div><span className="compare-tray-label">{compareIds.length}/4 selected</span></div>}{selectedBook && <BookDetailModal book={selectedBook} saved={savedIds.includes(selectedBook.id)} onClose={() => setSelectedBook(null)} onToggleSaved={toggleSaved} onOpenBook={openBook} onCompare={toggleCompare} compareSelected={compareIds.includes(selectedBook.id)} onToast={showToast} />}{finderOpen && <FinderModal onClose={() => setFinderOpen(false)} onOpenBook={(book) => { setFinderOpen(false); openBook(book) }} onToggleSaved={toggleSaved} savedIds={savedIds} onToast={showToast} />}{clueMode && <ClueModal mode={clueMode} onClose={() => setClueMode(null)} onOpenBook={(book) => { setClueMode(null); openBook(book) }} />}{compareOpen && <CompareModal booksToCompare={compareIds.map((id) => allBooks.find((book) => book.id === id)).filter(Boolean)} onClose={() => setCompareOpen(false)} onRemove={(book) => { toggleCompare(book); if (compareIds.length <= 1) setCompareOpen(false) }} onOpenBook={openBook} />}{toast && <div className="toast-message" role="status"><CheckCircle2 size={17} /><span>{toast}</span><button onClick={() => setToast('')} aria-label="Dismiss notification"><X size={14} /></button></div>}</div>
}

export default App
