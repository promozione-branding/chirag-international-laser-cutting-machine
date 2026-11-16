"use client";
import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import BuildingArt from "./art/BuildingArt";
import SectionHeading from "./ui/SectionHeading";
import Magnetic from "./ui/Magnetic";
const timeline = [
  {
    year: "2015",
    title: "The Beginning",
    text: "Started with a vision to bring advanced cutting technology to India.",
  },
  { year: "2018", title: "", text: "Expanded manufacturing and product range." },
  { year: "2021", title: "", text: "Crossed 500+ machine installations." },
  { year: "2026", title: "", text: "A trusted partner for industries across 25+ countries." },
];
export default function Story() {
  const secRef = useRef(null);
  const tlRef = useRef(null);
  const { scrollYProgress: secP } = useScroll({ target: secRef, offset: ["start end", "end start"] });
  const buildingY = useTransform(secP, [0, 1], [-34, 34]);
  const buildingScale = useTransform(secP, [0, 0.5, 1], [1.12, 1.06, 1.12]);
  const bgPath = useSpring(useTransform(secP, [0.15, 0.7], [0, 1]), { stiffness: 80, damping: 22 });
  const { scrollYProgress: tlP } = useScroll({ target: tlRef, offset: ["start 80%", "end 60%"] });
  const lineScale = useSpring(tlP, { stiffness: 110, damping: 24 });
  return (
    <section id="story" ref={secRef} className="relative py-16">
      {/* background line that connects the journey */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 1440 520"
        preserveAspectRatio="none"
        aria-hidden
      >
        <motion.path
          d="M120 460 C 380 380, 520 520, 760 330 S 1040 180, 1180 260 S 1330 120, 1400 80"
          fill="none"
          stroke="#4C8DFF"
          strokeOpacity=".28"
          strokeWidth="2"
          strokeDasharray="2 9"
          strokeLinecap="round"
          style={{ pathLength: bgPath }}
        />
      </svg>

      <div className="container-x relative grid items-center gap-10 lg:grid-cols-[0.8fr_1.35fr_1fr]">
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
            className="mt-4 max-w-[260px] text-[13px] leading-relaxed text-ink/70"
          >
            From a small setup to a trusted name in laser cutting technology, our journey is driven by
            innovation, quality, and customer success.
          </motion.p>
          <Magnetic className="mt-5">
            <a href="#story" className="btn-outline !px-5 !py-2 !text-[13px] !font-bold !text-brand">
              Read Our Story <ArrowRight size={14} />
            </a>
          </Magnetic>
        </div>

        {/* parallax building */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="relative h-[260px] overflow-hidden shadow-soft [clip-path:polygon(7%_0,100%_8%,100%_100%,0_100%)] sm:h-[290px]"
          style={{ borderRadius: "0 0 28px 28px" }}
        >
          <motion.div style={{ y: buildingY, scale: buildingScale }} className="absolute inset-0">
            <img src="story_.png" alt="Our story"/>
          </motion.div>
        </motion.div>

        {/* timeline */}
        <div ref={tlRef} className="relative pl-8">
          <div className="absolute bottom-1 left-[5px] top-2 w-[2px] rounded bg-brand/15" />
          <motion.div
            style={{ scaleY: lineScale }}
            className="absolute bottom-1 left-[5px] top-2 w-[2px] origin-top rounded bg-gradient-to-b from-brand to-brand-400"
          />
          <div className="flex flex-col gap-6">
            {timeline.map((t, i) => (
              <motion.div
                key={t.year}
                initial={{ opacity: 0, x: i % 2 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 300, damping: 14, delay: 0.15 }}
                  className={`absolute -left-[33px] top-1 h-3 w-3 rounded-full ring-4 ring-white ${i === 0 ? "bg-orange-400" : "bg-brand"}`}
                />
                <div className="text-[15px] font-extrabold text-ink">{t.year}</div>
                <p className="mt-0.5 text-[11.5px] leading-snug text-ink/65">
                  {t.title && <span className="font-semibold text-ink/80">{t.title} – </span>}
                  {t.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
