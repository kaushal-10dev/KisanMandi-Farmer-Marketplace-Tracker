# KisanMandi AI — Farmer Marketplace Tracker

A Smart India Hackathon 2026 prototype for **SIH26132: Strengthening market linkages and price discovery for farmers**. Team: **Astra_6**. Theme organization: Government of Maharashtra. Category: Software.

## What it aims to do
- Surface mandi/market-price information to help farmers compare selling options.
- Present a 7-day price forecast and trend analysis as decision-support features.
- Help farmers identify promising markets after considering location and expected transport-related costs.
- Support buyer/FPO discovery and multilingual voice interaction.
- Provide price-opportunity alerts and accessible farmer-oriented UI.

> This is a prototype/idea submission. Data-feed availability, forecast accuracy, buyer verification, payments, and other integrations must be validated before real-world use. Forecasts are informational and should not be treated as guaranteed prices or financial advice.

## Technology
- Frontend: HTML5, CSS3, vanilla JavaScript
- Backend/API: Node.js, Express
- Data persistence: SQLite (`node:sqlite` / `DatabaseSync` as described in the project)
- Browser voice interaction: Web Speech API
- Tests: Node.js test scripts under `tests/`

## Project structure
- `index.html` — main farmer marketplace interface
- `style.css` — styling and responsive UI
- `main.js` — frontend interactions
- `server.js` — backend/API server
- `db.js` — database and persistence logic
- `tests/` — frontend, API, voice, distance, buyer-connection and other test scripts
- `RESEARCH_AND_REFERENCES.md` — research/source notes
- `VOICE_ASSISTANT_PROMPT.md` — voice assistant prompt notes
- `research_slides.html` — project research/slide material

## Run locally
Requires a compatible Node.js version. See `package.json` for the exact scripts and dependencies.

```bash
npm install
npm start
```

If `npm start` is not defined in `package.json`, run the server using the script specified there (for example `node server.js`). Then open the local URL/port printed in the terminal. Database behavior depends on the Node.js version and the built-in `node:sqlite` support used by this project.

## Test
Install dependencies first, then run the test command defined in `package.json`, or execute an individual test from `tests/` with Node.js. Some tests may expect a running server or configured environment.

## Smart India Hackathon details
- Problem Statement ID: **SIH26132**
- Problem Statement: **Strengthening market linkages and price discovery for farmers**
- Team: **Astra_6**
- Track: Software

## Research references
See [`RESEARCH_AND_REFERENCES.md`](RESEARCH_AND_REFERENCES.md) for the project's source notes. Refer to official market data portals and the data providers' current terms before production use.

## Status
SIH 2026 prototype; features and external integrations should be tested and validated before deployment for actual farmers.
