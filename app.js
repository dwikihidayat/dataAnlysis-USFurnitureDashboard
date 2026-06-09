// ─── Dataset ───────────────────────────────────────────────
const DATA = {
  yearly: {
    labels: ['2011','2012','2013','2014'],
    sales:  [157192.85, 170518.24, 198901.44, 215387.27],
    profit: [5457.73, 3015.20, 6959.95, 3018.39],
    qty:    [1623, 1775, 2193, 2437]
  },
  monthly: {
    labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    2011: { sales:[5951,2130,14574,7945,6913,13206,10821,7320,23816,12304,21565,30646], profit:[802,124,-1129,554,-350,596,374,663,1859,249,-298,2012] },
    2012: { sales:[11740,3319,12315,10476,9375,7714,13674,9639,26273,12027,30881,23086], profit:[-3014,374,1476,339,901,-413,-325,-487,1350,-606,2992,429] },
    2013: { sales:[7623,3926,12473,13406,15031,12027,13199,13619,26739,10131,33659,37069], profit:[304,377,-610,407,1888,-449,1333,-496,729,-308,922,2864] },
    2014: { sales:[5964,6866,10597,9053,17267,16903,13882,14909,29598,21884,32927,35537], profit:[-39,-199,1003,181,-54,1370,-152,327,1556,-2527,803,750] }
  },
  subCat: {
    labels:  ['Chairs','Tables','Bookcases','Furnishings'],
    sales:   [328449, 206966, 114880, 91705],
    profit:  [26590, -17725, -3473, 13059],
    qty:     [2356, 1241, 868, 3563],
    margin:  [4.0, -15.0, -13.0, 14.0]
  },
  segment: {
    labels: ['Consumer','Corporate','Home Office'],
    sales:  [391049, 229020, 121931],
    profit: [6991, 7585, 3875],
    qty:    [4166, 2495, 1367]
  },
  region: {
    labels: ['West','East','Central','South'],
    sales:  [252613, 208291, 163797, 117299],
    profit: [11505, 3046, -2871, 6771],
    qty:    [2696, 2214, 1827, 1291]
  },
  shipMode: {
    labels: ['Standard Class','Second Class','First Class','Same Day'],
    sales:  [435831, 156289, 110731, 39149],
    profit: [10361, 4226, 3067, 797]
  },
  priority: {
    labels: ['Medium','High','Critical','Low'],
    sales:  [432516, 221811, 62703, 24970],
    profit: [10063, 7675, 232, 482]
  },
  topProducts: {
    labels: ['HON 5400 Series Task Chairs','Riverside Palais Bookcase','Bretford Conf. Table Tops','Global Troy Exec Leather','SAFCO Arco Folding Chair','DMI Eclipse Bookcases','Hon Deluxe Fabric Chairs','Chromcraft Wood Oval Table','Bush Advantage Conf. Table','GuestStacker Chrome Chair'],
    sales:  [21871, 15611, 12995, 12975, 11573, 11047, 10638, 9918, 9545, 9071],
    profit: [0, -670, -327, 952, 1179, 90, 1927, -2876, -1934, 773]
  },
  topCustomers: [
    { name:'Laura Armstrong',  sales:5387.39,  profit:1146.49, qty:34 },
    { name:'Quincy Jones',     sales:4404.90,  profit:1013.13, qty:5 },
    { name:'Joe Elijah',       sales:6920.14,  profit:968.08,  qty:27 },
    { name:'Bill Donatelli',   sales:4513.11,  profit:805.98,  qty:21 },
    { name:'Brenda Bowman',    sales:4768.50,  profit:770.15,  qty:28 },
    { name:'Maria Etezadi',    sales:4132.06,  profit:750.26,  qty:24 },
    { name:'Anne McFarland',   sales:3557.14,  profit:738.84,  qty:24 },
    { name:'Justin Deggeller', sales:4078.82,  profit:720.58,  qty:26 },
    { name:'Seth Vernon',      sales:8332.09,  profit:688.40,  qty:53 },
    { name:"Resi Pölking",     sales:2852.39,  profit:688.14,  qty:16 }
  ],
  states: {
    labels: ['California','New York','Texas','Washington','Pennsylvania','Illinois','Virginia','Ohio','Florida','Michigan','Wisconsin','N. Carolina','Arizona','Tennessee','Colorado'],
    sales:  [156065,93373,60593,48020,39355,28275,25322,24199,22987,22321,17257,15155,13525,13507,13243],
    profit: [9163,5858,-10436,7194,-7197,-9076,5204,-4206,-2255,4676,3839,-3486,-2745,-2209,-2683]
  },
  discount: {
    labels: ['0%','10%','15%','20%','30%','32%','40%','45%','50%','60%','70%'],
    sales:  [256025,46634,27559,216631,99470,14493,45614,5485,20983,6645,2459],
    profit: [58133,7111,1419,6266,-10695,-2391,-16187,-2493,-12871,-5945,-3895],
    qty:    [3224,313,198,2236,837,105,292,45,209,501,68]
  }
};

// ─── Color Palette ──────────────────────────────────────────
const C = {
  blue:   '#4f8ef7', green:  '#22c55e', purple: '#a855f7',
  orange: '#f97316', red:    '#ef4444', teal:   '#14b8a6',
  yellow: '#eab308', pink:   '#ec4899',
  alpha: (hex, a) => hex + Math.round(a*255).toString(16).padStart(2,'0')
};

const PIE_COLORS  = [C.blue, C.green, C.purple, C.orange, C.teal, C.red];
const BASE_FONT   = { color: '#8fa3cc', family: 'Inter, sans-serif', size: 11 };
const GRID_COLOR  = 'rgba(99,128,255,0.08)';

function baseOpts(extra = {}) {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { backgroundColor:'#0e1526', titleColor:'#f0f4ff', bodyColor:'#8fa3cc', borderColor:'rgba(99,128,255,.25)', borderWidth:1, cornerRadius:8, padding:10 }, ...extra.plugins },
    scales: extra.scales ?? {
      x: { grid:{ color:GRID_COLOR }, ticks:{ color:'#8fa3cc', font:{size:11} } },
      y: { grid:{ color:GRID_COLOR }, ticks:{ color:'#8fa3cc', font:{size:11}, callback: v => v>=1000?'$'+(v/1000).toFixed(0)+'K':'$'+v } }
    },
    ...extra
  };
}

function bar(id, labels, datasets, extra={}) {
  const ctx = document.getElementById(id);
  if (!ctx) return null;
  return new Chart(ctx, { type:'bar', data:{ labels, datasets }, options: baseOpts(extra) });
}
function line(id, labels, datasets, extra={}) {
  const ctx = document.getElementById(id);
  if (!ctx) return null;
  return new Chart(ctx, { type:'line', data:{ labels, datasets }, options: baseOpts(extra) });
}
function doughnut(id, labels, data, extra={}) {
  const ctx = document.getElementById(id);
  if (!ctx) return null;
  return new Chart(ctx, {
    type:'doughnut',
    data:{ labels, datasets:[{ data, backgroundColor: PIE_COLORS, borderWidth:0, hoverOffset:6 }] },
    options:{ responsive:true, maintainAspectRatio:false, cutout:'68%',
      plugins:{ legend:{ position:'bottom', labels:{ color:'#8fa3cc', font:{size:11}, boxWidth:10, padding:14 } },
        tooltip:{ backgroundColor:'#0e1526', titleColor:'#f0f4ff', bodyColor:'#8fa3cc', borderColor:'rgba(99,128,255,.25)', borderWidth:1, cornerRadius:8 } }, ...extra.plugins }
  });
}

const charts = {};

function buildAll() {
  // ── Overview ──────────────────────────────────────────
  charts.yearly = bar('yearlyChart', DATA.yearly.labels, [
    { label:'Revenue', data: DATA.yearly.sales,  backgroundColor: C.alpha(C.blue,.7),  borderColor: C.blue,  borderWidth:2, borderRadius:6 },
    { label:'Profit',  data: DATA.yearly.profit, backgroundColor: C.alpha(C.green,.7), borderColor: C.green, borderWidth:2, borderRadius:6 }
  ]);

  charts.segmentDonut = doughnut('segmentDonut', DATA.segment.labels, DATA.segment.sales);

  charts.regionBar = bar('regionBar', DATA.region.labels, [
    { label:'Sales',  data: DATA.region.sales,  backgroundColor:[C.alpha(C.blue,.7),C.alpha(C.green,.7),C.alpha(C.red,.7),C.alpha(C.orange,.7)], borderRadius:6 }
  ]);

  charts.shipMode = bar('shipModeChart', DATA.shipMode.labels, [
    { label:'Profit', data: DATA.shipMode.profit,
      backgroundColor: DATA.shipMode.profit.map(v => v>=0?C.alpha(C.green,.7):C.alpha(C.red,.7)),
      borderRadius:6 }
  ], { scales:{ x:{grid:{color:GRID_COLOR},ticks:{color:'#8fa3cc',font:{size:10}}}, y:{grid:{color:GRID_COLOR},ticks:{color:'#8fa3cc',font:{size:10}}} }});

  charts.priority = doughnut('priorityChart', DATA.priority.labels, DATA.priority.sales);

  // ── Trends ────────────────────────────────────────────
  const allMonths = [];
  const allSales  = []; const allProfit = [];
  [2011,2012,2013,2014].forEach(y => {
    DATA.monthly.labels.forEach((m,i) => {
      allMonths.push(`${m} ${y}`);
      allSales.push(DATA.monthly[y].sales[i]);
      allProfit.push(DATA.monthly[y].profit[i]);
    });
  });
  charts.monthly = line('monthlyTrend', allMonths, [
    { label:'Revenue', data:allSales,  borderColor:C.blue,  backgroundColor:C.alpha(C.blue,.1),  fill:true, tension:.4, pointRadius:0, borderWidth:2.5 },
    { label:'Profit',  data:allProfit, borderColor:C.green, backgroundColor:C.alpha(C.green,.1), fill:true, tension:.4, pointRadius:0, borderWidth:2.5 }
  ]);

  // Quarterly
  const qLabels = ['Q1 2011','Q2 2011','Q3 2011','Q4 2011','Q1 2012','Q2 2012','Q3 2012','Q4 2012','Q1 2013','Q2 2013','Q3 2013','Q4 2013','Q1 2014','Q2 2014','Q3 2014','Q4 2014'];
  const qSales  = [];
  [2011,2012,2013,2014].forEach(y => {
    const s = DATA.monthly[y].sales;
    qSales.push(s[0]+s[1]+s[2], s[3]+s[4]+s[5], s[6]+s[7]+s[8], s[9]+s[10]+s[11]);
  });
  charts.quarterly = bar('quarterlyChart', qLabels, [
    { label:'Revenue', data:qSales, backgroundColor: qLabels.map((_,i)=>[C.alpha(C.blue,.8),C.alpha(C.purple,.8),C.alpha(C.teal,.8),C.alpha(C.orange,.8)][i%4]), borderRadius:5 }
  ], { scales:{ x:{grid:{color:GRID_COLOR},ticks:{color:'#8fa3cc',font:{size:9},maxRotation:45}}, y:{grid:{color:GRID_COLOR},ticks:{color:'#8fa3cc',font:{size:10}}} }});

  // Growth
  const growth = DATA.yearly.sales.slice(1).map((v,i) => +((v/DATA.yearly.sales[i]-1)*100).toFixed(1));
  charts.growth = bar('growthChart', ['2011→12','2012→13','2013→14'], [
    { label:'YoY Growth %', data:growth, backgroundColor:growth.map(v=>v>=0?C.alpha(C.green,.75):C.alpha(C.red,.75)), borderRadius:6 }
  ], { scales:{ x:{grid:{color:GRID_COLOR},ticks:{color:'#8fa3cc',font:{size:11}}}, y:{grid:{color:GRID_COLOR},ticks:{color:'#8fa3cc',font:{size:11},callback:v=>v+'%'}} }});

  // ── Products ──────────────────────────────────────────
  charts.subCatSales = doughnut('subCatSales', DATA.subCat.labels, DATA.subCat.sales);

  charts.subCatProfit = bar('subCatProfit', DATA.subCat.labels, [
    { label:'Profit', data:DATA.subCat.profit,
      backgroundColor:DATA.subCat.profit.map(v=>v>=0?C.alpha(C.green,.75):C.alpha(C.red,.75)),
      borderRadius:6 }
  ]);

  charts.subCatMargin = bar('subCatMargin', DATA.subCat.labels, [
    { label:'Margin%', data:DATA.subCat.margin,
      backgroundColor:DATA.subCat.margin.map(v=>v>=0?C.alpha(C.teal,.75):C.alpha(C.red,.75)),
      borderRadius:6 }
  ], { scales:{ x:{grid:{color:GRID_COLOR},ticks:{color:'#8fa3cc',font:{size:11}}}, y:{grid:{color:GRID_COLOR},ticks:{color:'#8fa3cc',font:{size:11},callback:v=>v+'%'}} }});

  charts.topProducts = bar('topProductsChart', DATA.topProducts.labels, [
    { label:'Revenue', data:DATA.topProducts.sales, backgroundColor:C.alpha(C.blue,.7),  borderRadius:5, borderSkipped:false },
    { label:'Profit',  data:DATA.topProducts.profit,backgroundColor:DATA.topProducts.profit.map(v=>v>=0?C.alpha(C.green,.7):C.alpha(C.red,.7)), borderRadius:5, borderSkipped:false }
  ], {
    indexAxis:'y',
    scales:{ x:{grid:{color:GRID_COLOR},ticks:{color:'#8fa3cc',font:{size:10}}}, y:{grid:{color:GRID_COLOR},ticks:{color:'#8fa3cc',font:{size:10}}} }
  });

  charts.volProfit = new Chart(document.getElementById('volProfitBubble'), {
    type:'bubble',
    data:{ datasets: DATA.subCat.labels.map((l,i)=>({ label:l, data:[{ x:DATA.subCat.qty[i], y:DATA.subCat.profit[i], r: Math.max(8, Math.abs(DATA.subCat.sales[i])/5000) }], backgroundColor:C.alpha(PIE_COLORS[i],.65), borderColor:PIE_COLORS[i], borderWidth:2 })) },
    options:{ responsive:true, maintainAspectRatio:false,
      plugins:{ legend:{ position:'bottom', labels:{ color:'#8fa3cc', font:{size:11}, boxWidth:10 } }, tooltip:{ backgroundColor:'#0e1526', titleColor:'#f0f4ff', bodyColor:'#8fa3cc', borderColor:'rgba(99,128,255,.25)', borderWidth:1 } },
      scales:{ x:{ grid:{color:GRID_COLOR}, ticks:{color:'#8fa3cc'}, title:{display:true,text:'Quantity Sold',color:'#8fa3cc'} }, y:{ grid:{color:GRID_COLOR}, ticks:{color:'#8fa3cc'}, title:{display:true,text:'Profit ($)',color:'#8fa3cc'} } } }
  });

  // ── Customers ─────────────────────────────────────────
  charts.segGrouped = bar('segmentGrouped', DATA.segment.labels, [
    { label:'Revenue', data:DATA.segment.sales,  backgroundColor:C.alpha(C.blue,.7),  borderRadius:5 },
    { label:'Profit',  data:DATA.segment.profit, backgroundColor:C.alpha(C.green,.7), borderRadius:5 }
  ]);
  charts.segQty = doughnut('segmentQty', DATA.segment.labels, DATA.segment.qty);
  charts.topCustomers = bar('topCustomers', DATA.topCustomers.map(c=>c.name.split(' ')[0]+' '+c.name.split(' ')[1][0]+'.'), [
    { label:'Profit', data:DATA.topCustomers.map(c=>c.profit), backgroundColor:C.alpha(C.purple,.75), borderRadius:5, borderSkipped:false }
  ], { indexAxis:'y', scales:{ x:{grid:{color:GRID_COLOR},ticks:{color:'#8fa3cc',font:{size:10}}}, y:{grid:{color:GRID_COLOR},ticks:{color:'#8fa3cc',font:{size:10}}} }});
  charts.segFreq = bar('segmentFreq', DATA.segment.labels, [
    { label:'Orders', data:DATA.segment.qty.map((q,i)=>(q/[707*.59,707*.35,707*.19][i]).toFixed(1)),
      backgroundColor:[C.alpha(C.blue,.7),C.alpha(C.green,.7),C.alpha(C.purple,.7)], borderRadius:5 }
  ], { scales:{ x:{grid:{color:GRID_COLOR},ticks:{color:'#8fa3cc'}}, y:{grid:{color:GRID_COLOR},ticks:{color:'#8fa3cc',callback:v=>v+'x'}} }});

  // Customer table
  const tbody = document.getElementById('topCustomerTableBody');
  if (tbody) {
    DATA.topCustomers.forEach((c,i) => {
      const pct = ((c.profit/c.sales)*100).toFixed(1);
      tbody.innerHTML += `<tr>
        <td><strong style="color:var(--blue)">#${i+1}</strong></td>
        <td>${c.name}</td>
        <td>$${c.sales.toLocaleString('en-US',{minimumFractionDigits:2})}</td>
        <td class="profit-pos">$${c.profit.toLocaleString('en-US',{minimumFractionDigits:2})}</td>
        <td>${c.qty}</td>
        <td class="profit-pos">${pct}%</td>
      </tr>`;
    });
  }

  // ── Geography ─────────────────────────────────────────
  charts.regionPie  = doughnut('regionPie', DATA.region.labels, DATA.region.sales);
  charts.regionProfit = bar('regionProfit', DATA.region.labels, [
    { label:'Profit', data:DATA.region.profit,
      backgroundColor:DATA.region.profit.map(v=>v>=0?C.alpha(C.green,.75):C.alpha(C.red,.75)),
      borderRadius:6 }
  ]);
  charts.stateChart = bar('stateChart', DATA.states.labels, [
    { label:'Sales',  data:DATA.states.sales,  backgroundColor:C.alpha(C.blue,.7),  borderRadius:4, borderSkipped:false },
    { label:'Profit', data:DATA.states.profit, backgroundColor:DATA.states.profit.map(v=>v>=0?C.alpha(C.green,.7):C.alpha(C.red,.7)), borderRadius:4, borderSkipped:false }
  ], { indexAxis:'y', scales:{ x:{grid:{color:GRID_COLOR},ticks:{color:'#8fa3cc',font:{size:10}}}, y:{grid:{color:GRID_COLOR},ticks:{color:'#8fa3cc',font:{size:10}}} }});

  // ── Discount ──────────────────────────────────────────
  charts.discountProfit = bar('discountProfit', DATA.discount.labels, [
    { label:'Profit', data:DATA.discount.profit,
      backgroundColor:DATA.discount.profit.map(v=>v>=0?C.alpha(C.green,.75):C.alpha(C.red,.75)),
      borderRadius:5 }
  ]);
  charts.discountVolume = bar('discountVolume', DATA.discount.labels, [
    { label:'Units', data:DATA.discount.qty, backgroundColor:C.alpha(C.purple,.7), borderRadius:5 }
  ], { scales:{ x:{grid:{color:GRID_COLOR},ticks:{color:'#8fa3cc'}}, y:{grid:{color:GRID_COLOR},ticks:{color:'#8fa3cc',callback:v=>v}} }});
  charts.discountCombo = new Chart(document.getElementById('discountCombo'), {
    type:'bar',
    data:{ labels:DATA.discount.labels, datasets:[
      { type:'bar',  label:'Revenue', data:DATA.discount.sales,  backgroundColor:C.alpha(C.blue,.6),  borderRadius:5, yAxisID:'y' },
      { type:'line', label:'Profit',  data:DATA.discount.profit, borderColor:C.green, backgroundColor:C.alpha(C.green,.1), fill:true, tension:.4, borderWidth:2.5, pointRadius:4, pointBackgroundColor:DATA.discount.profit.map(v=>v>=0?C.green:C.red), yAxisID:'y1' }
    ]},
    options:{ responsive:true, maintainAspectRatio:false,
      plugins:{ legend:{ position:'top', labels:{ color:'#8fa3cc', font:{size:11}, boxWidth:10 } }, tooltip:{ backgroundColor:'#0e1526', titleColor:'#f0f4ff', bodyColor:'#8fa3cc', borderColor:'rgba(99,128,255,.25)', borderWidth:1 } },
      scales:{
        x:  { grid:{color:GRID_COLOR}, ticks:{color:'#8fa3cc'} },
        y:  { grid:{color:GRID_COLOR}, ticks:{color:'#8fa3cc', callback:v=>'$'+(v/1000).toFixed(0)+'K'}, position:'left' },
        y1: { grid:{drawOnChartArea:false}, ticks:{color:'#8fa3cc', callback:v=>'$'+(v/1000).toFixed(0)+'K'}, position:'right' }
      }
    }
  });
}

// ─── Navigation ─────────────────────────────────────────────
function initNav() {
  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('.dashboard-section');
  navItems.forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      const target = item.dataset.section;
      navItems.forEach(n => n.classList.remove('active'));
      sections.forEach(s => s.classList.remove('active'));
      item.classList.add('active');
      const sec = document.getElementById(target);
      if (sec) sec.classList.add('active');
    });
  });

  // Mobile menu
  document.getElementById('menuToggle')?.addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('open');
  });

  // Year filter
  document.getElementById('yearFilter')?.addEventListener('change', function() {
    const yr = this.value;
    updateKPIs(yr);
  });
}

function updateKPIs(yr) {
  const d = DATA.yearly;
  let sales, profit, qty;
  if (yr === 'all') {
    sales  = d.sales.reduce((a,b)=>a+b,0);
    profit = d.profit.reduce((a,b)=>a+b,0);
    qty    = d.qty.reduce((a,b)=>a+b,0);
  } else {
    const i = d.labels.indexOf(yr);
    sales = d.sales[i]; profit = d.profit[i]; qty = d.qty[i];
  }
  const fmt = v => '$'+Math.round(v).toLocaleString('en-US');
  document.getElementById('kpi-sales').textContent  = fmt(sales);
  document.getElementById('kpi-profit').textContent = fmt(profit);
  document.getElementById('kpi-qty').textContent    = qty.toLocaleString('en-US');
}

// ─── Init ────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  Chart.defaults.font = BASE_FONT;
  buildAll();
  initNav();
});
