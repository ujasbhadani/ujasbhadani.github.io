// Writes dist/sitemap.xml with every prerendered route (each dist/**/index.html).
import { readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";

const SITE = "https://ujasbhadani.com";
const dist = path.resolve(import.meta.dirname, "..", "dist");

async function* walk(dir) {
  for (const entry of await readdir(dir)) {
    const full = path.join(dir, entry);
    if ((await stat(full)).isDirectory()) yield* walk(full);
    else yield full;
  }
}

const routes = [];
for await (const file of walk(dist)) {
  if (path.basename(file) !== "index.html") continue;
  const rel = path.relative(dist, path.dirname(file)).split(path.sep).join("/");
  // Skip Vite's hashed asset directory if it ever contains an index.html.
  if (rel.startsWith("assets")) continue;
  routes.push(rel === "" ? "/" : `/${rel}/`);
}
routes.sort((a, b) => (a === "/" ? -1 : b === "/" ? 1 : a.localeCompare(b)));

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((r) => `  <url><loc>${SITE}${r}</loc></url>`).join("\n")}
</urlset>
`;
await writeFile(path.join(dist, "sitemap.xml"), xml);
console.log(`Wrote dist/sitemap.xml with ${routes.length} routes`);
