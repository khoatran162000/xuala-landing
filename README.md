# Xưa Là — Landing page (bản 2: tách mùa, phong cách làng quê)

Ba trang, mỗi mùa quà một trang riêng:

| Trang | Đường dẫn | Nội dung |
| --- | --- | --- |
| Trang chủ | `/` | Thương hiệu, hai "cửa mùa" dẫn vào Tết / Trung thu, mục "Xưa là…", bốn điều giữ nguyên, câu chuyện, quà doanh nghiệp chung, hỏi đáp chung, form (khách chọn mùa trước) |
| Quà Tết | `/qua-tet` | Câu đối, cành đào, tờ lịch đếm ngày tới Tết Đinh Mùi, danh sách món, 4 set, ưu đãi doanh nghiệp mùa Tết, hỏi đáp Tết, form chỉ có set Tết |
| Quà Trung thu | `/qua-trung-thu` | Trời đêm, trăng cây đa, đèn ông sao, sáu vị bánh trên mẹt, 3 set, ưu đãi doanh nghiệp mùa Trung thu, hỏi đáp Trung thu, form chỉ có set Trung thu |

- Next.js 16 (App Router) + TypeScript, CSS thuần, font tự host: **Fraunces** (chữ chính) và **Charm** (thư pháp — chỉ dùng cho câu đối, thơ, tên hiệu), cả hai có đủ dấu tiếng Việt
- Form gửi về `/api/lien-he` kèm **mùa quà** (`tet` / `trung-thu`); email và Telegram ghi rõ mùa ở tiêu đề
- SEO: metadata riêng từng trang, JSON-LD (Store + FAQPage ở trang chủ; Breadcrumb + ItemList + FAQPage ở trang mùa), `sitemap.xml` có cả ba trang
- Tôn trọng "giảm chuyển động" (mặt trời mọc, đàn cò, đèn ông sao đung đưa đều tắt)

## Sửa nội dung

| File | Sửa gì |
| --- | --- |
| `content/qua-tet.ts` | Mọi thứ của trang Tết: set, ưu đãi, hỏi đáp, ngày Tết cho tờ lịch, câu đối, băng khuyến mãi |
| `content/qua-trung-thu.ts` | Mọi thứ của trang Trung thu, sáu vị bánh, trạng thái mùa |
| `content/site.ts` | Liên hệ, trang chủ, mục "Xưa là…", câu chuyện, quà doanh nghiệp chung, hỏi đáp chung, `activeSeason` |

**Đổi mùa đang bán:** sửa `activeSeason` trong `content/site.ts`, rồi đổi `status` của từng mùa:

```ts
status: { kind: "dang-ban", label: "Đang nhận đặt" }
// hoặc khi hết mùa:
status: { kind: "ngoai-mua", label: "Mùa sau: …", note: "…", notifyInterest: "… báo khi mở đặt" }
```

Ngoài mùa, trang đó tự đổi nút thành "Báo tôi khi mở đặt" và set đổi thành "Hỏi đặt trước".

**Băng khuyến mãi:** bỏ comment `promo` trong file của mùa (ví dụ ưu đãi đặt sớm, freeship mùng 1).

Các chỗ ghi `CẦN XÁC NHẬN` là thông tin Facebook chưa rõ — hỏi lại Xưa Là trước khi chạy thật:

- BST Tết 2027: tên set, thành phần, giá (hiện dùng tên set Tết Ất Tỵ)
- Mức chiết khấu Tết 2027 và Trung thu 2027 (hiện ghi theo Tết 2026 / Trung thu 2026)
- Thời điểm mở đặt Trung thu 2027
- Địa chỉ chính thức; ô mai và bánh tự làm hay đặt xưởng (dòng "Bếp Xưa Là" ở mục Câu chuyện)
- Lời văn mới viết cần Xưa Là duyệt: tiêu đề trang chủ, bốn con tem "Xưa là…"

Ảnh sản phẩm: xem `public/images/README.md`. Set chưa có ảnh sẽ hiện mặt vali nan đan vẽ sẵn.
Logo: đang dùng chữ "Xưa Là" font Charm + bông lúa vẽ lại; khi có file vector logo gốc thì thay trong `components/Header.tsx` và `components/Footer.tsx`.

## Hoạ tiết

Hoạ tiết nền nằm ở `public/hoa-tiet/` (giấy dó, nan mây đan, ngói âm dương, hồi văn, mẹt tre, bóng làng quê,
cành đào, cây đa trong trăng, mặt nạ con dấu). Tất cả sinh từ `scripts/gen-hoa-tiet.py` (Python 3, không cần thư viện):

```bash
cd xuala-landing && python3 scripts/gen-hoa-tiet.py public/hoa-tiet
```

Hoạ tiết vẽ thẳng trong React (mặt trời trống đồng, đàn cò, đèn ông sao, mây cuộn, bánh Trung thu, quai mây,
biểu tượng nét mực) nằm ở `components/motifs.tsx`. Bảng màu và mọi kiểu dáng ở `app/globals.css` (biến ở `:root`).

## Chạy thử trên máy

```bash
cd xuala-landing && npm install && npm run dev
```

Mở http://localhost:3000. Khi chưa cấu hình SMTP, yêu cầu gửi từ form vẫn được lưu ở `data/leads.jsonl`.

## Triển khai lên VPS (PM2 + Nginx)

```bash
cd /var/www/xuala-landing && cp .env.example .env && nano .env
cd /var/www/xuala-landing && npm ci && npm run build
cd /var/www/xuala-landing && pm2 start ecosystem.config.cjs && pm2 save
sudo cp /var/www/xuala-landing/deploy/nginx-xuala.conf /etc/nginx/sites-available/xuala.conf && sudo ln -s /etc/nginx/sites-available/xuala.conf /etc/nginx/sites-enabled/ && sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d xuala.vn -d www.xuala.vn
```

Cập nhật sau khi sửa nội dung:

```bash
cd /var/www/xuala-landing && git pull && npm ci && npm run build && pm2 reload xuala-landing
```

## Cấu trúc

```
app/                    layout, trang chủ, qua-tet/, qua-trung-thu/, API /api/lien-he, sitemap, robots, icon
components/             Header, Footer, Business, Faq, Contact, ContactForm, Seal, motifs (hoạ tiết SVG)
components/home/        HomeHero, SeasonDoors, Memories, Constants, Story
components/season/      TetHero, TetCalendar, TetPantry, MoonHero, Flavors, SetGrid, CrossSeason, PromoRibbon
content/                site.ts (chung), qua-tet.ts, qua-trung-thu.ts, types.ts
lib/                    schema form, gửi email/Telegram, giới hạn gửi, JSON-LD
public/hoa-tiet/        hoạ tiết nền SVG
scripts/                gen-hoa-tiet.py
deploy/                 cấu hình Nginx mẫu
```
