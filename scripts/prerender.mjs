// scripts/prerender.mjs
// Pré-rend chaque route en HTML statique.
// Utilise dist/server/entry-server.js (build SSR) pour rendre la page,
// puis injecte le HTML et les meta tags Helmet dans dist/index.html (template).
// Écrit dist/<route>/index.html pour chaque URL du site.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// ── Construire la liste des routes à pré-rendre ──
// Slugs des lots : extraits de data/lots.ts
const lotsFile = fs.readFileSync(path.join(ROOT, 'src/app/data/lots.ts'), 'utf-8');
const lotSlugs = [...lotsFile.matchAll(/^\s{2,}slug:\s*["']([^"']+)["']/gm)].map((m) => m[1]);

// Slugs blog : lecture dynamique du dossier content/blog/
const BLOG_DIR = path.join(ROOT, 'src/content/blog');
const blogSlugs = fs.existsSync(BLOG_DIR)
  ? fs
      .readdirSync(BLOG_DIR)
      .filter((f) => f.endsWith('.md'))
      .map((f) => f.replace(/\.md$/, ''))
  : [];

const routes = [
  '/',
  '/le-batiment',
  '/nos-lots',
  '/blog',
  '/contact',
  ...lotSlugs.map((s) => `/lot/${s}`),
  ...blogSlugs.map((s) => `/blog/${s}`),
];

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
      : path.join(ROOT, 'dist', url, 'index.html');

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, page, 'utf-8');
  count++;
  console.log(`✓ ${url.padEnd(40)} → ${path.relative(ROOT, outPath)}`);
}

console.log(`\n✓ Pré-rendu terminé : ${count} pages générées.`);
