// scripts/generate-og-images.mjs
// Génère une vignette de partage (Open Graph, 1200x630) par article de blog.
//
// Chaque vignette = une photo réelle du Bâtiment Galilée choisie pour le sujet
// de l'article, recadrée au centre (la mention "Image augmentée à l'ia"
// incrustée en bas de certaines photos sort du cadre — elle est réaffichée
// proprement dans l'habillage), un dégradé sombre en pied, le titre de
// l'article et la signature marvhl.fr.
//
// Exécution manuelle : npm run og-images
// Les JPEG produits sont versionnés dans public/og/ — le build du site ne
// dépend donc pas de ce script ni de sharp.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const ASSETS = path.join(ROOT, 'src/assets');
const OUT_DIR = path.join(ROOT, 'public/og');

const W = 1200;
const H = 630;

// Charte : bleu de marque du logo MARVHL, or de la signature de l'OG d'accueil.
const OR = '#F0B429';

const ARTICLES = [
  {
    slug: 'surface-bureau-par-taille-equipe',
    photo: '15f1ae53da997955d18af74c7def15f589b52561.webp',
    ia: true,
    eyebrow: 'Guide pratique',
    titre: 'Quelle surface de bureau\npour quelle taille d\'équipe ?',
    accroche: 'Les ratios réels, de 3 à 20 personnes',
  },
  {
    slug: 'cout-demenagement-entreprise-guide',
    photo: '78ca49cada1fdec49718ce4de2c5567e7151082e.webp',
    ia: true,
    eyebrow: 'Guide pratique',
    titre: 'Combien coûte vraiment\nun déménagement d\'entreprise ?',
    accroche: 'Les 6 postes de coût et la check-list en 8 semaines',
  },
  {
    slug: 'centre-d-appels-a-bordeaux-implantation-2026',
    photo: 'e89796731819da228a9d9417708569ae3371a09c.webp',
    ia: true,
    eyebrow: 'Guide pratique',
    titre: 'Centre d\'appels à Bordeaux :\ns\'implanter en 2026',
    accroche: 'Budget, critères techniques, choix de la zone',
  },
  {
    slug: 'open-space-a-louer-bordeaux-criteres',
    photo: '44cc8c63210a019b9956fb080f2cee1372aeaa18.webp',
    ia: true,
    eyebrow: 'Guide pratique',
    titre: 'Open-space à louer à Bordeaux :\n5 critères décisifs',
    accroche: 'Ce qui pèse vraiment sur le budget et la productivité',
  },
  {
    slug: 'bureau-tout-inclus-vs-traditionnel-calcul-pme',
    photo: 'cuisine-commune-batiment-galilee.webp',
    ia: false,
    eyebrow: 'Guide pratique',
    titre: 'Bureau tout inclus\nou traditionnel ?',
    accroche: 'Le vrai calcul pour une PME',
  },
  {
    slug: 'bureau-bordeaux-rive-droite-comparatif-2026',
    photo: '3d1117e52e415d2627416b07df0c0c4c39eb0674.webp',
    ia: true,
    eyebrow: 'Comparatif',
    titre: 'Louer un bureau\nà Bordeaux rive droite',
    accroche: 'Lormont, Cenon, Floirac, Bègles',
  },
];

const escape = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Coupe une ligne trop longue en s'appuyant sur une largeur moyenne de glyphe
// (Helvetica bold ≈ 0.54 em). Approximation suffisante : le gabarit garde
// 80 px de marge de sécurité à droite.
function wrap(ligne, tailleTitre, largeurMax) {
  const largeurGlyphe = tailleTitre * 0.54;
  const maxChars = Math.floor(largeurMax / largeurGlyphe);
  if (ligne.length <= maxChars) return [ligne];
  const mots = ligne.split(' ');
  const sorties = [];
  let courante = '';
  for (const mot of mots) {
    if (courante && (courante + ' ' + mot).length > maxChars) {
      sorties.push(courante);
      courante = mot;
    } else {
      courante = courante ? courante + ' ' + mot : mot;
    }
  }
  if (courante) sorties.push(courante);
  return sorties;
}

function habillage({ eyebrow, titre, accroche, ia }) {
  const lignesDemandees = titre.split('\n');
  // Le titre rétrécit si l'article impose plus de 2 lignes.
  let taille = 58;
  let lignes = lignesDemandees.flatMap((l) => wrap(l, taille, W - 160));
  if (lignes.length > 2) {
    taille = 48;
    lignes = lignesDemandees.flatMap((l) => wrap(l, taille, W - 160));
  }
  if (lignes.length > 3) {
    taille = 42;
    lignes = lignesDemandees.flatMap((l) => wrap(l, taille, W - 160));
  }

  const interligne = Math.round(taille * 1.18);
  const basePied = H - 54; // ligne de signature
  const baseAccroche = basePied - 52;
  const baseTitre = baseAccroche - 34 - (lignes.length - 1) * interligne;
  const baseEyebrow = baseTitre - interligne - 12;

  const lignesTitre = lignes
    .map(
      (l, i) =>
        `<text x="80" y="${baseTitre + i * interligne}" class="titre">${escape(l)}</text>`,
    )
    .join('\n    ');

  const mentionIa = ia
    ? `<text x="${W - 80}" y="${basePied}" class="mention" text-anchor="end">Image augmentée à l'IA</text>`
    : '';

  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="voile" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0B1220" stop-opacity="0"/>
      <stop offset="42%" stop-color="#0B1220" stop-opacity="0.45"/>
      <stop offset="72%" stop-color="#0B1220" stop-opacity="0.82"/>
      <stop offset="100%" stop-color="#0B1220" stop-opacity="0.94"/>
    </linearGradient>
    <style>
      .titre { font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; font-weight: 700;
               font-size: ${taille}px; fill: #FFFFFF; letter-spacing: -0.5px; }
      .eyebrow { font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; font-weight: 700;
                 font-size: 20px; fill: ${OR}; letter-spacing: 2.4px; }
      .accroche { font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; font-weight: 400;
                  font-size: 27px; fill: #E6EAF2; }
      .marque { font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; font-weight: 700;
                font-size: 22px; fill: ${OR}; }
      .pied { font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; font-weight: 400;
              font-size: 22px; fill: #C7CEDB; }
      .mention { font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; font-weight: 400;
                 font-size: 15px; fill: #FFFFFF; fill-opacity: 0.55; }
    </style>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#voile)"/>

  <text x="80" y="${baseEyebrow}" class="eyebrow">${escape(eyebrow.toUpperCase())}</text>
  ${lignesTitre}
  <text x="80" y="${baseAccroche}" class="accroche">${escape(accroche)}</text>

  <text x="80" y="${basePied}" class="marque">marvhl.fr<tspan class="pied" dx="14">· Bureaux &amp; open-spaces à louer — Lormont (Bordeaux)</tspan></text>
  ${mentionIa}
</svg>`);
}

fs.mkdirSync(OUT_DIR, { recursive: true });

for (const article of ARTICLES) {
  const source = path.join(ASSETS, article.photo);
  if (!fs.existsSync(source)) throw new Error(`photo introuvable : ${article.photo}`);

  const fond = await sharp(source)
    .resize(W, H, { fit: 'cover', position: article.cadrage ?? 'centre' })
    .toBuffer();

  const sortie = path.join(OUT_DIR, `${article.slug}.jpg`);
  await sharp(fond)
    .composite([{ input: habillage(article), top: 0, left: 0 }])
    .jpeg({ quality: 82, progressive: true, mozjpeg: true })
    .toFile(sortie);

  const ko = Math.round(fs.statSync(sortie).size / 1024);
  console.log(`✓ og/${article.slug}.jpg — ${ko} Ko`);
}

console.log(`\n✓ ${ARTICLES.length} vignettes générées dans public/og/`);
