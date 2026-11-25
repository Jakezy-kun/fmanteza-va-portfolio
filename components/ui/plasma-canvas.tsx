"use client";

import { useEffect, useRef } from "react";

/* ---------- luminous plasma engine (low-res buffer, upscaled smooth) ---------- */

type RGB = [number, number, number];
export type PlasmaPreset = "aurora" | "ember" | "abyss";

export const PLASMA_PALETTES: Record<PlasmaPreset, { label: string; stops: RGB[]; swatch: string }> = {
  aurora: {
    label: "Aurora",
    stops: [
      [4, 6, 26],
      [37, 99, 235],
      [124, 58, 237],
      [217, 70, 239],
      [238, 240, 255],
    ],
    swatch: "from-blue-600 via-violet-600 to-fuchsia-500",
  },
  ember: {
    label: "Ember",
    stops: [
      [24, 6, 8],
      [190, 40, 40],
      [245, 120, 30],
      [252, 200, 90],
      [255, 246, 230],
    ],
    swatch: "from-red-700 via-orange-500 to-amber-300",
  },
  abyss: {
    label: "Abyss",
    stops: [
      [2, 10, 24],
      [14, 116, 144],
      [34, 211, 238],
      [150, 190, 255],
      [240, 249, 255],
    ],
    swatch: "from-cyan-600 via-sky-400 to-slate-100",
  },
};

// low-res plasma buffer — upscaling keeps it smooth & ethereal, and cheap
const PW = 168;
const PH = 96;

function buildLUT(stops: RGB[]): Uint8ClampedArray {
  const lut = new Uint8ClampedArray(256 * 3);
  const segs = stops.length - 1;
  for (let i = 0; i < 256; i++) {
    const t = (i / 255) * segs;
    const s = Math.min(segs - 1, Math.floor(t));
    const f = t - s;
    const a = stops[s];
    const b = stops[s + 1];
    lut[i * 3] = a[0] + (b[0] - a[0]) * f;
    lut[i * 3 + 1] = a[1] + (b[1] - a[1]) * f;
    lut[i * 3 + 2] = a[2] + (b[2] - a[2]) * f;
  }
  return lut;
}

interface PlasmaCanvasProps {
  preset?: PlasmaPreset;
  running?: boolean;
  /** Flow speed multiplier. */
  speed?: number;
  className?: string;
}

/**
 * Live plasma that fills its positioned parent. Follows the pointer/finger,
 * pauses offscreen, and draws a single still frame when paused or when the
 * visitor prefers reduced motion.
 */
export function PlasmaCanvas({ preset = "aurora", running = true, speed = 0.8, className = "" }: PlasmaCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef({
    t: 0,
    mx: 0.5,
    my: 0.45,
    tx: 0.5,
    ty: 0.45,
    running,
    speed,
    visible: true,
    reduced: false,
    lut: buildLUT(PLASMA_PALETTES[preset].stops),
    redraw: () => {},
  });

  // keep the mutable engine in sync (refs, so no re-subscribe churn)
  useEffect(() => {
    const eng = engineRef.current;
    eng.running = running;
    eng.speed = speed;
    eng.lut = buildLUT(PLASMA_PALETTES[preset].stops);
    eng.redraw();
  }, [running, speed, preset]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const eng = engineRef.current;
    eng.t = Math.random() * 100; // client-only random start phase
    const buf = document.createElement("canvas");
    buf.width = PW;
    buf.height = PH;
    const bctx = buf.getContext("2d");
    if (!bctx) return;
    const img = bctx.createImageData(PW, PH);

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    eng.reduced = mq.matches;
    const onMotion = (e: MediaQueryListEvent) => {
      eng.reduced = e.matches;
    };
    mq.addEventListener("change", onMotion);

    const drawPlasma = () => {
      const { t, mx, my, lut } = eng;
      const d = img.data;
      let p = 0;
      for (let y = 0; y < PH; y++) {
        const ny = y / PH;
        for (let x = 0; x < PW; x++) {
          const nx = x / PW;
          const dx = nx - 0.5 - (mx - 0.5) * 0.35;
          const dy = ny - 0.5 - (my - 0.5) * 0.35;
          const dist = Math.sqrt(dx * dx + dy * dy);
          let v =
            Math.sin(nx * 6.0 + t * 0.9 + mx * 3.0) +
            Math.sin(ny * 5.0 - t * 0.7 + my * 3.0) +
            Math.sin((nx + ny) * 4.0 + t * 0.5) +
            Math.sin(dist * 9.0 - t * 1.1);
          v = (v + 4) / 8; // → 0..1
          const li = Math.max(0, Math.min(255, (v * 255) | 0)) * 3;
          d[p++] = lut[li];
          d[p++] = lut[li + 1];
          d[p++] = lut[li + 2];
          d[p++] = 255;
        }
      }
      bctx.putImageData(img, 0, 0);
    };

    const paint = () => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.imageSmoothingEnabled = true;
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;
      ctx.drawImage(buf, 0, 0, W, H);

      // drifting luminous smoke orbs
      const { t } = eng;
      ctx.globalCompositeOperation = "screen";
      const orbs = [
        { x: 0.25 + Math.sin(t * 0.3) * 0.08, y: 0.35 + Math.cos(t * 0.23) * 0.08, r: 0.42, a: 0.16 },
        { x: 0.75 + Math.cos(t * 0.26) * 0.08, y: 0.6 + Math.sin(t * 0.31) * 0.08, r: 0.5, a: 0.13 },
      ];
      orbs.forEach((o) => {
        const gx = o.x * W;
        const gy = o.y * H;
        const gr = o.r * Math.max(W, H);
        const g = ctx.createRadialGradient(gx, gy, 0, gx, gy, gr);
        g.addColorStop(0, `rgba(255,255,255,${o.a})`);
        g.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      });

      // legibility vignette for the copy on top
      ctx.globalCompositeOperation = "source-over";
      const vg = ctx.createLinearGradient(0, 0, 0, H);
      vg.addColorStop(0, "rgba(2,4,12,0.5)");
      vg.addColorStop(0.5, "rgba(2,4,12,0.22)");
      vg.addColorStop(1, "rgba(2,4,12,0.55)");
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, W, H);
    };

    eng.redraw = () => {
      drawPlasma();
      paint();
    };

    const resize = () => {
      const rect = host.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      eng.redraw();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    const io = new IntersectionObserver(
      ([entry]) => {
        eng.visible = entry.isIntersecting;
      },
      { threshold: 0.05 },
    );
    io.observe(host);

    const follow = (clientX: number, clientY: number) => {
      const rect = host.getBoundingClientRect();
      eng.tx = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
      eng.ty = Math.min(1, Math.max(0, (clientY - rect.top) / rect.height));
    };
    const onPointer = (e: PointerEvent) => follow(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) follow(t.clientX, t.clientY);
    };
    host.addEventListener("pointermove", onPointer);
    host.addEventListener("touchmove", onTouch, { passive: true });

    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      const dt = Math.min(60, now - last);
      last = now;
      if (!eng.visible || !eng.running || eng.reduced) return;
      eng.t += (dt / 1000) * eng.speed;
      eng.mx += (eng.tx - eng.mx) * 0.03;
      eng.my += (eng.ty - eng.my) * 0.03;
      eng.redraw();
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      mq.removeEventListener("change", onMotion);
      host.removeEventListener("pointermove", onPointer);
      host.removeEventListener("touchmove", onTouch);
      eng.redraw = () => {};
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={`absolute inset-0 h-full w-full ${className}`} />;
}
