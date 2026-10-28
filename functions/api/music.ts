// ORIGINAL (preserved, not deleted — disabled by comment): import { makeMusicSnapshot } from '../../src/music-data';
import { makeMusicSnapshot } from '../../src/music-data.ts';

export async function onRequestGet(): Promise<Response> {
  const [widget, feed] = await Promise.allSettled([
    fetch('https://lastfm-last-played.biancarosa.com.br/aaryaavinash/latest-song', { signal: AbortSignal.timeout(8000) }).then(response => {
      if (!response.ok) throw new Error('Latest track unavailable');
      return response.json();
    }),
    fetch('https://lfm.xiffy.nl/aaryaavinash', { signal: AbortSignal.timeout(8000) }).then(response => {
      if (!response.ok) throw new Error('Listening history unavailable');
      return response.text();
    })
  ]);
  if (widget.status === 'rejected' && feed.status === 'rejected') {
    return Response.json({ error: 'Listening data unavailable' }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
  }
  try {
    const snapshot = makeMusicSnapshot(widget.status === 'fulfilled' ? widget.value : null, feed.status === 'fulfilled' ? feed.value : null);
    return Response.json(snapshot, { headers: { 'Cache-Control': 'public, max-age=60, stale-while-revalidate=120', 'X-Content-Type-Options': 'nosniff' } });
  } catch {
    return Response.json({ error: 'Listening data invalid' }, { status: 502, headers: { 'Cache-Control': 'no-store' } });
  }
}
