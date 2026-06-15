// scripts/prerender.mjs
// Pré-rend chaque route en HTML statique.
// Utilise dist/server/entry-server.js (build SSR) pour rendre la page,
// puis injecte le HTML et les meta tags Helmet dans dist/index.html (template).
// SORTIE PLATE : écrit dist/<route>.html (et non dist/<route>/index.html), pour
// que Netlify serve la forme sans slash en 200 et fasse `/x/` → 301 → `/x`.
// Liste des routes dérivée de src/lib/site-urls* (source unique de vérité).

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { allPaths } from '../src/lib/site-urls-node.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const routes = allPaths();

// ── Charger le bundle SSR + le template HTML ──
const entryPath = path.join(ROOT, 'dist/server/entry-server.js');
if (!fs.existsSync(entryPath)) {
  console.error(`✗ Bundle SSR introuvable : ${entryPath}`);
  console.error('  Exécute "vite build --ssr src/entry-server.tsx --outDir dist/server" d\'abord.');
  process.exit(1);
}

const { render } = await import(pathToFileURL(entryPath).href);
const templatePath = path.join(ROOT, 'dist/index.html');
const template = fs.readFileSync(templatePath, 'utf-8');

// ── Pré-rendre chaque route ──
let count = 0;
for (const url of routes) {
  const { html, helmet } = await render(url);

  const headInjection = [
    helmet.title.toString(),
    helmet.meta.toString(),
    helmet.link.toString(),
    helmet.script.toString(),
  ]
    .filter(Boolean)
    .join('\n    ');

  const page = template
    .replace('<!--ssr-head-->', headInjection)
    .replace('<!--ssr-outlet-->', html);

  const outPath =
    url === '/'
      ? path.join(ROOT, 'dist/index.html')
      : path.join(ROOT, 'dist', `${url}.html`);

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, page, 'utf-8');
  count++;
  console.log(`✓ ${url.padEnd(40)} → ${path.relative(ROOT, outPath)}`);
}

// ── Page 404 ──
// Rendu d'une route volontairement inexistante : React Router tombe sur la route
// splat ("*" → NotFound, qui porte déjà <meta robots noindex>). Écrit dist/404.html,
// servi par Netlify avec un VRAI statut HTTP 404 (cf. public/_redirects), pour
// éviter les « soft 404 » (page inconnue renvoyée en 200) qui brouillent Google.
{
  const { html, helmet } = await render('/__404__');
  const headInjection = [
    helmet.title.toString(),
    helmet.meta.toString(),
    helmet.link.toString(),
    helmet.script.toString(),
  ]
    .filter(Boolean)
    .join('\n    ');
  const page = template
    .replace('<!--ssr-head-->', headInjection)
    .replace('<!--ssr-outlet-->', html);
  fs.writeFileSync(path.join(ROOT, 'dist/404.html'), page, 'utf-8');
  console.log(`✓ ${'/__404__'.padEnd(40)} → dist/404.html`);
  count++;
}

console.log(`\n✓ Pré-rendu terminé : ${count} pages générées.`);
