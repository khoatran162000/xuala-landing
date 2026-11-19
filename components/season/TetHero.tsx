import canhDao from "@/assets/hoa-tiet/canh-dao.svg";
import { tet, tetPantry } from "@/content/qua-tet";
import { TetCalendar } from "./TetCalendar";

export function TetHero() {
  const [upper, lower] = tetPantry.couplet;
  const words = (s: string) => s.split(" ").map((w, i) => <span key={i}>{w}</span>);
  return (
    <section className="tet-hero" id="top" aria-labelledby="tet-title">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="tet-dao" src={canhDao.src} alt="" aria-hidden="true" />
      <div className="wrap tet-hero-inner">
        {/* Câu đối treo theo lối xưa: vế trên bên phải, vế dưới bên trái. */}
        <p className="sr-only">
          {upper}, {lower.toLowerCase()}.
        </p>
        <p className="couplet couplet--upper callig" aria-hidden="true">
          {words(upper)}
        </p>
        <p className="couplet couplet--lower callig" aria-hidden="true">
          {words(lower)}
        </p>
        <div className="tet-hero-main">
          <div className="tet-hero-text">
            <h1 id="tet-title">{tet.hero.title}</h1>
            <p className="hero-lead">{tet.hero.lead}</p>
            <div className="hero-actions">
              <a className="btn btn-son" href="#bo-suu-tap">
                Xem bốn set quà
              </a>
              <a className="btn btn-vien" href="#doanh-nghiep">
                Báo giá cho doanh nghiệp
              </a>
            </div>
          </div>
          <TetCalendar />
        </div>
      </div>
    </section>
  );
}
