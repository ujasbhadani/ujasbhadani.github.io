// Generates public/favicon.png (64x64), public/apple-touch-icon.png (180x180)
// and public/favicon.ico (32x32 PNG payload saved with the .ico extension --
// accepted by every current browser) before `astro build` runs, so the
// favicon files always exist after a clean `npm run build` without relying
// on git history. Source is the old site's headshot-crop icon, recovered
// once from git history (commit 7de21e7:assets/img/favicon.png) and
// committed here at scripts/assets/favicon-source.png so future rebuilds
// never need to go back to git history for it.
import { writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const rootDir = path.resolve(import.meta.dirname, "..");
const sourcePath = path.join(rootDir, "scripts/assets/favicon-source.png");
const publicDir = path.join(rootDir, "public");

async function squareCrop() {
  const meta = await sharp(sourcePath).metadata();
  const side = Math.min(meta.width, meta.height);
  const left = Math.round((meta.width - side) / 2);
  const top = Math.round((meta.height - side) / 2);
  return sharp(sourcePath).extract({ left, top, width: side, height: side });
}

async function main() {
  const favicon64 = await (await squareCrop())
    .resize(64, 64)
    .png({ compressionLevel: 9, quality: 80 })
    .toBuffer();
  await writeFile(path.join(publicDir, "favicon.png"), favicon64);

  const appleTouch = await (await squareCrop())
    .resize(180, 180)
    .png({ compressionLevel: 9, quality: 80 })
    .toBuffer();
  await writeFile(path.join(publicDir, "apple-touch-icon.png"), appleTouch);

  // Plain 32x32 PNG payload saved as .ico -- every current browser accepts
  // this even though it isn't a "real" multi-resolution ICO container.
  const favicon32 = await (await squareCrop())
    .resize(32, 32)
    .png({ compressionLevel: 9, quality: 80 })
    .toBuffer();
  await writeFile(path.join(publicDir, "favicon.ico"), favicon32);

  console.log(
    `Generated favicon.png (${favicon64.length}B), apple-touch-icon.png (${appleTouch.length}B), favicon.ico (${favicon32.length}B)`
  );
}

main();
