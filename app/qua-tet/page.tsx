import type { Metadata } from "next";
import { Business } from "@/components/Business";
import { Contact } from "@/components/Contact";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { CrossSeason } from "@/components/season/CrossSeason";
import { PromoRibbon } from "@/components/season/PromoRibbon";
import { SetGrid } from "@/components/season/SetGrid";
import { TetHero } from "@/components/season/TetHero";
import { TetPantry } from "@/components/season/TetPantry";
import { tet } from "@/content/qua-tet";
import { trungThu } from "@/content/qua-trung-thu";
import { seasonJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: tet.meta.title,
  description: tet.meta.description,
  keywords: tet.meta.keywords,
  alternates: { canonical: tet.path },
  openGraph: { url: tet.path, title: tet.meta.title, description: tet.meta.description },
};

export default function QuaTetPage() {
  return (
    <div className="page page--tet" data-season="tet">
      <PromoRibbon season={tet} />
      <TetHero />
      <TetPantry />
      <SetGrid season={tet} />
      <Business title="Quà Tết cho cơ quan, doanh nghiệp" lead={tet.business.lead} offers={tet.business.offers} season="tet" />
      <Faq items={tet.faqs} />
      <Contact season="tet" />
      <CrossSeason to={trungThu} />
      <JsonLd data={seasonJsonLd(tet)} />
    </div>
  );
}
