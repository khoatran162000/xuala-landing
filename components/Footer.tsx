import Link from "next/link";
import { site } from "@/content/site";
import { IconChat, IconPhone } from "./icons";
import { RiceStalk } from "./motifs";

export function Footer() {
  const c = site.contact;
  return (
    <>
      <footer className="footer">
        <div className="footer-eave" aria-hidden="true" />
        <div className="wrap">
          <div className="footer-top">
            <div className="footer-brand">
              <p className="footer-mark">
                <RiceStalk className="brand-lua" />
                <span className="wordmark">{site.name}</span>
              </p>
              <p className="footer-slogan">{site.slogan}</p>
            </div>
            <nav className="footer-col" aria-label="Hai mùa quà">
              <p className="footer-head">Mùa quà</p>
              <Link href="/qua-tet">Quà Tết</Link>
              <Link href="/qua-trung-thu">Quà Trung thu</Link>
              <Link href="/#doanh-nghiep">Quà doanh nghiệp</Link>
            </nav>
            <div className="footer-col">
              <p className="footer-head">Liên hệ</p>
              <a href={`tel:${c.hotlineRaw}`}>Hotline, Zalo {c.hotline}</a>
              <a href={`mailto:${c.email}`}>{c.email}</a>
              <a href={c.facebook} target="_blank" rel="noopener">
                facebook.com/xualavietnam
              </a>
            </div>
          </div>
          <p className="footer-bottom">
            © {new Date().getFullYear()} {site.name}. {c.address}.
          </p>
        </div>
      </footer>

      <div className="float">
        <a className="f-zalo" href={c.zalo} target="_blank" rel="noopener" aria-label="Nhắn Zalo cho Xưa Là">
          <IconChat />
        </a>
        <a className="f-call" href={`tel:${c.hotlineRaw}`} aria-label={`Gọi ${c.hotline}`}>
          <IconPhone />
        </a>
      </div>
    </>
  );
}
