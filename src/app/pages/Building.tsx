import { Link } from "react-router";
import {
  CheckCircle2,
  Car,
  Train,
  Zap,
  ArrowRight,
  Building2,
} from "lucide-react";
import { SEO } from "../components/SEO";
import { Breadcrumb } from "../components/Breadcrumb";
import { building } from "../data/building";
import buildingFrontImg from "figma:asset/3d1117e52e415d2627416b07df0c0c4c39eb0674.webp";
import buildingTerraceImg from "figma:asset/f5d1a5760fa4243945e5fe33696439688970d9fa.webp";
import buildingRedImg from "figma:asset/50327e10fa0874324564e7038562eb8b30b891cb.webp";
import corridorColorImg from "figma:asset/341656b9c6aa184dbced406a1209b30a5e192864.webp";
import corridorVerriereImg from "figma:asset/00653325b90db29195225f975ef73fd63cbbee22.webp";
import exteriorPalmImg from "figma:asset/cb0719e0d5cac33f423d31a2d2f7468ce49e20c5.webp";

const buildingJsonLd = {
  "@context": "https://schema.org",
  "@type": "OfficeBuilding",
  name: `Bâtiment ${building.name}`,
  description: building.description,
  address: {
    "@type": "PostalAddress",
    streetAddress: building.address.street,
    addressLocality: building.address.city,
    postalCode: building.address.postalCode,
    addressCountry: "FR",
  },
  url: "https://www.marvhl.fr/le-batiment",
  floorSize: {
    "@type": "QuantitativeValue",
    value: building.totalSurface,
    unitCode: "MTK",
  },
  numberOfFloors: building.floors,
};

export function Building() {
  return (
    <>
      <SEO
        title={`Bâtiment ${building.name} à Lormont – Immeuble de bureaux moderne | MARVHL`}
        description={`Découvrez le bâtiment Galilée, ${building.totalSurface.toLocaleString("fr-FR")} m² de bureaux certifiés BBC au cœur de la métropole bordelaise, 12 rue Cantelaudette, Lormont (33310).`}
        canonical="/le-batiment"
        ogImage={buildingFrontImg}
        jsonLd={buildingJsonLd}
      />

      {/* ── Hero ── */}
      <div className="relative h-[55vh] min-h-[380px]">
        <img
          src={buildingFrontImg}
          alt="Bâtiment Galilée – 12 rue Cantelaudette, Lormont"
          className="w-full h-full object-cover"
          fetchpriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F2D52]/80 via-[#0F2D52]/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
          <Breadcrumb items={[{ label: "Le bâtiment" }]} />
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-4">
            Bâtiment <span className="text-[#C9A84C]">{building.name}</span>
          </h1>
          <p className="text-white/80 mt-2 text-lg">{building.address.full}</p>
        </div>
      </div>

      {/* ── Présentation générale ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0F2D52] mb-5">
                Un espace de travail d'exception
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                {building.description}
              </p>
              <p className="text-gray-600 leading-relaxed">
                Conçu pour répondre aux exigences des entreprises contemporaines, le bâtiment Galilée
                offre une flexibilité totale dans l'organisation des espaces, une infrastructure
                technique de premier plan et une accessibilité optimale depuis Bordeaux et la rocade.
              </p>
            </div>

            {/* Fiche technique */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 h-fit">
              <h3 className="font-bold text-[#0F2D52] mb-5 flex items-center gap-2">
                <Building2 size={18} className="text-[#C9A84C]" />
                Fiche technique
              </h3>
              <dl className="space-y-3">
                {[
                  { label: "Surface totale", value: `${building.totalSurface.toLocaleString("fr-FR")} m²` },
                  { label: "Niveaux", value: `${building.floors} étages` },
                  { label: "Année de construction", value: building.yearBuilt },
                  { label: "Certification", value: building.certification },
                  { label: "Parking", value: `${building.parking.total} places` },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between text-sm gap-4">
                    <dt className="text-gray-500">{label}</dt>
                    <dd className="font-semibold text-[#0F2D52] text-right">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* ── Galerie photos ── */}
      <section className="py-16 bg-gray-50" aria-labelledby="section-galerie">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="section-galerie" className="text-2xl sm:text-3xl font-bold text-[#0F2D52] mb-8 text-center">
            Découvrir le bâtiment
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {/* Grande image en vedette */}
            <div className="col-span-2 lg:col-span-1 row-span-2 rounded-xl overflow-hidden" style={{minHeight: '300px'}}>
              <img
                src={buildingFrontImg}
                alt="Entrée principale du bâtiment Galilée, Lormont"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
            <div className="rounded-xl overflow-hidden aspect-[4/3]">
              <img
                src={buildingTerraceImg}
                alt="Terrasse et espaces verts du bâtiment Galilée"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
            <div className="rounded-xl overflow-hidden aspect-[4/3]">
              <img
                src={buildingRedImg}
                alt="Façade extérieure du bâtiment Galilée"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
            <div className="rounded-xl overflow-hidden aspect-[4/3]">
              <img
                src={corridorColorImg}
                alt="Couloir lumineux avec verrière zénithale et espaces de détente, bâtiment Galilée"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
            <div className="rounded-xl overflow-hidden aspect-[4/3]">
              <img
                src={corridorVerriereImg}
                alt="Verrière et couloir intérieur du bâtiment Galilée"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
            <div className="rounded-xl overflow-hidden aspect-[4/3]">
              <img
                src={exteriorPalmImg}
                alt="Environnement végétalisé et espaces verts autour du bâtiment Galilée"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Équipements & services ── */}
      <section className="py-16 bg-white" aria-labelledby="section-equipements">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-[#C9A84C] text-sm font-semibold uppercase tracking-widest mb-2">
              Équipements & services
            </p>
            <h2 id="section-equipements" className="text-2xl sm:text-3xl font-bold text-[#0F2D52]">
              Tout ce qu'il faut pour travailler efficacement
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {building.amenities.map((a) => (
              <div
                key={a}
                className="flex items-start gap-3 bg-gray-50 rounded-lg px-4 py-3.5 border border-gray-100"
              >
                <CheckCircle2 size={17} className="text-[#C9A84C] shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700 font-medium">{a}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Accès ── */}
      <section className="py-16 bg-gray-50" aria-labelledby="section-acces">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-[#C9A84C] text-sm font-semibold uppercase tracking-widest mb-2">
                Comment nous rejoindre
              </p>
              <h2 id="section-acces" className="text-2xl sm:text-3xl font-bold text-[#0F2D52] mb-6">
                Un accès facile depuis toute la métropole
              </h2>
              <div className="space-y-5">
                {[
                  { icon: Train, label: "Tramway", value: building.access.tram },
                  { icon: Car, label: "Rocade", value: building.access.car },
                  { icon: Car, label: "Autoroute", value: building.access.highway },
                  { icon: Zap, label: "Depuis Bordeaux", value: building.access.bordeaux },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#0F2D52] rounded-lg flex items-center justify-center shrink-0">
                      <Icon size={18} className="text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#0F2D52] text-sm">{label}</p>
                      <p className="text-gray-500 text-sm mt-0.5">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[#C9A84C] text-sm font-semibold uppercase tracking-widest mb-2">
                Stationnement
              </p>
              <h3 className="text-xl font-bold text-[#0F2D52] mb-5">
                {building.parking.total} places de parking
              </h3>
              <div className="grid grid-cols-1 gap-4 mb-6">
                <div className="bg-white rounded-lg p-4 border border-gray-100">
                  <p className="text-2xl font-bold text-[#0F2D52]">{building.parking.total}</p>
                  <p className="text-gray-500 text-xs mt-1">Places de parking</p>
                </div>
              </div>
              <a
                href={building.address.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#0F2D52] font-semibold text-sm hover:text-[#C9A84C] transition-colors"
              >
                <ArrowRight size={15} />
                Itinéraire sur Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 bg-[#0F2D52]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Vous souhaitez visiter le bâtiment ?
          </h2>
          <p className="text-white/75 mb-8">
            Prenez rendez-vous avec notre équipe pour une visite personnalisée et découvrez
            les espaces disponibles.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/nos-lots"
              className="inline-flex items-center justify-center gap-2 bg-[#C9A84C] hover:bg-[#b8963e] text-white font-semibold px-7 py-3.5 rounded-md text-sm transition-colors"
            >
              Voir les lots disponibles
              <ArrowRight size={15} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/30 font-semibold px-7 py-3.5 rounded-md text-sm transition-colors"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}