import lotB101Img from "figma:asset/c58d767ae6f703b00821803607d4cbb5a76295ba.webp";
import lotB102Img from "figma:asset/d27093a10a149cf04a5509fb8d568b0759874e25.webp";
import lotB103Img from "figma:asset/8069bba4b3eb10e73a0314e282250f8bfb31a0a9.webp";
import lotOS1Img1 from "figma:asset/78ca49cada1fdec49718ce4de2c5567e7151082e.webp";
import lotOS1Img2 from "figma:asset/44cc8c63210a019b9956fb080f2cee1372aeaa18.webp";
import lotOS1Img3 from "figma:asset/c71d46b8bd7f28e05c9ebc33adab54b85db50133.webp";
import lotOS2Img1 from "figma:asset/15f1ae53da997955d18af74c7def15f589b52561.webp";
import lotOS2Img2 from "figma:asset/5b9bc2fe29a9928e2dd5bbfb76b0d4d82d37f2ee.webp";
import lotB104Img1 from "figma:asset/81a84734d40d7f8dfd6fcb2543de38cd08ba62a7.webp";
import lotB104Img2 from "figma:asset/6bef01d1cac9f524549078db1474357fae6d7742.webp";
import lotOS3Img from "figma:asset/e89796731819da228a9d9417708569ae3371a09c.webp";

export type LotStatus = "disponible" | "loué" | "réservé";
export type LotType = "bureau" | "open-space" | "suite";

export interface Lot {
  id: number;
  slug: string;
  ref: string;
  name: string;
  type: LotType;
  floor: number;
  floorLabel: string;
  surface: number;
  capacity: { min: number; max: number };
  price: number; // €/mois HT
  priceUnit: string;
  status: LotStatus;
  description: string;
  longDescription: string;
  features: string[];
  included?: string[];       // services inclus dans le loyer
  charges?: { label: string; value: string }[];
  noEngagement?: boolean;    // sans engagement ni frais d'entrée
  transport?: string;        // transport info spécifique au lot
  images: string[];
  metaTitle: string;
  metaDescription: string;
}

export const lots: Lot[] = [
  {
    id: 1,
    slug: "bureau-21m2-r1-lormont",
    ref: "GAL-101",
    name: "Bureau 21 m² – R+1",
    type: "bureau",
    floor: 2,
    floorLabel: "1er étage (R+1)",
    surface: 21,
    capacity: { min: 1, max: 3 },
    price: 255,
    priceUnit: "€ HT / mois",
    status: "disponible",
    description:
      "Le moins cher des trois bureaux privatifs du 1er étage : 21 m² climatisés, accès sécurisé 24h/7j, pour un professionnel seul, un binôme ou une petite équipe de 3.",
    longDescription:
      "Ce bureau de 21 m² occupe le 1er étage du bâtiment Galilée, aux côtés de deux bureaux voisins de taille comparable (20 et 22 m²) — c'est le moins cher des trois. Climatisation, fibre optique (abonnement à la charge du locataire), contrôle d'accès et vidéosurveillance assurent un usage autonome 24h/24 et 7j/7. Livré non meublé, pour un aménagement libre. Un seul montant mensuel tout compris : 358 € HT (loyer 255 €, charges 61 €, taxe foncière 42 €), qui couvre l'électricité et l'eau des communs, le nettoyage des parties communes, la domiciliation et l'entretien des espaces verts. Bail 3-6-9, dépôt de garantie de 3 mois de loyer. Location directe auprès du propriétaire, sans frais d'agence ni intermédiaire.",
    features: [
      "Climatisation",
      "Fibre optique (abonnement à la charge du locataire)",
      "Contrôle d'accès",
      "Accessible 24h/24 – 7j/7",
      "Télé et vidéo-surveillance",
      "Parking",
      "Non-meublé",
    ],
    included: [
      "Domiciliation",
      "Électricité des communs",
      "Climatisation",
      "Eau des communs",
      "Nettoyage des communs",
      "Entretien des espaces verts",
      "Taxe foncière",
    ],
    charges: [
      { label: "Charges (35 € HT/m²/an)", value: "≈ 61 € HT/mois" },
      { label: "Taxe foncière (24 € HT/m²/an)", value: "≈ 42 € HT/mois" },
      { label: "Total mensuel tout compris", value: "≈ 358 € HT/mois" },
      { label: "Dépôt de garantie", value: "3 mois de loyer" },
    ],
    noEngagement: false,
    transport: "Tram ligne A – arrêt Les Lauriers",
    images: [lotB101Img],
    metaTitle: "Bureau privatif 21 m² à louer Lormont (33310) R+1 – Bâtiment Galilée | MARVHL",
    metaDescription:
      "Bureau privatif 21 m² climatisé, accès 24h/7j, 358 € HT/mois tout compris, sans frais d'agence. Bâtiment Galilée, 12 rue Cantelaudette, Lormont.",
  },
  {
    id: 9,
    slug: "bureau-20m2-r1-lormont",
    ref: "GAL-102",
    name: "Bureau 20 m² – R+1",
    type: "bureau",
    floor: 2,
    floorLabel: "1er étage (R+1)",
    surface: 20,
    capacity: { min: 1, max: 2 },
    price: 245,
    priceUnit: "€ HT / mois",
    status: "disponible",
    description:
      "Bureau privatif de 20 m² au 1er étage, lumineux avec fenêtre, grands placards de rangement et climatisation. Idéal pour un professionnel libéral ou un binôme.",
    longDescription:
      "Bureau privatif de 20 m² situé au 1er étage du bâtiment Galilée, lumineux grâce à sa fenêtre et doté de grands placards de rangement intégrés. Climatisé, raccordé à la fibre optique (abonnement à la charge du locataire), sécurisé par contrôle d'accès et vidéosurveillance, accessible 24h/7j. Livré non meublé pour vous laisser libre d'aménager l'espace selon vos besoins. Un seul montant mensuel tout compris : 343 € HT (loyer 245 €, charges 58 €, taxe foncière 40 €), qui couvre l'électricité et l'eau des communs, le nettoyage des parties communes, la domiciliation et l'entretien des espaces verts. Bail 3-6-9, dépôt de garantie de 3 mois de loyer. Location directe propriétaire — pas de frais d'agence, pas d'intermédiaire.",
    features: [
      "Climatisation",
      "Fenêtre – lumière naturelle",
      "Grands placards de rangement",
      "Fibre optique (abonnement à la charge du locataire)",
      "Contrôle d'accès",
      "Accessible 24h/24 – 7j/7",
      "Télé et vidéo-surveillance",
      "Parking",
      "Non-meublé",
    ],
    included: [
      "Domiciliation",
      "Électricité des communs",
      "Climatisation",
      "Eau des communs",
      "Nettoyage des communs",
      "Entretien des espaces verts",
      "Taxe foncière",
    ],
    charges: [
      { label: "Charges (35 € HT/m²/an)", value: "≈ 58 € HT/mois" },
      { label: "Taxe foncière (24 € HT/m²/an)", value: "≈ 40 € HT/mois" },
      { label: "Total mensuel tout compris", value: "≈ 343 € HT/mois" },
      { label: "Dépôt de garantie", value: "3 mois de loyer" },
    ],
    noEngagement: false,
    transport: "Tram ligne A – arrêt Les Lauriers",
    images: [lotB102Img],
    metaTitle: "Bureau privatif 20 m² à louer Lormont (33310) R+1 – Bâtiment Galilée | MARVHL",
    metaDescription:
      "Bureau privatif 20 m² lumineux, climatisé, grands placards, 343 € HT/mois tout compris, sans frais d'agence. Bâtiment Galilée, Lormont.",
  },
  {
    id: 13,
    slug: "bureau-22m2-r1-lormont",
    ref: "GAL-103",
    name: "Bureau 22 m² – R+1",
    type: "bureau",
    floor: 2,
    floorLabel: "1er étage (R+1)",
    surface: 22,
    capacity: { min: 1, max: 3 },
    price: 270,
    priceUnit: "€ HT / mois",
    status: "disponible",
    description:
      "Le plus grand des trois bureaux privatifs du 1er étage : 22 m² climatisés, accès sécurisé 24h/7j, pour un professionnel libéral, une startup ou une équipe jusqu'à 3 personnes.",
    longDescription:
      "Avec 22 m², c'est le plus spacieux des trois bureaux du 1er étage du bâtiment Galilée (aux côtés des 20 et 21 m² voisins). Climatisé, raccordé à la fibre optique (abonnement à la charge du locataire), sécurisé par contrôle d'accès et vidéosurveillance, accessible 24h/24 et 7j/7. Livré non meublé pour un aménagement libre. Un seul montant mensuel tout compris : 378 € HT (loyer 270 €, charges 64 €, taxe foncière 44 €), qui couvre l'électricité et l'eau des communs, le nettoyage des parties communes, la domiciliation et l'entretien des espaces verts. Bail 3-6-9, dépôt de garantie de 3 mois de loyer. Location directe propriétaire — pas de frais d'agence, pas d'intermédiaire.",
    features: [
      "Climatisation",
      "Fibre optique (abonnement à la charge du locataire)",
      "Contrôle d'accès",
      "Accessible 24h/24 – 7j/7",
      "Télé et vidéo-surveillance",
      "Parking",
      "Non-meublé",
    ],
    included: [
      "Domiciliation",
      "Électricité des communs",
      "Climatisation",
      "Eau des communs",
      "Nettoyage des communs",
      "Entretien des espaces verts",
      "Taxe foncière",
    ],
    charges: [
      { label: "Charges (35 € HT/m²/an)", value: "≈ 64 € HT/mois" },
      { label: "Taxe foncière (24 € HT/m²/an)", value: "≈ 44 € HT/mois" },
      { label: "Total mensuel tout compris", value: "≈ 378 € HT/mois" },
      { label: "Dépôt de garantie", value: "3 mois de loyer" },
    ],
    noEngagement: false,
    transport: "Tram ligne A – arrêt Les Lauriers",
    images: [lotB103Img],
    metaTitle: "Bureau privatif 22 m² à louer Lormont (33310) R+1 – Bâtiment Galilée | MARVHL",
    metaDescription:
      "Bureau privatif 22 m² climatisé, accès 24h/7j, 378 € HT/mois tout compris, sans frais d'agence. Bâtiment Galilée, 12 rue Cantelaudette, Lormont.",
  },
  {
    id: 10,
    slug: "open-space-95m2-rdc-lormont",
    ref: "GAL-OS1",
    name: "Open Space 95 m² – RDC",
    type: "open-space",
    floor: 1,
    floorLabel: "Rez-de-chaussée",
    surface: 95,
    capacity: { min: 6, max: 12 },
    price: 1150,
    priceUnit: "€ HT / mois",
    status: "disponible",
    description:
      "Open space lumineux de 95 m² en rez-de-chaussée, modulable, climatisé. Idéal pour les startups en croissance et les équipes dynamiques. Disponible immédiatement.",
    longDescription:
      "Open-space de 95 m² au rez-de-chaussée du bâtiment Galilée pour 10 à 15 postes. Accès PMR. Climatisé, lumineux, modulable selon l'organisation de votre équipe. Le bâtiment propose un parking privatif de 26 places, une cuisine équipée (réfrigérateur, micro-ondes, lave-vaisselle), une terrasse, la fibre optique, un contrôle d'accès et une vidéosurveillance 24h/7j. Un seul montant mensuel tout compris : 1 617 € HT (loyer 1 150 €, charges 277 €, taxe foncière 190 €), qui couvre l'électricité et l'eau des communs, le nettoyage des parties communes, la domiciliation et l'entretien des espaces verts. Bail 3-6-9, dépôt de garantie de 3 mois de loyer. Location directe propriétaire — pas de frais d'agence.",
    features: [
      "Climatisation neuve",
      "Lumineux – grands espaces ouverts",
      "Modulable sur mesure",
      "Accès PMR",
      "Fibre optique",
      "Parking sécurisé – 26 places",
      "Contrôle d'accès et vidéo-surveillance 24h/7j",
      "Cuisine équipée partagée (frigo, micro-ondes, lave-vaisselle)",
      "Terrasse ensoleillée",
      "Disponible immédiatement",
    ],
    included: [
      "Électricité",
      "Chauffage / Climatisation",
      "Eau",
      "Cuisine équipée",
      "Nettoyage des parties communes",
      "Entretien des espaces verts",
      "Taxe foncière",
    ],
    charges: [
      { label: "Charges (35 € HT/m²/an)", value: "≈ 277 € HT/mois" },
      { label: "Taxe foncière (24 € HT/m²/an)", value: "≈ 190 € HT/mois" },
      { label: "Total mensuel tout compris", value: "≈ 1 617 € HT/mois" },
      { label: "Dépôt de garantie", value: "3 mois de loyer" },
    ],
    noEngagement: false,
    transport: "Tram ligne A – arrêt Les Lauriers",
    images: [lotOS1Img1, lotOS1Img2, lotOS1Img3],
    metaTitle: "Open Space 95 m² à louer Lormont (33310) RDC – Bâtiment Galilée | MARVHL",
    metaDescription:
      "Open-space 95 m² RDC, 10-15 postes, climatisé, modulable, accès PMR. 1 617 € HT/mois tout compris, sans frais d'agence. Lormont.",
  },
  {
    id: 11,
    slug: "open-space-143m2-rdc-lormont",
    ref: "GAL-OS2",
    name: "Open Space 143 m² – RDC",
    type: "open-space",
    floor: 1,
    floorLabel: "Rez-de-chaussée",
    surface: 143,
    capacity: { min: 10, max: 12 },
    price: 1728,
    priceUnit: "€ HT / mois",
    status: "disponible",
    description:
      "Grand plateau de 143 m² de plain-pied, 2 entrées distinctes et accès direct à la terrasse. Lumineux, climatisé, 10 à 12 postes de travail. Idéal pour un centre d'appels, un service client, un back-office ou une équipe commerciale. Disponible immédiatement.",
    longDescription:
      "Grand plateau ouvert de 143 m² au rez-de-chaussée du bâtiment Galilée, de plain-pied, avec 2 entrées distinctes et accès direct à la terrasse : il peut accueillir une seule équipe ou deux activités séparées. Conçu pour 10 à 12 postes de travail, lumineux, climatisé, raccordé à la fibre optique, sécurisé par contrôle d'accès et vidéosurveillance 24h/7j, 26 places de parking privatives, cuisine équipée partagée. Un seul montant mensuel tout compris : 2 431 € HT (loyer 1 728 €, charges 417 €, taxe foncière 286 €), qui couvre l'électricité et l'eau des communs, le chauffage et la climatisation, le nettoyage des parties communes, la domiciliation et l'entretien des espaces verts. Surface de 143 m² quote-part des parties communes incluse. Bail 3-6-9, dépôt de garantie de 3 mois de loyer. Location directe propriétaire — pas de frais d'agence.",
    features: [
      "Climatisation neuve",
      "Open space 10 à 12 postes de travail",
      "Plain-pied – lumineux",
      "2 entrées distinctes",
      "Accès direct à la terrasse",
      "Modulable : une équipe ou deux activités séparées",
      "Fibre optique (abonnement à la charge du locataire)",
      "Parking sécurisé – 26 places",
      "Contrôle d'accès et vidéo-surveillance 24h/7j",
      "Cuisine équipée partagée (frigo, micro-ondes, lave-vaisselle)",
      "Terrasse ensoleillée",
      "Espaces verts entretenus",
      "Disponible immédiatement",
    ],
    included: [
      "Électricité des communs",
      "Chauffage / Climatisation",
      "Eau des communs",
      "Cuisine équipée partagée",
      "Nettoyage des parties communes",
      "Entretien des espaces verts",
      "Taxe foncière",
    ],
    charges: [
      { label: "Charges (35 € HT/m²/an)", value: "≈ 417 € HT/mois" },
      { label: "Taxe foncière (24 € HT/m²/an)", value: "≈ 286 € HT/mois" },
      { label: "Total mensuel tout compris", value: "≈ 2 431 € HT/mois" },
      { label: "Dépôt de garantie", value: "3 mois de loyer" },
    ],
    noEngagement: false,
    transport: "Rocade sortie 2 · Tram ligne A, arrêt Les Lauriers · Bus Lianes 7 à 300 m",
    images: [lotOS2Img1, lotOS2Img2],
    metaTitle: "Open Space 143 m² à louer Lormont (33310) RDC – Bâtiment Galilée | MARVHL",
    metaDescription:
      "Open-space 143 m² de plain-pied, 10 à 12 postes, 2 entrées, accès terrasse. 2 431 € HT/mois tout compris, bail 3-6-9, sans frais d'agence. Lormont.",
  },
  {
    id: 12,
    slug: "bureaux-60m2-r1-lormont",
    ref: "GAL-104",
    name: "Bureaux 60 m² – R+1",
    type: "bureau",
    floor: 2,
    floorLabel: "1er étage (R+1)",
    surface: 60,
    capacity: { min: 4, max: 6 },
    price: 725,
    priceUnit: "€ HT / mois",
    status: "disponible",
    description:
      "2 bureaux communicants de 60 m² au 1er étage, climatisés, lumineux avec grands placards de rangement. Idéal pour une équipe ou deux activités complémentaires. Disponible immédiatement.",
    longDescription:
      "Deux bureaux contigus et communicants totalisant 60 m² au 1er étage du bâtiment Galilée, louables séparément ou ensemble. Climatisés, lumineux, avec grands placards de rangement intégrés. Le bâtiment dispose d'un parking privatif de 26 places, d'une cuisine équipée (frigo, micro-ondes, lave-vaisselle), d'une terrasse, de la fibre optique, d'un contrôle d'accès et d'une vidéosurveillance 24h/7j. Un seul montant mensuel tout compris : 1 020 € HT (loyer 725 €, charges 175 €, taxe foncière 120 €), qui couvre l'électricité et l'eau des communs, le nettoyage des parties communes, la domiciliation et l'entretien des espaces verts. Bail 3-6-9, dépôt de garantie de 3 mois de loyer. Location directe propriétaire — pas de frais d'agence.",
    features: [
      "2 bureaux communicants",
      "Climatisation neuve",
      "Lumineux – lumière naturelle",
      "Grands placards de rangement",
      "Fibre optique ultra-rapide (abonnement à la charge du locataire)",
      "Contrôle d'accès",
      "Accessible 24h/24 – 7j/7",
      "Vidéo-surveillance",
      "Parking sécurisé – 26 places",
      "Cuisine équipée partagée (frigo, micro-ondes, lave-vaisselle)",
      "Terrasse ensoleillée",
      "Espaces verts entretenus",
      "Disponible immédiatement",
    ],
    included: [
      "Domiciliation",
      "Électricité des communs",
      "Chauffage / Climatisation",
      "Eau des communs",
      "Nettoyage des parties communes",
      "Entretien des espaces verts",
      "Taxe foncière",
    ],
    charges: [
      { label: "Charges (35 € HT/m²/an)", value: "≈ 175 € HT/mois" },
      { label: "Taxe foncière (24 € HT/m²/an)", value: "≈ 120 € HT/mois" },
      { label: "Total mensuel tout compris", value: "≈ 1 020 € HT/mois" },
      { label: "Dépôt de garantie", value: "3 mois de loyer" },
    ],
    noEngagement: false,
    transport: "Tram ligne A – arrêt Les Lauriers",
    images: [lotB104Img1, lotB104Img2],
    metaTitle: "Bureaux 60 m² à louer Lormont (33310) R+1 – Bâtiment Galilée | MARVHL",
    metaDescription:
      "2 bureaux communicants 60 m², 1er étage, climatisés, grands placards. 1 020 € HT/mois tout compris, sans frais d'agence. 12 rue Cantelaudette, Lormont.",
  },
  {
    id: 14,
    slug: "open-space-160m2-r1-lormont",
    ref: "GAL-OS3",
    name: "Open Space 160 m² – R+1",
    type: "open-space",
    floor: 2,
    floorLabel: "1er étage (R+1)",
    surface: 160,
    capacity: { min: 10, max: 20 },
    price: 1950,
    priceUnit: "€ HT / mois",
    status: "disponible",
    description:
      "Open space de 160 m² au 1er étage avec 2 bureaux privatifs intégrés. Lumineux, climatisé, 10 à 20 postes de travail. Idéal pour une équipe en croissance nécessitant des espaces de confidentialité.",
    longDescription:
      "Open-space de 160 m² au 1er étage du bâtiment Galilée avec 2 bureaux privatifs intégrés de 7 m² et 15 m², chacun climatisé et éclairé par sa fenêtre. Conçu pour accueillir de 10 à 20 postes de travail, il offre une flexibilité organisationnelle rare : open-space pour les équipes, bureaux fermés pour les réunions sensibles ou le travail en concentration. Baigné de lumière naturelle, climatisé, raccordé à la fibre optique, sécurisé par contrôle d'accès et vidéosurveillance 24h/7j, 26 places de parking privatives. Un seul montant mensuel tout compris : 2 740 € HT (loyer 1 950 €, charges 470 €, taxe foncière 320 €), qui couvre l'électricité et l'eau des communs, le chauffage et la climatisation, le nettoyage des parties communes, la domiciliation et l'entretien des espaces verts. Bail 3-6-9, dépôt de garantie de 3 mois de loyer. Location directe propriétaire — pas de frais d'agence.",
    features: [
      "Open space 10 à 20 postes de travail",
      "2 bureaux privatifs de 7 m² et 15 m², climatisation et fenêtre dans chacun",
      "Climatisation",
      "Fenêtres – lumière naturelle abondante",
      "Fibre optique (abonnement à la charge du locataire)",
      "Contrôle d'accès",
      "Accessible 24h/24 – 7j/7",
      "Vidéo-surveillance",
      "Parking sécurisé – 26 places",
      "Cuisine équipée partagée (frigo, micro-ondes, lave-vaisselle)",
      "Terrasse ensoleillée",
      "Disponible immédiatement",
    ],
    included: [
      "Électricité des communs",
      "Chauffage / Climatisation",
      "Eau des communs",
      "Nettoyage des parties communes",
      "Entretien des espaces verts",
      "Taxe foncière",
    ],
    charges: [
      { label: "Charges (35 € HT/m²/an)", value: "≈ 470 € HT/mois" },
      { label: "Taxe foncière (24 € HT/m²/an)", value: "≈ 320 € HT/mois" },
      { label: "Total mensuel tout compris", value: "≈ 2 740 € HT/mois" },
      { label: "Dépôt de garantie", value: "3 mois de loyer" },
    ],
    noEngagement: false,
    transport: "Rocade sortie 2 · Tram ligne A, arrêt Les Lauriers · Bus Lianes 7 à 300 m",
    images: [lotOS3Img],
    metaTitle: "Open Space 160 m² à louer Lormont (33310) R+1 – Bâtiment Galilée | MARVHL",
    metaDescription:
      "Open-space 160 m² au 1er étage, 10 à 20 postes, 2 bureaux privatifs intégrés. 2 740 € HT/mois tout compris, bail 3-6-9, sans frais d'agence. Lormont.",
  },
];

export function getLotBySlug(slug: string): Lot | undefined {
  return lots.find((l) => l.slug === slug);
}

export function getAvailableLots(): Lot[] {
  return lots.filter((l) => l.status === "disponible");
}
