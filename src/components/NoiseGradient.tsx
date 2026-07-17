import { useEffect, useRef } from "react";
type Props = {
  className?: string;
  /** cores em rgb 0-1, mínimo 2, máximo 5 */
  colors?: [number, number, number][];
  speed?: number;
  noiseScale?: number;
  grainIntensity?: number;
};
const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;
const FRAG = `
precision highp float;
uniform vec2  u_res;
uniform float u_time;
uniform float u_scale;
uniform float u_grain;
uniform int   u_count;
uniform vec3  u_colors[5];
// simplex-ish 2D noise (Ashima)
vec3 permute(vec3 x){ return mod(((x*34.0)+1.0)*x, 289.0); }
float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                     -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0,0.0) : vec2(0.0,1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0))
                  + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
                                    dot(x12.zw,x12.zw)), 0.0);
  m = m*m; m = m*m;
  vec3 x  = 2.0 * fract(p * C.www) - 1.0;
  vec3 h  = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  for(int i=0;i<5;i++){ v += a*snoise(p); p *= 2.02; a *= 0.5; }
  return v;
}
float hash(vec2 p){ return fract(sin(dot(p, vec2(41.3, 289.1)))*43758.5453); }
vec3 palette(float t){
  t = clamp(t, 0.0, 1.0);
  float seg = float(u_count - 1);
  float s = t * seg;
  int idx = int(floor(s));
  float f = fract(s);
  vec3 a = u_colors[0];
  vec3 b = u_colors[1];
  if(idx == 1){ a = u_colors[1]; b = u_colors[2]; }
  else if(idx == 2){ a = u_colors[2]; b = u_colors[3]; }
  else if(idx == 3){ a = u_colors[3]; b = u_colors[4]; }
  return mix(a, b, smoothstep(0.0, 1.0, f));
}
void main(){
  vec2 uv = gl_FragCoord.xy / u_res.xy;
  vec2 p = (gl_FragCoord.xy - 0.5*u_res.xy) / min(u_res.x, u_res.y);
  p *= u_scale;
  float t = u_time * 0.08;
  float n1 = fbm(p + vec2(t, -t*0.6));
  float n2 = fbm(p*1.3 + vec2(-t*0.7, t*0.4) + n1);
  float mask = 0.5 + 0.5 * n2;
  vec3 col = palette(mask);
  // vinheta suave
  float vg = smoothstep(1.2, 0.2, length(uv - 0.5));
  col *= mix(0.85, 1.0, vg);
  // grão
  float g = hash(gl_FragCoord.xy + fract(u_time)) - 0.5;
  col += g * u_grain;
  gl_FragColor = vec4(col, 1.0);
}
`;
function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(s));
    gl.deleteShader(s);
    return null;
  }
  return s;
}
export default function NoiseGradient({
  className,
  colors = [
    [0.05, 0.05, 0.08],
    [0.18, 0.1, 0.35],
    [0.75, 0.25, 0.45],
    [0.98, 0.55, 0.25],
  ],
  speed = 1,
  noiseScale = 1.6,
  grainIntensity = 0.06,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", {
      antialias: false,
      premultipliedAlpha: false,
    });
    if (!gl) return;
    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(prog));
      return;
    }
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const uRes = gl.getUniformLocation(prog, "u_res");
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uScale = gl.getUniformLocation(prog, "u_scale");
    const uGrain = gl.getUniformLocation(prog, "u_grain");
    const uCount = gl.getUniformLocation(prog, "u_count");
    const count = Math.min(5, Math.max(2, colors.length));
    const flat = new Float32Array(5 * 3);
    for (let i = 0; i < count; i++) {
      flat[i * 3] = colors[i][0];
      flat[i * 3 + 1] = colors[i][1];
      flat[i * 3 + 2] = colors[i][2];
    }
    const uColors = gl.getUniformLocation(prog, "u_colors");
    gl.uniform3fv(uColors, flat);
    gl.uniform1i(uCount, count);
    gl.uniform1f(uScale, noiseScale);
    gl.uniform1f(uGrain, grainIntensity);
    let raf = 0;
    const start = performance.now();
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth * dpr;
      const h = canvas.clientHeight * dpr;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const loop = () => {
      resize();
      const t = ((performance.now() - start) / 1000) * speed;
      gl.uniform1f(uTime, reduce ? 0 : t);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(loop);
    };
    loop();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
    };
  }, [colors, speed, noiseScale, grainIntensity]);
  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: "100%", height: "100%", display: "block" }}
      aria-hidden
    />
  );
}
