"use client";
import { useEffect, useRef, useState } from "react";
import { motion, animate, useInView, useReducedMotion } from "framer-motion";
import {
  Factory,
  Car,
  ShoppingBag,
  Building2,
  Armchair,
} from "lucide-react";

const IMG = {
  center: "/why_.png",
  industrial: "/industries/industrial.png",
  automotive: "/industries/automotive.png",
  construction: "/industries/construction.png",
  leather: "/industries/leather.png",
  furniture: "/industries/furniture.png",
};

const EASE = [0.16, 1, 0.3, 1];
const STEP_EASE = [0.65, 0, 0.35, 1];
const DARK = "#16222e";
const ACCENT = "#0875FF";

const CX = 980;
const CY = 668;
const R_IN = 290;
const R_OUT = 560;
const R_MID = (R_IN + R_OUT) / 2;
const HALF = 22; // half of each card's angular width (gap between cards = 4deg)
const CORNER = 14;
const PX = CX; // centre of the card in its "top" position
const PY = CY - R_MID;
const BOX = 500; // upright content box that always covers the sector

const rad = (d) => (d * Math.PI) / 180;
const pt = (r, deg) => [CX + r * Math.sin(rad(deg)), CY - r * Math.cos(rad(deg))];
const n2 = (n) => n.toFixed(2);

function sectorPath(r1, r2, a0, a1, rc) {
  const dO = (rc / r2) * (180 / Math.PI);
  const dI = (rc / r1) * (180 / Math.PI);
  const P = (r, a) => pt(r, a).map(n2).join(" ");
  return [
    `M${P(r2, a0 + dO)}`,
    `A${r2} ${r2} 0 0 1 ${P(r2, a1 - dO)}`,
    `Q${P(r2, a1)} ${P(r2 - rc, a1)}`,
    `L${P(r1 + rc, a1)}`,
    `Q${P(r1, a1)} ${P(r1, a1 - dI)}`,
    `A${r1} ${r1} 0 0 0 ${P(r1, a0 + dI)}`,
    `Q${P(r1, a0)} ${P(r1 + rc, a0)}`,
    `L${P(r2 - rc, a0)}`,
    `Q${P(r2, a0)} ${P(r2, a0 + dO)}`,
    "Z",
  ].join(" ");
}

function arcPath(r, a0, a1) {
  const [x0, y0] = pt(r, a0);
  const [x1, y1] = pt(r, a1);
  const large = Math.abs(a1 - a0) > 180 ? 1 : 0;
  return `M${n2(x0)} ${n2(y0)} A${r} ${r} 0 ${large} 1 ${n2(x1)} ${n2(y1)}`;
}

const SECTOR = sectorPath(R_IN, R_OUT, -HALF, HALF, CORNER);

/* clockwise order, starting from bottom-left */
const CARDS = [
  { key: "construction", Icon: Building2, lines: ["Construction", "& Infrastructure"] },
  { key: "automotive", Icon: Car, lines: ["Automotive"] },
  { key: "leather", Icon: ShoppingBag, lines: ["Leather", "& Goods"] },
  { key: "furniture", Icon: Armchair, lines: ["Furniture", "& Interiors"] },
];


function cardState(t) {
  const j = Math.min(3, Math.floor(t));
  const f = t - j;
  if (j === 0) return { a: -96 + 48 * f, s: 1, o: 1 };
  if (j === 1) {
    const d = Math.sin(Math.PI * f);
    return { a: -48 + 96 * f, s: 1 - 0.08 * d, o: 1 - 0.45 * d };
  }
  if (j === 2) return { a: 48 + 48 * f, s: 1, o: 1 };
  if (f < 0.5) {
    const g = f * 2;
    return { a: 96 + 12 * g, s: 1 - 0.18 * g, o: 1 - g };
  }
  const g = (f - 0.5) * 2;
  return { a: -108 + 12 * g, s: 0.82 + 0.18 * g, o: g };
}

function CountUp({ to = 5, suffix = "+" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (n) => setV(Math.round(n)),
    });
    return () => c.stop();
  }, [inView, to]);
  return (
    <span ref={ref}>
      {v}
      {suffix}
    </span>
  );
}

const fb = { transformBox: "fill-box", transformOrigin: "center" };

/* The four orbiting cards (re-renders on its own, so the rest of the section stays still) */
function OrbitCards() {
  const reduce = useReducedMotion();
  const [p, setP] = useState(0);
  const paused = useRef(false);

  useEffect(() => {
    if (reduce) return;
    let dead = false;
    let ctrl;
    let base = 0;
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    (async () => {
      while (!dead) {
        await sleep(2000); // rest on each position
        while (paused.current && !dead) await sleep(150);
        if (dead) break;
        ctrl = animate(base, base + 1, {
          duration: 1.5,
          ease: STEP_EASE,
          onUpdate: (v) => setP(v % 4),
        });
        await ctrl;
        base = (base + 1) % 4;
      }
    })();
    return () => {
      dead = true;
      ctrl?.stop();
    };
  }, [reduce]);

  return (
    <motion.g
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay: 0.5 }}
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
    >
      {CARDS.map((c, i) => {
        const { a, s, o } = cardState((i + p) % 4);
        const { Icon } = c;
        // rotate around the circle centre (+ slight shrink towards it when "behind")
        const outer = `translate(${CX} ${CY}) rotate(${n2(a)}) scale(${n2(s)}) translate(${-CX} ${-CY})`;
        // keep photo + text upright while the card travels
        const counter = `rotate(${n2(-a)} ${PX} ${PY})`;
        const ys = c.lines.length > 1 ? [-42, -14] : [-28];

        return (
          <g key={c.key} opacity={o}>
            <g filter="url(#soft)">
              <path d={SECTOR} transform={outer} fill="#e3e8ed" />
            </g>
            <g transform={outer}>
              <path d={SECTOR} fill="url(#seg-light)" />
              <g clipPath="url(#clip-sector)">
                <g transform={counter}>
                  <motion.image
                    href={IMG[c.key]}
                    x={PX - BOX / 2}
                    y={PY - BOX / 2}
                    width={BOX}
                    height={BOX}
                    preserveAspectRatio="xMidYMid slice"
                    style={fb}
                    animate={{ scale: [1, 1.06, 1] }}
                    transition={{ duration: 10, delay: i * 0.6, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <rect
                    x={PX - BOX / 2}
                    y={PY - BOX / 2}
                    width={BOX}
                    height={BOX}
                    fill="url(#fade-card)"
                  />
                </g>
              </g>
              <g transform={counter}>
                <Icon
                  x={PX - 27}
                  y={PY - 125}
                  width={54}
                  height={54}
                  strokeWidth={1.4}
                  color={DARK}
                />
                {c.lines.map((t, k) => (
                  <text
                    key={t}
                    x={PX}
                    y={PY + ys[k]}
                    textAnchor="middle"
                    fontSize={26}
                    fontWeight={700}
                    fill={DARK}
                    stroke="#eef1f4"
                    strokeWidth={5}
                    strokeLinejoin="round"
                    paintOrder="stroke"
                    style={{ fontFamily: "inherit" }}
                  >
                    {t}
                  </text>
                ))}
              </g>
            </g>
          </g>
        );
      })}
    </motion.g>
  );
}

export default function IndustriesServed() {
  return (
    <section className="relative overflow-hidden py-14 sm:py-20 lg:py-0">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-32 h-[420px] w-[620px] rounded-full bg-gradient-to-tr from-gray-500/40 via-gray-300/20 to-transparent blur-2xl"
        animate={{ x: [0, 30, 0], y: [0, -14, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 h-full w-2/3 bg-[radial-gradient(ellipse_at_70%_50%,rgba(238,241,244,0.9),transparent_70%)]"
      />

      <div className="container-x relative mx-auto grid max-w-[1500px] items-center gap-10 px-5 sm:px-8 lg:min-h-[820px] lg:grid-cols-[minmax(0,0.36fr)_minmax(0,0.64fr)]">
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
            className="flex items-center gap-4"
          >
            <motion.span
              className="h-[3px] bg-[#0875FF]"
              initial={{ width: 0 }}
              whileInView={{ width: 52 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
            />
            <span
              className="text-sm font-bold uppercase tracking-[0.28em]"
              style={{ color: DARK }}
            >
              Our Expertise
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
            className="mt-8 text-[56px] font-extrabold leading-[1.05] tracking-tight sm:text-[68px]"
            style={{ color: DARK }}
          >
            Industries
            <br />
            We{" "}
            <motion.span
              className="inline-block italic"
              style={{ color: ACCENT }}
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            >
              Served
            </motion.span>
          </motion.h2>

          <svg width="190" height="28" viewBox="0 0 190 28" className="ml-[170px] -mt-1">
            <motion.path
              d="M4 20 C50 4 120 2 186 14"
              fill="none"
              stroke="#0875FF"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.7"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, delay: 0.6, ease: "easeOut" }}
            />
          </svg>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
            className="mt-6 max-w-[360px] text-[18px] leading-[1.65] text-slate-600"
          >
            Delivering precision laser cutting solutions across diverse
            industries with proven quality and reliability.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.45, ease: EASE }}
            className="mt-12 flex items-center gap-4 border-l-[3px] border-[#0875FF] pl-5"
          >
            <span className="text-[64px] font-extrabold leading-none text-[#0875FF]">
              <CountUp to={5} />
            </span>
            <span
              className="text-[18px] font-semibold leading-tight"
              style={{ color: DARK }}
            >
              Key Industries
              <br />
              Served
            </span>
          </motion.div>
        </div>

        <div className="relative w-full">
          <svg
            viewBox="400 80 1160 880"
            className="h-auto w-full overflow-visible"
            role="img"
            aria-label="Industries we serve: Industrial Manufacturing, Automotive, Leather and Goods, Construction and Infrastructure, Furniture and Interiors"
          >
            <defs>
              <linearGradient id="seg-light" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#f4f6f8" />
                <stop offset="1" stopColor="#e3e8ed" />
              </linearGradient>
              <linearGradient id="seg-dark" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#0f1a24" />
                <stop offset="1" stopColor="#2b3a48" />
              </linearGradient>
              {/* light fade over the upper part of each orbiting card so text stays readable */}
              <linearGradient id="fade-card" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#eef1f4" stopOpacity="0.97" />
                <stop offset="0.42" stopColor="#eef1f4" stopOpacity="0.95" />
                <stop offset="0.72" stopColor="#eef1f4" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="arc-green" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#0875FF" stopOpacity="0" />
                <stop offset="0.5" stopColor="#0875FF" />
                <stop offset="1" stopColor="#0875FF" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="tint-top" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#0f1a24" stopOpacity="0.55" />
                <stop offset="1" stopColor="#0f1a24" stopOpacity="0.85" />
              </linearGradient>
              <radialGradient id="spark" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0" stopColor="#d9f6ff" stopOpacity="0.95" />
                <stop offset="1" stopColor="#0875FF" stopOpacity="0" />
              </radialGradient>
              <filter id="soft" x="-30%" y="-30%" width="160%" height="170%">
                <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#0b2a24" floodOpacity="0.16" />
              </filter>
              <clipPath id="clip-center">
                <circle cx={CX} cy={CY} r="218" />
              </clipPath>
              {/* one shared sector clip: every card has the Industrial card's shape */}
              <clipPath id="clip-sector">
                <path d={SECTOR} />
              </clipPath>
            </defs>

            {/* guide arcs that run with the cards (open at the bottom) */}
            <motion.path
              d={arcPath(272, -118, 118)}
              fill="none"
              stroke="url(#arc-green)"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, delay: 0.3, ease: "easeInOut" }}
            />
            <path
              d={arcPath(582, -122, 122)}
              fill="none"
              stroke="#e3e8ed"
              strokeWidth="1.5"
            />

            <OrbitCards />

            <motion.g
              style={fb}
              initial={{ opacity: 0, y: -50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1, delay: 0.2, ease: EASE }}
            >
              <g filter="url(#soft)">
                <path d={SECTOR} fill="url(#seg-dark)" />
              </g>

              <g clipPath="url(#clip-sector)">
                <motion.image
                  href={IMG.industrial}
                  x={PX - BOX / 2}
                  y={PY - BOX / 2}
                  width={BOX}
                  height={BOX}
                  preserveAspectRatio="xMidYMid slice"
                  style={fb}
                  animate={{ scale: [1, 1.06, 1] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                />
                <rect x={PX - BOX / 2} y={PY - BOX / 2} width={BOX} height={BOX} fill="url(#tint-top)" />

                {/* decorative flowing lines */}
                <g fill="none" stroke="#6fd6ee" strokeOpacity="0.35">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <motion.path
                      key={i}
                      d={`M${900 + i * 14} 112 C${1000 + i * 12} 150 ${1060 + i * 10} 215 ${1090 + i * 6} 330`}
                      strokeWidth="1"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: [0, 1, 1, 0] }}
                      transition={{
                        duration: 7,
                        delay: i * 0.4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </g>
              </g>

              {/* accent along the outer edge */}
              <path
                d={arcPath(R_OUT - 3, -HALF + 6, HALF - 6)}
                fill="none"
                stroke={ACCENT}
                strokeWidth="6"
                strokeLinecap="round"
              />

              <Factory x={PX - 40} y={147} width={80} height={70} strokeWidth={1.3} color="#fff" />
              <text x={PX} y="272" textAnchor="middle" fontSize="32" fontWeight="700" fill="#fff">
                Industrial
              </text>
              <text x={PX} y="310" textAnchor="middle" fontSize="32" fontWeight="700" fill="#fff">
                Manufacturing
              </text>
              
            </motion.g>

            {/* ---------- centre circle ---------- */}
            <motion.g
              style={fb}
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1.1, delay: 0.1, ease: EASE }}
            >
              <circle cx={CX} cy={CY} r="236" fill="#fff" filter="url(#soft)" />
              <circle cx={CX} cy={CY} r="228" fill="#fff" stroke="#e3e8ed" strokeWidth="2" />

              <g clipPath="url(#clip-center)">
                <motion.image
                  href={IMG.center}
                  x={755}
                  y={445}
                  width={450}
                  height={445}
                  preserveAspectRatio="xMidYMid slice"
                  style={fb}
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                />
                {/* pulsing laser glow */}
                <motion.circle
                  cx="998"
                  cy="718"
                  r="70"
                  fill="url(#spark)"
                  style={{ mixBlendMode: "screen", ...fb }}
                  animate={{ opacity: [0.35, 0.95, 0.35], scale: [0.85, 1.25, 0.85] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                />
              </g>

              {/* rotating dashed orbit */}
              <motion.circle
                cx={CX}
                cy={CY}
                r="250"
                fill="none"
                stroke={ACCENT}
                strokeOpacity="0.45"
                strokeWidth="2"
                strokeDasharray="6 18"
                strokeLinecap="round"
                style={fb}
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              />

              
            </motion.g>


          </svg>
        </div>
      </div>
    </section>
  );
}