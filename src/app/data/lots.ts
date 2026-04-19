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
  zfu?: boolean;             // Zone Franche Urbaine
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
      "Bureau privatif de 21 m² au 1er étage, climatisé et accessible 24h/7j. Idéal pour un professionnel libéral, une startup ou une petite équipe.",
    longDescription:
      "Situé au 1er étage du bâtiment Galilée, ce bureau privatif de 21 m² offre un cadre de travail fonctionnel et confortable. Climatisé, raccordé à la fibre optique et sécurisé par contrôle d'accès et vidéosurveillance, il est accessible 24h/24 et 7j/7. Livré non meublé pour vous laisser libre d'aménager l'espace selon vos besoins. Le bâtiment est situé en Zone Franche Urbaine (ZFU), ce qui peut ouvrir droit à des exonérations fiscales significatives. Le loyer est proposé sans engagement ni frais d'entrée.",
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
    noEngagement: true,
    zfu: true,
    transport: "Tram ligne A – arrêt Les Lauriers",
    images: [lotB101Img],
    metaTitle: "Bureau 21 m² à louer à Lormont (33310) R+1 | MARVHL Bâtiment Galilée",
    metaDescription:
      "Bureau privatif 21 m² climatisé, accessible 24h/7j, Zone Franche Urbaine (ZFU). 255 € HT/mois sans engagement. Bâtiment Galilée, 12 rue Cantelaudette, Lormont.",
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
      "Ce bureau privatif de 20 m² situé au 1er étage du bâtiment Galilée bénéficie d'une lumière naturelle grâce à sa fenêtre et d'un grand espace de rangement avec ses placards intégrés. Climatisé, raccordé à la fibre optique et sécurisé par contrôle d'accès et vidéosurveillance, il est accessible 24h/24 et 7j/7. Livré non meublé pour un aménagement selon vos besoins. Le bâtiment est situé en Zone Franche Urbaine (ZFU), ouvrant droit à des exonérations fiscales pour les entreprises éligibles. Loyer sans engagement ni frais d'entrée.",
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
    noEngagement: true,
    zfu: true,
    transport: "Tram ligne A – arrêt Les Lauriers",
    images: [lotB102Img],
    metaTitle: "Bureau 20 m² à louer à Lormont (33310) R+1 | MARVHL Bâtiment Galilée",
    metaDescription:
      "Bureau privatif 20 m² lumineux, climatisé, grands placards, Zone Franche Urbaine (ZFU). 245 € HT/mois sans engagement. Bâtiment Galilée, 12 rue Cantelaudette, Lormont.",
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
      "Bureau privatif de 22 m² au 1er étage, climatisé et accessible 24h/7j. Idéal pour un professionnel libéral, une startup ou une petite équipe.",
    longDescription:
      "Situé au 1er étage du bâtiment Galilée, ce bureau privatif de 22 m² offre un cadre de travail fonctionnel et confortable. Climatisé, raccordé à la fibre optique (abonnement à la charge du locataire) et sécurisé par contrôle d'accès et vidéosurveillance, il est accessible 24h/24 et 7j/7. Livré non meublé pour vous laisser libre d'aménager l'espace selon vos besoins. Le bâtiment est situé en Zone Franche Urbaine (ZFU), ce qui peut ouvrir droit à des exonérations fiscales significatives pour les entreprises éligibles. Le loyer est proposé sans engagement ni frais d'entrée.",
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
    noEngagement: true,
    zfu: true,
    transport: "Tram ligne A – arrêt Les Lauriers",
    images: [lotB103Img],
    metaTitle: "Bureau 22 m² à louer à Lormont (33310) R+1 | MARVHL Bâtiment Galilée",
    metaDescription:
      "Bureau privatif 22 m² climatisé, accessible 24h/7j, Zone Franche Urbaine (ZFU). 270 € HT/mois sans engagement. Bâtiment Galilée, 12 rue Cantelaudette, Lormont.",
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
      "Cet open space de 95 m² situé en rez-de-chaussée du bâtiment Galilée offre de grands espaces ouverts baignés de lumière naturelle, favorisant la collaboration et la créativité. Modulable selon vos besoins, il est prêt à accueillir vos équipes avec possibilité d'aménagement sur mesure. Le bâtiment dispose d'une cuisine équipée partagée (frigo, micro-ondes, lave-vaisselle) et d'une terrasse ensoleillée pour des pauses conviviales. Sécurisé par contrôle d'accès et vidéosurveillance 24h/7j, raccordé à la fibre optique et disposant de 26 places de parking. Situé en Zone Franche Urbaine (ZFU), des exonérations fiscales significatives sont possibles pour les entreprises éligibles. Location directe propriétaire — pas de frais d'agence.",
    features: [
      "Climatisation neuve",
      "Lumineux – grands espaces ouverts",
      "Modulable sur mesure",
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
      "Nettoyage quotidien",
      "Entretien des espaces verts",
      "Taxe foncière",
    ],
    charges: [
      { label: "Charges", value: "55 € HT/m²/an" },
      { label: "Impôt foncier (à la charge du preneur)", value: "24 € HT/m²/an" },
    ],
    noEngagement: true,
    zfu: true,
    transport: "Tram ligne A – arrêt Les Lauriers",
    images: [lotOS1Img1, lotOS1Img2, lotOS1Img3],
    metaTitle: "Open Space 95 m² à louer Lormont (33310) ZFU – Bâtiment Galilée | MARVHL",
    metaDescription:
      "Open space 95 m² lumineux, RDC, modulable, climatisé. ZFU – exonérations fiscales. 1 150 € HT/mois charges comprises. Location directe propriétaire. 12 rue Cantelaudette, Lormont.",
  },
  {
    id: 11,
    slug: "open-space-145m2-rdc-lormont",
    ref: "GAL-OS2",
    name: "Open Space 145 m² – RDC",
    type: "open-space",
    floor: 1,
    floorLabel: "Rez-de-chaussée",
    surface: 145,
    capacity: { min: 8, max: 16 },
    price: 1800,
    priceUnit: "€ HT / mois",
    status: "disponible",
    description:
      "Open space lumineux de 145 m² en rez-de-chaussée, modulable, climatisé. Idéal pour les entreprises dynamiques, startups en croissance ou équipes qui s'étoffent. Disponible immédiatement.",
    longDescription:
      "Cet open space lumineux de 145 m² situé en rez-de-chaussée au 12 rue Cantelaudette à Lormont, dans le bâtiment Galilée, est parfait pour les entreprises dynamiques et les startups en pleine croissance. Climatisé et doté de grands espaces ouverts pour favoriser la collaboration, il est modulable selon vos besoins avec possibilité d'aménagement sur mesure. Le bâtiment dispose d'un parking sécurisé de 26 places, d'une sécurité renforcée (contrôle d'accès et vidéo-surveillance 24h/7j), d'une fibre optique ultra-rapide, d'une cuisine équipée (frigo, micro-ondes, lave-vaisselle) et d'une terrasse ensoleillée pour des pauses conviviales. Situé en Zone Franche Urbaine (ZFU), des exonérations fiscales significatives sont possibles pour les entreprises éligibles. Location directe propriétaire — pas de frais d'agence, gestion directe et réactive.",
    features: [
      "Climatisation neuve",
      "Lumineux – grands espaces ouverts",
      "Modulable selon vos besoins",
      "Aménagement sur mesure possible",
      "Fibre optique ultra-rapide",
      "Parking sécurisé – 26 places",
      "Contrôle d'accès et vidéo-surveillance 24h/7j",
      "Cuisine équipée partagée (frigo, micro-ondes, lave-vaisselle)",
      "Terrasse ensoleillée",
      "Espaces verts entretenus",
      "Disponible immédiatement",
    ],
    included: [
      "Électricité",
      "Chauffage / Climatisation",
      "Eau",
      "Cuisine équipée",
      "Nettoyage quotidien",
      "Entretien des espaces verts",
      "Taxe foncière",
    ],
    charges: [
      { label: "Charges", value: "55 € HT/m²/an" },
      { label: "Impôt foncier (à la charge du preneur)", value: "24 € HT/m²/an" },
    ],
    noEngagement: true,
    zfu: true,
    transport: "Tram ligne A – arrêt Les Lauriers",
    images: [lotOS2Img1, lotOS2Img2],
    metaTitle: "Open Space 145 m² à louer Lormont (33310) ZFU – Bâtiment Galilée | MARVHL",
    metaDescription:
      "Open space 145 m² lumineux, RDC, modulable, climatisé. ZFU – exonérations fiscales. 1 800 € HT/mois. Location directe propriétaire sans frais d'agence. 12 rue Cantelaudette, Lormont.",
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
      "Nous proposons à la location deux bureaux contigus d'une surface totale de 60 m², situés au 1er étage de l'Immeuble Galilée, aux portes de Bordeaux Rive Droite. Ces 2 bureaux communicants sont idéaux pour une équipe ou deux activités complémentaires. Climatisés, lumineux, avec grands placards de rangement, ils sont prêts à accueillir vos équipes ou votre activité. Le bâtiment dispose d'un parking sécurisé de 26 places, d'une sécurité optimale (contrôle d'accès et vidéo-surveillance 24h/7j), d'une fibre optique pour une connexion ultra-rapide, d'une cuisine équipée (frigo, micro-ondes, lave-vaisselle) et d'une terrasse ensoleillée pour des pauses agréables. Situé en Zone Franche Urbaine (ZFU), des exonérations fiscales sont possibles pour les entreprises éligibles. Location directe propriétaire — pas de frais d'agence, gestion directe et réactive.",
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
      "Nettoyage quotidien des communs",
      "Entretien des espaces verts",
      "Taxe foncière",
    ],
    charges: [
      { label: "Charges", value: "55 € HT/m²/an" },
      { label: "Impôt foncier (à la charge du preneur)", value: "24 € HT/m²/an" },
    ],
    noEngagement: true,
    zfu: true,
    transport: "Tram ligne A – arrêt Les Lauriers",
    images: [lotB104Img1, lotB104Img2],
    metaTitle: "Bureaux 60 m² à louer Lormont (33310) R+1 ZFU – Bâtiment Galilée | MARVHL",
    metaDescription:
      "2 bureaux communicants 60 m², 1er étage, climatisés, lumineux, grands placards. ZFU – exonérations fiscales. 725 € HT/mois. Location directe propriétaire. 12 rue Cantelaudette, Lormont.",
  },
  {
    id: 14,
    slug: "open-space-94m2-r1-lormont",
    ref: "GAL-OS3",
    name: "Open Space 94 m² – R+1",
    type: "open-space",
    floor: 2,
    floorLabel: "1er étage (R+1)",
    surface: 94,
    capacity: { min: 10, max: 20 },
    price: 1200,
    priceUnit: "€ HT / mois",
    status: "disponible",
    description:
      "Open space de 94 m² au 1er étage avec 2 bureaux privatifs intégrés. Lumineux, climatisé, 20 postes de travail. Idéal pour une équipe en croissance nécessitant des espaces de confidentialité.",
    longDescription:
      "Cet open space de 94 m² situé au 1er étage du bâtiment Galilée allie la dynamique collaborative d'un espace ouvert à la discrétion de 2 bureaux privatifs intégrés. Conçu pour accueillir jusqu'à 20 postes de travail, il offre une grande flexibilité organisationnelle : open space pour les équipes, bureaux fermés pour les réunions sensibles, les entretiens ou le travail en concentration. Baigné de lumière naturelle grâce à ses larges fenêtres, il est doté d'une climatisation récente assurant le confort toute l'année. Raccordé à la fibre optique, sécurisé par contrôle d'accès et vidéosurveillance 24h/7j, et desservi par 26 places de parking. Le bâtiment est situé en Zone Franche Urbaine (ZFU), permettant des exonérations fiscales significatives pour les entreprises éligibles. Location directe propriétaire — pas de frais d'agence.",
    features: [
      "Open space 20 postes de travail",
      "2 bureaux privatifs intégrés",
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
      "Nettoyage quotidien des communs",
      "Entretien des espaces verts",
      "Taxe foncière",
    ],
    charges: [
      { label: "Charges", value: "55 € HT/m²/an" },
      { label: "Impôt foncier (à la charge du preneur)", value: "24 € HT/m²/an" },
    ],
    noEngagement: true,
    zfu: true,
    transport: "Tram ligne A – arrêt Les Lauriers",
    images: [lotOS3Img],
    metaTitle: "Open Space 94 m² R+1 à louer Lormont (33310) ZFU – Bâtiment Galilée | MARVHL",
    metaDescription:
      "Open space 94 m² au 1er étage avec 2 bureaux privatifs, 20 postes, climatisé, lumineux. ZFU – exonérations fiscales. À partir de 1 200 € HT/mois. Bâtiment Galilée, 12 rue Cantelaudette, Lormont.",
  },
];

export function getLotBySlug(slug: string): Lot | undefined {
  return lots.find((l) => l.slug === slug);
}

export function getAvailableLots(): Lot[] {
  return lots.filter((l) => l.status === "disponible");
}