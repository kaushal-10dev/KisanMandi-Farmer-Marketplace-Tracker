const assert = require('assert');
const http = require('http');
const PORT = Number(process.env.PORT || 5000);
function get(path) { return new Promise((resolve,reject)=>http.get({hostname:'127.0.0.1',port:PORT,path},res=>{let body='';res.on('data',c=>body+=c);res.on('end',()=>{try{resolve({status:res.statusCode,body:JSON.parse(body)});}catch(e){reject(e);}}).on('error',reject); })); }
(async()=>{ const health=await get('/api/health'); assert.equal(health.status,200); assert.equal(health.body.status,'ok'); const api=await get('/api'); assert.equal(api.status,200); assert.equal(api.body.problemStatement,'SIH26132'); console.log('KisanMandi API smoke tests passed.'); })().catch(err=>{console.error(err);process.exit(1);});
