// Source unique de vérité pour les URLs canoniques du site.
// Module pur — importable depuis le client (SEO.tsx via Vite) et depuis les
// scripts node. Toute logique I/O (lecture des slugs, listing des routes) est
// isolée dans site-urls-node.mjs pour ne pas tirer node:fs dans le bundle.

export const SITE_ORIGIN = 'https://www.marvhl.fr';

export const STATIC_PATHS = ['/', '/le-batiment', '/nos-lots', '/blog', '/contact'];

/**
 * URL canonique absolue. Politique : jamais de slash final, sauf la racine.
 * @param {string} path
 * @returns {string}
 */
export function canonicalUrl(path) {
  const p = path.startsWith('/') ? path : `/${path}`;
  const clean = p !== '/' && p.endsWith('/') ? p.replace(/\/+$/, '') : p;
  return `${SITE_ORIGIN}${clean}`;
}

/**
 * Variante chemin-seul (sans origin). Utile pour les liens internes.
 * @param {string} path
 * @returns {string}
 */
export function canonicalPath(path) {
  const p = path.startsWith('/') ? path : `/${path}`;
  return p !== '/' && p.endsWith('/') ? p.replace(/\/+$/, '') : p;
}
