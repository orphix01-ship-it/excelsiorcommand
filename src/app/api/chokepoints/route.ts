import { NextResponse } from 'next/server';
export const revalidate = 3600;

// The world's strategic maritime chokepoints. Static; `status` is ready to be
// driven by news/conflict proximity in a later pass ('nominal' | 'elevated').
const CHOKEPOINTS = [
  { id: 'suez',      name: 'Suez Canal',          lat: 30.55, lng: 32.35, note: '~12% of global trade; Europe\u2013Asia shortcut' },
  { id: 'panama',    name: 'Panama Canal',        lat: 9.08,  lng: -79.68, note: 'Atlantic\u2013Pacific; draft-constrained by drought' },
  { id: 'malacca',   name: 'Strait of Malacca',   lat: 2.5,   lng: 101.3, note: '~25% of traded goods; Indian Ocean\u2013Pacific' },
  { id: 'hormuz',    name: 'Strait of Hormuz',    lat: 26.57, lng: 56.25, note: '~20% of global oil; only Gulf outlet' },
  { id: 'bab',       name: 'Bab-el-Mandeb',       lat: 12.58, lng: 43.33, note: 'Red Sea\u2013Gulf of Aden; Suez approach' },
  { id: 'bosphorus', name: 'Bosphorus',           lat: 41.12, lng: 29.07, note: 'Black Sea\u2013Mediterranean; grain & energy' },
  { id: 'gibraltar', name: 'Strait of Gibraltar', lat: 35.95, lng: -5.6,  note: 'Atlantic\u2013Mediterranean gateway' },
  { id: 'goodhope',  name: 'Cape of Good Hope',   lat: -34.8, lng: 20.0,  note: 'Suez bypass around Africa' },
];
export async function GET() {
  return NextResponse.json({ points: CHOKEPOINTS.map(c => ({ ...c, status: 'nominal' })) });
}
