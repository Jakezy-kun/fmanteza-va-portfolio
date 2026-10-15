"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
}

/**
 * Subtle 3D tilt + glow.
 * - Desktop: tilts toward the cursor on hover.
 * - Touch: tilts toward the finger while dragging across the card and
 *   springs back on release, plus a tap bounce — so mobile feels alive.
 * Motion is fully disabled for prefers-reduced-motion.
 */
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
  const [canHover, setCanHover] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mqHover = window.matchMedia("(hover: hover) and (pointer: fine)");
    const mqMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateHover = () => setCanHover(mqHover.matches);
    const updateMotion = () => setReducedMotion(mqMotion.matches);
    updateHover();
    updateMotion();
    mqHover.addEventListener("change", updateHover);
    mqMotion.addEventListener("change", updateMotion);
    return () => {
      mqHover.removeEventListener("change", updateHover);
      mqMotion.removeEventListener("change", updateMotion);
    };
  }, []);

  const motionOK = !reducedMotion;

  const tiltTo = (clientX: number, clientY: number) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    px.set(Math.min(1, Math.max(0, (clientX - rect.left) / rect.width)));
    py.set(Math.min(1, Math.max(0, (clientY - rect.top) / rect.height)));
    setActive(true);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!motionOK || !canHover) return;
    tiltTo(e.clientX, e.clientY);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!motionOK || e.touches.length === 0) return;
    const t = e.touches[0];
    tiltTo(t.clientX, t.clientY);
  };

  const reset = () => {
    px.set(0.5);
    py.set(0.5);
    setActive(false);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={reset}
      onTouchMove={onTouchMove}
      onTouchEnd={reset}
      onTouchCancel={reset}
      // Tap bounce so mobile taps get immediate tactile feedback.
      whileTap={motionOK ? { scale: 0.97 } : undefined}
      transition={{ type: "spring", stiffness: 350, damping: 22 }}
      style={
        motionOK
          ? { rotateX, rotateY, transformPerspective: 900 }
          : undefined
      }
      className={`${className ?? ""} ${active ? "shadow-2xl shadow-violet-600/20" : ""} transition-shadow touch-manipulation`}
    >
      {children}
    </motion.div>
  );
}
