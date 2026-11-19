import Link from "next/link";
import { activeSeason, home, seasons, site } from "@/content/site";
import { midSentence } from "@/lib/text";
import { Storks, SunDrum } from "../motifs";

export function HomeHero() {
  const active = seasons.find((s) => s.id === activeSeason)!;
  const other = seasons.find((s) => s.id !== activeSeason)!;
  return (
    <section className="home-hero" id="top" aria-labelledby="home-title">
      <div className="home-sky" aria-hidden="true">
        <SunDrum className="home-sun" />
        <Storks className="home-storks" />
      </div>
      <div className="wrap home-hero-inner">
        <p className="callig hero-slogan">{site.slogan}</p>
        <h1 id="home-title">{home.hero.title}</h1>
        <p className="hero-lead">{home.hero.lead}</p>
        <div className="hero-actions">
          <Link className="btn btn-son" href={active.path}>
            Xem {midSentence(active.name)}
          </Link>
          <Link className="btn btn-vien" href={other.path}>
            Xem {midSentence(other.name)}
          </Link>
        </div>
        <p className="hero-note">
          Đặt cho cơ quan, doanh nghiệp?{" "}
          <a className="link" href="#doanh-nghiep">
            Xem ưu đãi theo số lượng
          </a>
        </p>
      </div>
      <div className="village" aria-hidden="true" />
    </section>
  );
}
