import { Link } from "react-router";
import { ArrowRight, Users, Maximize2, MapPin } from "lucide-react";
import type { Lot } from "../data/lots";

interface LotCardProps {
  lot: Lot;
}

const statusConfig = {
  disponible: {
    label: "Disponible",
    className: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  },
  loué: {
    label: "Loué",
    className: "bg-red-50 text-red-700 border border-red-200",
  },
  réservé: {
    label: "Réservé",
    className: "bg-amber-50 text-amber-700 border border-amber-200",
  },
};

const typeLabel = {
  bureau: "Bureau privatif",
  "open-space": "Open Space",
  suite: "Suite premium",
};

export function LotCard({ lot }: LotCardProps) {
  const status = statusConfig[lot.status];
  const isAvailable = lot.status === "disponible";

  return (
    <article
      className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group"
      aria-label={`${lot.name} – ${lot.surface} m² – ${lot.floorLabel}`}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={lot.images[0]}
          alt={`${lot.name} – ${typeLabel[lot.type]} de ${lot.surface} m² au bâtiment Galilée, Lormont`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          width={600}
          height={400}
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${status.className}`}>
            {status.label}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="bg-white/90 backdrop-blur-sm text-[#0F2D52] text-xs font-semibold px-2.5 py-1 rounded-full">
            {typeLabel[lot.type]}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Ref + Floor */}
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs text-gray-400 font-mono">{lot.ref}</p>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <MapPin size={11} />
            <span>{lot.floorLabel}</span>
          </div>
        </div>

        {/* Name */}
        <h3 className="text-lg font-bold text-[#0F2D52] mb-2 group-hover:text-[#1a4a80] transition-colors">
          {lot.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">
          {lot.description}
        </p>

        {/* Stats */}
        <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-1.5 text-sm text-gray-600">
            <Maximize2 size={15} className="text-[#C9A84C]" />
            <span className="font-semibold">{lot.surface} m²</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-gray-600">
            <Users size={15} className="text-[#C9A84C]" />
            <span>
              {lot.capacity.min}–{lot.capacity.max} postes
            </span>
          </div>
        </div>

        {/* No engagement tag */}
        {lot.noEngagement && isAvailable && (
          <p className="text-xs text-emerald-600 font-medium mb-3">
            ✓ Sans engagement ni frais d'entrée
          </p>
        )}

        {/* Price + CTA */}
        <div className="flex items-center justify-between">
          <div>
            {isAvailable ? (
              <>
                <p className="text-xl font-bold text-[#0F2D52]">
                  {lot.price.toLocaleString("fr-FR")} €
                </p>
                <p className="text-xs text-gray-400">{lot.priceUnit}</p>
              </>
            ) : (
              <p className="text-sm font-medium text-gray-400 italic">Non disponible</p>
            )}
          </div>
          <Link
            to={`/lot/${lot.slug}`}
            className={`flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-md transition-colors ${
              isAvailable
                ? "bg-[#0F2D52] hover:bg-[#1a4a80] text-white"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
            }`}
            aria-label={`Voir le détail du ${lot.name}`}
          >
            Voir le lot
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </article>
  );
}