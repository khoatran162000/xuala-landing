/**
 * Hoạ tiết vẽ bằng SVG — hình minh hoạ gốc, không phải ảnh sản phẩm.
 * Các hoạ tiết dạng nền (giấy dó, nan mây, ngói, hồi văn, bóng làng quê, cành đào, mẹt tre) nằm ở public/hoa-tiet.
 */
import type { SVGProps } from "react";

const r1 = (n: number) => Math.round(n * 10) / 10;
const polar = (r: number, deg: number) => {
  const a = ((deg - 90) * Math.PI) / 180;
  return [r1(Math.cos(a) * r), r1(Math.sin(a) * r)] as const;
};

/* ------------------------------------------------------------------ Mặt trời trống đồng */

export function SunDrum({ className }: { className?: string }) {
  const rays = 14;
  const star = Array.from({ length: rays * 2 }, (_, i) => polar(i % 2 ? 20 : 74, (i * 180) / rays).join(" ")).join(" ");
  const dots = Array.from({ length: 26 }, (_, i) => polar(106, (i * 360) / 26));
  const ticks = Array.from({ length: 84 }, (_, i) => {
    const [x1, y1] = polar(134, (i * 360) / 84);
    const [x2, y2] = polar(146, (i * 360) / 84);
    return `M${x1} ${y1}L${x2} ${y2}`;
  }).join("");
  const teeth = Array.from({ length: 44 }, (_, i) => {
    const a = (i * 360) / 44;
    const [x1, y1] = polar(158, a);
    const [x2, y2] = polar(172, a + 360 / 88);
    const [x3, y3] = polar(158, a + 360 / 44);
    return `M${x1} ${y1}L${x2} ${y2}L${x3} ${y3}`;
  }).join("");
  return (
    <svg className={className} viewBox="-200 -200 400 400" aria-hidden="true">
      <circle r="198" className="sun-disc" />
      <g className="sun-lines" fill="none">
        <polygon points={star} className="sun-star" />
        <circle r="86" />
        <circle r="92" />
        {dots.map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="7" />
            <circle cx={x} cy={y} r="1.8" className="sun-dot" />
          </g>
        ))}
        <circle r="99" />
        <circle r="113" />
        <circle r="124" />
        <circle r="130" />
        <path d={ticks} />
        <circle r="150" />
        <path d={teeth} />
        <circle r="180" />
        <circle r="186" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ Đàn cò */

export function Storks({ className }: { className?: string }) {
  const birds: [number, number, number][] = [
    [0, 30, 1],
    [46, 12, 0.85],
    [86, 40, 0.92],
    [128, 4, 0.72],
    [170, 26, 0.66],
  ];
  return (
    <svg className={className} viewBox="-20 -20 230 90" aria-hidden="true">
      {birds.map(([x, y, s], i) => (
        <g key={i} transform={`translate(${x} ${y}) scale(${s})`} className="stork">
          {/* thân, cổ rụt, chân duỗi về sau */}
          <path d="M-14 2C-8 -1 4 -1 12 1C16 2 19 1 22 -1C20 3 16 5 12 5C6 6 -4 6 -12 4Z" />
          <path d="M-12 3L-28 7" strokeWidth="1.4" className="stork-leg" />
          <path className="wing" d="M-2 1C-6 -10 -14 -18 -26 -20C-18 -12 -12 -4 -8 2Z" />
          <path className="wing" d="M4 1C8 -9 16 -16 28 -18C20 -10 14 -3 10 2Z" />
        </g>
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ Đèn ông sao */

export function StarLantern({ className, hue = "do" }: { className?: string; hue?: "do" | "vang" | "hong" }) {
  const outer = Array.from({ length: 5 }, (_, i) => polar(78, i * 72));
  const inner = Array.from({ length: 5 }, (_, i) => polar(31, i * 72 + 36));
  const starPts = outer.flatMap((p, i) => [p, inner[i]]).map((p) => p.join(" ")).join(" ");
  const frame = [0, 2, 4, 1, 3, 0].map((i) => outer[i].join(" ")).join(" L");
  const id = `ds-${hue}`;
  const [lx, ly] = outer[4];
  const [rx, ry] = outer[1];
  const tassel = (x: number, y: number) =>
    Array.from({ length: 6 }, (_, k) => `M${x + (k - 2.5) * 2.2} ${y}q${(k - 2.5) * 1.5} 18 ${(k - 2.5) * 2} 34`).join("");
  return (
    <svg className={className} viewBox="-100 -100 200 300" aria-hidden="true">
      <defs>
        <radialGradient id={id} cx="0" cy="0" r="80" gradientUnits="userSpaceOnUse">
          <stop offset="0" className={`lt-core lt-core--${hue}`} />
          <stop offset=".45" className={`lt-mid lt-mid--${hue}`} />
          <stop offset="1" className={`lt-edge lt-edge--${hue}`} />
        </radialGradient>
        <radialGradient id={`${id}-glow`} cx="0" cy="0" r="98" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ffc864" stopOpacity=".55" />
          <stop offset=".5" stopColor="#ffb040" stopOpacity=".18" />
          <stop offset="1" stopColor="#ffb040" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle r="98" fill={`url(#${id}-glow)`} />
      <path d="M0 18V200" className="lt-stick" />
      <polygon points={starPts} fill={`url(#${id})`} className="lt-paper" />
      <path d={`M${frame}`} className="lt-frame" />
      <polygon points={starPts} className="lt-frame" />
      <path d={tassel(lx, ly)} className="lt-tassel" />
      <path d={tassel(rx, ry)} className="lt-tassel" />
    </svg>
  );
}

/* ------------------------------------------------------------------ Mây cuộn */

function spiral(cx: number, cy: number, r: number, dir = 1) {
  let d = `M${r1(cx + r)} ${cy}`;
  for (let i = 1; i <= 26; i++) {
    const t = i / 26;
    const a = dir * t * Math.PI * 2.1;
    const rr = r * (1 - t * 0.78);
    d += `L${r1(cx + Math.cos(a) * rr)} ${r1(cy + Math.sin(a) * rr)}`;
  }
  return d;
}

export function Cloud({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 320 110" aria-hidden="true">
      <path
        className="cloud-fill"
        d="M14 92C2 92 0 74 12 68C6 52 24 40 40 48C44 26 74 20 88 36C98 12 138 8 152 32C164 14 200 14 210 36C224 22 256 28 258 50C278 44 300 56 294 74C312 76 316 94 300 96Z"
      />
      <g className="cloud-line" fill="none">
        <path d="M14 92C2 92 0 74 12 68C6 52 24 40 40 48C44 26 74 20 88 36C98 12 138 8 152 32C164 14 200 14 210 36C224 22 256 28 258 50C278 44 300 56 294 74C312 76 316 94 300 96Z" />
        <path d={spiral(60, 60, 16, 1)} />
        <path d={spiral(122, 46, 20, -1)} />
        <path d={spiral(186, 52, 18, 1)} />
        <path d={spiral(250, 70, 14, -1)} />
        <path d="M40 80C70 74 96 84 120 78S170 70 196 80 248 76 270 84" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ Bánh Trung thu (nhìn từ trên) */

function scallop(r: number, lobes: number, depth: number) {
  const pts: string[] = [];
  for (let i = 0; i <= 168; i++) {
    const a = (i / 168) * Math.PI * 2;
    const rr = r + depth * Math.abs(Math.cos((a * lobes) / 2));
    pts.push(`${r1(Math.cos(a) * rr)} ${r1(Math.sin(a) * rr)}`);
  }
  return `M${pts.join("L")}Z`;
}

const PETALS = Array.from({ length: 8 }, (_, i) => i * 45);

function MooncakeSymbol({ kind }: { kind: "nuong" | "deo" }) {
  const g = `mc-${kind}`;
  const motif = (
    <>
      <circle r="62" />
      <circle r="55" />
      {PETALS.map((a) => (
        <ellipse key={a} cx="0" cy="-27" rx="9" ry="18" transform={`rotate(${a})`} />
      ))}
      <circle r="9" />
      <path d="M-4 0H4M0 -4V4" />
      {Array.from({ length: 16 }, (_, i) => {
        const [x, y] = polar(46, i * 22.5 + 11.25);
        return <circle key={i} cx={x} cy={y} r="2.4" />;
      })}
    </>
  );
  return (
    <symbol id={`banh-${kind}`} viewBox="-110 -110 220 220">
      <radialGradient id={g} cx="-.25" cy="-.3" r="1.1">
        {kind === "nuong" ? (
          <>
            <stop offset="0" stopColor="#f0be6c" />
            <stop offset=".5" stopColor="#d48d3c" />
            <stop offset="1" stopColor="#9a5420" />
          </>
        ) : (
          <>
            <stop offset="0" stopColor="#fffaf0" />
            <stop offset=".6" stopColor="#f1e8d6" />
            <stop offset="1" stopColor="#d6c9ae" />
          </>
        )}
      </radialGradient>
      <ellipse cx="6" cy="12" rx="96" ry="94" className="mc-shadow" />
      <path d={scallop(84, 14, 9)} fill={`url(#${g})`} className={`mc-body mc-body--${kind}`} />
      <g fill="none" strokeWidth="2.2" className={`mc-emboss-dark mc-emboss-dark--${kind}`} transform="translate(1.4 1.6)">
        {motif}
      </g>
      <g fill="none" strokeWidth="1.6" className={`mc-emboss-light mc-emboss-light--${kind}`} transform="translate(-1 -1)">
        {motif}
      </g>
      {kind === "nuong" && <ellipse cx="-32" cy="-38" rx="34" ry="20" className="mc-gloss" transform="rotate(-30 -32 -38)" />}
    </symbol>
  );
}

/** Đặt một lần trên trang, trước mọi <Mooncake />. */
export function MooncakeSymbols() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
      <MooncakeSymbol kind="nuong" />
      <MooncakeSymbol kind="deo" />
    </svg>
  );
}

export function Mooncake({ kind, className }: { kind: "nuong" | "deo"; className?: string }) {
  return (
    <svg className={className} viewBox="-110 -110 220 220" aria-hidden="true">
      <use href={`#banh-${kind}`} x="-110" y="-110" width="220" height="220" />
    </svg>
  );
}

/* ------------------------------------------------------------------ Quai mây của vali */

export function CaneHandle({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 420 110" aria-hidden="true">
      <path className="cane" d="M28 108 C 34 24, 112 10, 210 10 S 386 24, 392 108" />
      <path className="cane-edge" d="M37 108 C 44 34, 116 19, 210 19 S 376 34, 383 108" />
      <path className="cane-wrap" d="M28 108 C 34 24, 112 10, 210 10 S 386 24, 392 108" />
      <rect className="clasp" x="14" y="90" width="28" height="20" rx="4" />
      <rect className="clasp" x="378" y="90" width="28" height="20" rx="4" />
    </svg>
  );
}

/* ------------------------------------------------------------------ Bông lúa (đi cùng chữ Xưa Là) */

export function RiceStalk({ className }: { className?: string }) {
  const grains = [
    [10, 40, -40],
    [14, 32, -30],
    [19, 25, -25],
    [25, 19, -15],
    [31, 14, -5],
    [38, 11, 10],
    [22, 36, 30],
    [28, 29, 35],
    [34, 23, 40],
    [41, 18, 50],
  ];
  return (
    <svg className={className} viewBox="0 0 56 64" aria-hidden="true">
      <path d="M6 62C8 44 20 22 46 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {grains.map(([x, y, a], i) => (
        <ellipse key={i} cx={x} cy={y} rx="2.6" ry="5.2" transform={`rotate(${a} ${x} ${y})`} fill="currentColor" />
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ Biểu tượng nét mực (tem, mục giữ nguyên) */

type IP = SVGProps<SVGSVGElement>;
const ink = {
  viewBox: "0 0 64 64",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export const IconAmTra = (p: IP) => (
  <svg {...ink} {...p}>
    <path d="M14 30c0-7 7-11 16-11s16 4 16 11c0 9-6 16-16 16S14 39 14 30z" />
    <path d="M22 19.5c1-3 4.5-4.5 8-4.5s7 1.5 8 4.5" />
    <path d="M30 15v-3" />
    <circle cx="30" cy="10.5" r="1.8" />
    <path d="M14.5 27c-5-1-8 2-8 6 0 3 2 5 6 6" />
    <path d="M45.5 26l7-6c1-1 2.5 0 2 1.4L48 33" />
    <path d="M10 50h40" />
    <path d="M50 44c0 4 2 6 6 6s5-2 5-6z" />
    <path d="M20 31c2 2 6 3 10 3" opacity=".6" />
  </svg>
);

export const IconHuOMai = (p: IP) => (
  <svg {...ink} {...p}>
    <path d="M20 22c-5 3-7 9-7 15 0 9 5 15 19 15s19-6 19-15c0-6-2-12-7-15z" />
    <path d="M21 22h22v-5H21z" />
    <path d="M17 17c3-5 9-7 15-7s12 2 15 7" />
    <path d="M24 12l-3-4M40 12l3-4" />
    <circle cx="32" cy="37" r="7" />
    <path d="M29 37h6M32 34v6" opacity=".7" />
  </svg>
);

export const IconDenOngSao = (p: IP) => (
  <svg {...ink} {...p}>
    <path d="M32 6l6.2 13.6 14.8 1.6-11 10 3.1 14.6L32 38.4 18.9 45.8 22 31.2l-11-10 14.8-1.6z" />
    <path d="M32 6L22 31.2M32 6l10 25.2M11 21.2h42M18.9 45.8L42 31.2M45.1 45.8L22 31.2" opacity=".55" />
    <path d="M32 38.4V62" />
    <path d="M11 21.2c-1 5-1 9 0 13M53 21.2c1 5 1 9 0 13M9 22c-1 6-1 10 1 14M55 22c1 6 1 10-1 14" opacity=".7" />
  </svg>
);

export const IconLanMay = (p: IP) => (
  <svg {...ink} {...p}>
    <path d="M12 30h40l-4 22H16z" />
    <path d="M18 30c0-14 6-22 14-22s14 8 14 22" />
    <path d="M14 37h36M15 44h34" />
    <path d="M20 30l3 22M28 30l1 22M36 30l-1 22M44 30l-3 22" opacity=".6" />
  </svg>
);

export const IconHopMay = (p: IP) => (
  <svg {...ink} {...p}>
    <rect x="8" y="22" width="48" height="32" rx="5" />
    <path d="M22 22c0-8 4-12 10-12s10 4 10 12" />
    <path d="M8 31h48" />
    <path d="M14 22v32M20 22v32M26 31v23M32 31v23M38 31v23M44 22v32M50 22v32" opacity=".45" />
    <rect x="27" y="27" width="10" height="7" rx="1.5" />
  </svg>
);

export const IconBupTra = (p: IP) => (
  <svg {...ink} {...p}>
    <path d="M32 60V22" />
    <path d="M32 22c-3-6-2-12 0-16 2 4 3 10 0 16z" />
    <path d="M32 34c-8-1-15-6-18-14 9 0 15 5 18 14z" />
    <path d="M32 44c8-1 15-6 18-14-9 0-15 5-18 14z" />
    <path d="M18 23l10 8M46 33l-10 8" opacity=".55" />
  </svg>
);

export const IconLamTay = (p: IP) => (
  <svg {...ink} {...p}>
    <path d="M8 36c0 9 10 16 24 16s24-7 24-16z" />
    <path d="M56 38l6-2" />
    <ellipse cx="32" cy="36" rx="24" ry="5" />
    <circle cx="24" cy="35" r="2.5" />
    <circle cx="31" cy="34" r="2.5" />
    <circle cx="38" cy="35.5" r="2.5" />
    <path d="M40 30L54 8" />
    <path d="M38 33c-2-1-2.5-3-1.5-4.5s3-1.5 4.5-.5" />
    <path d="M22 26c1-3-1-5 0-8M30 24c1-3-1-5 0-8" opacity=".5" />
  </svg>
);

export const IconThiep = (p: IP) => (
  <svg {...ink} {...p}>
    <rect x="6" y="20" width="40" height="28" rx="2" />
    <path d="M6 22l20 14 20-14" />
    <path d="M44 42L58 10" />
    <path d="M58 10c2 1 2.5 3 1.5 4.5L46 46l-3 2 .5-3.5" />
    <path d="M14 54c6-2 12 2 18 0s10-3 14-1" opacity=".55" />
  </svg>
);

export const memoryIcons = {
  "am-tra": IconAmTra,
  "hu-o-mai": IconHuOMai,
  "den-ong-sao": IconDenOngSao,
  "lan-may": IconLanMay,
};

export const insideIcons = {
  "hop-may": IconHopMay,
  "bup-tra": IconBupTra,
  "lam-tay": IconLamTay,
  thiep: IconThiep,
};
