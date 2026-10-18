"use client"

import { useState, useEffect } from "react"
import { Menu, X, Clock } from "lucide-react"
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion"
import { ThemeToggle } from "@/components/ui/theme-toggle"

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [time, setTime] = useState<string>("")
  const [active, setActive] = useState<string>("#home")
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 })

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24)
    }
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const philippinesTime = new Intl.DateTimeFormat('en-PH', {
        timeZone: 'Asia/Manila',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }).format(now)

      setTime(philippinesTime)
    }

    updateTime()
    const interval = setInterval(updateTime, 30000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`)
        })
      },
      { rootMargin: "-40% 0px -55% 0px" }
    )
    navItems.forEach((item) => {
      const el = document.querySelector(item.href)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setActive(href)
      setIsOpen(false)
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-white/75 dark:bg-gray-950/70 glass shadow-lg shadow-black/5 border-b border-black/5 dark:border-white/10"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      {/* Scroll progress */}
      <motion.div
        style={{ scaleX: progress }}
        className="absolute bottom-0 left-0 right-0 h-[2px] origin-left bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-500"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => scrollToSection("#home")}
            aria-label="Go to home"
            className="flex items-center gap-2.5 group"
          >
            <span className="w-9 h-9 rounded-xl flex items-center justify-center font-sans font-bold text-sm text-white bg-gradient-to-br from-blue-600 via-violet-600 to-fuchsia-600 shadow-lg shadow-violet-600/30 group-hover:shadow-violet-600/50 group-hover:scale-105 transition-all">
              FM
            </span>
            <span className="hidden sm:block text-left leading-tight">
              <span className="block text-sm font-bold text-gray-900 dark:text-white font-display">
                Ferdinand Manteza
              </span>
              <span className="block text-[11px] text-gray-500 dark:text-gray-400">
                Full Stack Developer
              </span>
            </span>
          </motion.button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  active === item.href
                    ? "text-blue-700 dark:text-white"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                {item.name}
                {active === item.href && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-lg bg-blue-600/10 dark:bg-white/10 border border-blue-600/20 dark:border-white/10"
                  />
                )}
              </button>
            ))}

            {/* Subtle live clock */}
            <div
              className="hidden lg:flex items-center gap-1.5 ml-2 px-2.5 py-1.5 text-xs text-gray-500 dark:text-gray-400"
              title="Philippines time"
            >
              <Clock className="h-3.5 w-3.5" />
              <span className="tabular-nums font-medium">{time || "--:--"}</span>
              <span className="text-[10px] uppercase tracking-wider">PH</span>
            </div>

            <div className="ml-2 flex items-center gap-2">
              <ThemeToggle />
              <button
                onClick={() => scrollToSection("#contact")}
                className="px-4 py-2 text-sm font-semibold text-white rounded-full bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-600 bg-[length:180%_100%] hover:bg-right shadow-lg shadow-violet-600/25 hover:shadow-violet-600/40 hover:-translate-y-px transition-all"
              >
                Hire Me
              </button>
            </div>
          </div>

          {/* Mobile controls */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              whileTap={{ scale: 0.85, rotate: 8 }}
              className="p-2.5 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10 active:bg-black/10 dark:active:bg-white/15 transition-colors touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
            >
              <motion.span
                key={isOpen ? "x" : "menu"}
                initial={{ rotate: -45, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.18 }}
              >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </motion.span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation — springy stagger + tap bounce so it feels alive */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.button
              aria-hidden
              tabIndex={-1}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="md:hidden fixed inset-0 top-16 -z-10 bg-black/20 backdrop-blur-[1px] cursor-default"
            />
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
              className="md:hidden overflow-hidden bg-white/95 dark:bg-gray-950/95 glass border-t border-black/5 dark:border-white/10"
            >
              <div className="px-4 py-4 space-y-1">
                {navItems.map((item, i) => (
                  <motion.button
                    key={item.name}
                    initial={{ opacity: 0, x: -16, scale: 0.98 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ delay: 0.03 + i * 0.045, type: "spring", stiffness: 400, damping: 26 }}
                    whileTap={{ scale: 0.96, x: 4 }}
                    onClick={() => scrollToSection(item.href)}
                    className={`block w-full text-left px-4 py-3 rounded-xl text-[15px] font-medium transition-colors touch-manipulation active:scale-[0.98] min-h-[48px] ${
                      active === item.href
                        ? "bg-gradient-to-r from-blue-600/10 to-fuchsia-600/10 text-blue-700 dark:text-white border border-blue-600/20 dark:border-white/10"
                        : "text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10 active:bg-black/10 dark:active:bg-white/15"
                    }`}
                  >
                    {item.name}
                  </motion.button>
                ))}

                <div className="flex items-center gap-3 pt-3">
                  <motion.button
                    onClick={() => scrollToSection("#contact")}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 px-4 py-3.5 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-600 shadow-lg active:shadow-md active:scale-[0.97] touch-manipulation transition-all min-h-[48px]"
                  >
                    Hire Me
                  </motion.button>
                  <div className="flex items-center gap-1.5 px-3 py-2 text-xs text-gray-500 dark:text-gray-400 tabular-nums">
                    <Clock className="h-4 w-4" />
                    {time || "--:--"} PH
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  )
}
