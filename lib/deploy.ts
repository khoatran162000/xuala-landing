/** Bản xem thử tĩnh trên GitHub Pages: không có API, form không gửi về máy chủ. */
export const isStaticPreview = process.env.NEXT_PUBLIC_STATIC_PREVIEW === "1";

/** Tiền tố đường dẫn khi site chạy dưới thư mục con, ví dụ "/xuala-landing" trên GitHub Pages. */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Gắn tiền tố cho đường dẫn tới file trong public/ (ảnh sản phẩm…). */
export const withBase = (path: string) => (path.startsWith("/") ? `${basePath}${path}` : path);
