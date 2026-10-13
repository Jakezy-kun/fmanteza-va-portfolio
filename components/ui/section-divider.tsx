"use client";

import { motion } from "framer-motion";
import { useId } from "react";

/** Animated gradient SVG beam divider — draws itself on scroll into view. */
export function SectionDivider({ flip = false }: { flip?: boolean }) {
  const gradId = useId().replace(/[^a-zA-Z0-9]/g, "");
  return (
    <div aria-hidden="true" className="relative h-16 md:h-20 overflow-hidden bg-transparent pointer-events-none">
      <svg
        viewBox="0 0 1200 80"
        preserveAspectRatio="none"
        className={`absolute inset-0 h-full w-full ${flip ? "rotate-180" : ""}`}
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#2563EB" stopOpacity="0" />
            <stop offset="35%" stopColor="#2563EB" stopOpacity="0.9" />
            <stop offset="55%" stopColor="#7C3AED" stopOpacity="0.9" />
            <stop offset="75%" stopColor="#D946EF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#D946EF" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d="M0,40 C200,10 400,70 600,40 C800,10 1000,70 1200,40"
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
        />
        <motion.circle
          cx="600"
          cy="40"
          r="4"
          fill="#A78BFA"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.4 }}
        />
      </svg>
    </div>
  );
}
