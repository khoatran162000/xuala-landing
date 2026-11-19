import type { Metadata, Viewport } from "next";
import "@fontsource-variable/fraunces/full.css";
import "@fontsource/charm/700.css";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { site } from "@/content/site";
import { isStaticPreview } from "@/lib/deploy";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Quà Tết, quà Trung thu truyền thống trong hộp mây tre`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "quà Tết mây tre đan",
    "set quà Tết doanh nghiệp Hà Nội",
    "quà Tết truyền thống",
    "ô mai thủ công",
    "bánh Trung thu cổ truyền hộp mây tre",
    "quà Trung thu doanh nghiệp",
    "trà nõn tôm Thái Nguyên",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "/",
    siteName: site.name,
    title: `${site.name} — ${site.slogan}`,
    description: site.description,
  },
  robots: isStaticPreview ? { index: false, follow: false } : { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#a8322a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>
        <a className="skip-link" href="#noi-dung">
          Bỏ qua menu
        </a>
        <Header />
        <main id="noi-dung">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
