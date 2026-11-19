"use client";

import Image from "next/image";
import { site } from "@/content/site";
import type { GiftSet, Season } from "@/content/types";
import { chooseSet } from "@/lib/choose-set";
import { withBase } from "@/lib/deploy";
import { CaneHandle } from "../motifs";

function SetCard({ set, season }: { set: GiftSet; season: Season }) {
  const presale = season.status.kind !== "dang-ban";
  return (
    <article className={`set set--${set.box}`} aria-labelledby={`set-${set.id}`}>
      <div className="set-box">
        <CaneHandle className="set-handle" />
        <div className={`set-face weave weave--${set.box}`}>
          {set.image ? (
            <Image src={withBase(set.image)} alt={`Hộp quà ${set.name}`} fill sizes="(max-width: 640px) 100vw, 33vw" />
          ) : (
            <div className="set-label" aria-hidden="true">
              <span className="set-count">{set.count}</span>
              <span className="set-unit">{set.countLabel}</span>
            </div>
          )}
        </div>
      </div>
      <div className="set-body">
        <h3 className="set-name" id={`set-${set.id}`}>
          {set.name}
        </h3>
        <p className="set-meaning">{set.meaning}</p>
        <ul className="set-contents">
          {set.contents.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
        <div className="set-foot">
          <p className="set-price">{set.price ?? "Liên hệ báo giá"}</p>
          <button
            type="button"
            className="btn btn-son btn-sm"
            onClick={() => chooseSet({ season: season.id, value: `${season.name}: ${set.name}` })}
          >
            {presale ? "Hỏi đặt trước" : "Hỏi giá set này"}
          </button>
          <a className="link" href={site.contact.zalo} target="_blank" rel="noopener">
            Nhắn Zalo
          </a>
        </div>
      </div>
    </article>
  );
}

export function SetGrid({ season }: { season: Season }) {
  const { sets } = season;
  return (
    <section className="section sets-section" id="bo-suu-tap" aria-labelledby="sets-title">
      <div className="wrap">
        <div className="section-head">
          <h2 id="sets-title">{sets.title}</h2>
          <p>{sets.note}</p>
        </div>
        <div className="sets" data-count={sets.items.length}>
          {sets.items.map((set) => (
            <SetCard key={set.id} set={set} season={season} />
          ))}
        </div>
        <p className="season-included">Kèm trong mỗi hộp: {sets.included.join(", ")}.</p>
      </div>
    </section>
  );
}
