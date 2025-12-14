# LEAD — Participant Scoring & Reports

> Professional dashboard and scoring engine for participant assessments. This repository contains a Next.js frontend, a Node/Express backend API, and a Python Flask scoring engine which computes participant reports from responses.

---

## Product demo


<video controls width="840">
  <source src="/demo.mov" type="video/quicktime">
  Your browser does not support the inline player. Click the link to open the demo: [demo.mov](/demo.mov)
</video>

Demo file: `/demo.mov` (repo root)

---

## Contents

- `frontend/lead` — Next.js (app-router) frontend (React + Tailwind).
- `backend` — Node.js/Express API and services (MySQL database access).
- `backend/flask_engine` — Python Flask scoring service that computes reports.
- `lead.sql` — database schema and sample seed data.
- `company_report*.py`, `participant_report*.py` — utilities and report templates (Python).

---

## Quick Overview

This project implements a workshop/assessment flow:

- Admins create a `session` (company + session meta).
- Sessions have a public `link_token` that exposes an anonymous form at `/[token]`.
- Anonymous respondents become `participants` and their `responses` (1–5) are saved.
- A server-side scoring process (Flask service) computes a `result_json` per participant and stores it in `results`.
- The dashboard (Next.js) shows Users, Company, Reports, and Settings and includes analytics.

---

## Prerequisites

- Node.js (16+ recommended)
- npm or yarn
- Python 3.8+ (for Flask scoring engine)
- MySQL / MariaDB (database)

Mac (zsh) example package installs:

```bash
# Frontend
cd frontend/lead
npm install

# Backend
cd ../../backend
npm install
```

---

- Use `demo.mov` (QuickTime) or `demo.mp4` (more broadly supported). GitHub will display inline for some formats; if not, users can download and play locally.
If you want, provide the `demo.mov` file and I will add it to the repo root and update the README to reference it.

---
- `report_files` — optional generated HTML/PDF paths for persisted reports.

The full schema and sample data are in `lead.sql`.

---

## Running the system (development)

1. Start the database and load `lead.sql` (or use your own DB):

```sql
CREATE DATABASE lead;
USE lead;
-- import lead.sql
```

2. Start the backend API

```bash
cd backend
npm run dev   # or `node src/server.js` depending on your setup
```

3. Start the Flask scoring engine

```bash
cd backend/flask_engine
source .venv/bin/activate
python app.py
```

4. Start the frontend

```bash
cd frontend/lead
npm run dev
```

Open `http://localhost:3000` (or the port your Next.js dev server uses) and sign in to the dashboard.

Notes:
- The frontend expects the backend API to be available at `NEXT_PUBLIC_API_BASE`.
- The processing flow (`POST /api/process/:participant_id`) sends participant data to the Flask engine at `http://localhost:4000/process`. Ensure the Flask service is running.

---

## API Reference (important endpoints)

Base: `/api`

- `GET /api/sessions` — list sessions (now returns `link_token` joined from `session_links`).
- `GET /api/sessions/:id` — get session by id.
- `GET /api/sessions/link/:token` — get session by public token.
- `POST /api/sessions` — create a session.
- `GET /api/questions` — list questions (DB-driven; answers are 1–5).
- `GET /api/participants/:session_id` — list participants for a session.
- `POST /api/process/:participant_id` — trigger scoring for a participant (calls Flask engine and stores `results`).
- `GET /api/results` — list results (supports `?session_id=` filter).
- `GET /api/results/:participant_id` — fetch a single result for a given participant.

Use the frontend helper `frontend/lead/app/lib/api.ts` for concrete fetch examples.

---

## Frontend structure (quick map)

- `frontend/lead/app/` — Next.js app router pages and components.
  - `app/dashboard/*` — admin dashboard pages: `users`, `company`, `reports`, `settings`.
  - `app/components/Sidebar.tsx` — left drawer navigation.
  - `app/components/DashboardAnalytics.tsx` — analytics panel (now computes live metrics and includes a simple SVG chart).
  - `app/[token]/PublicFormClient.tsx` — public anonymous form for token links.

The frontend uses `app/lib/api.ts` as a thin API client.

---

## Scoring engine (Flask)

The Flask app in `backend/flask_engine` receives POSTs at `/process` with payload `{ participant, responses, questions }` and returns a JSON report object. The Node backend calls it when processing a participant:

- `backend/src/services/process.service.js` constructs payload and calls `http://localhost:4000/process`.

The scoring logic is in `backend/flask_engine/scoring/` (metrics, matrices, pillars, insights, etc.).

---

## Dashboard analytics & charts

- `app/components/DashboardAnalytics.tsx` now fetches `sessions`, `reports`, and per-session participants to calculate:
  - total participants
  - distinct companies
  - total reports
  - average scores (T and raw)
  - recent reports list
  - lightweight SVG chart: reports per company

Performance note: current participant counting fetches participants per session (multiple API calls). For production or many sessions, add a single backend aggregation endpoint (recommended) to return totals in one call.

---

## Demo Video

A short walkthrough video helps new users and reviewers quickly understand the main flows: creating sessions, sharing public links, filling anonymous forms, generating reports, and viewing analytics.

Recommended options to include the demo:

- Host on YouTube (recommended) and add the public link in the README:

  [Watch demo on YouTube](https://youtu.be/REPLACE_WITH_VIDEO_ID)

- Or keep a local demo in the repository at `docs/demo.mp4` and reference it from the README. GitHub will render an inline video tag in some views, or users can download/play locally.

Embedding examples (use one):

Markdown link to YouTube (portable):

```md
[Watch demo on YouTube](https://youtu.be/REPLACE_WITH_VIDEO_ID)
```

HTML5 video tag for a local file (add `docs/demo.mp4` to repo):

```html
<video controls width="720">
  <source src="docs/demo.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
```

Suggested demo script (90–180s):

1. Dashboard overview and left-side navigation (Users, Company, Reports, Settings).
2. Create a session and copy the public token link.
3. Open the public form (anonymous), fill a few answers (1–5) and submit.
4. Generate the report for the participant from the Users page and show the stored report in Reports.
5. Quick look at DashboardAnalytics and the SVG chart.

Notes:

- Replace `REPLACE_WITH_VIDEO_ID` with your YouTube video id once uploaded.
- If you prefer I can upload a demo video file into `docs/` and update the README with a working local embed.

---

## Troubleshooting & common issues

- Flask engine exits / not running: If `POST /api/process/:id` fails, check `backend/flask_engine/app.py` logs and ensure required Python packages are installed.
- Backend nodemon exit code 130: indicates it was killed (SIGINT). Restart with `npm run dev` and inspect server logs.
- Missing `link_token` on sessions: ensure `session_links` table rows exist. The backend was updated to LEFT JOIN `session_links` when listing sessions.
- Chart shows "No data": there may be no `results` rows in the DB. Use the sample `lead.sql` or generate reports via the dashboard (Generate Report) to populate.

---

## Development tips

- Add an aggregate endpoint (e.g., `GET /api/analytics/summary`) that returns counts and averages in one DB query for performance.
- For richer charts, integrate a chart library in the frontend (Recharts, Chart.js, or ApexCharts). Replace the lightweight SVG for interactivity.
- Add server-side caching for `/api/sessions` and `/api/results` if you expect high read volume.

---

## Contributing

1. Create a feature branch: `git checkout -b feat/your-change`
2. Run linters / tests (if present).
3. Open a PR with a description and testing notes.

---

If you want, I can:

- Add a single endpoint for analytics aggregation (backend change).
- Integrate a chart library and replace the SVG chart.
- Add a small README section showing how to generate sample data and run a smoke test.

---

**Copyright & Ownership**

- **Developer:** Ashutosh Srivastava
- **Owner:** Windikate Technologies Pvt. Ltd.

© 2025 Windikate Technologies Pvt. Ltd. All rights reserved.
