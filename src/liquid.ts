import { gsap } from 'gsap';

export function initLiquidImages(motion: MediaQueryList): () => void {
  const events = new AbortController();
  const signal = events.signal;
  const resets = new Map<Element, () => void>();
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (!entry.isIntersecting) resets.get(entry.target)?.(); });
  });
  const hover = matchMedia('(hover: hover) and (pointer: fine) and (min-width: 769px)');
  document.querySelectorAll<HTMLElement>('[data-liquid]').forEach((figure, index) => {
    const bare = figure.classList.contains('liquid-bare');
    const media = figure.querySelector<HTMLImageElement | HTMLVideoElement>('img, video')!;
    const id = `liquid-${index}`;
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    svg.innerHTML = `<defs><filter id="${id}" x="-15%" y="-15%" width="130%" height="130%" color-interpolation-filters="sRGB"><feTurbulence type="fractalNoise" baseFrequency="0.009" numOctaves="2" seed="${index + 1}" result="noise"/><feDisplacementMap in="SourceGraphic" in2="noise" scale="1" xChannelSelector="R" yChannelSelector="G"/></filter></defs>`;
    figure.prepend(svg);
    figure.style.setProperty('--liquid-filter', `url(#${id})`);
    const turbulence = svg.querySelector('feTurbulence')!;
    const displacement = svg.querySelector('feDisplacementMap')!;
    if (!bare) {
      figure.setAttribute('role', 'img');
      figure.setAttribute('aria-label', media.getAttribute('alt') || 'Portfolio image');
      for (const name of ['veil', 'glow', 'vignette']) {
        const layer = document.createElement('span');
        layer.className = `liquid-${name}`;
        layer.setAttribute('aria-hidden', 'true');
        figure.append(layer);
      }
      const fallback = document.createElement('span');
      fallback.className = 'liquid-placeholder';
      fallback.hidden = true;
      fallback.setAttribute('aria-hidden', 'true');
      figure.append(fallback);
      const image = media as HTMLImageElement;
      const showFallback = (): void => {
        fallback.textContent = image.alt;
        fallback.hidden = false;
      };
      image.addEventListener('error', showFallback, { signal });
      image.addEventListener('load', () => { fallback.hidden = true; }, { signal });
      if (image.complete && image.naturalWidth === 0) showFallback();
    }
    const state = { amount: 0 };
    const maximum = Number(figure.dataset.liquid);
    let tween: gsap.core.Tween | undefined;
    function setHover(active: boolean): void {
      const enabled = active && hover.matches && !motion.matches && !document.hidden;
      figure.classList.toggle('is-hovered', enabled);
      tween?.kill();
      if (enabled) figure.style.setProperty('--liquid-filter', `url(#${id})`);
      tween = gsap.to(state, {
        amount: enabled ? 1 : 0,
        duration: .52,
        ease: enabled ? 'elastic.out(1,0.5)' : 'power3.out',
        onUpdate: () => {
          displacement.setAttribute('scale', String(1 + (maximum - 1) * state.amount));
          turbulence.setAttribute('baseFrequency', String(Math.max(.001, .009 + .013 * state.amount)));
        },
        onComplete: () => { if (!enabled) figure.style.setProperty('--liquid-filter', 'none'); },
      });
    }
    const reset = (): void => {
      tween?.kill();
      state.amount = 0;
      figure.classList.remove('is-hovered');
      figure.style.setProperty('--liquid-filter', 'none');
      displacement.setAttribute('scale', '1');
      turbulence.setAttribute('baseFrequency', '.009');
    };
    const surface = bare ? media : figure;
    surface.addEventListener('pointerenter', () => setHover(true), { signal });
    surface.addEventListener('pointerleave', () => setHover(false), { signal });
    motion.addEventListener('change', reset, { signal });
    hover.addEventListener('change', reset, { signal });
    document.addEventListener('visibilitychange', () => { if (document.hidden) reset(); }, { signal });
    resets.set(figure, reset);
    observer.observe(figure);
    reset();
  });
  return () => { events.abort(); observer.disconnect(); resets.forEach(reset => reset()); };
}
