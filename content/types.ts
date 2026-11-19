export type SeasonId = "tet" | "trung-thu";

export type GiftSet = {
  id: string;
  name: string;
  /** Số món / số bánh trong hộp — in to trên nhãn hộp. */
  count: number;
  countLabel: string;
  meaning: string;
  contents: string[];
  /** Giá hiển thị, ví dụ "từ 350.000đ". Để trống thì hiện "Liên hệ báo giá". */
  price?: string;
  /** Màu nan hộp: "do" (đỏ son), "ngoc" (xanh ngọc), "hong" (hồng cánh sen). */
  box: "do" | "ngoc" | "hong";
  /** Ảnh thật trong /public/images, ví dụ "/images/luc-an-cat.jpg". Để trống thì hiện mặt hộp nan đan vẽ sẵn. */
  image?: string;
};

export type QA = { q: string; a: string };

export type Offer = { title: string; text: string };

export type SeasonStatus =
  /** Đang nhận đặt: nút chính dẫn tới bộ sưu tập. */
  | { kind: "dang-ban"; label: string }
  /** Ngoài mùa: hiện ghi chú và mời để lại số để nhận tin khi mở bán. */
  | { kind: "ngoai-mua"; label: string; note: string; notifyInterest: string };

export type Season = {
  id: SeasonId;
  path: "/qua-tet" | "/qua-trung-thu";
  /** Tên ngắn trên menu, form, email: "Quà Tết". */
  name: string;
  /** Tên bộ sưu tập đang hiển thị: "Tết Đinh Mùi 2027". */
  edition: string;
  status: SeasonStatus;
  meta: { title: string; description: string; keywords: string[] };
  /** Ô "cửa mùa" trên trang chủ. */
  door: { title: string; text: string; when: string; cta: string };
  hero: { title: string; lead: string };
  sets: { title: string; note: string; items: GiftSet[]; included: string[] };
  business: { lead: string; offers: Offer[] };
  faqs: QA[];
  /** Băng ưu đãi có hạn phía trên trang mùa. Để trống thì không hiện. */
  promo?: { text: string };
};
