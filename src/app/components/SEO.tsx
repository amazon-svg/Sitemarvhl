import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  jsonLd?: object | object[];
  noindex?: boolean;
}

const SITE_NAME = "MARVHL – Bâtiment Galilée, Lormont";
const SITE_URL = "https://www.marvhl.fr";
const DEFAULT_OG_IMAGE = "https://www.marvhl.fr/og-image.jpg";

export function SEO({
  title,
  description,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  jsonLd,
  noindex = false,
}: SEOProps) {
  const fullTitle = title.includes("MARVHL") ? title : `${title} | MARVHL`;
  const canonicalUrl = canonical ? `${SITE_URL}${canonical}` : undefined;
  const jsonLdArr = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : null;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="fr_FR" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Geo */}
      <meta name="geo.region" content="FR-33" />
      <meta name="geo.placename" content="Lormont" />
      <meta name="geo.position" content="44.87;-0.52" />
      <meta name="ICBM" content="44.87, -0.52" />

      {jsonLdArr && (
        <script type="application/ld+json">{JSON.stringify(jsonLdArr)}</script>
      )}
    </Helmet>
  );
}
