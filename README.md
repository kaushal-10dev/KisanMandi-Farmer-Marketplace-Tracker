# KisanMandi AI — Farmer Marketplace Tracker

A Smart India Hackathon 2026 concept prototype for **SIH26132: Strengthening market linkages and price discovery for farmers**. Team: **Astra_6**. Theme organization: Government of Maharashtra. Category: Software.

## Features in this repository
- Responsive farmer-oriented dashboard and crop/location inputs.
- Illustrative mandi comparison that estimates net price after sample transport costs.
- Seven-day sample trend chart.
- Browser voice input where Web Speech Recognition is supported.
- Concept cards for buyer/FPO connection and price alerts.
- Express API endpoints for health, basic mandi, sample prices and illustrative forecast data.
- Smoke tests for frontend files and API endpoints.

## Important: demo data
The market prices and 7-day series in the current interface are **illustrative sample values**, not live mandi data or validated AI predictions. The API uses seeded in-memory sample data. Buyer-connect and price-alert actions are concept demonstrations only. Do not use this prototype to make real selling decisions without checking official current prices, transport costs and buyer details.

## Technology
- Frontend: HTML5, CSS3, vanilla JavaScript
- Server: Node.js and Express
- Demo API data: in-memory JavaScript data
- Voice: Browser Web Speech API where supported

## Run locally
Requires Node.js and npm.

```bash
npm install
npm start
```

Open `http://localhost:5000`.

## Tests
With the app running in one terminal, run these commands in a second terminal:

```bash
npm test
npm run test:frontend
```

## Smart India Hackathon details
- Problem Statement ID: **SIH26132**
- Problem Statement: **Strengthening market linkages and price discovery for farmers**
- Team: **Astra_6**
- Track: Software

## Research
See [`RESEARCH_AND_REFERENCES.md`](RESEARCH_AND_REFERENCES.md). The links are starting points from the SIH idea presentation; they do not imply partnerships or production access to any data feed.

## Scope and limitations
This repository currently contains a lightweight working prototype scaffold based on the project idea and notes. It is **not a complete transfer of the originally uploaded ZIP**. Authenticated buyer matching, a persistent SQLite database, live official mandi feeds, a validated forecasting model, real alerts and transactional payments are not currently implemented. The original ZIP should be merged into this repository before describing it as the complete original application.
