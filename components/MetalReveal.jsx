"use client";
import { useEffect, useId, useRef, useState } from "react";
import {
  animate,
  cubicBezier,
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ChevronDown, ChevronsLeft, ChevronsRight } from "lucide-react";

/* ─────────────────────────── helpers ─────────────────────────── */

const TAU = Math.PI * 2;
const clamp01 = (v) => Math.min(1, Math.max(0, v));

/* where the logo is traced: left → right, with the head sweeping up and down */
const CARVE_CYCLES = 9;
const headY = (v) => 0.5 + 0.34 * Math.sin(Math.min(1, v) * Math.PI * 2 * CARVE_CYCLES);

/* metal cooling ramp: white-hot → yellow → orange → deep red */
const HEAT_STOPS = [
  [0, [110, 30, 30]],
  [0.15, [200, 50, 20]],
  [0.4, [255, 130, 40]],
  [0.7, [255, 210, 120]],
  [1, [255, 250, 235]],
];
function heatRGB(h) {
  const x = clamp01(h);
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

/* brushed steel: fine horizontal grain + soft vertical light streaks + noise */
const SHEET_BG = [
  "repeating-linear-gradient(0deg, rgba(255,255,255,.04) 0 1px, rgba(0,0,0,.05) 1px 3px)",
  "linear-gradient(98deg, transparent 4%, rgba(255,255,255,.16) 14%, transparent 26%, rgba(255,255,255,.1) 40%, transparent 52%, rgba(255,255,255,.2) 68%, transparent 82%, rgba(255,255,255,.1) 94%)",
  "linear-gradient(180deg, #59636f 0%, #2b323b 50%, #3d4651 100%)",
].join(",");

const NOISE = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9 0.012' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.55 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`;

/* the carved look: a dark cut-out with a light lower lip, and the same cut-out glowing hot */
const ENGRAVED_FILTER =
  "brightness(0) drop-shadow(0 1px 0 rgba(255,255,255,.3)) drop-shadow(0 0 3px rgba(255,150,70,.25))";
const HOT_FILTER =
  "brightness(0) drop-shadow(0 0 2px #ffb468) drop-shadow(0 0 10px rgba(255,130,40,.9)) drop-shadow(0 0 28px rgba(255,100,20,.6))";

/* ─────────────────────────── logo ─────────────────────────── */

/* front-facing dots of a sphere, used by the built-in fallback logo */
const GLOBE_DOTS = (() => {
  const R = 92;
  const dots = [];
  for (let lat = -75; lat <= 75; lat += 18) {
    const la = (lat * Math.PI) / 180;
    const n = Math.max(3, Math.round(13 * Math.cos(la)));
    for (let k = 0; k < n; k++) {
      const lo = -Math.PI / 2 + ((k + 0.5) / n) * Math.PI;
      const z = Math.cos(la) * Math.cos(lo);
      dots.push({
        x: R * Math.cos(la) * Math.sin(lo),
        y: R * Math.sin(la),
        r: 3 + 8 * Math.pow(z, 0.8),
      });
    }
  }
  return dots;
})();

/* shown only if the logo image can't be loaded */
function FallbackLogo({ style }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 580 200" className="h-full w-full" style={style}>
      <defs>
        <mask id={`${id}h`}>
          <rect width="200" height="200" fill="#fff" />
          {GLOBE_DOTS.map((d, i) => (
            <circle key={i} cx={100 + d.x} cy={100 + d.y} r={d.r} fill="#000" />
          ))}
        </mask>
      </defs>
      <circle cx="100" cy="100" r="92" mask={`url(#${id}h)`} />
      <text
        x="215"
        y="108"
        fontSize="118"
        fontStyle="italic"
        fontWeight="700"
        fontFamily="'Brush Script MT','Segoe Script','Snell Roundhand',cursive"
      >
        Ci Laser
      </text>
      <text x="216" y="172" fontSize="30" fontWeight="800" letterSpacing="1" fontFamily="system-ui, sans-serif">
        CHIRAG INTERNATIONAL
      </text>
    </svg>
  );
}

function LogoArt({ src, fallback, hot }) {
  const style = { filter: hot ? HOT_FILTER : ENGRAVED_FILTER };
  if (fallback) return <FallbackLogo style={style} />;
  return <img src={src} alt="" draggable={false} className="h-full w-full object-contain" style={style} />;
}

/* ─────────────────────────── one half of the sheet ─────────────────────────── */

function SheetFace({ logo }) {
  return (
    <>
      <div className="absolute inset-0" style={{ background: SHEET_BG }} />
      <div
        className="absolute inset-0 opacity-30 mix-blend-overlay"
        style={{ backgroundImage: NOISE, backgroundSize: "400px 400px" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.45)_100%)]" />

      {/* logo: engraved as the laser passes, hot glow only on the freshly cut part */}
      <div className="absolute left-1/2 top-1/2 aspect-[2.9/1] w-[min(86vw,980px)] -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="absolute inset-0"
          style={{ WebkitMaskImage: logo.engraveMask, maskImage: logo.engraveMask }}
        >
          <LogoArt src={logo.src} fallback={logo.fallback} />
        </motion.div>
        <motion.div
          className="absolute inset-0"
          style={{ WebkitMaskImage: logo.glowMask, maskImage: logo.glowMask }}
        >
          <LogoArt src={logo.src} fallback={logo.fallback} hot />
        </motion.div>
      </div>
    </>
  );
}

function Door({ side, x, seam, logo }) {
  const left = side === "left";
  return (
    <motion.div style={{ x }} className={`absolute inset-y-0 z-10 w-1/2 ${left ? "left-0" : "right-0"}`}>
      <div className="absolute inset-0 overflow-hidden">
        {/* the face is as wide as the whole stage, so the two halves line up into one sheet */}
        <div className={`absolute inset-y-0 w-[200%] ${left ? "left-0" : "right-0"}`}>
          <SheetFace logo={logo} />
        </div>
      </div>
      {/* glowing blue edge, drawn as the laser cuts down the middle */}
      <motion.span
        style={{ scaleY: seam }}
        className={`absolute top-0 h-full w-[3px] origin-top bg-sky-300 shadow-[0_0_14px_4px_rgba(60,150,255,0.9),0_0_50px_12px_rgba(40,110,255,0.5)] ${
          left ? "right-0" : "left-0"
        }`}
      />
    </motion.div>
  );
}

/* ─────────────────────────── main component ─────────────────────────── */

export default function MetalReveal({
  logoSrc = "/logo.png", // transparent PNG of the logo
  videoSrc = "/Laser_cutting_machine_cutting_metal_e77af3e2.mp4",
  poster = "/why_.png",
}) {
  const secRef = useRef(null);
  const stageRef = useRef(null);
  const frameRef = useRef(null);
  const canvasRef = useRef(null);
  const [fallback, setFallback] = useState(false);

  /* use the built-in logo if the image file is missing */
  useEffect(() => {
    const img = new Image();
    img.onerror = () => setFallback(true);
    img.src = logoSrc;
  }, [logoSrc]);

  /* ── scroll: 0 → 1 across the pinned scroll distance ── */
  const { scrollYProgress } = useScroll({ target: secRef, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 100, damping: 30, mass: 0.4 });

  const seam = useTransform(p, [0.02, 0.2], [0, 1]); // laser cuts down the middle
  const seamLineOpacity = useTransform(p, [0.2, 0.26], [1, 0]);

  const ease = cubicBezier(0.65, 0, 0.35, 1);
  const leftX = useTransform(p, [0.2, 0.7], ["0%", "-102%"], { ease });
  const rightX = useTransform(p, [0.2, 0.7], ["0%", "102%"], { ease });

  const videoScale = useTransform(p, [0.2, 0.75], [1.15, 1]);
  const videoBright = useTransform(p, [0.2, 0.7], [0.55, 1]);
  const videoFilter = useTransform(videoBright, (v) => `brightness(${v})`);

  const arrowOpacity = useTransform(p, [0.12, 0.2, 0.38, 0.5], [0, 1, 1, 0]);
  const arrowShift = useTransform(p, [0.12, 0.5], [0, 60]);
  const arrowShiftNeg = useTransform(arrowShift, (v) => -v);
  const hintOpacity = useTransform(p, [0, 0.04], [1, 0]);

  /* ── carving: plays by itself once the section is on screen ── */
  const c = useMotionValue(0); // 0 → 1 traces the logo, 1 → 1.22 lets the glow cool
  const inView = useInView(stageRef, { once: true, amount: 0.5 });
  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      c.set(1.22);
      return;
    }
    const ctrl = animate(c, 1.22, { duration: 5.4, ease: "linear", delay: 0.5 });
    return () => ctrl.stop();
  }, [inView, c]);

  const engraveMask = useTransform(c, (v) => {
    const r = Math.min(1, v) * 100;
    return `linear-gradient(to right, #000 ${r}%, transparent ${r}%)`;
  });
  const glowMask = useTransform(c, (v) => {
    const r = Math.min(1, v) * 100;
    const l = Math.max(0, v - 0.22) * 100;
    return `linear-gradient(to right, transparent ${l}%, #000 ${Math.min(r, l + 10)}%, #000 ${r}%, transparent ${r}%)`;
  });

  const logo = { engraveMask, glowMask, src: logoSrc, fallback };

  /* ── sparks: from the carving head and from the laser cutting the seam ── */
  useEffect(() => {
    const stage = stageRef.current;
    const frame = frameRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const S = { parts: [], w: 0, h: 0, prev: null, prevSeam: 0, flares: [0, 0], fx: [null, null] };
    let raf = 0;
    let last = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      S.w = stage.clientWidth;
      S.h = stage.clientHeight;
      canvas.width = Math.round(S.w * dpr);
      canvas.height = Math.round(S.h * dpr);
      canvas.style.width = `${S.w}px`;
      canvas.style.height = `${S.h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(stage);

    /* sparks thrown off the cut: a fan opposite to the travel direction, a few forward, a few anywhere */
    const emit = (x, y, travel, n) => {
      if (S.parts.length > 700) return;
      for (let k = 0; k < n; k++) {
        const r = Math.random();
        let ang;
        if (r < 0.7) ang = travel + Math.PI + (Math.random() - 0.5) * 1.1;
        else if (r < 0.9) ang = travel + (Math.random() - 0.5) * 1.4;
        else ang = Math.random() * TAU;
        const sp = 2 + Math.pow(Math.random(), 2) * 9;
        const life = 22 + Math.random() * 44;
        S.parts.push({
          x,
          y,
          vx: Math.cos(ang) * sp,
          vy: Math.sin(ang) * sp - Math.random() * 1.2,
          life,
          max: life,
          w: 0.9 + Math.random() * 1.5,
          h0: 1,
          split: false,
        });
      }
    };

    const tick = (now) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min(2.5, (now - last) / 16.67);
      last = now;
      const sr = stage.getBoundingClientRect();
      const fr = frame.getBoundingClientRect();
      const cv = c.get();
      const pv = p.get();

      /* source A: the head tracing the logo */
      if (!reduce && cv > 0.002 && cv < 0.999 && pv < 0.03) {
        const x = fr.left - sr.left + fr.width * Math.min(1, cv);
        const y = fr.top - sr.top + fr.height * headY(cv);
        let ang = 0;
        if (S.prev) {
          const dx = x - S.prev.x;
          const dy = y - S.prev.y;
          if (Math.abs(dx) + Math.abs(dy) > 0.05) ang = Math.atan2(dy, dx);
        }
        S.prev = { x, y };
        emit(x, y, ang, 14);
        S.flares[0] = 1;
        S.fx[0] = { x, y };
      } else {
        S.flares[0] *= 0.86;
      }

      /* source B: the laser cutting the sheet in half */
      const sv = clamp01((pv - 0.02) / 0.18);
      if (!reduce && sv > 0.003 && sv < 0.997 && Math.abs(sv - S.prevSeam) > 0.0004) {
        const x = sr.width / 2;
        const y = sv * sr.height;
        emit(x, y, sv > S.prevSeam ? Math.PI / 2 : -Math.PI / 2, 12);
        S.flares[1] = 1;
        S.fx[1] = { x, y };
      } else {
        S.flares[1] *= 0.86;
      }
      S.prevSeam = sv;

      /* physics */
      for (let i = S.parts.length - 1; i >= 0; i--) {
        const q = S.parts[i];
        q.x += q.vx * dt;
        q.y += q.vy * dt;
        q.vy += 0.12 * dt;
        const dr = Math.pow(0.975, dt);
        q.vx *= dr;
        q.vy *= dr;
        /* hot sparks sometimes pop into smaller ones */
        if (!q.split && q.w > 1.2 && q.life < q.max * 0.6 && Math.random() < 0.02 * dt) {
          q.split = true;
          for (let k = 0; k < 3; k++) {
            const a = Math.random() * TAU;
            const sp = 1 + Math.random() * 3.2;
            const life = 12 + Math.random() * 14;
            S.parts.push({
              x: q.x,
              y: q.y,
              vx: q.vx * 0.4 + Math.cos(a) * sp,
              vy: q.vy * 0.4 + Math.sin(a) * sp,
              life,
              max: life,
              w: 0.8,
              h0: 0.7,
              split: true,
            });
          }
        }
        q.life -= dt;
        if (q.life <= 0) S.parts.splice(i, 1);
      }

      const flaring = S.flares[0] > 0.02 || S.flares[1] > 0.02;
      if (!S.parts.length && !flaring) {
        if (S.cleared) return;
        ctx.clearRect(0, 0, S.w, S.h);
        S.cleared = true;
        return;
      }
      S.cleared = false;

      ctx.clearRect(0, 0, S.w, S.h);
      ctx.globalCompositeOperation = "lighter";
      ctx.lineCap = "round";

      for (const q of S.parts) {
        const heat = Math.max(0, (q.life / q.max) * q.h0);
        const al = Math.min(1, (q.life / q.max) * 1.8);
        const rgb = heatRGB(heat);
        const sp = Math.hypot(q.vx, q.vy);
        const k = 2 + Math.min(3.5, sp * 0.35);
        ctx.strokeStyle = `rgba(${rgb},${al * 0.3})`;
        ctx.lineWidth = q.w * 1.6;
        ctx.beginPath();
        ctx.moveTo(q.x, q.y);
        ctx.lineTo(q.x - q.vx * k * 1.8, q.y - q.vy * k * 1.8);
        ctx.stroke();
        ctx.strokeStyle = `rgba(${rgb},${al})`;
        ctx.lineWidth = q.w * (0.6 + heat * 0.5);
        ctx.beginPath();
        ctx.moveTo(q.x, q.y);
        ctx.lineTo(q.x - q.vx * k, q.y - q.vy * k);
        ctx.stroke();
        if (heat > 0.5) {
          ctx.fillStyle = `rgba(255,255,255,${al * 0.9})`;
          ctx.beginPath();
          ctx.arc(q.x, q.y, q.w * 0.6, 0, TAU);
          ctx.fill();
        }
      }

      /* white-hot flash where the beam hits the metal */
      for (let i = 0; i < 2; i++) {
        const pt = S.fx[i];
        const fl = S.flares[i] * (0.75 + Math.random() * 0.25);
        if (!pt || fl < 0.02) continue;
        const bloom = ctx.createRadialGradient(pt.x, pt.y, 0, pt.x, pt.y, 50);
        bloom.addColorStop(0, `rgba(255,236,190,${0.9 * fl})`);
        bloom.addColorStop(0.25, `rgba(255,160,60,${0.5 * fl})`);
        bloom.addColorStop(1, "rgba(255,100,20,0)");
        ctx.fillStyle = bloom;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 50, 0, TAU);
        ctx.fill();
        const arm = 22 + Math.random() * 18;
        ctx.strokeStyle = `rgba(255,240,210,${0.55 * fl})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(pt.x - arm, pt.y);
        ctx.lineTo(pt.x + arm, pt.y);
        ctx.moveTo(pt.x, pt.y - arm * 0.7);
        ctx.lineTo(pt.x, pt.y + arm * 0.7);
        ctx.stroke();
        ctx.fillStyle = `rgba(255,255,255,${0.9 * fl})`;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 4, 0, TAU);
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";
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
    io.observe(secRef.current);
    return () => {
      io.disconnect();
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [c, p]);

  return (
    /* tall section = scroll distance; the stage stays pinned while you scroll through it */
    <section ref={secRef} className="relative h-[420vh] bg-[#050b18]">
      <div ref={stageRef} className="sticky top-0 h-screen w-full overflow-hidden">
        {/* 4. the video waiting behind the sheet */}
        <motion.video
          src={videoSrc}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          style={{ scale: videoScale, filter: videoFilter }}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(2,8,24,0.55)_100%)]" />

        {/* 1–3. the two halves of the metal sheet */}
        <Door side="left" x={leftX} seam={seam} logo={logo} />
        <Door side="right" x={rightX} seam={seam} logo={logo} />

        {/* glowing seam while the laser cuts down the middle */}
        <motion.div
          aria-hidden
          style={{ scaleY: seam, opacity: seamLineOpacity }}
          className="pointer-events-none absolute left-1/2 top-0 z-20 -ml-[1.5px] h-full w-[3px] origin-top bg-gradient-to-b from-white via-sky-300 to-sky-500 shadow-[0_0_16px_4px_rgba(60,150,255,0.9),0_0_60px_16px_rgba(40,110,255,0.5)]"
        />
        {/* arrows hinting the doors are about to open */}
        <div aria-hidden className="pointer-events-none absolute left-[6%] top-1/2 z-20 -translate-y-1/2">
          <motion.div style={{ opacity: arrowOpacity, x: arrowShiftNeg }}>
            <ChevronsLeft size={64} strokeWidth={2.5} className="text-sky-400 drop-shadow-[0_0_14px_rgba(60,150,255,0.9)]" />
          </motion.div>
        </div>
        <div aria-hidden className="pointer-events-none absolute right-[6%] top-1/2 z-20 -translate-y-1/2">
          <motion.div style={{ opacity: arrowOpacity, x: arrowShift }}>
            <ChevronsRight size={64} strokeWidth={2.5} className="text-sky-400 drop-shadow-[0_0_14px_rgba(60,150,255,0.9)]" />
          </motion.div>
        </div>

        {/* sparks */}
        <canvas ref={canvasRef} aria-hidden className="pointer-events-none absolute left-0 top-0 z-30" />

        {/* invisible box matching the logo, used to place the sparks along the carve */}
        <div
          ref={frameRef}
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 z-30 aspect-[2.9/1] w-[min(86vw,980px)] -translate-x-1/2 -translate-y-1/2"
        />

        {/* scroll hint */}
        <motion.div
          aria-hidden
          style={{ opacity: hintOpacity }}
          className="pointer-events-none absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/70"
        >
          Scroll
          <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
            <ChevronDown size={18} />
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
}