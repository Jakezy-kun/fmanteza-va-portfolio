"use client"

import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/sections/hero"
import { AboutSection } from "@/components/sections/about"
import { SkillsSection } from "@/components/sections/skills"
import { ExperienceSection } from "@/components/sections/experience"
import { ProjectsSection } from "@/components/sections/projects"
import { ContactSection } from "@/components/sections/contact"

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <Navbar />
      
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <ContactSection />
      
      <footer className="bg-gray-100 dark:bg-gray-800 py-6 text-center">
        <p className="text-gray-600 dark:text-gray-400">
          © 2026 Ferdinand M. Manteza Jr. All rights reserved.
        </p>
      </footer>
    </main>
  )
}
