// scripts/generate-sitemap.mjs
// Génère dist/sitemap.xml à partir de src/lib/site-urls* (source unique).
// Lancé en POSTBUILD, après prerender. Garde-fou : throw si une <loc> finit
// par "/" (sauf la racine) — un drift trailing-slash casse alors le build.

import { writeFileSync, readFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE_ORIGIN, STATIC_PATHS, canonicalUrl } from '../src/lib/site-urls.mjs';
import { lotSlugs, blogPostsWithDate } from '../src/lib/site-urls-node.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DIST = join(ROOT, 'dist');
const TODAY = new Date().toISOString().split('T')[0];

if (!existsSync(DIST)) {
  console.error(`✗ Dossier dist/ introuvable : ${DIST}`);
  console.error('  generate-sitemap doit s\'exécuter après le build (postbuild).');
  process.exit(1);
}

// Métadonnées par type de page (priority / changefreq). Le path reste la source
// de vérité — on ne le re-bidouille jamais ici.
const STATIC_META = {
  '/': { priority: '1.0', changefreq: 'weekly' },
  '/le-batiment': { priority: '0.8', changefreq: 'monthly' },
  '/nos-lots': { priority: '0.9', changefreq: 'weekly' },
  '/blog': { priority: '0.7', changefreq: 'weekly' },
  '/contact': { priority: '0.7', changefreq: 'monthly' },
};

const blogDates = new Map(blogPostsWithDate().map((p) => [p.slug, p.date]));

function buildEntries() {
  const entries = [];

  for (const p of STATIC_PATHS) {
    entries.push({
      path: p,
      ...STATIC_META[p],
      lastmod: TODAY,
    });
  }
  for (const slug of lotSlugs()) {
    entries.push({
      path: `/lot/${slug}`,
      priority: '0.8',
      changefreq: 'weekly',
      lastmod: TODAY,
    });
  }
  for (const slug of blogDates.keys()) {
    entries.push({
      path: `/blog/${slug}`,
      priority: '0.6',
      changefreq: 'monthly',
      lastmod: blogDates.get(slug) ?? TODAY,
    });
  }
  return entries;
}

const entries = buildEntries();

// Garde-fou : aucune <loc> ne doit finir par "/" sauf l'origin nu.
for (const e of entries) {
  const loc = canonicalUrl(e.path);
  if (loc !== `${SITE_ORIGIN}/` && loc.endsWith('/')) {
    throw new Error(`[sitemap] slash final interdit : ${loc} (path: ${e.path})`);
  }
}

const body = entries
  .map((e) => {
    const loc = canonicalUrl(e.path);
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${e.lastmod}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`;
  })
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;

const outPath = join(DIST, 'sitemap.xml');
writeFileSync(outPath, xml, 'utf-8');
console.log(`✓ sitemap.xml généré (${entries.length} URLs) : ${outPath}`);
