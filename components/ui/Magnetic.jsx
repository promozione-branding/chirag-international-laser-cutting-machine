"use client";
import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
/** Wrapper that pulls its content toward the cursor. */
export default function Magnetic({ children, strength = 0.35, className = "" }) {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 220, damping: 14, mass: 0.4 });
  const y = useSpring(my, { stiffness: 220, damping: 14, mass: 0.4 });
  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className}`}
      style={{ x, y }}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        mx.set((e.clientX - (r.left + r.width / 2)) * strength);
        my.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
