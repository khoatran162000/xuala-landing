import Link from "next/link";
import type { Season } from "@/content/types";
import { midSentence } from "@/lib/text";

/** Lối sang mùa quà còn lại — đặt cuối trang, tách khỏi bộ sưu tập của mùa đang xem. */
export function CrossSeason({ to }: { to: Season }) {
  return (
    <aside className={`cross cross--${to.id}`} aria-label="Mùa quà còn lại">
      <div className="wrap cross-inner">
        <p className="cross-text">
          {to.door.text} <span className="cross-when">{to.status.label}.</span>
        </p>
        <Link className="btn btn-vien" href={to.path}>
          Sang trang {midSentence(to.name)}
        </Link>
      </div>
    </aside>
  );
}
