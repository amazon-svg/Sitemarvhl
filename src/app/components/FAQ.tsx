import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router";

const FAQ_ITEMS = [
  {
    q: "Quel est le prix d'un bureau au bâtiment Galilée ?",
    a: "Les loyers démarrent à 245 € HT/mois pour un bureau individuel de 20 m² et vont jusqu'à 1 800 € HT/mois pour un open-space de 145 m². Tous les loyers sont tout inclus : électricité, chauffage, climatisation, eau, ménage des parties communes, taxe foncière et domiciliation.",
  },
  {
    q: "Y a-t-il des frais d'agence pour louer un bureau au bâtiment Galilée ?",
    a: "Non. La location se fait en direct avec le propriétaire, sans aucun frais d'agence ni honoraires de commercialisation.",
  },
  {
    q: "Quels services sont inclus dans le loyer ?",
    a: "Le loyer comprend l'électricité, le chauffage et la climatisation, l'eau, le ménage des parties communes, l'entretien des espaces verts, la domiciliation d'entreprise et la taxe foncière. La fibre optique est raccordée (abonnement à la charge du locataire).",
  },
  {
    q: "Comment visiter le bâtiment Galilée ?",
    a: "Les visites se font sur rendez-vous, du lundi au vendredi de 9h à 18h, et le samedi sur rendez-vous. Vous pouvez prendre contact au 07 56 80 64 04 ou par email à contact.marvhl@gmail.com.",
  },
  {
    q: "Le bâtiment Galilée est-il accessible PMR ?",
    a: "Oui. Le rez-de-chaussée est accessible aux personnes à mobilité réduite, y compris l'open-space 95 m² avec son bureau attenant.",
  },
  {
    q: "Y a-t-il un parking ?",
    a: "Oui, 26 places de parking privatives sont disponibles sur site, incluses dans le loyer.",
  },
  {
    q: "Peut-on domicilier son entreprise au bâtiment Galilée ?",
    a: "Oui, la domiciliation d'entreprise est incluse dans le loyer pour tous les locataires du bâtiment Galilée.",
  },
  {
    q: "Quelle est la durée d'engagement minimum ?",
    a: "Le bail proposé est un bail professionnel 3-6-9 selon accord. Le dépôt de garantie est de 3 mois de loyer. La disponibilité est immédiate.",
  },
  {
    q: "Comment se rendre au bâtiment Galilée depuis Bordeaux ?",
    a: "Le bâtiment se trouve à 12 rue Cantelaudette, 33310 Lormont, à 15-20 minutes du centre de Bordeaux par la rocade A630 (sortie 23 Lormont). Le tram ligne A (arrêt Les Lauriers) est à 8 minutes à pied.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
        aria-expanded={open}
      >
        <span className="font-semibold text-[#0F2D52] text-sm sm:text-base group-hover:text-[#C9A84C] transition-colors">
          {q}
        </span>
        <ChevronDown
          size={18}
          className={`text-[#C9A84C] shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <p className="pb-5 text-gray-600 text-sm leading-relaxed">
          {a}
        </p>
      )}
    </div>
  );
}

export function FAQ() {
  return (
    <section className="py-16 sm:py-20 bg-gray-50" aria-labelledby="faq-title">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <p className="text-[#C9A84C] text-sm font-semibold uppercase tracking-widest mb-2">
            Questions fréquentes
          </p>
          <h2 id="faq-title" className="text-2xl sm:text-3xl font-bold text-[#0F2D52]">
            Tout ce que vous voulez savoir
          </h2>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 sm:px-8">
          {FAQ_ITEMS.map((item) => (
            <FAQItem key={item.q} q={item.q} a={item.a} />
          ))}
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Vous avez une autre question ?{" "}
          <Link to="/contact" className="text-[#0F2D52] font-semibold hover:text-[#C9A84C] transition-colors">
            Contactez-nous directement
          </Link>
        </p>
      </div>
    </section>
  );
}
