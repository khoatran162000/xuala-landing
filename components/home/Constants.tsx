import { inside } from "@/content/site";
import { insideIcons } from "../motifs";

/** Bốn thứ giữ nguyên qua mọi mùa, dán như nhãn giấy lên mặt nan mây. */
export function Constants() {
  return (
    <section className="section constants" aria-labelledby="constants-title">
      <div className="wrap">
        <div className="section-head">
          <h2 id="constants-title">Mùa nào cũng vậy</h2>
          <p>Mỗi mùa Xưa Là đổi nhãn hộp và màu nan, còn bốn điều này thì giữ nguyên.</p>
        </div>
        <div className="weave-panel weave">
          <ul className="labels">
            {inside.map((it) => {
              const Icon = insideIcons[it.icon];
              return (
                <li key={it.title} className="label">
                  <Icon className="label-icon" />
                  <h3>{it.title}</h3>
                  <p>{it.text}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
