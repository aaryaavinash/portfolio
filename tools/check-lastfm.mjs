import assert from 'node:assert/strict';
import { parseLatestTrack } from '../src/lastfm-data.ts';

assert.deepEqual(parseLatestTrack({ track: { name: 'Every Night', artist: { '#text': 'Paul McCartney' }, url: 'https://www.last.fm/music/Paul+McCartney/_/Every+Night' } }), { title: 'Every Night', artist: 'Paul McCartney', url: 'https://www.last.fm/music/Paul+McCartney/_/Every+Night', nowPlaying: false });
assert.equal(parseLatestTrack({ message: 'NO_TRACKS_FOUND' }), null);
assert.equal(parseLatestTrack({ track: { name: 'Bad', artist: { '#text': 'Artist' }, url: 'javascript:alert(1)' } }), null);
console.log('PASS: Last.fm latest track and empty-history handling.');
