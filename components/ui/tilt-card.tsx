"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
}

/** Subtle 3D tilt + glow on hover for cards. Disabled on touch / reduced-motion. */
export function TiltCard({ children, className, maxTilt = 6 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [maxTilt, -maxTilt]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(px, [0, 1], [-maxTilt, maxTilt]), {
    stiffness: 200,
    damping: 20,
  });
  const [active, setActive] = useState(false);
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
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
    setActive(true);
  };

  const reset = () => {
    px.set(0.5);
    py.set(0.5);
    setActive(false);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={
        enabled
          ? { rotateX, rotateY, transformPerspective: 900 }
          : undefined
      }
      className={`${className ?? ""} ${active ? "shadow-2xl shadow-violet-600/20" : ""} transition-shadow`}
    >
      {children}
    </motion.div>
  );
}
