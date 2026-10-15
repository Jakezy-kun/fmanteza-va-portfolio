"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Pause, Play, Sparkles, ArrowRight, Mail } from "lucide-react";

/* ---------- luminous plasma engine (low-res buffer, upscaled smooth) ---------- */

type RGB = [number, number, number];
type Preset = "aurora" | "ember" | "abyss";

const PALETTES: Record<Preset, { label: string; stops: RGB[]; swatch: string }> = {
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

/* ---------- component ---------- */

export function PlaygroundSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef({
    t: 0,
    mx: 0.5,
    my: 0.45,
    tx: 0.5,
    ty: 0.45,
    running: true,
    visible: true,
    energetic: false,
    lut: buildLUT(PALETTES.aurora.stops),
    img: null as ImageData | null,
  });

  const [running, setRunning] = useState(true);
  const [preset, setPreset] = useState<Preset>("aurora");
  const [energetic, setEnergetic] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // keep mutable engine in sync (refs, so no re-subscribe churn)
  useEffect(() => {
    engineRef.current.running = running;
  }, [running]);
  useEffect(() => {
    engineRef.current.energetic = energetic;
  }, [energetic]);
  useEffect(() => {
    engineRef.current.lut = buildLUT(PALETTES[preset].stops);
  }, [preset]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sync with OS setting (external system)
    setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const eng = engineRef.current;
    eng.t = Math.random() * 100; // client-only random start phase
    const buf = document.createElement("canvas");
    buf.width = PW;
    buf.height = PH;
    const bctx = buf.getContext("2d");
    if (!bctx) return;
    eng.img = bctx.createImageData(PW, PH);

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const io = new IntersectionObserver(([entry]) => {
      eng.visible = entry.isIntersecting;
    }, { threshold: 0.05 });
    io.observe(container);

    const onMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      eng.tx = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
      eng.ty = Math.min(1, Math.max(0, (e.clientY - rect.top) / rect.height));
    };
    container.addEventListener("pointermove", onMove);

    const drawPlasma = () => {
      const { t, mx, my, lut, img } = eng;
      if (!img) return;
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

    const paint = (W: number, H: number) => {
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

      // legibility vignette for the hero copy
      ctx.globalCompositeOperation = "source-over";
      const vg = ctx.createLinearGradient(0, 0, 0, H);
      vg.addColorStop(0, "rgba(2,4,12,0.55)");
      vg.addColorStop(0.5, "rgba(2,4,12,0.25)");
      vg.addColorStop(1, "rgba(2,4,12,0.6)");
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, W, H);
    };

    // one static frame so reduced-motion / paused still shows plasma
    drawPlasma();
    paint(canvas.width, canvas.height);

    let raf = 0;
    let last = performance.now();
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (!eng.visible || !eng.running) return;
      const dt = Math.min(60, now - last);
      last = now;
      eng.t += (dt / 1000) * (eng.energetic ? 1.9 : 0.8);
      eng.mx += (eng.tx - eng.mx) * 0.03;
      eng.my += (eng.ty - eng.my) * 0.03;
      drawPlasma();
      paint(canvas.width, canvas.height);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      container.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <section id="playground" className="relative py-20 md:py-28 px-4 bg-white dark:bg-gray-950 overflow-hidden">
      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          ref={containerRef}
          style={{ touchAction: "pan-y" }}
          onTouchMove={(e) => {
            // Drive the plasma with the finger on mobile (mirrors pointermove).
            const el = containerRef.current;
            const t = e.touches[0];
            if (!el || !t) return;
            const rect = el.getBoundingClientRect();
            engineRef.current.tx = Math.min(1, Math.max(0, (t.clientX - rect.left) / rect.width));
            engineRef.current.ty = Math.min(1, Math.max(0, (t.clientY - rect.top) / rect.height));
          }}
          className="relative overflow-hidden rounded-3xl border border-black/10 dark:border-white/10 shadow-2xl shadow-violet-950/40"
        >
          {/* luminous plasma background (decorative) */}
          <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="absolute inset-0 h-full w-full"
          />

          {/* ===== hero overlay — strict visual hierarchy ===== */}
          <div className="relative flex flex-col items-center text-center px-6 py-16 sm:py-20 md:py-24 min-h-[68vh] justify-center">
            {/* 1 · eyebrow */}
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] bg-white/10 glass border border-white/25 text-white/90">
              <Sparkles size={13} className="text-amber-200" />
              Luminous plasma · rendered live
            </span>

            {/* 2 · name */}
            <h2 className="font-display mt-6 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white text-balance [text-shadow:0_2px_30px_rgba(0,0,0,0.55)]">
              Ferdinand M. Manteza Jr.
            </h2>

            {/* 3 · professional description */}
            <p className="mt-4 text-lg md:text-xl font-medium text-white/90 [text-shadow:0_1px_16px_rgba(0,0,0,0.6)]">
              Full Stack Developer & UX / Product Designer
            </p>
            <p className="mt-3 max-w-xl text-sm sm:text-base text-white/70 leading-relaxed">
              Smooth, ethereal interfaces for learning technologies —
              every wisp of this background is computed live on canvas.
            </p>

            {/* 4 · action */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <motion.a
                href="#projects"
                whileTap={{ scale: 0.94 }}
                className="group inline-flex items-center gap-2 px-7 py-3.5 bg-white text-gray-950 font-semibold rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] touch-manipulation transition-all min-h-[48px]"
              >
                View My Work
                <ArrowRight size={18} className="group-hover:translate-x-1 group-active:translate-x-1 transition-transform" />
              </motion.a>
              <motion.a
                href="#contact"
                whileTap={{ scale: 0.94 }}
                className="inline-flex items-center gap-2 px-7 py-3.5 font-semibold rounded-2xl bg-white/10 glass border border-white/30 text-white hover:bg-white/20 active:bg-white/30 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] touch-manipulation transition-all min-h-[48px]"
              >
                <Mail size={18} />
                Get In Touch
              </motion.a>
            </div>
          </div>

          {/* status chip */}
          <div className="absolute top-4 left-4 sm:top-5 sm:left-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-black/40 glass border border-white/20 text-white">
            <span className="relative flex h-2 w-2">
              <span className={`absolute inline-flex h-full w-full rounded-full ${running && !reducedMotion ? "animate-ping bg-emerald-400 opacity-75" : "bg-gray-400"}`} />
              <span className={`relative inline-flex rounded-full h-2 w-2 ${running && !reducedMotion ? "bg-emerald-400" : "bg-gray-400"}`} />
            </span>
            {running && !reducedMotion ? "Flowing live" : "Paused"}
          </div>

          {/* controls — larger touch targets + tap bounce for mobile */}
          <div className="absolute bottom-4 sm:bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-2xl bg-black/45 glass border border-white/15 px-3 py-2 touch-manipulation">
            <motion.button
              onClick={() => setRunning((r) => !r)}
              aria-pressed={running}
              aria-label={running ? "Pause plasma" : "Play plasma"}
              whileTap={{ scale: 0.9 }}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-white bg-white/10 hover:bg-white/20 active:bg-white/30 border border-white/15 transition-colors min-h-[44px]"
            >
              {running ? <Pause size={14} /> : <Play size={14} />}
              {running ? "Pause" : "Play"}
            </motion.button>
            <div className="flex items-center gap-1.5" role="group" aria-label="Plasma palette">
              {(Object.keys(PALETTES) as Preset[]).map((key) => (
                <motion.button
                  key={key}
                  onClick={() => setPreset(key)}
                  aria-pressed={preset === key}
                  title={PALETTES[key].label}
                  whileTap={{ scale: 0.85 }}
                  className={`w-9 h-9 rounded-xl bg-gradient-to-br ${PALETTES[key].swatch} border-2 transition-all min-w-[44px] min-h-[44px] active:scale-95 ${
                    preset === key ? "border-white scale-105 shadow-lg" : "border-white/20 hover:border-white/50 active:border-white/60"
                  }`}
                >
                  <span className="sr-only">{PALETTES[key].label}</span>
                </motion.button>
              ))}
            </div>
            <motion.button
              onClick={() => setEnergetic((e) => !e)}
              aria-pressed={energetic}
              whileTap={{ scale: 0.9 }}
              className={`px-3 py-2 rounded-xl text-xs font-mono font-bold border transition-colors min-h-[44px] active:scale-95 ${
                energetic
                  ? "text-gray-950 bg-amber-300 border-amber-200"
                  : "text-gray-200 bg-white/10 hover:bg-white/20 active:bg-white/30 border-white/15"
              }`}
            >
              {energetic ? "2× flow" : "1× flow"}
            </motion.button>
          </div>
        </motion.div>

        <p className="text-center mt-6 text-sm text-gray-500 dark:text-gray-400">
          Classic plasma interference, low-res buffer upscaled smooth — zero dependencies, pauses offscreen.{" "}
          <a href="#projects" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
            See the results →
          </a>
        </p>
      </div>
    </section>
  );
}
