import { NextResponse } from 'next/server';
import { stealthFetch } from '@/lib/stealthFetch';
export const revalidate = 600;

export async function GET() {
  try {
    const res = await stealthFetch(
      'https://www.gdacs.org/gdacsapi/api/events/geteventlist/SEARCH',
      { signal: AbortSignal.timeout(15000), headers: { accept: 'application/json' } }
    );
    if (!res.ok) return NextResponse.json({ events: [], _status: res.status });
    const text = await res.text();
    let j: any = {}; try { j = JSON.parse(text); } catch { return NextResponse.json({ events: [], _parse: 'not-json' }); }
    const feats: any[] = Array.isArray(j) ? j : (j.features || j.data || j.events || []);
    const events = feats.map((f: any) => {
      const p = f.properties || f;
      const g = f.geometry?.coordinates;
      const lat = (Array.isArray(g) ? g[1] : undefined) ?? p.latitude ?? p.lat ?? 0;
      const lng = (Array.isArray(g) ? g[0] : undefined) ?? p.longitude ?? p.lon ?? p.lng ?? 0;
      const sd = p.severitydata || {};
      const url = typeof p.url === 'string' ? p.url : (p.url?.report || p.url?.details || p.reportUrl || '');
      return {
        id: String(p.eventid ?? p.eventId ?? `${p.eventtype ?? p.eventType}-${p.episodeid ?? ''}`),
        lat, lng,
        type: p.eventtype || p.eventType || '',
        severity: p.alertlevel || p.alertLevel || 'Green',
        score: p.alertscore ?? p.alertScore ?? null,
        sevVal: sd.severity ?? p.severity ?? null,
        sevText: sd.severitytext || sd.severityText || p.severityText || '',
        sevUnit: sd.severityunit || sd.severityUnit || '',
        name: p.name || p.eventname || (p.eventtype || p.eventType) || 'Event',
        country: p.country || p.affectedcountries || p.iso3 || '',
        from: p.fromdate || p.startAt || '',
        to: p.todate || p.endAt || '',
        html: String(p.htmldescription || p.description || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim(),
        icon: p.icon || '',
        url,
      };
    }).filter((e: any) => Number(e.lat) || Number(e.lng));
    return NextResponse.json({ events });
  } catch (e) { return NextResponse.json({ events: [], _error: String(e) }); }
}
