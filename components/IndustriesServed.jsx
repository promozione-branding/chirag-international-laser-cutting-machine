"use client";
import { useEffect, useRef, useState } from "react";
import { motion, animate, useInView } from "framer-motion";
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
const DARK = "#16222e";
const ACCENT = "#0875FF"; 

const PATHS = {
  top: "M738 165 C735 140 760 120 790 108 C900 70 1090 70 1190 110 C1230 125 1245 145 1235 170 L1125 385 C1118 400 1100 402 1085 395 C1020 372 940 372 880 395 C862 402 845 398 838 385 Z",
  automotive:
    "M718 200 C700 195 685 205 672 220 L495 435 C478 458 480 480 500 495 L600 565 C615 572 635 570 650 563 L840 470 C858 460 862 440 855 425 L745 215 C738 205 728 200 718 200 Z",
  construction:
    "M450 520 C440 530 428 545 426 570 L430 780 C432 815 455 850 495 845 L700 800 C725 790 735 775 728 750 L722 590 C720 575 705 575 690 572 L520 505 C495 498 465 505 450 520 Z",
  leather:
    "M1280 200 C1300 195 1315 205 1328 220 L1505 440 C1520 460 1515 485 1495 498 L1350 590 C1335 600 1315 598 1300 590 L1140 435 C1125 420 1122 405 1130 392 L1230 215 C1245 203 1265 198 1280 200 Z",
  furniture:
    "M1560 510 C1580 515 1590 540 1590 560 L1575 700 C1572 800 1540 870 1500 885 L1230 845 C1205 840 1200 810 1215 790 L1245 645 C1250 630 1265 620 1285 615 Z",
};

const light = [
  {
    key: "automotive",
    path: PATHS.automotive,
    img: { x: 515, y: 380, w: 370, h: 200 },
    Icon: Car,
    icon: { x: 651, y: 283, s: 50 },
    lines: [{ t: "Automotive", x: 677, y: 363 }],
    delay: 0.35,
    float: 0.2,
  },
  {
    key: "leather",
    path: PATHS.leather,
    img: { x: 1120, y: 335, w: 410, h: 270 },
    Icon: ShoppingBag,
    icon: { x: 1277, y: 248, s: 52 },
    lines: [
      { t: "Leather", x: 1304, y: 341 },
      { t: "& Goods", x: 1304, y: 371 },
    ],
    delay: 0.5,
    float: 0.8,
  },
  {
    key: "construction",
    path: PATHS.construction,
    img: { x: 430, y: 655, w: 305, h: 200 },
    Icon: Building2,
    icon: { x: 548, y: 546, s: 60 },
    lines: [
      { t: "Construction", x: 579, y: 637 },
      { t: "& Infrastructure", x: 579, y: 664 },
    ],
    delay: 0.65,
    float: 1.2,
  },
  {
    key: "furniture",
    path: PATHS.furniture,
    img: { x: 1205, y: 650, w: 390, h: 250 },
    Icon: Armchair,
    icon: { x: 1422, y: 556, s: 60 },
    lines: [
      { t: "Furniture", x: 1453, y: 645 },
      { t: "& Interiors", x: 1453, y: 673 },
    ],
    delay: 0.8,
    float: 0.5,
  },
];

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

export default function IndustriesServed() {
  const fb = { transformBox: "fill-box", transformOrigin: "center" };

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
            viewBox="420 60 1252 880"
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
              <linearGradient id="fade-top" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#eef1f4" stopOpacity="1" />
                <stop offset="0.55" stopColor="#eef1f4" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="arc-green" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#0875FF" stopOpacity="0" />
                <stop offset="0.5" stopColor="#0875FF" />
                <stop offset="1" stopColor="#0875FF" stopOpacity="0.2" />
              </linearGradient>
              {/* darkens the top photo so white text stays readable */}
              <linearGradient id="tint-top" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#0f1a24" stopOpacity="0.55" />
                <stop offset="1" stopColor="#0f1a24" stopOpacity="0.85" />
              </linearGradient>
              <radialGradient id="spark" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0" stopColor="#d9f6ff" stopOpacity="0.95" />
                <stop offset="1" stopColor="#0875FF" stopOpacity="0" />
              </radialGradient>
              <filter id="soft" x="-20%" y="-20%" width="140%" height="150%">
                <feDropShadow dx="0" dy="14" stdDeviation="14" floodColor="#0b2a24" floodOpacity="0.16" />
              </filter>
              <clipPath id="clip-center">
                <circle cx="980" cy="668" r="218" />
              </clipPath>
              {light.map((s) => (
                <clipPath key={s.key} id={`clip-${s.key}`}>
                  <path d={s.path} />
                </clipPath>
              ))}
              <clipPath id="clip-top">
                <path d={PATHS.top} />
              </clipPath>
            </defs>

            {/* big outer arc on the far right */}
            <motion.path
              d="M1350 160 C1520 220 1640 400 1635 620 C1632 760 1580 860 1520 892"
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
              d="M1500 100 C1610 190 1665 330 1660 500"
              fill="none"
              stroke="#e3e8ed"
              strokeWidth="1.5"
            />

            {/* ---------- light segments ---------- */}
            {light.map((s) => {
              const { Icon } = s;
              return (
                <motion.g
                  key={s.key}
                  style={fb}
                  initial={{ opacity: 0, scale: 0.85, y: 40 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.9, delay: s.delay, ease: EASE }}
                  whileHover={{ scale: 1.04 }}
                  className="cursor-pointer"
                >
                  <motion.g
                    style={fb}
                    animate={{ y: [0, -7, 0] }}
                    transition={{
                      duration: 5,
                      delay: s.float,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <path d={s.path} fill="url(#seg-light)" filter="url(#soft)" />
                    <g clipPath={`url(#clip-${s.key})`}>
                      <motion.image
                        href={IMG[s.key]}
                        x={s.img.x}
                        y={s.img.y}
                        width={s.img.w}
                        height={s.img.h}
                        preserveAspectRatio="xMidYMid slice"
                        style={fb}
                        animate={{ scale: [1, 1.06, 1] }}
                        transition={{
                          duration: 10,
                          delay: s.float,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                      <rect
                        x={s.img.x}
                        y={s.img.y}
                        width={s.img.w}
                        height={s.img.h}
                        fill="url(#fade-top)"
                      />
                    </g>
                    <Icon
                      x={s.icon.x}
                      y={s.icon.y}
                      width={s.icon.s}
                      height={s.icon.s}
                      strokeWidth={1.4}
                      color={DARK}
                    />
                    {s.lines.map((l) => (
                      <text
                        key={l.t}
                        x={l.x}
                        y={l.y}
                        textAnchor="middle"
                        fontSize={s.lines.length > 1 ? 26 : 27}
                        fontWeight={700}
                        fill={DARK}
                        style={{ fontFamily: "inherit" }}
                      >
                        {l.t}
                      </text>
                    ))}
                  </motion.g>
                </motion.g>
              );
            })}

            {/* ---------- top (dark) segment ---------- */}
            <motion.g
              style={fb}
              initial={{ opacity: 0, y: -50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1, delay: 0.2, ease: EASE }}
              whileHover={{ scale: 1.04 }}
              className="cursor-pointer"
            >
              <motion.g
                style={fb}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <path d={PATHS.top} fill="url(#seg-dark)" filter="url(#soft)" />

                {/* industrial photo + dark tint for text legibility */}
                <g clipPath="url(#clip-top)">
                  <motion.image
                    href={IMG.industrial}
                    x={738}
                    y={70}
                    width={510}
                    height={335}
                    preserveAspectRatio="xMidYMid slice"
                    style={fb}
                    animate={{ scale: [1, 1.06, 1] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <rect x={738} y={70} width={510} height={335} fill="url(#tint-top)" />
                </g>

                {/* decorative flowing lines */}
                <g clipPath="url(#clip-top)" fill="none" stroke="#6fd6ee" strokeOpacity="0.35">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <motion.path
                      key={i}
                      d={`M${1000 + i * 12} 82 C${1110 + i * 12} 110 ${1180 + i * 10} 190 ${1215 + i * 6} 290`}
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
                <path
                  d="M1090 72 C1170 86 1230 120 1243 160"
                  fill="none"
                  stroke={ACCENT}
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                <Factory
                  x={940}
                  y={122}
                  width={100}
                  height={86}
                  strokeWidth={1.3}
                  color="#fff"
                />
                <text x="990" y="248" textAnchor="middle" fontSize="38" fontWeight="700" fill="#fff">
                  Industrial
                </text>
                <text x="990" y="286" textAnchor="middle" fontSize="38" fontWeight="700" fill="#fff">
                  Manufacturing
                </text>
                <motion.rect
                  x="956"
                  y="311"
                  height="5"
                  rx="2.5"
                  fill="#0875FF"
                  initial={{ width: 0 }}
                  whileInView={{ width: 68 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 1, ease: EASE }}
                />
              </motion.g>
            </motion.g>

            {/* ---------- centre circle ---------- */}
            <motion.g
              style={fb}
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1.1, delay: 0.1, ease: EASE }}
            >
              {/* white ring */}
              <circle cx="980" cy="668" r="236" fill="#fff" filter="url(#soft)" />
              <circle cx="980" cy="668" r="228" fill="#fff" stroke="#e3e8ed" strokeWidth="2" />

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
                cx="980"
                cy="668"
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

              {/* orbiting dot */}
              <motion.g
                style={{ transformOrigin: "980px 668px" }}
                animate={{ rotate: 360 }}
                transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
              >
                <circle cx="980" cy="418" r="7" fill={ACCENT} />
                <circle cx="980" cy="418" r="14" fill={ACCENT} opacity="0.25" />
              </motion.g>
            </motion.g>

            {/* accent arcs around the circle */}
          
            <motion.path
              d="M740 632 C725 720 760 810 835 860"
              fill="none"
              stroke={ACCENT}
              strokeWidth="9"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, delay: 1.1, ease: "easeOut" }}
            />
            
          </svg>
        </div>
      </div>
    </section>
  );
}