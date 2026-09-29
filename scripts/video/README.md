# Hero video generator

Generates the looping black-hole hero background (`public/media/hero.mp4`, `hero.webm`,
`hero-720.mp4`, `hero-poster.jpg`) from code. No stock footage.

- `scene.html` + `scene.js`: raw WebGL2 fragment shader at 1920x1080. `window.renderFrame(t)`, `t` in [0,1),
  is exactly periodic (rotation = 2*pi*t, noise sampled on a circle), so the last frame flows into frame 0.
- `render.mjs`: headless Chrome (puppeteer-core) renders 288 frames (12 s x 24 fps) to `frames/` (git-ignored).
- `encode.sh`: ffmpeg (`/opt/homebrew/bin/ffmpeg`) to H.264, VP9, 720p and poster.

## Run

    cd scripts/video
    npm install
    npm run render     # about 1 minute on Apple Silicon with hardware GL
    npm run encode     # about 2 to 4 minutes (VP9 is the slow one)

Requires Google Chrome at `/Applications/Google Chrome.app` (override with `CHROME=...`). Falls back to
SwiftShader software GL automatically (much slower); force a mode with `GL=--use-angle=swiftshader`.

## Changing it

- Duration: `FRAMES=480 npm run render` (20 s at 24 fps). The loop stays seamless because phase is `i/FRAMES`.
  Rotation speed scales with the duration (one revolution per loop).
- Look: edit constants in `scene.js`: `R0` (ring radius), `c0` (ring position), the `fil(...)` calls (streak
  density), colour `ramp()` (accent blues #89AACC / #4E85BF), star density in `stars(...)`, bottom fade `v`.
- Size: adjust `CRF_H264`, `CRF_720`, `CRF_VP9` env vars for `encode.sh`.
