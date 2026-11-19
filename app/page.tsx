import { Business } from "@/components/Business";
import { Contact } from "@/components/Contact";
import { Faq } from "@/components/Faq";
import { Constants } from "@/components/home/Constants";
import { HomeHero } from "@/components/home/HomeHero";
import { Memories } from "@/components/home/Memories";
import { SeasonDoors } from "@/components/home/SeasonDoors";
import { Story } from "@/components/home/Story";
import { JsonLd } from "@/components/JsonLd";
import { business, faqs, site } from "@/content/site";
import { faqJsonLd } from "@/lib/seo";

export default function Home() {
  return (
    <div className="page page--home">
      <HomeHero />
      <SeasonDoors />
      <Memories />
      <Constants />
      <Story />
      <Business title={business.title} lead={business.lead} offers={business.offers} />
      <Faq items={faqs} />
      <Contact />
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Store",
            name: site.name,
            slogan: site.slogan,
            description: site.description,
            url: site.url,
            telephone: site.contact.hotlineRaw,
            email: site.contact.email,
            address: {
              "@type": "PostalAddress",
              streetAddress: "332 Nguyễn Trãi",
              addressLocality: "Thanh Xuân",
              addressRegion: "Hà Nội",
              addressCountry: "VN",
            },
            sameAs: [site.contact.facebook],
          },
          faqJsonLd(faqs),
        ]}
      />
    </div>
  );
}
