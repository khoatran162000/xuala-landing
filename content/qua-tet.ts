/**
 * Trang Quà Tết (/qua-tet). Mỗi mùa Tết chỉ cần sửa file này rồi build lại.
 * Những chỗ ghi "CẦN XÁC NHẬN" là thông tin Facebook chưa nói rõ — hỏi lại Xưa Là trước khi chạy thật.
 */
import type { Season } from "./types";

export const tet = {
  id: "tet",
  path: "/qua-tet",
  name: "Quà Tết",
  edition: "Tết Đinh Mùi 2027",
  status: { kind: "dang-ban", label: "Đang nhận đặt" },

  meta: {
    title: "Quà Tết Đinh Mùi 2027 trong vali mây tre đan",
    description:
      "Set quà Tết truyền thống của Xưa Là: ô mai làm tay không chất bảo quản, long nhãn ôm sen, hạt điều vỏ lụa và trà nõn tôm Tân Cương trong vali mây tre lót nhung. Nhận đặt cho gia đình và doanh nghiệp, giao toàn quốc.",
    keywords: [
      "quà Tết mây tre đan",
      "set quà Tết doanh nghiệp Hà Nội",
      "quà Tết truyền thống",
      "ô mai thủ công",
      "trà nõn tôm Thái Nguyên",
    ],
  },

  door: {
    title: "Quà Tết",
    text: "Ô mai làm tay, long nhãn, hạt điều và trà nõn tôm trong vali mây đỏ son, xanh ngọc.",
    when: "Mùng 1 Tết Đinh Mùi rơi vào thứ Bảy, 6/2/2027",
    cta: "Xem bốn set quà Tết",
  },

  hero: {
    title: "Quà Tết Đinh Mùi",
    lead: "Ô mai xào tay theo công thức riêng, long nhãn ôm sen, hạt điều vỏ lụa và trà nõn tôm Tân Cương, xếp trong vali mây tre lót nhung. Để biếu ông bà, cha mẹ, thầy cô, gửi người xa quê và tri ân đối tác.",
  },

  sets: {
    title: "Bốn set quà Tết",
    note: "Tên set đặt theo số món trong hộp. Chọn set bạn thích, Xưa Là gửi ảnh thật và báo giá qua Zalo.",
    // CẦN XÁC NHẬN: thay bằng bộ sưu tập Tết 2027 khi Xưa Là chốt mẫu. Tên và ý nghĩa dưới đây lấy từ BST Tết Ất Tỵ.
    items: [
      {
        id: "nhi-an-khang",
        name: "Nhị An Khang",
        count: 2,
        countLabel: "món", // CẦN XÁC NHẬN thành phần chính xác
        meaning: "Hộp nhỏ gọn, gửi lời chúc một năm an khang tới người thân.",
        contents: ["Ô mai thủ công", "Trà nõn tôm Thái Nguyên"],
        box: "do",
      },
      {
        id: "tam-phuc-loc",
        name: "Tam Phúc Lộc",
        count: 3,
        countLabel: "món", // CẦN XÁC NHẬN thành phần chính xác
        meaning: "Ba thức quà cho một năm nhiều phúc, nhiều lộc.",
        contents: ["Ô mai thủ công", "Đặc sản truyền thống", "Trà nõn tôm Thái Nguyên"],
        box: "ngoc",
      },
      {
        id: "luc-an-cat",
        name: "Lục An Cát",
        count: 6,
        countLabel: "món",
        meaning:
          "“An Cát” là bình yên, tốt đẹp; “Lục” lấy từ Lục Hỷ — sáu niềm vui lớn của đời người. Sáu món đặc sản mang phong vị Tết làng quê.",
        contents: ["Ô mai thủ công", "Long nhãn ôm sen", "Hạt điều vỏ lụa", "Trà nõn tôm Thái Nguyên"],
        box: "do",
      },
      {
        id: "phat-luu-nien",
        name: "Phát Lưu Niên",
        count: 8,
        countLabel: "món",
        meaning:
          "“Lưu Niên” là lưu giữ những năm tháng đã qua, “Phát” là mong sung túc. Tám thức quà quê như một hộp thư lưu giữ ký ức tuổi thơ.",
        contents: ["Ô mai thủ công", "Xoài sấy dẻo", "Long nhãn ôm sen", "Hạt điều vỏ lụa", "Trà nõn tôm Thái Nguyên"],
        box: "ngoc",
      },
    ],
    included: ["thư cảm ơn", "túi giấy Xưa Là", "phong bao lì xì"],
  },

  business: {
    lead: "Quà Tết tri ân cuối năm cho cán bộ nhân viên, khách hàng và đối tác — đóng gói đồng bộ, giao tận tay từng người nhận trước Tết.",
    offers: [
      // CẦN XÁC NHẬN mức chiết khấu Tết 2027. Tết 2026 công bố "tới 30–35% cho đơn lớn".
      { title: "Chiết khấu tới 35%", text: "Theo số lượng set. Mức cụ thể gửi kèm báo giá." },
      { title: "In logo miễn phí", text: "Logo doanh nghiệp in đồng bộ trên thiệp và phong bao lì xì." },
      { title: "Hoá đơn VAT", text: "Xuất đầy đủ cho đơn hàng cơ quan, doanh nghiệp." },
      { title: "Thiệp viết tay", text: "Viết lời chúc riêng cho từng người nhận." },
      { title: "Giao nhiều địa chỉ", text: "Gửi toàn quốc, một đơn giao tới nhiều nơi." },
    ],
  },

  faqs: [
    {
      q: "Ô mai có dùng chất bảo quản không?",
      a: "Không. Ô mai Xưa Là xào tay theo công thức riêng và không dùng chất bảo quản.",
    },
    {
      q: "Trong hộp quà Tết có những món nào?",
      a: "Tuỳ set, Xưa Là chọn từ sấu giòn, kim quất, mơ gừng, mận cay, xoài sấy dẻo, long nhãn ôm sen, hạt điều vỏ lụa, kẹo lạc trà xanh và trà nõn tôm Thái Nguyên. Set nào cũng có trà.",
    },
    {
      q: "Hộp quà có kèm lì xì không?",
      a: "Có. Mỗi set quà Tết kèm thư cảm ơn, túi giấy Xưa Là và phong bao lì xì. Đơn doanh nghiệp được in logo lên thiệp và lì xì.",
    },
    {
      q: "Nên đặt quà Tết trước bao lâu?",
      a: "Càng sớm càng tốt, nhất là đơn doanh nghiệp cần in logo. Mỗi mùa Tết Xưa Là thường có ưu đãi cho khách đặt sớm và số set có hạn.",
    },
    {
      q: "Vì sao trên trang chưa ghi giá từng set?",
      a: "Giá thay đổi theo số lượng và chương trình ưu đãi đang chạy. Nhắn Xưa Là để nhận bảng giá mới nhất, kèm ưu đãi nếu bạn đặt sớm hoặc đặt nhiều.",
    },
  ],

  // Băng ưu đãi phía trên trang. Ví dụ (CẦN XÁC NHẬN với Xưa Là trước khi bật):
  // promo: { text: "Đặt trước 10/12 giảm thêm cho khách đặt sớm — nhắn Zalo để giữ suất." },
} satisfies Season;

/** Mùng 1 Tết Đinh Mùi (giờ Việt Nam) — dùng cho tờ lịch đếm ngày. */
export const tetDay = {
  iso: "2027-02-06T00:00:00+07:00",
  day: 6,
  month: "Tháng Hai",
  year: 2027,
  weekday: "Thứ Bảy",
  lunar: "Mùng 1 Tết Đinh Mùi",
};

/** Tờ giấy đỏ liệt kê các món trong hộp quà Tết. */
export const tetPantry = {
  title: "Trong hộp quà Tết",
  lead: "Mỗi set là một mâm quà quê thu nhỏ. Xưa Là chọn món cho từng set từ danh sách này:",
  items: [
    "Sấu giòn Hà Nội",
    "Kim quất",
    "Mơ gừng",
    "Mận cay",
    "Xoài sấy dẻo",
    "Long nhãn ôm sen",
    "Hạt điều vỏ lụa",
    "Kẹo lạc trà xanh ít ngọt",
    "Trà nõn tôm Thái Nguyên",
  ],
  notes: [
    { title: "Ô mai xào tay", text: "Sấu, mơ, mận, quất xào theo công thức riêng của Xưa Là, không chất bảo quản." },
    { title: "Hũ thuỷ tinh, giấy thủ công", text: "Từng món đựng hũ thuỷ tinh, gói giấy thủ công rồi xếp vào vali mây lót nhung." },
  ],
  /** Câu đối hai bên hero: vế trên đặt bên phải (theo lối treo câu đối truyền thống). */
  couplet: ["Gói lại Tết xưa", "Gửi trọn yêu thương"] as const,
  plaque: "Xuân Đinh Mùi",
};
