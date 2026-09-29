// Procedural black hole, 1920x1080. window.renderFrame(t), t in [0,1), is exactly periodic.
const canvas = document.getElementById('c');
const gl = canvas.getContext('webgl2', { preserveDrawingBuffer: true, antialias: false });
const VS = `#version 300 es
in vec2 p; void main(){ gl_Position = vec4(p,0.,1.); }`;
const FS = `#version 300 es
precision highp float;
uniform vec2 res; uniform float t;
out vec4 o;
const float TAU = 6.2831853;
float h13(vec3 p){ p=fract(p*.1031); p+=dot(p,p.zyx+31.32); return fract((p.x+p.y)*p.z); }
float h12(vec2 p){ vec3 q=fract(vec3(p.xyx)*.1031); q+=dot(q,q.yzx+33.33); return fract((q.x+q.y)*q.z); }
float vn(vec3 p){ vec3 i=floor(p), f=fract(p); f=f*f*(3.-2.*f);
  return mix(mix(mix(h13(i),h13(i+vec3(1,0,0)),f.x),mix(h13(i+vec3(0,1,0)),h13(i+vec3(1,1,0)),f.x),f.y),
             mix(mix(h13(i+vec3(0,0,1)),h13(i+vec3(1,0,1)),f.x),mix(h13(i+vec3(0,1,1)),h13(i+vec3(1,1,1)),f.x),f.y),f.z); }
// angle-periodic noise: angle a becomes a point on a circle, so no seam at +-pi
float fil(float a, float r, float K, float rf, float seed){
  vec3 q = vec3(cos(a)*K+seed, sin(a)*K+seed*1.7, r*rf);
  return .55*vn(q)+.3*vn(q*2.03+7.1)+.15*vn(q*4.1+3.3);
}
vec3 ramp(float v){
  vec3 c0=vec3(.01,.02,.05), c1=vec3(.05,.13,.26), c2=vec3(.306,.522,.749), c3=vec3(.537,.667,.8), c4=vec3(1.);
  vec3 c=mix(c0,c1,smoothstep(0.,.25,v)); c=mix(c,c2,smoothstep(.2,.6,v));
  c=mix(c,c3,smoothstep(.5,1.,v)); return mix(c,c4,smoothstep(.95,2.2,v));
}
float stars(vec2 uv, float scale, float dens){
  vec2 g=uv*scale, i=floor(g), f=fract(g);
  float s=h12(i); if(s>dens) return 0.;
  vec2 c=vec2(h12(i+13.7),h12(i+41.3))*.7+.15;
  float d=length(f-c); return (smoothstep(.1,0.,d)+.25*smoothstep(.4,0.,d))*(.5+.5*h12(i+5.));
}
void main(){
  vec2 frag=gl_FragCoord.xy; vec2 uv=frag/res; float asp=res.x/res.y;
  vec2 c0=vec2(.5,.80);
  vec2 p=vec2((uv.x-c0.x)*asp,(uv.y-c0.y)); p.y/=.9;
  float r=length(p); float a=atan(p.y,p.x);
  float R0=.19;
  // lensing warp of background
  vec2 wp=p*(1.+ .012/(r*r+.02)); vec2 buv=vec2(wp.x/asp+c0.x, wp.y*.9+c0.y);
  vec3 col=vec3(0.);
  float st=stars(buv,40.,.045)*1.5+stars(buv+3.3,110.,.03)*.7;
  float warm=h12(floor(buv*45.)+91.);
  vec3 stc=mix(vec3(.75,.85,1.),vec3(1.,.72,.6),step(.8,warm));
  float below=smoothstep(.08,.5,uv.y); // fewer stars near bottom, keep text area clean
  col+=stc*st*1.1*below*smoothstep(R0*.9,R0*1.3,r);
  // disk
  float phi=TAU*t;
  float sp=4.2*log(max(r,.02)/R0);
  float d=r-R0;
  // three layers, integer revolutions per loop => seamless
  float aA=a+sp-phi*1.;
  float aB=a+sp*.8+phi*2.;   // inner counter-rotating shimmer
  float aC=a+sp*1.3-phi*1.;
  float f1=fil(aA,r,1.5,230.,1.3);
  float f2=fil(aB,r,2.0,380.,8.8);
  float f3=fil(aC,r,1.1,110.,4.1);
  float streak=pow(smoothstep(.5,.82,f1),1.6)*1.1+pow(smoothstep(.55,.85,f2),1.6)*.9+pow(smoothstep(.45,.8,f3),1.5)*.7;
  float outer=exp(-max(d,0.)/.07)*1.3+exp(-max(d,0.)/.28)*.36+exp(-max(d,0.)/.7)*.08;
  float gate=smoothstep(.25,.75,fil(a-phi*1.+sp*.6,r,1.2,9.,17.));
  float I=outer*(.03+streak*1.3*(.25+.9*gate));
  float outerMask=smoothstep(-.02,.012,d);
  I*=outerMask;
  // inner glow inside the rim (light bending over the horizon)
  float inner=exp(-max(-d,0.)/.05)*(1.-outerMask)*(.55+.9*smoothstep(.4,.85,f2));
  I+=inner*.9+exp(-max(-d,0.)/.09)*(1.-outerMask)*.22;
  // bright thin photon ring
  I+=exp(-abs(d+.004)*abs(d+.004)/.00005)*1.0;
  // doppler asymmetry: lower-left brighter, fixed in screen space
  I*=1.+.65*cos(a+2.4);
  // horizon
  float hz=smoothstep(R0*.55,R0*.98,r); float dark=mix(.02,1.,hz);
  I*=mix(hz,1.,.0)*1.;
  col+=ramp(I)*smoothstep(0.,.05,I)*dark;
  // bottom fade / vignette
  float v=smoothstep(.12,.62,uv.y); col*=mix(.0,1.,v*v);
  col*=1.-.35*pow(abs(uv.x-.5)*2.,2.);
  col=col/(1.+col*.35); col=pow(col,vec3(.95));
  col+=(h12(frag)-.5)/255.*1.5; // static dither, no temporal flicker
  o=vec4(col,1.);
}`;
function sh(type, src){ const s=gl.createShader(type); gl.shaderSource(s,src); gl.compileShader(s);
  if(!gl.getShaderParameter(s,gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s)); return s; }
const prog=gl.createProgram(); gl.attachShader(prog,sh(gl.VERTEX_SHADER,VS)); gl.attachShader(prog,sh(gl.FRAGMENT_SHADER,FS));
gl.linkProgram(prog); if(!gl.getProgramParameter(prog,gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog));
gl.useProgram(prog);
const buf=gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER,buf);
gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),gl.STATIC_DRAW);
const loc=gl.getAttribLocation(prog,'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);
gl.uniform2f(gl.getUniformLocation(prog,'res'),canvas.width,canvas.height);
const uT=gl.getUniformLocation(prog,'t');
window.renderFrame=(t)=>{ gl.viewport(0,0,canvas.width,canvas.height); gl.uniform1f(uT,t-Math.floor(t)); gl.drawArrays(gl.TRIANGLES,0,3); gl.finish(); return true; };
window.renderFrame(0); window.sceneReady=true;
