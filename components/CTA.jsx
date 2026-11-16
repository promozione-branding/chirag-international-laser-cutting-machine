"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { LaserNozzle, LaserSparks } from "./art/LaserArt";
import Magnetic from "./ui/Magnetic";
const w1 = "M0 140 C240 80 480 200 720 140 C960 80 1200 200 1440 140";
const w2 = "M0 150 C240 210 480 90 720 150 C960 210 1200 90 1440 150";
const w3 = "M0 110 C300 170 560 60 820 110 C1080 160 1260 70 1440 110";
const w4 = "M0 120 C300 60 560 170 820 120 C1080 70 1260 160 1440 120";
const particles = Array.from({ length: 22 }, (_, i) => ({
  left: `${(i * 4.7 + 3) % 100}%`,
  top: `${(i * 23 + 11) % 100}%`,
  size: 2 + (i % 3),
  dur: 4 + (i % 5),
  delay: (i % 7) * 0.5,
}));
export default function CTA() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const bgY2 = useTransform(scrollYProgress, [0, 1], [-15, 15]);
  return (
    <section
      id="contact"
      ref={ref}
      className="relative mt-10 overflow-hidden bg-gradient-to-r from-[#051540] via-[#0a2f86] to-[#0b5bf5]"
    >
      <motion.div style={{ y: bgY }} className="pointer-events-none absolute inset-0">
        <svg
          className="h-full w-full"
          viewBox="0 0 1440 260"
          preserveAspectRatio="none"
          fill="none"
          aria-hidden
        >
          <defs>
            <linearGradient id="ctaW" x1="0" x2="1">
              <stop offset="0" stopColor="#7cb4ff" stopOpacity="0" />
              <stop offset=".5" stopColor="#9fcbff" stopOpacity=".7" />
              <stop offset="1" stopColor="#7cb4ff" stopOpacity="0" />
            </linearGradient>
          </defs>
          <motion.path
            d={w1}
            stroke="url(#ctaW)"
            strokeWidth="1.6"
            animate={{ d: [w1, w2, w1] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.path
            d={w3}
            stroke="url(#ctaW)"
            strokeWidth="1.2"
            animate={{ d: [w3, w4, w3] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </motion.div>

      <motion.div style={{ y: bgY2 }} className="pointer-events-none absolute inset-0">
        {particles.map((p, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-white/70"
            style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
            animate={{ y: [0, -22, 0], opacity: [0.15, 0.8, 0.15] }}
            transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
          />
        ))}
      </motion.div>

      <div className="pointer-events-none absolute -left-10 -top-16 hidden h-[340px] w-[440px] opacity-95 md:block">
        <LaserNozzle className="absolute inset-0 h-full w-full" />
        <LaserSparks className="absolute inset-0 h-full w-full" />
      </div>

      <svg
        className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
        viewBox="0 0 1440 260"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden
      >
        <defs>
          <linearGradient id="trailG" x1="0" x2="1">
            <stop offset="0" stopColor="#ffd27a" stopOpacity="0" />
            <stop offset=".4" stopColor="#ffb13b" />
            <stop offset="1" stopColor="#ffffff" />
          </linearGradient>
        </defs>
        <motion.path
          d="M170 200 C 420 250, 700 90, 1010 150 S 1180 140, 1230 130"
          stroke="url(#trailG)"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: [0, 1, 1], opacity: [0, 1, 0] }}
          viewport={{ once: false }}
          transition={{ duration: 3.2, repeat: Infinity, repeatDelay: 0.6, ease: "easeInOut" }}
        />
        <circle r="4" fill="#fff">
          <animateMotion
            dur="3.2s"
            repeatCount="indefinite"
            path="M170 200 C 420 250, 700 90, 1010 150 S 1180 140, 1230 130"
          />
        </circle>
      </svg>

      <div className="container-x relative grid items-center gap-6 py-14 md:grid-cols-[1fr_auto] md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl md:ml-[34%]"
        >
          <h2 className="text-2xl font-extrabold leading-tight text-white sm:text-[28px]">
            Ready to Upgrade Your
            <br />
            Cutting Capabilities?
          </h2>
          <p className="mt-2 max-w-md text-[12.5px] text-white/75">
            Get in touch with our experts for the right laser cutting solution for your business.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 160, damping: 14, delay: 0.3 }}
        >
          <Magnetic strength={0.4}>
            <motion.a
              href="#contact"
              whileTap={{ scale: 0.95 }}
              animate={{ boxShadow: ["0 0 0 0 rgba(255,255,255,0.55)", "0 0 0 16px rgba(255,255,255,0)"] }}
              transition={{ duration: 1.8, repeat: Infinity }}
              className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-brand-700 transition-colors hover:bg-brand-50"
            >
              Request a Quote <ArrowUpRight size={16} />
            </motion.a>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  );
}
