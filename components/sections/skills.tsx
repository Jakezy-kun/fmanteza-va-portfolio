"use client"

import { motion } from "framer-motion"
import { Code2, Server, Database, Smartphone, Cloud, Wrench, Palette, Globe } from "lucide-react"
import { SectionHeading } from "@/components/ui/section-heading"

const coreSkills = [
  {
    icon: Code2,
    title: "Frontend Development",
    level: 90,
    tier: "Advanced",
    items: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Vue.js", "shadcn/ui"],
    gradient: "from-blue-500 to-cyan-400",
    bar: "from-blue-500 to-cyan-400",
  },
  {
    icon: Server,
    title: "Backend Development",
    level: 82,
    tier: "Proficient",
    items: ["Java", "PHP", "Node.js", "Python"],
    gradient: "from-emerald-500 to-teal-400",
    bar: "from-emerald-500 to-teal-400",
  },
  {
    icon: Database,
    title: "Databases",
    level: 85,
    tier: "Proficient",
    items: ["MySQL", "PostgreSQL", "MongoDB", "Supabase"],
    gradient: "from-violet-500 to-purple-400",
    bar: "from-violet-500 to-fuchsia-400",
  },
  {
    icon: Smartphone,
    title: "Mobile & Game Dev",
    level: 78,
    tier: "Proficient",
    items: ["Flutter", "Dart", "Mobile Game Dev"],
    gradient: "from-orange-500 to-rose-500",
    bar: "from-orange-500 to-rose-500",
  },
  {
    icon: Cloud,
    title: "Cloud & Deployment",
    level: 80,
    tier: "Proficient",
    items: ["Firebase", "Cloudinary", "Vercel", "Docker"],
    gradient: "from-indigo-500 to-blue-400",
    bar: "from-indigo-500 to-blue-400",
  },
  {
    icon: Palette,
    title: "Design & Product",
    level: 88,
    tier: "Advanced",
    items: ["UI/UX Design", "Figma", "User Research", "Product Design", "QA Testing"],
    gradient: "from-pink-500 to-fuchsia-500",
    bar: "from-pink-500 to-fuchsia-500",
  },
]

const secondarySkills = [
  {
    icon: Wrench,
    title: "Dev Tools",
    items: ["Git", "GitHub", "VS Code", "IntelliJ", "Android Studio"],
  },
  {
    icon: Globe,
    title: "Languages",
    items: ["English", "Filipino", "Cebuano (Native)"],
  },
]

export function SkillsSection() {
  return (
    <section id="skills" className="relative py-20 md:py-28 px-4 bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <div className="absolute inset-0 bg-dot-grid opacity-50 [mask-image:radial-gradient(60%_50%_at_50%_0%,black,transparent)]" aria-hidden />
      <div className="relative max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Skills & Services"
          title="Full-stack toolkit,"
          highlight="design-led"
          description="From database to deployment — with user research baked into every build."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {coreSkills.map((skill, index) => (
            <motion.article
              key={skill.title}
              initial={{ opacity: 0, y: 28, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: (index % 3) * 0.08 }}
              whileTap={{ scale: 0.97 }}
              className="group rounded-2xl p-6 bg-white dark:bg-gray-950 border border-black/10 dark:border-white/10 shadow-lg hover:shadow-2xl active:shadow-xl hover:-translate-y-1.5 active:translate-y-0 active:scale-[0.98] touch-manipulation transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${skill.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 group-active:scale-110 group-active:rotate-3 transition-transform`}>
                  <skill.icon className="w-6 h-6 text-white" />
                </div>
                <span className="font-display text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  {skill.tier}
                </span>
              </div>
              <h3 className="font-display text-lg font-bold mb-3 text-gray-900 dark:text-white">{skill.title}</h3>
              <div className="h-1.5 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden mb-4">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className={`h-full rounded-full bg-gradient-to-r ${skill.bar}`}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {skill.items.map((item) => (
                  <motion.span
                    key={item}
                    whileTap={{ scale: 1.12 }}
                    className="px-2.5 py-1 rounded-full text-xs font-medium bg-black/5 dark:bg-white/10 border border-black/5 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:border-violet-500/40 active:border-violet-500/60 active:bg-violet-500/10 touch-manipulation transition-colors cursor-pointer"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 gap-5 mt-5">
          {secondarySkills.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex items-center gap-4 rounded-2xl px-5 py-4 bg-white/70 dark:bg-white/[0.04] border border-dashed border-black/15 dark:border-white/15"
            >
              <span className="w-10 h-10 shrink-0 rounded-xl bg-gradient-to-br from-gray-700 to-gray-900 dark:from-white/20 dark:to-white/5 flex items-center justify-center">
                <s.icon size={18} className="text-white dark:text-gray-100" />
              </span>
              <div>
                <p className="text-sm font-bold text-gray-900 dark:text-white">{s.title}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{s.items.join(" · ")}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
