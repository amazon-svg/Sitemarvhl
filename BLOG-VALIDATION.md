# BLOG-VALIDATION.md — Vague 3

## Résumé

Ajout d'un blog au site MARVHL avec 4 articles pré-rendus. Pipeline
markdown entièrement au build-time (aucune dépendance markdown dans
le bundle client).

## Architecture

```
src/
├── content/blog/                              (source Markdown)
│   ├── open-space-a-louer-bordeaux-criteres.md
│   ├── centre-d-appels-a-bordeaux-implantation-2026.md
│   ├── bureau-tout-inclus-vs-traditionnel-calcul-pme.md
│   └── bureau-bordeaux-rive-droite-comparatif-2026.md
│
├── app/
│   ├── data/
│   │   ├── blog-index.generated.ts   (AUTO, commit, regen à chaque build)
│   │   └── blogPosts.ts              (re-export + helpers)
│   └── pages/
│       ├── Blog.tsx                  (liste)
│       └── BlogPost.tsx              (article, prose Typography)

scripts/
├── build-blog-index.mjs              (NOUVEAU — gray-matter + marked → TS)
├── generate-sitemap.mjs              (ÉTENDU — lit content/blog/)
└── prerender.mjs                     (ÉTENDU — inclut /blog + slugs)
```

## Libs ajoutées (devDependencies uniquement)

| Lib | Version | Rôle |
| --- | --- | --- |
| `gray-matter` | ^4.0.3 | Parse YAML front-matter |
| `marked` | ^18.0.2 | Render markdown → HTML |
| `@tailwindcss/typography` | ^0.5.19 | Classes `prose` pour le rendu article |

**Aucune de ces libs n'est dans le bundle client** : elles ne tournent
qu'au build-time, le résultat est figé dans `blog-index.generated.ts`
avec l'HTML déjà rendu.

## Pipeline de build (ordre)

```
npm run build
 └─► prebuild
     ├─ node scripts/build-blog-index.mjs   (parse MD → blog-index.generated.ts)
     └─ node scripts/generate-sitemap.mjs   (lit content/blog/ pour enrichir sitemap.xml)
 └─► build:client   (vite build)
 └─► build:server   (vite build --ssr)
 └─► build:prerender (scripts/prerender.mjs — lit content/blog/ pour les slugs)
```

## Validation (2026-04-20, build local)

### Build

```
✓ blog-index.generated.ts : 4 articles indexés
✓ sitemap.xml généré (16 URLs)
✓ 1657 modules transformed
✓ Pré-rendu terminé : 16 pages générées
```

### Titres + meta description par article (HTML statique)

| Slug | Title | Description |
| --- | --- | --- |
| `open-space-a-louer-bordeaux-criteres` | ✅ "Open-space à louer à Bordeaux : 5 critères…" | ✅ Unique |
| `centre-d-appels-a-bordeaux-implantation-2026` | ✅ "Centre d'appels à Bordeaux : budget, critères…" | ✅ Unique |
| `bureau-tout-inclus-vs-traditionnel-calcul-pme` | ✅ "Bureau tout inclus ou traditionnel : le vrai calcul…" | ✅ Unique |
| `bureau-bordeaux-rive-droite-comparatif-2026` | ✅ "Louer un bureau à Bordeaux rive droite en 2026…" | ✅ Unique |

### Schema.org BlogPosting

Présent (JSON-LD) dans les 4 pages d'article avec `headline`,
`datePublished`, `author`, `publisher`, `image`, `mainEntityOfPage`,
`keywords`.

### Sitemap

- URLs totales : **16** (était 11)
- URLs contenant `/blog` : 5 (= 1 `/blog` + 4 articles)
- `<lastmod>` = date de publication réelle pour les articles
  (vs TODAY pour les pages statiques et les lots)

### Fichiers HTML générés

```
dist/blog/index.html
dist/blog/open-space-a-louer-bordeaux-criteres/index.html
dist/blog/centre-d-appels-a-bordeaux-implantation-2026/index.html
dist/blog/bureau-tout-inclus-vs-traditionnel-calcul-pme/index.html
dist/blog/bureau-bordeaux-rive-droite-comparatif-2026/index.html
```

## Commandes de vérif rapide (à rejouer sur preview ou prod)

```bash
# 1. Titres uniques par article
for slug in \
  open-space-a-louer-bordeaux-criteres \
  centre-d-appels-a-bordeaux-implantation-2026 \
  bureau-tout-inclus-vs-traditionnel-calcul-pme \
  bureau-bordeaux-rive-droite-comparatif-2026; do
    echo "=== $slug ==="
    curl -sL "https://www.marvhl.fr/blog/$slug/" | grep -oE '<title[^>]*>[^<]*</title>' | head -1
done

# 2. Sitemap contient /blog URLs
curl -s https://www.marvhl.fr/sitemap.xml | grep -c '/blog'   # doit afficher 5

# 3. JSON-LD BlogPosting présent
curl -sL https://www.marvhl.fr/blog/open-space-a-louer-bordeaux-criteres/ | grep -c 'BlogPosting'
```

## À faire post-merge

- Tester PageSpeed sur `/blog` et un article : perf ≥ 95, SEO ≥ 95 attendu
- Vérifier Google Rich Results sur un article (BlogPosting valide)
- Ajouter progressivement une image spécifique par article (og_image
  actuellement = `/og-image.jpg` pour tous → prévisualisations sociales
  identiques)

## Écueils rencontrés

- **Tailwind 4 + `@tailwindcss/typography`** : syntaxe via
  `@plugin '@tailwindcss/typography';` dans `tailwind.css` (nouvelle
  API Tailwind 4, pas de config JS). A fonctionné du premier coup.
- **Parsing build-time vs runtime** : choix délibéré de pré-compiler
  le markdown au build pour éviter `gray-matter` dans le bundle client
  (dépendances Buffer Node-only). Le fichier généré fait ~60 KB (les
  4 articles rendus en HTML).
