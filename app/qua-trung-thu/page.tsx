import type { Metadata } from "next";
import { Business } from "@/components/Business";
import { Contact } from "@/components/Contact";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { CrossSeason } from "@/components/season/CrossSeason";
import { Flavors } from "@/components/season/Flavors";
import { MoonHero } from "@/components/season/MoonHero";
import { PromoRibbon } from "@/components/season/PromoRibbon";
import { SetGrid } from "@/components/season/SetGrid";
import { tet } from "@/content/qua-tet";
import { trungThu } from "@/content/qua-trung-thu";
import { seasonJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: trungThu.meta.title,
  description: trungThu.meta.description,
  keywords: trungThu.meta.keywords,
  alternates: { canonical: trungThu.path },
  openGraph: { url: trungThu.path, title: trungThu.meta.title, description: trungThu.meta.description },
};

export default function QuaTrungThuPage() {
  return (
    <div className="page page--trung-thu" data-season="trung-thu">
      <PromoRibbon season={trungThu} />
      <MoonHero />
      <Flavors />
      <SetGrid season={trungThu} />
      <Business
        title="Quà Trung thu cho cơ quan, doanh nghiệp"
        lead={trungThu.business.lead}
        offers={trungThu.business.offers}
        season="trung-thu"
      />
      <Faq items={trungThu.faqs} />
      <Contact season="trung-thu" />
      <CrossSeason to={tet} />
      <JsonLd data={seasonJsonLd(trungThu)} />
    </div>
  );
}
