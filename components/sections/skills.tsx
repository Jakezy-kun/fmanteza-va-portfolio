"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  CodeXml,
  Server,
  Database,
  Smartphone,
  Cloud,
  Palette,
  Wrench,
  Globe,
  Sparkles,
  Pause,
  Play,
  PenTool,
  ScanSearch,
  Shapes,
  ShieldCheck,
  Gamepad2,
  type LucideIcon,
} from "lucide-react"
import {
  SiHtml5,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiVuedotjs,
  SiShadcnui,
  SiPhp,
  SiNodedotjs,
  SiPython,
  SiMysql,
  SiPostgresql,
  SiMongodb,
  SiSupabase,
  SiFlutter,
  SiDart,
  SiFirebase,
  SiCloudinary,
  SiVercel,
  SiDocker,
  SiRailway,
  SiFigma,
  SiGit,
  SiGithub,
  SiIntellijidea,
  SiAndroidstudio,
} from "react-icons/si"
import { BiLogoCss3 } from "react-icons/bi"
import { FaJava } from "react-icons/fa"
import { VscVscode } from "react-icons/vsc"
import { SectionHeading } from "@/components/ui/section-heading"
import { LogoMarquee, type MarqueeLogo } from "@/components/ui/logo-marquee"
import { MagicPatternsIcon } from "@/components/ui/brand-icons"

/* ---------- data ---------- */

type CategoryId = "frontend" | "backend" | "databases" | "mobile" | "cloud" | "design" | "tools"

interface Category {
  id: CategoryId
  chip: string
  title: string
  icon: LucideIcon
  tier?: string
  level?: number
  gradient: string
}

const categories: Category[] = [
  { id: "frontend", chip: "Frontend", title: "Frontend Development", icon: CodeXml, tier: "Advanced", level: 90, gradient: "from-blue-500 to-cyan-400" },
  { id: "backend", chip: "Backend", title: "Backend Development", icon: Server, tier: "Proficient", level: 82, gradient: "from-emerald-500 to-teal-400" },
  { id: "databases", chip: "Databases", title: "Databases", icon: Database, tier: "Proficient", level: 85, gradient: "from-violet-500 to-fuchsia-400" },
  { id: "mobile", chip: "Mobile & Game", title: "Mobile & Game Dev", icon: Smartphone, tier: "Proficient", level: 78, gradient: "from-orange-500 to-rose-500" },
  { id: "cloud", chip: "Cloud", title: "Cloud & Deployment", icon: Cloud, tier: "Proficient", level: 80, gradient: "from-indigo-500 to-blue-400" },
  { id: "design", chip: "Design & Product", title: "Design & Product", icon: Palette, tier: "Advanced", level: 88, gradient: "from-pink-500 to-fuchsia-500" },
  { id: "tools", chip: "Dev Tools", title: "Dev Tools", icon: Wrench, tier: "Daily drivers", gradient: "from-gray-600 to-gray-800" },
]

const MONO = { light: "#111827", dark: "#F9FAFB" }

const tools: Record<CategoryId, MarqueeLogo[]> = {
  frontend: [
    { name: "HTML5", icon: SiHtml5, light: "#E34F26" },
    { name: "CSS3", icon: BiLogoCss3, light: "#1572B6", dark: "#3B9BE0" },
    { name: "JavaScript", icon: SiJavascript, light: "#E8C600", dark: "#F7DF1E" },
    { name: "TypeScript", icon: SiTypescript, light: "#3178C6", dark: "#4E94E0" },
    { name: "React", icon: SiReact, light: "#087EA4", dark: "#61DAFB" },
    { name: "Vue.js", icon: SiVuedotjs, light: "#42B883" },
    { name: "shadcn/ui", icon: SiShadcnui, ...MONO },
  ],
  backend: [
    { name: "Java", icon: FaJava, light: "#E76F00", dark: "#F89820" },
    { name: "PHP", icon: SiPhp, light: "#777BB4", dark: "#9A9ED6" },
    { name: "Node.js", icon: SiNodedotjs, light: "#5FA04E", dark: "#7CC36A" },
    { name: "Python", icon: SiPython, light: "#3776AB", dark: "#FFD43B" },
  ],
  databases: [
    { name: "MySQL", icon: SiMysql, light: "#4479A1", dark: "#6BA3CF" },
    { name: "PostgreSQL", icon: SiPostgresql, light: "#4169E1", dark: "#6E8EF0" },
    { name: "MongoDB", icon: SiMongodb, light: "#47A248", dark: "#5FBF5F" },
    { name: "Supabase", icon: SiSupabase, light: "#3ECF8E" },
  ],
  mobile: [
    { name: "Flutter", icon: SiFlutter, light: "#02569B", dark: "#54C5F8" },
    { name: "Dart", icon: SiDart, light: "#0175C2", dark: "#2CB7F6" },
    { name: "Mobile Game Dev", icon: Gamepad2, light: "#EA580C", dark: "#FB923C" },
  ],
  cloud: [
    { name: "Firebase", icon: SiFirebase, light: "#F59E0B", dark: "#FFCA28" },
    { name: "Cloudinary", icon: SiCloudinary, light: "#3448C5", dark: "#6B7FF0" },
    { name: "Vercel", icon: SiVercel, ...MONO },
    { name: "Docker", icon: SiDocker, light: "#2496ED" },
    { name: "Railway", icon: SiRailway, ...MONO },
  ],
  design: [
    { name: "Figma", icon: SiFigma, light: "#F24E1E" },
    { name: "Magic Patterns", icon: MagicPatternsIcon, light: "#8B78C4", dark: "#A390CB" },
    { name: "UI/UX Design", icon: PenTool, light: "#DB2777", dark: "#F472B6" },
    { name: "User Research", icon: ScanSearch, light: "#C026D3", dark: "#E879F9" },
    { name: "Product Design", icon: Shapes, light: "#7C3AED", dark: "#A78BFA" },
    { name: "QA Testing", icon: ShieldCheck, light: "#E11D48", dark: "#FB7185" },
  ],
  tools: [
    { name: "Git", icon: SiGit, light: "#F05032" },
    { name: "GitHub", icon: SiGithub, ...MONO },
    { name: "VS Code", icon: VscVscode, light: "#007ACC", dark: "#3EA7F5" },
    { name: "IntelliJ IDEA", icon: SiIntellijidea, ...MONO },
    { name: "Android Studio", icon: SiAndroidstudio, light: "#1FA463", dark: "#3DDC84" },
  ],
}

const withGroup = (ids: CategoryId[]) => ids.flatMap((id) => tools[id].map((t) => ({ ...t, group: id })))

// Three rows, alternating direction, grouped so a spotlight lights up a clear run.
const rows: { logos: MarqueeLogo[]; reverse: boolean }[] = [
  { logos: withGroup(["frontend", "design"]), reverse: false },
  { logos: withGroup(["backend", "databases", "cloud"]), reverse: true },
  { logos: withGroup(["mobile", "tools"]), reverse: false },
]

const spokenLanguages = ["English", "Filipino", "Cebuano (Native)"]

const totalTools = Object.values(tools).reduce((n, list) => n + list.length, 0)

/* ---------- section ---------- */

export function SkillsSection() {
  const [active, setActive] = useState<CategoryId | null>(null)
  const [paused, setPaused] = useState(false)
  const current = categories.find((c) => c.id === active) ?? null

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

        {/* Discipline filter: spotlights its tools inside the carousel */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5 }}
          className="-mx-4 px-4 overflow-x-auto scrollbar-none"
        >
          <div role="group" aria-label="Spotlight a discipline" className="flex w-max mx-auto gap-2 p-1.5 rounded-full bg-white/80 dark:bg-white/[0.04] border border-black/10 dark:border-white/10 shadow-sm">
            <FilterChip label="All" selected={active === null} onClick={() => setActive(null)} />
            {categories.map((c) => (
              <FilterChip
                key={c.id}
                label={c.chip}
                selected={active === c.id}
                onClick={() => setActive(active === c.id ? null : c.id)}
              />
            ))}
          </div>
        </motion.div>

        {/* Detail strip for the selected discipline */}
        <div className="mt-6 md:mt-8 h-[88px] sm:h-[76px]" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current?.id ?? "all"}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
              className="h-full max-w-3xl mx-auto flex items-center gap-4 rounded-2xl px-4 sm:px-5 bg-white dark:bg-gray-950 border border-black/10 dark:border-white/10 shadow-sm"
            >
              <span
                className={`w-11 h-11 shrink-0 rounded-xl flex items-center justify-center shadow-md bg-gradient-to-br ${
                  current?.gradient ?? "from-blue-600 via-violet-600 to-fuchsia-600"
                }`}
              >
                {current ? <current.icon className="w-5 h-5 text-white" /> : <Sparkles className="w-5 h-5 text-white" />}
              </span>

              <div className="min-w-0 flex-1 flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-5">
                <div className="min-w-0">
                  <p className="font-display font-bold text-gray-900 dark:text-white truncate">
                    {current ? current.title : "The whole toolkit"}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 line-clamp-2 sm:line-clamp-1">
                    {current
                      ? `${current.tier} · ${tools[current.id].length} tools`
                      : `${totalTools} tools across ${categories.length} disciplines — pick one to spotlight it`}
                  </p>
                </div>

                {current?.level !== undefined && (
                  <div className="flex items-center gap-3 sm:ml-auto sm:w-56">
                    <div className="h-1.5 flex-1 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${current.level}%` }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                        className={`h-full rounded-full bg-gradient-to-r ${current.gradient}`}
                      />
                    </div>
                    <span className="font-display text-xs font-bold tabular-nums text-gray-600 dark:text-gray-300">
                      {current.level}%
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* The carousel */}
        <div className="mt-6 md:mt-8 space-y-3 md:space-y-4 -mx-4 sm:mx-0">
          {rows.map((row, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: row.reverse ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: "easeOut" }}
            >
              <LogoMarquee logos={row.logos} reverse={row.reverse} paused={paused} spotlight={active} />
            </motion.div>
          ))}
        </div>

        {/* Screen-reader version of the carousel (the marquee itself is decorative) */}
        <div className="sr-only">
          {categories.map((c) => (
            <div key={c.id}>
              <h3>
                {c.title}
                {c.tier ? ` (${c.tier})` : ""}
              </h3>
              <ul>
                {tools[c.id].map((t) => (
                  <li key={t.name}>{t.name}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer: motion control + spoken languages */}
        <div className="mt-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-pressed={paused}
            className="marquee-toggle inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-gray-600 dark:text-gray-300 bg-white/80 dark:bg-white/[0.04] border border-black/10 dark:border-white/10 hover:text-gray-900 dark:hover:text-white hover:border-violet-500/40 active:scale-95 touch-manipulation transition-all"
          >
            {paused ? <Play size={14} /> : <Pause size={14} />}
            {paused ? "Resume carousel" : "Pause carousel"}
          </button>

          <div className="flex items-center gap-3 text-sm">
            <span className="w-8 h-8 shrink-0 rounded-lg bg-gradient-to-br from-gray-700 to-gray-900 dark:from-white/20 dark:to-white/5 flex items-center justify-center">
              <Globe size={15} className="text-white dark:text-gray-100" />
            </span>
            <p className="text-gray-500 dark:text-gray-400">
              <span className="font-semibold text-gray-900 dark:text-white">Speaks</span>{" "}
              {spokenLanguages.join(" · ")}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function FilterChip({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`relative px-3.5 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap touch-manipulation transition-colors ${
        selected ? "text-white" : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
      }`}
    >
      {selected && (
        <motion.span
          layoutId="skills-chip"
          transition={{ type: "spring", stiffness: 420, damping: 34 }}
          className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-600 shadow-md shadow-violet-600/25"
        />
      )}
      <span className="relative">{label}</span>
    </button>
  )
}
