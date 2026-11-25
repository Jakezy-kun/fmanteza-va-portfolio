"use client"

import { useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import { Award, Building2, CalendarDays, ChevronDown, Layers, Pause, Play, Star, ZoomIn } from "lucide-react"
import { SectionHeading } from "@/components/ui/section-heading"
import { CertificateLightbox } from "@/components/ui/certificate-lightbox"
import { CertificateMarquee } from "@/components/ui/certificate-marquee"
import {
  CERTIFICATES,
  CERTIFICATE_CATEGORIES,
  certificateSrc,
  formatCertDate,
  type Certificate,
  type CertificateCategory,
} from "@/data/certificates"

/* ---------- derived data (static) ---------- */

const sorted = [...CERTIFICATES].sort((a, b) => b.date.localeCompare(a.date))
const categories = CERTIFICATE_CATEGORIES.filter((c) => sorted.some((x) => x.category === c.id))
const issuerCount = new Set(sorted.map((c) => c.issuer)).size
const byCategory = (id: CertificateCategory) => sorted.filter((c) => c.category === id)
const catInfo = (id: CertificateCategory) => CERTIFICATE_CATEGORIES.find((c) => c.id === id)!

/** In "All", each group previews this many before "Show all". */
const PREVIEW = 6

/* ---------- section ---------- */

export function CertificatesSection() {
  const [active, setActive] = useState<CertificateCategory | "all">("all")
  const [expanded, setExpanded] = useState<Partial<Record<CertificateCategory, boolean>>>({})
  const [carouselPaused, setCarouselPaused] = useState(false)
  const [viewer, setViewer] = useState<{ items: Certificate[]; index: number } | null>(null)

  // the Featured carousel always shows every certificate; the groups below are the browsable index
  const groups = categories
    .map((c) => {
      const all = byCategory(c.id)
      const visible = expanded[c.id] ? all : all.slice(0, PREVIEW)
      return { info: c, all, visible }
    })
    .filter((g) => g.all.length > 0)

  const open = (list: Certificate[], cert: Certificate) => setViewer({ items: list, index: list.indexOf(cert) })

  // browsing order in the viewer = what the visitor currently sees
  const allVisible = groups.flatMap((g) => g.visible)

  return (
    <section id="certificates" className="relative py-20 md:py-28 px-4 bg-white dark:bg-gray-950 overflow-hidden">
      <div className="absolute inset-0 bg-mesh-bold opacity-40" aria-hidden />
      <div className="relative max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Certificates"
          title="Always learning,"
          highlight="always showing up"
          description="Talks, workshops and community work — from Davao tech meetups to research talks in Manila."
        />

        {/* at-a-glance numbers */}
        <motion.ul
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5 }}
          className="-mt-4 md:-mt-6 mb-10 flex flex-wrap justify-center gap-2 sm:gap-3"
        >
          <Stat icon={Award} value={sorted.length} label="certificates" />
          <Stat icon={Layers} value={categories.length} label="categories" />
          <Stat icon={Building2} value={issuerCount} label="organizations" />
        </motion.ul>

        {/* category tabs */}
        <div className="-mx-4 px-4 overflow-x-auto scrollbar-none mb-8 md:mb-10">
          <div
            role="group"
            aria-label="Filter certificates by category"
            className="flex w-max mx-auto gap-1.5 p-1.5 rounded-full bg-white/80 dark:bg-white/[0.04] border border-black/10 dark:border-white/10 shadow-sm"
          >
            <Tab label="All" count={sorted.length} selected={active === "all"} onClick={() => setActive("all")} />
            {categories.map((c) => (
              <Tab
                key={c.id}
                label={c.short}
                count={byCategory(c.id).length}
                selected={active === c.id}
                onClick={() => setActive(c.id)}
              />
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            {active === "all" ? (
              <div className="space-y-14">
                {sorted.length > 0 && (
                  <div>
                    <GroupHeader
                      icon={Star}
                      gradient="from-amber-400 to-orange-500"
                      title="Featured"
                      count={sorted.length}
                      blurb="Every certificate, newest first."
                    />
                    <div className="-mx-4 sm:mx-0">
                      <CertificateMarquee
                        items={sorted}
                        paused={carouselPaused || !!viewer}
                        onOpen={(c) => open(sorted, c)}
                      />
                    </div>

                    {/* motion control + live count, same footer pattern as Skills */}
                    <div className="mt-6 flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
                      <button
                        type="button"
                        onClick={() => setCarouselPaused((p) => !p)}
                        aria-pressed={carouselPaused}
                        className="marquee-toggle inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-gray-600 dark:text-gray-300 bg-white/80 dark:bg-white/[0.04] border border-black/10 dark:border-white/10 hover:text-gray-900 dark:hover:text-white hover:border-violet-500/40 active:scale-95 touch-manipulation transition-all"
                      >
                        {carouselPaused ? <Play size={14} /> : <Pause size={14} />}
                        {carouselPaused ? "Resume carousel" : "Pause carousel"}
                      </button>

                      <div className="flex items-center gap-3 text-sm">
                        <span className="w-8 h-8 shrink-0 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                          <Award size={15} className="text-white" />
                        </span>
                        <p className="text-gray-500 dark:text-gray-400">
                          <span className="font-semibold text-gray-900 dark:text-white">{sorted.length} certificates</span>{" "}
                          · tap a card to view it full size
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {groups.map(({ info, all, visible }) => (
                  <div key={info.id}>
                    <GroupHeader
                      icon={info.icon}
                      gradient={info.gradient}
                      title={info.label}
                      count={byCategory(info.id).length}
                      blurb={info.blurb}
                      onViewAll={() => setActive(info.id)}
                    />
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      {visible.map((c, i) => (
                        <CertCard key={c.slug} cert={c} index={i} onOpen={() => open(allVisible, c)} />
                      ))}
                    </div>
                    {all.length > PREVIEW && (
                      <div className="mt-6 flex justify-center">
                        <button
                          type="button"
                          onClick={() => setExpanded((e) => ({ ...e, [info.id]: !e[info.id] }))}
                          aria-expanded={!!expanded[info.id]}
                          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-semibold bg-white dark:bg-white/[0.06] border border-black/10 dark:border-white/10 text-gray-700 dark:text-gray-200 hover:border-violet-500/40 shadow-sm transition-colors"
                        >
                          {expanded[info.id] ? "Show less" : `Show all ${all.length}`}
                          <ChevronDown size={16} className={`transition-transform ${expanded[info.id] ? "rotate-180" : ""}`} />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <CategoryView id={active} onOpen={open} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {viewer && (
          <CertificateLightbox
            items={viewer.items}
            index={viewer.index}
            onIndex={(i) => setViewer((v) => (v ? { ...v, index: i } : v))}
            onClose={() => setViewer(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

/* ---------- pieces ---------- */

function CategoryView({ id, onOpen }: { id: CertificateCategory; onOpen: (list: Certificate[], c: Certificate) => void }) {
  const info = catInfo(id)
  const list = byCategory(id)
  return (
    <div>
      <GroupHeader icon={info.icon} gradient={info.gradient} title={info.label} count={list.length} blurb={info.blurb} />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {list.map((c, i) => (
          <CertCard key={c.slug} cert={c} index={i} onOpen={() => onOpen(list, c)} />
        ))}
      </div>
    </div>
  )
}

function CertCard({ cert, index, onOpen }: { cert: Certificate; index: number; onOpen: () => void }) {
  const info = catInfo(cert.category)
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileTap={{ scale: 0.98 }}
      aria-label={`View certificate: ${cert.title}`}
      className="group relative flex flex-col text-left rounded-2xl overflow-hidden bg-white dark:bg-white/[0.035] border border-black/10 dark:border-white/10 hover:border-violet-500/30 shadow-md hover:shadow-xl hover:-translate-y-1 touch-manipulation transition-[transform,box-shadow,border-color] duration-300"
    >
      <div className="relative aspect-[1.414] overflow-hidden bg-gray-100 dark:bg-gray-800">
        <Image
          src={certificateSrc(cert, true)}
          alt=""
          fill
          sizes="(min-width: 1024px) 370px, (min-width: 640px) 50vw, 100vw"
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
      </div>

      <div className="flex-1 flex flex-col p-4 sm:p-5">
        <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 truncate">{cert.issuer}</p>
        <h4 className="mt-1 font-display font-bold text-[15px] leading-snug text-gray-900 dark:text-white line-clamp-2">
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
    </motion.button>
  )
}

function GroupHeader({
  icon: Icon,
  gradient,
  title,
  count,
  blurb,
  onViewAll,
}: {
  icon: typeof Star
  gradient: string
  title: string
  count: number
  blurb?: string
  onViewAll?: () => void
}) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className={`w-10 h-10 shrink-0 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-md`}>
        <Icon className="w-5 h-5 text-white" />
      </span>
      <div className="min-w-0">
        <h3 className="font-display text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
          {title}
          <span className="px-2 py-0.5 rounded-full text-[11px] font-bold tabular-nums bg-black/5 dark:bg-white/10 text-gray-600 dark:text-gray-300">
            {count}
          </span>
        </h3>
        {blurb && <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{blurb}</p>}
      </div>
      {onViewAll && (
        <button
          type="button"
          onClick={onViewAll}
          className="ml-auto shrink-0 text-sm font-semibold text-violet-600 dark:text-violet-400 hover:underline"
        >
          View all →
        </button>
      )}
    </div>
  )
}

function Tab({ label, count, selected, onClick }: { label: string; count: number; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`relative inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap touch-manipulation transition-colors ${
        selected ? "text-white" : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
      }`}
    >
      {selected && (
        <motion.span
          layoutId="cert-tab"
          transition={{ type: "spring", stiffness: 420, damping: 34 }}
          className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-600 shadow-md shadow-violet-600/25"
        />
      )}
      <span className="relative">{label}</span>
      <span
        className={`relative text-[10px] font-bold tabular-nums px-1.5 rounded-full ${
          selected ? "bg-white/25 text-white" : "bg-black/5 dark:bg-white/10 text-gray-500 dark:text-gray-400"
        }`}
      >
        {count}
      </span>
    </button>
  )
}

function Stat({ icon: Icon, value, label }: { icon: typeof Star; value: number; label: string }) {
  return (
    <li className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-white/[0.05] border border-black/10 dark:border-white/10 text-sm shadow-sm">
      <Icon size={15} className="text-violet-500" aria-hidden />
      <span className="font-display font-bold tabular-nums text-gray-900 dark:text-white">{value}</span>
      <span className="text-gray-500 dark:text-gray-400">{label}</span>
    </li>
  )
}
