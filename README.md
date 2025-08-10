
# Flexible Drag-and-Drop Planner Calendar (React + TS)

Production-ready scaffold for a planner calendar app with drag-and-drop, multi-view scheduling, keyboard-accessible interactions, and local/cloud persistence.

## Tech Stack
- React + TypeScript + Vite
- Tailwind CSS, shadcn-like UI primitives (local, no CLI step)
- Icons: lucide-react
- Drag & Drop: @dnd-kit/core (+ KeyboardSensor)
- State: Zustand
- Dates: date-fns
- Persistence:
  - Local (default): IndexedDB via `idb` (adapter stub in `features/events` repo layer)
  - Cloud: Supabase (auth + Postgres) via `VITE_PERSISTENCE=supabase` (adapter stub ready)
- Tooling: ESLint + Prettier + Vitest + Testing Library
- PWA: basic manifest included

## Getting Started

```bash
pnpm install
pnpm dev
```

### Scripts
- `pnpm dev` – start dev server
- `pnpm build` – type-check and build
- `pnpm preview` – preview production build
- `pnpm test` – run Vitest
- `pnpm seed` – generate `public/seed-events.json` mock events

### Env
Create `.env` (or `.env.local`) if you want cloud mode:

```
VITE_PERSISTENCE=local   # or supabase
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

## Structure

```
src/
  components/
  features/
    calendars/
    events/
    settings/
  lib/
  views/
```

- Centralized event store in `features/events/store.ts` using Zustand
- Small RRULE subset in `features/events/recurrence.ts` (daily/weekly/monthly via COUNT)
- DnD (pointer + keyboard) via `@dnd-kit/core`
- Views: Day/Week/Month/Agenda/Planner (Kanban by status)

## Accessibility
- Keyboard focus outlines and ARIA roles on interactive elements
- Keyboard DnD: focus event chip, press <Space> or <Enter>, then arrow keys can be wired to call `moveDrag(...)` (basic sample included).

## Notes / Next Steps
- The Supabase and IndexedDB adapters are stubbed—extend `repository` layer to persist `events` to your chosen backend.
- Add command palette (`Cmd/Ctrl+K`) for quick actions and shortcuts (`N`, `/`, arrows) – wiring points in header/app shell.
- Add filters/search and template features per spec (selectors + derived state). 
- Month view currently compact; expand with +N overflow popovers.
- Print styles and ICS import/export can be added under `lib/ics`.

## Testing
- Basic tests for recurrence and time math.
- Add DnD reducer tests for edge cases (overlap, snapping).

## Performance Target
- Use memoized selectors per view; keep derived calculations outside render where possible.
- Virtualize agenda lists if needed.

## License
MIT


---

## GitHub Pages Deployment

This repo includes a GitHub Actions workflow that builds and deploys to **GitHub Pages** on every push to `main`.

**Steps:**
1. Push the project to a new GitHub repository.
2. Go to **Settings → Pages**, set **Source** to **GitHub Actions**.
3. Push/merge to `main`. The workflow:
   - Sets `VITE_BASE` to `/${repo-name}/` automatically
   - Builds the app and creates a SPA fallback `404.html`
   - Deploys to GitHub Pages

Your site will be available at:
`https://<your-username>.github.io/<repo-name>/`


**Live URL after deployment:** https://jmscaustin1991.github.io/planner-calendar/
