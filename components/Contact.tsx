import { seasonById, site } from "@/content/site";
import type { SeasonId } from "@/content/types";
import { midSentence } from "@/lib/text";
import { ContactForm } from "./ContactForm";
import { IconChat, IconMail, IconMessenger, IconPage, IconPhone, IconPin } from "./icons";

export function Contact({ season }: { season?: SeasonId }) {
  const c = site.contact;
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(c.mapQuery)}&output=embed`;
  const s = season ? seasonById[season] : undefined;
  const title = s ? `Đặt ${midSentence(s.name)}` : "Gửi yêu cầu đặt quà";
  const lead =
    s?.status.kind === "ngoai-mua"
      ? "Để lại số điện thoại: Xưa Là báo khi mở đặt mùa mới, hoặc gọi lại tư vấn nếu doanh nghiệp cần đặt sớm."
      : "Để lại số điện thoại và set bạn quan tâm. Xưa Là gọi lại tư vấn, gửi ảnh thật và báo giá.";

  return (
    <section className="section contact" id="dat-qua" aria-labelledby="contact-title">
      <div className="wrap">
        <div className="section-head">
          <h2 id="contact-title">{title}</h2>
          <p>{lead}</p>
        </div>
        <div className="contact-grid">
          <ContactForm season={season} />
          <aside className="info-card" aria-label="Các cách liên hệ khác">
            <p className="info-head">Muốn nói chuyện ngay?</p>
            <div className="quick">
              <a className="quick-zalo" href={c.zalo} target="_blank" rel="noopener">
                <IconChat /> Nhắn Zalo
              </a>
              <a className="quick-mess" href={c.messenger} target="_blank" rel="noopener">
                <IconMessenger /> Messenger
              </a>
              <a className="quick-call" href={`tel:${c.hotlineRaw}`}>
                <IconPhone /> Gọi {c.hotline}
              </a>
            </div>
            <ul className="info-list">
              <li>
                <IconMail />
                <div>
                  <small>Email</small>
                  <a href={`mailto:${c.email}`}>{c.email}</a>
                </div>
              </li>
              <li>
                <IconPage />
                <div>
                  <small>Fanpage</small>
                  <a href={c.facebook} target="_blank" rel="noopener">
                    facebook.com/xualavietnam
                  </a>
                </div>
              </li>
              <li>
                <IconPin />
                <div>
                  <small>Địa chỉ</small>
                  <span>{c.address}</span>
                </div>
              </li>
            </ul>
            <iframe
              className="map"
              title={`Bản đồ: ${c.address}`}
              src={mapSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </aside>
        </div>
      </div>
    </section>
  );
}
