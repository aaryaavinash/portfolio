export function initAmbient(canvas: HTMLCanvasElement, reduced: MediaQueryList): { setScroll: (value: number) => void; dispose: () => void } | null {
  const gl = canvas.getContext('webgl', { alpha: false, antialias: false, powerPreference: 'low-power' });
  if (!gl) return null;
  const vertex = gl.createShader(gl.VERTEX_SHADER)!;
  gl.shaderSource(vertex, 'attribute vec2 p; void main(){gl_Position=vec4(p,0.,1.);}');
  gl.compileShader(vertex);
  const fragment = gl.createShader(gl.FRAGMENT_SHADER)!;
  gl.shaderSource(fragment, `precision mediump float;
    uniform vec2 resolution; uniform float time; uniform float scroll; uniform vec2 pointer;
    void main(){
      vec2 uv=gl_FragCoord.xy/resolution;
      vec2 p=(uv-.5)*vec2(resolution.x/resolution.y,1.);
      vec2 q=p-vec2(.18+.18*sin(scroll*.0007)+pointer.x*.08,.03+pointer.y*.06);
      float angle=atan(q.y,q.x);
      float radius=length(q);
      float twist=.018*sin(angle*9.+time*.28+scroll*.002)+.008*sin(angle*23.-time*.2);
      float ring=exp(-78.*abs(radius-(.37+twist)));
      float outer=exp(-38.*abs(radius-(.53+twist*.5)));
      float aura=exp(-5.*radius);
      float threads=exp(-48.*abs(q.y+.16*sin(q.x*6.+time*.15+scroll*.001)))*(1.-smoothstep(.1,.9,radius));
      vec3 ink=vec3(.032,.029,.036);
      ink+=vec3(.31,.024,.013)*ring;
      ink+=vec3(.13,.08,.07)*ring*pow(max(0.,sin(angle+time*.13)),4.);
      ink+=vec3(.11,.018,.016)*outer+vec3(.042,.006,.004)*aura;
      ink+=vec3(.06,.014,.012)*threads;
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
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  gl.useProgram(program);
  gl.enableVertexAttribArray(gl.getAttribLocation(program, 'p'));
  gl.vertexAttribPointer(gl.getAttribLocation(program, 'p'), 2, gl.FLOAT, false, 0, 0);
  const resolution = gl.getUniformLocation(program, 'resolution');
  const time = gl.getUniformLocation(program, 'time');
  const position = gl.getUniformLocation(program, 'scroll');
  const pointer = gl.getUniformLocation(program, 'pointer');
  const events = new AbortController();
  const signal = events.signal;
  let raf = 0;
  let last = 0;
  let scroll = 0;
  let pointerX = 0;
  let pointerY = 0;
  let galleryVisible = false;
  const resize = () => {
    const scale = Math.min(devicePixelRatio || 1, 1.25, 960 / Math.max(innerWidth, 1));
    canvas.width = Math.max(1, Math.round(innerWidth * scale));
    canvas.height = Math.max(1, Math.round(innerHeight * scale));
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(resolution, canvas.width, canvas.height);
  };
  const active = () => !document.hidden && !reduced.matches && !galleryVisible;
  const frame = (now: number) => {
    if (!active()) { raf = 0; return; }
    if (now - last >= 32) {
      gl.uniform1f(time, now / 1000);
      gl.uniform1f(position, scroll);
      gl.uniform2f(pointer, pointerX, pointerY);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      last = now;
    }
    raf = requestAnimationFrame(frame);
  };
  const sync = () => {
    if (active() && !raf) raf = requestAnimationFrame(frame);
    else if (!active() && raf) { cancelAnimationFrame(raf); raf = 0; }
  };
  const gallery = document.querySelector('#project-gallery');
  const observer = new IntersectionObserver(([entry]) => { galleryVisible = entry.isIntersecting; sync(); });
  if (gallery) observer.observe(gallery);
  addEventListener('resize', resize, { signal });
  addEventListener('pointermove', event => {
    if (event.pointerType === 'mouse') {
      pointerX = event.clientX / innerWidth * 2 - 1;
      pointerY = event.clientY / innerHeight * 2 - 1;
    }
  }, { signal, passive: true });
  document.addEventListener('visibilitychange', sync, { signal });
  reduced.addEventListener('change', sync, { signal });
  resize();
  sync();
  return {
    setScroll(value: number) { scroll = value; },
    dispose() {
      events.abort(); observer.disconnect(); cancelAnimationFrame(raf);
      gl.deleteBuffer(buffer); gl.deleteProgram(program);
      gl.deleteShader(vertex); gl.deleteShader(fragment);
    },
  };
}
