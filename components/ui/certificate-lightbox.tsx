"use client"

import { useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import { X, ChevronLeft, ChevronRight, CalendarDays, Building2, MapPin, ExternalLink, Expand, UserRound } from "lucide-react"
import {
  CERTIFICATE_CATEGORIES,
  certificateSrc,
  formatCertDate,
  type Certificate,
} from "@/data/certificates"

interface CertificateLightboxProps {
  items: Certificate[]
  index: number
  onIndex: (i: number) => void
  onClose: () => void
}

/**
 * Full-size certificate viewer. Arrow keys / swipe move within `items`
 * (the list the visitor was looking at), Esc or the backdrop closes.
 */
export function CertificateLightbox({ items, index, onIndex, onClose }: CertificateLightboxProps) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const cert = items[index]
  const cat = CERTIFICATE_CATEGORIES.find((c) => c.id === cert.category)!
  const many = items.length > 1

  const go = (dir: 1 | -1) => onIndex((index + dir + items.length) % items.length)

  // keyboard, scroll lock and focus return
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    const { overflow } = document.body.style
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = overflow
      previous?.focus?.()
    }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      else if (e.key === "ArrowRight" && many) onIndex((index + 1) % items.length)
      else if (e.key === "ArrowLeft" && many) onIndex((index - 1 + items.length) % items.length)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [index, items.length, many, onClose, onIndex])

  return createPortal(
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cert-viewer-title"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-gray-950/85 backdrop-blur-md overflow-y-auto"
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close certificate viewer"
        className="fixed top-3 right-3 sm:top-5 sm:right-5 z-10 w-11 h-11 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-colors"
      >
        <X size={20} />
      </button>

      <div className="relative w-full max-w-6xl my-auto grid lg:grid-cols-[1fr_320px] gap-4 lg:gap-6 items-center">
        {/* image, swipeable */}
        <div className="relative flex items-center justify-center">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={cert.slug}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.22 }}
              drag={many ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.25}
              onDragEnd={(_, info) => {
                if (info.offset.x < -70) go(1)
                else if (info.offset.x > 70) go(-1)
              }}
              className="w-full cursor-grab active:cursor-grabbing touch-pan-y"
            >
              <Image
                src={certificateSrc(cert)}
                alt={`${cert.kind}: ${cert.title}, ${cert.issuer}`}
                width={cert.image.w}
                height={cert.image.h}
                sizes="(min-width: 1024px) 860px, 100vw"
                placeholder="blur"
                blurDataURL={cert.image.blur}
                draggable={false}
                className="w-full h-auto max-h-[72vh] object-contain rounded-xl shadow-2xl shadow-black/50 select-none"
              />
            </motion.div>
          </AnimatePresence>

          {many && (
            <>
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous certificate"
                className="absolute left-1 sm:-left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center bg-gray-950/70 hover:bg-gray-900 border border-white/15 text-white shadow-lg transition-colors"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next certificate"
                className="absolute right-1 sm:-right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center bg-gray-950/70 hover:bg-gray-900 border border-white/15 text-white shadow-lg transition-colors"
              >
                <ChevronRight size={22} />
              </button>
            </>
          )}
        </div>

        {/* details */}
        <motion.aside
          key={`${cert.slug}-info`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="rounded-2xl p-5 sm:p-6 bg-white/[0.06] border border-white/10 text-white"
        >
          <div className="flex items-center justify-between gap-3 mb-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white/10 border border-white/15">
              <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${cat.gradient}`} />
              {cat.short}
            </span>
            {many && (
              <span className="text-xs font-semibold tabular-nums text-white/50">
                {index + 1} / {items.length}
              </span>
            )}
          </div>

          <p className="text-xs font-semibold uppercase tracking-wider text-white/50">{cert.kind}</p>
          <h3 id="cert-viewer-title" className="font-display text-lg sm:text-xl font-bold leading-snug mt-1 text-balance">
            {cert.title}
          </h3>

          <dl className="mt-4 space-y-2.5 text-sm">
            <Detail icon={UserRound} label="Role" value={cert.role} />
            <Detail icon={Building2} label="Issued by" value={cert.issuer} />
            <Detail icon={CalendarDays} label="Date" value={formatCertDate(cert.date)} />
            {cert.location && <Detail icon={MapPin} label="Location" value={cert.location} />}
          </dl>

          {cert.note && <p className="mt-4 text-sm text-white/65 leading-relaxed">{cert.note}</p>}

          <div className="mt-5 flex flex-wrap gap-2">
            {cert.credentialUrl && (
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-white text-gray-950 hover:bg-white/90 transition-colors"
              >
                <ExternalLink size={14} />
                Verify credential
              </a>
            )}
            <a
              href={certificateSrc(cert)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 border border-white/15 transition-colors"
            >
              <Expand size={14} />
              Open full size
            </a>
          </div>

          {many && <p className="mt-5 text-[11px] text-white/40 hidden lg:block">Tip: use ← → to browse, Esc to close.</p>}
        </motion.aside>
      </div>
    </motion.div>,
    document.body,
  )
}

function Detail({ icon: Icon, label, value }: { icon: typeof MapPin; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2.5">
      <Icon size={15} className="mt-0.5 shrink-0 text-white/45" aria-hidden />
      <div className="min-w-0">
        <dt className="sr-only">{label}</dt>
        <dd className="text-white/85">{value}</dd>
      </div>
    </div>
  )
}
