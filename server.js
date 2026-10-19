const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.static(__dirname));
app.get('/api/health', (_req, res) => res.json({ status:'ok', app:'KisanMandi AI', demo:true }));
app.get('/api', (_req, res) => res.json({ name:'KisanMandi AI — Farmer Marketplace Tracker', status:'SIH 2026 prototype', problemStatement:'SIH26132' }));
app.listen(PORT, () => console.log(`KisanMandi AI running on http://localhost:${PORT}`));
