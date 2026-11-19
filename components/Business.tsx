"use client";

import { business, site } from "@/content/site";
import type { Offer, SeasonId } from "@/content/types";
import { chooseSet } from "@/lib/choose-set";
import { IconChat } from "./icons";

type Props = { title: string; lead: string; offers: Offer[]; season?: SeasonId };

/** Mặt sơn mài: nền đen than, viền hồi văn vàng — dùng cho cả trang chủ và trang từng mùa. */
export function Business({ title, lead, offers, season }: Props) {
  return (
    <section className="section business" id="doanh-nghiep" aria-labelledby="biz-title">
      <div className="wrap">
        <div className="lacquer">
          <div className="biz-head">
            <h2 id="biz-title">{title}</h2>
            <p>{lead}</p>
          </div>
          <div className="biz-grid">
            <ul className="offers">
              {offers.map((o) => (
                <li key={o.title}>
                  <strong>{o.title}</strong>
                  <span>{o.text}</span>
                </li>
              ))}
            </ul>
            <div>
              <h3 className="steps-title">Đặt quà doanh nghiệp trong bốn bước</h3>
              <ol className="steps">
                {business.steps.map((s) => (
                  <li key={s.title}>
                    <strong>{s.title}</strong>
                    <span>{s.text}</span>
                  </li>
                ))}
              </ol>
              <div className="biz-cta">
                <button
                  type="button"
                  className="btn btn-vang"
                  onClick={() => chooseSet({ season, value: "Báo giá doanh nghiệp", business: true })}
                >
                  Gửi yêu cầu báo giá
                </button>
                <a className="btn btn-vien-sang" href={site.contact.zalo} target="_blank" rel="noopener">
                  <IconChat /> Trao đổi qua Zalo
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
