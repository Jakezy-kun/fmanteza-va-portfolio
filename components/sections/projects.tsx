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
  ExternalLink,
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
  //    Leave empty [] to show a branded gradient cover instead.
  images: string[]
  featured: boolean
  // LIVE SITE: replace the "#" placeholder with the deployed URL
  // (e.g. "https://primera-ai.vercel.app"). The tap-to-visit icon only
  // renders on cards that have a url — delete the line to hide it.
  url?: string
  // highlight marks a card with the featured badge AND an accent ring
  highlight?: boolean
  // titleSlide: prepends a gradient title card as slide 1 and shows the
  // screenshots in full (uncropped) over a blurred backdrop. Turn on for
  // cards whose `images` are real screenshots (mixed aspect ratios).
  // `accent` overrides the title-card gradient (Tailwind from/via/to stops).
  titleSlide?: boolean
  accent?: string
}

const projects: Project[] = [
  {
    title: "Socorra",
    year: "2026",
    discipline: "Full Stack",
    role: "UI/UX Designer and Full Stack Developer",
    description:
      "An AI-assisted checker for paper-based MCQ tests. Philippine public school teachers photograph answer sheets written on ordinary ruled paper, and a vision-language model reads the handwritten answers. Low-confidence readings go to the teacher for review before the system grades against the answer key. It also produces DepEd-aligned item and competency analytics, plus Excel exports for class records.",
    tags: ["Web", "Full Stack", "AI", "Education", "Supabase", "Ollama", "React", "TypeScript"],
    images: [
      "/projects/socorra.svg",
      "/projects/socorra/Onboarding Page.png",
      "/projects/socorra/Login Page.png",
    ],
    featured: true,
    url: "#",
    highlight: true,
    titleSlide: true,
    accent: "from-teal-600 via-cyan-600 to-blue-600",
  },
  {
    title: "PrimeraAI",
    year: "2026",
    discipline: "Full Stack",
    role: "UI/UX Designer and Full Stack Developer",
    description:
      "An AI-powered learning platform with lesson-scoped retrieval-augmented generation (RAG). It manages classes, lessons, quizzes, and student mastery, and includes parent-student links and AI monitoring. I contributed to the design audit, the documentation, and the business model.",
    tags: ["Web", "Full Stack", "AI", "RAG", "Education", "Laravel", "Gemini", "Supabase"],
    images: [
      "/projects/primera-ai.svg",
      "/projects/primera-ai/Onboarding Page.png",
      "/projects/primera-ai/Login Page.png",
      "/projects/primera-ai/Student Dashboard Page.png",
      "/projects/primera-ai/Teacher Dashboard Page.png",
      "/projects/primera-ai/Parent Dashboard Page.png",
      "/projects/primera-ai/Admin Dashboard Page.png",
    ],
    featured: true,
    url: "#",
    highlight: true,
    titleSlide: true,
    accent: "from-indigo-600 via-violet-600 to-fuchsia-600",
  },
  {
    title: "PawPedia",
    year: "2026",
    discipline: "Mobile Dev",
    role: "UI/UX Designer and Mobile & Full Stack Developer",
    description:
      "A mobile dog-breeds directory where users browse breeds by group, search and filter by name or country, and save favourites. It is backed by a custom PHP/MySQL REST API with full CRUD and bearer-token auth, and live dog photos come from the Dog CEO API. Accounts, profiles, and synced favourites run on Supabase with email sign-in and a guest mode that stores favourites on the device — and it works without any API keys by falling back to bundled sample breeds.",
    tags: ["Mobile", "Full Stack", "Flutter", "REST API", "Supabase", "PHP", "MySQL"],
    images: ["/projects/pawpedia.svg"],
    featured: true,
    url: "#",
    highlight: true,
  },
  {
    title: "Lamdag LMS",
    year: "2025",
    discipline: "Frontend",
    role: "Full UI/UX Designer and Frontend Developer",
    description:
      "A cloud-based e-learning platform where teachers create courses, upload materials, and assign work. Gemini 2.5 Flash generates quizzes from the uploaded materials, and teachers review, edit, and approve every question before it reaches students. Students enroll with a course code, take auto-scored quizzes, and track their progress, while teachers see class-level analytics.",
    tags: ["Web", "Frontend", "AI", "LMS", "Education", "Next.js", "Supabase"],
    images: [
      "/projects/lamdag-lms.svg",
      "/projects/lamdag-lms/Screenshot 2026-10-12 165405.png",
      "/projects/lamdag-lms/Screenshot 2026-10-12 165434.png",
    ],
    featured: false,
    url: "#",
    titleSlide: true,
    accent: "from-emerald-600 via-teal-600 to-cyan-600",
  },
  {
    title: "RecallLab",
    year: "2025",
    discipline: "UI/UX Design",
    role: "UI/UX Designer and Full Stack Developer",
    description:
      "A UI design for a study-habits app aimed at students. It covers a focus timer with distraction logging, subject tracking, flashcards with Review, Blurting, and Feynman modes, and a progress dashboard with AI insights. The dark, teal-accented interface spans login, dashboard, timer, subjects, flashcards, analytics, and settings.",
    tags: ["UI/UX", "Product Design", "Study", "AI", "Figma"],
    images: [
      "/projects/recall-lab.svg",
      "/projects/recall-lab/Login Page.png",
      "/projects/recall-lab/Dashboard Page.png",
    ],
    featured: false,
    url: "#",
    titleSlide: true,
    accent: "from-teal-700 via-teal-600 to-teal-500",
  },
  {
    title: "LuminaMind",
    year: "2025",
    discipline: "UI/UX Design",
    role: "Machine Learning Researcher / UI/UX Designer",
    description:
      "A machine learning proof-of-concept that predicts growing stress among Filipino college students using a Random Forest classifier trained on a filtered, culturally contextualized dataset. It includes a high-fidelity prototype of how students would see predictive feedback. The prototype reached 53% accuracy on a small dataset, and the paper documents its limitations and next steps.",
    tags: ["ML", "Python", "scikit-learn", "Research", "Figma", "UI/UX"],
    images: [
      "/projects/lumina-mind.svg",
      "/projects/lumina-mind/Question-1.png",
      "/projects/lumina-mind/Mild Result.png",
      "/projects/lumina-mind/Moderate Result.png",
      "/projects/lumina-mind/Severe Result.png",
    ],
    featured: false,
    url: "#",
    titleSlide: true,
    accent: "from-indigo-800 via-violet-700 to-pink-600",
  },
  {
    title: "Grind Set",
    year: "2024",
    discipline: "Full Stack",
    role: "UI/UX Designer and Full Stack Developer",
    description:
      "An employee task management system with separate admin and employee views. Admins create and assign tasks, manage users, and track deadlines on a dashboard, while employees view assigned tasks and update their status. It supports full CRUD and filtering by due today, overdue, and no deadline.",
    tags: ["Web", "Full Stack", "Productivity", "PHP", "MySQL"],
    images: [
      "/projects/grindset.svg",
      "/projects/grindset/Login Page.png",
      "/projects/grindset/Admin Page.png",
      "/projects/grindset/User Page.png",
    ],
    featured: false,
    url: "#",
    titleSlide: true,
    accent: "from-orange-600 via-amber-500 to-rose-500",
  },
  {
    title: "Chronolist",
    year: "2023",
    discipline: "Frontend",
    role: "UI/UX Designer and Frontend Developer",
    description:
      "A student task manager for organizing schoolwork, hobbies, and daily routines. It uses a relational database with user accounts, tasks, and task types; I designed the entity-relationship diagram and built part of the interface. The app uses SQL joins to surface in-progress tasks and deadlines due within seven days.",
    tags: ["Desktop", "Frontend", "Productivity", "Java", "MySQL"],
    images: [
      "/projects/chrono-list.svg",
      "/projects/chrono-list/Landing Page.png",
      "/projects/chrono-list/Home Page.png",
      "/projects/chrono-list/Home Screen.png",
      "/projects/chrono-list/Landing Page (1).png",
    ],
    featured: false,
    url: "#",
    titleSlide: true,
    accent: "from-sky-600 via-blue-600 to-indigo-600",
  },
  {
    title: "Pallitab",
    year: "2025",
    discipline: "Game Dev",
    role: "UI/UX Designer and Mobile, Full Stack, and Game Developer",
    description:
      "A reading-comprehension app that presents classic Filipino stories in English. Learners unlock stories as they earn XP, giving reading a game-like sense of progression. After each story, WH-question exercises in multiple-choice, true/false, and sequencing formats test comprehension with instant feedback, and a parent and teacher dashboard tracks each learner's progress.",
    tags: ["Mobile", "Game Dev", "UI/UX", "Educational", "Flutter", "Firebase"],
    images: [
      "/projects/palitab.svg",
      "/projects/palitab/Onboarding Page.png",
      "/projects/palitab/Onboarding 2 Page.png",
      "/projects/palitab/Login Page.jpg",
      "/projects/palitab/Student Dashboard.png",
      "/projects/palitab/Parent&Teacher Dashboard.png",
    ],
    featured: true,
    url: "#",
    titleSlide: true,
    accent: "from-violet-600 via-fuchsia-600 to-rose-500",
  },
  {
    title: "EfficiAdmin / OSAD Hub",
    year: "2025",
    discipline: "QA",
    role: "UI/UX Designer and Quality Assurance Analyst/Tester",
    description:
      "An administrative workflow system for the College of Computer Studies Dean's Office at UIC, connecting to the OSAD Digital Hub. It replaces paper forms, Google Forms, and spreadsheets for student requests and equipment borrowing: student officers book equipment and write event activity plans in a built-in document editor with templates, e-signature, and PDF export; assistants and the Dean review and approve, reject, or return requests; staff track inventory, mark items returned or overdue, and process walk-in checkouts. Role-based access covers the Dean, admin assistants, and student officers, with status dashboards and notifications.",
    tags: ["Web", "QA", "Collaboration", "Education", "Laravel", "MySQL"],
    images: ["/projects/effici-admin.svg"],
    featured: false,
    url: "#",
  },
  {
    title: "CLINI-GUIDE",
    year: "2025",
    discipline: "UI/UX Design",
    role: "Lead Researcher and UI/UX Designer",
    description:
      "A quantitative research project designing a mobile healthcare app for senior citizens and persons with disabilities who often struggle with long waits and travel to clinics. The app lets patients receive lab results, find nearby clinics, and manage checkup and follow-up appointments through an interface built for elderly and PWD users. The study benchmarks it against KonsultaMD, HealthNow PH, and Medifi, and evaluates the design with a heuristic assessment and the 18-item mHealth App Usability Questionnaire (mAUQ).",
    tags: ["Mobile", "UI/UX", "Research", "Healthcare", "Accessibility", "Figma"],
    images: [
      "/projects/clini-guide.svg",
      "/projects/clini-guide/Welcome Page.png",
      "/projects/clini-guide/Login Page.png",
      "/projects/clini-guide/Patient Dashboard Page.png",
      "/projects/clini-guide/Doctor Dashboard Page.png",
    ],
    featured: false,
    url: "#",
    titleSlide: true,
    accent: "from-blue-600 via-cyan-600 to-emerald-600",
  },
  {
    title: "ByteBack",
    year: "2025",
    discipline: "Mobile Dev",
    role: "UI/UX Designer and Mobile & Full Stack Developer",
    description:
      "A second-hand tech marketplace concept (formerly ReBooted) that gives old gadgets a second life instead of sending them to landfills as e-waste. Users list and sell used tech and complete transactions through in-app chat, a map-based feature guides users to nearby e-waste collection points, and local meetups for green tech let buyers and sellers trade in person. The rollout plan is a niche launch, then trust building, then expansion into more product categories.",
    tags: ["Mobile", "Concept", "Sustainability", "UI/UX", "Product"],
    images: ["/projects/reboot.svg"],
    featured: false,
    url: "#",
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
    url: "#",
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
              const isHighlighted = Boolean(project.highlight)
              return (
                <TiltCard key={project.title} maxTilt={5} className="h-full rounded-2xl">
                  <motion.article
                    layout
                    key={project.title}
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.94 }}
                    transition={{ duration: 0.35 }}
                    className={`group flex flex-col h-full overflow-hidden rounded-2xl bg-white dark:bg-gray-950 border shadow-lg hover:shadow-2xl active:shadow-xl hover:-translate-y-1.5 active:translate-y-0 active:scale-[0.98] touch-manipulation transition-all ${
                      isHighlighted
                        ? "border-violet-400/70 dark:border-violet-400/40 ring-2 ring-violet-500/40 dark:ring-violet-400/30 shadow-violet-500/20 hover:shadow-violet-500/30"
                        : "border-black/10 dark:border-white/10"
                    }`}
                  >
                    {/* Cover: title slide + screenshots = 3s auto carousel */}
                    <ProjectCover
                      images={project.images}
                      title={project.title}
                      year={project.year}
                      featured={project.featured}
                      accent={project.accent}
                      titleSlide={project.titleSlide}
                    />

                    <div className="flex flex-col flex-1 p-5 md:p-6">
                      <span className={`inline-flex w-fit items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border ${meta.pill}`}>
                        <meta.icon size={13} />
                        {project.discipline}
                      </span>
                      <div className="mt-2.5 flex items-start justify-between gap-3">
                        <h3 className="font-display text-xl font-bold text-gray-900 dark:text-white">
                          {project.title}
                        </h3>
                        {project.url && (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Open the live ${project.title} site in a new tab`}
                            title="View live site"
                            className="shrink-0 inline-flex items-center justify-center w-10 h-10 -mt-1 rounded-full border border-black/10 dark:border-white/15 bg-black/5 dark:bg-white/10 text-gray-700 dark:text-gray-200 hover:text-white hover:bg-gradient-to-r hover:from-blue-600 hover:via-violet-600 hover:to-fuchsia-600 hover:border-transparent active:scale-90 transition-all touch-manipulation"
                          >
                            <ExternalLink size={16} />
                          </a>
                        )}
                      </div>
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
