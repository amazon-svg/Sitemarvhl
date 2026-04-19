# Audit Vague 2 — pré-rendu statique & optimisation images

## Baseline (avant modifications)

Date : 2026-04-19
URL auditée : https://www.marvhl.fr (domaine canonique après fix redirections)
Outil : PageSpeed Insights (https://pagespeed.web.dev/)

### Scores Lighthouse

| Métrique           | Mobile | Desktop |
| ------------------ | -----: | ------: |
| Performance        |     96 |      99 |
| Accessibilité      |     96 |      96 |
| Bonnes pratiques   |    100 |     100 |
| SEO                |    100 |     100 |

### Core Web Vitals (lab)

| Métrique                         | Mobile | Desktop |
| -------------------------------- | -----: | ------: |
| LCP (Largest Contentful Paint)   |   2.3s |    0.6s |
| CLS (Cumulative Layout Shift)    |   0.00 |   0.001 |
| TBT (Total Blocking Time)        |    0ms |    10ms |
| FCP (First Contentful Paint)     |   1.7s |    0.5s |
| SI (Speed Index)                 |   4.2s |    1.2s |

**Lecture** : scores déjà excellents. Les marges d'amélioration côté Core Web Vitals sont fines (LCP mobile et SI mobile).

### Le vrai problème ciblé par la Vague 2

PSI exécute le JavaScript avant de mesurer. Les **crawlers sociaux** (LinkedIn, Slack, WhatsApp, Twitter, Facebook) et certains moteurs de recherche **ne l'exécutent pas**. Ils reçoivent le squelette de `index.html` pour toutes les URLs.

Démonstration sur `https://www.marvhl.fr/lot/bureau-21m2-r1-lormont` (21 avr. 2026, curl sans JS) :

```
<title>MARVHL – Bureaux & Open-Spaces à louer à Lormont (Bordeaux) | Bâtiment Galilée</title>
<meta name="description" content="Bureaux et open-spaces à louer à Lormont, 20 min de Bordeaux..." />
<meta property="og:title" content="MARVHL – Bureaux à louer à Lormont | Bâtiment Galilée" />
<meta property="og:url" content="https://www.marvhl.fr/" />
<link rel="canonical" href="https://www.marvhl.fr/" />
```

→ Même titre, même OG, même canonical **pour tous les lots** → aperçus LinkedIn identiques, signaux SEO "canonical=home" sur toutes les sous-pages.

### Objectifs Vague 2

1. **SSG** : chaque URL doit livrer son propre HTML avec `<title>`, `<meta description>`, `og:*`, `canonical` et JSON-LD spécifiques
2. **Images** : `loading="lazy"` par défaut, `fetchpriority="high"` sur le hero, `width`/`height` explicites (CLS), `alt` SEO-optimisés

---

## Après déploiement (à compléter post-preview)

URL preview Netlify : https://deploy-preview-2--grand-malasada-705f22.netlify.app

### Scores Lighthouse — preview

| Métrique           | Mobile (avant → après) | Desktop (avant → après) |
| ------------------ | ---------------------: | ----------------------: |
| Performance        | 96 → _TBD_             | 99 → _TBD_              |
| Accessibilité      | 96 → _TBD_             | 96 → _TBD_              |
| Bonnes pratiques   | 100 → _TBD_            | 100 → _TBD_             |
| SEO                | 100 → _TBD_            | 100 → _TBD_             |

### Core Web Vitals — preview

| Métrique | Mobile (avant → après) | Desktop (avant → après) |
| -------- | ---------------------: | ----------------------: |
| LCP      | 2.3s → _TBD_           | 0.6s → _TBD_            |
| CLS      | 0.00 → _TBD_           | 0.001 → _TBD_           |
| TBT      | 0ms → _TBD_            | 10ms → _TBD_            |
| FCP      | 1.7s → _TBD_           | 0.5s → _TBD_            |
| SI       | 4.2s → _TBD_           | 1.2s → _TBD_            |

### Vérifications SSG (automatiques sur preview)

Toutes validées via curl le 2026-04-19 sur la preview Netlify :

- [x] `/` → title "MARVHL – Bureaux & Espaces à louer à Lormont (33310) | Bâtiment Galilée", canonical `https://www.marvhl.fr/`
- [x] `/nos-lots/` → title "Nos lots à louer – Bureaux & Open Spaces à Lormont (33310) | MARVHL Galilée", canonical `https://www.marvhl.fr/nos-lots`
- [x] `/le-batiment/` → title "Bâtiment Galilée à Lormont – Immeuble de bureaux moderne | MARVHL", canonical `https://www.marvhl.fr/le-batiment`
- [x] `/contact/` → title "Contact – Louer un bureau à Lormont | MARVHL Galilée", canonical `https://www.marvhl.fr/contact`
- [x] `/lot/bureau-21m2-r1-lormont/` → title "Bureau 21 m² à louer à Lormont (33310) R+1 | MARVHL Bâtiment Galilée", canonical spécifique au lot
- [x] Chaque `og:image` est en URL absolue (préfixé SITE_URL)
- [x] Image Header : `loading="eager"` + `fetchpriority="high"` + `decoding="async"` + width/height
- [x] Image hero Home : mêmes optimisations above-the-fold
- [x] Images below-fold : `loading="lazy"` + `decoding="async"` + width/height

### Vérifications visuelles (à faire par toi dans le navigateur)

- [ ] Ouvre https://www.opengraph.xyz/ et teste 2-3 URLs preview différentes → prévisualisations différentes (titre/image/description par page)
- [ ] https://search.google.com/test/rich-results sur une page de lot → Schema.org détecté avec le RealEstateAgent global + données page spécifiques
- [ ] Navigation rapide sur la preview : rien de cassé visuellement

### Décisions techniques & ajustements

- **Choix SSR** : pivot de `vite-react-ssg` (beta, peerDep Router 6) vers un pipeline maison utilisant les APIs SSR officielles de React Router 7 (`createStaticHandler` + `createStaticRouter` + `StaticRouterProvider`). ~100 lignes de code, zéro dépendance ajoutée, stable.
- **Warning build** : `useLayoutEffect does nothing on the server` apparaît pour ContactForm pendant le render SSR. Non-bloquant, vient d'une dépendance tierce (probablement react-hook-form ou @radix-ui). Le rendu final est correct ; l'hydratation client corrige l'état.
- **og:image** : SEO.tsx préfixe automatiquement avec `SITE_URL` si le chemin est relatif (les crawlers Open Graph exigent des URLs absolues ; les imports Vite produisent des chemins `/assets/...`).
- **Trailing slash** : Netlify redirige 301 `/nos-lots → /nos-lots/` automatiquement (pretty URLs). Sans impact SEO (un seul cache-level redirect).
