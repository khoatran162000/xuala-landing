"""Sinh các tệp hoạ tiết SVG cho landing Xưa Là.
Chạy: python3 scripts/gen-hoa-tiet.py public/hoa-tiet   (chỉ cần Python 3, không cần thư viện ngoài)
"""
import math
import random
import sys
from pathlib import Path

OUT = Path(sys.argv[1])
OUT.mkdir(parents=True, exist_ok=True)


PREC = [1]


def f(v):
    if PREC[0] == 0:
        return str(int(round(v)))
    s = f"{v:.1f}"
    return s[:-2] if s.endswith(".0") else s


# ---------------------------------------------------------------- giấy dó
def giay_do():
    rnd = random.Random(7)
    S = 420
    fibers = []
    for i in range(170):
        x, y = rnd.uniform(0, S), rnd.uniform(0, S)
        L = rnd.uniform(8, 46)
        a = rnd.uniform(0, math.pi * 2)
        bend = rnd.uniform(-0.6, 0.6)
        x2, y2 = x + math.cos(a) * L, y + math.sin(a) * L
        cx = (x + x2) / 2 + math.cos(a + math.pi / 2) * L * bend * 0.4
        cy = (y + y2) / 2 + math.sin(a + math.pi / 2) * L * bend * 0.4
        light = rnd.random() < 0.62
        col = "#fffaf0" if light else "#7a5a32"
        op = rnd.uniform(0.35, 0.7) if light else rnd.uniform(0.08, 0.18)
        w = rnd.uniform(0.5, 1.3)
        d = f"M{f(x)} {f(y)}Q{f(cx)} {f(cy)} {f(x2)} {f(y2)}"
        for dx in (-S, 0, S):
            for dy in (-S, 0, S):
                minx, maxx = min(x, x2, cx) + dx, max(x, x2, cx) + dx
                miny, maxy = min(y, y2, cy) + dy, max(y, y2, cy) + dy
                if maxx < 0 or minx > S or maxy < 0 or miny > S:
                    continue
                t = f' transform="translate({dx} {dy})"' if (dx or dy) else ""
                fibers.append(
                    f'<path d="{d}" stroke="{col}" stroke-opacity="{op:.2f}" stroke-width="{w:.2f}"{t}/>'
                )
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="{S}" height="{S}" viewBox="0 0 {S} {S}">
<filter id="mot" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.011" numOctaves="3" seed="11" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 0.45 0 0 0 0 0.32 0 0 0 0 0.15 0 0 0 0.55 -0.2"/></filter>
<filter id="grain" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="4" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 0.3 0 0 0 0 0.2 0 0 0 0 0.1 0 0 0 1.6 -0.78"/></filter>
<rect width="{S}" height="{S}" filter="url(#mot)"/>
<rect width="{S}" height="{S}" filter="url(#grain)" opacity=".55"/>
<g fill="none" stroke-linecap="round">{"".join(fibers)}</g>
</svg>'''
    (OUT / "giay-do.svg").write_text(svg)


# ---------------------------------------------------------------- mây đan (nan đan nong mốt)
def may_dan():
    # Ô lặp 24x24 gồm 4 ô 12x12: nan dọc nổi / nan ngang nổi xen kẽ (đan nong mốt). Chỉ có lớp sáng tối
    # trong suốt, màu nan lấy từ background-color của phần tử nên dùng chung cho đỏ, xanh ngọc, hồng.
    c = 12
    g = 1.6  # khe giữa hai nan
    parts = [
        '<defs>'
        '<linearGradient id="v" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".22"/>'
        '<stop offset=".3" stop-color="#fff" stop-opacity=".16"/><stop offset=".55" stop-color="#fff" stop-opacity=".05"/>'
        '<stop offset="1" stop-color="#000" stop-opacity=".2"/></linearGradient>'
        '<linearGradient id="h" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity=".2"/>'
        '<stop offset=".3" stop-color="#fff" stop-opacity=".18"/><stop offset=".55" stop-color="#fff" stop-opacity=".05"/>'
        '<stop offset="1" stop-color="#000" stop-opacity=".22"/></linearGradient>'
        '<linearGradient id="vd" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity=".22"/>'
        '<stop offset=".22" stop-color="#000" stop-opacity="0"/><stop offset=".78" stop-color="#000" stop-opacity="0"/>'
        '<stop offset="1" stop-color="#000" stop-opacity=".22"/></linearGradient>'
        '<linearGradient id="hd" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".22"/>'
        '<stop offset=".22" stop-color="#000" stop-opacity="0"/><stop offset=".78" stop-color="#000" stop-opacity="0"/>'
        '<stop offset="1" stop-color="#000" stop-opacity=".22"/></linearGradient>'
        '</defs>',
    ]
    h2 = g / 2
    for (ox, oy, vertical) in ((0, 0, True), (c, 0, False), (0, c, False), (c, c, True)):
        for (dx, dy) in ((0, 0), (c - h2, 0), (0, c - h2), (c - h2, c - h2)):
            parts.append(f'<rect x="{ox+dx}" y="{oy+dy}" width="{h2}" height="{h2}" fill="#000" fill-opacity=".55"/>')
        if vertical:
            for dx in (0, c - h2):
                parts.append(f'<rect x="{ox+dx}" y="{oy+h2}" width="{h2}" height="{c-g}" fill="#000" fill-opacity=".32"/>')
            parts.append(f'<rect x="{ox+h2}" y="{oy}" width="{c-g}" height="{c}" fill="url(#v)"/>')
            parts.append(f'<rect x="{ox+h2}" y="{oy}" width="{c-g}" height="{c}" fill="url(#vd)"/>')
        else:
            for dy in (0, c - h2):
                parts.append(f'<rect x="{ox+h2}" y="{oy+dy}" width="{c-g}" height="{h2}" fill="#000" fill-opacity=".32"/>')
            parts.append(f'<rect x="{ox}" y="{oy+h2}" width="{c}" height="{c-g}" fill="url(#h)"/>')
            parts.append(f'<rect x="{ox}" y="{oy+h2}" width="{c}" height="{c-g}" fill="url(#hd)"/>')
    svg = f'<svg xmlns="http://www.w3.org/2000/svg" width="{2*c}" height="{2*c}" viewBox="0 0 {2*c} {2*c}">{"".join(parts)}</svg>'
    (OUT / "may-dan.svg").write_text(svg)


# ---------------------------------------------------------------- ngói âm dương (diềm mái)
def ngoi():
    W, H = 44, 26
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">
<defs>
<linearGradient id="d" x1="0" x2="1"><stop offset="0" stop-color="#7d3a24"/><stop offset=".45" stop-color="#b8653f"/><stop offset="1" stop-color="#6e301d"/></linearGradient>
<linearGradient id="a" x1="0" x2="1"><stop offset="0" stop-color="#5c2817"/><stop offset=".5" stop-color="#874129"/><stop offset="1" stop-color="#5c2817"/></linearGradient>
</defs>
<rect width="{W}" height="5" fill="#5a2a1a"/>
<path d="M22 3 C22 16 28 20 33 20 C38 20 44 16 44 3 Z" fill="url(#a)"/>
<path d="M0 3 C0 18 6 24 11 24 C16 24 22 18 22 3 Z" fill="url(#d)"/>
<path d="M2.5 6 C3 16 7 21 11 21" fill="none" stroke="#e39a6f" stroke-opacity=".5" stroke-width="1.2"/>
<path d="M22 3 C22 18 16 24 11 24 C6 24 0 18 0 3" fill="none" stroke="#3d170c" stroke-opacity=".5" stroke-width=".8"/>
</svg>'''
    (OUT / "ngoi.svg").write_text(svg)


# ---------------------------------------------------------------- hồi văn (viền chữ T lồng)
def hoi_van():
    # một đơn vị 24 x 16, nét đơn liên tục: đường chân + móc xoắn vuông
    d = "M0 14.5H3V2H21V11H9V6H16"
    d2 = "M16 6V8.5"
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="24" height="17" viewBox="0 0 24 17">
<path d="M0 15.5H24" stroke="#000" stroke-width="1.6" fill="none"/>
<path d="M3 15.5V2.5H21V11.5H8.5V6H15.5V8.5" stroke="#000" stroke-width="1.6" fill="none" stroke-linejoin="miter" stroke-linecap="square"/>
</svg>'''
    (OUT / "hoi-van.svg").write_text(svg)


# ---------------------------------------------------------------- mẹt tre tròn
def met_tre():
    S = 600
    cx = cy = S / 2
    rings = []
    step = 13
    r = 22
    i = 0
    while r < 262:
        n = max(16, int(round(2 * math.pi * r / 15)))
        n += n % 2
        seg = 2 * math.pi * r / n
        dark = "#9b7337" if i % 2 else "#b88d4b"
        rings.append(
            f'<circle cx="{cx}" cy="{cy}" r="{f(r)}" fill="none" stroke="{dark}" stroke-opacity=".32" '
            f'stroke-width="{step-1.2}" stroke-dasharray="{seg:.2f} {seg:.2f}" stroke-dashoffset="{(seg if i%2 else 0):.2f}"/>'
        )
        r += step
        i += 1
    # nẹp vành: bó tre cuốn mây
    rim_r = 274
    n = 150
    seg = 2 * math.pi * rim_r / n
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="{S}" height="{S}" viewBox="0 0 {S} {S}">
<defs>
<radialGradient id="mat" cx=".45" cy=".42" r=".6"><stop offset="0" stop-color="#e6c88c"/><stop offset=".7" stop-color="#d2ad69"/><stop offset="1" stop-color="#b98f4c"/></radialGradient>
<radialGradient id="toi" cx=".5" cy=".5" r=".5"><stop offset=".75" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#3b2208" stop-opacity=".35"/></radialGradient>
</defs>
<circle cx="{cx}" cy="{cy}" r="268" fill="url(#mat)"/>
{"".join(rings)}
<circle cx="{cx}" cy="{cy}" r="16" fill="#a57a3c" fill-opacity=".7"/>
<circle cx="{cx}" cy="{cy}" r="268" fill="url(#toi)"/>
<circle cx="{cx}" cy="{cy}" r="{rim_r}" fill="none" stroke="#8a6230" stroke-width="22"/>
<circle cx="{cx}" cy="{cy}" r="{rim_r}" fill="none" stroke="#c99d58" stroke-width="18" stroke-dasharray="{seg*0.62:.2f} {seg*0.38:.2f}"/>
<circle cx="{cx}" cy="{cy}" r="{rim_r-6}" fill="none" stroke="#f0d9a6" stroke-opacity=".5" stroke-width="2" stroke-dasharray="{seg*0.62:.2f} {seg*0.38:.2f}"/>
</svg>'''
    (OUT / "met-tre.svg").write_text(svg)


# ---------------------------------------------------------------- bóng làng quê
def leaf_path(x, y, ang, L, W):
    # lá tre: hình thoi thuôn
    ca, sa = math.cos(ang), math.sin(ang)
    tx, ty = x + ca * L, y + sa * L
    mx, my = x + ca * L * 0.42, y + sa * L * 0.42
    px, py = -sa * W / 2, ca * W / 2
    return f"M{f(x)} {f(y)}Q{f(mx+px)} {f(my+py)} {f(tx)} {f(ty)}Q{f(mx-px)} {f(my-py)} {f(x)} {f(y)}Z"


def bamboo_grove(rnd, x0, width, base_y, hmin, hmax, n):
    out = []
    for k in range(n):
        t = (k + rnd.uniform(-0.3, 0.3)) / max(1, n - 1)
        bx = x0 + width * t
        side = (t - 0.5) * 2  # -1 .. 1
        h = rnd.uniform(hmin, hmax) * (1 - abs(side) * 0.28)
        lean = side * rnd.uniform(40, 90) + rnd.uniform(-15, 15)
        # đỉnh rủ xuống
        tx, ty = bx + lean, base_y - h
        cx1, cy1 = bx + lean * 0.1, base_y - h * 0.6
        droop = (1 if lean >= 0 else -1) * rnd.uniform(18, 40)
        ex, ey = tx + droop, ty + rnd.uniform(14, 30)
        w0, w1 = rnd.uniform(3.2, 4.6), 1.0
        # thân: cong bậc 2 (gốc -> ngọn) rồi rủ (ngọn -> chóp)
        out.append(
            f'<path d="M{f(bx-w0/2)} {base_y}Q{f(cx1-w0/3)} {f(cy1)} {f(tx-w1/2)} {f(ty)}'
            f'Q{f(tx+droop*0.5)} {f(ty-6)} {f(ex)} {f(ey)}Q{f(tx+droop*0.45)} {f(ty-2)} {f(tx+w1/2)} {f(ty+1)}'
            f'Q{f(cx1+w0/3)} {f(cy1)} {f(bx+w0/2)} {base_y}Z"/>'
        )

        # lá: dọc phần trên thân và đoạn rủ
        def pt(s):
            # điểm trên đường cong thân
            if s <= 1:
                u = s
                x = (1 - u) ** 2 * bx + 2 * (1 - u) * u * cx1 + u * u * tx
                y = (1 - u) ** 2 * base_y + 2 * (1 - u) * u * cy1 + u * u * ty
            else:
                u = s - 1
                qx, qy = tx + droop * 0.5, ty - 6
                x = (1 - u) ** 2 * tx + 2 * (1 - u) * u * qx + u * u * ex
                y = (1 - u) ** 2 * ty + 2 * (1 - u) * u * qy + u * u * ey
            return x, y

        nleaf = int(h * 0.3)
        for j in range(nleaf):
            s = rnd.uniform(0.42, 1.95)
            x, y = pt(s)
            dirn = rnd.choice((-1, 1))
            # nhánh con ngắn
            bl = rnd.uniform(4, 22) * (0.6 + s * 0.35)
            ba = (math.pi / 2 + dirn * rnd.uniform(0.6, 1.3)) if s < 1.2 else rnd.uniform(0.2, math.pi - 0.2)
            ba = -ba if s < 1.2 else ba  # lá trên thân hướng lên/ngang, lá chóp rủ xuống
            ex2, ey2 = x + math.cos(ba) * bl, y + math.sin(ba) * bl
            la = math.pi / 2 + dirn * rnd.uniform(0.15, 1.1) + rnd.uniform(-0.25, 0.25)
            L = rnd.uniform(11, 19)
            out.append(f'<path d="{leaf_path(ex2, ey2, la, L, rnd.uniform(2.8, 4))}"/>')
            if rnd.random() < 0.55:
                out.append(f'<path d="{leaf_path(ex2, ey2, la + dirn*rnd.uniform(0.3,0.7), L*0.9, 2.6)}"/>')
            if bl > 8:
                out.append(f'<path d="M{f(x)} {f(y)}L{f(ex2)} {f(ey2)}" stroke="#000" stroke-width=".9" fill="none"/>')
    return out


def cau_tree(rnd, x, base_y, h):
    # cây cau: thân mảnh thẳng, tán lá xoè
    lean = rnd.uniform(-8, 8)
    tx, ty = x + lean, base_y - h
    out = [
        f'<path d="M{f(x-2.6)} {base_y}Q{f(x+lean*0.3-2)} {f(base_y-h*0.5)} {f(tx-1.4)} {f(ty)}'
        f'L{f(tx+1.4)} {f(ty)}Q{f(x+lean*0.3+2)} {f(base_y-h*0.5)} {f(x+2.6)} {base_y}Z"/>'
    ]
    for k in range(9):
        a = math.pi + k * math.pi / 8 + rnd.uniform(-0.1, 0.1)  # xoè từ trái qua phải
        L = rnd.uniform(34, 46)
        ex, ey = tx + math.cos(a) * L, ty + math.sin(a) * L * 0.55 + L * 0.42
        qx, qy = tx + math.cos(a) * L * 0.55, ty + math.sin(a) * L * 0.7 - 6
        out.append(f'<path d="M{f(tx)} {f(ty)}Q{f(qx)} {f(qy)} {f(ex)} {f(ey)}" stroke="#000" stroke-width="2" fill="none" stroke-linecap="round"/>')
        # lá chét
        for s in (0.35, 0.5, 0.65, 0.8, 0.92):
            px = (1 - s) ** 2 * tx + 2 * (1 - s) * s * qx + s * s * ex
            py = (1 - s) ** 2 * ty + 2 * (1 - s) * s * qy + s * s * ey
            out.append(f'<path d="{leaf_path(px, py, math.pi/2 + rnd.uniform(-0.4,0.4), 10*(1.1-s*0.5), 2.2)}"/>')
    # buồng cau
    out.append(f'<ellipse cx="{f(tx+2)}" cy="{f(ty+9)}" rx="4" ry="6"/>')
    return out


def banyan(rnd, x, base_y, scale=1.0):
    out = []
    k = scale
    # thân chính + hai trụ rễ phụ đã hoá thân
    out.append(
        f'<path d="M{f(x-46*k)} {base_y}C{f(x-24*k)} {f(base_y-4*k)} {f(x-17*k)} {f(base_y-22*k)} {f(x-15*k)} {f(base_y-60*k)}'
        f'C{f(x-14*k)} {f(base_y-86*k)} {f(x-24*k)} {f(base_y-104*k)} {f(x-44*k)} {f(base_y-122*k)}L{f(x-30*k)} {f(base_y-130*k)}'
        f'C{f(x-14*k)} {f(base_y-114*k)} {f(x-4*k)} {f(base_y-112*k)} {f(x+6*k)} {f(base_y-132*k)}L{f(x+22*k)} {f(base_y-130*k)}'
        f'C{f(x+16*k)} {f(base_y-110*k)} {f(x+26*k)} {f(base_y-106*k)} {f(x+50*k)} {f(base_y-126*k)}L{f(x+58*k)} {f(base_y-116*k)}'
        f'C{f(x+30*k)} {f(base_y-96*k)} {f(x+15*k)} {f(base_y-84*k)} {f(x+16*k)} {f(base_y-58*k)}'
        f'C{f(x+18*k)} {f(base_y-22*k)} {f(x+26*k)} {f(base_y-4*k)} {f(x+50*k)} {base_y}Z"/>'
    )
    for s_, dx in ((-1, 70), (1, 84)):
        px = x + s_ * dx * k
        out.append(
            f'<path d="M{f(px-5*k)} {base_y}C{f(px-3*k)} {f(base_y-50*k)} {f(px-3*k)} {f(base_y-90*k)} {f(px-2*k)} {f(base_y-128*k)}'
            f'L{f(px+3*k)} {f(base_y-128*k)}C{f(px+3*k)} {f(base_y-90*k)} {f(px+4*k)} {f(base_y-50*k)} {f(px+6*k)} {base_y}Z"/>'
        )
    cx, cy = x + 4 * k, base_y - 158 * k
    RX, RY = 165 * k, 62 * k

    def inside(px, py):
        ux, uy = (px - cx) / RX, (py - cy) / RY
        if uy > 0:
            uy *= 1.5  # đáy tán phẳng hơn
        return ux * ux + uy * uy

    # lõi tán
    for i in range(46):
        a = rnd.uniform(0, math.pi * 2)
        rr = rnd.uniform(0, 0.78) ** 0.7
        px, py = cx + math.cos(a) * rr * RX, cy + math.sin(a) * rr * RY * (0.7 if math.sin(a) > 0 else 1)
        out.append(f'<circle cx="{f(px)}" cy="{f(py)}" r="{f(rnd.uniform(22, 36)*k)}"/>')
    # mép tán: nhiều chùm lá nhỏ
    for i in range(260):
        a = rnd.uniform(0, math.pi * 2)
        rr = rnd.uniform(0.82, 1.04)
        px = cx + math.cos(a) * rr * RX
        py = cy + math.sin(a) * rr * RY * (0.66 if math.sin(a) > 0 else 1)
        r = rnd.uniform(3.5, 8.5) * k
        out.append(f'<circle cx="{f(px)}" cy="{f(py)}" r="{f(r)}"/>')
    # rễ phụ buông
    for i in range(22):
        rx = cx + rnd.uniform(-RX * 0.85, RX * 0.85)
        if abs(rx - x) < 30 * k:
            continue
        top = cy + RY * 0.45
        bot = top + rnd.uniform(18, 70) * k
        out.append(
            f'<path d="M{f(rx)} {f(top)}Q{f(rx+rnd.uniform(-4,4))} {f((top+bot)/2)} {f(rx+rnd.uniform(-3,3))} {f(bot)}" '
            f'stroke="#000" stroke-width="{f(rnd.uniform(1,1.8)*k)}" fill="none"/>'
        )
    return out


def dinh_lang(x, base_y):
    """Mái đình hai tầng tám mái, đầu đao cong vút. x là tâm."""
    out = []
    # nền bậc
    out.append(f'<rect x="{x-170}" y="{base_y-12}" width="340" height="12"/>')
    out.append(f'<rect x="{x-150}" y="{base_y-20}" width="300" height="9"/>')
    # cột
    for i in range(7):
        cxp = x - 126 + i * 42
        out.append(f'<rect x="{cxp-3.5}" y="{base_y-68}" width="7" height="50"/>')
    # xà ngang
    out.append(f'<rect x="{x-140}" y="{base_y-74}" width="280" height="8"/>')
    # mái dưới (đao cong ở hai đầu)
    y0 = base_y - 74
    out.append(
        f'<path d="M{x-150} {y0}'
        f'C{x-175} {y0+2} {x-196} {y0-6} {x-212} {y0-26}'      # đao trái vút lên
        f'C{x-206} {y0-24} {x-200} {y0-22} {x-194} {y0-22}'
        f'C{x-170} {y0-30} {x-140} {y0-44} {x-108} {y0-54}'      # mái dốc lõm
        f'L{x+108} {y0-54}'
        f'C{x+140} {y0-44} {x+170} {y0-30} {x+194} {y0-22}'
        f'C{x+200} {y0-22} {x+206} {y0-24} {x+212} {y0-26}'
        f'C{x+196} {y0-6} {x+175} {y0+2} {x+150} {y0}Z"/>'
    )
    # cổ diêm (tường ngắn giữa hai tầng mái) với ô chấn song
    y1 = y0 - 54
    out.append(f'<rect x="{x-96}" y="{y1-22}" width="192" height="24"/>')
    # mái trên
    out.append(
        f'<path d="M{x-104} {y1-20}'
        f'C{x-124} {y1-20} {x-140} {y1-28} {x-152} {y1-46}'
        f'C{x-146} {y1-44} {x-140} {y1-43} {x-134} {y1-44}'
        f'C{x-116} {y1-54} {x-96} {y1-70} {x-74} {y1-80}'
        f'L{x+74} {y1-80}'
        f'C{x+96} {y1-70} {x+116} {y1-54} {x+134} {y1-44}'
        f'C{x+140} {y1-43} {x+146} {y1-44} {x+152} {y1-46}'
        f'C{x+140} {y1-28} {x+124} {y1-20} {x+104} {y1-20}Z"/>'
    )
    # bờ nóc + con kìm cuộn hai đầu
    y2 = y1 - 80
    out.append(f'<rect x="{x-78}" y="{y2-8}" width="156" height="9" rx="2"/>')
    for s in (-1, 1):
        ex = x + s * 78
        out.append(
            f'<path d="M{ex} {y2-8}C{ex+s*10} {y2-10} {ex+s*14} {y2-20} {ex+s*8} {y2-27}'
            f'C{ex+s*3} {y2-31} {ex-s*4} {y2-26} {ex} {y2-21}C{ex+s*4} {y2-24} {ex+s*6} {y2-18} {ex} {y2-14}L{ex} {y2-8}Z"/>'
        )
    # hồ lô / mặt nguyệt giữa nóc
    out.append(f'<circle cx="{x}" cy="{y2-16}" r="7"/>')
    out.append(f'<rect x="{x-2}" y="{y2-30}" width="4" height="10"/>')
    out.append(f'<circle cx="{x}" cy="{y2-32}" r="3.5"/>')
    return out


def nha_tranh(x, base_y, w=80, h=34):
    roof_h = h * 0.95
    out = [
        f'<rect x="{x-w/2+6}" y="{base_y-h}" width="{w-12}" height="{h}"/>',
        f'<path d="M{f(x-w/2-10)} {f(base_y-h+4)}Q{f(x-w/2+4)} {f(base_y-h-roof_h*0.5)} {f(x-w*0.22)} {f(base_y-h-roof_h)}'
        f'L{f(x+w*0.22)} {f(base_y-h-roof_h)}Q{f(x+w/2-4)} {f(base_y-h-roof_h*0.5)} {f(x+w/2+10)} {f(base_y-h+4)}Z"/>',
    ]
    return out


def dong_rom(x, base_y, r=22):
    return [
        f'<path d="M{f(x-r)} {base_y}C{f(x-r)} {f(base_y-r*1.35)} {f(x-r*0.3)} {f(base_y-r*1.6)} {f(x)} {f(base_y-r*1.62)}'
        f'C{f(x+r*0.3)} {f(base_y-r*1.6)} {f(x+r)} {f(base_y-r*1.35)} {f(x+r)} {base_y}Z"/>',
        f'<rect x="{f(x-1.2)}" y="{f(base_y-r*2.2)}" width="2.4" height="{f(r*0.7)}"/>',
    ]


def lang_que():
    PREC[0] = 0
    rnd = random.Random(23)
    W, H = 1600, 300
    base = 270
    els = []
    # mặt đất nhấp nhô + bờ ruộng
    els.append(
        f'<path d="M0 {base+2}C200 {base-6} 420 {base+4} 640 {base-2}S1080 {base+5} 1300 {base-3}S1520 {base+2} 1600 {base-1}V{H}H0Z"/>'
    )
    els += bamboo_grove(rnd, 10, 250, base + 2, 150, 215, 13)
    els += dinh_lang(500, base)
    els += nha_tranh(720, base, 74, 30)
    els += dong_rom(790, base, 20)
    els += cau_tree(rnd, 838, base, 150)
    els += cau_tree(rnd, 872, base, 172)
    els += banyan(rnd, 1045, base)
    els += cau_tree(rnd, 1222, base, 160)
    els += nha_tranh(1290, base, 86, 32)
    els += dong_rom(1356, base, 18)
    els += bamboo_grove(rnd, 1380, 220, base + 2, 140, 200, 11)
    # bờ ruộng, mạ non phía trước
    for i in range(60):
        x = rnd.uniform(0, W)
        els.append(f'<path d="{leaf_path(x, base+8, -math.pi/2 + rnd.uniform(-0.4,0.4), rnd.uniform(6,12), 2)}"/>')
    svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" preserveAspectRatio="xMidYMax slice"><g fill="#000">{"".join(els)}</g></svg>'
    (OUT / "lang-que.svg").write_text(svg)
    PREC[0] = 1


# ---------------------------------------------------------------- cây đa trong trăng
def cay_da():
    rnd = random.Random(5)
    els = banyan(rnd, 160, 300, 0.85)
    els.append('<path d="M60 300C110 290 210 290 270 300V320H60Z"/>')
    # chú Cuội ngồi gốc đa: chỉ là một dáng ngồi giản lược
    els.append('<circle cx="236" cy="262" r="7"/>')
    els.append('<path d="M228 270C222 280 222 292 226 300H250C252 292 248 280 242 270Z"/>')
    svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 320"><g fill="#000">{"".join(els)}</g></svg>'
    (OUT / "cay-da.svg").write_text(svg)


# ---------------------------------------------------------------- cành đào
def canh_dao():
    rnd = random.Random(31)
    W, H = 980, 285
    branches = []
    flowers = []
    # nhánh chính: đi từ mép trái vào, uốn khúc
    def seg_path(pts, w0, w1):
        # dải có bề dày giảm dần dọc polyline
        left, right = [], []
        n = len(pts)
        for i, (x, y) in enumerate(pts):
            t = i / (n - 1)
            w = w0 + (w1 - w0) * t
            if i < n - 1:
                dx, dy = pts[i + 1][0] - x, pts[i + 1][1] - y
            else:
                dx, dy = x - pts[i - 1][0], y - pts[i - 1][1]
            L = math.hypot(dx, dy) or 1
            nx, ny = -dy / L, dx / L
            left.append((x + nx * w / 2, y + ny * w / 2))
            right.append((x - nx * w / 2, y - ny * w / 2))
        d = "M" + " L".join(f"{f(a)} {f(b)}" for a, b in left)
        d += " L" + " L".join(f"{f(a)} {f(b)}" for a, b in reversed(right)) + "Z"
        return d

    def wander(x, y, ang, L, steps, jitter, home=None):
        pts = [(x, y)]
        for i in range(steps):
            ang += rnd.uniform(-jitter, jitter)
            if home is not None:
                # kéo về hướng gốc để cành không trôi khỏi khung
                ang += (home - ang) * 0.35
                if y < 80:
                    ang += 0.14
                if y > 170:
                    ang -= 0.14
            x += math.cos(ang) * L / steps
            y += math.sin(ang) * L / steps
            pts.append((x, y))
        return pts, ang

    main, _ = wander(-20, 70, 0.22, 940, 26, 0.3, home=0.1)
    branches.append((main, 20, 3))
    tips = []
    # cành con
    for idx in (3, 6, 8, 11, 13, 16, 18, 21, 23):
        bx, by = main[idx]
        up = rnd.random() < 0.3
        ang = (-0.55 if up else 0.85) + rnd.uniform(-0.3, 0.3)
        L = rnd.uniform(90, 190) * (1 - idx / 40) * (0.55 if up else 1)
        sub, endang = wander(bx, by, ang, L, 9, 0.35)
        w0 = max(3.5, 15 * (1 - idx / 26))
        branches.append((sub, w0, 1.6))
        tips.append(sub)
        if rnd.random() < 0.7:
            k = rnd.randint(3, 6)
            sb, _ = wander(sub[k][0], sub[k][1], endang + rnd.choice((-0.9, 0.9)), L * 0.45, 5, 0.3)
            branches.append((sb, w0 * 0.5, 1.2))
            tips.append(sb)
    tips.append(main[12:])

    # hoa, nụ, lá non dọc cành con
    def blossom(x, y, s, rot, kind):
        flowers.append(f'<use href="#{kind}" transform="translate({f(x)} {f(y)}) rotate({rot:.0f}) scale({s:.2f})"/>')

    for tip in tips:
        for i, (x, y) in enumerate(tip):
            if i < 2:
                continue
            r = rnd.random()
            if r < 0.34:
                blossom(x + rnd.uniform(-6, 6), y + rnd.uniform(-6, 6), rnd.uniform(0.75, 1.15), rnd.uniform(0, 360), "hoa")
            elif r < 0.5:
                blossom(x, y, rnd.uniform(0.8, 1.1), rnd.uniform(-60, 60) + (0 if rnd.random() < .5 else 180), "hoa-nghieng")
            elif r < 0.68:
                blossom(x, y, rnd.uniform(0.8, 1.2), rnd.uniform(0, 360), "nu")
            elif r < 0.78:
                blossom(x, y, rnd.uniform(0.8, 1.1), rnd.uniform(0, 360), "la")
    for i, (x, y) in enumerate(main):
        if i > 4 and rnd.random() < 0.4:
            blossom(x + rnd.uniform(-8, 8), y + rnd.uniform(-8, 8), rnd.uniform(0.8, 1.1), rnd.uniform(0, 360), rnd.choice(["hoa", "nu", "hoa"]))

    petal = "M0 0C-7 -6 -10 -16 -6 -22C-3 -26 0 -24 0 -21C0 -24 3 -26 6 -22C10 -16 7 -6 0 0Z"
    petals = "".join(f'<path d="{petal}" transform="rotate({a})"/>' for a in range(0, 360, 72))
    stamens = "".join(
        f'<path d="M0 0L{f(math.cos(math.radians(a))*7)} {f(math.sin(math.radians(a))*7)}" stroke="#7a1f2e" stroke-width=".8"/>'
        f'<circle cx="{f(math.cos(math.radians(a))*7.6)}" cy="{f(math.sin(math.radians(a))*7.6)}" r="1.1" fill="#e9b949"/>'
        for a in range(0, 360, 30)
    )
    defs = f'''<defs>
<radialGradient id="ph" r="1" cx="0" cy="0" gradientUnits="userSpaceOnUse" gradientTransform="scale(24)"><stop offset="0" stop-color="#b8264a"/><stop offset=".35" stop-color="#e2587a"/><stop offset=".8" stop-color="#f6b2c2"/><stop offset="1" stop-color="#fbd6de"/></radialGradient>
<linearGradient id="nug" x1="0" x2="0" y1="-1" y2="1" gradientUnits="objectBoundingBox"><stop offset="0" stop-color="#e44f73"/><stop offset="1" stop-color="#a31f42"/></linearGradient>
<symbol id="hoa" overflow="visible"><g fill="url(#ph)" stroke="#c0395c" stroke-width=".5" stroke-opacity=".5">{petals}</g><circle r="3.6" fill="#8e1d36"/>{stamens}</symbol>
<symbol id="hoa-nghieng" overflow="visible"><g fill="url(#ph)" stroke="#c0395c" stroke-width=".5" stroke-opacity=".5"><path d="M0 0C-9 -4 -13 -14 -8 -19C-4 -22 -1 -18 0 -15C1 -18 4 -22 8 -19C13 -14 9 -4 0 0Z"/><path d="M0 0C-12 -1 -16 -9 -12 -13C-8 -15 -4 -10 -2 -8Z" opacity=".85"/><path d="M0 0C12 -1 16 -9 12 -13C8 -15 4 -10 2 -8Z" opacity=".85"/></g><path d="M-3 1C-2 4 2 4 3 1Z" fill="#5b3a22"/></symbol>
<symbol id="nu" overflow="visible"><ellipse cx="0" cy="-6" rx="4.2" ry="6.5" fill="url(#nug)"/><path d="M-4.2 -2C-3 2 3 2 4.2 -2C3 0 -3 0 -4.2 -2Z" fill="#5b3a22"/></symbol>
<symbol id="la" overflow="visible"><path d="M0 0C4 -6 4 -16 0 -24C-4 -16 -4 -6 0 0Z" fill="#6c8a3a"/><path d="M0 -2V-22" stroke="#4d6a28" stroke-width=".6"/></symbol>
<linearGradient id="vo" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#4a3428"/><stop offset=".55" stop-color="#2f2019"/><stop offset="1" stop-color="#1f1510"/></linearGradient>
</defs>'''
    bpaths = "".join(f'<path d="{seg_path(p, w0, w1)}"/>' for p, w0, w1 in branches)
    # địa y, mắt cành
    knots = "".join(
        f'<ellipse cx="{f(x)}" cy="{f(y+rnd.uniform(-2,2))}" rx="{f(rnd.uniform(2,5))}" ry="1.4" fill="#7c6a4e" opacity=".55"/>'
        for (x, y) in main[2:20] if rnd.random() < 0.6
    )
    svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}">{defs}<g fill="url(#vo)">{bpaths}</g>{knots}{"".join(flowers)}</svg>'
    (OUT / "canh-dao.svg").write_text(svg)


def dau_mask():
    # mặt nạ con dấu: phần lớn đặc, lốm đốm chỗ mực không ăn
    svg = '''<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120">
<filter id="f" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="2" seed="9" stitchTiles="stitch"/>
<feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 -11 0 0 0 7.6"/></filter>
<rect width="120" height="120" filter="url(#f)"/>
</svg>'''
    (OUT / "dau-mask.svg").write_text(svg)


dau_mask()
giay_do()
may_dan()
ngoi()
hoi_van()
met_tre()
lang_que()
cay_da()
canh_dao()
for p in sorted(OUT.glob("*.svg")):
    print(p.name, p.stat().st_size)
