"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";

const faqs = [
  {
    q: "What materials can your laser cutting machines cut?",
    a: "Our laser cutting machines can cut a wide range of materials including mild steel, stainless steel, aluminum, brass, copper, and more.",
  },
  {
    q: "How do I choose the right machine for my business?",
    a: "Share your material types, thickness range and daily volume with our experts. We recommend the power, bed size and automation level that fits your workflow and budget.",
  },
  {
    q: "Do you provide installation and training?",
    a: "Yes. Every machine includes on-site installation, commissioning and hands-on operator training, followed by ongoing remote and field support.",
  },
  {
    q: "What is the warranty period?",
    a: "Machines ship with a comprehensive warranty on the machine and key components. Extended service plans are available on request.",
  },
];

/* 3D extruded question mark: stacked layers give real depth while it rotates */
function QuestionMark3D() {
  const layers = Array.from({ length: 14 }, (_, i) => i);
  return (
    <div className="relative h-[190px] w-[150px] [perspective:700px]" aria-hidden>
      <motion.div
        className="preserve-3d absolute inset-0 grid place-items-center"
        animate={{ rotateY: 360 }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      >
        {layers.map((i) => (
          <span
            key={i}
            className="absolute select-none text-[190px] font-black leading-none"
            style={{
              transform: `translateZ(${(i - 7) * 3}px)`,
              color: i === layers.length - 1 ? "#6fb0ff" : `hsl(217 ${70 + i}% ${30 + i * 2}%)`,
              textShadow: i === layers.length - 1 ? "0 0 30px rgba(76,141,255,.7)" : undefined,
            }}
          >
            ?
          </span>
        ))}
      </motion.div>
      <motion.div
        className="absolute inset-x-4 -bottom-3 h-5 rounded-[50%] bg-brand-800/30 blur-md"
        animate={{ scaleX: [1, 0.6, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section className="relative py-14">
      <div className="container-x grid items-center gap-8 lg:grid-cols-[1fr_1.1fr]">
        <div className="flex items-center gap-6">
          <QuestionMark3D />
          <div>
            {/* size="lg" assumes SectionHeading supports it; change back to "md" if not */}
            <SectionHeading label="FAQ" size="lg">
              Frequently
              <br />
              Asked Questions
            </SectionHeading>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              className="mt-4 max-w-[340px] text-base leading-relaxed text-ink/65"
            >
              Find quick answers to the most common questions about our laser cutting machines.
            </motion.p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={f.q}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: i * 0.1, duration: 0.55 }}
                className={`glass overflow-hidden rounded-xl transition-shadow ${
                  isOpen ? "shadow-[0_20px_40px_-18px_rgba(11,91,245,0.4)]" : ""
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="text-base font-bold text-ink sm:text-[17px]">{f.q}</span>
                  <motion.span
                    animate={{
                      rotate: isOpen ? 180 : 0,
                      backgroundColor: isOpen ? "#0B5BF5" : "rgba(11,91,245,0)",
                    }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${
                      isOpen ? "text-white" : "text-brand"
                    }`}
                  >
                    <ChevronDown size={18} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <p className="px-5 pb-5 text-[15px] leading-relaxed text-ink/65 sm:text-base">
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}