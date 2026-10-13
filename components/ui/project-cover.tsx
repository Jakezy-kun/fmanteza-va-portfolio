"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const AUTOPLAY_MS = 3000;

interface ProjectCoverProps {
  images: string[];
  title: string;
  year: string;
  featured: boolean;
}

/**
 * Project cover art.
 * - 1 image  → static cover.
 * - 2+ images → auto-playing carousel (crossfade every 3s),
 *   with dots, arrows, pause-on-hover, and reduced-motion support.
 */
export function ProjectCover({ images, title, year, featured }: ProjectCoverProps) {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const count = images.length;
  const multi = count > 1;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sync with OS setting (external system)
    setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const go = useCallback(
    (dir: 1 | -1) => setIdx((i) => (i + dir + count) % count),
    [count]
  );

  useEffect(() => {
    if (!multi || paused || reducedMotion) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % count), AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [multi, paused, reducedMotion, count]);

  return (
    <div
      className="relative h-44 overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {images.map((src, i) => (
        <div
          key={src}
          aria-hidden={i !== idx}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === idx ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={src}
            alt={i === idx ? `${title} project cover${multi ? ` — slide ${i + 1} of ${count}` : ""}` : ""}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            priority={false}
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" aria-hidden />

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
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center bg-black/50 text-white border border-white/25 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 hover:bg-black/70 transition-opacity"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => go(1)}
            aria-label={`Next slide for ${title}`}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center bg-black/50 text-white border border-white/25 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 hover:bg-black/70 transition-opacity"
          >
            <ChevronRight size={16} />
          </button>
          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5" role="group" aria-label={`${title} slides`}>
            {images.map((src, i) => (
              <button
                key={src}
                onClick={() => setIdx(i)}
                aria-label={`Go to slide ${i + 1} of ${count} for ${title}`}
                aria-current={i === idx}
                className={`h-1.5 rounded-full transition-all ${
                  i === idx ? "w-5 bg-white" : "w-1.5 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
