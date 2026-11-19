"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { activeSeason, seasonById, seasons, site } from "@/content/site";
import type { SeasonId } from "@/content/types";
import { CHOOSE_SET_EVENT, type ChooseSetDetail } from "@/lib/choose-set";

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "ok" } | { kind: "err"; message: string };

const BUSINESS_QUOTE = "Báo giá doanh nghiệp";

/**
 * Trên trang của một mùa (`season` có giá trị), form chỉ hiện set của mùa đó.
 * Ở trang chủ, khách chọn mùa trước rồi mới chọn set.
 */
export function ContactForm({ season }: { season?: SeasonId }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [seasonSel, setSeasonSel] = useState<SeasonId>(season ?? activeSeason);
  const [customerType, setCustomerType] = useState<"ca-nhan" | "doanh-nghiep">("ca-nhan");
  const [interest, setInterest] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const current = seasonById[seasonSel];
  const setOptions = current.sets.items.map((s) => `${current.name}: ${s.name}`);
  const notifyOption = current.status.kind === "ngoai-mua" ? current.status.notifyInterest : null;
  const known = [...setOptions, BUSINESS_QUOTE, ...(notifyOption ? [notifyOption] : [])];
  const interestIsCustom = interest !== "" && !known.includes(interest);

  useEffect(() => {
    const onChoose = (e: Event) => {
      const d = (e as CustomEvent<ChooseSetDetail>).detail;
      if (d.season && !season) setSeasonSel(d.season);
      setInterest(d.value);
      if (d.business) setCustomerType("doanh-nghiep");
      setTimeout(() => formRef.current?.querySelector<HTMLInputElement>("#f-name")?.focus({ preventScroll: true }), 450);
    };
    window.addEventListener(CHOOSE_SET_EVENT, onChoose);
    return () => window.removeEventListener(CHOOSE_SET_EVENT, onChoose);
  }, [season]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus({ kind: "sending" });
    setErrors({});
    try {
      const res = await fetch("/api/lien-he", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        message?: string;
        fieldErrors?: Record<string, string>;
      };
      if (res.ok && json.ok) {
        setStatus({ kind: "ok" });
        form.reset();
        setInterest("");
        setCustomerType("ca-nhan");
        return;
      }
      if (json.fieldErrors) {
        setErrors(json.fieldErrors);
        const first = Object.keys(json.fieldErrors)[0];
        form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      }
      setStatus({ kind: "err", message: json.message ?? "Chưa gửi được yêu cầu. Thử lại hoặc gọi hotline." });
    } catch {
      setStatus({ kind: "err", message: "Mất kết nối. Kiểm tra mạng rồi gửi lại, hoặc nhắn Zalo cho Xưa Là." });
    }
  }

  const err = (name: string) =>
    errors[name] ? (
      <span className="field-error" id={`e-${name}`}>
        {errors[name]}
      </span>
    ) : null;
  const a11y = (name: string) =>
    errors[name] ? { "aria-invalid": true as const, "aria-describedby": `e-${name}` } : {};

  return (
    <form ref={formRef} className="form" onSubmit={onSubmit} noValidate>
      {season ? (
        <input type="hidden" name="season" value={season} />
      ) : (
        <fieldset className="field field--full">
          <legend>Mùa quà</legend>
          <div className="radios">
            {seasons.map((s) => (
              <label className={`radio radio--${s.id}`} key={s.id}>
                <input
                  type="radio"
                  name="season"
                  value={s.id}
                  checked={seasonSel === s.id}
                  onChange={() => {
                    setSeasonSel(s.id);
                    if (interest !== BUSINESS_QUOTE) setInterest("");
                  }}
                />
                <span>{s.name}</span>
              </label>
            ))}
          </div>
        </fieldset>
      )}

      <fieldset className="field field--full">
        <legend>Bạn đặt quà cho</legend>
        <div className="radios">
          <label className="radio">
            <input
              type="radio"
              name="customerType"
              value="ca-nhan"
              checked={customerType === "ca-nhan"}
              onChange={() => setCustomerType("ca-nhan")}
            />
            <span>Gia đình, người thân</span>
          </label>
          <label className="radio">
            <input
              type="radio"
              name="customerType"
              value="doanh-nghiep"
              checked={customerType === "doanh-nghiep"}
              onChange={() => setCustomerType("doanh-nghiep")}
            />
            <span>Cơ quan, doanh nghiệp</span>
          </label>
        </div>
      </fieldset>

      <div className="field">
        <label htmlFor="f-name">Họ tên</label>
        <input id="f-name" name="name" autoComplete="name" required {...a11y("name")} />
        {err("name")}
      </div>
      <div className="field">
        <label htmlFor="f-phone">Số điện thoại</label>
        <input id="f-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required {...a11y("phone")} />
        {err("phone")}
      </div>

      {customerType === "doanh-nghiep" && (
        <div className="field field--full">
          <label htmlFor="f-company">Tên cơ quan, doanh nghiệp</label>
          <input id="f-company" name="company" autoComplete="organization" {...a11y("company")} />
          {err("company")}
        </div>
      )}

      <div className="field field--full">
        <label htmlFor="f-email">
          Email <span className="hint">(không bắt buộc, để nhận catalogue)</span>
        </label>
        <input id="f-email" name="email" type="email" autoComplete="email" {...a11y("email")} />
        {err("email")}
      </div>

      <div className="field field--full">
        <label htmlFor="f-interest">{current.name}: set quan tâm</label>
        <select id="f-interest" name="interest" value={interest} onChange={(e) => setInterest(e.target.value)}>
          <option value="">Chưa chọn, cần tư vấn</option>
          {interestIsCustom && <option value={interest}>{interest}</option>}
          {notifyOption && <option value={notifyOption}>{notifyOption}</option>}
          {current.sets.items.map((set) => (
            <option key={set.id} value={`${current.name}: ${set.name}`}>
              {set.name} ({set.count} {set.countLabel})
            </option>
          ))}
          <option value={BUSINESS_QUOTE}>{BUSINESS_QUOTE}</option>
        </select>
      </div>

      <div className="field">
        <label htmlFor="f-qty">Số lượng set</label>
        <input id="f-qty" name="quantity" inputMode="numeric" placeholder="Ví dụ 50" {...a11y("quantity")} />
      </div>
      <div className="field">
        <label htmlFor="f-date">Ngày cần giao</label>
        <input id="f-date" name="deliveryDate" type="date" {...a11y("deliveryDate")} />
      </div>

      <div className="field field--full">
        <label htmlFor="f-note">Ghi chú</label>
        <textarea
          id="f-note"
          name="note"
          placeholder="Ngân sách mỗi set, in logo, nội dung thiệp, giao nhiều địa chỉ…"
          {...a11y("note")}
        />
        {err("note")}
      </div>

      <div className="honeypot" aria-hidden="true">
        <label htmlFor="f-website">Website</label>
        <input id="f-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {status.kind === "ok" && (
        <p className="form-status form-status--ok" role="status">
          Đã gửi yêu cầu. Xưa Là sẽ gọi lại cho bạn qua số điện thoại vừa nhập. Cần gấp, gọi {site.contact.hotline}.
        </p>
      )}
      {status.kind === "err" && (
        <p className="form-status form-status--err" role="alert">
          {status.message}
        </p>
      )}

      <div className="form-foot">
        <button className="btn btn-son" type="submit" disabled={status.kind === "sending"}>
          {status.kind === "sending" ? "Đang gửi…" : "Gửi yêu cầu"}
        </button>
        <small>Xưa Là chỉ dùng số điện thoại để liên hệ về đơn quà của bạn.</small>
      </div>
    </form>
  );
}
