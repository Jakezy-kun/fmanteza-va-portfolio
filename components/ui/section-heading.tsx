"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  highlight?: string;
  description?: string;
}

export function SectionHeading({ eyebrow, title, highlight, description }: SectionHeadingProps) {
  return (
    <div className="text-center mb-12 md:mb-16">
      <motion.span
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-gradient-to-r from-blue-600/10 via-violet-600/10 to-fuchsia-600/10 dark:from-blue-500/15 dark:via-violet-500/15 dark:to-fuchsia-500/15 border border-blue-500/25 dark:border-white/10 text-blue-700 dark:text-blue-300"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 via-violet-500 to-fuchsia-500" />
        {eyebrow}
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, delay: 0.08 }}
        className="font-display mt-4 text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white text-balance"
      >
        {title}{" "}
        {highlight && (
          <span className="text-gradient-brand">{highlight}</span>
        )}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-4 max-w-2xl mx-auto text-base md:text-lg text-gray-600 dark:text-gray-400"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
