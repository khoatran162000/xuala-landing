import type { SeasonId } from "@/content/types";

/** Khi khách bấm "Hỏi giá set này", form liên hệ tự điền mùa và tên set. */
export const CHOOSE_SET_EVENT = "xuala:choose-set";

export type ChooseSetDetail = { season?: SeasonId; value: string; business?: boolean };

export function chooseSet(detail: ChooseSetDetail) {
  window.dispatchEvent(new CustomEvent<ChooseSetDetail>(CHOOSE_SET_EVENT, { detail }));
  document.getElementById("dat-qua")?.scrollIntoView({ behavior: "smooth", block: "start" });
}
