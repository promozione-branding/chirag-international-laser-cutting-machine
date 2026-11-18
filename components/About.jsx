
"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  Cog,
  Gem,
  Globe,
  Headphones,
  Package,
  Users,
} from "lucide-react";
import Magnetic from "./ui/Magnetic";

const IMAGE_SRC = "/about_.png";

const INK = "#101B35";
const BRAND = "#0875FF";
const BRAND_SOFT = "#65A8FF";
const MUTED = "#64748B";
const LINE = "rgba(15, 35, 65, .12)";
const BG_FROM = "#FFFFFF";
const BG_TO = "#FFFFFF";
const EASE = [0.16, 1, 0.3, 1];

function Odometer({ value, suffix = "+" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const chars = value.toLocaleString("en-US").split("");
  let di = 0;

  return (
    <div
      ref={ref}
      className="flex items-baseline text-[30px] font-extrabold leading-none tracking-tight"
      style={{ color: INK }}
    >
      {chars.map((c, i) => {
        if (c === ",")
          return (
            <span key={i} className="h-[1em] leading-[1em]">
              ,
            </span>
          );

        const d = Number(c);
        const idx = di++;

        return (
          <div key={i} className="h-[1em] overflow-hidden">
            <motion.div
              initial={{ y: "0%" }}
              animate={{ y: inView ? `${-d * 10}%` : "0%" }}
              transition={{ duration: 1.5 + idx * 0.35, ease: EASE }}
            >
              {Array.from({ length: 10 }, (_, n) => (
                <div key={n} className="h-[1em] leading-[1em]">
                  {n}
                </div>
              ))}
            </motion.div>
          </div>
        );
      })}
      <span style={{ color: BRAND }}>{suffix}</span>
    </div>
  );
}

const perks = [
  { icon: Gem, lines: ["Advanced", "Technology"] },
  { icon: Cog, lines: ["Robust &", "Durable"] },
  { icon: Headphones, lines: ["Dedicated", "Support"] },
];

const stats = [
  { icon: CalendarDays, value: 10, label: "Years of Experience" },
  { icon: Users, value: 500, label: "Happy Clients" },
  { icon: Package, value: 1000, label: "Machines Installed" },
  { icon: Globe, value: 25, label: "Countries Served" },
];

export default function About() {
  const reduce = useReducedMotion();

  const float = (amp, dur, delay = 0) =>
    reduce
      ? {}
      : {
          y: {
            duration: dur,
            delay,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          },
        };

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-white pb-10 pt-12"
      style={{
        background: `linear-gradient(160deg, ${BG_FROM} 0%, ${BG_TO} 100%)`,
      }}
    >
      {/* Background decoration */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {/* Soft blue glow */}
        <div
          className="absolute -right-24 top-10 h-[420px] w-[520px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgba(8,117,255,.10), rgba(8,117,255,0))",
          }}
        />

        <div
          className="absolute -top-8 right-[9%] hidden h-[330px] w-[20%] lg:block"
          style={{
            transform: "skewX(-24deg)",
            background:
              "linear-gradient(180deg,rgba(8,117,255,.045),rgba(255,255,255,0))",
          }}
        />

        <div
          className="absolute left-[60.5%] top-0 hidden h-[260px] w-[1.5px] origin-top bg-blue-100 lg:block"
          style={{ transform: "rotate(28deg)" }}
        />

        <div
          className="absolute left-[72%] top-0 hidden h-[150px] w-[1.5px] origin-top bg-blue-100 lg:block"
          style={{ transform: "rotate(24deg)" }}
        />

        <div
          className="absolute -left-10 bottom-0 h-[180px] w-[300px]"
          style={{
            transform: "skewY(28deg)",
            background:
              "linear-gradient(90deg,rgba(8,117,255,.07),rgba(8,117,255,0))",
          }}
        />
      </div>

      <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-10">
        <div className="relative lg:min-h-[400px]">
          {/* LEFT CONTENT */}
          <div className="relative z-10 max-w-[560px] lg:max-w-[52%]">
            <motion.div
              initial={{ opacity: 0, x: -70 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: EASE }}
              className="flex items-center gap-3.5"
            >
              <span
                className="h-[2.5px] w-10 rounded-full"
                style={{ background: BRAND }}
              />
              <span
                className="text-[13px] font-bold uppercase tracking-[0.22em]"
                style={{ color: BRAND }}
              >
                About us
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, x: -90 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.1, ease: EASE }}
              className="mt-3.5 text-[clamp(1.75rem,2.9vw,2.6rem)] font-extrabold leading-[1.12] tracking-[-0.02em]"
              style={{ color: INK }}
            >
              Engineering Precision
              <br />
              Through{" "}
              <span
                style={{
                  background: `linear-gradient(90deg,${BRAND},${BRAND_SOFT})`,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                Laser Technology
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, x: -70 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: EASE }}
              className="mt-4 max-w-[460px] text-[14.5px] leading-[1.65]"
              style={{ color: MUTED }}
            >
              We are a leading manufacturer and supplier of high-performance
              laser cutting machines, delivering precision, productivity, and
              reliability to industries worldwide.
            </motion.p>

            {/* Feature perks */}
            <div className="mt-6 flex flex-wrap items-center gap-y-3">
              {perks.map(({ icon: Icon, lines }, i) => (
                <motion.div
                  key={lines.join(" ")}
                  initial={{ opacity: 0, x: -60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.9,
                    delay: 0.3 + i * 0.1,
                    ease: EASE,
                  }}
                  className="flex items-center"
                >
                  {i > 0 && (
                    <span
                      className="mx-4 hidden h-[44px] w-px sm:block"
                      style={{ background: LINE }}
                    />
                  )}

                  <div className="group flex items-center gap-3">
                    <motion.span
                      animate={reduce ? undefined : { y: [0, -4, 0] }}
                      transition={
                        reduce
                          ? undefined
                          : {
                              duration: 3.2 + i * 0.5,
                              delay: i * 0.4,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }
                      }
                      whileHover={{ scale: 1.08, rotate: -3 }}
                      className="flex h-[46px] w-[46px] shrink-0 cursor-default items-center justify-center rounded-[14px]"
                      style={{
                        background:
                          "linear-gradient(145deg,#EFF6FF,#DCEBFF)",
                        boxShadow:
                          "0 6px 14px -6px rgba(8,117,255,.18), 0 0 0 1px rgba(8,117,255,.13), inset 0 1px 0 rgba(255,255,255,.9)",
                      }}
                    >
                      <Icon
                        size={22}
                        strokeWidth={1.7}
                        style={{ color: BRAND }}
                      />
                    </motion.span>

                    <span
                      className="text-[13px] font-semibold leading-[1.3]"
                      style={{ color: INK }}
                    >
                      {lines[0]}
                      <br />
                      {lines[1]}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              className="mt-7"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.55, ease: EASE }}
            >
              <Magnetic>
                <a
                  href="#story"
                  className="inline-flex items-center gap-2.5 rounded-full px-6 py-3 text-[15px] font-bold text-white transition-transform hover:scale-[1.03]"
                  style={{
                    background: `linear-gradient(180deg,${BRAND_SOFT} 0%,${BRAND} 100%)`,
                    boxShadow:
                      "0 12px 24px -8px rgba(8,117,255,.38), inset 0 1px 0 rgba(255,255,255,.5)",
                  }}
                >
                  Learn More
                  <ArrowRight size={16} strokeWidth={2.4} />
                </a>
              </Magnetic>
            </motion.div>
          </div>

          {/* RIGHT IMAGE AREA */}
          <motion.div
            initial={{ opacity: 0, x: 140 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: EASE }}
            className="relative mt-8 h-[260px] w-full sm:h-[320px] lg:absolute lg:-top-2 lg:right-[-3.5%] lg:mt-0 lg:h-[440px] lg:w-[56%]"
          >
            {/* Back slab */}
            <motion.div
              aria-hidden
              initial={{ opacity: 0, x: 90 }}
              whileInView={{
                opacity: 1,
                x: 0,
                y: reduce ? 0 : [0, -10, 0],
              }}
              viewport={{ once: true }}
              transition={{
                opacity: { duration: 0.8, delay: 0.5 },
                x: { duration: 1.3, delay: 0.5, ease: EASE },
                ...float(10, 5, 1.8),
              }}
              className="absolute bottom-[30px] right-[2%] top-[72px] hidden w-[15%] rounded-[28px] lg:block"
              style={{
                transform: "skewX(-22deg)",
                background:
                  "linear-gradient(180deg,#FFFFFF 0%,#EDF4FF 45%,rgba(237,244,255,.5) 80%,rgba(255,255,255,0) 100%)",
                boxShadow: "0 20px 40px -18px rgba(8,117,255,.15)",
              }}
            />

            {/* Glass slab */}
            <motion.div
              aria-hidden
              initial={{ opacity: 0, x: 70 }}
              whileInView={{
                opacity: 1,
                x: 0,
                y: reduce ? 0 : [0, 9, 0],
              }}
              viewport={{ once: true }}
              transition={{
                opacity: { duration: 0.8, delay: 0.35 },
                x: { duration: 1.3, delay: 0.35, ease: EASE },
                ...float(9, 6, 1.5),
              }}
              className="absolute bottom-[14px] left-[10%] right-[4%] top-[16px] hidden rounded-[36px] lg:block"
              style={{
                transform: "skewX(-23deg)",
                background:
                  "linear-gradient(135deg,rgba(255,255,255,.96) 0%,rgba(239,246,255,.8) 55%,rgba(8,117,255,.08) 100%)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                boxShadow:
                  "0 30px 50px -25px rgba(8,117,255,.20), 0 0 0 1px rgba(8,117,255,.10), inset 0 1px 0 rgba(255,255,255,.95)",
              }}
            />

            {/* Main image frame */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{
                opacity: 1,
                x: 0,
                y: reduce ? 0 : [0, -6, 0],
              }}
              viewport={{ once: true }}
              transition={{
                opacity: { duration: 0.8, delay: 0.15 },
                x: { duration: 1.2, delay: 0.15, ease: EASE },
                ...float(6, 5.5, 1.4),
              }}
              className="absolute bottom-[38px] left-[3%] right-[7%] top-0 overflow-hidden rounded-[36px]"
              style={{
                transform: "skewX(-23deg)",
                background: "linear-gradient(135deg,#FFFFFF,#EDF4FF)",
                boxShadow:
                  "0 40px 70px -28px rgba(8,117,255,.25), 0 0 0 1px rgba(8,117,255,.22), 0 0 0 5px rgba(8,117,255,.035)",
              }}
            >
              <div
                className="absolute inset-y-0 -left-[22%] w-[145%]"
                style={{ transform: "skewX(23deg)" }}
              >
                {IMAGE_SRC ? (
                  <img
                    src={IMAGE_SRC}
                    alt="Laser cutting head cutting a metal sheet"
                    className="h-full w-full object-cover"
                  />
                ) : null}

                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg,rgba(255,255,255,.08),rgba(255,255,255,0) 30%)," +
                      "radial-gradient(120% 90% at 55% 55%,rgba(0,0,0,0) 55%,rgba(8,30,60,.20) 100%)",
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* STATS */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
          className="relative z-10 mt-8"
        >
          <motion.div
            animate={reduce ? undefined : { y: [0, -5, 0] }}
            transition={
              reduce
                ? undefined
                : { duration: 6, repeat: Infinity, ease: "easeInOut" }
            }
            className="rounded-[28px] border border-[#E5EDFA] bg-white px-6 py-6 backdrop-blur-xl sm:px-8"
            style={{
              background:
                "linear-gradient(180deg,rgba(255,255,255,.98),rgba(247,250,255,.96))",
              boxShadow:
                "0 24px 50px -24px rgba(8,117,255,.20), 0 0 0 1px rgba(8,117,255,.04), inset 0 1px 0 rgba(255,255,255,1)",
            }}
          >
            <div className="grid grid-cols-2 gap-y-6 lg:flex lg:items-center lg:justify-between">
              {stats.map(({ icon: Icon, value, label }, i) => (
                <div key={label} className="flex items-center lg:flex-1">
                  {i > 0 && (
                    <span
                      className="hidden h-[56px] w-px lg:block"
                      style={{ background: LINE }}
                    />
                  )}

                  <motion.div
                    whileHover={{ y: -4, scale: 1.04 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 18,
                    }}
                    className="flex items-center gap-4 lg:mx-auto"
                  >
                    <Icon
                      size={42}
                      strokeWidth={1.4}
                      className="shrink-0"
                      style={{ color: BRAND }}
                    />

                    <div>
                      <Odometer value={value} />
                      <div
                        className="mt-1.5 text-[13px]"
                        style={{ color: MUTED }}
                      >
                        {label}
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
