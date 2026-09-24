import { NextResponse } from 'next/server';
export const revalidate = 3600;
const CHOKEPOINTS = [
  { id:'suez', name:'Suez Canal', lat:30.55, lng:32.35, transit:'~50 ships/day, ~1.0 Bbbl oil/day', pctTrade:'~12% of global trade', cargo:'Containers, oil, LNG, grain', alt:'Cape of Good Hope', altDays:'+10–14 days', borders:'Egypt' },
  { id:'panama', name:'Panama Canal', lat:9.08, lng:-79.68, transit:'~35–40 ships/day', pctTrade:'~5% of global trade', cargo:'Containers, LPG, grain, autos', alt:'Magellan / Suez', altDays:'+8–20 days', borders:'Panama' },
  { id:'malacca', name:'Strait of Malacca', lat:2.5, lng:101.3, transit:'~90k ships/yr, ~16 Mbbl oil/day', pctTrade:'~25% of traded goods', cargo:'Oil, LNG, containers', alt:'Sunda / Lombok Strait', altDays:'+3–5 days', borders:'Malaysia, Indonesia, Singapore' },
  { id:'hormuz', name:'Strait of Hormuz', lat:26.57, lng:56.25, transit:'~20–21 Mbbl oil/day', pctTrade:'~20% of global oil', cargo:'Crude oil, LNG', alt:'Pipelines only (limited)', altDays:'No sea bypass', borders:'Iran, Oman, UAE' },
  { id:'bab', name:'Bab-el-Mandeb', lat:12.58, lng:43.33, transit:'~6–9 Mbbl oil/day', pctTrade:'~10% of seaborne oil', cargo:'Oil, containers (Suez feeder)', alt:'Cape of Good Hope', altDays:'+10–14 days', borders:'Yemen, Djibouti, Eritrea' },
  { id:'bosphorus', name:'Bosphorus', lat:41.12, lng:29.07, transit:'~40k ships/yr, ~3 Mbbl oil/day', pctTrade:'Black Sea grain & energy', cargo:'Grain, oil, steel', alt:'None (only Black Sea outlet)', altDays:'No bypass', borders:'Turkey' },
  { id:'gibraltar', name:'Strait of Gibraltar', lat:35.95, lng:-5.6, transit:'~100k ships/yr', pctTrade:'Atlantic–Med gateway', cargo:'Containers, oil, gas', alt:'None (Med entrance)', altDays:'—', borders:'Spain, Morocco, UK' },
  { id:'goodhope', name:'Cape of Good Hope', lat:-34.8, lng:20.0, transit:'Rising (Suez diversions)', pctTrade:'Suez bypass route', cargo:'All classes rerouted', alt:'Suez (when open)', altDays:'Baseline bypass', borders:'South Africa' },
];
export async function GET() { return NextResponse.json({ points: CHOKEPOINTS }); }
