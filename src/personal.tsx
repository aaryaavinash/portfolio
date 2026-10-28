import { createRoot } from 'react-dom/client';
import { useEffect, useState } from 'react';
import CardFlip from './components/CardFlip';
import NowPlaying from './components/NowPlaying';
import TearTicket from './components/TearTicket';
// ORIGINAL (preserved, not deleted — disabled by comment): import { parseLatestTrack, type LatestTrack } from './lastfm-data';
import { parseLatestTrack } from './lastfm-data';
import { parseMusicSnapshot, type MusicSnapshot } from './music-data';

function LastFmMusic() {
  const [snapshot, setSnapshot] = useState<MusicSnapshot | null>(null);
  const [status, setStatus] = useState('Checking recent listening…');
  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        let next: MusicSnapshot;
        try {
          const response = await fetch('/api/music');
          if (!response.ok) throw new Error('History endpoint unavailable');
          next = parseMusicSnapshot(await response.json());
        } catch {
          // shortcut: Vite preview has no Pages Function; fall back to the public latest-song widget until deployed.
          const response = await fetch('https://lastfm-last-played.biancarosa.com.br/aaryaavinash/latest-song');
          if (!response.ok) throw new Error('Last.fm widget unavailable');
          next = { latest: parseLatestTrack(await response.json()), recent: [], updatedAt: new Date().toISOString() };
        }
        if (!active) return;
        setSnapshot(next);
        setStatus(next.latest ? '' : 'No public scrobbles yet. Connect Spotify to Last.fm to fill this space.');
      } catch {
        if (active) setStatus('Listening history is unavailable right now.');
      }
    };
    void load();
    const timer = window.setInterval(() => { if (!document.hidden) void load(); }, 120_000);
    return () => { active = false; window.clearInterval(timer); };
  }, []);
  const track = snapshot?.latest;
  const recent = snapshot?.recent.length ? snapshot.recent : track ? [track] : [];
  return <div className="personal-stage music-stage"><NowPlaying
    className="music-preview"
    tracks={[{ title: track?.title ?? 'Waiting for the first song', artist: track?.artist ?? 'Spotify → Last.fm', duration: 180, artwork: 1 }]}
    autoPlay={false}
    displayOnly
    statusLabel={track?.nowPlaying ? 'Now listening' : track ? 'Last played' : 'Listening feed'}
    accent="#ff3b1d"
  /><div className="recent-list" aria-label="Recent listening"><div className="recent-heading"><span>{track?.nowPlaying ? 'NOW LISTENING / RECENT' : 'RECENT LISTENING'}</span><a href="https://www.last.fm/user/aaryaavinash" target="_blank" rel="noreferrer noopener">VIEW LAST.FM ↗</a></div>{status && <p role="status">{status}</p>}{!track && <a className="music-connect" href="https://www.last.fm/settings/applications" target="_blank" rel="noreferrer noopener">Connect Spotify to Last.fm ↗</a>}{recent.length > 0 && <ol aria-live="polite">{recent.map((item, index) => <li key={`${item.url}-${item.playedAt ?? index}-${index}`}><span>{String(index + 1).padStart(2, '0')}</span><a href={item.url} target="_blank" rel="noreferrer noopener">{item.title}<small>{item.artist}</small></a><span>{item.nowPlaying ? 'LIVE' : item.playedAt ? new Date(item.playedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : index === 0 ? 'LATEST' : 'PLAYED'}</span></li>)}</ol>}</div></div>;
}

function PersonalPieces() {
  const [torn, setTorn] = useState(false);
  return <div className="personal-stack">
    <div className="personal-piece" id="play">
      <div className="personal-copy"><div className="eyebrow">Play / 01</div><h3>Off the clock</h3><p>Flick the card to see what I play. Minecraft, CODM, BGMI, Free Fire, GTA V, CS2, and chess are all in the mix.</p></div>
      <div className="personal-stage"><CardFlip
        label="Aarya's gaming interests"
        className="gaming-card"
        faceClassName="!rounded-sm !border-[#45403d] !bg-[#17171b] !text-[#f3f1ea]"
        front={<div className="gaming-face gaming-front"><div className="gaming-card-top"><span>AA // PLAYER ID</span><i aria-hidden="true" /></div><div className="gaming-emblem" aria-hidden="true"><span>AA</span></div><div className="gaming-card-bottom"><small>OFF THE CLOCK</small><strong>PLAY<br />MODE</strong><span>FLICK TO VIEW LOADOUT ↗</span></div></div>}
        back={<div className="gaming-face gaming-back"><div className="gaming-card-top"><span>LOADOUT / 07</span><i aria-hidden="true" /></div><div className="gaming-loadout"><div><span>01 / WORLDS</span><strong>Minecraft<br />GTA V</strong></div><div><span>02 / ARENA</span><strong>CODM · BGMI<br />Free Fire · CS2</strong></div><div><span>03 / STRATEGY</span><strong>Chess</strong></div></div><small>FLICK TO RETURN ↗</small></div>}
      /></div>
    </div>
    {/* ORIGINAL (preserved, not deleted — disabled by comment):
    <div className="personal-piece" id="music"><div className="personal-copy"><div className="eyebrow">Music / 02</div><h3>On the record</h3><p>My Last.fm account is coming later. This music card is a visual preview—there is no live track or audio playback yet.</p></div><div className="personal-stage music-stage"><NowPlaying className="music-preview" tracks={[{ title: 'Last.fm soon', artist: 'Music space preview', duration: 180, artwork: 1 }]} autoPlay={false} accent="#ff3b1d" /><div className="recent-list" aria-label="Recent listening"><div className="recent-heading"><span>RECENT LISTENING</span><span>LAST.FM / PLANNED</span></div><p>Listening history will appear here when my Last.fm profile is ready.</p><ol><li><span>01</span><span>Track title pending</span><span>—</span></li><li><span>02</span><span>Track title pending</span><span>—</span></li><li><span>03</span><span>Track title pending</span><span>—</span></li></ol></div></div></div>
    */}
    <div className="personal-piece" id="music">
      <div className="personal-copy"><div className="eyebrow">Music / 02</div><h3>On the record</h3><p>Connect Spotify to my Last.fm profile and this space will show what I'm hearing now and what played before. The record player is visual only; it does not stream audio.</p></div>
      <LastFmMusic />
    </div>
    <div className="personal-piece" id="connect">
      <div className="personal-copy"><div className="eyebrow">Connect / 03</div><h3>Start a conversation</h3><p>Tear the ticket, or write to me directly. The email link stays available either way.</p><a className="personal-mail" href="mailto:hello@aaya.cyou">hello@aaya.cyou ↗</a></div>
      <div className="personal-stage"><TearTicket
        width={460}
        height={250}
        stubSize={145}
        background="#17171b"
        color="#f3f1ea"
        rotate={0}
        image="/images/portfolio.svg"
        imageAlt="Abstract AA portfolio artwork"
        ariaLabel="Tear the contact ticket"
        onTear={() => setTorn(true)}
        className="contact-ticket"
        stub={<div className="ticket-stub"><span>ADMIT ONE</span><strong>PULL<br />TO<br />CONNECT</strong><small>AA / 2026</small></div>}
      ><div className="ticket-body"><span>AARYA AVINASH</span><strong>LET'S<br />BUILD.</strong><a href="mailto:hello@aaya.cyou">hello@aaya.cyou ↗</a></div></TearTicket>
      <p className="ticket-note" aria-live="polite">{torn ? 'Ticket torn. The email link is ready.' : 'The email link is always available.'}</p></div>
    </div>
  </div>;
}

export function mountPersonal(container: HTMLElement): () => void {
  const root = createRoot(container);
  root.render(<PersonalPieces />);
  return () => root.unmount();
}
