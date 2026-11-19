"use client";

import { useEffect, useState } from "react";
import { tetDay } from "@/content/qua-tet";

/** Tờ lịch bloc treo tường: ngày mùng 1 Tết, và số ngày còn lại (tính trên máy khách). */
export function TetCalendar() {
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => {
      const ms = new Date(tetDay.iso).getTime() - Date.now();
      setDays(Math.ceil(ms / 86_400_000));
    };
    tick();
    const t = setInterval(tick, 60 * 60 * 1000);
    return () => clearInterval(t);
  }, []);

  let countdown = " ";
  if (days !== null) {
    if (days > 1) countdown = `Còn ${days} ngày nữa là Tết`;
    else if (days === 1) countdown = "Mai là Tết rồi";
    else if (days === 0) countdown = "Hôm nay mùng 1 Tết";
  }

  return (
    <figure className="lich" aria-label={`${tetDay.lunar}: ${tetDay.weekday}, ngày ${tetDay.day} ${tetDay.month.toLowerCase()} năm ${tetDay.year}`}>
      <div className="lich-bind" aria-hidden="true" />
      <div className="lich-page" aria-hidden="true">
        <p className="lich-month">
          {tetDay.month} {tetDay.year}
        </p>
        <p className="lich-day">{tetDay.day}</p>
        <p className="lich-weekday">{tetDay.weekday}</p>
        <p className="lich-lunar">{tetDay.lunar}</p>
      </div>
      <figcaption className="lich-count" aria-live="polite">
        {countdown}
      </figcaption>
    </figure>
  );
}
