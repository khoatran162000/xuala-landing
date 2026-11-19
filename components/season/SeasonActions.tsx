"use client";

import type { Season } from "@/content/types";
import { chooseSet } from "@/lib/choose-set";

/** Nút ở hero trang mùa: đang bán thì dẫn tới set, ngoài mùa thì mời để lại số nhận tin. */
export function SeasonActions({ season, setsLabel }: { season: Season; setsLabel: string }) {
  if (season.status.kind === "ngoai-mua") {
    const value = season.status.notifyInterest;
    return (
      <div className="hero-actions">
        <button type="button" className="btn btn-vang" onClick={() => chooseSet({ season: season.id, value })}>
          Báo tôi khi mở đặt
        </button>
        <a className="btn btn-vien-sang" href="#bo-suu-tap">
          {setsLabel}
        </a>
      </div>
    );
  }
  return (
    <div className="hero-actions">
      <a className="btn btn-vang" href="#bo-suu-tap">
        {setsLabel}
      </a>
      <a className="btn btn-vien-sang" href="#doanh-nghiep">
        Báo giá cho doanh nghiệp
      </a>
    </div>
  );
}
