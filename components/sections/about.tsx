"use client"

import { motion } from "framer-motion"
import { GraduationCap, Target, Lightbulb, Award, MapPin } from "lucide-react"
import { SectionHeading } from "@/components/ui/section-heading"

const cards = [
  {
    icon: GraduationCap,
    title: "Education",
    accent: "from-blue-500 to-cyan-400",
    glow: "group-hover:shadow-blue-500/25",
    body: (
      <div className="space-y-4">
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white">University of the Immaculate Conception</h4>
          <p className="text-gray-600 dark:text-gray-300 text-sm">BS in Information Technology</p>
          <p className="text-gray-600 dark:text-gray-300 text-sm">Major in Learning Technologies</p>
          <span className="inline-block mt-2 px-2.5 py-1 text-xs font-semibold rounded-full bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/20">
            2023 — 2026 · Current
          </span>
        </div>
        <div className="pt-3 border-t border-black/5 dark:border-white/10">
          <h4 className="font-semibold text-gray-900 dark:text-white text-sm">Holy Cross College of Calinan</h4>
          <p className="text-gray-500 dark:text-gray-400 text-sm">STEM Strand · 2010 — 2022</p>
        </div>
      </div>
    ),
  },
  {
    icon: Target,
    title: "Mission & Vision",
    accent: "from-violet-500 to-fuchsia-500",
    glow: "group-hover:shadow-violet-500/25",
    body: (
      <div className="space-y-3 text-sm leading-relaxed">
        <p className="text-gray-600 dark:text-gray-300">
          <strong className="text-gray-900 dark:text-white">Mission:</strong> Build practical tech that improves learning and admin workflows.
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          <strong className="text-gray-900 dark:text-white">Vision:</strong> Bridge technology and education through user-centered design.
        </p>
      </div>
    ),
  },
  {
    icon: Lightbulb,
    title: "Goals & Motivation",
    accent: "from-emerald-500 to-teal-400",
    glow: "group-hover:shadow-emerald-500/25",
    body: (
      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
        Driven by organizational productivity and accountability tools. Continually honing
        full-stack and product-design skills to deliver high-impact digital experiences.
      </p>
    ),
  },
  {
    icon: Award,
    title: "Key Achievements",
    accent: "from-amber-500 to-orange-500",
    glow: "group-hover:shadow-amber-500/25",
    body: (
      <ul className="space-y-2.5 text-sm">
        {[
          "3rd Year · 3rd Honor 1st Sem (2025-2026)",
          "3rd Year · 2nd Honor 2nd Sem (2026-2027)",
          "Core Member — UIC Google Developer Groups (2023–2024)",
          "Esports Technical Team — PSITS Region 11 (2023–2024)",
        ].map((a) => (
          <li key={a} className="flex items-start gap-2 text-gray-600 dark:text-gray-300">
            <span className="mt-1.5 w-1.5 h-1.5 shrink-0 rounded-full bg-gradient-to-r from-amber-500 to-orange-500" />
            {a}
          </li>
        ))}
      </ul>
    ),
  },
]

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
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
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

        <div className="grid sm:grid-cols-2 gap-5 md:gap-6">
          {cards.map((card, i) => (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 28, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, delay: (i % 2) * 0.1, type: "spring", stiffness: 120, damping: 18 }}
              whileTap={{ scale: 0.97 }}
              className={`group relative overflow-hidden rounded-2xl p-6 md:p-7 bg-white dark:bg-white/[0.04] border border-black/10 dark:border-white/10 shadow-lg hover:shadow-xl active:shadow-xl ${card.glow} hover:-translate-y-1 active:translate-y-0 active:scale-[0.98] touch-manipulation transition-all`}
            >
              <span className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${card.accent}`} aria-hidden />
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${card.accent} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-3 group-active:scale-110 group-active:rotate-3 transition-transform`}>
                <card.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-display text-xl font-bold mb-3 text-gray-900 dark:text-white">{card.title}</h3>
              {card.body}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
