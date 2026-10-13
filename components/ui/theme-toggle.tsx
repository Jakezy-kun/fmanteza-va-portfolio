"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // next-themes hydration guard
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-full bg-gray-100 dark:bg-white/10 animate-pulse" aria-hidden />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <motion.button
      whileTap={{ scale: 0.88, rotate: 12 }}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative w-9 h-9 rounded-full flex items-center justify-center bg-gradient-to-br from-amber-100 to-orange-100 dark:from-white/10 dark:to-white/5 border border-orange-200 dark:border-white/10 text-orange-500 dark:text-amber-300 hover:shadow-lg hover:shadow-orange-500/20 dark:hover:shadow-amber-500/20 transition-shadow"
    >
      {isDark ? <Sun size={17} /> : <Moon size={17} />}
    </motion.button>
  );
}
