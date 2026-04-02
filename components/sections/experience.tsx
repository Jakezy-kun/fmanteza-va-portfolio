"use client"

import { motion } from "framer-motion"
import { Briefcase, Calendar } from "lucide-react"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
}

const experiences = [
  {
    title: "Market Lead (CMO) & UX/Product Designer",
    company: "LearnShift",
    period: "2025 - 2026 (Current)",
    responsibilities: [
      "Conducted user research, fieldwork, and customer validation to identify real user needs",
      "Gathered and analyzed UI/UX feedback to improve product usability and design",
      "Led the design thinking process, focusing on user-centered solutions and product desirability",
      "Built user empathy through research and testing, iterating prototypes to address real-world problems"
    ]
  },
  {
    title: "Quality Assurance (QA)",
    company: "Effici-admin/OSAD Digital Hub",
    period: "2024 - 2025",
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
    <section id="experience" className="py-20 px-4 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          {...fadeInUp}
          className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900 dark:text-white"
        >
          Work Experience
        </motion.h2>


        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 shadow-lg"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{exp.title}</h3>
                  <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                    <Briefcase size={18} />
                    <span className="font-semibold">{exp.company}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mt-2 md:mt-0">
                  <Calendar size={18} />
                  <span>{exp.period}</span>
                </div>
              </div>
              <ul className="space-y-2">
                {exp.responsibilities.map((resp, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
                    <span className="text-blue-600 dark:text-blue-400 mt-1">•</span>
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
