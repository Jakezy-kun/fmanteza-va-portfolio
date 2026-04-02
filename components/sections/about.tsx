"use client"

import { motion } from "framer-motion"
import { GraduationCap, Target, Lightbulb, Award } from "lucide-react"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
}

export function AboutSection() {
  return (
    <section id="about" className="py-20 px-4 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          {...fadeInUp}
          className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900 dark:text-white"
        >
          About Me
        </motion.h2>

        <motion.div {...fadeInUp} className="mb-12">
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed text-center max-w-4xl mx-auto">
            I am an Information Technology student specializing in Learning Technologies, with experience in developing web
            and mobile applications. I am adept at system development, database management, and integrating AI into educational
            tools to optimize workflows. Passionate about creating practical technology solutions that improve learning
            and administrative workflows.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-xl"
          >
            <GraduationCap className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4" />
            <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Education</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">University of the Immaculate Conception</h4>
                <p className="text-gray-700 dark:text-gray-300">Bachelor of Science in Information Technology</p>
                <p className="text-gray-600 dark:text-gray-400">Major in Learning Technologies</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">2023 - 2026 (Current)</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">Holy Cross College of Calinan</h4>
                <p className="text-gray-700 dark:text-gray-300">STEM Strand</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">2010 - 2022</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-xl"
          >
            <Target className="w-12 h-12 text-purple-600 dark:text-purple-400 mb-4" />
            <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Mission & Vision</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              <strong>Mission:</strong> To build practical technology solutions that improve learning and administrative workflows.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Vision:</strong> To bridge the gap between technology and education through user-centered design.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-xl"
          >
            <Lightbulb className="w-12 h-12 text-green-600 dark:text-green-400 mb-4" />
            <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Goals & Motivation</h3>
            <p className="text-gray-700 dark:text-gray-300">
              I am driven by creating organizational productivity and accountability tools. My goal is to continually hone my
              full-stack and product design skills to deliver high-impact digital experiences.
            </p>
          </motion.div>

          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-xl"
          >
            <Award className="w-12 h-12 text-yellow-600 dark:text-yellow-400 mb-4" />
            <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Key Achievements</h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li>• 3rd Year | 3rd Honor 1st Sem (2025)</li>
              <li>• Core Member - UIC Google Developer Groups on Campus (2023-2024)</li>
              <li>• Esports Technical Team - PSITS Region 11 (2023-2024)</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
