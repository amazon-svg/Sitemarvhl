import { useEffect } from "react";

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

function setMeta(name: string, content: string, attr = "name") {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel: string, href: string) {
  let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function upsertJsonLd(id: string, data: object | object[]) {
  let el = document.querySelector<HTMLScriptElement>(`script[data-seo-id="${id}"]`);
  if (!el) {
    el = document.createElement("script");
    el.setAttribute("type", "application/ld+json");
    el.setAttribute("data-seo-id", id);
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(Array.isArray(data) ? data : [data]);
}

function removeJsonLd(id: string) {
  document.querySelector(`script[data-seo-id="${id}"]`)?.remove();
}

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

  useEffect(() => {
    // Title
    document.title = fullTitle;

    // Basic meta
    setMeta("description", description);
    if (noindex) {
      setMeta("robots", "noindex, nofollow");
    } else {
      document.querySelector('meta[name="robots"]')?.remove();
    }

    // Canonical
    if (canonicalUrl) {
      setLink("canonical", canonicalUrl);
    }

    // Open Graph
    setMeta("og:title", fullTitle, "property");
    setMeta("og:description", description, "property");
    setMeta("og:type", ogType, "property");
    setMeta("og:image", ogImage, "property");
    setMeta("og:image:width", "1200", "property");
    setMeta("og:image:height", "630", "property");
    if (canonicalUrl) setMeta("og:url", canonicalUrl, "property");
    setMeta("og:site_name", SITE_NAME, "property");
    setMeta("og:locale", "fr_FR", "property");

    // Twitter Card
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", fullTitle);
    setMeta("twitter:description", description);
    setMeta("twitter:image", ogImage);

    // Geo
    setMeta("geo.region", "FR-33");
    setMeta("geo.placename", "Lormont");
    setMeta("geo.position", "44.87;-0.52");
    setMeta("ICBM", "44.87, -0.52");

    // JSON-LD
    if (jsonLd) {
      upsertJsonLd("page-jsonld", jsonLd);
    } else {
      removeJsonLd("page-jsonld");
    }
  }, [fullTitle, description, canonicalUrl, ogImage, ogType, noindex, jsonLd]);

  return null;
}
