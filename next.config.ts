import type { NextConfig } from "next";

/**
 * Hai cách build:
 * - Mặc định (VPS, `next start`): có API form, header bảo mật, tối ưu ảnh.
 * - GITHUB_PAGES=true: xuất trang tĩnh vào out/ cho bản xem thử trên GitHub Pages.
 *   PAGES_BASE_PATH là tiền tố đường dẫn, ví dụ "/xuala-landing" (workflow tự điền).
 */
const isPages = process.env.GITHUB_PAGES === "true";
const basePath = isPages ? (process.env.PAGES_BASE_PATH ?? "").replace(/\/$/, "") : "";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  env: {
    NEXT_PUBLIC_STATIC_PREVIEW: isPages ? "1" : "",
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  ...(isPages
    ? {
        output: "export",
        basePath: basePath || undefined,
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : {
        images: { formats: ["image/avif", "image/webp"] },
        async headers() {
          return [{ source: "/:path*", headers: securityHeaders }];
        },
      }),
};

export default nextConfig;
