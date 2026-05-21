// scripts/check-canonical.mjs
// Garde-fou postbuild : scanne dist/**/*.html et vérifie que chaque
//   <link rel="canonical" href="…">  et  <meta property="og:url" content="…">
// pointe vers une URL SANS slash final (sauf l'origin nu).
// Échec → exit 1 → casse le build.

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE_ORIGIN } from '../src/lib/site-urls.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DIST = join(ROOT, 'dist');

if (!existsSync(DIST)) {
  console.error(`✗ Dossier dist/ introuvable : ${DIST}`);
  process.exit(1);
}

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const s = statSync(full);
    if (s.isDirectory()) {
      // Ignore le bundle SSR — il contient le code serveur compilé, pas du HTML pré-rendu.
      if (full === join(DIST, 'server')) continue;
      out.push(...walk(full));
    } else if (entry.endsWith('.html')) {
      out.push(full);
    }
  }
  return out;
}

const htmlFiles = walk(DIST);
const errors = [];
const ROOT_URL = `${SITE_ORIGIN}/`;

const CANON_RE = /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i;
const OGURL_RE = /<meta[^>]+property=["']og:url["'][^>]+content=["']([^"']+)["']/i;

function checkUrl(url) {
  if (!url) return null;
  if (url === ROOT_URL) return null;
  if (url.endsWith('/')) return 'slash final interdit';
  if (!url.startsWith(SITE_ORIGIN)) return `origin inattendu (attendu ${SITE_ORIGIN})`;
  return null;
}

let scanned = 0;
for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf-8');
  const rel = relative(ROOT, file);

  const canon = html.match(CANON_RE)?.[1];
  const ogurl = html.match(OGURL_RE)?.[1];

  const errCanon = checkUrl(canon);
  const errOg = checkUrl(ogurl);

  if (errCanon) errors.push(`${rel}: canonical "${canon}" → ${errCanon}`);
  if (errOg) errors.push(`${rel}: og:url "${ogurl}" → ${errOg}`);
  scanned++;
}

if (errors.length) {
  console.error(`✗ check-canonical : ${errors.length} erreur(s) sur ${scanned} fichier(s) HTML`);
  for (const e of errors) console.error(`  ${e}`);
  process.exit(1);
}

console.log(`✓ check-canonical : ${scanned} fichier(s) HTML — canonicals & og:url conformes`);
