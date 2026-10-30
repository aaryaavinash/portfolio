import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const works = [
  ['abyssal', 'Abyssal', 'Deep ocean expedition', 'jpg'],
  ['artemis', 'Artemis Surface Stays', 'Lunar hospitality', 'webp'],
  ['atlas', 'Atlas of Drifting Isles', 'Worldbuilding atlas', 'webp'],
  ['ember', 'Hammer & Ember', 'Craft and fire', 'webp'],
  ['florae', 'Florae', 'Botanical editorial', 'jpg'],
  ['gambit', 'Gambit', 'Chess in motion', 'webp'],
  ['hangar', 'Hangar Nine', 'Aviation experience', 'jpg'],
  ['horologie', 'Aurel Horologie', 'Watchmaking story', 'webp'],
  ['keeper', 'The Keeper', 'Atmospheric narrative', 'jpg'],
  ['koen', 'Kōen 紅園', 'Japanese garden', 'webp'],
  ['koi', 'Still Water', 'Quiet digital space', 'jpg'],
  ['lithos', 'Lithos', 'Material and form', 'jpg'],
  ['lowfreq', 'Low Frequency', 'Sound-led experience', 'webp'],
  ['monolith', 'Monolith', 'Architectural concept', 'jpg'],
  ['nocturne', 'Nocturne No. 9', 'Nighttime editorial', 'jpg'],
  ['racer', 'Nightshift Motor Co.', 'Motor culture', 'jpg'],
  ['reliquary', 'Reliquary', 'Digital archive', 'jpg'],
  ['sucre', 'Maison Sucre', 'Patisserie concept', 'jpg'],
  ['terrarium', 'Bell & Moss', 'Living greenhouse', 'webp'],
  ['velocity', 'Velocity Lab', 'Experimental motion', 'jpg'],
] as const;

type Backdrop = ((progress: number) => void) & { dispose: () => void };

function createBackdrop(canvas: HTMLCanvasElement, reduced: MediaQueryList): Backdrop | null {
  if (reduced.matches || !matchMedia('(min-width: 1024px)').matches) return null;
  const gl = canvas.getContext('webgl', { alpha: false, antialias: false, powerPreference: 'low-power' });
  if (!gl) return null;
  const vertex = gl.createShader(gl.VERTEX_SHADER)!;
  gl.shaderSource(vertex, 'attribute vec2 p; void main(){gl_Position=vec4(p,0.,1.);}');
  gl.compileShader(vertex);
  const fragment = gl.createShader(gl.FRAGMENT_SHADER)!;
  gl.shaderSource(fragment, `precision mediump float;
    uniform vec2 resolution; uniform float time; uniform float progress;
    void main(){
      vec2 uv=gl_FragCoord.xy/resolution;
      vec2 p=(uv-.5)*vec2(resolution.x/resolution.y,1.);
      float wave=sin(p.x*6.+time*.16+progress*7.)*cos(p.y*7.-time*.12);
      float bloom=exp(-8.*length(p-vec2(sin(progress*6.283)*.4,-.15)));
      float edge=1.-smoothstep(.25,1.3,length(p));
      vec3 ink=vec3(.018,.017,.025);
      ink+=vec3(.14,.025,.015)*(bloom*.7+wave*.07)*edge;
      ink+=vec3(.015,.025,.035)*max(0.,wave)*edge;
      gl_FragColor=vec4(ink,1.);
    }`);
  gl.compileShader(fragment);
  const program = gl.createProgram()!;
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteShader(vertex); gl.deleteShader(fragment); gl.deleteProgram(program);
    return null;
  }
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,1,1]), gl.STATIC_DRAW);
  gl.useProgram(program);
  gl.enableVertexAttribArray(gl.getAttribLocation(program, 'p'));
  gl.vertexAttribPointer(gl.getAttribLocation(program, 'p'), 2, gl.FLOAT, false, 0, 0);
  const resolution = gl.getUniformLocation(program, 'resolution');
  const time = gl.getUniformLocation(program, 'time');
  const position = gl.getUniformLocation(program, 'progress');
  let progress = 0;
  let raf = 0;
  let last = 0;
  let visible = false;
  const resize = () => {
    const scale = Math.min(devicePixelRatio || 1, 1.5, 1280 / Math.max(canvas.clientWidth, 1));
    canvas.width = Math.max(1, Math.round(canvas.clientWidth * scale));
    canvas.height = Math.max(1, Math.round(canvas.clientHeight * scale));
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(resolution, canvas.width, canvas.height);
  };
  const frame = (now: number) => {
    if (!visible || document.hidden || reduced.matches) { raf = 0; return; }
    if (now - last > 30) {
      gl.uniform1f(time, now / 1000);
      gl.uniform1f(position, progress);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      last = now;
    }
    raf = requestAnimationFrame(frame);
  };
  const observe = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible && !reduced.matches && !raf) raf = requestAnimationFrame(frame);
  });
  observe.observe(canvas);
  const size = new ResizeObserver(resize);
  size.observe(canvas);
  resize();
  const onVisibility = () => { if (!document.hidden && visible && !raf) raf = requestAnimationFrame(frame); };
  document.addEventListener('visibilitychange', onVisibility);
  const onMotion = () => { if (reduced.matches) { cancelAnimationFrame(raf); raf = 0; } else onVisibility(); };
  reduced.addEventListener('change', onMotion);
  return Object.assign((value: number) => { progress = value; }, { dispose: () => {
    observe.disconnect(); size.disconnect(); document.removeEventListener('visibilitychange', onVisibility); reduced.removeEventListener('change', onMotion);
    cancelAnimationFrame(raf); gl.deleteBuffer(buffer); gl.deleteProgram(program);
    gl.deleteShader(vertex); gl.deleteShader(fragment);
  } });
}

export function mountProjects(container: HTMLElement, reduced: MediaQueryList): () => void {
  const section = container.closest<HTMLElement>('#ventures')!;
  // ORIGINAL (preserved, not deleted — disabled by comment): project screenshots were addressed as /projects/${slug}.${ext} before using each published repository's image directly.
  container.innerHTML = `<canvas class="projects-backdrop" aria-hidden="true"></canvas>
    <div class="projects-hud"><span>THE WORK / 20 WORLDS</span><span>SCROLL TO EXPLORE →</span></div>
    <div class="projects-window"><div class="projects-track">${works.map(([slug, name, kind, ext], index) => `
      <article class="project-frame${index === 0 ? ' is-active' : ''}">
        <a class="project-shot" href="https://${slug}.aarya.cyou/" target="_blank" rel="noreferrer noopener" aria-label="Explore ${name}">
          <img src="https://raw.githubusercontent.com/aaryaavinash/${slug}/main/docs/media/${slug}.${ext}" alt="${name} website preview" width="1280" height="800" loading="${index < 2 ? 'eager' : 'lazy'}" decoding="async">
          <span class="project-open">EXPLORE SITE ↗</span>
        </a>
        <div class="project-caption"><div><span>${String(index + 1).padStart(2, '0')} / 20 · ${kind}</span><h3>${name}</h3></div>
          <a href="https://github.com/aaryaavinash/${slug}" target="_blank" rel="noreferrer noopener" aria-label="View ${name} source code on GitHub">GITHUB ↗</a></div>
      </article>`).join('')}</div></div>
    <div class="projects-footer"><span class="projects-count">01 / 20</span><div class="projects-progress" aria-hidden="true"><span></span></div><a href="https://github.com/aaryaavinash?tab=repositories" target="_blank" rel="noreferrer noopener">ALL REPOSITORIES ↗</a></div>`;
  container.hidden = false;
  section.classList.add('projects-enhanced');
  section.querySelector<HTMLElement>('.section-meta')!.textContent = '20 / Projects';
  const track = container.querySelector<HTMLElement>('.projects-track')!;
  const frames = [...container.querySelectorAll<HTMLElement>('.project-frame')];
  const count = container.querySelector<HTMLElement>('.projects-count')!;
  const meter = container.querySelector<HTMLElement>('.projects-progress span')!;
  console.assert(frames.length === works.length, 'Project frames must match the gallery data.');
  let activeIndex = 0;
  const update = (value: number) => {
    const index = Math.min(works.length - 1, Math.round(value * (works.length - 1)));
    // ORIGINAL (preserved, not deleted — disabled by comment): frames.forEach((frame, i) => frame.classList.toggle('is-active', i === index));
    // ORIGINAL (preserved, not deleted — disabled by comment): count.textContent = `${String(index + 1).padStart(2, '0')} / 20`;
    if (index !== activeIndex) {
      frames[activeIndex].classList.remove('is-active');
      frames[index].classList.add('is-active');
      count.textContent = `${String(index + 1).padStart(2, '0')} / 20`;
      activeIndex = index;
      for (let next = Math.max(0, index - 1); next <= Math.min(index + 2, works.length - 1); next++) {
        frames[next].querySelector('img')!.loading = 'eager';
      }
    }
    meter.style.transform = `scaleX(${Math.max(0.01, value)})`;
    backdrop?.(value);
  };
  const backdrop = createBackdrop(container.querySelector('canvas')!, reduced);
  const media = gsap.matchMedia();
  media.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
    const distance = () => Math.max(0, track.scrollWidth - container.clientWidth);
    const tween = gsap.to(track, { x: () => -distance(), ease: 'none', paused: true });
    // ORIGINAL (preserved, not deleted — disabled by comment): const trigger = ScrollTrigger.create({ trigger: container, start: 'top top', end: () => `+=${distance()}`, pin: true, scrub: 1, animation: tween, invalidateOnRefresh: true, onUpdate: self => update(self.progress) });
    // Lenis already eases wheel input; a second scrub delay desynchronizes the image and counter.
    const trigger = ScrollTrigger.create({ trigger: container, start: 'top top', end: () => `+=${distance()}`, pin: true, scrub: true, animation: tween, invalidateOnRefresh: true, onUpdate: self => update(self.progress) });
    return () => { trigger.kill(); tween.kill(); gsap.set(track, { clearProps: 'transform' }); };
  });
  const windowEl = container.querySelector<HTMLElement>('.projects-window')!;
  const onScroll = () => {
    if (innerWidth >= 1024 && !reduced.matches) return;
    update(windowEl.scrollLeft / Math.max(1, windowEl.scrollWidth - windowEl.clientWidth));
  };
  windowEl.addEventListener('scroll', onScroll, { passive: true });
  ScrollTrigger.refresh();
  return () => { media.revert(); windowEl.removeEventListener('scroll', onScroll); backdrop?.dispose(); container.replaceChildren(); container.hidden = true; section.classList.remove('projects-enhanced'); section.querySelector<HTMLElement>('.section-meta')!.textContent = '02 / Projects'; };
}
