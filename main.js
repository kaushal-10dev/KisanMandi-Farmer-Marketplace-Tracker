const sampleMarkets = [
  { name:"Pune Market Yard", city:"Pune", price:2980, transport:95, icon:"🌾" },
  { name:"Nashik APMC", city:"Nashik", price:3120, transport:180, icon:"🧺" },
  { name:"Solapur Market", city:"Solapur", price:2860, transport:135, icon:"🌱" },
  { name:"Ahmednagar Mandi", city:"Ahmednagar", price:3040, transport:110, icon:"🚜" }
];
const cropBase = { Tomato:2980, Onion:2460, Wheat:2580, Rice:3240, Maize:2180, Soybean:4620 };
const cropDelta = { Tomato:[-130,-60,0,70,120,90,160], Onion:[90,50,0,-20,65,110,75], Wheat:[-20,10,30,15,45,60,55], Rice:[-80,-30,0,20,15,50,65], Maize:[-25,20,35,5,50,60,90], Soybean:[-110,-50,20,45,35,80,100] };
const $ = (id) => document.getElementById(id);
let toastTimer;
function toast(message) {
  const el = $("toast");
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 3200);
}
function money(n) { return "₹" + Math.round(n).toLocaleString("en-IN"); }
function currentCrop() { return $("crop").value; }
function adjustedMarkets() {
  const crop = currentCrop();
  const base = cropBase[crop] || cropBase.Tomato;
  return sampleMarkets.map((m,i) => {
    const cropAdj = crop === "Tomato" ? 0 : Math.round((base - cropBase.Tomato) * (i % 2 ? 1.02 : .98));
    const price = Math.max(100, m.price + cropAdj);
    return {...m, price, net: price - m.transport};
  }).sort((a,b)=>b.net-a.net);
}
function renderMarkets() {
  const tbody = $("marketRows");
  const rows = adjustedMarkets();
  tbody.innerHTML = rows.map((m,i)=>`<tr>
    <td><div class="market-name"><span class="market-icon">${m.icon}</span><span><strong>${m.name}</strong><br><span class="muted">${m.city}</span></span></div></td>
    <td><strong>${money(m.price)}</strong> <span class="muted">/ qtl</span></td>
    <td>${money(m.transport)}</td>
    <td class="positive">${money(m.net)}</td>
    <td><button class="row-button" data-market="${m.name}">Choose market</button></td>
  </tr>`).join("");
  const best = rows[0];
  $("marketMessage").textContent = "Based on sample values, " + best.name + " shows the highest estimated net value. Actual prices and transport charges can change.";
  $("heroCropPrice").innerHTML = money(cropBase[currentCrop()]) + ' <small>/ quintal</small>';
  $("heroCropLabel").textContent = currentCrop() + " · illustrative price";
  $("findMarkets").textContent = "Find best market";
  renderForecast();
}
function renderForecast() {
  const crop = currentCrop();
  const base = cropBase[crop];
  const deltas = cropDelta[crop] || cropDelta.Tomato;
  const vals = deltas.map((d,i)=>base + d + (i === 0 ? 0 : Math.round(d*0.1)));
  const min = Math.min(...vals) - 40, max = Math.max(...vals) + 40;
  $("forecastChart").innerHTML = vals.map((v,i)=>{
    const h = 18 + ((v-min)/(max-min || 1))*72;
    return `<div class="bar-wrap"><div class="bar" style="height:${h}%"><span>${money(v)}</span></div></div>`;
  }).join("");
  $("forecastLabels").innerHTML = vals.map((_,i)=>`<span>Day ${i+1}</span>`).join("");
  let peak = vals.indexOf(Math.max(...vals));
  $("insightTitle").textContent = "Compare net realization";
  $("insightText").textContent = `For ${crop.toLowerCase()}, this illustrative 7-day series peaks on Day ${peak+1} at ${money(vals[peak])} per quintal. This is sample data for the prototype, not a validated forecast. Check current mandi prices before making a selling decision.`;
}
$("crop").addEventListener("change", renderMarkets);
$("findMarkets").addEventListener("click", () => {
  const location = $("location").value.trim() || "your area";
  const qty = Math.max(1, Number($("quantity").value)||1);
  const best = adjustedMarkets()[0];
  renderMarkets();
  toast(`Sample comparison for ${location}: ${best.name} is highest in this demo. Net for ${qty} qtl ≈ ${money(best.net*qty)} before any other charges.`);
});
$("marketRows").addEventListener("click", e => {
  const b = e.target.closest("button[data-market]");
  if (!b) return;
  const m = adjustedMarkets().find(x=>x.name===b.dataset.market);
  const qty = Math.max(1, Number($("quantity").value)||1);
  toast(`${m.name} selected. Illustrative net value for ${qty} qtl: ${money(m.net*qty)}. Verify live rate and costs.`);
});
document.querySelectorAll(".buyer-action").forEach(b => b.addEventListener("click", () => {
  $("buyerMessage").textContent = `${b.dataset.kind} connection is shown as a concept in this prototype. No real buyer contact or transaction is initiated.`;
  toast("Buyer connection feature is a concept demo only.");
}));
$("setAlert").addEventListener("click", () => toast("Demo only: real price alerts require a verified price feed and notification service."));
function startVoice() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    toast("Speech recognition is not available in this browser. Try a supported browser or use the crop and location fields.");
    return;
  }
  const rec = new SpeechRecognition();
  rec.lang = "hi-IN";
  rec.interimResults = false;
  rec.maxAlternatives = 1;
  toast("Listening in Hindi… say a crop or market question.");
  rec.onresult = event => {
    const spoken = event.results[0][0].transcript || "";
    const s = spoken.toLowerCase();
    const crops = { tomato:"Tomato", tamatar:"Tomato", onion:"Onion", pyaz:"Onion", wheat:"Wheat", gehun:"Wheat", rice:"Rice", chawal:"Rice", maize:"Maize", makka:"Maize", soybean:"Soybean", soyabean:"Soybean" };
    const match = Object.entries(crops).find(([word])=>s.includes(word));
    if (match) $("crop").value = match[1];
    renderMarkets();
    toast(match ? `Heard “${spoken}”. Showing ${match[1]} sample prices.` : `Heard “${spoken}”. Select a crop to see its sample price comparison.`);
  };
  rec.onerror = e => toast("Voice input ended: " + (e.error || "unable to recognise speech") + ".");
  rec.start();
}
["voiceTop","voiceHero","voiceBottom"].forEach(id => $(id).addEventListener("click", startVoice));
renderMarkets();
