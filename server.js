const express = require('express');
const path = require('node:path');
const db = require('./db.js');
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(express.static(__dirname));
app.get('/api/health', (_req,res)=>res.json({status:'ok',service:'Farmer Marketplace Tracker',version:'2.0.0',timestamp:new Date().toISOString()}));
app.get('/api', (_req,res)=>res.json({success:true,name:'KisanMandi AI',problemStatement:'SIH26132',mode:'prototype'}));
app.get('/api/stats', (_req,res)=> {
  try {
    const count = db.db.prepare('SELECT COUNT(*) AS count FROM mandis').get().count;
    res.json({success:true,data:{mandis_connected:count,prototype:true,dataSource:'seeded demo data'}});
  } catch (err) { res.status(500).json({success:false,error:err.message}); }
});
app.get('/api/mandis', (_req,res)=>{
  try {res.json({success:true,data:db.db.prepare('SELECT * FROM mandis ORDER BY name').all()});}
  catch(err){res.status(500).json({success:false,error:err.message});}
});
app.get('/api/prices', (req,res)=>{
  try {
    const crop = String(req.query.crop||'').trim();
    const data = crop ? db.db.prepare('SELECT prices.*, mandis.name AS mandi_name, mandis.state, mandis.district FROM prices JOIN mandis ON mandis.id=prices.mandi_id WHERE lower(prices.crop)=lower(?) ORDER BY prices.modal_price DESC').all(crop) : db.db.prepare('SELECT prices.*, mandis.name AS mandi_name, mandis.state, mandis.district FROM prices JOIN mandis ON mandis.id=prices.mandi_id ORDER BY prices.price_date DESC LIMIT 100').all();
    res.json({success:true,data,source:'seeded prototype database; verify before real decisions'});
  } catch(err){res.status(500).json({success:false,error:err.message});}
});
app.get('/api/forecast/:crop', (req,res)=>{
  try {
    const data = db.db.prepare('SELECT * FROM forecasts WHERE lower(crop)=lower(?) ORDER BY day_offset').all(req.params.crop);
    res.json({success:true,data,source:'prototype forecasts; not guaranteed prices'});
  } catch(err){res.status(500).json({success:false,error:err.message});}
});
app.get('*', (_req,res)=>res.sendFile(path.join(__dirname,'index.html')));
app.listen(PORT,()=>console.log(`KisanMandi AI running on http://localhost:${PORT}`));
