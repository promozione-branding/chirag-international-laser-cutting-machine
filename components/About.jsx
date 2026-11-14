"use client";
import { useRef } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, CalendarDays, Cog, Gem, Globe, Headphones, Package, Play, Users } from "lucide-react";
import LaserHeadStatic from "./art/LaserArt";
import SectionHeading from "./ui/SectionHeading";
import Magnetic from "./ui/Magnetic";
/* ---------- odometer digit roller ---------- */
function Odometer({ value, suffix = "+" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const digits = String(value).split("").map(Number);
  return (
    <div ref={ref} className="flex items-baseline text-[28px] font-extrabold leading-none text-ink">
      {digits.map((d, i) => (
        <div key={i} className="h-[1em] overflow-hidden">
          <motion.div
            initial={{ y: "0%" }}
            animate={{ y: inView ? `${-d * 10}%` : "0%" }}
            transition={{ duration: 1.5 + i * 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {Array.from({ length: 10 }, (_, n) => (
              <div key={n} className="h-[1em] leading-[1em]">
                {n}
              </div>
            ))}
          </motion.div>
        </div>
      ))}
      <span className="text-brand">{suffix}</span>
    </div>
  );
}
const stats = [
  { icon: CalendarDays, value: 10, label: "Years of Experience" },
  { icon: Users, value: 500, label: "Happy Clients" },
  { icon: Package, value: 1000, label: "Machines Installed" },
  { icon: Globe, value: 25, label: "Countries Served" },
];
const perks = [
  { icon: Gem, label: "Advanced Technology" },
  { icon: Cog, label: "Robust & Durable" },
  { icon: Headphones, label: "Dedicated Support" },
];
const FULL = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";
const HIDDEN = "polygon(0% 0%, 0% 0%, -45% 100%, 0% 100%)";
export default function About() {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const cfg = { stiffness: 70, damping: 16 };
  const sx = useSpring(x, cfg);
  const sy = useSpring(y, cfg);
  const rotY = useTransform(sx, (v) => v * 14);
  const rotX = useTransform(sy, (v) => v * -12);
  const l1x = useTransform(sx, (v) => v * -30);
  const l1y = useTransform(sy, (v) => v * -20);
  const l2x = useTransform(sx, (v) => v * 18);
  const l2y = useTransform(sy, (v) => v * 12);
  const l3x = useTransform(sx, (v) => v * 44);
  const l3y = useTransform(sy, (v) => v * 28);
  return (
    <section id="about" className="relative py-16">
      <div className="container-x grid items-center gap-10 lg:grid-cols-12">
        {/* layered image reveal with 3D parallax */}
        <div
          ref={ref}
          className="relative h-[340px] lg:col-span-5 [perspective:1100px]"
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
          <motion.div style={{ rotateX: rotX, rotateY: rotY }} className="preserve-3d absolute inset-0">
            <motion.div
              style={{ x: l1x, y: l1y }}
              initial={{ opacity: 0, rotate: -14 }}
              whileInView={{ opacity: 1, rotate: -9 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="glass absolute left-0 top-6 h-[270px] w-[78%] rounded-[28px]"
            />
            <motion.div
              style={{ x: l2x, y: l2y }}
              initial={{ opacity: 0, rotate: 12 }}
              whileInView={{ opacity: 1, rotate: -4 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.15 }}
              className="glass absolute left-[6%] top-3 h-[285px] w-[82%] rounded-[28px]"
            />
            <motion.div
              style={{ x: l3x, y: l3y }}
              initial={{ clipPath: HIDDEN }}
              whileInView={{ clipPath: FULL }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.77, 0, 0.175, 1] }}
              className="absolute left-[10%] top-0 h-[300px] w-[86%] overflow-hidden rounded-[26px] bg-gradient-to-br from-[#0b1d4a] via-[#0d2a6e] to-[#061336] shadow-glow"
            >
              <LaserHeadStatic className="absolute -left-4 -top-12 h-[420px] w-[calc(100%+2rem)] max-w-none scale-[1.15]" />
              {/* play button with ripple */}
              <button
                aria-label="Play video"
                className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2"
              >
                <span className="absolute inset-0 animate-ripple rounded-full border border-white/70" />
                <span className="absolute inset-0 animate-ripple rounded-full border border-white/50 [animation-delay:1.1s]" />
               
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* copy */}
        <div className="lg:col-span-4">
          <SectionHeading label="About us" size="md">
            Engineering Precision
            <br />
            Through <span className="text-brand">Laser Technology</span>
          </SectionHeading>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="mt-4 text-[13px] leading-relaxed text-ink/70"
          >
            We are a leading manufacturer and supplier of high-performance laser cutting machines, delivering
            precision, productivity, and reliability to industries worldwide.
          </motion.p>

          <div className="mt-6 grid grid-cols-3 gap-3">
            {perks.map(({ icon: Icon, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35 + i * 0.1 }}
                className="flex flex-col items-start gap-1.5 text-[11px] font-semibold leading-tight text-ink"
              >
                <Icon size={22} strokeWidth={1.6} className="text-brand" />
                {label}
              </motion.div>
            ))}
          </div>

          <div className="mt-7">
            <Magnetic>
              <a href="#story" className="btn-primary">
                Learn More <ArrowRight size={15} />
              </a>
            </Magnetic>
          </div>
        </div>

        {/* stats card */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass rounded-[22px] p-5 lg:col-span-3"
        >
          <div className="flex flex-col gap-5">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-3.5">
                <Icon size={30} strokeWidth={1.5} className="shrink-0 text-brand" />
                <div>
                  <Odometer value={value} />
                  <div className="mt-1 text-[11px] text-ink/60">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
