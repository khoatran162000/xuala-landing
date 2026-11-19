/**
 * Nội dung dùng chung: thương hiệu, liên hệ, trang chủ, quà doanh nghiệp, hỏi đáp chung.
 * Nội dung riêng từng mùa nằm ở content/qua-tet.ts và content/qua-trung-thu.ts.
 *
 * Nguồn: fanpage facebook.com/xualavietnam (đọc ngày 19/11/2026) và hồ sơ doanh nghiệp.
 * Những chỗ ghi "CẦN XÁC NHẬN" là thông tin Facebook chưa nói rõ — hỏi lại Xưa Là trước khi chạy thật.
 * Lời văn mục "Xưa là…" và tiêu đề trang chủ là bản viết mới — gửi Xưa Là duyệt.
 */
import { tet } from "./qua-tet";
import { trungThu } from "./qua-trung-thu";
import type { QA, Season, SeasonId } from "./types";

export const site = {
  name: "Xưa Là",
  slogan: "Vang xa hương mộc Việt",
  description:
    "Xưa Là — quà biếu truyền thống trong hộp mây tre đan: ô mai thủ công, trà nõn tôm Thái Nguyên, bánh Trung thu cổ truyền. Nhận đặt quà Tết, quà Trung thu cho gia đình và doanh nghiệp, giao toàn quốc.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://xuala.vn",
  contact: {
    hotline: "0353 207 216",
    hotlineRaw: "+84353207216",
    zalo: "https://zalo.me/0353207216",
    messenger: "https://m.me/xualavietnam",
    facebook: "https://www.facebook.com/xualavietnam",
    email: "xualavietnam@gmail.com",
    // CẦN XÁC NHẬN: fanpage ghi nhiều địa chỉ khác nhau theo mùa; đây là địa chỉ trên mục Giới thiệu.
    address: "332 Nguyễn Trãi, Thanh Xuân, Hà Nội",
    mapQuery: "332 Nguyễn Trãi, Thanh Xuân, Hà Nội",
  },
};

/** Thứ tự hiển thị hai mùa trên trang chủ: mùa đang bán đứng trước. */
export const seasons: Season[] = [tet, trungThu];
export const seasonById: Record<SeasonId, Season> = { tet, "trung-thu": trungThu };

/** Mùa đang bán — nút chính trên trang chủ và lựa chọn mặc định của form ở trang chủ. */
export const activeSeason: SeasonId = "tet";

export const home = {
  hero: {
    title: "Thức quà quê xưa trong hộp mây tre đan",
    lead: "Ô mai xào tay ngày Tết, bánh nướng bánh dẻo đêm rằm, chén trà nõn tôm Tân Cương — Xưa Là gói lại những vị quen của tuổi thơ để bạn biếu ông bà, cha mẹ, thầy cô và đối tác.",
  },
  seasonsTitle: "Hai mùa quà trong năm",
  seasonsLead: "Mỗi mùa Xưa Là làm một bộ sưu tập mới, với nhãn hộp và màu nan riêng.",
};

/** Mục "Xưa là…": mỗi con tem một mảnh ký ức, kèm thức quà gợi lại nó. */
export const memories: { icon: "am-tra" | "hu-o-mai" | "den-ong-sao" | "lan-may"; text: string; gift: string }[] = [
  { icon: "am-tra", text: "ấm trà ông pha sớm mồng Một, cả nhà ngồi quanh chiếu", gift: "Trà nõn tôm Tân Cương" },
  { icon: "hu-o-mai", text: "hũ ô mai bà cất trên nóc tủ, để dành đãi khách", gift: "Ô mai xào tay" },
  { icon: "den-ong-sao", text: "đêm rằm cầm đèn ông sao chạy khắp ngõ", gift: "Bánh Trung thu làm tay" },
  { icon: "lan-may", text: "chiếc làn mây mẹ xách đi chợ Tết về", gift: "Hộp mây tre Chương Mỹ" },
];

/** Bốn thứ giữ nguyên qua mọi mùa. */
export const inside = [
  {
    icon: "hop-may" as const,
    title: "Hộp mây tre đan",
    text: "Đan tay ở làng nghề Chương Mỹ, Hà Nội, lót nhung bên trong. Mở quà xong vẫn dùng lại được.",
  },
  {
    icon: "bup-tra" as const,
    title: "Trà nõn tôm Tân Cương",
    text: "Búp trà một tôm hai lá vùng Tân Cương, Thái Nguyên. Có trong mọi set quà, Tết cũng như Trung thu.",
  },
  {
    icon: "lam-tay" as const,
    title: "Làm tay từng mẻ",
    text: "Ô mai xào theo công thức riêng, không chất bảo quản. Bánh Trung thu và bọc bánh đều làm tay.",
  },
  {
    icon: "thiep" as const,
    title: "Thư cảm ơn, thiệp viết tay",
    text: "Set nào cũng kèm thư cảm ơn. Muốn gửi lời nhắn riêng, Xưa Là viết tay thiệp cho từng người nhận.",
  },
];

export const story = {
  title: "“Xưa” trong ký ức của mỗi người",
  poem: [
    "Là những ngày tràn đầy nắng và gió,",
    "là thoáng chút hương vị mứt bà làm,",
    "là chút vị ngọt của viên kẹo quê,",
    "là chút tình yêu gửi lại nơi Xưa ấy.",
  ],
  text: [
    "Xưa Là gom những thức quà quen của Tết và Trung thu ngày trước — ô mai, chén trà, chiếc bánh nướng — đặt vào chiếc hộp mây tre đan của người thợ làng nghề, để món quà biếu vừa đẹp vừa giữ được vị cũ.",
    "Không phô trương, không cầu kỳ — chỉ mong mỗi hộp quà là một lời chúc đủ đầy, an yên.",
  ],
  origins: [
    { place: "Chương Mỹ, Hà Nội", what: "hộp mây tre đan tay" },
    { place: "Tân Cương, Thái Nguyên", what: "trà nõn tôm" },
    { place: "Bếp Xưa Là, Hà Nội", what: "ô mai và bánh Trung thu làm tay" }, // CẦN XÁC NHẬN: tự làm hay đặt xưởng
  ],
  community: "Mùa Tết 2024, Xưa Là gửi quà tri ân diễn giả của chương trình “Tuồng Kể” cùng Nhà hát Tuồng Việt Nam.",
};

export const business = {
  title: "Quà cho cơ quan, doanh nghiệp",
  lead: "Xưa Là nhận đơn số lượng lớn cả hai mùa: quà tri ân nhân viên, khách hàng, đối tác và quà tặng sự kiện, hội nghị.",
  offers: [
    { title: "Chiết khấu theo số lượng", text: "Mức chiết khấu công bố theo từng mùa, gửi kèm báo giá." },
    { title: "Hoá đơn VAT", text: "Xuất đầy đủ cho đơn hàng cơ quan, doanh nghiệp." },
    { title: "In logo đồng bộ", text: "Logo doanh nghiệp in trên thiệp, lì xì, thư tri ân." },
    { title: "Thiệp viết tay", text: "Viết lời nhắn riêng cho từng người nhận." },
    { title: "Giao toàn quốc", text: "Gửi tận tay từng người, kể cả nhiều địa chỉ trong một đơn." },
  ],
  steps: [
    { title: "Gửi yêu cầu", text: "Số lượng, ngân sách mỗi set và ngày cần giao." },
    { title: "Nhận catalogue và báo giá", text: "Xưa Là gợi ý set phù hợp và gửi báo giá đã chiết khấu." },
    { title: "Duyệt mẫu", text: "Xác nhận mẫu in logo, nội dung thiệp, danh sách người nhận." },
    { title: "Đóng gói và giao", text: "Xưa Là đóng gói từng hộp và giao đúng hẹn." },
  ],
};

/** Hỏi đáp chung trên trang chủ. Câu hỏi riêng từng mùa nằm trong file của mùa đó. */
export const faqs: QA[] = [
  {
    q: "Đặt quà như thế nào?",
    a: "Nhắn Zalo hoặc Messenger cho Xưa Là, gọi hotline, hoặc gửi yêu cầu ở cuối trang. Xưa Là sẽ gửi ảnh, thành phần và báo giá từng set để bạn chọn.",
  },
  {
    q: "Xưa Là bán quà vào những mùa nào?",
    a: "Hai mùa mỗi năm: quà Tết mở đặt từ cuối tháng 11 đến sát Tết, quà Trung thu mở khoảng 6–7 tuần trước rằm tháng Tám. Mỗi mùa có trang riêng với bộ sưu tập của mùa đó.",
  },
  {
    q: "Doanh nghiệp đặt số lượng lớn được ưu đãi gì?",
    a: "Chiết khấu theo số lượng, xuất hoá đơn VAT, in logo lên thiệp và lì xì, thiệp viết tay và giao tới nhiều địa chỉ. Gửi yêu cầu kèm số lượng để nhận báo giá.",
  },
  {
    q: "Hộp mây tre có dùng lại được không?",
    a: "Được. Hộp đan tay ở làng nghề Chương Mỹ, lót nhung bên trong; mở quà xong có thể dùng đựng đồ, làm hộp trang trí.",
  },
  {
    q: "Xưa Là có giao hàng tỉnh không?",
    a: "Có, Xưa Là giao toàn quốc và có thể gửi quà tận tay người nhận theo địa chỉ bạn cung cấp.",
  },
];
