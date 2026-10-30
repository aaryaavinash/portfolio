export async function onRequestGet({ request }: { request: Request }): Promise<Response> {
  const cacheUrl = new URL(request.url);
  cacheUrl.search = '';
  const cache = (globalThis.caches as CacheStorage & { default: Cache }).default;
  const cacheKey = new Request(cacheUrl, { method: 'GET' });
  const cached = await cache.match(cacheKey);
  if (cached) return cached;

  const headers = { Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28', 'User-Agent': 'Aarya-Portfolio' };
  try {
    const [profileResponse, firstReposResponse] = await Promise.all([
      fetch('https://api.github.com/users/aaryaavinash', { headers, signal: AbortSignal.timeout(8000) }),
      fetch('https://api.github.com/users/aaryaavinash/repos?per_page=100&page=1', { headers, signal: AbortSignal.timeout(8000) }),
    ]);
    if (!profileResponse.ok || !firstReposResponse.ok) throw new Error('GitHub snapshot unavailable');
    const profile: unknown = await profileResponse.json();
    const repos: unknown[] = await firstReposResponse.json();
    if (!profile || typeof profile !== 'object' || !Array.isArray(repos)) throw new Error('Invalid GitHub snapshot');
    let next = firstReposResponse.headers.get('Link')?.match(/<([^>]+)>;\s*rel="next"/)?.[1];
    while (next) {
      const nextUrl = new URL(next);
      if (nextUrl.origin !== 'https://api.github.com' || nextUrl.pathname !== '/users/aaryaavinash/repos') throw new Error('Invalid GitHub pagination URL');
      const page = await fetch(nextUrl, { headers, signal: AbortSignal.timeout(8000) });
      if (!page.ok) throw new Error('GitHub repositories unavailable');
      const value: unknown = await page.json();
      if (!Array.isArray(value)) throw new Error('Invalid GitHub repositories');
      repos.push(...value);
      next = page.headers.get('Link')?.match(/<([^>]+)>;\s*rel="next"/)?.[1];
    }
    const data = profile as Record<string, unknown>;
    if (!Number.isInteger(data.public_repos) || typeof data.created_at !== 'string' || !Number.isFinite(Date.parse(data.created_at))) throw new Error('Invalid GitHub profile');
    if (repos.some(repo => !repo || typeof repo !== 'object' || typeof (repo as Record<string, unknown>).fork !== 'boolean')) throw new Error('Invalid GitHub repositories');

    const response = Response.json({
      publicRepos: data.public_repos,
      originals: repos.filter(repo => !(repo as { fork: boolean }).fork).length,
      forks: repos.filter(repo => (repo as { fork: boolean }).fork).length,
      since: new Date(data.created_at).getFullYear(),
    }, { headers: { 'Cache-Control': 'public, max-age=300, stale-while-revalidate=600', 'X-Content-Type-Options': 'nosniff' } });
    await cache.put(cacheKey, response.clone());
    return response;
  } catch {
    return Response.json({ error: 'GitHub snapshot unavailable' }, { status: 503, headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' } });
  }
}
