import { NextResponse, type NextRequest } from "next/server";
import { leadSchema } from "@/lib/lead";
import { handleLead } from "@/lib/notify";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-real-ip") ?? req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  const tooMany = () =>
    NextResponse.json(
      { ok: false, message: "Bạn đã gửi nhiều yêu cầu liên tiếp. Thử lại sau ít phút hoặc gọi hotline." },
      { status: 429 },
    );

  // Chặn dội request; gõ sai rồi sửa lại vẫn thoải mái.
  if (!rateLimit(`all:${ip}`, 30)) return tooMany();

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Dữ liệu gửi lên không hợp lệ." }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (key === "website") {
        // Bot điền ô ẩn: trả về như thành công để không lộ cơ chế lọc.
        return NextResponse.json({ ok: true });
      }
      fieldErrors[key] ??= issue.message;
    }
    return NextResponse.json({ ok: false, message: "Kiểm tra lại các ô được đánh dấu.", fieldErrors }, { status: 422 });
  }

  // Tối đa 5 yêu cầu hợp lệ mỗi 10 phút cho một IP.
  if (!rateLimit(`lead:${ip}`, 5)) return tooMany();

  try {
    await handleLead(parsed.data, ip);
  } catch (err) {
    console.error("[lead] không lưu được yêu cầu:", err);
    return NextResponse.json(
      { ok: false, message: "Chưa gửi được yêu cầu. Vui lòng gọi hoặc nhắn Zalo cho Xưa Là." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
