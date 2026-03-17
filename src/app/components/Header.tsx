import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router";
import { Menu, X, Phone } from "lucide-react";
import { building } from "../data/building";
import logoImg from "figma:asset/020393562d2638c44029c529b172f40a7804d8c0.png";

const navLinks = [
  { to: "/", label: "Accueil" },
  { to: "/le-batiment", label: "Le bâtiment" },
  { to: "/nos-lots", label: "Nos lots" },
  { to: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-md"
          : "bg-white/95 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group"
            aria-label="MARVHL – Retour à l'accueil"
          >
            <img
              src={logoImg}
              alt="Logo MARVHL"
              className="h-16 lg:h-20 w-auto object-contain"
            />
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Navigation principale" className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? "text-[#0F2D52] bg-[#0F2D52]/8"
                      : "text-gray-600 hover:text-[#0F2D52] hover:bg-gray-50"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* CTA Desktop */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={`tel:${building.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#0F2D52] transition-colors"
            >
              <Phone size={14} />
              <span className="font-medium">{building.phone}</span>
            </a>
            <Link
              to="/contact"
              className="bg-[#C9A84C] hover:bg-[#b8963e] text-white text-sm font-semibold px-5 py-2.5 rounded-md transition-colors"
            >
              Prendre contact
            </Link>
          </div>

          {/* Mobile burger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-[#0F2D52] hover:bg-gray-100 transition-colors"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <nav
            aria-label="Navigation mobile"
            className="flex flex-col px-4 py-3 gap-1"
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? "text-[#0F2D52] bg-[#0F2D52]/8"
                      : "text-gray-600 hover:text-[#0F2D52] hover:bg-gray-50"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <div className="pt-2 border-t border-gray-100 mt-2">
              <a
                href={`tel:${building.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-2 px-4 py-3 text-sm text-gray-600"
              >
                <Phone size={14} />
                <span>{building.phone}</span>
              </a>
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="block w-full text-center bg-[#C9A84C] hover:bg-[#b8963e] text-white text-sm font-semibold px-5 py-3 rounded-md transition-colors mt-2"
              >
                Prendre contact
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}