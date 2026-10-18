"use client"

import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/sections/hero"
import { AboutSection } from "@/components/sections/about"
import { SkillsSection } from "@/components/sections/skills"
import { ExperienceSection } from "@/components/sections/experience"
import { PlaygroundSection } from "@/components/sections/playground"
import { ProjectsSection } from "@/components/sections/projects"
import { ContactSection } from "@/components/sections/contact"
import { BackToTop } from "@/components/ui/back-to-top"
import { SectionDivider } from "@/components/ui/section-divider"
import { Magnetic } from "@/components/ui/magnetic"
import { Mail, ArrowUp } from "lucide-react"
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons"

export default function Home() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" })

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950 transition-colors">
      <Navbar />

      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <PlaygroundSection />
      <SectionDivider />
      <ProjectsSection />
      <SectionDivider flip />
      <ContactSection />

      <footer className="relative overflow-hidden border-t border-black/10 dark:border-white/10 bg-gray-50 dark:bg-gray-950">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent" aria-hidden />
        <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-xl flex items-center justify-center font-sans font-bold text-sm text-white bg-gradient-to-br from-blue-600 via-violet-600 to-fuchsia-600 shadow-lg">
              FM
            </span>
            <div className="text-left">
              <p className="text-sm font-bold text-gray-900 dark:text-white font-display">
                Ferdinand M. Manteza Jr.
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                © 2026 · Built with Next.js & Tailwind
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Magnetic strength={8}>
            <a
              href="https://github.com/Jakezy-kun"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="w-10 h-10 rounded-full flex items-center justify-center bg-black/5 dark:bg-white/10 text-gray-700 dark:text-gray-200 hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-colors"
            >
              <GithubIcon size={18} />
            </a>
            </Magnetic>
            <Magnetic strength={8}>
            <a
              href="https://www.linkedin.com/in/ferdinand-m-manteza-015564327/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-10 h-10 rounded-full flex items-center justify-center bg-black/5 dark:bg-white/10 text-gray-700 dark:text-gray-200 hover:bg-[#0A66C2] hover:text-white transition-colors"
            >
              <LinkedinIcon size={18} />
            </a>
            </Magnetic>
            <Magnetic strength={8}>
            <a
              href="mailto:fmanteza_230000001892@uic.edu.ph"
              aria-label="Email"
              className="w-10 h-10 rounded-full flex items-center justify-center bg-black/5 dark:bg-white/10 text-gray-700 dark:text-gray-200 hover:bg-blue-600 hover:text-white transition-colors"
            >
              <Mail size={18} />
            </a>
            </Magnetic>
            <Magnetic strength={6}>
            <button
              onClick={scrollTop}
              aria-label="Back to top"
              className="ml-2 inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-600 shadow-lg shadow-violet-600/25 hover:shadow-violet-600/40 hover:-translate-y-px transition-all"
            >
              <ArrowUp size={16} />
              Top
            </button>
            </Magnetic>
          </div>
        </div>
      </footer>

      <BackToTop />
    </main>
  )
}
