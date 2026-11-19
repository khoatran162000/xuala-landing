import type { MetadataRoute } from "next";
import { seasons, site } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    ...seasons.map((s) => ({
      url: `${site.url}${s.path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: s.status.kind === "dang-ban" ? 0.9 : 0.7,
    })),
  ];
}
