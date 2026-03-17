import { useState } from "react";
import { Link } from "react-router";
import { SlidersHorizontal, Building2, ArrowRight } from "lucide-react";
import { SEO } from "../components/SEO";
import { Breadcrumb } from "../components/Breadcrumb";
import { LotCard } from "../components/LotCard";
import { lots } from "../data/lots";
import type { LotType, LotStatus } from "../data/lots";

const lotsJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Lots à louer – Bâtiment Galilée, Lormont",
  description: "Liste des bureaux et espaces disponibles à la location au 12 rue Cantelaudette, 33310 Lormont",
  url: "https://www.marvhl.fr/nos-lots",
  numberOfItems: lots.length,
};

const TYPE_OPTIONS: { value: LotType | "all"; label: string }[] = [
  { value: "all", label: "Tous les types" },
  { value: "bureau", label: "Bureaux privatifs" },
  { value: "open-space", label: "Open Spaces" },
  { value: "suite", label: "Suites premium" },
];

const STATUS_OPTIONS: { value: LotStatus | "all"; label: string }[] = [
  { value: "all", label: "Tous les statuts" },
  { value: "disponible", label: "Disponible" },
  { value: "réservé", label: "Réservé" },
  { value: "loué", label: "Loué" },
];

export function Lots() {
  const [typeFilter, setTypeFilter] = useState<LotType | "all">("all");
  const [statusFilter, setStatusFilter] = useState<LotStatus | "all">("disponible");

  const filtered = lots.filter((lot) => {
    const matchType = typeFilter === "all" || lot.type === typeFilter;
    const matchStatus = statusFilter === "all" || lot.status === statusFilter;
    return matchType && matchStatus;
  });

  const disponibleCount = lots.filter((l) => l.status === "disponible").length;

  return (
    <>
      <SEO
        title="Nos lots à louer – Bureaux & Open Spaces à Lormont (33310) | MARVHL Galilée"
        description={`Découvrez nos ${lots.length} lots disponibles à la location dans le bâtiment Galilée à Lormont. Bureaux privatifs, open spaces et suites prestige. ${disponibleCount} lots disponibles.`}
        canonical="/nos-lots"
        jsonLd={lotsJsonLd}
      />

      {/* ── Header ── */}
      <div className="bg-[#0F2D52] pt-8 pb-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Nos lots" }]} />
          <div className="mt-5 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mt-2">
                Nos lots à la location
              </h1>
              <p className="text-white/70 mt-2">
                Bâtiment Galilée – 12 rue Cantelaudette, Lormont
              </p>
            </div>
            <div className="flex items-center gap-2 bg-white/10 text-white text-sm px-4 py-2 rounded-full border border-white/20 shrink-0">
              <Building2 size={15} />
              <span>
                <strong>{disponibleCount}</strong> lot{disponibleCount > 1 ? "s" : ""} disponible{disponibleCount > 1 ? "s" : ""}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Filtres ── */}
      <div className="sticky top-16 lg:top-20 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 text-gray-500 text-sm font-medium shrink-0">
              <SlidersHorizontal size={15} />
              Filtrer :
            </div>

            {/* Type */}
            <div className="flex flex-wrap gap-2">
              {TYPE_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setTypeFilter(opt.value)}
                  className={`text-sm font-medium px-3.5 py-1.5 rounded-full border transition-colors ${
                    typeFilter === opt.value
                      ? "bg-[#0F2D52] text-white border-[#0F2D52]"
                      : "bg-white text-gray-600 border-gray-200 hover:border-[#0F2D52] hover:text-[#0F2D52]"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            <div className="w-px h-5 bg-gray-200 hidden sm:block" />

            {/* Statut */}
            <div className="flex flex-wrap gap-2">
              {STATUS_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setStatusFilter(opt.value)}
                  className={`text-sm font-medium px-3.5 py-1.5 rounded-full border transition-colors ${
                    statusFilter === opt.value
                      ? "bg-[#C9A84C] text-white border-[#C9A84C]"
                      : "bg-white text-gray-600 border-gray-200 hover:border-[#C9A84C] hover:text-[#C9A84C]"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Grid ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filtered.length > 0 ? (
          <>
            <p className="text-sm text-gray-500 mb-6">
              {filtered.length} lot{filtered.length > 1 ? "s" : ""} affiché{filtered.length > 1 ? "s" : ""}
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((lot) => (
                <LotCard key={lot.id} lot={lot} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <Building2 size={44} className="mx-auto mb-4 text-gray-200" />
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Aucun lot trouvé
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              Aucun lot ne correspond aux filtres sélectionnés.
            </p>
            <button
              onClick={() => { setTypeFilter("all"); setStatusFilter("all"); }}
              className="inline-flex items-center gap-2 text-[#0F2D52] font-semibold text-sm hover:text-[#C9A84C] transition-colors"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </div>

      {/* ── CTA contact ── */}
      <div className="border-t border-gray-100 bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl font-bold text-[#0F2D52] mb-3">
            Vous ne trouvez pas ce que vous cherchez ?
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Décrivez-nous vos besoins, nous trouverons la solution adaptée à votre activité.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-[#0F2D52] hover:bg-[#1a4a80] text-white font-semibold px-7 py-3 rounded-md text-sm transition-colors"
          >
            Nous contacter
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </>
  );
}
