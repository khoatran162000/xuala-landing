import Link from "next/link";
import canhDao from "@/assets/hoa-tiet/canh-dao.svg";
import { home, seasons } from "@/content/site";
import { Seal } from "../Seal";
import { StarLantern } from "../motifs";

/** Hai "cửa mùa": mỗi mùa có trang riêng, ở đây chỉ dẫn lối. */
export function SeasonDoors() {
  return (
    <section className="section doors" aria-labelledby="doors-title">
      <div className="wrap">
        <div className="section-head">
          <h2 id="doors-title">{home.seasonsTitle}</h2>
          <p>{home.seasonsLead}</p>
        </div>
        <div className="doors-grid">
          {seasons.map((s) => (
            <article key={s.id} className={`door door--${s.id}`} data-open={s.status.kind === "dang-ban"}>
              <div className="door-art" aria-hidden="true">
                {s.id === "tet" ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="door-dao" src={canhDao.src} alt="" />
                    <span className="door-glyph callig">Tết</span>
                  </>
                ) : (
                  <>
                    <span className="door-moon">
                      <span className="moon-tree" />
                    </span>
                    <StarLantern className="door-lantern" hue="do" />
                  </>
                )}
              </div>
              <div className="door-body">
                {s.status.kind === "dang-ban" ? (
                  <p className="door-status">
                    <Seal>{s.status.label}</Seal>
                  </p>
                ) : (
                  <p className="door-status door-later">{s.status.label}</p>
                )}
                <h3>
                  <Link className="door-link" href={s.path}>
                    {s.door.title}
                  </Link>
                </h3>
                <p className="door-text">{s.door.text}</p>
                <p className="door-when">{s.door.when}</p>
                <span className="door-cta" aria-hidden="true">
                  {s.door.cta}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
