"use client";
import { motion } from "framer-motion";
import { Check, Crosshair, Eye, Rocket } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";

const EASE = [0.16, 1, 0.3, 1];

/* Edit the wording here. `dark` makes the card the deep-blue one. */
const items = [
  {
    id: "vision",
    label: "Our Vision",
    watermark: "VISION",
    icon: Eye,
    title: "Precision laser technology, within every industry's reach",
    text: "To be the most trusted partner in laser cutting, engraving and marking, helping manufacturers, workshops and jewellers work with greater precision, speed and confidence.",
    points: ["Precision in every cut", "Advanced technology made accessible", "Long-term growth for our customers"],
    from: -90,
  },
  {
    id: "mission",
    label: "Our Mission",
    watermark: "MISSION",
    icon: Rocket,
    title: "The right machine, backed by people who care",
    text: "To supply high-performance laser machines matched to each customer's material, output and budget, and to stand behind every one with installation, training and responsive after-sales support.",
    points: ["The right machine for every job", "Installation and training included", "Support that stays after delivery"],
    from: 90,
    dark: true,
  },
];

function Card({ item }) {
  const { icon: Icon, dark } = item;
  return (
    <motion.article
      initial={{ opacity: 0, x: item.from, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, ease: EASE }}
      whileHover={{ y: -6 }}
      className={`group relative flex flex-col overflow-hidden rounded-[28px] p-7 sm:p-9 ${
        dark
          ? "bg-[linear-gradient(145deg,#0a3aa8,#0b5bf5_62%,#2f6bff)] text-white shadow-[0_34px_70px_-28px_rgba(11,91,245,0.75)]"
          : "bg-white/90 text-ink shadow-[0_28px_60px_-30px_rgba(10,47,134,0.4)] ring-1 ring-white"
      }`}
    >
      {/* large outlined word behind the content */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-3 top-2 select-none text-[84px] font-black leading-none text-transparent sm:text-[110px]"
        style={{ WebkitTextStroke: dark ? "1.5px rgba(255,255,255,0.16)" : "1.5px rgba(11,91,245,0.14)" }}
      >
        {item.watermark}
      </span>

      {/* slanted corner shapes */}
      <span
        aria-hidden
        className={`pointer-events-none absolute -bottom-16 -left-10 h-44 w-44 -skew-x-[24deg] rounded-3xl ${
          dark ? "bg-white/[0.07]" : "bg-brand-100/60"
        }`}
      />

      {/* light sweep, like a laser pass */}
      <motion.span
        aria-hidden
        initial={{ x: "-160%" }}
        animate={{ x: "420%" }}
        transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 5, ease: "easeInOut" }}
        className={`pointer-events-none absolute inset-y-0 left-0 w-1/4 -skew-x-[22deg] bg-gradient-to-r from-transparent to-transparent ${
          dark ? "via-white/20" : "via-brand-200/50"
        }`}
      />

      <div className="relative">
        <span
          className={`grid h-14 w-14 place-items-center rounded-2xl ${
            dark ? "bg-white/15 text-white ring-1 ring-white/25" : "bg-brand-50 text-brand ring-1 ring-brand-100"
          }`}
        >
          <Icon size={28} strokeWidth={1.7} />
        </span>

        <div
          className={`mt-6 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] ${
            dark ? "text-white/75" : "text-brand"
          }`}
        >
          <span className={`h-[2px] w-5 ${dark ? "bg-white/70" : "bg-brand"}`} />
          {item.label}
        </div>

        <h3 className="mt-3 max-w-[30ch] text-[24px] font-extrabold leading-[1.2] tracking-tight sm:text-[28px]">
          {item.title}
        </h3>
        <p className={`mt-4 text-[14.5px] leading-[1.8] ${dark ? "text-white/80" : "text-ink/70"}`}>{item.text}</p>

        <ul className="mt-6 grid gap-3">
          {item.points.map((point, i) => (
            <motion.li
              key={point}
              initial={{ opacity: 0, x: -14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.12 }}
              className="flex items-center gap-3 text-[13.5px] font-semibold"
            >
              <span
                className={`grid h-6 w-6 shrink-0 place-items-center rounded-full ${
                  dark ? "bg-white text-brand" : "bg-brand text-white"
                }`}
              >
                <Check size={14} strokeWidth={3} />
              </span>
              {point}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}

/* the line + badge between the two cards (desktop only) */
function Connector() {
  return (
    <div aria-hidden className="relative hidden w-[84px] flex-col items-center justify-center lg:flex">
      <motion.span
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3, ease: EASE }}
        className="absolute inset-y-6 left-1/2 w-[2px] origin-top -translate-x-1/2 rounded-full bg-[repeating-linear-gradient(to_bottom,#4C8DFF_0_6px,transparent_6px_13px)]"
      />
      <motion.div
        initial={{ scale: 0, rotate: -90 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 220, damping: 16, delay: 0.6 }}
        className="relative z-10"
      >
        <span className="absolute inset-0 animate-ripple rounded-full border border-brand/50" />
        <span
          className="absolute inset-0 animate-ripple rounded-full border border-brand/40"
          style={{ animationDelay: "1.1s" }}
        />
        <span className="relative grid h-16 w-16 place-items-center rounded-full bg-gradient-to-b from-brand-500 to-brand-700 text-white shadow-glow ring-4 ring-white">
          <Crosshair size={28} strokeWidth={1.8} />
        </span>
      </motion.div>
    </div>
  );
}

export default function VisionMission() {
  return (
    <section className="relative overflow-hidden py-16 lg:py-24">
      {/* soft background shapes */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-10 h-[360px] w-[520px] rotate-[-18deg] rounded-[50%] bg-brand-100/60 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -right-32 h-[340px] w-[520px] rounded-[50%] bg-brand-200/50 blur-3xl"
      />

      <div className="container-x relative">
        <div className="mx-auto max-w-2xl text-center">
          <SectionHeading label="Our purpose" align="center">
            Our Vision <span className="text-brand">&amp;</span> Mission
          </SectionHeading>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="mt-4 text-[15px] leading-relaxed text-ink/65"
          >
            Where we are headed, and how we get there with every customer we work with.
          </motion.p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_auto_1fr] lg:gap-0">
          <Card item={items[0]} />
          <Connector />
          <Card item={items[1]} />
        </div>
      </div>
    </section>
  );
}