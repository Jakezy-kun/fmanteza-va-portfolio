"use client"

import { motion } from "framer-motion"
import { Mail, MapPin, Download, ArrowUpRight, Copy, Check } from "lucide-react"
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons"
import { useState } from "react"
import { SectionHeading } from "@/components/ui/section-heading"
import { Magnetic } from "@/components/ui/magnetic"

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
            viewport={{ once: true }}
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
                className="group flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-white/[0.04] border border-black/10 dark:border-white/10 shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all"
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
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="relative flex flex-col justify-center items-center text-center rounded-3xl p-8 md:p-10 overflow-hidden bg-gradient-to-br from-blue-600 via-violet-600 to-fuchsia-600 text-white shadow-2xl shadow-violet-600/30"
          >
            <div className="absolute inset-0 bg-dot-grid opacity-25" aria-hidden />
            <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-white/20 blur-3xl" aria-hidden />
            <div className="relative">
              <h3 className="font-display text-2xl md:text-3xl font-bold mb-3 text-balance">
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
