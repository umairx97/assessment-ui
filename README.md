# Assessment Dashboard

Single-page Next.js dashboard that renders quiz cards from mock APIs, with split-loading behavior for card headers and metric subparts.

## Project goals and specifications

- Build one page only (no extra routes or flows).
- Match the provided design using Tailwind utilities and theme tokens.
- Keep UI data-driven through API routes.
- Use React Query for client-side data loading and caching.
- Use axios for API requests.
- Keep code easy to extend by separating page orchestration, UI components, API clients, and types.

## Tech stack

- Next.js App Router + TypeScript
- React 19
- Tailwind CSS v4 (tokenized via theme variables)
- @tanstack/react-query
- axios
- classnames
- next/font (Plus Jakarta Sans)

## Quick start

```bash
npm install
npm run dev
```

App URL: http://localhost:3000

Useful commands:

```bash
npm run lint
npm run build
npm run start
```

## High-level architecture

The page is intentionally split into layers so new developers can change behavior safely:

1. API layer: mock route handlers that return quiz data.
2. Client API layer: typed axios functions that call route handlers.
3. Page orchestration layer: React Query loading/error state, filter/sort state, list rendering.
4. UI components: reusable card and metric blocks.
5. Design system layer: Tailwind token definitions in global theme.

## Folder guide

```text
app/
  api/
    assessments/route.ts      # Canonical dataset and full assessment shape
    quizzes/route.ts          # Quiz header payload (faster endpoint)
    quiz-subparts/route.ts    # Metric payload (slower endpoint)
  components/
    AssessmentCard.tsx        # Full card UI and local interactions
    MetricBlock.tsx           # Single metric column with toggle + bars
    AssessmentSkeleton.tsx    # Card shell loading state
    SubpartsSkeleton.tsx      # Subparts-only loading state
  constants/
    quiz.ts                   # Metric group labels and keys
  lib/
    quiz-api.ts               # Axios request functions
    quiz-utils.ts             # Sorting helper(s)
  types/
    quiz.ts                   # Shared TS types for APIs/UI
  globals.css                # Tailwind theme tokens (colors, text, spacing, font)
  layout.tsx                 # Global layout + font + Providers wrapper
  providers.tsx              # React Query QueryClientProvider
  page.tsx                   # Main page composition and state
public/
  icons/                     # Design assets used by Image components
```

## Data flow (request to UI)

1. page.tsx runs two React Query queries:
   - GET /api/quizzes
   - GET /api/quiz-subparts
2. quizzes data renders card shell content immediately.
3. subparts data hydrates metric rows later (with a dedicated skeleton while loading).
4. AssessmentCard merges quiz + subparts by id and renders MetricBlock cells.

This split gives the intended staged-loading UX while keeping endpoint responsibilities clear.

## API contracts

### GET /api/assessments

Canonical full response. Contains every field for each card and metric.

### GET /api/quizzes

Header-focused payload:

- id
- title
- description
- scheduledDate
- lastActivity

### GET /api/quiz-subparts

Sub-row payload:

- id
- lesson
- independent
- continuous
- formative
- peerCount

Both split endpoints derive from the same canonical dataset to prevent data drift.

## Styling conventions

- Tailwind-first styling in component className strings.
- classnames is used to compose and conditionally apply utility classes.
- Theme tokens are defined in app/globals.css via @theme inline.
- Reuse semantic tokens (for example text-body, text-label, color tokens) instead of one-off values.
- Font is configured in layout.tsx through Plus Jakarta Sans and exposed as a CSS variable.

## Interaction behavior already implemented

- Search by title/description.
- Sort by scheduled date or last activity.
- Metric toggles are independent per card/metric cell.
- Monitor button has a loading state.
- Reload icon includes a press-to-spin loading animation.
- Progress bars animate on load and respect reduced motion.
- Lesson metric can hide mastery bar where required by the design.

## App metadata

- Browser/document title is set to “Assessment Dashboard” in app/layout.tsx.

## How to make common changes

### Add or edit assessment data

- Update app/api/assessments/route.ts.
- Split APIs update automatically because they map from the canonical dataset.

### Add a new metric column

1. Update metric type(s) in app/types/quiz.ts and API route mapping.
2. Add the label/key in app/constants/quiz.ts.
3. Render/update MetricBlock usage in app/components/AssessmentCard.tsx.

### Change visual tokens

- Update theme variables in app/globals.css.
- Prefer token changes over scattered class rewrites.

### Change fetch behavior or caching

- Update defaults in app/providers.tsx.
- Update request logic in app/lib/quiz-api.ts.

## Development notes

- Keep component responsibilities narrow (orchestration in page.tsx, rendering in components).
- Prefer extending existing types/constants over adding duplicate shapes.
- Run lint after UI or API changes.

## Future backend integration

To connect real APIs later, keep UI components unchanged and replace only:

- app/lib/quiz-api.ts request targets/transforms
- API route layer (or remove mock routes entirely)

Because types are centralized, this migration should remain low-risk.
