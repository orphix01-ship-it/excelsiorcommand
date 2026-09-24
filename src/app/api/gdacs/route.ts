import { NextResponse } from 'next/server';
import { stealthFetch } from '@/lib/stealthFetch';

export const revalidate = 600;

// GDACS global disaster alerts (keyless GeoJSON). The documented feed is the
// SEARCH endpoint; MAP returns a non-GeoJSON shape. Parsing is defensive because
// GDACS sometimes nests fields under `properties` and sometimes flat.
export async function GET() {
  try {
    const res = await stealthFetch(
      'https://www.gdacs.org/gdacsapi/api/events/geteventlist/SEARCH',
      { signal: AbortSignal.timeout(15000), headers: { accept: 'application/json' } }
    );
    if (!res.ok) return NextResponse.json({ events: [], _status: res.status });
    const text = await res.text();
    let j: any = {};
    try { j = JSON.parse(text); } catch { return NextResponse.json({ events: [], _parse: 'not-json' }); }

    const feats: any[] = Array.isArray(j) ? j : (j.features || j.data || j.events || []);
    const events = feats.map((f: any) => {
      const p = f.properties || f;
      const g = f.geometry?.coordinates;
      const lat = (Array.isArray(g) ? g[1] : undefined) ?? p.latitude ?? p.lat ?? 0;
      const lng = (Array.isArray(g) ? g[0] : undefined) ?? p.longitude ?? p.lon ?? p.lng ?? 0;
      const url = typeof p.url === 'string' ? p.url : (p.url?.report || p.url?.details || p.reportUrl || '');
      return {
        id: String(p.eventid ?? p.eventId ?? `${p.eventtype ?? p.eventType}-${p.episodeid ?? ''}`),
        lat, lng,
        type: p.eventtype || p.eventType || '',
        severity: p.alertlevel || p.alertLevel || 'Green',
        name: p.name || p.eventname || p.htmldescription || p.description || (p.eventtype || p.eventType) || 'Event',
        url,
      };
    }).filter((e: any) => Number(e.lat) || Number(e.lng));

    return NextResponse.json({ events });
  } catch (e) {
    return NextResponse.json({ events: [], _error: String(e) });
  }
}
