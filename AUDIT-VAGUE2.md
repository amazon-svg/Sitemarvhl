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

<!-- Sera rempli après déploiement de la PR vague-2-prerender sur l'URL preview Netlify -->

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

### Vérifications SSG (à faire sur preview)

- [ ] `curl PREVIEW/nos-lots | grep "<title>"` → titre "Nos lots" (≠ titre home)
- [ ] `curl PREVIEW/lot/bureau-21m2-r1-lormont | grep "og:title"` → og spécifique au lot
- [ ] `curl PREVIEW/le-batiment | grep "canonical"` → canonical = `/le-batiment`
- [ ] Test Open Graph https://www.opengraph.xyz/ sur 2-3 URLs différentes → prévisualisations différentes
- [ ] Test Rich Results https://search.google.com/test/rich-results sur une page de lot → Schema.org détecté avec données spécifiques au lot

### Décisions techniques & ajustements

<!-- À remplir si un arbitrage particulier a dû être fait pendant l'implémentation -->
