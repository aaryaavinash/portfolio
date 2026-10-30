import { createRoot } from 'react-dom/client';
import { useEffect, useLayoutEffect, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedContent from './components/AnimatedContent';
import Counter from './components/Counter';
import ActivityTerrain from './components/ActivityTerrain';
import { parseContributions, type ContributionSeries } from './contributions';

// ORIGINAL (preserved, not deleted — disabled by comment): const initialStats = { publicRepos: 2, originals: 1, forks: 1, since: 2023 };
const initialStats = { publicRepos: 25, originals: 24, forks: 1, since: 2023 };

function ImpactStats() {
  useLayoutEffect(() => { ScrollTrigger.refresh(); }, []);
  const [stats, setStats] = useState(initialStats);
  const [history, setHistory] = useState<ContributionSeries | null>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    async function loadSnapshot(): Promise<typeof initialStats> {
      const response = await fetch('/api/github-snapshot', { signal });
      if (response.ok) {
        const value: unknown = await response.json();
        if (value && typeof value === 'object' && ['publicRepos', 'originals', 'forks', 'since'].every(key => Number.isInteger((value as Record<string, unknown>)[key]))) return value as typeof initialStats;
        throw new Error('Invalid GitHub snapshot');
      }
      const headers = { Accept: 'application/vnd.github+json' };
      const [profileResponse, reposResponse] = await Promise.all([
        fetch('https://api.github.com/users/aaryaavinash', { headers, signal }),
        fetch('https://api.github.com/users/aaryaavinash/repos?per_page=100&page=1', { headers, signal }),
      ]);
      if (!profileResponse.ok || !reposResponse.ok) throw new Error('GitHub snapshot unavailable');
      const profile: unknown = await profileResponse.json();
      const repos: unknown[] = await reposResponse.json();
      if (!Array.isArray(repos) || repos.some(repo => !repo || typeof repo !== 'object' || typeof (repo as Record<string, unknown>).fork !== 'boolean')) throw new Error('Invalid GitHub repositories');
      let next = reposResponse.headers.get('Link')?.match(/<([^>]+)>;\s*rel="next"/)?.[1];
      while (next) {
        const pageResponse = await fetch(next, { headers, signal });
        if (!pageResponse.ok) throw new Error('GitHub repositories unavailable');
        const page: unknown = await pageResponse.json();
        if (!Array.isArray(page) || page.some(repo => !repo || typeof repo !== 'object' || typeof (repo as Record<string, unknown>).fork !== 'boolean')) throw new Error('Invalid GitHub repositories');
        repos.push(...page);
        next = pageResponse.headers.get('Link')?.match(/<([^>]+)>;\s*rel="next"/)?.[1];
      }
      if (!profile || typeof profile !== 'object') throw new Error('Invalid GitHub profile');
      const data = profile as Record<string, unknown>;
      const since = typeof data.created_at === 'string' ? Date.parse(data.created_at) : NaN;
      if (!Number.isInteger(data.public_repos) || !Number.isFinite(since)) throw new Error('Invalid GitHub profile');
      return {
        publicRepos: data.public_repos as number,
        originals: repos.filter(repo => !(repo as { fork: boolean }).fork).length,
        forks: repos.filter(repo => (repo as { fork: boolean }).fork).length,
        since: new Date(since).getFullYear(),
      };
    }
    loadSnapshot()
      .then(setStats)
      .catch(error => { if (!controller.signal.aborted) console.error(error); });
    fetch('https://github-contributions-api.jogruber.de/v4/aaryaavinash?y=last', { signal: controller.signal })
      .then(response => { if (!response.ok) throw new Error('Contribution feed unavailable'); return response.json(); })
      .then(value => setHistory(parseContributions(value)))
      .catch(error => { if (!controller.signal.aborted) { console.error(error); setFailed(true); } });
    return () => controller.abort();
  }, []);

  return (
    <>
    <AnimatedContent
      className="stats grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
      distance={40}
      direction="vertical"
      duration={1.1}
      ease="power3.out"
      blur={0}
      stagger={0.08}
      threshold={0.1}
    >
      <dl className="stat">
        <dd><Counter className="impact-counter" value={stats.publicRepos} fontSize="inherit" motionBlur={false} fade={0.15} /></dd>
        <dt>Public repositories</dt>
      </dl>
      <dl className="stat">
        <dd><Counter className="impact-counter" value={stats.originals} fontSize="inherit" motionBlur={false} fade={0.15} /></dd>
        <dt>Original repositories</dt>
      </dl>
      <dl className="stat">
        <dd><Counter className="impact-counter" value={stats.forks} fontSize="inherit" motionBlur={false} fade={0.15} /></dd>
        <dt>Open source forks</dt>
      </dl>
      <dl className="stat">
        <dd><Counter className="impact-counter" value={stats.since} fontSize="inherit" motionBlur={false} fade={0.15} /></dd>
        <dt>GitHub account since</dt>
      </dl>
    </AnimatedContent>
    <div className="activity-section">
      <div><p className="eyebrow">Contribution History</p><p className="activity-intro">A live view of my public GitHub activity over the past year.</p></div>
      {history ? <ActivityTerrain title="Aarya on GitHub" data={history.data} endDate={history.endDate} className="activity-terrain" /> : <p className="activity-loading">{failed ? 'Contribution history is temporarily unavailable.' : 'Loading GitHub activity…'} <a href="https://github.com/aaryaavinash" target="_blank" rel="noreferrer noopener">View GitHub ↗</a></p>}
    </div>
    </>
  );
}

export function mountImpact(container: HTMLElement): () => void {
  const root = createRoot(container);
  root.render(<ImpactStats />);
  return () => root.unmount();
}
