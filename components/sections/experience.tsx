"use client"

import { motion } from "framer-motion"
import { Briefcase, Calendar, CheckCircle2 } from "lucide-react"
import { SectionHeading } from "@/components/ui/section-heading"

const experiences = [
  {
    title: "Market Lead (CMO) & UX/Product Designer",
    company: "Primera AI (formerly LearnShift)",
    period: "2025 — 2026 · Current",
    current: true,
    accent: "from-blue-500 via-violet-500 to-fuchsia-500",
    tags: ["User Research", "Design Thinking", "Prototyping", "Validation"],
    responsibilities: [
      "Conducted user research, fieldwork, and customer validation to identify real user needs",
      "Gathered and analyzed UI/UX feedback to improve product usability and design",
      "Led the design thinking process, focusing on user-centered solutions and product desirability",
      "Built user empathy through research and testing, iterating prototypes to address real-world problems"
    ]
  },
  {
    title: "Quality Assurance (QA)",
    company: "Effici-admin / OSAD Digital Hub",
    period: "2024 — 2025",
    current: false,
    accent: "from-emerald-500 via-teal-500 to-cyan-500",
    tags: ["QA Testing", "Web Systems", "EdTech", "Collaboration"],
    responsibilities: [
      "Performed quality assurance testing for a web-based system",
      "Streamlined collaboration between CCS students, admins, and dean",
      "Tested campus activity plans and equipment logistics features",
      "Ensured system reliability and user experience quality"
    ]
  }
]

export function ExperienceSection() {
  return (
    <section id="experience" className="relative py-20 md:py-28 px-4 bg-white dark:bg-gray-950 overflow-hidden">
      <div className="absolute inset-0 bg-mesh-bold opacity-50" aria-hidden />
      <div className="relative max-w-4xl mx-auto">
        <SectionHeading
          eyebrow="Career"
          title="Work"
          highlight="experience"
          description="Product thinking meets shipping discipline — research, QA, and iteration."
        />

        <div className="relative">
          {/* Timeline spine */}
          <span className="absolute left-[19px] md:left-[23px] top-2 bottom-8 w-[3px] rounded-full bg-gradient-to-b from-blue-500 via-violet-500 to-fuchsia-500 opacity-60" aria-hidden />

          <div className="space-y-6 md:space-y-8">
            {experiences.map((exp, index) => (
              <motion.article
                key={exp.company}
                initial={{ opacity: 0, x: -32 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.12 }}
                className="relative pl-12 md:pl-16"
              >
                {/* Node */}
                <span className="absolute left-2 md:left-3 top-6 flex items-center justify-center">
                  <span className={`absolute w-10 h-10 rounded-full bg-gradient-to-br ${exp.accent} opacity-25 blur-md`} aria-hidden />
                  <span className={`relative w-9 h-9 rounded-full bg-gradient-to-br ${exp.accent} flex items-center justify-center text-white shadow-lg ring-4 ring-white dark:ring-gray-950`}>
                    <Briefcase size={16} />
                  </span>
                </span>

                <div className="group rounded-2xl p-6 md:p-7 bg-white dark:bg-white/[0.04] border border-black/10 dark:border-white/10 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all overflow-hidden">
                  <span className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${exp.accent}`} aria-hidden />
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-4">
                    <div>
                      <h3 className="font-display text-xl md:text-2xl font-bold text-gray-900 dark:text-white leading-tight">
                        {exp.title}
                      </h3>
                      <p className="mt-1 font-semibold text-gradient-brand">{exp.company}</p>
                    </div>
                    <span className="inline-flex shrink-0 items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 text-gray-700 dark:text-gray-200">
                      <Calendar size={13} />
                      {exp.period}
                    </span>
                  </div>

                  {exp.current && (
                    <span className="inline-flex items-center gap-1.5 mb-4 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/25">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Current role
                    </span>
                  )}

                  <ul className="space-y-2.5 mb-5">
                    {exp.responsibilities.map((resp) => (
                      <li key={resp} className="flex items-start gap-2.5 text-sm md:text-[15px] text-gray-600 dark:text-gray-300 leading-relaxed">
                        <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-emerald-500" />
                        {resp}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2 pt-4 border-t border-black/5 dark:border-white/10">
                    {exp.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-500/10 to-fuchsia-500/10 border border-violet-500/20 text-gray-700 dark:text-gray-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
