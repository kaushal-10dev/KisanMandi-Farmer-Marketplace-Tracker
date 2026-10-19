const assert = require('assert');
const fs = require('fs');
const html = fs.readFileSync('index.html','utf8');
const js = fs.readFileSync('main.js','utf8');
const css = fs.readFileSync('style.css','utf8');
for (const id of ['markets','forecast','buyers','crop','marketRows','forecastChart','voiceTop']) assert(html.includes(id), `Missing expected HTML identifier: ${id}`);
for (const symbol of ['renderMarkets','renderForecast','startVoice']) assert(js.includes(symbol), `Missing UI function: ${symbol}`);
assert(css.includes('.hero') && css.includes('.searchbox'), 'Missing primary UI styles');
console.log('KisanMandi frontend smoke checks passed.');
