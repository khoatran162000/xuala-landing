"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { IconChat, IconClose, IconMenu } from "./icons";
import { RiceStalk } from "./motifs";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = (usePathname() ?? "/").replace(/(.)\/$/, "$1");
  const onHome = pathname === "/";

  const links = [
    { href: "/qua-tet", label: "Quà Tết", page: true },
    { href: "/qua-trung-thu", label: "Quà Trung thu", page: true },
    // Trang nào cũng có mục doanh nghiệp và form đặt quà của riêng nó.
    { href: "#doanh-nghiep", label: "Doanh nghiệp", page: false },
    { href: onHome ? "#cau-chuyen" : "/#cau-chuyen", label: "Câu chuyện", page: false },
    { href: "#dat-qua", label: "Liên hệ", page: false },
  ];

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="header">
      <div className="wrap header-inner">
        <Link className="brand" href="/" aria-label={`${site.name}, trang chủ`}>
          <RiceStalk className="brand-lua" />
          <span className="wordmark">{site.name}</span>
          <span className="brand-slogan">{site.slogan}</span>
        </Link>

        <button
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="main-nav"
          aria-label={open ? "Đóng menu" : "Mở menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <IconClose /> : <IconMenu />}
        </button>

        <nav id="main-nav" className="nav" data-open={open} aria-label="Điều hướng chính">
          {links.map((l) =>
            l.page ? (
              <Link
                key={l.href}
                href={l.href}
                className={`nav-season nav-season--${l.href.slice(1)}`}
                aria-current={pathname === l.href ? "page" : undefined}
              >
                {l.label}
              </Link>
            ) : l.href.startsWith("/") ? (
              <Link key={l.label} href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </Link>
            ) : (
              <a key={l.label} href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </a>
            ),
          )}
          <a className="btn btn-son btn-sm nav-zalo" href={site.contact.zalo} target="_blank" rel="noopener">
            <IconChat /> Nhắn Zalo
          </a>
        </nav>

        <a className="btn btn-son btn-sm header-cta" href={site.contact.zalo} target="_blank" rel="noopener">
          <IconChat /> Nhắn Zalo
        </a>
      </div>
    </header>
  );
}
