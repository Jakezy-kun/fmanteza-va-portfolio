"use client"

import { motion } from "framer-motion"
import { Code, Database, Smartphone, Cloud, Wrench, Palette, Globe } from "lucide-react"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
}

const skills = [
  {
    icon: Code,
    title: "Frontend Development",
    items: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Vue.js", "shadcn/ui"],
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Database,
    title: "Backend Development",
    items: ["Java", "PHP", "Node.js", "Python"],
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: Database,
    title: "Databases",
    items: ["MySQL", "PostgreSQL", "MongoDB", "Supabase"],
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Smartphone,
    title: "Mobile & Game Dev",
    items: ["Flutter", "Dart", "Mobile Game Development"],
    color: "from-orange-500 to-red-500"
  },
  {
    icon: Cloud,
    title: "Cloud & Deployment",
    items: ["Firebase", "Cloudinary", "Vercel", "Docker"],
    color: "from-indigo-500 to-purple-500"
  },

  {
    icon: Wrench,
    title: "Development Tools",
    items: ["Git", "GitHub", "VS Code", "IntelliJ IDEA", "Android Studio"],
    color: "from-yellow-500 to-orange-500"
  },
  {
    icon: Palette,
    title: "Design & Soft Skills",
    items: ["UI/UX Design", "Figma", "User Research", "Product Design", "QA Testing"],
    color: "from-pink-500 to-rose-500"
  },
  {
    icon: Globe,
    title: "Languages",
    items: ["English (Fluent)", "Tagalog/Filipino (Fluent)", "Cebuano (Native)"],
    color: "from-teal-500 to-cyan-500"
  }
]

export function SkillsSection() {
  return (
    <section id="skills" className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          {...fadeInUp}
          className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900 dark:text-white"
        >
          Core Skills & Services
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${skill.color} flex items-center justify-center mb-4`}>
                <skill.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{skill.title}</h3>
              <div className="flex flex-wrap gap-2">
                {skill.items.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                  >
                    {item}
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
