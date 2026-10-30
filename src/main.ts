import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initLiquidImages } from './liquid';
import { initVoices } from './voices';
import { initAmbient } from './ambient';
import { initContact } from './contact';

gsap.registerPlugin(ScrollTrigger);
const root = document.documentElement;
const motion = matchMedia('(prefers-reduced-motion: reduce)');
const events = new AbortController();
const signal = events.signal;
root.classList.add('js', 'gsap-motion');
root.classList.toggle('motion', !motion.matches);

const lenis = new Lenis({ smoothWheel: !motion.matches, lerp: .1, autoRaf: false });
const ambient = initAmbient(document.querySelector<HTMLCanvasElement>('#ambient-canvas')!, motion);
const disposeContact = initContact(motion);
const onAmbientScroll = () => ambient?.setScroll(lenis.scroll);
lenis.on('scroll', onAmbientScroll);
const tick = (time: number): void => { lenis.raf(time * 1000); };
lenis.on('scroll', ScrollTrigger.update);
let tickerActive = false;
function syncTicker(): void {
  const active = !motion.matches && !document.hidden;
  if (active === tickerActive) return;
  tickerActive = active;
  if (active) gsap.ticker.add(tick);
  else gsap.ticker.remove(tick);
}
syncTicker();
// ORIGINAL (preserved, not deleted — disabled by comment): gsap.ticker.lagSmoothing(0);
// Keep GSAP's default lag handling so returning to the tab cannot jump a scroll animation.

const loader = document.querySelector<HTMLElement>('#preloader')!;
const counter = document.querySelector('#count')!;
const main = document.querySelector<HTMLElement>('main')!;
const header = document.querySelector<HTMLElement>('header')!;
const burger = document.querySelector<HTMLButtonElement>('.burger')!;
const menu = document.querySelector<HTMLElement>('.mobile-menu')!;
const menuLinks = [...menu.querySelectorAll<HTMLAnchorElement>('a')];
const marquee = document.querySelector<HTMLElement>('.marquee-track')!;
let loading = !motion.matches;
let menuOpen = false;
let marqueeVisible = false;
let disposed = false;

function syncScrollLock(): void {
  root.classList.toggle('scroll-locked', loading || menuOpen);
  main.inert = loading || menuOpen;
  header.inert = loading;
  if (loading || menuOpen) lenis.stop();
  else lenis.start();
}
function finishLoading(): void {
  loading = false;
  loader.setAttribute('aria-hidden', 'true');
  gsap.set(loader, { autoAlpha: 0, pointerEvents: 'none' });
  syncScrollLock();
}
const nameLines = [...document.querySelectorAll<HTMLElement>('.name-line')];
nameLines.forEach(line => {
  const name = line.dataset.name!;
  line.setAttribute('aria-label', name);
  line.replaceChildren(...[...name].map(letter => {
    const span = document.createElement('span');
    span.className = 'letter';
    span.setAttribute('aria-hidden', 'true');
    span.textContent = letter;
    return span;
  }));
});
const roles = document.querySelectorAll('.role-line span');
const description = document.querySelector('.hero-desc')!;
const cue = document.querySelector('.scroll-cue')!;
const intro = gsap.timeline({ paused: true });
const markPaths = [...document.querySelectorAll<SVGGeometryElement>('#loading-mark .draw')];
markPaths.forEach(path => {
  const length = path.getTotalLength();
  gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
});
if (!motion.matches) {
  syncScrollLock();
  scrollTo(0, 0);
  const progress = { value: 0 };
  let lastCount = -1;
  intro.to(markPaths, { strokeDashoffset: 0, duration: 1.8, stagger: .12, ease: 'power2.inOut' }, .1)
    .fromTo('#loading-mark', { scale: .86, opacity: .35 }, { scale: 1, opacity: 1, duration: 1.8, ease: 'expo.out' }, 0);
  intro.to(progress, { value: 100, duration: 2, ease: 'none', onUpdate: () => {
    const next = Math.round(progress.value);
    if (next !== lastCount) { counter.textContent = String(next); lastCount = next; }
  } }, 0)
    .to('.pre-label', { opacity: 0, duration: .3 }, 2)
    .to(loader, { yPercent: -100, duration: .65, ease: 'power3.out', onComplete: finishLoading }, 2.5);
  nameLines.forEach((line, index) => intro.fromTo(line.children,
    { y: 0, yPercent: 100, opacity: 0 },
    { yPercent: 0, opacity: 1, duration: .9, stagger: .052, ease: 'expo.out' }, 2.5 + index * .24));
  intro.fromTo(roles, { y: 0, yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: .76, stagger: .08, ease: 'expo.out' }, 2.7)
    .fromTo(description, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: .52, ease: 'expo.out' }, 2.9)
    .fromTo(cue, { opacity: 0 }, { opacity: 1, duration: .5 }, 3.4)
    .call(() => document.body.classList.add('hero-ready'));
  intro.play();
} else { document.body.classList.add('hero-ready'); finishLoading(); }

// Reversing the same timeline makes rapid menu toggles continuous.
const menuAnimation = gsap.timeline({ paused: true })
  .fromTo(menu, { autoAlpha: 0 }, { autoAlpha: 1, duration: .45, ease: 'power2.out' }, 0)
  .fromTo(menuLinks, { y: 48, opacity: 0 }, { y: 0, opacity: 1, duration: .42, stagger: .06, ease: 'expo.out' }, .12);
function setMenu(open: boolean, restoreFocus = true): void {
  menuOpen = open;
  menu.inert = !open;
  menu.classList.toggle('open', open);
  burger.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', String(open));
  burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  document.querySelector<HTMLElement>('.brand')!.inert = open;
  syncScrollLock();
  if (motion.matches) menuAnimation.progress(open ? 1 : 0).pause();
  else if (open) menuAnimation.timeScale(1).play();
  else menuAnimation.timeScale(1.8).reverse();
  if (open) { gsap.set(menu, { visibility: 'visible' }); menuLinks[0].focus({ preventScroll: true }); }
  else if (restoreFocus) burger.focus({ preventScroll: true });
}
burger.addEventListener('click', () => setMenu(!menuOpen), { signal });
addEventListener('keydown', event => {
  if (!menuOpen) return;
  if (event.key === 'Escape') { setMenu(false); return; }
  if (event.key !== 'Tab') return;
  const controls = [burger, ...menuLinks];
  const index = controls.indexOf(document.activeElement as HTMLButtonElement | HTMLAnchorElement);
  if (event.shiftKey && index <= 0) { event.preventDefault(); controls.at(-1)!.focus(); }
  else if (!event.shiftKey && index === controls.length - 1) { event.preventDefault(); burger.focus(); }
}, { signal });
matchMedia('(min-width:1024px)').addEventListener('change', event => {
  if (event.matches && menuOpen) setMenu(false, false);
}, { signal });
document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach(link => link.addEventListener('click', event => {
  const target = document.getElementById(link.hash.slice(1));
  if (!target) return;
  event.preventDefault();
  if (menuOpen) setMenu(false, false);
  lenis.scrollTo(target, { immediate: motion.matches, offset: target.id === 'top' ? 0 : -80 });
  history.replaceState(null, '', link.hash);
  target.setAttribute('tabindex', '-1');
  target.focus({ preventScroll: true });
}, { signal }));

const railLinks = [...document.querySelectorAll<HTMLAnchorElement>('.section-rail a')];
const railObserver = new IntersectionObserver(entries => {
  const current = entries.find(entry => entry.isIntersecting);
  if (!current) return;
  railLinks.forEach(link => {
    const selected = link.hash === `#${current.target.id}`;
    link.classList.toggle('active', selected);
    if (selected) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}, { rootMargin: '-35% 0px -55% 0px' });
railLinks.forEach(link => railObserver.observe(document.getElementById(link.hash.slice(1))!));

const headings = [...document.querySelectorAll<HTMLElement>('.section-title, .section-head h2, .contact-title')];
const headingText = new Map(headings.map(heading => [heading, [...heading.querySelectorAll('.reveal-line')].map(line => line.textContent!.trim()).join(' ')]));
function splitHeadings(): void {
  // Write all measurement spans, then read positions, then write final lines.
  const measurements = headings.map(heading => {
    gsap.killTweensOf(heading.querySelectorAll('.reveal-line > span'));
    const text = headingText.get(heading)!;
    heading.setAttribute('aria-label', text);
    const words = text.split(' ').map(word => {
      const span = document.createElement('span');
      span.style.display = 'inline-block';
      span.textContent = word;
      return span;
    });
    heading.replaceChildren(...words.flatMap(word => [word, ' ']));
    return { heading, words };
  });
  const measured = measurements.map(({ heading, words }) => {
    const lines: string[] = [];
    let top = -1;
    for (const word of words) {
      if (word.offsetTop !== top) { lines.push(word.textContent!); top = word.offsetTop; }
      else lines[lines.length - 1] += ` ${word.textContent}`;
    }
    return { heading, lines };
  });
  measured.forEach(({ heading, lines }) => heading.replaceChildren(...lines.map(text => {
    const line = document.createElement('span');
    line.className = 'reveal-line';
    line.setAttribute('aria-hidden', 'true');
    const inner = document.createElement('span');
    inner.textContent = text;
    line.append(inner);
    return line;
  })));
}
function fitName(): void {
  nameLines.forEach(line => line.style.removeProperty('font-size'));
  const width = document.documentElement.clientWidth - 24;
  const sizes = nameLines.map(line => {
    const size = parseFloat(getComputedStyle(line).fontSize);
    return Math.min(size, size * width / Math.max(line.scrollWidth, 1));
  });
  nameLines.forEach((line, index) => { line.style.fontSize = `${sizes[index]}px`; });
}
splitHeadings();
fitName();
const blocks = [...document.querySelectorAll<HTMLElement>('.fade-up, .voice-portrait')];
const triggers: ScrollTrigger[] = [];
const revealTweens = new Set<gsap.core.Tween>();
function reveal(target: Element, vars: gsap.TweenVars): void {
  let tween: gsap.core.Tween;
  tween = gsap.to(target, { ...vars, overwrite: 'auto', onComplete: () => { revealTweens.delete(tween); } });
  revealTweens.add(tween);
}
blocks.forEach(element => {
  const isPortrait = element.classList.contains('voice-portrait');
  const isVenture = element.classList.contains('venture');
  const index = Array.from(element.parentElement!.children).indexOf(element);
  const delay = isVenture ? index % 2 * .12 : element.matches('.stat') ? index * .11 : element.matches('.principles li') ? index * .09 : 0;
  if (!motion.matches) gsap.set(element, { opacity: 0, y: isPortrait ? 0 : isVenture ? 60 : 24, scale: isPortrait ? 1.06 : 1 });
  triggers.push(ScrollTrigger.create({ trigger: element, start: 'top bottom', once: true, onEnter: () => {
    element.classList.add('in-view');
    if (motion.matches) return;
    reveal(element, { opacity: 1, y: 0, scale: 1, duration: isPortrait ? .64 : isVenture ? .62 : .56, delay, ease: 'expo.out', clearProps: 'transform,opacity' });
  } }));
});
headings.forEach(heading => {
  triggers.push(ScrollTrigger.create({ trigger: heading, start: 'top bottom', once: true, onEnter: () => {
    heading.classList.add('in-view');
    if (motion.matches) return;
    const tween = gsap.fromTo(heading.querySelectorAll('.reveal-line > span'),
      { y: 0, yPercent: 110, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: .9, stagger: .09, ease: 'expo.out', clearProps: 'transform,opacity', onComplete: () => { revealTweens.delete(tween); } });
    revealTweens.add(tween);
  } }));
});
const disposeLiquid = initLiquidImages(motion);
const disposeVoices = initVoices(motion);

const projectsContainer = document.querySelector<HTMLElement>('#project-gallery')!;
let disposeProjects: (() => void) | undefined;
const projectsObserver = new IntersectionObserver(entries => {
  if (!entries.some(entry => entry.isIntersecting)) return;
  projectsObserver.disconnect();
  void import('./projects').then(({ mountProjects }) => {
    // ORIGINAL (preserved, not deleted — disabled by comment): if (!disposed) disposeProjects = mountProjects(projectsContainer, motion);
    if (!disposed) disposeProjects = mountProjects(projectsContainer, motion, top => lenis.scrollTo(top));
  }).catch(error => { console.error('Project gallery could not load; selected projects remain available.', error); });
}, { rootMargin: '800px 0px' });
projectsObserver.observe(document.querySelector<HTMLElement>('#ventures')!);

// Keep React off the hero's startup path; static stats remain readable until the island loads.
const impactContainer = document.querySelector<HTMLElement>('#impact-stats')!;
let disposeImpact: (() => void) | undefined;
const impactObserver = new IntersectionObserver(entries => {
  if (!entries.some(entry => entry.isIntersecting)) return;
  impactObserver.disconnect();
  void import('./impact').then(({ mountImpact }) => {
    if (!disposed) disposeImpact = mountImpact(impactContainer);
  }).catch(error => { console.error('Impact animation could not load; static figures remain available.', error); });
}, { rootMargin: '600px 0px' });
impactObserver.observe(impactContainer);

const personalContainer = document.querySelector<HTMLElement>('#personal-interactions')!;
let disposePersonal: (() => void) | undefined;
const personalObserver = new IntersectionObserver(entries => {
  if (!entries.some(entry => entry.isIntersecting)) return;
  personalObserver.disconnect();
  void import('./personal').then(({ mountPersonal }) => {
    if (!disposed) disposePersonal = mountPersonal(personalContainer);
  }).catch(error => { console.error('Personal interactions could not load; text remains available.', error); });
}, { rootMargin: '600px 0px' });
personalObserver.observe(personalContainer);

const socialContainer = document.querySelector<HTMLElement>('#social-cards')!;
let disposeSocial: (() => void) | undefined;
const socialObserver = new IntersectionObserver(entries => {
  if (!entries.some(entry => entry.isIntersecting)) return;
  socialObserver.disconnect();
  void import('./social').then(({ mountSocial }) => {
    if (!disposed) disposeSocial = mountSocial(socialContainer);
  }).catch(error => { console.error('Social cards could not load; profile links remain available.', error); });
}, { rootMargin: '600px 0px' });
socialObserver.observe(socialContainer);


function syncMedia(): void {
  syncTicker();
  marquee.style.animationPlayState = !document.hidden && !motion.matches && marqueeVisible ? 'running' : 'paused';
}
const mediaObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    marqueeVisible = entry.isIntersecting;
  });
  syncMedia();
});
mediaObserver.observe(marquee);
syncMedia();
document.addEventListener('visibilitychange', syncMedia, { signal });

motion.addEventListener('change', () => {
  root.classList.toggle('motion', !motion.matches);
  lenis.options.smoothWheel = !motion.matches;
  if (motion.matches) {
    lenis.stop();
    intro.progress(1).pause();
    finishLoading();
    revealTweens.forEach(tween => tween.kill());
    revealTweens.clear();
    blocks.forEach(element => element.classList.add('in-view'));
    headings.forEach(heading => heading.classList.add('in-view'));
    gsap.set([...blocks, ...document.querySelectorAll('.reveal-line > span')], { clearProps: 'transform,opacity' });
    menuAnimation.progress(menuOpen ? 1 : 0).pause();
  }
  syncScrollLock();
  syncMedia();
}, { signal });
let resizeTimer: ReturnType<typeof setTimeout>;
let lastWidth = document.documentElement.clientWidth;
function refreshLayout(): void {
  if (disposed) return;
  splitHeadings();
  fitName();
  lenis.resize();
  ScrollTrigger.refresh();
}
void document.fonts.ready.then(refreshLayout);
addEventListener('resize', () => {
  const width = document.documentElement.clientWidth;
  if (width === lastWidth) return;
  lastWidth = width;
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(refreshLayout, 150);
}, { signal });
if (import.meta.hot) import.meta.hot.dispose(() => {
  disposed = true;
  events.abort();
  clearTimeout(resizeTimer);
  intro.kill(); menuAnimation.kill();
  triggers.forEach(trigger => trigger.kill());
  revealTweens.forEach(tween => tween.kill());
  mediaObserver.disconnect();
  railObserver.disconnect();
  disposeLiquid(); disposeVoices();
  disposeContact();
  projectsObserver.disconnect(); disposeProjects?.();
  impactObserver.disconnect(); disposeImpact?.();
  personalObserver.disconnect(); disposePersonal?.();
  socialObserver.disconnect(); disposeSocial?.();
  gsap.ticker.remove(tick);
  lenis.off('scroll', onAmbientScroll);
  lenis.off('scroll', ScrollTrigger.update);
  lenis.destroy();
  ambient?.dispose();
  root.classList.remove('scroll-locked');
  main.inert = false; header.inert = false;
});
