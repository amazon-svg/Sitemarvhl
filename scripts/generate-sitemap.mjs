// scripts/generate-sitemap.mjs
// Génère public/sitemap.xml à partir des routes statiques et des slugs de lots.
// Lancé automatiquement avant chaque build.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SITE_URL = 'https://www.marvhl.fr';
const TODAY = new Date().toISOString().split('T')[0];

// Extraire les slugs depuis data/lots.ts sans transpiler le TS
const lotsFile = fs.readFileSync(path.join(ROOT, 'src/app/data/lots.ts'), 'utf-8');
const slugMatches = [...lotsFile.matchAll(/^\s{2,}slug:\s*["']([^"']+)["']/gm)];
const slugs = slugMatches.map((m) => m[1]);

// Pages statiques
const staticPages = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/le-batiment', priority: '0.8', changefreq: 'monthly' },
  { path: '/nos-lots', priority: '0.9', changefreq: 'weekly' },
  { path: '/contact', priority: '0.7', changefreq: 'monthly' },
];

const lotPages = slugs.map((slug) => ({
  path: `/lot/${slug}`,
  priority: '0.8',
  changefreq: 'weekly',
}));

const allPages = [...staticPages, ...lotPages];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (p) => `  <url>
    <loc>${SITE_URL}${p.path}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

const outPath = path.join(ROOT, 'public/sitemap.xml');
fs.writeFileSync(outPath, xml, 'utf-8');
console.log(`✓ sitemap.xml généré (${allPages.length} URLs) : ${outPath}`);
