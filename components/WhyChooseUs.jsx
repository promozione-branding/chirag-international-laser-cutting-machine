"use client";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Layers, Leaf, Settings, Target, Zap } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1];

/* shifts only apply on 2xl screens, where there is room for them */
const items = [
  {
    icon: Target,
    title: ["High Cutting", "Accuracy"],
    text: "Precision up to ±0.01 mm for clean and consistent cuts.",
    side: "left",
    shift: "2xl:translate-x-0",
  },
  {
    icon: Zap,
    title: ["Fast & Efficient", "Performance"],
    text: "Higher cutting speed with maximum productivity.",
    side: "left",
    shift: "2xl:-translate-x-6",
  },
  {
    icon: Layers,
    title: ["Wide Material", "Compatibility"],
    text: "Cuts a variety of materials including mild steel, stainless steel, aluminum, and more.",
    side: "right",
    shift: "2xl:translate-x-0",
  },
  {
    icon: Settings,
    title: ["Low", "Maintenance"],
    text: "Robust design with minimal servicing and longer lifespan.",
    side: "right",
    shift: "2xl:translate-x-4",
  },
  {
    icon: Leaf,
    title: ["Energy", "Efficient"],
    text: "Optimized power usage for lower operating costs.",
    side: "right",
    shift: "2xl:translate-x-6",
  },
];

/* word-by-word heading reveal */
function Words({ text, base = 0 }) {
  return text.split(" ").map((w, i) => (
    <span key={i} className="inline-block overflow-hidden align-bottom">
      <motion.span
        className="inline-block"
        initial={{ y: "110%" }}
        whileInView={{ y: "0%" }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: base + i * 0.07, ease: EASE }}
      >
        {w}&nbsp;
      </motion.span>
    </span>
  ));
}

/* dot + curved line joining a card to the centre circle.
   Only rendered on 2xl screens, where the gap is wide enough to hold it. */
function Connector({ side, index, reduce }) {
  const left = side === "left";
  return (
    <svg
      aria-hidden
      width="90"
      height="40"
      viewBox="0 0 90 40"
      fill="none"
      className={`pointer-events-none absolute top-1/2 hidden -translate-y-1/2 2xl:block ${
        left ? "-right-[70px]" : "-left-[70px] -scale-x-100"
      }`}
    >
      <motion.path
        d="M8 14 C40 12 60 24 88 30"
        stroke="#5b9bff"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 + index * 0.1, ease: "easeOut" }}
      />
      <motion.circle
        cx="8"
        cy="14"
        r="7"
        fill="#1a66ff"
        animate={reduce ? { opacity: 0.25 } : { opacity: [0.15, 0.4, 0.15], r: [6, 9, 6] }}
        transition={{ duration: 2.4, repeat: Infinity, delay: index * 0.3 }}
      />
      <circle cx="8" cy="14" r="5" fill="#1a66ff" />
      {!reduce && (
        <motion.circle
          r="2.6"
          fill="#fff"
          stroke="#1a66ff"
          strokeWidth="1.5"
          initial={{ cx: 8, cy: 14, opacity: 0 }}
          animate={{
            cx: [8, 30, 49.5, 68, 88],
            cy: [14, 14.8, 19, 24.7, 30],
            opacity: [0, 1, 1, 1, 0],
          }}
          transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.4, delay: 1.5 + index * 0.35, ease: "easeInOut" }}
        />
      )}
    </svg>
  );
}

function FeatureCard({ item, index, active, onEnter, reduce }) {
  const { icon: Icon, title, text, side, shift } = item;
  const left = side === "left";
  return (
    /* wrapper keeps the Tailwind translate shift separate from framer-motion's transform */
    <div className={`relative w-full max-w-[520px] ${shift} ${left ? "xl:ml-auto" : "xl:mr-auto"}`}>
      <motion.div
        initial={{ opacity: 0, x: left ? -110 : 110, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: index * 0.12, ease: EASE }}
        whileHover={{ x: left ? 6 : -6, scale: 1.02 }}
        onMouseEnter={onEnter}
        className="relative"
      >
        <Connector side={side} index={index} reduce={reduce} />

       <div
  className={`relative -skew-x-[8deg] overflow-hidden rounded-[28px] ring-1 backdrop-blur transition-all duration-500 ${
    active
      ? "bg-[#e5e7eb] shadow-[0_28px_60px_-20px_rgba(0,0,0,0.3)] ring-[#9cc2ff]"
      : "bg-[#f1f2f4] shadow-[0_22px_50px_-26px_rgba(0,0,0,0.25)] ring-black/10"
  }`}
>
          {active && (
            <motion.span
              key={`shine-${index}`}
              aria-hidden
              initial={{ x: "-130%" }}
              animate={{ x: "260%" }}
              transition={{ duration: 1.3, ease: "easeInOut" }}
              className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/70 to-transparent"
            />
          )}

          <div className="relative flex skew-x-[8deg] items-center gap-4 px-6 py-4 2xl:gap-6 2xl:px-7 2xl:py-5">
            <motion.div
              animate={
                reduce
                  ? { scale: active ? 1.08 : 1 }
                  : { y: [0, -5, 0], scale: active ? 1.08 : 1, rotate: active ? [0, -6, 6, 0] : 0 }
              }
              transition={{
                y: { duration: 3 + index * 0.4, repeat: Infinity, ease: "easeInOut" },
                scale: { type: "spring", stiffness: 260, damping: 16 },
                rotate: { duration: 0.7 },
              }}
              className="grid h-[60px] w-[60px] shrink-0 place-items-center rounded-2xl bg-white text-[#1559e6] shadow-[0_10px_24px_-10px_rgba(0,0,0,0.25)] ring-1 ring-black/10 2xl:h-[76px] 2xl:w-[76px]"
            >
              <Icon className="h-[30px] w-[30px] 2xl:h-[38px] 2xl:w-[38px]" strokeWidth={1.7} />
            </motion.div>

            <motion.span
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.5 + index * 0.1, ease: EASE }}
              className="h-[60px] w-[2px] shrink-0 rounded-full bg-[#1559e6] 2xl:h-[70px]"
            />

            {/* min-w-0 lets the text wrap instead of pushing the card past its column */}
            <div className="min-w-0">
              <motion.h3
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.55 + index * 0.1 }}
                className="text-[17px] font-bold leading-[1.15] text-[#0b1b4a] 2xl:text-[20px]"
              >
                {title[0]}
                <br />
                {title[1]}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.65 + index * 0.1 }}
                className="mt-1.5 max-w-[290px] text-[13px] leading-snug text-slate-500 2xl:text-[14px]"
              >
                {text}
              </motion.p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

const sparks = [
  { left: "22%", delay: 0, dur: 3.6, size: 5 },
  { left: "34%", delay: 1.2, dur: 4.2, size: 4 },
  { left: "46%", delay: 0.5, dur: 3.2, size: 6 },
  { left: "58%", delay: 2, dur: 4.6, size: 4 },
  { left: "70%", delay: 0.9, dur: 3.8, size: 5 },
  { left: "80%", delay: 2.6, dur: 4.1, size: 3 },
];

function Portal({ reduce }) {
  const [failed, setFailed] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: EASE }}
      className="relative mx-auto h-[400px] w-[340px] sm:h-[500px] sm:w-[420px] xl:h-[460px] xl:w-[360px] 2xl:h-[560px] 2xl:w-[460px]"
    >
      <span aria-hidden className="absolute bottom-2 left-1/2 h-[90px] w-[130%] -translate-x-1/2 rounded-[50%] border border-black/10 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.06),transparent_70%)]" />
      <span aria-hidden className="absolute bottom-6 left-1/2 h-[70px] w-[105%] -translate-x-1/2 rounded-[50%] border border-black/10" />
      {!reduce &&
        [0, 1.6].map((d) => (
          <span key={d} aria-hidden className="pointer-events-none absolute bottom-6 left-1/2 h-[70px] w-[105%] -translate-x-1/2">
            <motion.span
              className="block h-full w-full rounded-[50%] border border-black/25"
              animate={{ scale: [0.7, 1.15], opacity: [0.7, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, delay: d, ease: "easeOut" }}
            />
          </span>
        ))}

      <div className="absolute left-1/2 top-0 aspect-square w-[88%] -translate-x-1/2">
        <motion.div
          className="relative h-full w-full"
          animate={reduce ? undefined : { y: [0, -12, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div
            aria-hidden
            className="absolute -inset-[14%] rounded-full bg-[radial-gradient(circle,rgba(0,0,0,0.10),transparent_65%)]"
            animate={reduce ? undefined : { scale: [1, 1.1, 1], opacity: [0.55, 1, 0.55] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.svg
            aria-hidden
            viewBox="0 0 100 100"
            className="absolute -inset-[7%] h-[114%] w-[114%]"
            animate={reduce ? undefined : { rotate: 360 }}
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

          <motion.div
            aria-hidden
            className="absolute -inset-[7%]"
            animate={reduce ? undefined : { rotate: 360 }}
            transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
          >
            <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1a66ff] shadow-[0_0_14px_4px_rgba(26,102,255,0.7)]" />
          </motion.div>

          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[#f7f7f8] to-[#e2e4e8] p-[14px] shadow-[0_20px_60px_rgba(0,0,0,0.2),inset_0_0_30px_rgba(255,255,255,0.9)] ring-1 ring-black/10">
            <div className="relative h-full w-full overflow-hidden rounded-full bg-gradient-to-b from-[#2b2b2b] via-[#1a1a1a] to-[#0d0d0d]">
              {!failed && (
                <motion.img
                  src="/why_.png"
                  alt="Laser cutting head at work"
                  draggable={false}
                  onError={() => setFailed(true)}
                  className="h-full w-full object-cover"
                  animate={reduce ? undefined : { scale: [1, 1.07, 1] }}
                  transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
              {!reduce && (
                <motion.span
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/70 to-transparent"
                  initial={{ x: "-150%" }}
                  animate={{ x: "420%" }}
                  transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
                />
              )}
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-[26px] left-1/2 h-[56px] w-[84%] -translate-x-1/2 rounded-[50%] bg-gradient-to-b from-white via-[#eceef1] to-[#c4c8cf]"
        animate={
          reduce
            ? undefined
            : {
                boxShadow: [
                  "0 0 30px rgba(0,0,0,0.12)",
                  "0 0 60px rgba(0,0,0,0.25)",
                  "0 0 30px rgba(0,0,0,0.12)",
                ],
              }
        }
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute bottom-[44px] left-1/2 h-[34px] w-[78%] -translate-x-1/2 rounded-[50%] bg-gradient-to-b from-[#fafafa] to-[#e2e4e8]" />

      {!reduce &&
        sparks.map((s, i) => (
          <motion.span
            key={i}
            aria-hidden
            className="pointer-events-none absolute bottom-[60px] rounded-full bg-[#4d90ff] shadow-[0_0_10px_3px_rgba(59,139,255,0.7)]"
            style={{ left: s.left, width: s.size, height: s.size }}
            animate={{ y: [0, -230], opacity: [0, 1, 0], scale: [0.6, 1, 0.4] }}
            transition={{ duration: s.dur, repeat: Infinity, delay: s.delay, ease: "easeOut" }}
          />
        ))}
    </motion.div>
  );
}

export default function WhyChooseUs() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const left = items.filter((i) => i.side === "left");
  const right = items.filter((i) => i.side === "right");

  /* highlight cycles through the cards automatically; pauses while hovering */
  useEffect(() => {
    if (paused || reduce) return;
    const t = setInterval(() => setActive((a) => (a + 1) % items.length), 3000);
    return () => clearInterval(t);
  }, [paused, reduce]);

  return (
    <section
      style={{ fontFamily: "'Poppins', ui-sans-serif, system-ui, sans-serif" }}
      className="relative overflow-x-clip bg-white py-16"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-40 -top-24 h-[420px] w-[520px] rounded-[50%] bg-black/[0.04] blur-2xl"
        style={{ rotate: -20 }}
        animate={reduce ? undefined : { x: [0, 50, 0], y: [0, 24, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -right-32 h-[380px] w-[560px] rounded-[50%] bg-black/[0.04] blur-2xl"
        animate={reduce ? undefined : { x: [0, -50, 0], y: [0, -24, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto w-full max-w-[1800px] px-6 lg:px-10">
        <div className="text-center">
          <div className="flex items-center justify-center gap-4">
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE }}
              className="h-[3px] w-12 origin-right rounded-full bg-[#1559e6]"
            />
            <motion.span
              initial={{ opacity: 0, letterSpacing: "0.6em" }}
              whileInView={{ opacity: 1, letterSpacing: "0.3em" }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: EASE }}
              className="text-[15px] font-bold uppercase text-[#1559e6]"
            >
              Why choose us
            </motion.span>
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE }}
              className="h-[3px] w-12 origin-left rounded-full bg-[#1559e6]"
            />
          </div>

          {/* <h2 className="mt-3 text-[34px] font-bold leading-tight tracking-tight text-[#0b1b4a] md:text-[56px]">
            <Words text="Features That Make the" base={0.15} />
            <span className="inline-block overflow-hidden align-bottom">
              <motion.span
                className="inline-block"
                initial={{ y: "110%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
              >
                <motion.span
                  className="inline-block bg-clip-text text-transparent"
                  style={{
                    backgroundImage: "linear-gradient(90deg,#1a66ff,#6aa5ff,#1a66ff)",
                    backgroundSize: "200% 100%",
                  }}
                  animate={reduce ? undefined : { backgroundPosition: ["0% 50%", "200% 50%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  Difference
                </motion.span>
              </motion.span>
            </span>
          </h2> */}

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mx-auto mt-2 max-w-[760px] text-[17px] font-medium text-slate-500"
          >
            Advanced technology, reliable performance, and long-term value for your laser cutting needs.
          </motion.p>
        </div>

        {/* 3 columns from xl (1280px); smaller portal until 2xl (1536px) */}
        <div
          className="mt-10 grid items-center gap-8 xl:grid-cols-[minmax(0,1fr)_360px_minmax(0,1fr)] xl:gap-10 2xl:grid-cols-[minmax(0,1fr)_460px_minmax(0,1fr)] 2xl:gap-16"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="order-2 flex flex-col gap-6 xl:order-1 xl:gap-8">
            {left.map((it) => (
              <FeatureCard
                key={it.title[0]}
                item={it}
                index={items.indexOf(it)}
                active={active === items.indexOf(it)}
                onEnter={() => setActive(items.indexOf(it))}
                reduce={reduce}
              />
            ))}
          </div>

          <div className="order-1 xl:order-2">
            <Portal reduce={reduce} />
          </div>

          <div className="order-3 flex flex-col gap-5">
            {right.map((it) => (
              <FeatureCard
                key={it.title[0]}
                item={it}
                index={items.indexOf(it)}
                active={active === items.indexOf(it)}
                onEnter={() => setActive(items.indexOf(it))}
                reduce={reduce}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}