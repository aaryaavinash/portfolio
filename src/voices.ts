import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const voices = [
  { quote: 'I build for the web and founded Zyrix Dev to explore distinctive digital experiences.', name: 'Aarya Avinash', role: 'Development', image: 'https://avatars.githubusercontent.com/u/133252493?v=4' },
  { quote: 'Graphic design and video editing are part of how I work with visuals and stories.', name: 'Aarya Avinash', role: 'Creative work', image: 'https://avatars.githubusercontent.com/u/133252493?v=4' },
  { quote: 'I trade forex and crypto, and play everything from Minecraft and BGMI to chess and CS2.', name: 'Aarya Avinash', role: 'Markets and play', image: 'https://avatars.githubusercontent.com/u/133252493?v=4' },
];

export function initVoices(motion: MediaQueryList): () => void {
  const events = new AbortController();
  const signal = events.signal;
  const buttons = [...document.querySelectorAll<HTMLButtonElement>('[data-voice]')];
  const quote = document.querySelector<HTMLElement>('#quote')!;
  const byline = document.querySelector<HTMLElement>('#quote-by')!;
  const image = document.querySelector<HTMLImageElement>('#voice-image')!;
  const section = document.querySelector('.voices-grid')!;
  let active = 0;
  let visible = false;
  let words: HTMLElement[] = [];
  let wordTween: gsap.core.Tween | undefined;
  quote.setAttribute('aria-live', 'polite');
  quote.setAttribute('aria-atomic', 'true');
  function showWords(): void {
    wordTween?.kill();
    if (motion.matches) { gsap.set(words, { y: 0, opacity: 1 }); return; }
    if (visible) wordTween = gsap.to(words, { y: 0, opacity: 1, duration: .52, stagger: .022, ease: 'power3.out', overwrite: 'auto' });
  }
  function render(): void {
    wordTween?.kill();
    const voice = voices[active];
    buttons.forEach((button, index) => {
      button.classList.toggle('voice-active', index === active);
      button.setAttribute('aria-pressed', String(index === active));
      button.setAttribute('aria-controls', 'quote');
    });
    const paragraph = document.createElement('p');
    const text = voice.quote;
    paragraph.setAttribute('aria-label', text);
    words = text.split(' ').map(word => {
      const slot = document.createElement('span');
      slot.className = 'quote-word';
      slot.setAttribute('aria-hidden', 'true');
      const inner = document.createElement('span');
      inner.textContent = word;
      slot.append(inner);
      paragraph.append(slot, ' ');
      return inner;
    });
    quote.replaceChildren(paragraph);
    gsap.set(words, { y: motion.matches ? 0 : 18, opacity: motion.matches ? 1 : 0 });
    byline.textContent = `${voice.name} — ${voice.role}`;
    if (image.src !== voice.image) image.src = voice.image;
    image.alt = "Aarya Avinash's GitHub profile photo";
    image.closest('figure')!.setAttribute('aria-label', image.alt);
    showWords();
  }
  function select(index: number): void {
    if (index === active) return;
    active = index;
    render();
  }
  buttons.forEach((button, index) => {
    button.addEventListener('pointerenter', event => { if (event.pointerType === 'mouse') select(index); }, { signal });
    button.addEventListener('focus', () => select(index), { signal });
    button.addEventListener('click', () => select(index), { signal });
    button.addEventListener('keydown', event => {
      if (!['ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? buttons.length - 1 : (index + (event.key === 'ArrowDown' ? 1 : -1) + buttons.length) % buttons.length;
      buttons[next].focus();
    }, { signal });
  });
  render();
  const trigger = ScrollTrigger.create({ trigger: section, start: 'top bottom', once: true, onEnter: () => { visible = true; showWords(); } });
  motion.addEventListener('change', showWords, { signal });
  return () => { events.abort(); trigger.kill(); wordTween?.kill(); };
}
