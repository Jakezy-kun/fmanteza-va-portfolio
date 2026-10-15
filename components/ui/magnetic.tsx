"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface MagneticProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

/**
 * Wraps interactive elements so they drift toward the cursor on hover (desktop).
 * On touch devices it renders a springy tap response instead, so mobile
 * taps still feel alive.
 */
export function Magnetic({ children, strength = 10, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 250, damping: 18, mass: 0.4 });
  // Start disabled so SSR and first client render match; enable after hydration.
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mqHover = window.matchMedia("(hover: hover) and (pointer: fine)");
    const mqMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(mqHover.matches && !mqMotion.matches);
    update();
    mqHover.addEventListener("change", update);
    mqMotion.addEventListener("change", update);
    return () => {
      mqHover.removeEventListener("change", update);
      mqMotion.removeEventListener("change", update);
    };
  }, []);

  const onMove = (e: React.MouseEvent) => {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(((e.clientX - rect.left) / rect.width - 0.5) * strength * 2);
    y.set(((e.clientY - rect.top) / rect.height - 0.5) * strength * 2);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      // Tap spring gives mobile users tactile feedback even though
      // magnetic drift itself is desktop-only.
      whileTap={enabled ? { scale: 0.94 } : { scale: 0.9 }}
      transition={{ type: "spring", stiffness: 500, damping: 22 }}
      style={enabled ? { x: sx, y: sy } : undefined}
      className={`${className ?? ""} touch-manipulation select-none`.trim()}
    >
      {children}
    </motion.div>
  );
}
