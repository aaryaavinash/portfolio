// ORIGINAL (preserved, not deleted — disabled by comment): import { parseLatestTrack, type LatestTrack } from './lastfm-data';
import { parseLatestTrack, type LatestTrack } from './lastfm-data.ts';

export interface MusicTrack extends LatestTrack { playedAt?: string }
export interface MusicSnapshot { latest: MusicTrack | null; recent: MusicTrack[]; updatedAt: string }

function xmlText(value: string): string {
  return value.replace(/&(#x[\da-f]+|#\d+|amp|lt|gt|quot|apos);/gi, (entity, code: string) => {
    if (code[0] === '#') {
      const point = code[1].toLowerCase() === 'x' ? parseInt(code.slice(2), 16) : parseInt(code.slice(1), 10);
      return point > 0 && point <= 0x10ffff && !(point >= 0xd800 && point <= 0xdfff) ? String.fromCodePoint(point) : entity;
    }
    return ({ amp: '&', lt: '<', gt: '>', quot: '"', apos: "'" } as Record<string, string>)[code.toLowerCase()] ?? entity;
  });
}

function field(item: string, tag: string): string {
  return xmlText(item.match(new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`, 'i'))?.[1]?.trim() ?? '');
}

export function parseRecentRss(xml: string): MusicTrack[] {
  if (!xml.includes('<rss')) throw new Error('Invalid Last.fm feed');
  return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)].slice(0, 8).flatMap(([, item]) => {
    const title = field(item, 'lfm:track');
    const artist = field(item, 'lfm:artist');
    const url = field(item, 'lfm:track_url');
    const played = Date.parse(field(item, 'pubDate'));
    if (!title || !artist || !url.startsWith('https://www.last.fm/')) return [];
    return [{ title, artist, url, nowPlaying: false, ...(Number.isFinite(played) ? { playedAt: new Date(played).toISOString() } : {}) }];
  });
}

export function makeMusicSnapshot(widget: unknown, rss: string | null): MusicSnapshot {
  const latest = parseLatestTrack(widget);
  const recent = rss ? parseRecentRss(rss) : [];
  return {
    latest: latest ?? recent[0] ?? null,
    recent: (latest?.nowPlaying ? recent.filter(track => track.url !== latest.url) : recent).slice(0, 5),
    updatedAt: new Date().toISOString()
  };
}

export function parseMusicSnapshot(value: unknown): MusicSnapshot {
  if (!value || typeof value !== 'object' || !('recent' in value) || !Array.isArray(value.recent) || !('updatedAt' in value) || typeof value.updatedAt !== 'string') throw new Error('Invalid music response');
  // ORIGINAL (preserved, not deleted — disabled by comment): const latest = 'latest' in value ? parseLatestTrack({ track: value.latest }) : null;
  // ORIGINAL (preserved, not deleted — disabled by comment): const recent = value.recent.slice(0, 5).map((track: unknown) => { const parsed = parseLatestTrack({ track }); if (!parsed) throw new Error('Invalid recent track'); return parsed; });
  const validTrack = (track: unknown): MusicTrack => {
    if (!track || typeof track !== 'object' || !('title' in track) || typeof track.title !== 'string' || !track.title.trim() || !('artist' in track) || typeof track.artist !== 'string' || !track.artist.trim() || !('url' in track) || typeof track.url !== 'string' || !track.url.startsWith('https://www.last.fm/')) throw new Error('Invalid music track');
    const playedAt = 'playedAt' in track && typeof track.playedAt === 'string' && Number.isFinite(Date.parse(track.playedAt)) ? track.playedAt : undefined;
    return { title: track.title, artist: track.artist, url: track.url, nowPlaying: 'nowPlaying' in track && track.nowPlaying === true, ...(playedAt ? { playedAt } : {}) };
  };
  const latest = 'latest' in value && value.latest !== null ? validTrack(value.latest) : null;
  const recent = value.recent.slice(0, 5).map(validTrack);
  return { latest, recent, updatedAt: value.updatedAt };
}
