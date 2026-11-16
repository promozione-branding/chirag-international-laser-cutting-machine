"use client";
import { useEffect, useId, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Factory, Handshake, Rocket, Settings } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import Magnetic from "./ui/Magnetic";

const EASE = [0.16, 1, 0.3, 1];
const FALLBACK_IMG = "/story_.png";

/* give each milestone its own photo; missing files fall back to /story_.png */
const timeline = [
  {
    year: "2015",
    title: "The Beginning",
    text: "Started with a vision to bring advanced cutting technology to India.",
    icon: Rocket,
    image: "/story_2015.png",
  },
  {
    year: "2018",
    title: "Growth",
    text: "Expanded manufacturing and product range.",
    icon: Factory,
    image: "/story_2018.png",
  },
  {
    year: "2021",
    title: "Milestone of Trust",
    text: "Crossed 500+ machine installations.",
    icon: Settings,
    image: "/story_2021.png",
  },
  {
    year: "2026",
    title: "A Global Partner",
    text: "A trusted partner for industries across 25+ countries.",
    icon: Handshake,
    image: "/story_2026.png",
  },
];

/* ───────────────────────── card ───────────────────────── */

function TimelineCard({ t, from }) {
  const ref = useRef(null);
  const Icon = t.icon;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [-18, 18]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: from === "left" ? -140 : 140, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1, ease: EASE }}
      className="relative"
    >
      {/* slanted shell (skew only from lg up) */}
      <div className="relative flex min-h-[170px] overflow-hidden rounded-[26px] bg-white/80 shadow-[0_24px_50px_-26px_rgba(37,99,235,0.5)] ring-1 ring-white backdrop-blur lg:min-h-[210px] lg:-skew-x-[12deg] lg:rounded-[38px] xl:min-h-[240px]">
        {/* content, counter-skewed back to upright */}
        <div className="relative z-10 flex flex-1 items-center gap-4 px-5 py-6 lg:skew-x-[12deg] lg:gap-5 lg:pl-14 lg:pr-6 xl:gap-6">
          <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-[#e6efff] text-ink xl:h-[68px] xl:w-[68px]">
            <Icon size={30} strokeWidth={1.5} />
          </div>
          <span className="hidden h-[72px] w-px shrink-0 bg-ink/70 sm:block" />
          <div className="min-w-0">
            <div className="text-[30px] font-extrabold leading-none text-brand lg:text-[38px] xl:text-[46px]">
              {t.year}
            </div>
            <div className="mt-1.5 text-[18px] font-extrabold leading-tight text-ink lg:text-[22px] xl:text-[26px]">
              {t.title}
            </div>
            <span className="mt-3 block h-[2px] w-10 bg-brand" />
            <p className="mt-3 text-[13px] leading-snug text-ink/70 lg:text-[14px] xl:text-[16px]">{t.text}</p>
          </div>
        </div>

        {/* photo: sheared by the shell's skew, so its left edge slants like the card */}
        <div aria-hidden className="relative w-[34%] shrink-0 overflow-hidden lg:w-[42%]">
          <motion.img
            src={t.image}
            alt=""
            draggable={false}
            onError={(e) => {
              if (!e.currentTarget.dataset.fb) {
                e.currentTarget.dataset.fb = "1";
                e.currentTarget.src = FALLBACK_IMG;
              }
            }}
            style={{ y: imgY, scale: 1.15 }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>
    </motion.div>
  );
}

/* ───────────────────── path / spark helpers ───────────────────── */

const TAU = Math.PI * 2;

/* metal cooling ramp: white-hot → yellow → orange → deep red */
const HEAT_STOPS = [
  [0, [110, 30, 30]],
  [0.15, [200, 50, 20]],
  [0.4, [255, 130, 40]],
  [0.7, [255, 210, 120]],
  [1, [255, 250, 235]],
];
function heatRGB(h) {
  const x = Math.min(1, Math.max(0, h));
  for (let i = 1; i < HEAT_STOPS.length; i++) {
    if (x <= HEAT_STOPS[i][0]) {
      const [h0, c0] = HEAT_STOPS[i - 1];
      const [h1, c1] = HEAT_STOPS[i];
      const f = (x - h0) / (h1 - h0);
      return c0.map((v, k) => Math.round(v + (c1[k] - v) * f)).join(",");
    }
  }
  return "255,250,235";
}

/* S-curve through the nodes. Cards 1 & 3 (right side) get a node on their left,
   cards 2 & 4 (left side) a node on their right; the line ends at the bottom of the section. */
function buildGeom(sec, cards) {
  const sr = sec.getBoundingClientRect();
  const w = sec.offsetWidth;
  const h = sec.offsetHeight;
  const pts = cards.map((el, i) => {
    const r = el.getBoundingClientRect();
    const onRight = i % 2 === 0;
    return {
      x: onRight ? r.left - sr.left - 52 : r.right - sr.left + 52,
      y: r.top - sr.top + r.height * 0.52,
    };
  });
  const nodes = pts.slice();
  pts.push({ x: w * 0.47, y: h });

  const f = (n) => n.toFixed(1);
  let d = `M${f(pts[0].x)} ${f(pts[0].y)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const a = pts[i];
    const b = pts[i + 1];
    const dy = b.y - a.y;
    const s = Math.sign(b.x - a.x) || 1;
    const over = i === pts.length - 2 ? 0 : 36;
    d += ` C${f(a.x - s * 36)} ${f(a.y + dy * 0.7)} ${f(b.x + s * over)} ${f(b.y - dy * 0.7)} ${f(b.x)} ${f(b.y)}`;
  }
  return { w, h, d, nodes };
}

function buildTable(path, nodes) {
  const L = path.getTotalLength();
  const step = 3;
  const n = Math.ceil(L / step);
  const xs = [];
  const ys = [];
  for (let i = 0; i <= n; i++) {
    const p = path.getPointAtLength(Math.min(L, i * step));
    xs.push(p.x);
    ys.push(p.y);
  }
  const nodeD = nodes.map((nd) => {
    let best = 0;
    let bd = Infinity;
    for (let i = 0; i <= n; i++) {
      const dd = (xs[i] - nd.x) ** 2 + (ys[i] - nd.y) ** 2;
      if (dd < bd) {
        bd = dd;
        best = i;
      }
    }
    return best * step;
  });
  return { L, step, n, xs, ys, nodeD };
}

function pointAt(T, d) {
  const i = Math.min(T.n, Math.max(0, d / T.step));
  const i0 = Math.floor(i);
  const i1 = Math.min(T.n, i0 + 1);
  const f = i - i0;
  return [T.xs[i0] + (T.xs[i1] - T.xs[i0]) * f, T.ys[i0] + (T.ys[i1] - T.ys[i0]) * f];
}

/* path length at which the line reaches a given y (the line only ever runs downwards) */
function distForY(T, y) {
  if (y <= T.ys[0]) return 0;
  if (y >= T.ys[T.n]) return T.L;
  let lo = 0;
  let hi = T.n;
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1;
    if (T.ys[mid] < y) lo = mid;
    else hi = mid;
  }
  const f = (y - T.ys[lo]) / (T.ys[hi] - T.ys[lo] || 1);
  return Math.min(T.L, (lo + f) * T.step);
}

/* molten sparks thrown off the cut point: a fan opposite to the direction of travel,
   a few flying forward, a few splattering anywhere. Speeds are skewed so most are
   slow and a handful are very fast. */
function cutSparks(T, parts, d, dir, n) {
  if (parts.length > 700) return;
  const [x, y] = pointAt(T, d);
  const [x1, y1] = pointAt(T, Math.max(0, d - 4));
  const [x2, y2] = pointAt(T, Math.min(T.L, d + 4));
  const travel = Math.atan2(y2 - y1, x2 - x1) + (dir < 0 ? Math.PI : 0);
  for (let k = 0; k < n; k++) {
    const r = Math.random();
    let ang;
    if (r < 0.7) ang = travel + Math.PI + (Math.random() - 0.5) * 1.1;
    else if (r < 0.9) ang = travel + (Math.random() - 0.5) * 1.4;
    else ang = Math.random() * TAU;
    const sp = 2 + Math.pow(Math.random(), 2) * 9;
    const life = 22 + Math.random() * 44;
    parts.push({
      x,
      y,
      vx: Math.cos(ang) * sp,
      vy: Math.sin(ang) * sp - Math.random() * 1.2,
      life,
      max: life,
      w: 0.9 + Math.random() * 1.5,
      h0: 1,
      split: false,
      ember: false,
    });
  }
}

/* small glowing embers left on the freshly cut line, slowly cooling */
function embers(T, parts, d) {
  if (parts.length > 700) return;
  const [x, y] = pointAt(T, d);
  const life = 50 + Math.random() * 60;
  parts.push({
    x: x + (Math.random() - 0.5) * 4,
    y: y + (Math.random() - 0.5) * 4,
    vx: (Math.random() - 0.5) * 0.5,
    vy: -Math.random() * 0.3,
    life,
    max: life,
    w: 1 + Math.random() * 1.2,
    h0: 0.8,
    split: true,
    ember: true,
  });
}

function burst(parts, x, y) {
  for (let k = 0; k < 40; k++) {
    const ang = Math.random() * TAU;
    const sp = 1.5 + Math.pow(Math.random(), 2) * 8;
    const life = 22 + Math.random() * 40;
    parts.push({
      x,
      y,
      vx: Math.cos(ang) * sp,
      vy: Math.sin(ang) * sp - 0.6,
      life,
      max: life,
      w: 0.9 + Math.random() * 1.5,
      h0: 1,
      split: false,
      ember: false,
    });
  }
}

/* ───────────────────────── section ───────────────────────── */

export default function Story() {
  const uid = useId().replace(/:/g, "");
  const secRef = useRef(null);
  const cardRefs = useRef([]);
  const baseRef = useRef(null);
  const maskRef = useRef(null);
  const canvasRef = useRef(null);
  const geomRef = useRef(null);
  const tblRef = useRef(null);
  const st = useRef({ dist: 0, lastMask: -1, parts: [], dirty: true, flare: 0 });
  const [geom, setGeom] = useState(null);

  const setCardRef = (i) => (el) => {
    cardRefs.current[i] = el;
  };

  /* 1. measure the cards and build the connector path (desktop only) */
  useEffect(() => {
    const sec = secRef.current;
    let raf = 0;
    const run = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (window.innerWidth < 1024 || cardRefs.current.some((el) => !el)) {
          setGeom(null);
          return;
        }
        const g = buildGeom(sec, cardRefs.current);
        setGeom((prev) => (prev && prev.d === g.d && prev.w === g.w && prev.h === g.h ? prev : g));
      });
    };
    run();
    const ro = new ResizeObserver(run);
    ro.observe(sec);
    cardRefs.current.forEach((el) => el && ro.observe(el));
    window.addEventListener("resize", run);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", run);
    };
  }, []);

  /* 2. sample the path so the dot can be placed by scroll position, and size the canvas */
  useEffect(() => {
    const path = baseRef.current;
    const canvas = canvasRef.current;
    if (!geom || !path || !canvas) {
      geomRef.current = null;
      tblRef.current = null;
      return;
    }
    tblRef.current = buildTable(path, geom.nodes);
    geomRef.current = geom;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(geom.w * dpr);
    canvas.height = Math.round(geom.h * dpr);
    canvas.style.width = `${geom.w}px`;
    canvas.style.height = `${geom.h}px`;
    canvas.getContext("2d").setTransform(dpr, 0, 0, dpr, 0, 0);
    st.current.lastMask = -1;
    st.current.dirty = true;
  }, [geom]);

  /* 3. animation loop: dot follows scroll, sparks fly off the line it has passed */
  useEffect(() => {
    const sec = secRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let last = performance.now();

    const tick = (now) => {
      raf = requestAnimationFrame(tick);
      const T = tblRef.current;
      const g = geomRef.current;
      if (!T || !g) return;
      const S = st.current;
      const dt = Math.min(2.5, (now - last) / 16.67);
      last = now;

      /* the dot sits on the line at the height of the middle of the screen */
      const refY = window.innerHeight * 0.5 - sec.getBoundingClientRect().top;
      const target = distForY(T, refY);
      const prev = S.dist;
      S.dist += (target - S.dist) * Math.min(1, 0.18 * dt);
      if (Math.abs(target - S.dist) < 0.2) S.dist = target;
      const moved = Math.abs(S.dist - prev);

      /* bright "cut" line is revealed up to the dot */
      if (Math.abs(S.dist - S.lastMask) > 0.4) {
        S.lastMask = S.dist;
        maskRef.current?.setAttribute("stroke-dasharray", `${S.dist} ${T.L + 50}`);
      }

      if (!reduce) {
        if (moved > 0.05) {
          const n = Math.min(28, 4 + moved * 2);
          const c = Math.floor(n) + (Math.random() < n % 1 ? 1 : 0);
          cutSparks(T, S.parts, S.dist, S.dist >= prev ? 1 : -1, c);
          if (Math.random() < 0.6) {
            embers(T, S.parts, Math.max(0, S.dist - 8 - Math.random() * Math.min(140, S.dist)));
          }
          S.flare = 1;
        } else {
          S.flare *= 0.86;
        }
        /* burst when the dot passes a node */
        T.nodeD.forEach((nd, i) => {
          if ((prev < nd && S.dist >= nd) || (prev > nd && S.dist <= nd)) {
            burst(S.parts, g.nodes[i].x, g.nodes[i].y);
          }
        });
      }

      for (let i = S.parts.length - 1; i >= 0; i--) {
        const p = S.parts[i];
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        if (p.ember) {
          const dr = Math.pow(0.9, dt);
          p.vx *= dr;
          p.vy = p.vy * dr - 0.004 * dt;
        } else {
          p.vy += 0.12 * dt;
          const dr = Math.pow(0.975, dt);
          p.vx *= dr;
          p.vy *= dr;
          /* hot sparks sometimes pop into smaller ones, like real cutting sparks */
          if (!p.split && p.w > 1.2 && p.life < p.max * 0.6 && Math.random() < 0.02 * dt) {
            p.split = true;
            for (let k = 0; k < 3; k++) {
              const a = Math.random() * TAU;
              const sp = 1 + Math.random() * 3.2;
              const life = 12 + Math.random() * 14;
              S.parts.push({
                x: p.x,
                y: p.y,
                vx: p.vx * 0.4 + Math.cos(a) * sp,
                vy: p.vy * 0.4 + Math.sin(a) * sp,
                life,
                max: life,
                w: 0.8,
                h0: 0.7,
                split: true,
                ember: false,
              });
            }
          }
        }
        p.life -= dt;
        if (p.life <= 0) S.parts.splice(i, 1);
      }

      if (!(S.parts.length > 0 || moved > 0 || S.dirty || S.flare > 0.02)) return;
      S.dirty = false;

      ctx.clearRect(0, 0, g.w, g.h);

      /* nodes: pale until the laser reaches them */
      g.nodes.forEach((nd, i) => {
        const lit = S.dist >= T.nodeD[i] - 1;
        const halo = ctx.createRadialGradient(nd.x, nd.y, 0, nd.x, nd.y, 24);
        halo.addColorStop(0, lit ? "rgba(37,120,255,.5)" : "rgba(120,170,255,.25)");
        halo.addColorStop(1, "rgba(37,120,255,0)");
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(nd.x, nd.y, 24, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = lit ? "#1a66ff" : "#8db6ff";
        ctx.beginPath();
        ctx.arc(nd.x, nd.y, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(nd.x, nd.y, 4, 0, Math.PI * 2);
        ctx.fill();
      });

      /* molten kerf: white-hot at the beam, cooling to orange → red behind it */
      ctx.globalCompositeOperation = "lighter";
      ctx.lineCap = "round";
      const tl = Math.min(170, S.dist);
      if (tl > 1) {
        const segs = 28;
        let a = pointAt(T, S.dist - tl);
        for (let k = 1; k <= segs; k++) {
          const b = pointAt(T, S.dist - tl + (tl * k) / segs);
          const heat = Math.pow(k / segs, 1.6);
          const rgb = heatRGB(heat);
          ctx.strokeStyle = `rgba(${rgb},${0.08 + 0.35 * heat})`;
          ctx.lineWidth = 3 + 9 * heat;
          ctx.beginPath();
          ctx.moveTo(a[0], a[1]);
          ctx.lineTo(b[0], b[1]);
          ctx.stroke();
          ctx.strokeStyle = `rgba(${rgb},${0.15 + 0.8 * heat})`;
          ctx.lineWidth = 1 + 2.4 * heat;
          ctx.beginPath();
          ctx.moveTo(a[0], a[1]);
          ctx.lineTo(b[0], b[1]);
          ctx.stroke();
          a = b;
        }
      }

      /* sparks and embers, coloured by how hot they still are */
      for (const p of S.parts) {
        const heat = Math.max(0, (p.life / p.max) * p.h0);
        const al = Math.min(1, (p.life / p.max) * 1.8);
        const rgb = heatRGB(heat);
        if (p.ember) {
          const fl = 0.6 + Math.random() * 0.4;
          ctx.fillStyle = `rgba(${rgb},${al * 0.2 * fl})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.w * 3.2, 0, TAU);
          ctx.fill();
          ctx.fillStyle = `rgba(${rgb},${al * 0.9 * fl})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.w * (0.7 + heat * 0.6), 0, TAU);
          ctx.fill();
          continue;
        }
        const sp = Math.hypot(p.vx, p.vy);
        const k = 2 + Math.min(3.5, sp * 0.35);
        ctx.strokeStyle = `rgba(${rgb},${al * 0.3})`;
        ctx.lineWidth = p.w * 1.6;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x - p.vx * k * 1.8, p.y - p.vy * k * 1.8);
        ctx.stroke();
        ctx.strokeStyle = `rgba(${rgb},${al})`;
        ctx.lineWidth = p.w * (0.6 + heat * 0.5);
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x - p.vx * k, p.y - p.vy * k);
        ctx.stroke();
        if (heat > 0.5) {
          ctx.fillStyle = `rgba(255,255,255,${al * 0.9})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.w * 0.6, 0, TAU);
          ctx.fill();
        }
      }
      ctx.globalCompositeOperation = "source-over";

      /* the moving dot, with a white-hot flash while it is cutting */
      const [dx, dy] = pointAt(T, S.dist);
      const glow = ctx.createRadialGradient(dx, dy, 0, dx, dy, 40);
      glow.addColorStop(0, "rgba(37,120,255,.55)");
      glow.addColorStop(1, "rgba(37,120,255,0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(dx, dy, 40, 0, TAU);
      ctx.fill();
      ctx.fillStyle = "#1a66ff";
      ctx.beginPath();
      ctx.arc(dx, dy, 11, 0, TAU);
      ctx.fill();
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(dx, dy, 4.6, 0, TAU);
      ctx.fill();

      const fl = S.flare * (0.75 + Math.random() * 0.25);
      if (fl > 0.02) {
        ctx.globalCompositeOperation = "lighter";
        const bloom = ctx.createRadialGradient(dx, dy, 0, dx, dy, 46);
        bloom.addColorStop(0, `rgba(255,236,190,${0.85 * fl})`);
        bloom.addColorStop(0.25, `rgba(255,160,60,${0.5 * fl})`);
        bloom.addColorStop(1, "rgba(255,100,20,0)");
        ctx.fillStyle = bloom;
        ctx.beginPath();
        ctx.arc(dx, dy, 46, 0, TAU);
        ctx.fill();
        const arm = 22 + Math.random() * 16;
        ctx.strokeStyle = `rgba(255,240,210,${0.55 * fl})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(dx - arm, dy);
        ctx.lineTo(dx + arm, dy);
        ctx.moveTo(dx, dy - arm * 0.7);
        ctx.lineTo(dx, dy + arm * 0.7);
        ctx.stroke();
        ctx.fillStyle = `rgba(255,255,255,${0.9 * fl})`;
        ctx.beginPath();
        ctx.arc(dx, dy, 4, 0, TAU);
        ctx.fill();
        ctx.globalCompositeOperation = "source-over";
      }
    };

    /* only run while the section is on screen */
    const io = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(raf);
      raf = 0;
      if (entry.isIntersecting) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    });
    io.observe(sec);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  const [first, ...rest] = timeline;

  return (
    <section ref={secRef} id="story" className="relative overflow-x-clip py-16 lg:py-24">
      <style>{`
        @keyframes storyShimmer { to { stroke-dashoffset: -200; } }
        .story-shimmer { animation: storyShimmer 3.2s linear infinite; }
        @media (prefers-reduced-motion: reduce) { .story-shimmer { animation: none; } }
      `}</style>

      {/* dotted connector + laser dot + sparks (desktop only), behind the cards */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 hidden lg:block">
        {geom && (
          <svg
            width={geom.w}
            height={geom.h}
            viewBox={`0 0 ${geom.w} ${geom.h}`}
            className="absolute left-0 top-0"
          >
            <defs>
              <mask id={`${uid}m`} maskUnits="userSpaceOnUse" x="0" y="0" width={geom.w} height={geom.h}>
                <path
                  ref={maskRef}
                  d={geom.d}
                  fill="none"
                  stroke="#fff"
                  strokeWidth="30"
                  strokeDasharray="0 99999"
                />
              </mask>
            </defs>

            {/* the line ahead of the laser */}
            <path
              ref={baseRef}
              d={geom.d}
              fill="none"
              stroke="#8db6ff"
              strokeOpacity=".75"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeDasharray="5 8"
            />

            {/* the line behind the laser: brighter, with a soft glow */}
            <g mask={`url(#${uid}m)`}>
              <path
                d={geom.d}
                fill="none"
                stroke="#2f7bff"
                strokeOpacity=".28"
                strokeWidth="9"
                strokeLinecap="round"
                strokeDasharray="5 8"
              />
              <path
                d={geom.d}
                fill="none"
                stroke="#1a66ff"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="5 8"
              />
            </g>

            {/* shine travelling along the whole line */}
            <path
              d={geom.d}
              fill="none"
              stroke="#fff"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeDasharray="10 190"
              className="story-shimmer"
            />
          </svg>
        )}
        <canvas ref={canvasRef} className="absolute left-0 top-0" />
      </div>

      <div className="container-x relative z-10">
        {/* first screen: text on the left, 2015 card on the right */}
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_60%]">
          <div>
            <SectionHeading label="Our story" size="md">
              A Journey of
              <br />
              Innovation &amp; Trust
            </SectionHeading>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              className="mt-4 max-w-[400px] text-[15px] leading-relaxed text-ink/70"
            >
              From a small setup to a trusted name in laser cutting technology, our journey is driven by
              innovation, quality, and customer success.
            </motion.p>
            <Magnetic className="mt-6">
              <a href="#story" className="btn-outline !px-5 !py-2 !text-[13px] !font-bold !text-brand">
                Read Our Story <ArrowRight size={14} />
              </a>
            </Magnetic>
          </div>

          <div ref={setCardRef(0)} className="lg:mt-24">
            <TimelineCard t={first} from="right" />
          </div>
        </div>

        {/* the rest, with gaps between them: left, right, left */}
        <div className="mt-12 flex flex-col gap-12 lg:mt-32 lg:gap-32">
          {rest.map((t, i) => {
            const onLeft = i % 2 === 0; // 2018 → left, 2021 → right, 2026 → left
            return (
              <div
                key={t.year}
                ref={setCardRef(i + 1)}
                className={`w-full lg:w-[60%] ${onLeft ? "lg:mr-auto" : "lg:ml-auto"}`}
              >
                <TimelineCard t={t} from={onLeft ? "left" : "right"} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}