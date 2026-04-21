# Karta e Ditës

`Karta e Ditës` is a small React + Vite web app for a daily manifestation ritual.
The app lets a user set their name, draw one card per day, flip it with a premium animated card interaction, track progress across the full deck, and install the app as a PWA.

## Features

- Daily card draw stored in `localStorage`
- Card progress tracking across the full deck
- Light and dark theme support
- Mobile-friendly animated card flip interaction
- Installable PWA with manifest and service worker
- Centralized editable UI copy in `src/data/ui-content.json`

## Stack

- React 18
- TypeScript
- Vite 5
- Tailwind CSS
- Framer Motion
- React Router
- Vitest
- `vite-plugin-pwa`

## Getting Started

Requirements:

- Node.js 18+ recommended
- npm

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The app runs on `http://localhost:8080`.

## Scripts

Run from the project root.

Development server:

```bash
npm run dev
```

Production build:

```bash
npm run build
```

Development-mode build:

```bash
npm run build:dev
```

Preview the production build:

```bash
npm run preview
```

Run tests once:

```bash
npm run test
```

Run tests in watch mode:

```bash
npm run test:watch
```

Run a single test file:

```bash
npx vitest run src/test/example.test.ts
```

or:

```bash
npm run test -- src/test/example.test.ts
```

Run a single named test:

```bash
npm run test -- src/test/example.test.ts -t "should pass"
```

Run lint:

```bash
npm run lint
```

Note: lint may still surface pre-existing repo issues. Treat those separately from any new changes you make.

## Project Structure

```text
.
├── public/                  # favicon, app icons, manifest, static assets
├── src/
│   ├── components/          # app-specific React components
│   ├── data/                # cards data and centralized UI copy
│   ├── lib/                 # storage and helper logic
│   ├── pages/               # routed pages
│   ├── test/                # test setup and example test
│   ├── App.tsx              # router shell
│   └── main.tsx             # app entry + PWA registration
├── index.html
├── tailwind.config.ts
├── vite.config.ts
└── AGENTS.md
```

Important app files:

- `src/pages/Index.tsx`: main experience
- `src/components/ManifestationCard.tsx`: flip card UI
- `src/components/Header.tsx`: theme toggle and header chrome
- `src/components/OnboardingModal.tsx`: user name onboarding
- `src/lib/manifestation.ts`: storage keys and app state helpers
- `src/data/cards.ts`: card deck content
- `src/data/ui-content.json`: centralized UI strings

## Content Editing

There are two main content sources in the app.

UI copy:

- Edit `src/data/ui-content.json` to update labels, headings, onboarding text, greetings, footer text, and 404 text.

Card content:

- Edit `src/data/cards.ts` to update manifestation card titles, body copy, and categories.

## Persistence

The app stores user state in `localStorage` via `src/lib/manifestation.ts`.

Current keys:

- `mc.userName`
- `mc.viewedCardIds`
- `mc.todayDraw`
- `mc.theme`

This means the app remembers:

- the entered user name
- which cards have already been seen
- the current day’s card
- selected light/dark theme

## PWA Support

The app is configured as a Progressive Web App.

Included:

- web manifest: `public/site.webmanifest`
- app icons in `public/`
- service worker generation through `vite-plugin-pwa`
- registration in `src/main.tsx`

Production build output includes:

- `manifest.webmanifest`
- `sw.js`
- Workbox runtime files

To test the installed/offline experience locally:

1. Run `npm run build`
2. Run `npm run preview`
3. Open the preview URL in a browser
4. Check installability in DevTools or on mobile

## Styling And Theming

- Tailwind is used for layout and styling
- design tokens live in `src/index.css` and `tailwind.config.ts`
- dark mode is class-based using `.dark`
- theme changes also update the mobile browser `theme-color` meta tag

## Testing

Vitest is configured with:

- `jsdom`
- global APIs enabled
- setup file: `src/test/setup.ts`

Current automated coverage is minimal, so if you change storage, routing, theme, or card behavior, add focused tests where appropriate.

## Notes For Contributors

- Prefer small, local changes over broad refactors
- Match the existing visual language: premium, typography-heavy, animated
- Keep user-facing copy centralized in `src/data/ui-content.json` when adding new UI text
- Reuse helpers from `src/lib/manifestation.ts` for storage changes
- Preserve mobile behavior and dark mode when changing layout or styling

For repository-specific implementation guidance for coding agents, see `AGENTS.md`.
