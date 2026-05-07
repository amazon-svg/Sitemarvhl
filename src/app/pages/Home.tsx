import {
  ArrowRight,
  MapPin,
  Zap,
  Shield,
  Car,
  Train,
  CheckCircle2,
  Building2,
  Leaf,
  Maximize2,
} from "lucide-react";
import { Link } from "react-router";
import { SEO } from "../components/SEO";
import { LotCard } from "../components/LotCard";
import { building } from "../data/building";
import { lots } from "../data/lots";
import buildingFrontImg from "figma:asset/6a3f5bf8b62646fdb9bd10021224db52cec44dd1.webp";
import buildingTerraceImg from "figma:asset/f5d1a5760fa4243945e5fe33696439688970d9fa.webp";
import buildingRedImg from "figma:asset/50327e10fa0874324564e7038562eb8b30b891cb.webp";
import logoImg from "figma:asset/020393562d2638c44029c529b172f40a7804d8c0.webp";
import { FAQ } from "../components/FAQ";

const SITE_URL = "https://www.marvhl.fr";

const homeOrganizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "@id": `${SITE_URL}/#organization`,
  name: "MARVHL",
  alternateName: "SCSi MARVHL",
  description: "Commercialisation directe de bureaux et open-spaces au bâtiment Galilée à Lormont (Bordeaux rive droite). Location directe propriétaire, sans frais d'agence, loyer tout inclus.",
  url: SITE_URL,
  get logo() { return `${SITE_URL}${logoImg}`; },
  get image() { return `${SITE_URL}${buildingFrontImg}`; },
  telephone: "+33756806404",
  email: building.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: building.address.street,
    postalCode: building.address.postalCode,
    addressLocality: building.address.city,
    addressRegion: "Nouvelle-Aquitaine",
    addressCountry: "FR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 44.87,
    longitude: -0.52,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "00:00",
      closes: "00:00",
      description: "Sur rendez-vous",
    },
  ],
  areaServed: [
    { "@type": "City", name: "Bordeaux" },
    { "@type": "City", name: "Lormont" },
    { "@type": "AdministrativeArea", name: "Bordeaux Métropole" },
  ],
  sameAs: ["https://www.linkedin.com/company/marvhl"],
};

const homeFaqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Quel est le prix d'un bureau au bâtiment Galilée ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Les loyers démarrent à 245 € HT/mois pour un bureau individuel de 20 m² et vont jusqu'à 1 800 € HT/mois pour un open-space de 145 m². Tous les loyers sont tout inclus : électricité, chauffage, climatisation, eau, ménage des parties communes, taxe foncière et domiciliation.",
      },
    },
    {
      "@type": "Question",
      name: "Y a-t-il des frais d'agence pour louer un bureau au bâtiment Galilée ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Non. La location se fait en direct avec le propriétaire, sans aucun frais d'agence ni honoraires de commercialisation.",
      },
    },
    {
      "@type": "Question",
      name: "Quels services sont inclus dans le loyer ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Le loyer comprend l'électricité, le chauffage et la climatisation, l'eau, le ménage des parties communes, l'entretien des espaces verts, la domiciliation d'entreprise et la taxe foncière. La fibre optique est raccordée (abonnement à la charge du locataire).",
      },
    },
    {
      "@type": "Question",
      name: "Comment visiter le bâtiment Galilée ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Les visites se font sur rendez-vous, du lundi au vendredi de 9h à 18h, et le samedi sur rendez-vous. Vous pouvez prendre contact au 07 56 80 64 04 ou par email à contact.marvhl@gmail.com.",
      },
    },
    {
      "@type": "Question",
      name: "Le bâtiment Galilée est-il accessible PMR ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui. Le rez-de-chaussée est accessible aux personnes à mobilité réduite, y compris l'open-space 95 m² avec son bureau attenant.",
      },
    },
    {
      "@type": "Question",
      name: "Y a-t-il un parking ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui, 26 places de parking privatives sont disponibles sur site, incluses dans le loyer.",
      },
    },
    {
      "@type": "Question",
      name: "Peut-on domicilier son entreprise au bâtiment Galilée ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Oui, la domiciliation d'entreprise est incluse dans le loyer pour tous les locataires du bâtiment Galilée.",
      },
    },
    {
      "@type": "Question",
      name: "Quelle est la durée d'engagement minimum ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Le bail proposé est un bail professionnel 3-6-9 selon accord. Le dépôt de garantie est de 3 mois de loyer. La disponibilité est immédiate.",
      },
    },
    {
      "@type": "Question",
      name: "Comment se rendre au bâtiment Galilée depuis Bordeaux ?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Le bâtiment se trouve à 12 rue Cantelaudette, 33310 Lormont, à 15-20 minutes du centre de Bordeaux par la rocade A630 (sortie 23 Lormont). Le tram ligne A (arrêt Les Lauriers) est à 8 minutes à pied.",
      },
    },
  ],
};

const stats = [
  { value: `${building.totalSurface.toLocaleString("fr-FR")} m²`, label: "Surface totale" },
  { value: `${building.floors} niveaux`, label: "Étages de bureaux" },
  { value: `${building.parking.total}`, label: "Places de parking" },
  { value: building.yearBuilt.toString(), label: "Année de construction" },
];

export function Home() {
  const availableLots = lots.filter((l) => l.status === "disponible");
  const allLots = lots;

  return (
    <>
      <SEO
        title="Bureaux à louer Lormont (33310) — Bâtiment Galilée, Bordeaux rive droite | MARVHL"
        description={building.shortDescription}
        canonical="/"
        ogImage={buildingFrontImg}
        jsonLd={[homeOrganizationJsonLd, homeFaqJsonLd]}
      />

      {/* ── Bandeau introductif compact ── */}
      <section
        className="relative bg-[#0F2D52] overflow-hidden"
        aria-label="Présentation du bâtiment Galilée"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[5fr_7fr] gap-0 items-stretch min-h-[360px]">
            {/* Texte */}
            <div className="flex flex-col justify-center py-10 lg:py-14 pr-0 lg:pr-8 z-10">
              <div className="flex flex-wrap gap-2 mb-4">
                <div className="inline-flex items-center gap-2 bg-[#C9A84C]/20 text-[#C9A84C] text-xs font-semibold px-3 py-1.5 rounded-full w-fit">
                  <MapPin size={12} />
                  {building.address.full}
                </div>
                <div className="inline-flex items-center gap-2 bg-white/10 text-white text-xs font-semibold px-3 py-1.5 rounded-full w-fit border border-white/20">
                  <CheckCircle2 size={12} className="text-[#C9A84C]" />
                  TOUT INCLUS • SANS FRAIS D'AGENCE
                </div>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-3">
                Bureaux et open-spaces à louer à Lormont
                <br />
                <span className="text-xl sm:text-2xl font-normal text-white/80">
                  Bâtiment <span className="text-[#C9A84C]">{building.name}</span>, Bordeaux rive droite
                </span>
              </h1>
              <p className="text-white/75 text-sm mb-6 max-w-md leading-relaxed">
                {building.tagline}
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="#lots"
                  className="inline-flex items-center gap-2 bg-[#C9A84C] hover:bg-[#b8963e] text-white font-semibold px-6 py-2.5 rounded-md text-sm transition-colors"
                >
                  Voir les lots disponibles
                  <ArrowRight size={15} />
                </a>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/30 font-semibold px-6 py-2.5 rounded-md text-sm transition-colors"
                >
                  Demander une visite
                </Link>
              </div>
            </div>

            {/* Photo bâtiment */}
            <div className="hidden lg:block relative -mr-8">
              <img
                src={buildingFrontImg}
                alt="Façade du bâtiment Galilée à Lormont (33310) : bureaux à louer, 12 rue Cantelaudette"
                className="w-full h-full object-cover object-[15%_center]"
                width={1146}
                height={553}
                loading="eager"
                fetchpriority="high"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0F2D52] via-[#0F2D52]/10 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="bg-[#0a1f3a] py-5 border-b border-white/10" aria-label="Chiffres clés du bâtiment">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <dl className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <dt className="text-[#C9A84C] text-xl sm:text-2xl font-bold">{s.value}</dt>
                <dd className="text-white/60 text-xs mt-0.5">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── LOTS – section principale ── */}
      <section id="lots" className="py-12 sm:py-16 bg-white scroll-mt-20" aria-labelledby="section-lots">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-[#C9A84C] text-xs font-semibold uppercase tracking-widest mb-1">
                Espaces disponibles
              </p>
              <h2 id="section-lots" className="text-2xl sm:text-3xl font-bold text-[#0F2D52]">
                Nos lots à la location
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                {availableLots.length} lot{availableLots.length > 1 ? "s" : ""} disponible{availableLots.length > 1 ? "s" : ""} · Bâtiment Galilée, Lormont
              </p>
            </div>
            <Link
              to="/nos-lots"
              className="inline-flex items-center gap-2 text-[#0F2D52] font-semibold text-sm hover:text-[#C9A84C] transition-colors shrink-0 border border-[#0F2D52]/20 px-4 py-2 rounded-md hover:border-[#C9A84C]"
            >
              Voir tous les lots
              <ArrowRight size={15} />
            </Link>
          </div>

          {allLots.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {allLots.map((lot) => (
                <LotCard key={lot.id} lot={lot} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-gray-500">
              <Building2 size={40} className="mx-auto mb-3 text-gray-300" />
              <p>Aucun lot disponible pour le moment. Contactez-nous pour être informé.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── Présentation bâtiment ── */}
      <section className="py-16 sm:py-20 bg-gray-50" aria-labelledby="section-batiment">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#C9A84C] text-sm font-semibold uppercase tracking-widest mb-3">
                Le bâtiment
              </p>
              <h2 id="section-batiment" className="text-2xl sm:text-3xl font-bold text-[#0F2D52] mb-5">
                Un immeuble pensé pour les entreprises d'aujourd'hui
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                {building.description}
              </p>
              <ul className="space-y-3 mb-8">
                {building.amenities.slice(0, 5).map((a) => (
                  <li key={a} className="flex items-start gap-2.5 text-gray-700 text-sm">
                    <CheckCircle2 size={17} className="text-[#C9A84C] shrink-0 mt-0.5" />
                    {a}
                  </li>
                ))}
              </ul>
              <Link
                to="/le-batiment"
                className="inline-flex items-center gap-2 text-[#0F2D52] font-semibold text-sm hover:text-[#C9A84C] transition-colors"
              >
                Découvrir le bâtiment
                <ArrowRight size={15} />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl overflow-hidden aspect-[4/5]">
                <img
                  src={buildingTerraceImg}
                  alt="Terrasse et espaces extérieurs végétalisés du bâtiment Galilée, Lormont"
                  className="w-full h-full object-cover"
                  width={1184}
                  height={864}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="rounded-xl overflow-hidden aspect-[4/5] mt-8">
                <img
                  src={buildingRedImg}
                  alt="Entrée principale du bâtiment Galilée, Lormont (33310)"
                  className="w-full h-full object-cover"
                  width={1184}
                  height={864}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Accessibilité ── */}
      <section className="py-16 sm:py-20 bg-white" aria-labelledby="section-access">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#C9A84C] text-sm font-semibold uppercase tracking-widest mb-2">
              Localisation
            </p>
            <h2 id="section-access" className="text-2xl sm:text-3xl font-bold text-[#0F2D52]">
              Idéalement situé dans la métropole bordelaise
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              Bâtiment Galilée – {building.address.full}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Train, label: "Tram B", value: building.access.tram },
              { icon: Car, label: "Rocade", value: building.access.car },
              { icon: MapPin, label: "Bordeaux centre", value: building.access.bordeaux },
              { icon: Shield, label: "Parking", value: `${building.parking.total} places dont bornes de recharge` },
            ].map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="bg-gray-50 rounded-xl p-6 border border-gray-100"
              >
                <div className="w-10 h-10 bg-[#0F2D52]/8 rounded-lg flex items-center justify-center mb-4">
                  <Icon size={20} className="text-[#0F2D52]" />
                </div>
                <p className="font-semibold text-[#0F2D52] text-sm mb-1">{label}</p>
                <p className="text-gray-500 text-sm">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Atouts ── */}
      <section className="py-16 sm:py-20 bg-[#0F2D52]" aria-labelledby="section-atouts">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#C9A84C] text-sm font-semibold uppercase tracking-widest mb-3">
                Pourquoi choisir Galilée ?
              </p>
              <h2 id="section-atouts" className="text-3xl sm:text-4xl font-bold text-white mb-5">
                Des espaces de travail pensés pour votre performance
              </h2>
              <p className="text-white/75 leading-relaxed mb-8">
                Le bâtiment Galilée est certifié {building.certification}. Chaque espace bénéficie
                d'équipements modernes et d'une gestion optimisée pour réduire vos charges.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Zap, label: "Fibre très haut débit" },
                  { icon: Shield, label: "Sécurité 24h/24" },
                  { icon: Leaf, label: "Terrasse et espaces verts" },
                  { icon: Maximize2, label: "Espaces modulables" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-3 bg-white/8 rounded-lg px-4 py-3">
                    <Icon size={16} className="text-[#C9A84C] shrink-0" />
                    <span className="text-white/90 text-sm font-medium">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/8 rounded-2xl p-8 border border-white/15">
              <h3 className="text-xl font-bold text-white mb-6">Intéressé par un espace ?</h3>
              <p className="text-white/75 text-sm leading-relaxed mb-6">
                Contactez notre équipe pour organiser une visite ou obtenir plus d'informations sur les lots disponibles.
              </p>
              <div className="space-y-3">
                <Link
                  to="/contact"
                  className="flex items-center justify-center gap-2 w-full bg-[#C9A84C] hover:bg-[#b8963e] text-white font-semibold px-6 py-3 rounded-md text-sm transition-colors"
                >
                  Demander une visite
                  <ArrowRight size={15} />
                </Link>
                <Link
                  to="/nos-lots"
                  className="flex items-center justify-center gap-2 w-full bg-white/10 hover:bg-white/20 text-white border border-white/30 font-semibold px-6 py-3 rounded-md text-sm transition-colors"
                >
                  Consulter les lots
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <FAQ />
    </>
  );
}