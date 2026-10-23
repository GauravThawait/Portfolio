import type { Metadata } from "next";

/**
 * Absolute site URL for metadata, Open Graph, and the sitemap.
 * Set NEXT_PUBLIC_SITE_URL once a custom domain exists; on Vercel the
 * production URL is used automatically; locally it falls back to localhost.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/$/, "");

const OG_IMAGE = { url: "/og.png", width: 1200, height: 630 };

type PageMetadataInput = {
  /** Page title; the root layout's template appends the site name. Omit on the home page. */
  title?: string;
  /** Full title for social previews. */
  socialTitle: string;
  description: string;
  /** Path from the site root, e.g. "/projects". */
  path: string;
  siteName: string;
};

/** Title, description, canonical URL, and Open Graph / Twitter tags for one page. */
export function pageMetadata({ title, socialTitle, description, path, siteName }: PageMetadataInput): Metadata {
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      type: path === "/" ? "website" : "article",
      url: path,
      siteName,
      title: socialTitle,
      description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [OG_IMAGE.url],
    },
  };
}
