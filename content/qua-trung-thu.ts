/**
 * Trang Quà Trung thu (/qua-trung-thu). Mỗi mùa Trung thu chỉ cần sửa file này rồi build lại.
 * Khi mở bán mùa mới: đổi `status` sang { kind: "dang-ban", label: "Đang nhận đặt" } và thay `sets`.
 */
import type { Season } from "./types";

export const trungThu = {
  id: "trung-thu",
  path: "/qua-trung-thu",
  name: "Quà Trung thu",
  edition: "Trung thu 2026",
  // CẦN XÁC NHẬN thời điểm mở bán Trung thu 2027 (các mùa trước mở khoảng 6–7 tuần trước rằm tháng Tám).
  status: {
    kind: "ngoai-mua",
    label: "Mùa sau: Rằm tháng Tám 2027",
    note: "Mùa Trung thu 2026 đã khép lại. Bộ sưu tập mới sẽ ra mắt khoảng 6–7 tuần trước rằm tháng Tám 2027. Để lại số điện thoại, Xưa Là báo bạn ngay khi mở đặt.",
    notifyInterest: "Trung thu 2027: báo khi mở đặt",
  },

  meta: {
    title: "Quà Trung thu: bánh nướng, bánh dẻo cổ truyền trong giỏ mây tre",
    description:
      "Bánh Trung thu cổ truyền Xưa Là làm tay, vỏ bánh nướng quết trứng vàng óng, kèm trà nõn tôm Thái Nguyên trong vali mây tre lót nhung. Quà Trung thu cho gia đình, cơ quan và doanh nghiệp.",
    keywords: [
      "bánh Trung thu cổ truyền hộp mây tre",
      "quà Trung thu doanh nghiệp",
      "bánh Trung thu làm thủ công Hà Nội",
      "set bánh Trung thu trà Thái Nguyên",
    ],
  },

  door: {
    title: "Quà Trung thu",
    text: "Bánh nướng quết trứng vàng óng, bánh dẻo sen nhuyễn và trà nõn tôm trong giỏ mây lót nhung.",
    when: "Mở đặt khoảng 6–7 tuần trước rằm tháng Tám",
    cta: "Xem quà Trung thu",
  },

  hero: {
    title: "Quà Trung thu",
    lead: "Bánh Trung thu Xưa Là thiết kế riêng, vỏ bánh nướng quết thêm một lớp trứng nên vàng óng như trăng rằm. Bánh, bọc bánh và hộp đều làm tay; set nào cũng kèm trà nõn tôm Thái Nguyên, đặt trong vali mây đỏ lót nhung.",
  },

  sets: {
    title: "Ba set Trung thu 2026",
    note: "Tên set đặt theo số bánh. Mẫu mùa 2027 có thể thay đổi — ba set dưới đây để bạn hình dung và đặt trước cho doanh nghiệp.",
    items: [
      {
        id: "thu-an",
        name: "Thu An",
        count: 2,
        countLabel: "bánh",
        meaning: "Sắc thu dịu dàng và lời chúc bình an, nhẹ nhàng gửi tới người thân yêu.",
        contents: ["2 bánh Trung thu", "1 trà nõn tôm Thái Nguyên"],
        box: "hong",
      },
      {
        id: "vien-nguyet",
        name: "Viên Nguyệt",
        count: 4,
        countLabel: "bánh",
        meaning: "Vầng trăng tròn — biểu tượng của đoàn tụ, trọn vẹn và đủ đầy. Hợp biếu gia đình, bạn bè, đồng nghiệp.",
        contents: ["4 bánh Trung thu", "1 trà nõn tôm Thái Nguyên"],
        box: "do",
      },
      {
        id: "phong-thu",
        name: "Phong Thu",
        count: 6,
        countLabel: "bánh",
        meaning: "Hơi thở của mùa thu — một chút dịu dàng, một chút hoài niệm. Set đầy đặn để gửi người trân quý.",
        contents: ["6 bánh Trung thu", "2 trà nõn tôm Thái Nguyên"],
        box: "do",
      },
    ],
    included: ["thiệp cảm ơn và thư tri ân", "túi giấy Xưa Là"],
  },

  business: {
    lead: "Quà Trung thu cho cán bộ nhân viên, khách hàng, đối tác — và quà cho các cháu thiếu nhi, con em cán bộ nhân viên.",
    offers: [
      // CẦN XÁC NHẬN mức chiết khấu Trung thu 2027. Trung thu 2026 công bố 20% cho cơ quan, doanh nghiệp.
      { title: "Chiết khấu 20%", text: "Cho cơ quan, doanh nghiệp đặt theo số lượng." },
      { title: "In logo đồng bộ", text: "Logo doanh nghiệp in trên thiệp và thư tri ân." },
      { title: "Hoá đơn VAT", text: "Xuất đầy đủ cho đơn hàng cơ quan, doanh nghiệp." },
      { title: "Thiệp viết tay", text: "Viết lời chúc riêng cho từng người nhận." },
      { title: "Giao nhiều địa chỉ", text: "Gửi toàn quốc, kịp trước rằm." },
    ],
  },

  faqs: [
    {
      q: "Bánh Trung thu Xưa Là có gì khác?",
      a: "Bánh do Xưa Là thiết kế riêng, bánh và bọc bánh đều làm tay. Vỏ bánh nướng được quết thêm một lớp trứng nên có màu vàng óng.",
    },
    {
      q: "Có những vị bánh nào?",
      a: "Mùa 2026 có sáu vị: dẻo sen nhuyễn trứng muối, nướng thập cẩm, nướng trà xanh, dẻo đậu xanh, nướng đậu xanh và nướng khoai môn.",
    },
    {
      q: "Có bán bánh lẻ không?",
      a: "Các mùa trước Xưa Là có bán bánh lẻ theo cặp và theo hộp 10 bánh. Nhắn Zalo để hỏi các vị còn trong mùa.",
    },
    {
      q: "Khi nào mở đặt quà Trung thu 2027?",
      a: "Khoảng 6–7 tuần trước rằm tháng Tám. Doanh nghiệp cần đặt sớm có thể gửi yêu cầu ngay bây giờ để Xưa Là giữ lịch và báo giá.",
    },
  ],
} satisfies Season;

/** Sáu vị bánh mùa 2026 — "nuong" vỏ vàng nâu, "deo" vỏ trắng. */
export const flavors: { name: string; kind: "nuong" | "deo" }[] = [
  { name: "Dẻo sen nhuyễn trứng muối", kind: "deo" },
  { name: "Nướng thập cẩm", kind: "nuong" },
  { name: "Nướng trà xanh", kind: "nuong" },
  { name: "Dẻo đậu xanh", kind: "deo" },
  { name: "Nướng đậu xanh", kind: "nuong" },
  { name: "Nướng khoai môn", kind: "nuong" },
];
