import { z } from "zod";

const phoneVN = /^(?:\+?84|0)(?:3|5|7|8|9)\d{8}$/;

export const leadSchema = z
  .object({
    name: z.string().trim().min(2, "Nhập họ tên của bạn").max(80),
    phone: z
      .string()
      .trim()
      .transform((v) => v.replace(/[\s.-]/g, ""))
      .refine((v) => phoneVN.test(v), "Số điện thoại chưa đúng, ví dụ 0912 345 678"),
    email: z.union([z.literal(""), z.string().trim().email("Email chưa đúng định dạng").max(120)]),
    customerType: z.enum(["ca-nhan", "doanh-nghiep"]),
    season: z.enum(["tet", "trung-thu"], { message: "Chọn mùa quà" }),
    company: z.string().trim().max(120).optional().default(""),
    interest: z.string().trim().max(120).optional().default(""),
    quantity: z.string().trim().max(20).optional().default(""),
    deliveryDate: z.string().trim().max(20).optional().default(""),
    note: z.string().trim().max(1500).optional().default(""),
    /** Ô ẩn chống spam: người thật không điền. */
    website: z.string().max(0).optional().default(""),
  })
  .superRefine((v, ctx) => {
    if (v.customerType === "doanh-nghiep" && v.company.length < 2) {
      ctx.addIssue({ code: "custom", path: ["company"], message: "Nhập tên cơ quan, doanh nghiệp" });
    }
  });

export type Lead = z.infer<typeof leadSchema>;

export const seasonLabel: Record<Lead["season"], string> = {
  tet: "Quà Tết",
  "trung-thu": "Quà Trung thu",
};

export const customerTypeLabel: Record<Lead["customerType"], string> = {
  "ca-nhan": "Cá nhân",
  "doanh-nghiep": "Cơ quan, doanh nghiệp",
};
