"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Layers, Leaf, Settings, Target, Zap } from "lucide-react";

const items = [
  {
    icon: Target,
    title: ["High Cutting", "Accuracy"],
    text: "Precision up to ±0.01 mm for clean and consistent cuts.",
    side: "left",
    shift: "lg:translate-x-0",
  },
  {
    icon: Zap,
    title: ["Fast & Efficient", "Performance"],
    text: "Higher cutting speed with maximum productivity.",
    side: "left",
    shift: "lg:-translate-x-12",
  },
  {
    icon: Layers,
    title: ["Wide Material", "Compatibility"],
    text: "Cuts a variety of materials including mild steel, stainless steel, aluminum, and more.",
    side: "right",
    shift: "lg:translate-x-0",
  },
  {
    icon: Settings,
    title: ["Low", "Maintenance"],
    text: "Robust design with minimal servicing and longer lifespan.",
    side: "right",
    shift: "lg:translate-x-6",
  },
  {
    icon: Leaf,
    title: ["Energy", "Efficient"],
    text: "Optimized power usage for lower operating costs.",
    side: "right",
    shift: "lg:translate-x-10",
  },
];

/* small glowing dot + curved line joining a card to the centre circle */
function Connector({ side }) {
  const left = side === "left";
  return (
    <svg
      aria-hidden
      width="90"
      height="40"
      viewBox="0 0 90 40"
      fill="none"
      className={`pointer-events-none absolute top-1/2 hidden -translate-y-1/2 lg:block ${
        left ? "-right-[70px]" : "-left-[70px] -scale-x-100"
      }`}
    >
      <path d="M8 14 C40 12 60 24 88 30" stroke="#5b9bff" strokeWidth="2" strokeLinecap="round" />
      <circle cx="8" cy="14" r="7" fill="#1a66ff" opacity=".25" />
      <circle cx="8" cy="14" r="5" fill="#1a66ff" />
    </svg>
  );
}

function FeatureCard({ item, index, active, onEnter }) {
  const { icon: Icon, title, text, side, shift } = item;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      onMouseEnter={onEnter}
      className={`relative w-full max-w-[520px] ${shift} ${
        side === "left" ? "lg:ml-auto" : "lg:mr-auto"
      }`}
    >
      <Connector side={side} />
      {/* slanted glass plate */}
      <div
        className={`-skew-x-[8deg] rounded-[28px] ring-1 backdrop-blur transition-all duration-300 ${
          active
            ? "bg-white shadow-[0_28px_60px_-20px_rgba(26,102,255,0.45)] ring-[#9cc2ff]"
            : "bg-white/75 shadow-[0_22px_50px_-26px_rgba(37,99,235,0.35)] ring-white"
        }`}
      >
        {/* un-slant the content */}
        <div className="flex skew-x-[8deg] items-center gap-5 px-7 py-5 sm:gap-6">
          <div className="grid h-[76px] w-[76px] shrink-0 place-items-center rounded-2xl bg-white text-[#1559e6] shadow-[0_10px_24px_-10px_rgba(37,99,235,0.4)] ring-1 ring-[#e3edff]">
            <Icon size={38} strokeWidth={1.7} />
          </div>
          <span className="h-[70px] w-[2px] shrink-0 rounded-full bg-[#1559e6]" />
          <div>
            <h3 className="text-[20px] font-bold leading-[1.15] text-[#0b1b4a]">
              {title[0]}
              <br />
              {title[1]}
            </h3>
            <p className="mt-1.5 max-w-[290px] text-[14px] leading-snug text-slate-500">{text}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Portal() {
  const [failed, setFailed] = useState(false);
  return (
    <div className="relative mx-auto h-[400px] w-[340px] sm:h-[500px] sm:w-[420px] lg:h-[560px] lg:w-[460px]">
      {/* floor glow rings */}
      <span aria-hidden className="absolute bottom-2 left-1/2 h-[90px] w-[150%] -translate-x-1/2 rounded-[50%] border border-[#cfe0ff] bg-[radial-gradient(ellipse_at_center,rgba(59,139,255,0.25),transparent_70%)]" />
      <span aria-hidden className="absolute bottom-6 left-1/2 h-[70px] w-[115%] -translate-x-1/2 rounded-[50%] border border-[#b9d3ff]/80" />

      {/* ring + photo */}
      <div className="absolute left-1/2 top-0 aspect-square w-[88%] -translate-x-1/2">
        {/* spinning arc accent */}
        <motion.svg
          aria-hidden
          viewBox="0 0 100 100"
          className="absolute -inset-[7%] h-[114%] w-[114%]"
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        >
          <defs>
            <linearGradient id="arcGrad" x1="0" x2="1">
              <stop offset="0" stopColor="#1a66ff" />
              <stop offset="1" stopColor="#8db6ff" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M 6 38 A 46 46 0 0 1 50 4" stroke="url(#arcGrad)" strokeWidth="1" strokeLinecap="round" fill="none" />
        </motion.svg>

        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[#e9f2ff] to-[#cfe2ff] p-[14px] shadow-[0_0_70px_rgba(59,139,255,0.45),inset_0_0_30px_rgba(255,255,255,0.9)] ring-1 ring-white">
          <div className="relative h-full w-full overflow-hidden rounded-full bg-gradient-to-b from-[#1b3d7a] via-[#0b2352] to-[#06122e]">
            {!failed && (
              <img
                src="/why_.png"
                alt="Laser cutting head at work"
                draggable={false}
                onError={() => setFailed(true)}
                className="h-full w-full object-cover"
              />
            )}
          </div>
        </div>
      </div>

      {/* podium */}
      <div className="absolute bottom-[26px] left-1/2 h-[56px] w-[84%] -translate-x-1/2 rounded-[50%] bg-gradient-to-b from-white via-[#dbe9ff] to-[#8fb8ff] shadow-[0_0_50px_rgba(37,120,255,0.6)]" />
      <div className="absolute bottom-[44px] left-1/2 h-[34px] w-[78%] -translate-x-1/2 rounded-[50%] bg-gradient-to-b from-[#f4f8ff] to-[#cfe0ff]" />
    </div>
  );
}

export default function WhyChooseUs() {
  const [active, setActive] = useState(0);
  const left = items.filter((i) => i.side === "left");
  const right = items.filter((i) => i.side === "right");

  return (
    <section
      style={{ fontFamily: "'Poppins', ui-sans-serif, system-ui, sans-serif" }}
      className="relative overflow-hidden bg-gradient-to-b from-[#f4f8ff] via-[#eaf2ff] to-[#e3edff] py-16"
    >
      {/* soft swoosh backgrounds */}
      <div aria-hidden className="pointer-events-none absolute -left-40 -top-24 h-[420px] w-[520px] rotate-[-20deg] rounded-[50%] bg-[#d6e5ff]/70 blur-2xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-40 -right-32 h-[380px] w-[560px] rounded-[50%] bg-[#cfe0ff]/70 blur-2xl" />

      <div className="relative mx-auto w-full max-w-[1800px] px-4 lg:px-10">
        {/* header */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-4">
            <span className="h-[3px] w-12 rounded-full bg-[#1559e6]" />
            <span className="text-[15px] font-bold uppercase tracking-[0.3em] text-[#1559e6]">Why choose us</span>
            <span className="h-[3px] w-12 rounded-full bg-[#1559e6]" />
          </div>
          <h2 className="mt-3 text-[34px] font-bold leading-tight tracking-tight text-[#0b1b4a] md:text-[56px]">
            Features That Make the <span className="text-[#1a66ff]">Difference</span>
          </h2>
          <p className="mx-auto mt-2 max-w-[760px] text-[17px] font-medium text-slate-500">
            Advanced technology, reliable performance, and long-term value for your laser cutting needs.
          </p>
        </div>

        {/* feature cards around the portal */}
        <div className="mt-10 grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_460px_minmax(0,1fr)] lg:gap-16">
          <div className="order-2 flex flex-col gap-6 lg:order-1 lg:gap-8">
            {left.map((it) => (
              <FeatureCard
                key={it.title[0]}
                item={it}
                index={items.indexOf(it)}
                active={active === items.indexOf(it)}
                onEnter={() => setActive(items.indexOf(it))}
              />
            ))}
          </div>

          <div className="order-1 lg:order-2">
            <Portal />
          </div>

          <div className="order-3 flex flex-col gap-5">
            {right.map((it) => (
              <FeatureCard
                key={it.title[0]}
                item={it}
                index={items.indexOf(it)}
                active={active === items.indexOf(it)}
                onEnter={() => setActive(items.indexOf(it))}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}