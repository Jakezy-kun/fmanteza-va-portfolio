"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Mail, FolderGit2, ChevronDown, Sparkles, MapPin } from "lucide-react"
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons"
import { Magnetic } from "@/components/ui/magnetic"

const stats = [
  { value: "6+", label: "Projects shipped" },
  { value: "8", label: "Tech domains" },
  { value: "2+", label: "Years building" },
]

const floatingChips = [
  { label: "React • Next.js", className: "top-6 left-2 md:-left-10", delay: "0s" },
  { label: "UI/UX • Figma", className: "bottom-16 right-2 md:-right-8", delay: "1.2s" },
  { label: "Flutter • Firebase", className: "bottom-4 left-6 md:left-2", delay: "2.1s" },
]

export function HeroSection() {
  const scrollToAbout = () => {
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-4 pt-24 pb-20 overflow-hidden bg-white dark:bg-gray-950"
    >
      {/* Bold colorful backdrop */}
      <div className="absolute inset-0 bg-mesh-bold" aria-hidden />
      <div className="absolute inset-0 bg-dot-grid opacity-60 [mask-image:radial-gradient(70%_60%_at_50%_40%,black,transparent)]" aria-hidden />
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-blue-500/25 dark:bg-blue-600/25 blur-3xl animate-blob" aria-hidden />
      <div className="absolute top-1/3 -right-24 w-[28rem] h-[28rem] rounded-full bg-fuchsia-500/20 dark:bg-fuchsia-600/20 blur-3xl animate-blob" style={{ animationDelay: "2s" }} aria-hidden />
      <div className="absolute bottom-0 left-1/3 w-96 h-72 rounded-full bg-violet-500/20 dark:bg-violet-600/20 blur-3xl animate-blob" style={{ animationDelay: "4s" }} aria-hidden />

      <div className="relative max-w-6xl mx-auto grid md:grid-cols-[1.1fr_0.9fr] gap-12 items-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center md:text-left"
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-white/70 dark:bg-white/10 glass border border-blue-500/25 dark:border-white/15 text-gray-700 dark:text-gray-200 shadow-sm mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            Available for work
            <span className="hidden sm:inline-flex items-center gap-1 text-gray-500 dark:text-gray-400">
              <MapPin size={12} /> Davao City, PH
            </span>
          </motion.div>

          <p className="flex items-center justify-center md:justify-start gap-2 text-sm font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400 mb-3">
            <Sparkles size={16} />
            Full Stack Developer
          </p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight text-gray-900 dark:text-white mb-4 text-balance">
            Ferdinand M.{" "}
            <span className="text-gradient-brand">Manteza Jr.</span>
          </h1>
          <h2 className="text-xl md:text-2xl font-medium text-gray-700 dark:text-gray-300 mb-4">
            UX / Product Designer for Learning Technologies
          </h2>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto md:mx-0">
            I build web & mobile products that bridge technology and education —
            from research and prototypes to production-ready apps.
          </p>

          <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-8">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-600 bg-[length:180%_100%] hover:bg-right text-white font-semibold rounded-2xl shadow-xl shadow-violet-600/30 hover:shadow-violet-600/50 hover:-translate-y-0.5 transition-all"
            >
              <Mail size={19} className="group-hover:rotate-6 transition-transform" />
              Hire Me
            </a>
            <button
              onClick={scrollToAbout}
              className="inline-flex items-center gap-2 px-7 py-3.5 font-semibold rounded-2xl bg-white/70 dark:bg-white/10 glass border border-black/10 dark:border-white/15 text-gray-900 dark:text-white hover:border-violet-500/50 hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <FolderGit2 size={19} />
              View Projects
            </button>
            <div className="flex items-center gap-2">
              <Magnetic strength={8}>
              <a
                href="https://github.com/Jakezy-kun"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="w-12 h-12 rounded-2xl flex items-center justify-center bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:scale-105 hover:shadow-xl transition-all"
              >
                <GithubIcon size={20} />
              </a>
              </Magnetic>
              <Magnetic strength={8}>
              <a
                href="https://www.linkedin.com/in/ferdinand-m-manteza-015564327/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="w-12 h-12 rounded-2xl flex items-center justify-center bg-[#0A66C2] text-white hover:scale-105 hover:shadow-xl hover:shadow-blue-600/30 transition-all"
              >
                <LinkedinIcon size={20} />
              </a>
              </Magnetic>
            </div>
          </div>

          <dl className="flex flex-wrap items-center justify-center md:justify-start gap-x-8 gap-y-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="text-center md:text-left"
              >
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  {s.value}
                </dd>
                <dd className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  {s.label}
                </dd>
              </motion.div>
            ))}
          </dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="flex justify-center relative"
        >
          <div className="relative">
            <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-blue-600 via-violet-600 to-fuchsia-600 opacity-30 dark:opacity-40 blur-2xl" aria-hidden />
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-[2rem] overflow-hidden border border-white/40 dark:border-white/15 shadow-2xl ring-glow-blue animate-float">
              <Image
                src="/profile-pic.jpg"
                alt="Portrait of Ferdinand M. Manteza Jr."
                fill
                sizes="(max-width: 640px) 256px, (max-width: 768px) 288px, 320px"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-violet-900/30 via-transparent to-transparent" aria-hidden />
            </div>

            {floatingChips.map((chip) => (
              <span
                key={chip.label}
                style={{ animationDelay: chip.delay }}
                className={`absolute ${chip.className} px-3 py-1.5 rounded-full text-xs font-semibold bg-white/85 dark:bg-gray-900/85 glass border border-black/10 dark:border-white/15 text-gray-800 dark:text-gray-100 shadow-lg animate-float whitespace-nowrap`}
              >
                {chip.label}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.button
        onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        aria-label="Scroll to about section"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center bg-white/70 dark:bg-white/10 glass border border-black/10 dark:border-white/15 text-gray-600 dark:text-gray-300 animate-bounce hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
      >
        <ChevronDown size={20} />
      </motion.button>
    </section>
  )
}
