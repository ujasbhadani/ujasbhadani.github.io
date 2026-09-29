// One-off helper (run manually): writes small WebP derivatives of the headshot and
// recommendation photos next to the originals. The originals stay untouched because
// generate-og.mjs reads the headshot. The site references the .webp files.
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..", "public/assets/img");
const jobs = [
  ["profile-img.jpg", "profile-img.webp", 720],
  ["testimonials/testimonials-1.jpg", "testimonials/testimonials-1.webp", 240],
  ["testimonials/testimonials-2.jpg", "testimonials/testimonials-2.webp", 240],
  ["testimonials/testimonials-3.jpg", "testimonials/testimonials-3.webp", 240],
  ["testimonials/testimonials-4.jpg", "testimonials/testimonials-4.webp", 240],
];

for (const [src, out, width] of jobs) {
  const info = await sharp(path.join(root, src))
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(path.join(root, out));
  console.log(out, `${info.width}x${info.height}`, `${info.size}B`);
}
