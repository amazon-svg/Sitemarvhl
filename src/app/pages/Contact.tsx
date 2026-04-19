import { MapPin, Phone, Mail, Clock, Train, Car } from "lucide-react";
import { SEO } from "../components/SEO";
import { Breadcrumb } from "../components/Breadcrumb";
import { ContactForm } from "../components/ContactForm";
import { building } from "../data/building";

const contactJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "MARVHL – Bâtiment Galilée",
    description: building.shortDescription,
    url: "https://www.marvhl.fr",
    telephone: building.phone,
    email: building.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: building.address.street,
      addressLocality: building.address.city,
      postalCode: building.address.postalCode,
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
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact – MARVHL",
    url: "https://www.marvhl.fr/contact",
  },
];

const MAPS_EMBED_URL =
  "https://maps.google.com/maps?q=12+rue+Cantelaudette+33310+Lormont+France&output=embed&hl=fr&z=15";

export function Contact() {
  return (
    <>
      <SEO
        title="Contact – Louer un bureau à Lormont | MARVHL Galilée"
        description="Contactez MARVHL pour louer un bureau ou un espace de travail dans le bâtiment Galilée, 12 rue Cantelaudette, 33310 Lormont. Demande de visite, informations tarifaires."
        canonical="/contact"
        jsonLd={contactJsonLd}
      />

      {/* ── Header ── */}
      <div className="bg-[#0F2D52] pt-8 pb-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Contact" }]} variant="dark" />
          <h1 className="text-3xl sm:text-4xl font-bold text-white mt-5">
            Contactez-nous
          </h1>
          <p className="text-white/70 mt-2 max-w-xl">
            Intéressé par un espace ? Notre équipe est disponible pour répondre à vos questions et organiser une visite.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* ── Formulaire ── */}
          <div className="lg:col-span-3">
            <h2 className="text-xl font-bold text-[#0F2D52] mb-2">
              Envoyez-nous un message
            </h2>
            <p className="text-gray-500 text-sm mb-7">
              Décrivez votre besoin, et notre équipe vous répondra dans les 24h.
            </p>
            <ContactForm />
          </div>

          {/* ── Infos de contact ── */}
          <div className="lg:col-span-2 space-y-8">
            {/* Coordonnées */}
            <div>
              <h2 className="text-xl font-bold text-[#0F2D52] mb-5">Nos coordonnées</h2>
              <address className="not-italic space-y-4">
                {/* Adresse */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-[#0F2D52] rounded-lg flex items-center justify-center shrink-0">
                    <MapPin size={16} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">Adresse</p>
                    <p className="text-sm font-medium text-gray-800">
                      Bâtiment Galilée
                    </p>
                    <p className="text-sm text-gray-600">{building.address.street}</p>
                    <p className="text-sm text-gray-600">
                      {building.address.postalCode} {building.address.city}
                    </p>
                    <a
                      href={building.address.googleMaps}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-xs text-[#C9A84C] hover:underline mt-1"
                    >
                      Voir sur Google Maps →
                    </a>
                  </div>
                </div>

                {/* Téléphone */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-[#0F2D52] rounded-lg flex items-center justify-center shrink-0">
                    <Phone size={16} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">Téléphone</p>
                    <a
                      href={`tel:${building.phone.replace(/\s/g, "")}`}
                      className="text-sm font-medium text-gray-800 hover:text-[#0F2D52] transition-colors"
                    >
                      {building.phone}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-[#0F2D52] rounded-lg flex items-center justify-center shrink-0">
                    <Mail size={16} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">Email</p>
                    <a
                      href={`mailto:${building.email}`}
                      className="text-sm font-medium text-gray-800 hover:text-[#0F2D52] transition-colors"
                    >
                      {building.email}
                    </a>
                  </div>
                </div>

                {/* Horaires */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-[#0F2D52] rounded-lg flex items-center justify-center shrink-0">
                    <Clock size={16} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">Horaires</p>
                    <p className="text-sm font-medium text-gray-800">Lun – Ven</p>
                    <p className="text-sm text-gray-600">9h00 – 18h00</p>
                  </div>
                </div>
              </address>
            </div>

            {/* Accès */}
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
              <h3 className="font-bold text-[#0F2D52] text-sm mb-4">Comment y accéder</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-2.5 text-sm">
                  <Train size={15} className="text-[#C9A84C] shrink-0 mt-0.5" />
                  <span className="text-gray-600">{building.access.tram}</span>
                </div>
                <div className="flex items-start gap-2.5 text-sm">
                  <Car size={15} className="text-[#C9A84C] shrink-0 mt-0.5" />
                  <span className="text-gray-600">{building.access.car}</span>
                </div>
                <div className="flex items-start gap-2.5 text-sm">
                  <Car size={15} className="text-[#C9A84C] shrink-0 mt-0.5" />
                  <span className="text-gray-600">{building.access.bordeaux}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Google Maps ── */}
      <section
        aria-label="Localisation sur Google Maps – Bâtiment Galilée, Lormont"
        className="w-full"
      >
        <div className="bg-gray-100 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <MapPin size={15} className="text-[#C9A84C]" />
              <span>
                Bâtiment Galilée – <strong className="text-gray-700">{building.address.full}</strong>
              </span>
              <a
                href={building.address.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto text-[#0F2D52] font-semibold hover:text-[#C9A84C] transition-colors text-xs"
              >
                Ouvrir dans Google Maps →
              </a>
            </div>
          </div>

          <div className="relative w-full h-[420px] sm:h-[500px]">
            <iframe
              title="Localisation du bâtiment Galilée – 12 rue Cantelaudette, 33310 Lormont"
              src={MAPS_EMBED_URL}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>
        </div>
      </section>
    </>
  );
}
