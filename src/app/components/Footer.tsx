import { Link } from "react-router";
import { MapPin, Phone, Mail, ExternalLink } from "lucide-react";
import { building } from "../data/building";
import logoImg from "figma:asset/020393562d2638c44029c529b172f40a7804d8c0.webp";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0F2D52] text-white" aria-label="Pied de page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-14">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-5">
              <div className="inline-block bg-white rounded-xl p-2">
                <img
                  src={logoImg}
                  alt="Logo MARVHL – Bâtiment Galilée, Lormont"
                  className="h-16 w-auto object-contain"
                  width={1920}
                  height={1152}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-5">
              MARVHL commercialise des espaces de bureaux dans le bâtiment Galilée, situé au cœur de
              la métropole bordelaise à Lormont.
            </p>
            <p className="text-[#C9A84C] text-xs font-medium uppercase tracking-wider">
              {building.certification}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
              Navigation
            </h3>
            <ul className="space-y-2">
              {[
                { to: "/", label: "Accueil" },
                { to: "/le-batiment", label: "Le bâtiment" },
                { to: "/nos-lots", label: "Nos lots" },
                { to: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-300 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Lots rapides */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
              Espaces disponibles
            </h3>
            <ul className="space-y-2">
              {[
                { to: "/lot/bureau-21m2-r1-lormont", label: "Bureau 21 m² – R+1" },
                { to: "/lot/bureau-20m2-r1-lormont", label: "Bureau 20 m² – R+1" },
                { to: "/lot/bureau-22m2-r1-lormont", label: "Bureau 22 m² – R+1" },
                { to: "/lot/open-space-95m2-rdc-lormont", label: "Open Space 95 m² – RDC" },
                { to: "/lot/open-space-145m2-rdc-lormont", label: "Open Space 145 m² – RDC" },
                { to: "/lot/bureaux-60m2-r1-lormont", label: "Bureaux 60 m² – R+1" },
                { to: "/lot/open-space-150m2-r1-lormont", label: "Open Space 150 m² – R+1" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-300 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
              Contact
            </h3>
            <address className="not-italic space-y-3">
              <div className="flex items-start gap-2 text-gray-300 text-sm">
                <MapPin size={16} className="shrink-0 mt-0.5 text-[#C9A84C]" />
                <span>{building.address.full}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300 text-sm">
                <Phone size={16} className="shrink-0 text-[#C9A84C]" />
                <a
                  href={`tel:${building.phone.replace(/\s/g, "")}`}
                  className="hover:text-white transition-colors"
                >
                  {building.phone}
                </a>
              </div>
              <div className="flex items-center gap-2 text-gray-300 text-sm">
                <Mail size={16} className="shrink-0 text-[#C9A84C]" />
                <a
                  href={`mailto:${building.email}`}
                  className="hover:text-white transition-colors"
                >
                  {building.email}
                </a>
              </div>
              <div className="pt-2">
                <a
                  href={building.address.googleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#C9A84C] hover:text-[#e0bf6a] text-sm transition-colors"
                >
                  <ExternalLink size={14} />
                  Voir sur Google Maps
                </a>
              </div>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
          <p>© {currentYear} MARVHL. Tous droits réservés.</p>
          <p>{building.address.city} – {building.address.postalCode}</p>
        </div>
      </div>
    </footer>
  );
}