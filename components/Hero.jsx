
"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  Headphones,
  Layers,
  Play,
  Target,
  Zap,
} from "lucide-react";
import Magnetic from "./ui/Magnetic";

// Animated heading letters
function MagneticLetter({ char, color, index }) {
  return (
    <motion.span
      className="inline-block"
      style={{ color }}
      initial={{
        opacity: 0,
        y: 60,
        rotateX: -70,
        filter: "blur(8px)",
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotateX: 0,
        filter: "blur(0px)",
      }}
      transition={{
        duration: 0.8,
        delay: 0.2 + index * 0.035,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {char}
    </motion.span>
  );
}

const lines = [
  { text: "Next-Gen" },
  { text: "Laser Cutting", from: "#19BFFF", to: "#0875FF" },
  { text: "Solutions" },
];

function mix(from, to, t) {
  const f = parseInt(from.slice(1), 16);
  const g = parseInt(to.slice(1), 16);

  const ch = (s) =>
    Math.round(
      ((f >> s) & 255) * (1 - t) +
      ((g >> s) & 255) * t
    );

  return `rgb(${ch(16)}, ${ch(8)}, ${ch(0)})`;
}

// const stats = [
//   { icon: Target, top: "±0.01 mm", bottom: "Cutting Accuracy" },
//   { icon: Zap, top: "3×", bottom: "Faster Production" },
//   { icon: Layers, top: "Multi-Material", bottom: "Cutting" },
//   { icon: Headphones, top: "24/7", bottom: "Support" },
// ];

export default function Hero() {
  return (
    <section className="relative isolate min-h-[720px] overflow-hidden bg-[#03152f] lg:min-h-[780px]">

      {/* STATIC HERO BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/hero.png')",
        }}
      />

      {/* Dark gradient overlay for text readability */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#03152f]/95 via-[#03152f]/75 to-[#03152f]/5" />

      {/* Additional bottom gradient */}
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-[#03152f]/50 to-transparent" />

      {/* HERO CONTENT */}
      <div className="container-x relative grid min-h-[720px] items-center gap-10 py-24 lg:min-h-[780px] lg:grid-cols-[1fr_1fr] lg:py-32">

        {/* LEFT CONTENT */}
        <div className="relative z-10 max-w-[600px]">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#62c9ff]"
          >
            Precision <span className="mx-2 text-white/50">/</span>
            Speed <span className="mx-2 text-white/50">/</span>
            Reliability
          </motion.div>

          {/* HEADING */}
          <h1 className="mt-7 text-[46px] font-black leading-[1.04] tracking-tight text-white sm:text-6xl lg:text-[76px]">
            {lines.map((line, li) => {
              let counter = lines
                .slice(0, li)
                .reduce((n, l) => n + l.text.length, 0);

              return (
                <span key={line.text} className="block">
                  {line.text.split(" ").map((word, wi) => (
                    <span
                      key={wi}
                      className="inline-block whitespace-nowrap"
                    >
                      {word.split("").map((char, ci) => {
                        const idx = counter++;

                        const color =
                          line.from && line.to
                            ? mix(
                                line.from,
                                line.to,
                                ci / Math.max(word.length - 1, 1)
                              )
                            : "#ffffff";

                        return (
                          <MagneticLetter
                            key={ci}
                            char={char}
                            color={color}
                            index={idx}
                          />
                        );
                      })}

                      {wi < line.text.split(" ").length - 1 && (
                        <span className="inline-block w-[0.28em]" />
                      )}
                    </span>
                  ))}
                </span>
              );
            })}
          </h1>

          {/* DESCRIPTION */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-7 max-w-lg text-[15px] leading-[1.9] text-white/80 sm:text-base"
          >
            High-performance laser cutting machines for metal fabrication,
            sheet cutting and industrial applications.
          </motion.p>

          {/* BUTTONS */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <a
                href="#machines"
                className="btn-primary inline-flex items-center gap-3"
              >
                Explore Machines
                <ArrowRight size={17} />
              </a>
            </Magnetic>

            <Magnetic>
              <a
                href="#about"
                className="btn-outline inline-flex items-center gap-3 !border-white/60 !text-white hover:!bg-white hover:!text-[#03152f]"
              >
                <span className="grid h-6 w-6 place-items-center rounded-full bg-white text-[#03152f]">
                  <Play size={10} fill="currentColor" />
                </span>
                Watch Video
              </a>
            </Magnetic>
          </motion.div>

          {/* STATS */}
          {/* <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-4">
            {stats.map(({ icon: Icon, top, bottom }, i) => (
              <motion.div
                key={top}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 1.1 + i * 0.12,
                }}
                className="flex items-center gap-3"
              >
                <Icon
                  size={30}
                  strokeWidth={1.6}
                  className="shrink-0 text-[#48bfff]"
                />

                <div className="leading-tight">
                  <div className="text-[13px] font-extrabold text-white">
                    {top}
                  </div>
                  <div className="mt-1 text-[10.5px] text-white/65">
                    {bottom}
                  </div>
                </div>
              </motion.div>
            ))}
          </div> */}
        </div>

        <a
          href="#machines"
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] tracking-widest text-white/70 lg:flex"
        >
          <span className="grid h-10 w-10 animate-bounce place-items-center rounded-full border border-white/30 bg-white/10 backdrop-blur-md">
            <ChevronDown size={16} />
          </span>
          SCROLL TO EXPLORE
        </a>
      </div>
    </section>
  );
}
