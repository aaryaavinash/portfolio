import assert from 'node:assert/strict';
import { parseContributions } from '../src/contributions.ts';
assert.deepEqual(parseContributions({ contributions: [{ date: '2026-10-27', count: 0 }, { date: '2026-10-28', count: 3 }] }), { data: [0, 3], endDate: '2026-10-28' });
assert.throws(() => parseContributions({ contributions: [{ date: 'x', count: -1 }] }));
assert.throws(() => parseContributions({ contributions: [] }));
console.log('PASS: GitHub contribution data normalization.');
