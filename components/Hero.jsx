"use client";
import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown, Headphones, Layers, Play, Target, Zap } from "lucide-react";
import { LaserNozzle, LaserRings, LaserSparks } from "./art/LaserArt";
import Magnetic from "./ui/Magnetic";
/* ---------- magnetic letter ---------- */
function MagneticLetter({ char, color, index, mx, my }) {
  const ref = useRef(null);
  const x = useSpring(0, { stiffness: 170, damping: 14, mass: 0.5 });
  const y = useSpring(0, { stiffness: 170, damping: 14, mass: 0.5 });
  useEffect(() => {
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = mx.get() - (r.left + r.width / 2);
      const dy = my.get() - (r.top + r.height / 2);
      const d = Math.hypot(dx, dy);
      const radius = 130;
      if (d < radius) {
        const f = 1 - d / radius;
        x.set(dx * f * 0.38);
        y.set(dy * f * 0.38);
      } else {
        x.set(0);
        y.set(0);
      }
    };
    const a = mx.on("change", update);
    const b = my.on("change", update);
    return () => {
      a();
      b();
    };
  }, [mx, my, x, y]);
  return (
    <motion.span
      className="inline-block"
      initial={{ opacity: 0, y: 70, rotateX: -80, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.8, delay: 0.25 + index * 0.035, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.span ref={ref} className="inline-block" style={{ x, y, color }}>
        {char}
      </motion.span>
    </motion.span>
  );
}
const lines = [
  { text: "Next-Gen" },
  { text: "Laser Cutting", from: "#0B5BF5", to: "#1E9BFF" },
  { text: "Solutions" },
];
function mix(from, to, t) {
  const f = parseInt(from.slice(1), 16);
  const g = parseInt(to.slice(1), 16);
  const ch = (s) => Math.round(((f >> s) & 255) * (1 - t) + ((g >> s) & 255) * t);
  return `rgb(${ch(16)}, ${ch(8)}, ${ch(0)})`;
}
const wave1 = "M0 120 C240 60 480 180 720 120 C960 60 1200 180 1440 120 L1440 200 L0 200 Z";
const wave2 = "M0 130 C240 190 480 70 720 130 C960 190 1200 70 1440 130 L1440 200 L0 200 Z";
const wave3 = "M0 150 C300 100 560 200 820 150 C1080 100 1260 190 1440 150 L1440 200 L0 200 Z";
const wave4 = "M0 150 C300 200 560 110 820 150 C1080 200 1260 110 1440 150 L1440 200 L0 200 Z";
const stats = [
  { icon: Target, top: "±0.01 mm", bottom: "Cutting Accuracy" },
  { icon: Zap, top: "3×", bottom: "Faster Production" },
  { icon: Layers, top: "Multi-Material", bottom: "Cutting" },
  { icon: Headphones, top: "24/7", bottom: "Support" },
];
export default function Hero() {
  const sectionRef = useRef(null);
  const mx = useMotionValue(-9999);
  const my = useMotionValue(-9999);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const cfg = { stiffness: 60, damping: 18 };
  const sx = useSpring(px, cfg);
  const sy = useSpring(py, cfg);
  // 3D parallax: three layers at different depths
  const backX = useTransform(sx, (v) => v * -26);
  const backY = useTransform(sy, (v) => v * -16);
  const midX = useTransform(sx, (v) => v * 34);
  const midY = useTransform(sy, (v) => v * 22);
  const frontX = useTransform(sx, (v) => v * 70);
  const frontY = useTransform(sy, (v) => v * 44);
  const tiltY = useTransform(sx, (v) => v * 8);
  const tiltX = useTransform(sy, (v) => v * -6);
  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      onMouseMove={(e) => {
        mx.set(e.clientX);
        my.set(e.clientY);
        const r = sectionRef.current?.getBoundingClientRect();
        if (r) {
          px.set((e.clientX - r.left) / r.width - 0.5);
          py.set((e.clientY - r.top) / r.height - 0.5);
        }
      }}
      onMouseLeave={() => {
        mx.set(-9999);
        my.set(-9999);
        px.set(0);
        py.set(0);
      }}
    >
      {/* gradient backdrop + animated waves */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(900px_500px_at_80%_30%,rgba(120,180,255,0.45),transparent_65%),linear-gradient(110deg,#ffffff_0%,#f1f6ff_45%,#dfeaff_100%)]" />
      <svg
        className="absolute inset-x-0 bottom-0 -z-10 h-56 w-full"
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <linearGradient id="waveA" x1="0" x2="1">
            <stop offset="0" stopColor="#9cc4ff" stopOpacity=".18" />
            <stop offset="1" stopColor="#3b8bff" stopOpacity=".3" />
          </linearGradient>
          <linearGradient id="waveB" x1="0" x2="1">
            <stop offset="0" stopColor="#cfe1ff" stopOpacity=".35" />
            <stop offset="1" stopColor="#7db4ff" stopOpacity=".3" />
          </linearGradient>
        </defs>
        <motion.path
          d={wave1}
          fill="url(#waveA)"
          animate={{ d: [wave1, wave2, wave1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d={wave3}
          fill="url(#waveB)"
          animate={{ d: [wave3, wave4, wave3] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>

      <div className="container-x relative grid min-h-[640px] items-center gap-6 pb-24 pt-14 lg:grid-cols-[1fr_1.15fr]">
        {/* ---------------- left copy ---------------- */}
        <div className="relative z-10 max-w-[560px]">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[11px] font-bold uppercase tracking-[0.28em] text-brand"
          >
            Precision <span className="text-brand/50">/</span> Speed <span className="text-brand/50">/</span>{" "}
            Reliability
          </motion.div>

          <h1 className="mt-5 text-[44px] font-black leading-[1.02] tracking-tight text-ink sm:text-6xl [perspective:800px]">
            {lines.map((line, li) => {
              const words = line.text.split(" ");
              let counter = lines.slice(0, li).reduce((n, l) => n + l.text.length, 0);
              return (
                <span key={line.text} className="block">
                  {words.map((w, wi) => (
                    <span key={wi} className="inline-block whitespace-nowrap">
                      {w.split("").map((ch, ci) => {
                        const idx = counter++;
                        const color =
                          line.from && line.to
                            ? mix(line.from, line.to, ci / Math.max(w.length - 1, 1))
                            : undefined;
                        return (
                          <MagneticLetter key={ci} char={ch} color={color} index={idx} mx={mx} my={my} />
                        );
                      })}
                      {wi < words.length - 1 && <span className="inline-block w-[0.28em]" />}
                    </span>
                  ))}
                </span>
              );
            })}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1 }}
            className="mt-5 max-w-md text-[15px] leading-relaxed text-ink/80"
          >
            High-performance laser cutting machines for metal fabrication, sheet cutting and industrial
            applications.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.15 }}
            className="mt-7 flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <a href="#machines" className="btn-primary">
                Explore Machines <ArrowRight size={16} />
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#about" className="btn-outline">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-ink text-white">
                  <Play size={9} fill="currentColor" />
                </span>
                Watch Video
              </a>
            </Magnetic>
          </motion.div>

          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
            {stats.map(({ icon: Icon, top, bottom }, i) => (
              <motion.div
                key={top}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.3 + i * 0.1 }}
                className="flex items-center gap-2.5"
              >
                <Icon size={30} strokeWidth={1.5} className="shrink-0 text-brand" />
                <div className="leading-tight">
                  <div className="text-[13px] font-extrabold text-ink">{top}</div>
                  <div className="text-[10.5px] text-ink/60">{bottom}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ---------------- right: parallax laser scene ---------------- */}
        <div className="relative z-0 h-[420px] sm:h-[520px] lg:h-[560px] lg:-mr-10">
          <motion.div style={{ x: backX, y: backY }} className="absolute inset-0">
            <LaserRings className="h-full w-full" />
          </motion.div>
          <motion.div
            style={{ x: midX, y: midY, rotateX: tiltX, rotateY: tiltY, transformPerspective: 1000 }}
            className="absolute inset-0"
            initial={{ opacity: 0, y: -60 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <LaserNozzle className="h-full w-full drop-shadow-[0_30px_30px_rgba(10,47,134,0.35)]" />
          </motion.div>
          <motion.div style={{ x: frontX, y: frontY }} className="absolute inset-0">
            <LaserSparks className="h-full w-full" />
          </motion.div>
        </div>

        {/* scroll cue */}
        <a
          href="#machines"
          className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-[10px] text-ink/60 lg:flex"
        >
          <span className="grid h-8 w-8 animate-bob place-items-center rounded-full border border-brand-200 bg-white/80 text-brand">
            <ChevronDown size={14} />
          </span>
          Scroll to Explore
        </a>
      </div>
    </section>
  );
}
