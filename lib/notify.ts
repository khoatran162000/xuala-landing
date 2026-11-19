import "server-only";
import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";
import nodemailer from "nodemailer";
import { customerTypeLabel, seasonLabel, type Lead } from "./lead";

type Stored = Omit<Lead, "website"> & { receivedAt: string; ip: string };

function toLines(l: Stored) {
  return [
    ["Thời gian", new Date(l.receivedAt).toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" })],
    ["Họ tên", l.name],
    ["Điện thoại", l.phone],
    ["Email", l.email || "—"],
    ["Mùa quà", seasonLabel[l.season]],
    ["Loại khách", customerTypeLabel[l.customerType]],
    ["Đơn vị", l.company || "—"],
    ["Quan tâm", l.interest || "—"],
    ["Số lượng", l.quantity || "—"],
    ["Ngày cần giao", l.deliveryDate || "—"],
    ["Ghi chú", l.note || "—"],
  ] as const;
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/** Luôn ghi lại yêu cầu vào file JSONL để không mất khách nếu email lỗi. */
async function saveToFile(l: Stored) {
  const dir = process.env.LEADS_DIR || path.join(process.cwd(), "data");
  await mkdir(dir, { recursive: true });
  await appendFile(path.join(dir, "leads.jsonl"), JSON.stringify(l) + "\n", "utf8");
}

async function sendEmail(l: Stored) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_TO, MAIL_FROM } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !MAIL_TO) return false;

  const port = Number(SMTP_PORT || 465);
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const rows = toLines(l)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px;color:#6b5446;white-space:nowrap">${k}</td><td style="padding:6px 12px">${escapeHtml(v)}</td></tr>`,
    )
    .join("");

  await transporter.sendMail({
    from: MAIL_FROM || `Website Xưa Là <${SMTP_USER}>`,
    to: MAIL_TO,
    replyTo: l.email || undefined,
    subject: `[Website · ${seasonLabel[l.season]}] ${customerTypeLabel[l.customerType]} ${l.name} — ${l.phone}${l.interest ? ` — ${l.interest}` : ""}`,
    text: toLines(l)
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n"),
    html: `<table style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">${rows}</table>`,
  });
  return true;
}

async function sendTelegram(l: Stored) {
  const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } = process.env;
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return false;
  const text = ["Yêu cầu mới từ website Xưa Là", ...toLines(l).map(([k, v]) => `${k}: ${v}`)].join("\n");
  const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text }),
  });
  return res.ok;
}

export async function handleLead(lead: Lead, ip: string) {
  const { website: _hp, ...rest } = lead;
  const stored: Stored = { ...rest, receivedAt: new Date().toISOString(), ip };

  await saveToFile(stored);

  const results = await Promise.allSettled([sendEmail(stored), sendTelegram(stored)]);
  results.forEach((r, i) => {
    if (r.status === "rejected") console.error(`[lead] gửi ${i === 0 ? "email" : "telegram"} lỗi:`, r.reason);
  });
  const delivered = results.some((r) => r.status === "fulfilled" && r.value === true);
  if (!delivered) console.warn("[lead] chưa cấu hình SMTP/Telegram — yêu cầu chỉ được lưu vào data/leads.jsonl");
}
