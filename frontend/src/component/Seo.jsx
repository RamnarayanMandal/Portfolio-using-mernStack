import { Helmet } from "react-helmet-async";

const defaultDescription =
  "Portfolio of Ramnarayan Mandal — projects, skills, experience, and blog.";

/** Prefer stored SEO fields when present; otherwise use fallbacks. */
export function resolveEntitySeo(entity, fallbacks) {
  if (!entity) return fallbacks;
  return {
    title: entity.seoTitle?.trim() || fallbacks.title,
    description: entity.seoDescription?.trim() || fallbacks.description,
    keywords: entity.seoKeywords?.trim() || fallbacks.keywords,
  };
}

/** Strip HTML and trim for meta descriptions. */
export function plainTextFromHtml(html, maxLen = 160) {
  if (!html) return "";
  const t = String(html)
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();
  if (!maxLen || t.length <= maxLen) return t;
  return `${t.slice(0, maxLen)}…`;
}

function buildCanonical(path) {
  const base =
    import.meta.env.VITE_SITE_URL ||
    (typeof window !== "undefined" ? window.location.origin : "");
  const p = path && path.startsWith("/") ? path : path ? `/${path}` : "";
  return `${base}${p || "/"}`;
}

/**
 * @param {{ title: string, description?: string, keywords?: string, path?: string, ogImage?: string }} props
 */
export function Seo({
  title,
  description = defaultDescription,
  keywords,
  path = "/",
  ogImage,
}) {
  const pageTitle = title || "Ramnarayan-portfolio";
  const canonical = buildCanonical(path);
  const kw = keywords?.trim();

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      {kw ? <meta name="keywords" content={kw} /> : null}
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      {ogImage ? <meta property="og:image" content={ogImage} /> : null}
    </Helmet>
  );
}
