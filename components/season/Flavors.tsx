import { flavors } from "@/content/qua-trung-thu";
import { Mooncake, MooncakeSymbols } from "../motifs";

/** Sáu vị bánh bày trên mẹt tre. */
export function Flavors() {
  return (
    <section className="section flavors" aria-labelledby="flavors-title">
      <MooncakeSymbols />
      <div className="wrap flavors-grid">
        <div className="section-head">
          <h2 id="flavors-title">Sáu vị bánh trên mẹt</h2>
          <p>
            Bánh nướng quết trứng vàng óng, bánh dẻo trắng mịn. Bánh, bọc bánh đều làm tay; vị nhân đổi theo
            từng mùa.
          </p>
          <ul className="cake-legend">
            <li>
              <Mooncake kind="nuong" className="cake-mini" /> Bánh nướng
            </li>
            <li>
              <Mooncake kind="deo" className="cake-mini" /> Bánh dẻo
            </li>
          </ul>
        </div>
        <div className="tray">
          <ul className="tray-cakes">
            {flavors.map((f, i) => {
              const a = ((i * 60 - 90) * Math.PI) / 180;
              const pos = { left: `${(50 + Math.cos(a) * 30).toFixed(2)}%`, top: `${(50 + Math.sin(a) * 30).toFixed(2)}%` };
              return (
              <li key={f.name} style={pos}>
                <Mooncake kind={f.kind} className="cake" />
                <span className="cake-name">{f.name}</span>
              </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
