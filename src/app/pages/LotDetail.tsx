import { useState } from "react";
import { useParams, Link, Navigate } from "react-router";
import {
  Maximize2,
  Users,
  MapPin,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Phone,
  Mail,
  ChevronLeft,
  ChevronRight,
  Building2,
  CalendarCheck,
  BadgeCheck,
  Gift,
  Train,
} from "lucide-react";
import { SEO } from "../components/SEO";
import { Breadcrumb } from "../components/Breadcrumb";
import { ContactForm } from "../components/ContactForm";
import { getLotBySlug, lots } from "../data/lots";
import { building } from "../data/building";

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

const typeLabel: Record<string, string> = {
  bureau: "Bureau privatif",
  "open-space": "Open Space",
  suite: "Suite premium",
};

export function LotDetail() {
  const { slug } = useParams<{ slug: string }>();
  const lot = getLotBySlug(slug ?? "");
  const [currentImg, setCurrentImg] = useState(0);

  if (!lot) return <Navigate to="/nos-lots" replace />;

  const status = statusConfig[lot.status];
  const isAvailable = lot.status === "disponible";
  const otherLots = lots.filter((l) => l.id !== lot.id && l.status === "disponible").slice(0, 3);

  const lotJsonLd = {
    "@context": "https://schema.org",
    "@type": "Accommodation",
    name: lot.name,
    description: lot.longDescription,
    url: `https://www.marvhl.fr/lot/${lot.slug}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: building.address.street,
      addressLocality: building.address.city,
      postalCode: building.address.postalCode,
      addressCountry: "FR",
    },
    floorSize: {
      "@type": "QuantitativeValue",
      value: lot.surface,
      unitCode: "MTK",
    },
    image: lot.images[0],
    ...(isAvailable && {
      offers: {
        "@type": "Offer",
        price: lot.price,
        priceCurrency: "EUR",
        availability: "https://schema.org/InStock",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: lot.price,
          priceCurrency: "EUR",
          referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MON" },
        },
      },
    }),
  };

  return (
    <>
      <SEO
        title={lot.metaTitle}
        description={lot.metaDescription}
        canonical={`/lot/${lot.slug}`}
        ogImage={lot.images[0]}
        jsonLd={lotJsonLd}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <Breadcrumb
          items={[
            { label: "Nos lots", href: "/nos-lots" },
            { label: lot.name },
          ]}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid lg:grid-cols-3 gap-10 mt-4">
          {/* ── Colonne principale ── */}
          <div className="lg:col-span-2 space-y-10">
            {/* Galerie */}
            <div className="rounded-2xl overflow-hidden relative group">
              <div className="aspect-video bg-gray-100">
                <img
                  src={lot.images[currentImg]}
                  alt={`${lot.name} – ${typeLabel[lot.type]} de ${lot.surface} m² au bâtiment Galilée, Lormont – Vue ${currentImg + 1}/${lot.images.length}`}
                  className="w-full h-full object-cover"
                  width={1184}
                  height={864}
                  loading="eager"
                  fetchpriority="high"
                  decoding="async"
                />
              </div>

              {lot.images.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImg((p) => (p - 1 + lot.images.length) % lot.images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center shadow hover:bg-white transition-colors"
                    aria-label="Image précédente"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={() => setCurrentImg((p) => (p + 1) % lot.images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center shadow hover:bg-white transition-colors"
                    aria-label="Image suivante"
                  >
                    <ChevronRight size={18} />
                  </button>

                  {/* Thumbnails */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {lot.images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentImg(i)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          i === currentImg ? "bg-white" : "bg-white/50"
                        }`}
                        aria-label={`Aller à l'image ${i + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${status.className}`}>
                  {status.label}
                </span>
              </div>
              <div className="absolute top-4 right-4">
                <span className="bg-white/90 backdrop-blur-sm text-[#0F2D52] text-xs font-semibold px-2.5 py-1 rounded-full">
                  {typeLabel[lot.type]}
                </span>
              </div>
            </div>

            {/* Thumbnail strip */}
            {lot.images.length > 1 && (
              <div className="flex gap-3 -mt-6">
                {lot.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImg(i)}
                    className={`w-20 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                      i === currentImg ? "border-[#C9A84C]" : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Aperçu ${i + 1} – ${lot.name}`}
                      className="w-full h-full object-cover"
                      width={80}
                      height={64}
                      loading="lazy"
                      decoding="async"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Description */}
            <div>
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-400 font-mono mb-1">{lot.ref}</p>
                  <h1 className="text-2xl sm:text-3xl font-bold text-[#0F2D52]">{lot.name}</h1>
                </div>
                {isAvailable && (
                  <div className="text-right shrink-0">
                    <p className="text-2xl font-bold text-[#0F2D52]">
                      {lot.price.toLocaleString("fr-FR")} €
                    </p>
                    <p className="text-xs text-gray-400">{lot.priceUnit}</p>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <Maximize2 size={16} className="text-[#C9A84C]" />
                  <span className="font-semibold">{lot.surface} m²</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <Users size={16} className="text-[#C9A84C]" />
                  <span>{lot.capacity.min}{lot.capacity.max} postes de travail</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <MapPin size={16} className="text-[#C9A84C]" />
                  <span>{lot.floorLabel}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <Building2 size={16} className="text-[#C9A84C]" />
                  <span>Bâtiment Galilée, Lormont</span>
                </div>
              </div>

              <h2 className="text-lg font-bold text-[#0F2D52] mb-3">Description</h2>
              <p className="text-gray-600 leading-relaxed">{lot.longDescription}</p>
            </div>

            {/* Équipements inclus */}
            <div>
              <h2 className="text-lg font-bold text-[#0F2D52] mb-4">Caractéristiques</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {lot.features.map((f) => (
                  <div key={f} className="flex items-center gap-2.5 bg-gray-50 rounded-lg px-4 py-3 border border-gray-100">
                    <CheckCircle2 size={16} className="text-[#C9A84C] shrink-0" />
                    <span className="text-sm text-gray-700">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Inclus dans le loyer */}
            {lot.included && lot.included.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Gift size={18} className="text-[#C9A84C]" />
                  <h2 className="text-lg font-bold text-[#0F2D52]">Inclus dans le loyer</h2>
                </div>
                <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {lot.included.map((item) => (
                      <div key={item} className="flex items-center gap-2 text-sm text-emerald-800">
                        <CheckCircle2 size={15} className="text-emerald-500 shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ZFU + Sans engagement banners */}
            {(lot.zfu || lot.noEngagement) && (
              <div className="grid sm:grid-cols-2 gap-4">
                {lot.zfu && (
                  <div className="bg-[#0F2D52] rounded-xl p-5 flex items-start gap-3">
                    <BadgeCheck size={22} className="text-[#C9A84C] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-white text-sm mb-1">Zone Franche Urbaine (ZFU)</p>
                      <p className="text-white/70 text-xs leading-relaxed">
                        Ce bien est situé en ZFU. Des exonérations fiscales significatives sont possibles pour les entreprises éligibles.
                      </p>
                    </div>
                  </div>
                )}
                {lot.noEngagement && (
                  <div className="bg-emerald-600 rounded-xl p-5 flex items-start gap-3">
                    <CheckCircle2 size={22} className="text-white shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-white text-sm mb-1">Sans engagement</p>
                      <p className="text-white/80 text-xs leading-relaxed">
                        Aucun frais d'entrée. Aucun engagement de durée minimale. Vous démarrez quand vous voulez.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Infos bâtiment */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <h2 className="font-bold text-[#0F2D52] mb-4">Informations sur le bâtiment</h2>
              <dl className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { label: "Adresse", value: building.address.full },
                  { label: "Certification", value: building.certification },
                  { label: "Parking", value: `${building.parking.total} places` },
                  { label: "Accès transport", value: lot.transport ?? building.access.tram.split("–")[1]?.trim() ?? building.access.tram },
                  { label: "Fibre", value: "Disponible" },
                  { label: "PMR", value: "Accessible" },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <dt className="text-xs text-gray-400 uppercase tracking-wide mb-1">{label}</dt>
                    <dd className="text-sm font-medium text-[#0F2D52]">{value}</dd>
                  </div>
                ))}
              </dl>
              {lot.transport && (
                <div className="mt-4 pt-4 border-t border-gray-200 flex items-center gap-2 text-sm text-gray-600">
                  <Train size={15} className="text-[#C9A84C] shrink-0" />
                  <span>{lot.transport}</span>
                </div>
              )}
            </div>
          </div>

          {/* ── Sidebar ── */}
          <div className="space-y-6">
            {/* Prix + CTA */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 sticky top-24">
              {isAvailable ? (
                <>
                  <p className="text-3xl font-bold text-[#0F2D52] mb-1">
                    {lot.price.toLocaleString("fr-FR")} €
                  </p>
                  <p className="text-sm text-gray-400 mb-5">{lot.priceUnit}</p>

                  {/* Détail des charges si présentes */}
                  {lot.charges && lot.charges.length > 0 && (
                    <div className="mb-5 bg-gray-50 rounded-lg p-3 space-y-1.5 border border-gray-100">
                      {lot.charges.map(({ label, value }) => (
                        <div key={label} className="flex justify-between items-start gap-2 text-xs text-gray-600">
                          <span className="leading-tight">{label}</span>
                          <span className="font-semibold text-[#0F2D52] whitespace-nowrap shrink-0">{value}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="space-y-3 mb-6">
                    {[
                      { icon: Maximize2, value: `${lot.surface} m²` },
                      { icon: Users, value: `${lot.capacity.min}–${lot.capacity.max} postes` },
                      { icon: MapPin, value: lot.floorLabel },
                    ].map(({ icon: Icon, value }) => (
                      <div key={value} className="flex items-center gap-2 text-sm text-gray-600">
                        <Icon size={15} className="text-[#C9A84C] shrink-0" />
                        {value}
                      </div>
                    ))}
                    {lot.noEngagement && (
                      <div className="flex items-center gap-2 text-sm text-emerald-600 font-medium">
                        <CheckCircle2 size={15} className="shrink-0" />
                        Sans engagement
                      </div>
                    )}
                    {lot.zfu && (
                      <div className="flex items-center gap-2 text-sm text-[#C9A84C] font-medium">
                        <BadgeCheck size={15} className="shrink-0" />
                        Zone Franche Urbaine
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <a
                      href="#contact-form"
                      className="flex items-center justify-center gap-2 w-full bg-[#C9A84C] hover:bg-[#b8963e] text-white font-semibold px-6 py-3 rounded-md text-sm transition-colors"
                    >
                      <CalendarCheck size={16} />
                      Demander une visite
                    </a>
                    <a
                      href={`tel:${building.phone.replace(/\s/g, "")}`}
                      className="flex items-center justify-center gap-2 w-full bg-[#0F2D52] hover:bg-[#1a4a80] text-white font-semibold px-6 py-3 rounded-md text-sm transition-colors"
                    >
                      <Phone size={15} />
                      {building.phone}
                    </a>
                    <a
                      href={`mailto:${building.email}?subject=Demande d'info – ${lot.name}&body=Bonjour, je suis intéressé par le lot ${lot.name} (${lot.ref}).`}
                      className="flex items-center justify-center gap-2 w-full border border-[#0F2D52] text-[#0F2D52] hover:bg-[#0F2D52] hover:text-white font-semibold px-6 py-3 rounded-md text-sm transition-colors"
                    >
                      <Mail size={15} />
                      Envoyer un e-mail
                    </a>
                  </div>
                </>
              ) : (
                <div className="text-center py-4">
                  <span className={`inline-block text-sm font-semibold px-3 py-1.5 rounded-full mb-4 ${status.className}`}>
                    {status.label}
                  </span>
                  <p className="text-gray-600 text-sm mb-5">
                    Ce lot n'est pas disponible à la location. Contactez-nous pour être informé dès qu'il se libère.
                  </p>
                  <Link
                    to="/nos-lots"
                    className="flex items-center justify-center gap-2 w-full bg-[#0F2D52] hover:bg-[#1a4a80] text-white font-semibold px-6 py-3 rounded-md text-sm transition-colors"
                  >
                    Voir les lots disponibles
                    <ArrowRight size={14} />
                  </Link>
                </div>
              )}
            </div>

            {/* Autres lots */}
            {otherLots.length > 0 && (
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <h3 className="font-bold text-[#0F2D52] text-sm mb-4">Autres lots disponibles</h3>
                <div className="space-y-3">
                  {otherLots.map((l) => (
                    <Link
                      key={l.id}
                      to={`/lot/${l.slug}`}
                      className="flex items-center gap-3 hover:bg-white rounded-lg p-2 transition-colors group"
                    >
                      <img
                        src={l.images[0]}
                        alt={`Aperçu – ${l.name}`}
                        className="w-14 h-12 object-cover rounded-md shrink-0"
                        width={56}
                        height={48}
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-[#0F2D52] truncate group-hover:text-[#C9A84C] transition-colors">
                          {l.name}
                        </p>
                        <p className="text-xs text-gray-400">
                          {l.surface} m² · {l.price.toLocaleString("fr-FR")} €/mois
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link
                  to="/nos-lots"
                  className="inline-flex items-center gap-1.5 text-xs text-[#0F2D52] font-semibold hover:text-[#C9A84C] transition-colors mt-4"
                >
                  Voir tous les lots
                  <ArrowRight size={12} />
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* ── Formulaire de contact intégré ── */}
        <div id="contact-form" className="mt-16 scroll-mt-24">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold text-[#0F2D52] mb-2">
              Intéressé par ce lot ?
            </h2>
            <p className="text-gray-500 text-sm mb-8">
              Remplissez le formulaire ci-dessous et notre équipe vous contactera dans les plus brefs délais.
            </p>
            <ContactForm defaultLot={lot.name} defaultRef={lot.ref} />
          </div>
        </div>

        {/* ── Navigation ── */}
        <div className="mt-12 pt-8 border-t border-gray-100">
          <Link
            to="/nos-lots"
            className="inline-flex items-center gap-2 text-[#0F2D52] font-semibold text-sm hover:text-[#C9A84C] transition-colors"
          >
            <ArrowLeft size={15} />
            Retour à la liste des lots
          </Link>
        </div>
      </div>
    </>
  );
}