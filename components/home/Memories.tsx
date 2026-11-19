import { memories } from "@/content/site";
import { memoryIcons } from "../motifs";

/** "Xưa là…": mỗi mảnh ký ức in trên một con tem cũ. */
export function Memories() {
  return (
    <section className="section memories" aria-labelledby="mem-title">
      <div className="wrap">
        <div className="section-head mem-head">
          <h2 id="mem-title" className="callig">
            Xưa là…
          </h2>
          <p>Thức quà nào của Xưa Là cũng bắt đầu từ một mảnh ký ức như thế này.</p>
        </div>
        <ul className="stamps">
          {memories.map((m, i) => {
            const Icon = memoryIcons[m.icon];
            return (
              <li key={m.icon} className="stamp" data-i={i}>
                <div className="stamp-paper">
                  <Icon className="stamp-icon" />
                  <p className="stamp-text">
                    <span className="callig">Xưa là</span> {m.text}
                  </p>
                  <p className="stamp-gift">{m.gift}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
