"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Layers, Leaf, Settings, Target, Zap } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import Tilt from "./ui/Tilt";
const items = [
  { icon: Target, a: "High Cutting", b: "Accuracy" },
  { icon: Zap, a: "Fast & Efficient", b: "Performance" },
  { icon: Layers, a: "Wide Material", b: "Compatibility" },
  { icon: Settings, a: "Low", b: "Maintenance" },
  { icon: Leaf, a: "Energy", b: "Efficient" },
];
const CENTER = 2;
export default function Features() {
  const [active, setActive] = useState(CENTER);
  return (
    <section className="relative py-16">
      <div className="container-x">
        <SectionHeading label="Why choose us" align="center">
          Features That Make the Difference
        </SectionHeading>

        <div
          className="relative mx-auto mt-14 flex max-w-4xl flex-wrap items-end justify-center gap-4 pb-16 sm:flex-nowrap sm:gap-5"
          onMouseLeave={() => setActive(CENTER)}
        >
          {items.map(({ icon: Icon, a, b }, i) => {
            const isActive = active === i;
            return (
              <motion.div
                key={a}
                onMouseEnter={() => setActive(i)}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                animate={{ y: isActive ? -26 : 0, scale: isActive ? 1.18 : 1 }}
                transition={{ type: "spring", stiffness: 140, damping: 16 }}
                className="relative z-10 w-[138px] cursor-pointer"
              >
                {/* ripple wave radiating from the focused card */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      key="ripples"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="pointer-events-none absolute left-1/2 top-[88%] -z-10 h-[90px] w-[300px] -translate-x-1/2"
                    >
                      {[0, 1, 2].map((r) => (
                        <span
                          key={r}
                          className="absolute inset-0 animate-ripple rounded-[50%] border border-brand/40 bg-brand/5"
                          style={{ animationDelay: `${r * 0.7}s` }}
                        />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                <Tilt max={16}>
                  <div
                    className={`relative flex h-[136px] flex-col items-center justify-center gap-2.5 rounded-2xl px-2 text-center transition-all duration-500 ${
                      isActive
                        ? "bg-gradient-to-br from-brand-500 via-brand-600 to-brand-800 text-white shadow-glow ring-1 ring-white/30"
                        : "glass text-ink"
                    }`}
                  >
                    {isActive && (
                      <span className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.35),transparent_60%)]" />
                    )}
                    {/* icon floats along a small motion path */}
                    <motion.div
                      animate={{ x: [0, 4, 0, -4, 0], y: [0, -6, 0, -3, 0], rotate: [0, 4, 0, -4, 0] }}
                      transition={{ duration: 4 + i * 0.6, repeat: Infinity, ease: "easeInOut" }}
                      style={{ translateZ: 30 }}
                    >
                      <Icon size={34} strokeWidth={1.5} className={isActive ? "text-white" : "text-brand"} />
                    </motion.div>
                    <div
                      className="text-[12px] font-bold leading-tight"
                      style={{ transform: "translateZ(20px)" }}
                    >
                      {a}
                      <br />
                      {b}
                    </div>
                  </div>
                </Tilt>
              </motion.div>
            );
          })}

          {/* base glow rings under the row */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center">
            <div className="h-24 w-[560px] rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(59,139,255,0.28),transparent_70%)]" />
          </div>
        </div>
      </div>
    </section>
  );
}
