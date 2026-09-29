// Generates public/og.png (1200x630) before `astro build` runs, so
// `dist/og.png` always exists after a clean `npm run build`. Uses sharp to
// rasterize a small SVG card (name, identity line, headshot) rather than a
// browser screenshot -- no headless-browser dependency needed for a static
// build script.
import { readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const rootDir = path.resolve(import.meta.dirname, "..");
const headshotPath = path.join(rootDir, "public/assets/img/profile-img.jpg");
const outputPath = path.join(rootDir, "public/og.png");

const WIDTH = 1200;
const HEIGHT = 630;

// Light-theme tokens from src/styles/tokens.css (docs/design-system.md §2).
const COLORS = {
  bg: "#F2F5F4",
  surface: "#FFFFFF",
  ink: "#14201D",
  inkSoft: "#3F4C48",
  line: "#D3DBD8",
  accent: "#0B6E64",
};

async function buildHeadshotCircleDataUri() {
  if (!existsSync(headshotPath)) {
    return null;
  }
  const size = 280;
  const circleMask = Buffer.from(
    `<svg width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="#fff" /></svg>`
  );
  const buffer = await sharp(headshotPath)
    .resize(size, size, { fit: "cover" })
    .composite([{ input: circleMask, blend: "dest-in" }])
    .png()
    .toBuffer();
  return `data:image/png;base64,${buffer.toString("base64")}`;
}

async function main() {
  const headshotDataUri = await buildHeadshotCircleDataUri();

  const headshotMarkup = headshotDataUri
    ? `<image href="${headshotDataUri}" x="72" y="175" width="280" height="280" />`
    : `<circle cx="212" cy="315" r="140" fill="${COLORS.accent}" />`;

  const svg = `
<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${WIDTH}" height="${HEIGHT}" fill="${COLORS.bg}" />
  <rect x="40" y="40" width="${WIDTH - 80}" height="${HEIGHT - 80}" rx="14" fill="${COLORS.surface}" stroke="${COLORS.line}" stroke-width="1" />
  ${headshotMarkup}
  <circle cx="212" cy="315" r="140" fill="none" stroke="${COLORS.line}" stroke-width="1" />
  <text x="420" y="290" font-family="Arial, sans-serif" font-size="56" font-weight="800" fill="${COLORS.ink}">Ujas Bhadani</text>
  <text x="420" y="340" font-family="Arial, sans-serif" font-size="26" font-weight="600" fill="${COLORS.accent}">SOX 404(b) ITGC lead</text>
  <text x="420" y="378" font-family="Arial, sans-serif" font-size="26" font-weight="600" fill="${COLORS.accent}">Security and GRC engineer</text>
  <text x="420" y="416" font-family="Arial, sans-serif" font-size="26" font-weight="600" fill="${COLORS.accent}">Founder, Vasan AI (Crescive.ai)</text>
  <text x="420" y="470" font-family="Arial, sans-serif" font-size="22" fill="${COLORS.inkSoft}">ujasbhadani.com</text>
</svg>`;

  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  await writeFile(outputPath, png);
  console.log(`Generated ${path.relative(rootDir, outputPath)} (${WIDTH}x${HEIGHT})`);
}

main().catch((error) => {
  console.error("Failed to generate og.png:", error);
  process.exit(1);
});
