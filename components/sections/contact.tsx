"use client"

import { motion } from "framer-motion"
import { Mail, MapPin, Download, ArrowUpRight, Copy, Check, Pause, Play } from "lucide-react"
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons"
import { useState } from "react"
import { SectionHeading } from "@/components/ui/section-heading"
import { Magnetic } from "@/components/ui/magnetic"
import { PlasmaCanvas, PLASMA_PALETTES, type PlasmaPreset } from "@/components/ui/plasma-canvas"

const EMAIL = "fmanteza_230000001892@uic.edu.ph"
const RESUME_HREF = "/manteza-resume.pdf"

const channels = [
  {
    icon: Mail,
    label: "Email",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    icon: LinkedinIcon,
    label: "LinkedIn",
    value: "ferdinand-m-manteza",
    href: "https://www.linkedin.com/in/ferdinand-m-manteza-015564327/",
    gradient: "from-[#0A66C2] to-[#004182]",
  },
  {
    icon: GithubIcon,
    label: "GitHub",
    value: "github.com/Jakezy-kun",
    href: "https://github.com/Jakezy-kun",
    gradient: "from-gray-700 to-gray-950 dark:from-gray-600 dark:to-gray-800",
  },
]

export function ContactSection() {
  const [copied, setCopied] = useState(false)
  const [running, setRunning] = useState(true)
  const [preset, setPreset] = useState<PlasmaPreset>("aurora")

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section id="contact" className="relative py-20 md:py-28 px-4 bg-white dark:bg-gray-950 overflow-hidden">
      <div className="absolute inset-0 bg-mesh-bold opacity-60" aria-hidden />
      <div className="relative max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build"
          highlight="together"
          description="Have a project, role, or collaboration in mind? My inbox is always open."
        />

        <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-5 md:gap-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h3 className="font-display text-xl font-bold text-gray-900 dark:text-white">
              Contact Information
            </h3>

            {channels.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-white/[0.04] border border-black/10 dark:border-white/10 shadow-md hover:shadow-xl active:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] touch-manipulation transition-all"
              >
                <Magnetic strength={6}>
                <span className={`w-12 h-12 shrink-0 rounded-2xl bg-gradient-to-br ${c.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                  <c.icon size={22} />
                </span>
                </Magnetic>
                <span className="min-w-0 flex-1">
                  <span className="block text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    {c.label}
                  </span>
                  <span className="block font-semibold text-gray-900 dark:text-white truncate text-sm sm:text-base">
                    {c.value}
                  </span>
                </span>
                <ArrowUpRight size={18} className="shrink-0 text-gray-400 group-hover:text-violet-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
            ))}

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-white/[0.04] border border-black/10 dark:border-white/10">
              <span className="w-12 h-12 shrink-0 rounded-2xl bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center text-white shadow-lg">
                <MapPin size={22} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">Location</p>
                <p className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                  Calinan, Davao City, Philippines
                </p>
              </div>
              <button
                onClick={copyEmail}
                aria-label={copied ? "Email copied" : "Copy email address"}
                className="shrink-0 inline-flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold bg-black/5 dark:bg-white/10 text-gray-700 dark:text-gray-200 hover:bg-black/10 dark:hover:bg-white/20 transition-colors"
              >
                {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                {copied ? "Copied!" : "Copy email"}
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            whileTap={{ scale: 0.99 }}
            style={{ touchAction: "pan-y" }}
            className="relative flex flex-col justify-center items-center text-center rounded-3xl px-8 pt-10 pb-20 md:px-10 md:pt-12 overflow-hidden bg-gradient-to-br from-blue-600 via-violet-600 to-fuchsia-600 text-white shadow-2xl shadow-violet-600/30 touch-manipulation"
          >
            {/* live plasma, follows the pointer; the gradient above shows until it paints */}
            <PlasmaCanvas preset={preset} running={running} />

            {/* plasma controls */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 rounded-2xl bg-black/35 glass border border-white/15 p-1.5">
              <button
                type="button"
                onClick={() => setRunning((r) => !r)}
                aria-pressed={!running}
                aria-label={running ? "Pause background animation" : "Play background animation"}
                className="w-9 h-9 rounded-xl flex items-center justify-center bg-white/10 hover:bg-white/20 border border-white/15 transition-colors"
              >
                {running ? <Pause size={14} /> : <Play size={14} />}
              </button>
              <div className="flex items-center gap-1.5" role="group" aria-label="Background colors">
                {(Object.keys(PLASMA_PALETTES) as PlasmaPreset[]).map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setPreset(key)}
                    aria-pressed={preset === key}
                    title={PLASMA_PALETTES[key].label}
                    className={`w-9 h-9 rounded-xl bg-gradient-to-br ${PLASMA_PALETTES[key].swatch} border-2 transition-all active:scale-95 ${
                      preset === key ? "border-white shadow-lg" : "border-white/20 hover:border-white/50"
                    }`}
                  >
                    <span className="sr-only">{PLASMA_PALETTES[key].label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="relative">
              <h3 className="font-display text-2xl md:text-3xl font-bold mb-3 text-balance [text-shadow:0_2px_24px_rgba(0,0,0,0.45)]">
                Interested in working together?
              </h3>
              <p className="text-white/85 mb-7 max-w-sm">
                Download my resume to see experience, projects, and skills in detail.
              </p>

              <a
                href={RESUME_HREF}
                download="Manteza_resume.pdf"
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-white text-gray-900 rounded-2xl font-bold shadow-xl hover:shadow-2xl hover:scale-[1.03] active:scale-[0.98] transition-all"
              >
                <Download size={20} />
                Download Resume
              </a>

              <p className="mt-5 text-xs text-white/70">
                Prefer email? <span className="font-semibold text-white break-all">{EMAIL}</span>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
