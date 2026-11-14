"use client";
import { useId } from "react";
import { motion } from "framer-motion";
import { rnd, r1 } from "@/lib/seed";
/* ------------------------------------------------------------------ */
/* Back layer: glowing floor, dashed orbit rings, circuit-style paths  */
/* ------------------------------------------------------------------ */
const circuits = [
  "M20 430 H140 L190 380 H260",
  "M580 90 H470 L420 140 H370",
  "M30 130 H110 L150 170 H210",
  "M570 410 H470 L430 370 H380",
];
const dots = [
  [260, 380],
  [370, 140],
  [210, 170],
  [380, 370],
];
export function LaserRings({ className = "" }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 600 520" className={className} fill="none" aria-hidden>
      <defs>
        <linearGradient id={`${id}r`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#0B5BF5" stopOpacity="0" />
          <stop offset=".5" stopColor="#3B9BFF" />
          <stop offset="1" stopColor="#0B5BF5" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={`${id}f`} cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#7CC0FF" stopOpacity=".6" />
          <stop offset="1" stopColor="#7CC0FF" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="300" cy="340" rx="295" ry="78" fill={`url(#${id}f)`} />

      {[0, 1, 2].map((i) => (
        <motion.ellipse
          key={i}
          cx="300"
          cy="340"
          rx={255 - i * 72}
          ry={60 - i * 17}
          stroke={`url(#${id}r)`}
          strokeWidth={2.4 - i * 0.5}
          strokeDasharray="10 12"
          animate={{ strokeDashoffset: [0, i % 2 ? 44 : -44] }}
          transition={{ duration: 3 + i, repeat: Infinity, ease: "linear" }}
        />
      ))}
      <motion.ellipse
        cx="300"
        cy="190"
        rx="288"
        ry="34"
        stroke={`url(#${id}r)`}
        strokeWidth="2"
        strokeDasharray="3 10"
        animate={{ strokeDashoffset: [0, -52] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />

      {circuits.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          stroke="#3B9BFF"
          strokeWidth="1.6"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, delay: i * 1.1, ease: "easeInOut" }}
        />
      ))}
      {dots.map(([cx, cy], i) => (
        <motion.circle
          key={i}
          cx={cx}
          cy={cy}
          r="3.5"
          fill="#3B9BFF"
          animate={{ opacity: [0, 1, 1, 0], scale: [0.4, 1, 1, 0.4] }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
          transition={{ duration: 5.5, repeat: Infinity, delay: i * 1.1 }}
        />
      ))}

      <motion.path
        d="M95 232 L121 247 V277 L95 292 L69 277 V247 Z"
        stroke="#7CB4FF"
        strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: [0, 1, 1, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.path
        d="M520 250 h40 v40 h-40 z"
        stroke="#7CB4FF"
        strokeWidth="1.5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: [0, 1, 1, 0] }}
        transition={{ duration: 6, repeat: Infinity, delay: 2, ease: "easeInOut" }}
      />
    </svg>
  );
}
/* ------------------------------------------------------------------ */
/* Mid layer: the laser cutting head                                   */
/* ------------------------------------------------------------------ */
export function LaserNozzle({ className = "" }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 600 520" className={className} aria-hidden>
      <defs>
        <linearGradient id={`${id}m`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#566070" />
          <stop offset=".25" stopColor="#d9dfe8" />
          <stop offset=".5" stopColor="#ffffff" />
          <stop offset=".75" stopColor="#aab3c0" />
          <stop offset="1" stopColor="#434c5a" />
        </linearGradient>
        <linearGradient id={`${id}d`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#262d38" />
          <stop offset=".5" stopColor="#8995a5" />
          <stop offset="1" stopColor="#262d38" />
        </linearGradient>
        <linearGradient id={`${id}c`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#6f3410" />
          <stop offset=".35" stopColor="#f0a25a" />
          <stop offset=".55" stopColor="#ffd9a8" />
          <stop offset="1" stopColor="#6b300e" />
        </linearGradient>
        <radialGradient id={`${id}g`} cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset=".25" stopColor="#ffd27a" />
          <stop offset="1" stopColor="#ff9628" stopOpacity="0" />
        </radialGradient>
      </defs>

      <path d="M232 -20 H368 V104 Q368 112 360 112 H240 Q232 112 232 104 Z" fill={`url(#${id}m)`} />
      <rect x="246" y="26" width="108" height="5" rx="2" fill="#1d232c" opacity=".3" />
      <rect x="246" y="52" width="108" height="5" rx="2" fill="#1d232c" opacity=".3" />
      <motion.rect
        x="262"
        y="82"
        width="76"
        height="4"
        rx="2"
        fill="#56a6ff"
        animate={{ opacity: [0.45, 1, 0.45] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <rect x="222" y="108" width="156" height="26" rx="8" fill={`url(#${id}d)`} />
      <rect x="228" y="112" width="144" height="4" rx="2" fill="#fff" opacity=".25" />
      <path d="M252 134 L348 134 L326 244 L274 244 Z" fill={`url(#${id}m)`} />
      <path
        d="M262 150 H338 M268 180 H332 M272 210 H328"
        stroke="#1d232c"
        strokeOpacity=".22"
        strokeWidth="2"
      />
      <rect x="268" y="240" width="64" height="14" rx="4" fill={`url(#${id}d)`} />
      <path d="M276 254 L324 254 L309 296 L291 296 Z" fill={`url(#${id}c)`} />
      <ellipse cx="300" cy="297" rx="9" ry="3" fill="#fff6d8" />

      <motion.circle
        cx="300"
        cy="338"
        r="70"
        fill={`url(#${id}g)`}
        animate={{ scale: [0.85, 1.12, 0.85], opacity: [0.75, 1, 0.75] }}
        style={{ transformOrigin: "300px 338px" }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
      />
      <line x1="300" y1="298" x2="300" y2="338" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
/* ------------------------------------------------------------------ */
/* Front layer: flying sparks                                          */
/* ------------------------------------------------------------------ */
const N = 40;
const sparks = Array.from({ length: N }, (_, i) => {
  const a = ((-172 + 164 * (i / (N - 1)) + (rnd(i, 1) - 0.5) * 10) * Math.PI) / 180;
  const len = 35 + rnd(i, 2) * 125;
  return {
    x: r1(300 + Math.cos(a) * len),
    y: r1(338 + Math.sin(a) * len * 0.85),
    d: r1(rnd(i, 3) * 2),
    t: r1(0.9 + rnd(i, 4) * 1.2),
    w: r1(1 + rnd(i, 5) * 1.6),
  };
});
const particles = Array.from({ length: 18 }, (_, i) => {
  const a = ((-175 + 170 * rnd(i, 7)) * Math.PI) / 180;
  const len = 70 + rnd(i, 8) * 170;
  return {
    x: r1(300 + Math.cos(a) * len),
    y: r1(338 + Math.sin(a) * len * 0.8),
    d: r1(rnd(i, 9) * 2.4),
    t: r1(1.2 + rnd(i, 10) * 1.4),
  };
});
export function LaserSparks({ className = "" }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 600 520" className={className} aria-hidden>
      <defs>
        <linearGradient id={`${id}s`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff7d6" />
          <stop offset=".5" stopColor="#ffb13b" />
          <stop offset="1" stopColor="#ff6a1a" />
        </linearGradient>
      </defs>
      {sparks.map((s, i) => (
        <motion.line
          key={i}
          x1="300"
          y1="338"
          x2={s.x}
          y2={s.y}
          stroke="#ffb13b"
          strokeWidth={s.w}
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 0] }}
          transition={{ duration: s.t, repeat: Infinity, delay: s.d, ease: "easeOut" }}
        />
      ))}
      {particles.map((p, i) => (
        <motion.circle
          key={i}
          cx="300"
          cy="338"
          r="2.6"
          fill="#ffd27a"
          animate={{ cx: [300, p.x], cy: [338, p.y], opacity: [1, 0], r: [2.8, 0.4] }}
          transition={{ duration: p.t, repeat: Infinity, delay: p.d, ease: "easeOut" }}
        />
      ))}
      <circle cx="300" cy="338" r="7" fill="#fff" />
      <circle cx="300" cy="338" r="14" fill="#fff" opacity=".35" />
    </svg>
  );
}
/* Composite used where parallax isn't needed (About, CTA, etc.) */
export default function LaserHeadStatic({ className = "" }) {
  return (
    <div className={`relative ${className}`}>
      <LaserRings className="absolute inset-0 h-full w-full" />
      <LaserNozzle className="absolute inset-0 h-full w-full" />
      <LaserSparks className="absolute inset-0 h-full w-full" />
    </div>
  );
}
