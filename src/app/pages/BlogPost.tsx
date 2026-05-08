import { useParams, Navigate, Link } from "react-router";
import { ArrowRight, Calendar, Clock, Tag, Building2 } from "lucide-react";
import { SEO } from "../components/SEO";
import { Breadcrumb } from "../components/Breadcrumb";
import { LotCard } from "../components/LotCard";
import { getBlogPostBySlug, getRelatedPosts } from "../data/blogPosts";
import { lots } from "../data/lots";

const RECOMMENDED_LOTS: Record<string, string[]> = {
  "centre-d-appels-a-bordeaux-implantation-2026": ["GAL-OS2", "GAL-OS1"],
  "open-space-a-louer-bordeaux-criteres": ["GAL-OS3", "GAL-OS1", "GAL-OS2"],
  "bureau-tout-inclus-vs-traditionnel-calcul-pme": ["GAL-102", "GAL-101", "GAL-103"],
  "bureau-bordeaux-rive-droite-comparatif-2026": ["GAL-OS2"],
};

const SHOW_BUILDING_LINK = new Set(["bureau-bordeaux-rive-droite-comparatif-2026"]);

const SITE_URL = "https://www.marvhl.fr";

const orgRefJsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "@id": `${SITE_URL}/#organization`,
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function toIsoDateTime(dateStr: string): string {
  return dateStr.includes("T") ? dateStr : `${dateStr}T09:00:00+02:00`;
}

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = getBlogPostBySlug(slug ?? "");

  if (!post) return <Navigate to="/blog" replace />;

  const related = getRelatedPosts(post.slug, 3);
  const { frontmatter, html } = post;

  const recommendedRefs = RECOMMENDED_LOTS[post.slug] ?? [];
  const recommendedLots = recommendedRefs
    .map((ref) => lots.find((l) => l.ref === ref))
    .filter(Boolean) as (typeof lots)[number][];

  const showBuildingLink = SHOW_BUILDING_LINK.has(post.slug);

  const articleImage = (() => {
    const img = recommendedLots[0]?.images[0];
    if (!img) return `${SITE_URL}/og-image.jpg`;
    return img.startsWith("http") ? img : `${SITE_URL}${img}`;
  })();

  const postJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: frontmatter.title,
    description: frontmatter.description,
    datePublished: toIsoDateTime(frontmatter.date),
    dateModified: toIsoDateTime(frontmatter.date),
    author: { "@type": "Organization", name: frontmatter.author, url: SITE_URL },
    publisher: { "@id": `${SITE_URL}/#organization` },
    image: articleImage,
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    keywords: frontmatter.tags.join(", "),
  };

  const postBreadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: frontmatter.title },
    ],
  };

  return (
    <>
      <SEO
        title={`${frontmatter.title} | MARVHL`}
        description={frontmatter.description}
        canonical={`/blog/${post.slug}`}
        ogImage={articleImage}
        ogType="article"
        jsonLd={[postJsonLd, postBreadcrumbJsonLd, orgRefJsonLd]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <Breadcrumb
          items={[
            { label: "Blog", href: "/blog" },
            { label: frontmatter.title },
          ]}
        />
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* ── Meta-infos + titre ── */}
        <header className="mb-8 pt-4">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 bg-[#C9A84C]/15 text-[#0F2D52] text-xs font-semibold px-2.5 py-1 rounded-full">
              <Tag size={11} />
              {frontmatter.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-500">
              <Calendar size={12} />
              {formatDate(frontmatter.date)}
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-500">
              <Clock size={12} />
              {frontmatter.reading_time} min de lecture
            </span>
          </div>
          <p className="text-lg text-gray-600 leading-relaxed">
            {frontmatter.description}
          </p>
        </header>

        {/* ── Corps de l'article ── */}
        <div
          className="prose prose-lg max-w-none
                     prose-headings:text-[#0F2D52] prose-headings:font-bold
                     prose-h1:text-3xl prose-h1:sm:text-4xl prose-h1:mt-0 prose-h1:mb-6
                     prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                     prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                     prose-p:text-gray-700 prose-p:leading-relaxed
                     prose-strong:text-[#0F2D52]
                     prose-a:text-[#0F2D52] prose-a:font-semibold prose-a:no-underline hover:prose-a:text-[#C9A84C]
                     prose-ul:text-gray-700 prose-li:my-1
                     prose-table:text-sm prose-th:bg-gray-50 prose-th:text-[#0F2D52] prose-td:border-gray-200
                     prose-hr:border-gray-200"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {/* ── Tags ── */}
        {frontmatter.tags.length > 0 && (
          <div className="mt-10 pt-6 border-t border-gray-200">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider mr-1">
                Mots-clés :
              </span>
              {frontmatter.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ── CTA vers visite ── */}
        <div className="mt-10 bg-[#0F2D52] rounded-2xl p-8 text-center">
          <Building2 size={32} className="text-[#C9A84C] mx-auto mb-3" />
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
            Visiter le Bâtiment Galilée à Lormont
          </h2>
          <p className="text-white/75 text-sm mb-5 max-w-xl mx-auto">
            Bureaux et open-spaces tout inclus, sans frais d'agence,
            20 min de Bordeaux. Planifiez votre visite en 2 minutes.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-[#C9A84C] hover:bg-[#b8963e] text-white font-semibold px-6 py-3 rounded-md text-sm transition-colors"
            >
              Demander une visite
              <ArrowRight size={15} />
            </Link>
            <Link
              to="/nos-lots"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/30 font-semibold px-6 py-3 rounded-md text-sm transition-colors"
            >
              Voir les lots disponibles
            </Link>
          </div>
        </div>
      </article>

      {/* ── Lot recommandé ── */}
      {(recommendedLots.length > 0 || showBuildingLink) && (
        <section
          className="py-12 bg-white border-t border-gray-100"
          aria-labelledby="section-lot-recommande"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2
              id="section-lot-recommande"
              className="text-xl sm:text-2xl font-bold text-[#0F2D52] mb-6"
            >
              Le lot qui correspond à cet article
            </h2>
            <div className={`grid gap-6 ${recommendedLots.length + (showBuildingLink ? 1 : 0) <= 1 ? "sm:grid-cols-1 max-w-sm" : recommendedLots.length + (showBuildingLink ? 1 : 0) === 2 ? "sm:grid-cols-2 max-w-2xl" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
              {recommendedLots.map((lot) => (
                <LotCard key={lot.id} lot={lot} />
              ))}
              {showBuildingLink && (
                <Link
                  to="/le-batiment"
                  className="bg-[#0F2D52] rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all group flex flex-col"
                  aria-label="Découvrir le bâtiment Galilée"
                >
                  <div className="bg-[#0a1f3a] p-6 flex-1 flex flex-col justify-between gap-4">
                    <div>
                      <p className="text-xs text-[#C9A84C] font-semibold uppercase tracking-widest mb-2">
                        Bâtiment Galilée · Lormont
                      </p>
                      <h3 className="text-lg font-bold text-white group-hover:text-[#C9A84C] transition-colors">
                        Découvrir l'immeuble
                      </h3>
                      <p className="text-white/70 text-sm mt-2 leading-relaxed">
                        760 m² de bureaux, 2 niveaux, certification BBC, 26 places de parking. Tout inclus, sans frais d'agence.
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-2 text-[#C9A84C] font-semibold text-sm">
                      Voir le bâtiment
                      <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── Articles liés ── */}
      {related.length > 0 && (
        <section
          className="py-12 bg-gray-50 border-t border-gray-100"
          aria-labelledby="section-related"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2
              id="section-related"
              className="text-xl sm:text-2xl font-bold text-[#0F2D52] mb-6"
            >
              À lire aussi
            </h2>
            <div className="grid md:grid-cols-3 gap-5">
              {related.map((r) => (
                <article
                  key={r.slug}
                  className="bg-white rounded-xl p-5 border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="inline-flex items-center gap-1.5 bg-[#C9A84C]/15 text-[#0F2D52] text-xs font-semibold px-2.5 py-1 rounded-full mb-3">
                    <Tag size={11} />
                    {r.frontmatter.category}
                  </div>
                  <h3 className="text-base font-bold text-[#0F2D52] mb-2 leading-snug">
                    <Link
                      to={`/blog/${r.slug}`}
                      className="hover:text-[#C9A84C] transition-colors"
                    >
                      {r.frontmatter.title}
                    </Link>
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed line-clamp-2">
                    {r.frontmatter.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
