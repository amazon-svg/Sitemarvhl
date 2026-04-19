import { Link } from "react-router";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  variant?: "light" | "dark";
}

export function Breadcrumb({ items, variant = "light" }: BreadcrumbProps) {
  const all = [{ label: "Accueil", href: "/" }, ...items];

  const styles = variant === "dark"
    ? {
        nav: "text-white/80",
        link: "hover:text-white transition-colors",
        current: "text-white font-medium",
        chevron: "text-white/50",
      }
    : {
        nav: "text-gray-500",
        link: "hover:text-[#0F2D52] transition-colors",
        current: "text-[#0F2D52] font-medium",
        chevron: "text-gray-400",
      };

  // JSON-LD BreadcrumbList
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: item.href ? `https://www.marvhl.fr${item.href}` : undefined,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Fil d'Ariane" className={`flex items-center gap-1 text-sm ${styles.nav}`}>
        {all.map((item, index) => (
          <span key={index} className="flex items-center gap-1">
            {index === 0 && <Home size={14} className="shrink-0" />}
            {item.href && index < all.length - 1 ? (
              <Link
                to={item.href}
                className={styles.link}
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={index === all.length - 1 ? styles.current : ""}
                aria-current={index === all.length - 1 ? "page" : undefined}
              >
                {item.label}
              </span>
            )}
            {index < all.length - 1 && <ChevronRight size={14} className={`shrink-0 ${styles.chevron}`} />}
          </span>
        ))}
      </nav>
    </>
  );
}
