// Lightweight seeded database for the KisanMandi prototype.
// Data below is illustrative only; it is not a live official mandi feed.
const mandis = [
  { id:'PUNE-01', name:'Pune Market Yard', state:'Maharashtra', district:'Pune', lat:18.5204, lng:73.8567, distance_km:12, operating_status:'Open' },
  { id:'NASHIK-01', name:'Nashik APMC', state:'Maharashtra', district:'Nashik', lat:19.9975, lng:73.7898, distance_km:20, operating_status:'Open' },
  { id:'SOLAPUR-01', name:'Solapur Market', state:'Maharashtra', district:'Solapur', lat:17.6599, lng:75.9064, distance_km:25, operating_status:'Open' },
  { id:'AHMEDNAGAR-01', name:'Ahmednagar Mandi', state:'Maharashtra', district:'Ahilyanagar', lat:19.0948, lng:74.7480, distance_km:18, operating_status:'Open' }
];
const prices = [
  { mandi_id:'PUNE-01', mandi_name:'Pune Market Yard', crop:'tomato', crop_hi:'टमाटर', variety:'Demo variety', modal_price:2980, min_price:2650, max_price:3150, price_date:'illustrative', trend_pct:2.1 },
  { mandi_id:'NASHIK-01', mandi_name:'Nashik APMC', crop:'tomato', crop_hi:'टमाटर', variety:'Demo variety', modal_price:3120, min_price:2850, max_price:3240, price_date:'illustrative', trend_pct:2.8 },
  { mandi_id:'SOLAPUR-01', mandi_name:'Solapur Market', crop:'tomato', crop_hi:'टमाटर', variety:'Demo variety', modal_price:2860, min_price:2600, max_price:3000, price_date:'illustrative', trend_pct:-0.4 },
  { mandi_id:'AHMEDNAGAR-01', mandi_name:'Ahmednagar Mandi', crop:'tomato', crop_hi:'टमाटर', variety:'Demo variety', modal_price:3040, min_price:2780, max_price:3180, price_date:'illustrative', trend_pct:1.2 }
];
const forecasts = Object.entries({tomato:2980,onion:2460,wheat:2580,rice:3240,maize:2180,soybean:4620}).flatMap(([crop,base]) =>
  [-100,-40,0,35,80,55,110].map((d,i)=>({crop,day_offset:i+1,forecast_date:'Day '+(i+1),predicted_price:base+d,lower_bound:base+d-120,upper_bound:base+d+120,confidence_pct:60, recommendation:'Review current mandi quotations',recommendation_hi:'मौजूदा मंडी भाव जाँचें',reasoning_en:'Illustrative demo trend only',reasoning_hi:'केवल उदाहरणात्मक डेमो रुझान'}))
);
const db = {
  prepare(sql) {
    const norm = String(sql).toLowerCase().replace(/\s+/g,' ').trim();
    if (norm.includes('count(*)') && norm.includes('mandis')) return { get:()=>({count:mandis.length}) };
    if (norm.includes('count(*)') && norm.includes('prices')) return { get:()=>({count:prices.length}) };
    if (norm.includes('from mandis')) return { all:()=>[...mandis].sort((a,b)=>a.name.localeCompare(b.name)) };
    if (norm.includes('from prices')) return { all:(...args)=>{
      const crop = String(args[0]||'').toLowerCase();
      const matched = crop ? prices.filter(p=>p.crop.toLowerCase()===crop) : prices;
      return matched.map(p=>({...p,state:mandis.find(m=>m.id===p.mandi_id)?.state,district:mandis.find(m=>m.id===p.mandi_id)?.district})).sort((a,b)=>b.modal_price-a.modal_price);
    }};
    if (norm.includes('from forecasts')) return { all:(...args)=>forecasts.filter(f=>f.crop.toLowerCase()===String(args[0]||'').toLowerCase()).sort((a,b)=>a.day_offset-b.day_offset) };
    throw new Error('Unsupported demo query: '+sql);
  }
};
module.exports = { db, mandis, prices, forecasts };
