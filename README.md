# Lessons & Formative Quizzes (Single-Page Build)

This project contains a single Next.js page implementation based on the provided UI reference, plus a sample API route for assessment data.

## What is implemented

- One-page Lessons and Formative Quizzes experience in `app/page.tsx`
- Mock API endpoint in `app/api/assessments/route.ts`
- Card list with search and sort controls
- Loading skeleton shimmer state and scroll fade overlays
- Animated progress bars with reduced-motion support
- Provided icon assets wired from `public/icons`
- Color palette sourced from `app/colors.ts`

## API

Endpoint:

- `GET /api/assessments`

Response shape:

```json
{
  "assessments": [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "scheduledDate": "string | null",
      "lastActivity": "string",
      "lesson": { "correct": 0, "total": 25, "percent": 0, "enabled": false },
      "independent": {
        "correct": 0,
        "total": 25,
        "percent": 0,
        "enabled": false
      },
      "continuous": {
        "correct": 0,
        "total": 25,
        "percent": 0,
        "enabled": false
      },
      "formative": { "correct": 0, "total": 25, "percent": 0, "enabled": true },
      "peerCount": 0
    }
  ]
}
```

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Notes

- This is intentionally scoped to one page only.
- The UI is data-driven from the mock API so it can be replaced by a real backend later without changing the card rendering structure.
