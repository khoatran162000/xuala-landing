import type { QA } from "@/content/types";

export function Faq({ items, lead }: { items: QA[]; lead?: string }) {
  return (
    <section className="section faq" id="hoi-dap" aria-labelledby="faq-title">
      <div className="wrap faq-grid">
        <div className="section-head">
          <h2 id="faq-title">Hỏi đáp</h2>
          <p>{lead ?? "Chưa thấy câu bạn cần hỏi? Nhắn Zalo hoặc gọi hotline cho Xưa Là."}</p>
        </div>
        <div className="faq-list">
          {items.map((f, i) => (
            <details key={f.q} open={i === 0}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
