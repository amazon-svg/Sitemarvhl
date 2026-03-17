import { Link } from "react-router";
import { ArrowLeft, Building2 } from "lucide-react";
import { SEO } from "../components/SEO";

export function NotFound() {
  return (
    <>
      <SEO
        title="Page introuvable – 404 | MARVHL"
        description="La page que vous recherchez n'existe pas."
        noindex
      />
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Building2 size={28} className="text-gray-400" />
          </div>
          <h1 className="text-6xl font-bold text-[#0F2D52] mb-3">404</h1>
          <p className="text-xl font-semibold text-gray-800 mb-3">Page introuvable</p>
          <p className="text-gray-500 text-sm mb-8 leading-relaxed">
            La page que vous recherchez n'existe pas ou a été déplacée.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 bg-[#0F2D52] hover:bg-[#1a4a80] text-white font-semibold px-6 py-3 rounded-md text-sm transition-colors"
            >
              <ArrowLeft size={15} />
              Retour à l'accueil
            </Link>
            <Link
              to="/nos-lots"
              className="inline-flex items-center justify-center gap-2 border border-[#0F2D52] text-[#0F2D52] hover:bg-[#0F2D52] hover:text-white font-semibold px-6 py-3 rounded-md text-sm transition-colors"
            >
              Voir nos lots
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
