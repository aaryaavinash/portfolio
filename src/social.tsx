import { createRoot } from 'react-dom/client';
import { useEffect, useState } from 'react';
import { parseGitHubCard, type GitHubCardData } from './social-data';

function SocialCards() {
  const [github, setGithub] = useState<GitHubCardData | null>(null);
  const [githubError, setGithubError] = useState(false);
  // ORIGINAL (preserved, not deleted — disabled by comment): const [copyState, setCopyState] = useState('Copy username');
  const [discordImageError, setDiscordImageError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch('https://api.github.com/users/aaryaavinash', { signal: controller.signal, headers: { Accept: 'application/vnd.github+json' } })
      .then(response => { if (!response.ok) throw new Error('GitHub profile unavailable'); return response.json(); })
      .then(value => setGithub(parseGitHubCard(value)))
      .catch(error => { if (!controller.signal.aborted) { console.error(error); setGithubError(true); } });
    return () => controller.abort();
  }, []);

  // ORIGINAL (preserved, not deleted — disabled by comment):
  // async function copyDiscord(): Promise<void> {
  //   try { await navigator.clipboard.writeText('aaryaavinash'); setCopyState('Copied!'); }
  //   catch { setCopyState('Select username to copy'); }
  // }

  return <div className="social-card-grid">
    <article className="social-card instagram-card" aria-label="Instagram profile card">
      <div className="instagram-top"><span className="instagram-wordmark">Instagram</span><span className="social-card-mark">◎</span></div>
      <div className="instagram-profile"><div className="instagram-avatar-ring"><img src="https://avatars.githubusercontent.com/u/133252493?v=4" alt="Aarya Avinash" loading="lazy" /></div><div><h3>aaryaavinash_</h3><p>Aarya Avinash</p></div></div>
      <p className="instagram-bio">Developer · creator · student<br />Visuals, projects, and moments beyond the build.</p>
      <div className="instagram-placeholder"><span>PROFILE</span><strong>See the real posts on Instagram.</strong></div>
      <a className="instagram-follow" href="https://www.instagram.com/aaryaavinash_/" target="_blank" rel="noreferrer noopener">View Instagram ↗</a>
    </article>
    <article className="social-card github-card" aria-label="GitHub profile card">
      <div className="github-top"><span className="github-symbol" aria-hidden="true">GH</span><span>GITHUB / LIVE PROFILE</span></div>
      <div className="github-profile"><img src="https://avatars.githubusercontent.com/u/133252493?v=4" alt="Aarya Avinash" loading="lazy" /><div><h3>Aarya Avinash</h3><p>@aaryaavinash</p></div></div>
      <p className="github-bio">{github?.bio || 'Building and sharing work on GitHub.'}</p>
      <div className="github-metrics" aria-live="polite"><div><strong>{github ? github.publicRepos : '—'}</strong><span>Repositories</span></div><div><strong>{github ? github.followers : '—'}</strong><span>Followers</span></div><div><strong>{github ? github.following : '—'}</strong><span>Following</span></div></div>
      <p className="social-data-note">{githubError ? 'Live numbers unavailable right now.' : github ? 'Public GitHub numbers loaded on this visit.' : 'Loading public GitHub numbers…'}</p>
      <a className="github-visit" href="https://github.com/aaryaavinash" target="_blank" rel="noreferrer noopener">Open GitHub ↗</a>
    </article>
    <article className="social-card discord-card" aria-label="Discord profile card">
      {discordImageError ? <>
        <div className="discord-banner"><span>DISCORD</span><span className="discord-spark" aria-hidden="true">✦</span></div>
        <div className="discord-body"><img className="discord-avatar" src="https://avatars.githubusercontent.com/u/133252493?v=4" alt="Aarya Avinash" loading="lazy" /><h3>Aarya Avinash</h3><p className="discord-handle">aaryaavinash</p><div className="discord-divider" /><span className="discord-label">ABOUT ME</span><p>Developer, founder of Zyrix Dev, gamer, and creator.</p>{/* ORIGINAL (preserved, not deleted — disabled by comment): <div className="discord-status"><span className="discord-status-dot" /> Live presence will appear when a Discord ID is connected.</div> */}<div className="discord-status"><span className="discord-status-dot" /> Live Discord status is unavailable right now.</div>{/* ORIGINAL (preserved, not deleted — disabled by comment): <button type="button" onClick={copyDiscord} aria-live="polite">{copyState}</button> */}</div>
      </> : <div className="discord-live">
        <div className="discord-live-heading"><span>DISCORD / LIVE PRESENCE</span><span aria-hidden="true">✦</span></div>
        <a href="https://discord.com/users/1217420097317109821" target="_blank" rel="noreferrer noopener" aria-label="Open Aarya Avinash on Discord">
          <img src="https://dsc-readme.tsuni.dev/api/user/1217420097317109821?banner=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fc1%2Fa1%2Fdb%2Fc1a1db513566b54bc98ee5aef7878eac.gif&theme=dark&width=512" alt="Aarya Avinash's live Discord profile and activity" loading="lazy" decoding="async" onError={() => setDiscordImageError(true)} />
        </a>
        <p>Live activity from Discord. Updates depend on profile visibility and the status service.</p>
        {/* ORIGINAL (preserved, not deleted — disabled by comment): <button type="button" onClick={copyDiscord} aria-live="polite">{copyState}</button> */}
      </div>}
    </article>
  </div>;
}

export function mountSocial(container: HTMLElement): () => void {
  const root = createRoot(container);
  root.render(<SocialCards />);
  return () => root.unmount();
}
