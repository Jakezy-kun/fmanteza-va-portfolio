"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Layers,
  PenTool,
  Smartphone,
  Gamepad2,
  ShieldCheck,
  MonitorSmartphone,
  type LucideIcon,
} from "lucide-react"
import { SectionHeading } from "@/components/ui/section-heading"
import { TiltCard } from "@/components/ui/tilt-card"
import { ProjectCover } from "@/components/ui/project-cover"

type Discipline = "Full Stack" | "Frontend" | "Mobile Dev" | "Game Dev" | "UI/UX Design" | "QA"

const DISCIPLINE_META: Record<Discipline, { icon: LucideIcon; pill: string }> = {
  "Full Stack": {
    icon: Layers,
    pill: "bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/25",
  },
  Frontend: {
    icon: MonitorSmartphone,
    pill: "bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-500/25",
  },
  "Mobile Dev": {
    icon: Smartphone,
    pill: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/25",
  },
  "Game Dev": {
    icon: Gamepad2,
    pill: "bg-violet-500/10 text-violet-700 dark:text-violet-300 border-violet-500/25",
  },
  "UI/UX Design": {
    icon: PenTool,
    pill: "bg-fuchsia-500/10 text-fuchsia-700 dark:text-fuchsia-300 border-fuchsia-500/25",
  },
  QA: {
    icon: ShieldCheck,
    pill: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/25",
  },
}

const filters = ["All", "Full Stack", "Frontend", "Mobile Dev", "Game Dev", "UI/UX Design", "QA"] as const
type Filter = (typeof filters)[number]

// tag → filter matching so secondary skills (e.g. UI/UX) stay discoverable
const TAG_TO_FILTER: Record<string, Filter> = {
  "full stack": "Full Stack",
  frontend: "Frontend",
  mobile: "Mobile Dev",
  "game dev": "Game Dev",
  "ui/ux": "UI/UX Design",
  qa: "QA",
}

interface Project {
  title: string
  year: string
  discipline: Discipline
  role: string
  description: string
  tags: string[]
  // HOW TO ADD YOUR OWN PHOTOS:
  // 1. Drop .jpg/.png files into public/projects/ (e.g. public/projects/palitab/shot-1.jpg)
  // 2. List them here. 1 photo = static cover. 2+ photos = auto-playing
  //    carousel (crossfades every 3s, with dots + arrows + pause on hover).
  images: string[]
  featured: boolean
}

const projects: Project[] = [
  {
    title: "Palitab",
    year: "2025",
    discipline: "Game Dev",
    role: "Mobile Developer / Game Developer / UI/UX Designer",
    description: "A mobile application game using Filipino classic stories in English with XP-based story unlocking progression and WH comprehension questions.",
    tags: ["Mobile", "Game Dev", "UI/UX", "Educational"],
    images: ["/projects/palitab.svg", "/projects/palitab-2.svg"],
    featured: true,
  },
  {
    title: "Reboot",
    year: "2025",
    discipline: "Mobile Dev",
    role: "Mobile Developer / UI/UX Designer",
    description: "An e-commerce mobile application focusing on e-waste technologies, specializing in selling 2nd hand technologies.",
    tags: ["Mobile", "E-commerce", "UI/UX", "Sustainability"],
    images: ["/projects/reboot.svg"],
    featured: true,
  },
  {
    title: "Effici-admin / OSAD Hub",
    year: "2025",
    discipline: "QA",
    role: "Quality Assurance (QA)",
    description: "A Web-Based System that streamlines how CCS students, CCS admins, and CCS dean collaborate on campus activity plans and equipment logistics.",
    tags: ["Web", "QA", "Collaboration", "Education"],
    images: ["/projects/effici-admin.svg"],
    featured: false,
  },
  {
    title: "Grindset",
    year: "2024",
    discipline: "Full Stack",
    role: "Full Stack Developer / UI/UX Designer",
    description: "A web-based platform designed to streamline the delegation, tracking, and completion of work, enhancing organizational productivity and accountability.",
    tags: ["Web", "Full Stack", "Productivity", "UI/UX"],
    images: ["/projects/grindset.svg"],
    featured: false,
  },
  {
    title: "Chrono-List",
    year: "2023",
    discipline: "Frontend",
    role: "Front End Developer",
    description: "A specialized digital task management tool designed to help students organize academic and personal tasks, set priorities, and track progress.",
    tags: ["Web", "Frontend", "Productivity", "Education"],
    images: ["/projects/chrono-list.svg"],
    featured: false,
  },
  {
    title: "Hotel Management",
    year: "2023",
    discipline: "Full Stack",
    role: "Full Stack Developer",
    description: "A centralized platform designed to automate hotel operations, including front desk tasks, reservations, and billing.",
    tags: ["Web", "Full Stack", "Management", "Automation"],
    images: ["/projects/hotel.svg"],
    featured: false,
  },
]

function matchesFilter(project: Project, active: Filter): boolean {
  if (active === "All") return true
  if (project.discipline === active) return true
  return project.tags.some((t) => TAG_TO_FILTER[t.toLowerCase()] === active)
}

export function ProjectsSection() {
  const [active, setActive] = useState<Filter>("All")

  const visible = projects.filter((p) => matchesFilter(p, active))

  return (
    <section id="projects" className="relative py-20 md:py-28 px-4 bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <div className="absolute inset-0 bg-dot-grid opacity-40 [mask-image:radial-gradient(60%_50%_at_50%_0%,black,transparent)]" aria-hidden />
      <div className="relative max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="Portfolio"
          title="Featured"
          highlight="projects"
          description="Organized by discipline — filter to see my Full Stack, UI/UX, QA, and mobile work."
        />

        {/* Filters — horizontally swipeable snap row on mobile, wrapped grid on desktop */}
        <div className="mb-10 -mx-4 px-4 md:mx-0 md:px-0 overflow-x-auto md:overflow-visible scrollbar-none" role="group" aria-label="Filter projects by discipline">
          <div className="flex md:flex-wrap md:justify-center gap-2 w-max md:w-auto snap-x snap-mandatory md:snap-none pb-1">
            {filters.map((f) => (
              <motion.button
                key={f}
                aria-pressed={active === f}
                onClick={() => setActive(f)}
                whileTap={{ scale: 0.92 }}
                transition={{ type: "spring", stiffness: 500, damping: 22 }}
                className={`snap-start shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all border min-h-[44px] touch-manipulation active:scale-95 ${
                  active === f
                    ? "text-white bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-600 border-transparent shadow-lg shadow-violet-600/30"
                    : "bg-white dark:bg-white/5 text-gray-600 dark:text-gray-300 border-black/10 dark:border-white/10 hover:border-violet-500/40 active:border-violet-500/60"
                }`}
              >
                {f}
              </motion.button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          <AnimatePresence mode="popLayout">
            {visible.map((project) => {
              const meta = DISCIPLINE_META[project.discipline]
              return (
                <TiltCard key={project.title} maxTilt={5} className="h-full rounded-2xl">
                  <motion.article
                    layout
                    key={project.title}
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.94 }}
                    transition={{ duration: 0.35 }}
                    className="group flex flex-col h-full overflow-hidden rounded-2xl bg-white dark:bg-gray-950 border border-black/10 dark:border-white/10 shadow-lg hover:shadow-2xl active:shadow-xl hover:-translate-y-1.5 active:translate-y-0 active:scale-[0.98] touch-manipulation transition-all"
                  >
                    {/* Cover: 1 photo = static, 2+ photos = 3s auto carousel */}
                    <ProjectCover
                      images={project.images}
                      title={project.title}
                      year={project.year}
                      featured={project.featured}
                    />

                    <div className="flex flex-col flex-1 p-5 md:p-6">
                      <span className={`inline-flex w-fit items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border ${meta.pill}`}>
                        <meta.icon size={13} />
                        {project.discipline}
                      </span>
                      <h3 className="font-display text-xl font-bold mt-2.5 text-gray-900 dark:text-white">
                        {project.title}
                      </h3>
                      <p className="mt-1 text-xs font-bold uppercase tracking-wider text-gradient-brand">{project.role}</p>
                      <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed flex-1">
                        {project.description}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 rounded-md text-[11px] font-medium bg-black/5 dark:bg-white/10 text-gray-600 dark:text-gray-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.article>
                </TiltCard>
              )
            })}
          </AnimatePresence>
        </motion.div>

        <p className="text-center mt-10 text-sm text-gray-500 dark:text-gray-400">
          Want the full story behind a build?{" "}
          <a href="#contact" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
            Let&apos;s talk →
          </a>
        </p>
      </div>
    </section>
  )
}
