"use client";
import { motion } from "framer-motion";
export default function SectionHeading({ label, children, align = "left", className = "", size = "lg" }) {
  const center = align === "center";
  return (
    <div className={`${center ? "text-center" : ""} ${className}`}>
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={`flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-brand ${center ? "justify-center" : ""}`}
      >
        <span className="h-[2px] w-5 bg-brand" />
        {label}
        {center && <span className="h-[2px] w-5 bg-brand" />}
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className={`mt-2 font-extrabold leading-[1.1] tracking-tight text-ink ${size === "lg" ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl"}`}
      >
        {children}
      </motion.h2>
    </div>
  );
}
