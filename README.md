# KisanMandi AI — Farmer Marketplace Tracker

A Smart India Hackathon 2026 prototype for **SIH26132: Strengthening market linkages and price discovery for farmers**. Team: **Astra_6**. Theme organization: Government of Maharashtra. Category: Software.

## Features in this repository
- Responsive farmer-oriented dashboard and crop/location inputs.
- Illustrative mandi comparison that estimates net price after sample transport costs.
- Seven-day sample trend chart.
- Browser voice input where Web Speech Recognition is supported.
- Concept cards for buyer/FPO connection and price alerts.
- Express server with basic API health information.

## Important: demo data
The market prices and 7-day series in the current interface are **illustrative sample values**, not live mandi data or validated AI predictions. The buyer connect and price-alert actions are concept demonstrations only. Do not use this prototype to make real selling decisions without checking official current prices, transport costs and buyer details.

## Technology
- Frontend: HTML5, CSS3, vanilla JavaScript
- Server: Node.js and Express
- Voice: Browser Web Speech API where available

## Run locally
Requires Node.js and npm.

```bash
npm install
npm start
```

Then open `http://localhost:3000`.

## Smart India Hackathon details
- Problem Statement ID: **SIH26132**
- Problem Statement: **Strengthening market linkages and price discovery for farmers**
- Team: **Astra_6**
- Track: Software

## Research
See [`RESEARCH_AND_REFERENCES.md`](RESEARCH_AND_REFERENCES.md). The references are starting points from the idea presentation; they do not imply partnerships or production access to any data feed.

## Current scope
This repository contains a working front-end prototype for the idea. It does **not** currently implement authenticated buyer matching, a production SQLite persistence layer, live official mandi feeds, a validated forecasting model, or transactional payments. These need to be developed and tested separately.
