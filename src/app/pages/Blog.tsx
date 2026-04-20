import { Link } from "react-router";
import { ArrowRight, Calendar, Clock, Tag } from "lucide-react";
import { SEO } from "../components/SEO";
import { Breadcrumb } from "../components/Breadcrumb";
import { blogPosts } from "../data/blogPosts";

const SITE_URL = "https://www.marvhl.fr";

const blogJsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Blog MARVHL",
  description:
    "Guides pratiques sur l'immobilier d'entreprise à Bordeaux : location de bureaux, open-spaces, comparatifs et budgets.",
  url: `${SITE_URL}/blog`,
  blogPost: blogPosts.map((p) => ({
    "@type": "BlogPosting",
    headline: p.frontmatter.title,
    description: p.frontmatter.description,
    datePublished: p.frontmatter.date,
    author: { "@type": "Organization", name: p.frontmatter.author },
    url: `${SITE_URL}/blog/${p.slug}`,
  })),
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function Blog() {
  return (
    <>
      <SEO
        title="Blog immobilier d'entreprise Bordeaux | MARVHL"
        description="Guides pratiques pour louer un bureau ou un open-space à Bordeaux : comparatifs, budgets, critères de choix."
        canonical="/blog"
        jsonLd={blogJsonLd}
      />

      {/* ── Header ── */}
      <div className="bg-[#0F2D52] pt-8 pb-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: "Blog" }]} variant="dark" />
          <h1 className="text-3xl sm:text-4xl font-bold text-white mt-5">
            Le blog MARVHL
          </h1>
          <p className="text-white/75 mt-2 max-w-2xl leading-relaxed">
            Guides pratiques sur l'immobilier d'entreprise à Bordeaux :
            comparatifs, critères de choix, budgets réels pour louer bureaux
            et open-spaces.
          </p>
        </div>
      </div>

      {/* ── Liste des articles ── */}
      <section className="py-12 sm:py-16 bg-white" aria-labelledby="section-articles">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="section-articles" className="sr-only">
            Articles
          </h2>
          {blogPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.map((post) => (
                <article
                  key={post.slug}
                  className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col"
                >
                  <div className="p-6 flex flex-col flex-1">
                    <div className="inline-flex items-center gap-1.5 bg-[#C9A84C]/15 text-[#0F2D52] text-xs font-semibold px-2.5 py-1 rounded-full mb-4 w-fit">
                      <Tag size={11} />
                      {post.frontmatter.category}
                    </div>
                    <h3 className="text-lg font-bold text-[#0F2D52] mb-3 leading-snug">
                      <Link
                        to={`/blog/${post.slug}`}
                        className="hover:text-[#C9A84C] transition-colors"
                      >
                        {post.frontmatter.title}
                      </Link>
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-5 line-clamp-3 flex-1">
                      {post.frontmatter.description}
                    </p>
                    <div className="flex items-center justify-between gap-3 pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar size={11} />
                          {formatDate(post.frontmatter.date)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={11} />
                          {post.frontmatter.reading_time} min
                        </span>
                      </div>
                      <Link
                        to={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-1 text-sm font-semibold text-[#0F2D52] hover:text-[#C9A84C] transition-colors shrink-0"
                        aria-label={`Lire l'article : ${post.frontmatter.title}`}
                      >
                        Lire
                        <ArrowRight size={13} />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-gray-500">
              <p>Aucun article pour le moment. Revenez bientôt.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
