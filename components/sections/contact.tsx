"use client"

import { motion } from "framer-motion"
import { Mail, Link2, MapPin, Code, Download, ExternalLink } from "lucide-react"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
}

export function ContactSection() {
  return (
    <section id="contact" className="py-20 px-4 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          {...fadeInUp}
          className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900 dark:text-white"
        >
          Get In Touch
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Contact Information</h3>
            
            <a
              href="mailto:fmanteza_230000001892@uic.edu.ph"
              className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-lg hover:shadow-lg transition-shadow group"
            >
              <div className="w-12 h-12 bg-blue-600 dark:bg-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Mail className="text-white" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                <p className="text-gray-900 dark:text-white font-semibold">fmanteza_230000001892@uic.edu.ph</p>
              </div>
            </a>

            <a
              href="https://www.linkedin.com/in/ferdinand-m-manteza-015564327/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-700 rounded-lg hover:shadow-lg transition-shadow group"
            >
              <div className="w-12 h-12 bg-blue-700 dark:bg-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="text-white w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">LinkedIn</p>
                <p className="text-gray-900 dark:text-white font-semibold">linkedin.com/in/your-profile</p>
              </div>
            </a>

            <a
              href="https://github.com/Jakezy-kun"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 rounded-lg hover:shadow-lg transition-shadow group"
            >
              <div className="w-12 h-12 bg-purple-600 dark:bg-purple-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Code className="text-white" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">GitHub</p>
                <p className="text-gray-900 dark:text-white font-semibold">github.com/Jakezy-kun</p>
              </div>
            </a>

            <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-700 rounded-lg">
              <div className="w-12 h-12 bg-orange-600 dark:bg-orange-500 rounded-full flex items-center justify-center">
                <MapPin className="text-white" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Location</p>
                <p className="text-gray-900 dark:text-white font-semibold">Calinan, Davao City, Philippines</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.4 }}
            className="flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-700 rounded-xl p-8"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
              Interested in working together?
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-center mb-6">
              Download my resume to learn more about my experience and skills.
            </p>
            
            {/* IMPORTANT: Place your resume PDF at /public/Manteza_resume.pdf */}
            <a
              href="/Manteza _ resume.pdf"
              download="Manteza_resume.pdf"
              className="flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              <Download size={24} />
              Download Resume
            </a>

            <a
              href="https://jakezy-kun.github.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 mt-4 text-blue-600 dark:text-blue-400 hover:underline"
            >
              <ExternalLink size={18} />
              Visit My Portfolio Website
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
