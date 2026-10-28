export interface LatestTrack {
  title: string;
  artist: string;
  url: string;
  nowPlaying: boolean;
}

export function parseLatestTrack(value: unknown): LatestTrack | null {
  if (!value || typeof value !== 'object' || !('track' in value)) return null;
  const track = value.track;
  if (!track || typeof track !== 'object' || !('name' in track) || !('artist' in track) || !('url' in track)) return null;
  const artist = track.artist;
  if (typeof track.name !== 'string' || !track.name.trim() || !artist || typeof artist !== 'object' || !('#text' in artist) || typeof artist['#text'] !== 'string' || !artist['#text'].trim() || typeof track.url !== 'string' || !track.url.startsWith('https://www.last.fm/')) return null;
  return { title: track.name, artist: artist['#text'], url: track.url, nowPlaying: '@attr' in track && typeof track['@attr'] === 'object' && track['@attr'] !== null && 'nowplaying' in track['@attr'] && track['@attr'].nowplaying === 'true' };
}
