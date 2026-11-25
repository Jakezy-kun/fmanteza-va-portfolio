"use client"

import type { CSSProperties } from "react"
import Image from "next/image"
import { CalendarDays, Star, ZoomIn } from "lucide-react"
import { CERTIFICATE_CATEGORIES, certificateSrc, formatCertDate, type Certificate } from "@/data/certificates"

interface CertificateMarqueeProps {
  /** Every certificate to showcase. Adding one to the data file adds a card. */
  items: Certificate[]
  onOpen: (cert: Certificate) => void
  paused?: boolean
  /** Seconds each card takes to pass; keeps the speed steady as the list grows. */
  secondsPerItem?: number
  /** Pad the group up to this many cards so it always overflows wide screens. */
  minItems?: number
}

/**
 * Same seamless marquee as the Skills section (shared `.marquee-*` styles in
 * globals.css): two identical groups, the track slides -50% and loops, edges
 * fade out, hover / keyboard focus pauses it, and reduced-motion visitors get
 * a static wrapped set instead. Unlike the logo rows the cards are clickable,
 * so the duplicated cards stay clickable but are out of the tab order and
 * hidden from screen readers (the first group is the accessible one).
 */
export function CertificateMarquee({ items, onOpen, paused = false, secondsPerItem = 8, minItems = 8 }: CertificateMarqueeProps) {
  const padCount = items.length ? Math.max(0, minItems - items.length) : 0
  const padded = [
    ...items.map((cert) => ({ cert, pad: false })),
    ...Array.from({ length: padCount }, (_, i) => ({ cert: items[i % items.length], pad: true })),
  ]
  const duration = `${padded.length * secondsPerItem}s`

  const group = (clone: boolean) => (
    <ul
      className={`marquee-group flex shrink-0 items-stretch gap-3 md:gap-4 pr-3 md:pr-4 ${clone ? "marquee-clone" : ""}`}
      aria-hidden={clone || undefined}
    >
      {padded.map(({ cert, pad }, i) => (
        <CertTile
          key={`${cert.slug}-${i}`}
          cert={cert}
          duplicate={clone || pad}
          onOpen={() => onOpen(cert)}
          className={pad ? "marquee-pad" : ""}
        />
      ))}
    </ul>
  )

  return (
    <div className="marquee marquee-mask relative overflow-hidden py-4" data-paused={paused}>
      <div className="marquee-track flex w-max" style={{ "--marquee-duration": duration } as CSSProperties}>
        {group(false)}
        {group(true)}
      </div>
    </div>
  )
}

/** `duplicate` tiles (loop clone / padding) stay clickable but are skipped by Tab and screen readers. */
function CertTile({
  cert,
  duplicate,
  onOpen,
  className = "",
}: {
  cert: Certificate
  duplicate: boolean
  onOpen: () => void
  className?: string
}) {
  const info = CERTIFICATE_CATEGORIES.find((c) => c.id === cert.category)!

  return (
    <li className={`w-[76vw] max-w-[400px] sm:w-[380px] lg:w-[400px] shrink-0 ${className}`} aria-hidden={duplicate || undefined}>
      <button
        type="button"
        tabIndex={duplicate ? -1 : undefined}
        onClick={onOpen}
        aria-label={`View certificate: ${cert.title}`}
        className="group relative flex h-full w-full flex-col text-left rounded-2xl overflow-hidden bg-white dark:bg-white/[0.035] border border-black/10 dark:border-white/10 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-violet-500/30 touch-manipulation select-none transition-[transform,box-shadow,border-color] duration-300"
      >
        <div className="relative aspect-[1.414] overflow-hidden bg-gray-100 dark:bg-gray-800">
          <Image
            src={certificateSrc(cert, true)}
            alt=""
            fill
            loading="eager"
            draggable={false}
            sizes="(min-width: 1024px) 400px, (min-width: 640px) 380px, 76vw"
            placeholder="blur"
            blurDataURL={cert.image.blur}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="absolute bottom-3 left-1/2 -translate-x-1/2 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white text-gray-900 shadow-lg transition-all">
            <ZoomIn size={14} />
            View certificate
          </span>

          <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/90 dark:bg-gray-950/80 text-gray-800 dark:text-gray-100 backdrop-blur shadow-sm">
            <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${info.gradient}`} />
            {info.short}
          </span>
          <span className="absolute top-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-md">
            <Star size={11} className="fill-current" />
            Featured
          </span>
        </div>

        <div className="flex flex-1 flex-col p-4 sm:p-5">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 truncate">{cert.issuer}</p>
          <h4 className="mt-1 font-display font-bold text-[15px] leading-snug text-gray-900 dark:text-white line-clamp-2 min-h-[2.5rem]">
            {cert.title}
          </h4>
          <div className="mt-auto pt-3 flex items-center justify-between gap-2 text-xs">
            <span className="inline-flex items-center gap-1.5 text-gray-500 dark:text-gray-400 tabular-nums">
              <CalendarDays size={13} aria-hidden />
              {formatCertDate(cert.date)}
            </span>
            <span className={`px-2 py-0.5 rounded-full border font-semibold truncate ${info.chip}`}>{cert.role}</span>
          </div>
        </div>
      </button>
    </li>
  )
}
