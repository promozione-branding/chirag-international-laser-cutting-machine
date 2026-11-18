"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Crosshair, Flame, Layers, PenTool, Scissors } from "lucide-react";
import MachineArt from "./art/MachineArt";

function Co2Icon({ size = 28, strokeWidth = 2 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={strokeWidth + 0.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M14 36a8 8 0 0 1-1-15.9A10 10 0 0 1 32 17a9 9 0 0 1 2 18H14Z" />
      <text x="24" y="31" textAnchor="middle" fontSize="11" fontWeight="800" fill="currentColor" stroke="none" fontFamily="inherit">
        CO<tspan fontSize="7" dy="2">2</tspan>
      </text>
    </svg>
  );
}

// All categories rotate through the big blue card; the rest sit in the grid.
const cats = [
  { name: "Laser Engraving Machine", variant: "marking", image: "/machines/laser-engraving_transparent.jpg", Icon: PenTool },
  { name: "Laser Cutting Machine", variant: "sheet", image: "/machines/laser-cutting_transparent.jpg", Icon: Scissors },
  { name: "Fiber Laser Cutting Machine", variant: "fiber", image: "/machines/fiber-laser-cutting_transparent.jpg", Icon: Layers },
  { name: "Laser Welding Machine", variant: "welding", image: "/machines/laser-welding_transparent.jpg", Icon: Flame },
  { name: "Laser Marking Machine", variant: "marking", image: "/machines/laser-marking_transparent.jpg", Icon: Crosshair },
  { name: "Fabric Laser Cutting Machine", variant: "fiber", image: "/machines/fabric-laser-cutting_transparent.jpg", Icon: Layers },
  { name: "CO2 Laser Cutting Machine", variant: "sheet", image: "/machines/co2-laser-cutting__transparent.jpg", Icon: Co2Icon },
];

function MachineImage({ cat, className = "", blend = true }) {
  const [failed, setFailed] = useState(false);
  if (cat.image && !failed) {
    return (
      <img
        src={cat.image}
        alt={cat.name}
        loading="lazy"
        draggable={false}
        onError={() => setFailed(true)}
        className={`${className} ${blend ? "mix-blend-multiply" : ""}`}
      />
    );
  }
  return <MachineArt variant={cat.variant} className={className} />;
}

/* ---------- Big featured card (left) ---------- */
function FeaturedCard({ cat, index, total, onSelect, onPause }) {
  const { Icon } = cat;
  return (
    <a
      href="#featured"
      draggable={false}
      onMouseEnter={() => onPause(true)}
      onMouseLeave={() => onPause(false)}
      className="group relative block h-[520px] w-full lg:h-full lg:min-h-[540px]"
    >
      <span aria-hidden className="absolute inset-2 rounded-[40px] bg-[#2f7bff]/40 blur-2xl" />

      <div
        className="absolute inset-0 -skew-x-[4deg] rounded-[40px] bg-gradient-to-br from-[#6cb4ff] via-[#2f86ff] to-[#7cc4ff] p-[7px] shadow-[0_30px_70px_-20px_rgba(10,80,220,0.6)]"
      >
        <div className="relative h-full w-full overflow-hidden rounded-[34px] bg-gradient-to-br from-[#0a5fe0] via-[#0645b8] to-[#03287a]">
          <span
            aria-hidden
            className="pointer-events-none absolute -right-10 -top-10 h-[130%] w-1/2 rotate-[28deg] bg-gradient-to-b from-white/20 via-white/5 to-transparent"
          />
          <span aria-hidden className="pointer-events-none absolute bottom-[70px] left-1/2 h-[120px] w-[110%] -translate-x-1/2 rounded-[50%] border-2 border-[#6fc2ff]/70 shadow-[0_0_40px_rgba(90,180,255,0.8),inset_0_0_30px_rgba(90,180,255,0.5)]" />
          <span aria-hidden className="pointer-events-none absolute bottom-[90px] left-1/2 h-[80px] w-[85%] -translate-x-1/2 rounded-[50%] border border-[#9ad8ff]/60" />
          <span aria-hidden className="pointer-events-none absolute bottom-0 left-0 h-1/3 w-full bg-gradient-to-t from-[#0a8bff]/30 to-transparent" />
        </div>
      </div>

      <div className="relative flex h-full w-full flex-col p-7 pl-9 text-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="flex min-h-0 flex-1 flex-col"
          >
            <div className="grid h-[58px] w-[58px] shrink-0 place-items-center rounded-2xl bg-[#04307f]/70 ring-1 ring-[#7fc0ff]/70 shadow-[0_0_20px_rgba(80,170,255,0.6)]">
              <Icon size={30} strokeWidth={1.8} />
            </div>

            <h3 className="mt-4 max-w-[260px] text-[30px] font-semibold leading-[1.15] tracking-tight">
              {cat.name}
            </h3>
            <span className="mt-4 h-[4px] w-[72px] shrink-0 rounded-full bg-[#2f7bff]" />

            <div className="relative my-2 min-h-0 flex-1">
              <MachineImage
                cat={cat}
                blend={false}
                className="absolute inset-0 h-full w-full object-contain object-bottom drop-shadow-[0_20px_30px_rgba(0,20,80,0.5)]"
              />
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 flex items-center justify-between gap-4">
          <span className="inline-flex items-center gap-3 rounded-full bg-white py-1.5 pl-5 pr-1.5 text-[15px] font-semibold text-[#0b4fd0] shadow-[0_10px_24px_-8px_rgba(0,20,80,0.5)]">
            View Category
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[#1559e6] text-white">
              <ArrowRight size={18} strokeWidth={2.6} />
            </span>
          </span>

          <div className="flex items-center gap-1.5 pr-3">
            {Array.from({ length: total }).map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Show category ${i + 1}`}
                onClick={(e) => {
                  e.preventDefault();
                  onSelect(i);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === index ? "w-6 bg-white" : "w-2 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </a>
  );
}

/* ---------- Small white cards (right grid) ---------- */
function SmallCard({ cat }) {
  const { Icon } = cat;
  return (
    <a
      href="#featured"
      draggable={false}
      className="group relative flex h-[250px] flex-col overflow-hidden rounded-[28px] bg-white/80 p-5 shadow-[0_20px_45px_-25px_rgba(37,99,235,0.35)] ring-1 ring-white backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_55px_-22px_rgba(37,99,235,0.45)]"
    >
      <div className="flex items-start gap-4">
        <div className="grid h-[52px] w-[52px] shrink-0 place-items-center rounded-2xl bg-[#e8f1ff] text-[#1559e6]">
          <Icon size={26} strokeWidth={1.9} />
        </div>
        <h3 className="max-w-[150px] pt-0.5 text-[17px] font-semibold leading-[1.2] text-[#0b1b4a]">
          {cat.name}
        </h3>
      </div>

      <div className="relative mt-2 min-h-0 flex-1">
        <MachineImage
          cat={cat}
          className="absolute inset-0 h-full w-full object-contain object-bottom p-1 transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <span className="absolute bottom-4 right-4 grid h-[52px] w-[52px] place-items-center rounded-full bg-white text-[#1559e6] shadow-[0_8px_20px_-6px_rgba(37,99,235,0.35)] transition-colors group-hover:bg-[#1559e6] group-hover:text-white">
        <ArrowRight size={22} strokeWidth={2.4} />
      </span>
    </a>
  );
}

export default function Categories() {
  const [active, setActive] = useState(0);
  const [slots, setSlots] = useState(() => cats.map((_, i) => i).slice(1));
  const [paused, setPaused] = useState(false);

  const select = (next) => {
    if (next === active) return;
    setSlots((prev) => prev.map((i) => (i === next ? active : i)));
    setActive(next);
  };

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => select((active + 1) % cats.length), 3500);
    return () => clearInterval(id);
  }, [active, paused]); 

  const featured = cats[active];

  return (
    <section
      id="machines"
      style={{ fontFamily: "'Poppins', ui-sans-serif, system-ui, sans-serif" }}
      className="relative overflow-hidden pb-24 pt-14 bg-white"
    >
      <div aria-hidden className="pointer-events-none absolute -left-40 top-0 h-[420px] w-[420px] rounded-full" />
      <div aria-hidden className="pointer-events-none absolute -right-40 top-10 h-[420px] w-[520px] rounded-full" />

      <div className="relative mx-auto w-full max-w-[1800px] px-4 lg:px-10">
        <div className="text-center">
          <div className="flex items-center justify-center gap-4">
            <span className="h-[3px] w-12 rounded-full bg-[#1559e6]" />
            <span className="text-[15px] font-bold uppercase tracking-[0.3em] text-[#1559e6]">
              Explore our range
            </span>
            <span className="h-[3px] w-12 rounded-full bg-[#1559e6]" />
          </div>
          <h2 className="mt-3 text-[44px] font-bold leading-tight tracking-tight text-[#0b1b4a] md:text-[60px]">
            Machine <span className="text-[#0875FF]">Categories</span>
          </h2>
          <p className="mx-auto mt-2 max-w-[760px] text-[18px] font-medium leading-snug text-slate-500">
            A complete range of laser machines for cutting, engraving, marking, and welding applications across
            industries.
          </p>
        </div>

        <div className="mt-14 grid items-stretch gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,2fr)] lg:gap-10">
          <div className="lg:pr-4">
            <FeaturedCard
              cat={featured}
              index={active}
              total={cats.length}
              onSelect={select}
              onPause={setPaused}
            />
          </div>
          <div className="grid content-center gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {slots.map((i) => (
              <SmallCard key={cats[i].name} cat={cats[i]} />
            ))}
          </div>
        </div>
      </div>

      <svg
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 w-full"
        viewBox="0 0 1440 160"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="waveA" x1="0" x2="1">
            <stop offset="0" stopColor="#e3e3e3" stopOpacity=".5" />
            <stop offset="1" stopColor="#777779" stopOpacity=".5" />
          </linearGradient>
          <linearGradient id="waveB" x1="0" x2="1">
            <stop offset="0" stopColor="#dbe8ff" stopOpacity=".7" />
            <stop offset="1" stopColor="#777779" stopOpacity=".45" />
          </linearGradient>
        </defs>
        <path d="M0 90 C240 20 480 130 760 90 S1230 30 1440 80 V160 H0Z" fill="url(#waveB)" />
        <path d="M0 125 C300 70 520 160 820 125 S1250 90 1440 70 V160 H0Z" fill="url(#waveA)" />
      </svg>
    </section>
  );
}