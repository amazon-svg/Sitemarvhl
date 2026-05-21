// Logique de listing des routes côté build (node-only — n'est jamais importé
// depuis le bundle client). Lit les slugs lots et blog depuis les sources de
// vérité existantes (data/lots.ts + content/blog/*.md).

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { STATIC_PATHS } from './site-urls.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..', '..');

export function lotSlugs() {
  const file = join(REPO_ROOT, 'src/app/data/lots.ts');
  if (!existsSync(file)) return [];
  const raw = readFileSync(file, 'utf-8');
  return [...raw.matchAll(/^\s{2,}slug:\s*["']([^"']+)["']/gm)].map((m) => m[1]);
}

export function blogSlugs() {
  const dir = join(REPO_ROOT, 'src/content/blog');
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''));
}

export function blogPostsWithDate() {
  const dir = join(REPO_ROOT, 'src/content/blog');
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((file) => {
      const raw = readFileSync(join(dir, file), 'utf-8');
      const slug = file.replace(/\.md$/, '');
      const dateMatch = raw.match(/^date:\s*["']?([\d-]+)["']?/m);
      return { slug, date: dateMatch ? dateMatch[1] : null };
    });
}

export function allPaths() {
  return [
    ...STATIC_PATHS,
    ...lotSlugs().map((s) => `/lot/${s}`),
    ...blogSlugs().map((s) => `/blog/${s}`),
  ];
}
