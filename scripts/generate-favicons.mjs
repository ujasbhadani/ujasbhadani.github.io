// Generates public/favicon.png (64x64), public/apple-touch-icon.png (180x180)
// and public/favicon.ico (32x32 PNG wrapped in an ICO container) before `vite build` runs, so the
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

// Wraps a PNG in an ICO container (ICONDIR + one ICONDIRENTRY, then the PNG bytes).
function pngToIco(png, size) {
  const header = Buffer.alloc(22);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(1, 4); // image count
  header.writeUInt8(size, 6); // width
  header.writeUInt8(size, 7); // height
  header.writeUInt8(0, 8); // colours
  header.writeUInt8(0, 9); // reserved
  header.writeUInt16LE(1, 10); // planes
  header.writeUInt16LE(32, 12); // bits per pixel
  header.writeUInt32LE(png.length, 14); // image size
  header.writeUInt32LE(22, 18); // image offset
  return Buffer.concat([header, png]);
}

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

  // 32x32 PNG wrapped in a real ICO container.
  const favicon32 = await (await squareCrop())
    .resize(32, 32)
    .png({ compressionLevel: 9, quality: 80 })
    .toBuffer();
  await writeFile(path.join(publicDir, "favicon.ico"), pngToIco(favicon32, 32));

  console.log(
    `Generated favicon.png (${favicon64.length}B), apple-touch-icon.png (${appleTouch.length}B), favicon.ico (${favicon32.length}B)`
  );
}

main();
