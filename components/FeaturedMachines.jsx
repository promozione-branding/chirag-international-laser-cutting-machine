"use client";
import { useRef, useState } from "react";
import { AnimatePresence, animate, motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import MachineArt from "./art/MachineArt";
import Magnetic from "./ui/Magnetic";
const machines = [
  {
    name: "Fiber Laser Cutting Machine",
    badge: "Best Seller",
    feats: ["Up to 30kW Power", "±0.01 mm Accuracy", "Stable & Efficient Performance"],
    variant: "fiber",
  },
  {
    name: "Sheet Metal Laser Cutter",
    badge: "Popular",
    feats: ["Fully Enclosed Cabin", "Auto Exchange Table", "Smart Nesting Software"],
    variant: "sheet",
  },
  {
    name: "Tube Laser Cutting Machine",
    badge: "New",
    feats: ["Round, Square & Oval Tubes", "Auto Loading System", "3D Bevel Cutting"],
    variant: "tube",
  },
  {
    name: "Laser Welding Machine",
    badge: "Top Rated",
    feats: ["Handheld & Robotic", "Clean, Strong Seams", "Low Heat Distortion"],
    variant: "welding",
  },
];
const blueprints = [
  { cls: "left-[4%] top-[6%] h-20 w-28", d: 0, v: "fiber" },
  { cls: "right-[8%] top-[2%] h-24 w-32", d: 1.2, v: "sheet" },
  { cls: "left-[24%] bottom-[22%] h-16 w-24", d: 2.1, v: "tube" },
];
export default function FeaturedMachines() {
  const wrapRef = useRef(null);
  const swiper = useRef(null);
  const [active, setActive] = useState(0);
  // Section is pinned (sticky) while scroll progress scrubs the 3D rotation
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start start", "end end"] });
  const scrubRot = useTransform(scrollYProgress, [0, 1], [-38, 38]);
  const scrubTilt = useTransform(scrollYProgress, [0, 1], [10, -6]);
  const spin = useMotionValue(0);
  const rotateY = useTransform([scrubRot, spin], ([a, b]) => a + b);
  const layerY = useTransform(scrollYProgress, [0, 1], [30, -50]);
  const layerY2 = useTransform(scrollYProgress, [0, 1], [-10, 60]);
  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1.15, 0.9]);
  const m = machines[active];
  return (
    <section id="featured" ref={wrapRef} className="relative lg:h-[170vh]">
      <div className="py-8 lg:sticky lg:top-[84px]">
        <div className="container-x">
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#0a2a73] via-[#082159] to-[#051540] px-6 py-10 shadow-[0_40px_80px_-30px_rgba(5,20,63,0.8)] sm:px-10">
            {/* faint grid */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:36px_36px]" />

            {/* floating blueprint layers */}
            {blueprints.map((b, i) => (
              <motion.div
                key={i}
                style={{ y: i % 2 ? layerY : layerY2 }}
                className={`pointer-events-none absolute ${b.cls}`}
              >
                <motion.div
                  animate={{ y: [0, -12, 0], rotate: [0, 2, 0] }}
                  transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut", delay: b.d }}
                  className="glass-dark h-full w-full rounded-lg p-2 opacity-60"
                >
                  <MachineArt
                    variant={b.v}
                    className="h-full w-full opacity-70 [filter:invert(1)_hue-rotate(180deg)_brightness(1.4)]"
                  />
                </motion.div>
              </motion.div>
            ))}

            <div className="relative grid items-center gap-8 lg:grid-cols-[0.85fr_1.5fr_0.85fr]">
              {/* left */}
              <div className="z-10">
                <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-200">
                  Featured Machines
                </div>
                <h2 className="mt-3 text-3xl font-extrabold leading-tight text-white sm:text-[34px]">
                  Our High-Performance Machines
                </h2>
                <p className="mt-3 max-w-xs text-[13px] leading-relaxed text-white/70">
                  Explore our most popular laser cutting machines designed for precision, speed, and long-term
                  performance.
                </p>
                <Magnetic className="mt-6">
                  <a
                    href="#machines"
                    className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-5 py-2.5 text-[13px] font-semibold text-white shadow-glow transition-colors hover:bg-brand-400"
                  >
                    View All Machines <ArrowRight size={14} />
                  </a>
                </Magnetic>
              </div>

              {/* center: spotlight platform + rotating machine */}
              <div
                className="relative h-[300px] sm:h-[360px]"
                onMouseEnter={() =>
                  animate(spin, spin.get() + 360, { duration: 1.6, ease: [0.65, 0, 0.35, 1] })
                }
              >
                {/* spotlight beam */}
                <motion.div
                  style={{ scale: glowScale }}
                  className="pointer-events-none absolute left-1/2 top-0 h-[75%] w-[70%] -translate-x-1/2 [clip-path:polygon(35%_0,65%_0,100%_100%,0_100%)] bg-gradient-to-b from-white/25 via-brand-400/10 to-transparent"
                />
                {/* platform */}
                <div className="absolute inset-x-0 bottom-2 flex justify-center">
                  <div className="relative h-24 w-[88%]">
                    {[0, 1, 2].map((r) => (
                      <motion.span
                        key={r}
                        className="absolute inset-0 rounded-[50%] border border-brand-400/60"
                        animate={{ scale: [0.7, 1.08], opacity: [0.8, 0] }}
                        transition={{ duration: 3, repeat: Infinity, delay: r, ease: "easeOut" }}
                      />
                    ))}
                    <div className="absolute inset-x-[6%] inset-y-[18%] rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(76,141,255,0.75),rgba(11,91,245,0.15)_60%,transparent_72%)] shadow-[0_0_60px_10px_rgba(59,139,255,0.5)]" />
                    <div className="absolute inset-x-[10%] inset-y-[26%] rounded-[50%] border-2 border-brand-400" />
                  </div>
                </div>

                <Swiper
                  modules={[EffectFade]}
                  effect="fade"
                  fadeEffect={{ crossFade: true }}
                  loop
                  speed={800}
                  onSwiper={(s) => (swiper.current = s)}
                  onSlideChange={(s) => setActive(s.realIndex)}
                  className="!absolute !inset-0 !overflow-hidden"
                >
                  {machines.map((mc) => (
                    <SwiperSlide key={mc.name} className="!flex items-center justify-center">
                      <motion.div
                        style={{ rotateY, rotateX: scrubTilt, transformPerspective: 1200 }}
                        className="w-[92%] max-w-[470px] pb-8 drop-shadow-[0_30px_30px_rgba(0,0,0,0.45)]"
                      >
                        <MachineArt variant={mc.variant} className="w-full" />
                      </motion.div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* dots */}
                <div className="absolute inset-x-0 -bottom-3 z-10 flex justify-center gap-1.5">
                  {machines.map((_, i) => (
                    <button
                      key={i}
                      aria-label={`Slide ${i + 1}`}
                      onClick={() => swiper.current?.slideToLoop(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? "w-5 bg-brand-400" : "w-1.5 bg-white/40"}`}
                    />
                  ))}
                </div>
              </div>

              {/* right: info */}
              <div className="z-10 min-h-[200px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.35 }}
                  >
                    <span className="inline-block rounded-full bg-brand-500 px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-white">
                      {m.badge}
                    </span>
                    <h3 className="mt-3 text-xl font-bold leading-snug text-white">{m.name}</h3>
                    <ul className="mt-3 space-y-1.5">
                      {m.feats.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-[12px] text-white/80">
                          <Check size={13} className="text-brand-400" /> {f}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </AnimatePresence>
                <div className="mt-6 flex gap-2.5">
                  {[
                    { I: ArrowLeft, fn: () => swiper.current?.slidePrev(), l: "Previous" },
                    { I: ArrowRight, fn: () => swiper.current?.slideNext(), l: "Next" },
                  ].map(({ I, fn, l }) => (
                    <motion.button
                      key={l}
                      aria-label={l}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={fn}
                      className="grid h-9 w-9 place-items-center rounded-full border border-white/30 text-white transition-colors hover:bg-white hover:text-brand-800"
                    >
                      <I size={15} />
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
