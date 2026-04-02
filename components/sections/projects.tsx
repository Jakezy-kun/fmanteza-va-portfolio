"use client"

import { motion } from "framer-motion"
import { ExternalLink, Code } from "lucide-react"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
}

const projects = [
  {
    title: "Palitab",
    year: "2025",
    role: "Mobile Developer / Game Developer / UI/UX Designer",
    description: "A mobile application game using Filipino classic stories in English with XP-based story unlocking progression and WH comprehension questions.",
    tags: ["Mobile", "Game Dev", "UI/UX", "Educational"]
  },
  {
    title: "Reboot",
    year: "2025",
    role: "Mobile Developer / UI/UX Designer",
    description: "An e-commerce mobile application focusing on e-waste technologies, specializing in selling 2nd hand technologies.",
    tags: ["Mobile", "E-commerce", "UI/UX", "Sustainability"]
  },
  {
    title: "Effici-admin/OSAD Digital Hub",
    year: "2025",
    role: "Quality Assurance (QA)",
    description: "A Web-Based System that streamlines how CCS students, CCS admins, and CCS dean collaborate on campus activity plans and equipment logistics.",
    tags: ["Web", "QA", "Collaboration", "Education"]
  },
  {
    title: "Grindset",
    year: "2024",
    role: "Full Stack Developer / UI/UX Designer",
    description: "A web-based platform designed to streamline the delegation, tracking, and completion of work, enhancing organizational productivity and accountability.",
    tags: ["Web", "Full Stack", "Productivity", "UI/UX"]
  },

  {
    title: "Chrono-List",
    year: "2023",
    role: "Front End Developer",
    description: "A specialized digital task management tool designed to help students organize academic and personal tasks, set priorities, and track progress.",
    tags: ["Web", "Frontend", "Productivity", "Education"]
  },
  {
    title: "Hotel Management System",
    year: "2023",
    role: "Full Stack Developer",
    description: "A centralized platform designed to automate hotel operations, including front desk tasks, reservations, and billing.",
    tags: ["Web", "Full Stack", "Management", "Automation"]
  }
]

export function ProjectsSection() {
  return (
    <section id="projects" className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          {...fadeInUp}
          className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900 dark:text-white"
        >
          Projects
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-sm font-semibold">
                  {project.year}
                </span>
                <Code className="text-gray-400" size={20} />
              </div>
              
              <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{project.title}</h3>
              <p className="text-sm text-blue-600 dark:text-blue-400 font-semibold mb-3">{project.role}</p>
              <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm leading-relaxed">{project.description}</p>
              
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
