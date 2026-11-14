"use client";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import MachineArt from "./art/MachineArt";
import SectionHeading from "./ui/SectionHeading";
const cats = [
  { name: "Fiber Laser Cutting Machine", variant: "fiber" },
  { name: "Tube Laser Cutting Machine", variant: "tube" },
  { name: "Sheet Metal Laser Cutter", variant: "sheet" },
  { name: "Laser Welding Machine", variant: "welding" },
  { name: "Laser Marking Machine", variant: "marking" },
];
// duplicated so loop + coverflow always has enough slides
const slides = [...cats, ...cats];
export default function Categories() {
  const swiper = useRef(null);
  return (
    <section id="machines" className="relative py-16">
      <div className="container-x">
        <div className="flex items-end justify-between">
          <SectionHeading label="Explore our range">Machine Categories</SectionHeading>
          <div className="flex gap-2">
            {[
              { Icon: ChevronLeft, label: "Previous", fn: () => swiper.current?.slidePrev(900) },
              { Icon: ChevronRight, label: "Next", fn: () => swiper.current?.slideNext(900) },
            ].map(({ Icon, label, fn }) => (
              <motion.button
                key={label}
                aria-label={label}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.92 }}
                onClick={fn}
                className="grid h-9 w-9 place-items-center rounded-full border border-brand-200 bg-white/80 text-brand shadow-card transition-colors hover:bg-brand hover:text-white"
              >
                <Icon size={16} />
              </motion.button>
            ))}
          </div>
        </div>

        <div className="relative mx-auto mt-10 max-w-5xl pb-16 pt-10">
          {/* elliptical track the machines travel along */}
          <svg
            className="pointer-events-none absolute inset-x-0 bottom-2 h-28 w-full"
            viewBox="0 0 1000 120"
            preserveAspectRatio="none"
            aria-hidden
          >
            <defs>
              <linearGradient id="trackG" x1="0" x2="1">
                <stop offset="0" stopColor="#4C8DFF" stopOpacity="0" />
                <stop offset=".5" stopColor="#4C8DFF" />
                <stop offset="1" stopColor="#4C8DFF" stopOpacity="0" />
              </linearGradient>
            </defs>
            <motion.ellipse
              cx="500"
              cy="60"
              rx="495"
              ry="44"
              fill="none"
              stroke="url(#trackG)"
              strokeWidth="1.6"
              strokeDasharray="8 10"
              animate={{ strokeDashoffset: [0, -72] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            />
            <ellipse
              cx="500"
              cy="62"
              rx="380"
              ry="30"
              fill="none"
              stroke="url(#trackG)"
              strokeWidth="1"
              opacity=".6"
            />
          </svg>

          <Swiper
            modules={[EffectCoverflow, Autoplay]}
            effect="coverflow"
            centeredSlides
            loop
            initialSlide={2}
            speed={1000}
            grabCursor
            autoplay={{ delay: 2600, disableOnInteraction: false, pauseOnMouseEnter: true }}
            coverflowEffect={{ rotate: 38, stretch: -6, depth: 180, modifier: 1, slideShadows: false }}
            breakpoints={{
              0: { slidesPerView: 1.7 },
              640: { slidesPerView: 3 },
              1024: { slidesPerView: 5 },
            }}
            onSwiper={(s) => (swiper.current = s)}
            className="!overflow-visible"
          >
            {slides.map((c, i) => (
              <SwiperSlide key={i} className="!flex justify-center">
                {({ isActive, isPrev, isNext }) => (
                  <motion.a
                    href="#featured"
                    animate={{
                      y: isActive ? -30 : isPrev || isNext ? 8 : 30,
                      scale: isActive ? 1.14 : 1,
                    }}
                    transition={{ type: "spring", stiffness: 110, damping: 16 }}
                    className={`relative flex h-[168px] w-[172px] flex-col justify-between overflow-hidden rounded-2xl p-3 text-center ${
                      isActive
                        ? "bg-gradient-to-br from-brand-500 via-brand-600 to-brand-800 text-white shadow-glow ring-1 ring-white/30"
                        : "glass text-ink"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        aria-hidden
                        className="pointer-events-none absolute -left-1/2 top-0 h-full w-1/2 -skew-x-12 bg-white/25 blur-md"
                        initial={{ x: "0%" }}
                        animate={{ x: "360%" }}
                        transition={{ duration: 1.4, ease: "easeInOut" }}
                      />
                    )}
                    <div className="text-[12.5px] font-bold leading-tight">{c.name}</div>
                    <MachineArt variant={c.variant} className="mx-auto h-[92px] w-full" />
                    {isActive && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute bottom-2.5 right-2.5 grid h-7 w-7 place-items-center rounded-full bg-white text-brand"
                      >
                        <ArrowRight size={14} />
                      </motion.span>
                    )}
                  </motion.a>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
