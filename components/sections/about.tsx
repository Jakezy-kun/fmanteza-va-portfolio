"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import {
  GraduationCap,
  Target,
  Telescope,
  Lightbulb,
  Award,
  MapPin,
  type LucideIcon,
} from "lucide-react"
import { SectionHeading } from "@/components/ui/section-heading"

/* ---------- logos ---------- */

type Logo = { src: string; alt: string; w: number; h: number }

const LOGOS = {
  uic: { src: "/logos/uic.png", alt: "University of the Immaculate Conception seal", w: 150, h: 150 },
  ccs: { src: "/logos/uic-ccs.png", alt: "UIC College of Computer Studies seal", w: 190, h: 256 },
  holyCross: { src: "/logos/holy-cross.png", alt: "Holy Cross College of Calinan seal", w: 256, h: 256 },
  gdgUic: { src: "/logos/gdg-on-campus-uic.png", alt: "Google Developer Groups On Campus UIC logo", w: 440, h: 181 },
  psits: { src: "/logos/psits.png", alt: "PSITS Region XI seal", w: 256, h: 257 },
} satisfies Record<string, Logo>

/* ---------- data ---------- */

const education = [
  {
    school: "University of the Immaculate Conception",
    college: "College of Computer Studies",
    program: "BS in Information Technology",
    major: "Major in Learning Technologies",
    period: "2023 — 2026",
    current: true,
    logos: [LOGOS.uic, LOGOS.ccs],
  },
  {
    school: "Holy Cross College of Calinan",
    program: "STEM Strand",
    period: "2010 — 2022",
    current: false,
    logos: [LOGOS.holyCross],
  },
]

type Achievement = {
  title: string
  detail: string
  period: string
  tag: string
  logo: Logo
}

const achievements: Achievement[] = [
  { title: "3rd Honor", detail: "3rd Year · 1st Semester", period: "2025–2026", tag: "Academic", logo: LOGOS.uic },
  { title: "2nd Honor", detail: "3rd Year · 2nd Semester", period: "2026–2027", tag: "Academic", logo: LOGOS.uic },
  { title: "Core Member", detail: "Google Developer Groups On Campus UIC", period: "2023–2024", tag: "Community", logo: LOGOS.gdgUic },
  { title: "Esports Technical Team", detail: "Philippine Society of Information Technology Students of Region XI", period: "2023–2024", tag: "Organization", logo: LOGOS.psits },
]

const principles = [
  {
    icon: Target,
    label: "Mission",
    text: "Build practical tech that improves learning and admin workflows.",
    accent: "from-violet-500 to-fuchsia-500",
  },
  {
    icon: Telescope,
    label: "Vision",
    text: "Bridge technology and education through user-centered design.",
    accent: "from-blue-500 to-cyan-400",
  },
  {
    icon: Lightbulb,
    label: "Goals & Motivation",
    text: "Driven by organizational productivity and accountability tools — continually honing full-stack and product-design skills to deliver high-impact digital experiences.",
    accent: "from-emerald-500 to-teal-400",
  },
]

/* ---------- shared bits ---------- */

const cardBase =
  "group relative overflow-hidden rounded-3xl bg-white dark:bg-white/[0.035] border border-black/10 dark:border-white/10 shadow-lg hover:shadow-xl transition-all touch-manipulation"

const reveal = (i = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
})

/** A school seal on a white coin, so its ink stays legible in dark mode. */
function SealCoin({
  logo,
  size,
  className = "relative",
  ring = "ring-1 ring-black/10 dark:ring-white/25",
}: {
  logo: Logo
  size: number
  className?: string
  ring?: string
}) {
  return (
    <span
      className={`shrink-0 rounded-full bg-white ${ring} shadow-md flex items-center justify-center overflow-hidden ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src={logo.src}
        alt={logo.alt}
        width={logo.w}
        height={logo.h}
        sizes={`${size}px`}
        className="w-[86%] h-[86%] object-contain"
      />
    </span>
  )
}

function CardHeader({ icon: Icon, title, accent, aside }: { icon: LucideIcon; title: string; accent: string; aside?: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${accent} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform`}>
        <Icon className="w-5 h-5 text-white" />
      </span>
      <h3 className="font-display text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
      {aside && (
        <span className="ml-auto text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">{aside}</span>
      )}
    </div>
  )
}

/* ---------- section ---------- */

export function AboutSection() {
  return (
    <section id="about" className="relative py-20 md:py-28 px-4 bg-white dark:bg-gray-950 overflow-hidden">
      <div className="absolute inset-0 bg-mesh-bold opacity-60" aria-hidden />
      <div className="relative max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="About"
          title="Designing learning"
          highlight="that works"
          description="IT student specializing in Learning Technologies — web, mobile, databases, and AI-assisted education tools."
        />

        <motion.div
          {...reveal()}
          className="mb-10 flex flex-col md:flex-row items-center justify-center gap-3 text-center"
        >
          <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm bg-black/5 dark:bg-white/10 text-gray-700 dark:text-gray-200">
            <MapPin size={15} className="text-rose-500" />
            Calinan, Davao City, Philippines
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400 max-w-xl">
            Practical systems for students, teachers, and admins — from QA to full-stack delivery.
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-5 md:gap-6">
          {/* ---------- Education: timeline with school seals ---------- */}
          <motion.article {...reveal(0)} className={`${cardBase} lg:col-span-6 p-6 md:p-8 hover:shadow-blue-500/20`}>
            <span className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-400" aria-hidden />
            <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl" aria-hidden />
            <CardHeader icon={GraduationCap} title="Education" accent="from-blue-500 to-cyan-400" />

            <ol className="relative">
              {education.map((ed, i) => {
                const last = i === education.length - 1
                return (
                  <li key={ed.school} className={`relative flex gap-4 sm:gap-6 ${last ? "" : "pb-10"}`}>
                    {/* rail, centred under the seal column */}
                    {!last && (
                      <span
                        className="absolute left-9 top-[88px] bottom-3 w-px bg-gradient-to-b from-blue-500/60 via-blue-500/20 to-black/10 dark:to-white/10"
                        aria-hidden
                      />
                    )}

                    {/* seals: school seal, with the college seal as a badge */}
                    <div className="shrink-0 w-[72px] flex justify-center">
                      <div className="relative h-fit">
                        <SealCoin logo={ed.logos[0]} size={ed.current ? 72 : 60} />
                        {ed.logos[1] && (
                          <SealCoin
                            logo={ed.logos[1]}
                            size={36}
                            className="absolute -bottom-1.5 -right-2.5"
                            ring="ring-[3px] ring-white dark:ring-gray-900"
                          />
                        )}
                      </div>
                    </div>

                    <div className="min-w-0 flex-1 pt-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold tabular-nums border ${
                            ed.current
                              ? "bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/25"
                              : "bg-black/[0.04] dark:bg-white/[0.06] text-gray-600 dark:text-gray-400 border-black/10 dark:border-white/10"
                          }`}
                        >
                          {ed.current && (
                            <span className="relative flex w-1.5 h-1.5">
                              <span className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-60" />
                              <span className="relative w-1.5 h-1.5 rounded-full bg-blue-500" />
                            </span>
                          )}
                          {ed.period}
                          {ed.current && " · Current"}
                        </span>
                      </div>
                      <h4 className={`font-display font-bold text-gray-900 dark:text-white leading-snug ${ed.current ? "text-lg" : "text-base"}`}>
                        {ed.school}
                      </h4>
                      {ed.college && (
                        <p className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 mt-0.5">
                          {ed.college}
                        </p>
                      )}
                      <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">{ed.program}</p>
                      {ed.major && <p className="text-sm text-gray-500 dark:text-gray-400">{ed.major}</p>}
                    </div>
                  </li>
                )
              })}
            </ol>
          </motion.article>

          {/* ---------- Key Achievements: rows with issuer logos ---------- */}
          <motion.article {...reveal(1)} className={`${cardBase} lg:col-span-6 p-6 md:p-8 hover:shadow-amber-500/20`}>
            <span className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-500 to-orange-500" aria-hidden />
            <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-amber-500/10 blur-3xl" aria-hidden />
            <CardHeader icon={Award} title="Key Achievements" accent="from-amber-500 to-orange-500" />

            <ul className="space-y-2.5">
              {achievements.map((a) => (
                <motion.li
                  key={a.title + a.period}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-3.5 rounded-2xl p-2.5 pr-3.5 -mx-2.5 hover:bg-black/[0.03] dark:hover:bg-white/[0.04] transition-colors"
                >
                  {/* fixed-width logo column: round seals and the wide GDG lockup line up */}
                  <span className="w-[76px] shrink-0 flex justify-center">
                    {a.logo === LOGOS.gdgUic ? (
                      <span className="w-[76px] h-12 rounded-xl bg-white ring-1 ring-black/10 dark:ring-white/25 shadow-md flex items-center justify-center">
                        <Image src={a.logo.src} alt={a.logo.alt} width={a.logo.w} height={a.logo.h} sizes="68px" className="w-[66px] h-auto" />
                      </span>
                    ) : (
                      <SealCoin logo={a.logo} size={48} />
                    )}
                  </span>

                  <div className="min-w-0 flex-1">
                    <p className="font-display font-bold text-[15px] text-gray-900 dark:text-white leading-tight">{a.title}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{a.detail}</p>
                    <p className="sm:hidden mt-0.5 text-xs">
                      <span className="font-semibold tabular-nums text-gray-700 dark:text-gray-300">{a.period}</span>
                      <span className="mx-1.5 text-gray-400">·</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">{a.tag}</span>
                    </p>
                  </div>

                  <div className="hidden sm:block shrink-0 text-right">
                    <p className="text-xs font-semibold tabular-nums text-gray-700 dark:text-gray-300">{a.period}</p>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">{a.tag}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.article>

          {/* ---------- Mission · Vision · Goals ---------- */}
          {principles.map((p, i) => (
            <motion.article
              key={p.label}
              {...reveal(i + 2)}
              whileTap={{ scale: 0.98 }}
              className={`${cardBase} lg:col-span-4 p-6 md:p-7 hover:-translate-y-1`}
            >
              <span className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${p.accent}`} aria-hidden />
              <div className="flex items-center gap-3 mb-4">
                <span className={`w-10 h-10 rounded-xl bg-gradient-to-br ${p.accent} flex items-center justify-center shadow-md group-hover:scale-110 group-hover:rotate-3 transition-transform`}>
                  <p.icon className="w-5 h-5 text-white" />
                </span>
                <h3 className="font-display text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">{p.label}</h3>
              </div>
              <p className="font-display text-base md:text-[17px] font-medium leading-relaxed text-gray-800 dark:text-gray-100 text-balance">
                {p.text}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
