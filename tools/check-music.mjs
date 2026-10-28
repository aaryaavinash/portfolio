import assert from 'node:assert/strict';
import { makeMusicSnapshot, parseMusicSnapshot, parseRecentRss } from '../src/music-data.ts';
import { onRequestGet } from '../functions/api/music.ts';

const feed = `<?xml version="1.0"?><rss><channel><item><pubDate>Mon, 26 Oct 2026 17:29:00 -0000</pubDate><lfm:artist>One &amp; Two</lfm:artist><lfm:track>First &#39;Song&#39;</lfm:track><lfm:track_url>https://www.last.fm/music/One/_/First</lfm:track_url></item><item><lfm:artist>Other</lfm:artist><lfm:track>Second</lfm:track><lfm:track_url>https://www.last.fm/music/Other/_/Second</lfm:track_url></item></channel></rss>`;
const widget = { track: { name: 'Live Song', artist: { '#text': 'Live Artist' }, url: 'https://www.last.fm/music/Live/_/Song', '@attr': { nowplaying: 'true' } } };
assert.equal(parseRecentRss(feed)[0].artist, 'One & Two');
assert.equal(parseRecentRss(feed)[0].title, "First 'Song'");
assert.equal(parseRecentRss(feed).length, 2);
assert.equal(parseRecentRss('<rss><item><lfm:artist>X</lfm:artist><lfm:track>Y</lfm:track><lfm:track_url>javascript:bad</lfm:track_url></item></rss>').length, 0);
const snapshot = makeMusicSnapshot(widget, feed);
assert.equal(snapshot.latest?.nowPlaying, true);
assert.equal(snapshot.recent.length, 2);
assert.deepEqual(parseMusicSnapshot(snapshot), snapshot);
assert.deepEqual(makeMusicSnapshot({ message: 'NO_TRACKS_FOUND' }, '<rss><channel></channel></rss>').recent, []);
assert.throws(() => parseMusicSnapshot({ latest: { title: 'Bad', artist: 'X', url: 'javascript:bad' }, recent: [], updatedAt: '2026-10-28' }));

const originalFetch = globalThis.fetch;
try {
  globalThis.fetch = async url => new Response(String(url).includes('xiffy') ? feed : JSON.stringify(widget), { status: 200 });
  const response = await onRequestGet();
  assert.equal(response.status, 200);
  assert.equal((await response.json()).recent.length, 2);
  globalThis.fetch = async () => { throw new Error('offline'); };
  assert.equal((await onRequestGet()).status, 503);
} finally {
  globalThis.fetch = originalFetch;
}
console.log('PASS: Cloudflare music endpoint, live track, recent songs, empty state, and invalid data.');
