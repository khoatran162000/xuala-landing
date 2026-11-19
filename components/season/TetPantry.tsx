import metTre from "@/assets/hoa-tiet/met-tre.svg";
import { tetPantry } from "@/content/qua-tet";

/** Tờ giấy hồng điều viết tay danh sách món, như tờ giấy đỏ dán ngày Tết. */
export function TetPantry() {
  return (
    <section className="section pantry" aria-labelledby="pantry-title">
      <div className="wrap pantry-grid">
        <div className="red-sheet">
          <h2 id="pantry-title">{tetPantry.title}</h2>
          <p className="red-sheet-lead">{tetPantry.lead}</p>
          <ul className="red-sheet-list">
            {tetPantry.items.map((it) => (
              <li key={it}>{it}</li>
            ))}
          </ul>
        </div>
        <div className="pantry-notes">
          {tetPantry.notes.map((n) => (
            <div key={n.title} className="pantry-note">
              <h3>{n.title}</h3>
              <p>{n.text}</p>
            </div>
          ))}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="pantry-met" src={metTre.src} alt="" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
