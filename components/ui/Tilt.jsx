"use client";
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
/** Subtle 3D tilt that follows the pointer. */
export default function Tilt({ children, max = 14, className = "" }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const cfg = { stiffness: 200, damping: 18 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [max, -max]), cfg);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-max, max]), cfg);
  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ rotateX, rotateY, transformPerspective: 900, transformStyle: "preserve-3d" }}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        x.set((e.clientX - r.left) / r.width - 0.5);
        y.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
