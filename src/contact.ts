import { gsap } from 'gsap';

export function initContact(reduced: MediaQueryList): () => void {
  const details = document.querySelector<HTMLDetailsElement>('.contact-reveal')!;
  const summary = details.querySelector<HTMLElement>('summary')!;
  const card = details.querySelector<HTMLElement>('.contact-reveal-card')!;
  const pieces = [...card.querySelectorAll<HTMLElement>('.contact-reveal-top, h3, p, a, small')];
  const events = new AbortController();
  let open = false;

  function show(): void {
    if (open) return;
    open = true;
    details.open = true;
    summary.setAttribute('aria-expanded', 'true');
    const above = innerHeight - summary.getBoundingClientRect().bottom < card.offsetHeight + 12 && summary.getBoundingClientRect().top > card.offsetHeight + 12;
    details.classList.toggle('open-up', above);
    gsap.killTweensOf([card, ...pieces]);
    if (reduced.matches) { gsap.set([card, ...pieces], { clearProps: 'all' }); return; }
    // ORIGINAL (preserved, not deleted — disabled by comment): gsap.fromTo(card, { autoAlpha: 0, y: -18, scale: .94 }, { autoAlpha: 1, y: 0, scale: 1, duration: .6, ease: 'back.out(1.2)' });
    gsap.fromTo(card, { autoAlpha: 0, y: above ? 18 : -18, scale: .94 }, { autoAlpha: 1, y: 0, scale: 1, duration: .6, ease: 'back.out(1.2)' });
    gsap.fromTo(pieces, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: .8, stagger: .07, delay: .12, ease: 'back.out(1.1)' });
  }

  function hide(): void {
    if (!open) return;
    open = false;
    summary.setAttribute('aria-expanded', 'false');
    gsap.killTweensOf([card, ...pieces]);
    // ORIGINAL (preserved, not deleted — disabled by comment): const finish = () => { if (!open) { details.open = false; gsap.set([card, ...pieces], { clearProps: 'all' }); } };
    const finish = () => { if (!open) { details.open = false; details.classList.remove('open-up'); gsap.set([card, ...pieces], { clearProps: 'all' }); } };
    if (reduced.matches) finish();
    // ORIGINAL (preserved, not deleted — disabled by comment): else gsap.to(card, { autoAlpha: 0, y: -12, scale: .96, duration: .4, ease: 'power2.inOut', onComplete: finish });
    else gsap.to(card, { autoAlpha: 0, y: details.classList.contains('open-up') ? 12 : -12, scale: .96, duration: .4, ease: 'power2.inOut', onComplete: finish });
  }

  details.classList.add('is-enhanced');
  summary.addEventListener('click', event => {
    event.preventDefault();
    if (!open) show();
    else if (event.detail === 0 || matchMedia('(hover: none)').matches) hide();
  }, { signal: events.signal });
  details.addEventListener('pointerenter', event => { if (event.pointerType === 'mouse') show(); }, { signal: events.signal });
  // ORIGINAL (preserved, not deleted — disabled by comment): details.addEventListener('pointerleave', () => { if (!details.querySelector(':focus-visible')) hide(); }, { signal: events.signal });
  details.addEventListener('pointerleave', event => { if (event.pointerType === 'mouse' && !details.querySelector(':focus-visible')) hide(); }, { signal: events.signal });
  // ORIGINAL (preserved, not deleted — disabled by comment): details.addEventListener('focusin', show, { signal: events.signal });
  details.addEventListener('focusin', event => { if ((event.target as HTMLElement).matches(':focus-visible')) show(); }, { signal: events.signal });
  details.addEventListener('focusout', () => queueMicrotask(() => { if (!details.contains(document.activeElement)) hide(); }), { signal: events.signal });
  // ORIGINAL (preserved, not deleted — disabled by comment): details.addEventListener('keydown', event => { if (event.key === 'Escape') { hide(); summary.focus(); } }, { signal: events.signal });
  details.addEventListener('keydown', event => { if (event.key === 'Escape') { summary.focus(); hide(); } }, { signal: events.signal });
  document.addEventListener('pointerdown', event => { if (!details.contains(event.target as Node)) hide(); }, { signal: events.signal });

  // ORIGINAL (preserved, not deleted — disabled by comment): return () => { events.abort(); gsap.killTweensOf([card, ...pieces]); details.open = false; details.classList.remove('is-enhanced'); gsap.set([card, ...pieces], { clearProps: 'all' }); };
  return () => { events.abort(); gsap.killTweensOf([card, ...pieces]); details.open = false; details.classList.remove('is-enhanced', 'open-up'); gsap.set([card, ...pieces], { clearProps: 'all' }); };
}
