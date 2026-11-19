import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { isStaticPreview } from "@/lib/deploy";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  if (isStaticPreview) return { rules: [{ userAgent: "*", disallow: "/" }] };
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: "/api/" }],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
