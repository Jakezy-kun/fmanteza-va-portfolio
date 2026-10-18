"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const AUTOPLAY_MS = 3000;

interface ProjectCoverProps {
  images: string[];
  title: string;
  year: string;
  featured: boolean;
  /** Fallback gradient for the empty state (Tailwind from/via/to stops). */
  accent?: string;
  /**
   * When true, `images[0]` is treated as the SVG title cover (fills the
   * frame) and every following image is a screenshot shown in full
   * (object-contain) over a blurred copy of itself — so nothing is cropped
   * regardless of the screenshot's aspect ratio.
   */
  titleSlide?: boolean;
}

const DEFAULT_ACCENT = "from-blue-600 via-violet-600 to-fuchsia-600";

/**
 * Project cover art — a fixed 16:9, fully responsive media area.
 * - Title-only projects: cover art fills the frame (object-cover).
 * - Photo projects (titleSlide): slide 1 is the original SVG title cover,
 *   then each screenshot fits entirely over a blurred backdrop.
 * - 2+ slides → auto-playing crossfade (3s) with dots, arrows, swipe,
 *   pause-on-hover, and reduced-motion support.
 */
export function ProjectCover({
  images,
  title,
  year,
  featured,
  accent = DEFAULT_ACCENT,
  titleSlide = false,
}: ProjectCoverProps) {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const total = images.length;
  const multi = total > 1;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sync with OS setting (external system)
    setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const touchX = useRef<number | null>(null);

  const go = useCallback(
    (dir: 1 | -1) => setIdx((i) => (i + dir + total) % total),
    [total]
  );

  // Swipe support for touch: horizontal drag changes slide, vertical
  // scroll is left alone so the page still scrolls naturally.
  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0]?.clientX ?? null;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current == null) return;
    const endX = e.changedTouches[0]?.clientX ?? touchX.current;
    const dx = endX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) < 32) return;
    go(dx < 0 ? 1 : -1);
  };

  useEffect(() => {
    if (!multi || paused || reducedMotion) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % total), AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [multi, paused, reducedMotion, total]);

  const sizes = "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw";

  return (
    <div
      className="relative w-full aspect-video overflow-hidden touch-pan-y select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={(e) => {
        setPaused(true);
        onTouchStart(e);
      }}
      onTouchMove={() => setPaused(true)}
      onTouchEnd={(e) => {
        onTouchEnd(e);
        setPaused(false);
      }}
    >
      {total === 0 && (
        <div className={`absolute inset-0 bg-gradient-to-br ${accent}`}>
          <div className="absolute inset-0 bg-dot-grid opacity-25" aria-hidden />
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <span className="font-display text-xl font-bold text-center text-white/95 drop-shadow">
              {title}
            </span>
          </div>
        </div>
      )}

      {images.map((src, i) => {
        const active = i === idx;
        // Slide 1 of a photo project is the SVG title cover; the rest are
        // screenshots (or, for title-only projects, every image is a cover).
        const isCover = !titleSlide || i === 0;
        return (
          <div
            key={src}
            aria-hidden={!active}
            className={`absolute inset-0 transition-opacity duration-700 ${
              active ? "opacity-100" : "opacity-0"
            }`}
          >
            {isCover ? (
              <Image
                src={src}
                alt={active ? `${title} project cover${multi ? ` — slide ${i + 1} of ${total}` : ""}` : ""}
                fill
                sizes={sizes}
                className="object-cover group-hover:scale-105 group-active:scale-105 transition-transform duration-500"
                priority={false}
              />
            ) : (
              <>
                {/* Blurred copy fills the frame so the contained shot never
                    leaves empty bars — adapts to any image aspect ratio. */}
                <Image
                  src={src}
                  alt=""
                  aria-hidden
                  fill
                  sizes={sizes}
                  className="object-cover scale-110 blur-2xl opacity-60"
                  priority={false}
                />
                <div className="absolute inset-0 bg-black/15" aria-hidden />
                <Image
                  src={src}
                  alt={active ? `${title} screenshot${multi ? ` — slide ${i + 1} of ${total}` : ""}` : ""}
                  fill
                  sizes={sizes}
                  className="object-contain"
                  priority={false}
                />
              </>
            )}
          </div>
        );
      })}
      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" aria-hidden />

      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-bold bg-black/45 text-white glass border border-white/20">
        {year}
      </span>
      {featured && (
        <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-amber-400 text-amber-950 shadow">
          Featured
        </span>
      )}

      {multi && (
        <>
          <button
            onClick={() => go(-1)}
            aria-label={`Previous slide for ${title}`}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center bg-black/50 text-white border border-white/25 md:opacity-0 md:group-hover:opacity-100 focus-visible:opacity-100 hover:bg-black/70 active:scale-90 active:bg-black/80 transition-all touch-manipulation"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => go(1)}
            aria-label={`Next slide for ${title}`}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center bg-black/50 text-white border border-white/25 md:opacity-0 md:group-hover:opacity-100 focus-visible:opacity-100 hover:bg-black/70 active:scale-90 active:bg-black/80 transition-all touch-manipulation"
          >
            <ChevronRight size={18} />
          </button>
          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-2 px-2 py-1" role="group" aria-label={`${title} slides`}>
            {Array.from({ length: total }).map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                aria-label={`Go to slide ${i + 1} of ${total} for ${title}`}
                aria-current={i === idx}
                className="h-2 rounded-full transition-all touch-manipulation min-w-[28px] min-h-[28px] flex items-center justify-center w-7"
              >
                <span
                  aria-hidden
                  className={`h-1.5 rounded-full transition-all ${
                    i === idx ? "w-5 bg-white" : "w-1.5 bg-white/60"
                  }`}
                />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
