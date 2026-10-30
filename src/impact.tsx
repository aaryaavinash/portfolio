import { createRoot } from 'react-dom/client';
import { useEffect, useLayoutEffect, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedContent from './components/AnimatedContent';
import Counter from './components/Counter';
import ActivityTerrain from './components/ActivityTerrain';
import { parseContributions, type ContributionSeries } from './contributions';

const initialStats = { publicRepos: 2, originals: 1, forks: 1, since: 2023 };

function ImpactStats() {
  useLayoutEffect(() => { ScrollTrigger.refresh(); }, []);
  const [stats, setStats] = useState(initialStats);
  const [history, setHistory] = useState<ContributionSeries | null>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/github-snapshot', { signal: controller.signal })
      .then(response => { if (!response.ok) throw new Error('GitHub snapshot unavailable'); return response.json(); })
      .then(value => {
        if (!value || !Number.isInteger(value.publicRepos) || !Number.isInteger(value.originals) || !Number.isInteger(value.forks) || !Number.isInteger(value.since)) throw new Error('Invalid GitHub snapshot');
        setStats(value);
      })
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
        <dt>Original project</dt>
      </dl>
      <dl className="stat">
        <dd><Counter className="impact-counter" value={stats.forks} fontSize="inherit" motionBlur={false} fade={0.15} /></dd>
        <dt>Open source fork</dt>
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
