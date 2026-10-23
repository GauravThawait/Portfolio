import type { MetadataRoute } from "next";

import { getCaseStudies } from "@/lib/content";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/projects", ...getCaseStudies().map((study) => `/work/${study.slug}`)];
  return paths.map((path) => ({ url: `${siteUrl}${path === "/" ? "" : path}` }));
}
