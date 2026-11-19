import { trungThu } from "@/content/qua-trung-thu";
import { Cloud, StarLantern } from "../motifs";
import { SeasonActions } from "./SeasonActions";

export function MoonHero() {
  const s = trungThu;
  return (
    <section className="moon-hero" id="top" aria-labelledby="tt-title">
      <div className="night" aria-hidden="true">
        <div className="moon">
          <span className="moon-tree" />
        </div>
        <Cloud className="cloud cloud--a" />
        <Cloud className="cloud cloud--b" />
        <StarLantern className="lantern lantern--a" hue="do" />
        <StarLantern className="lantern lantern--b" hue="vang" />
        <StarLantern className="lantern lantern--c" hue="hong" />
      </div>
      <div className="wrap moon-hero-inner">
        <h1 id="tt-title">{s.hero.title}</h1>
        <p className="hero-lead">{s.hero.lead}</p>
        {s.status.kind === "ngoai-mua" && (
          <div className="moon-note">
            <p className="moon-note-label">{s.status.label}</p>
            <p>{s.status.note}</p>
          </div>
        )}
        <SeasonActions season={s} setsLabel={s.status.kind === "ngoai-mua" ? "Xem bộ sưu tập 2026" : "Xem các set"} />
      </div>
    </section>
  );
}
