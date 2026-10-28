import assert from 'node:assert/strict';
import { parseGitHubCard } from '../src/social-data.ts';
assert.deepEqual(parseGitHubCard({ public_repos: 2, followers: 0, following: 3, bio: ' hello ' }), { publicRepos: 2, followers: 0, following: 3, bio: 'hello' });
assert.throws(() => parseGitHubCard({ public_repos: -1, followers: 0, following: 3 }));
assert.throws(() => parseGitHubCard({ public_repos: '2', followers: 0, following: 3 }));
console.log('PASS: public GitHub social profile data.');
