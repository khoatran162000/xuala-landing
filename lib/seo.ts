import { site } from "@/content/site";
import type { QA, Season } from "@/content/types";

export function faqJsonLd(items: QA[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function seasonJsonLd(season: Season) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: site.name, item: site.url },
        { "@type": "ListItem", position: 2, name: season.name, item: `${site.url}${season.path}` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: `${season.name} — ${season.edition}`,
      itemListElement: season.sets.items.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: s.name,
        description: s.meaning,
      })),
    },
    faqJsonLd(season.faqs),
  ];
}
