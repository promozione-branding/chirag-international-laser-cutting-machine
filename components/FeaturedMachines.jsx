"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

import {
  ArrowRight,
  ArrowLeft,
  Check,
} from "lucide-react";

import Magnetic from "./ui/Magnetic";

const machines = [
  {
    name: "Fiber Laser Cutters",
    badge: "Fiber Cutting",
    price: "₹ 18,00,000 / Piece",
    image: "/machines/fiber-laser-cutters_transparent.png",
    feats: [
      "Working Area: 3000 × 1500 mm",
      "Laser Power: 1000 W",
      "Cuts SS, MS, Aluminium, Brass & more",
    ],
  },
  {
    name: "Fiber Laser Steel Cutting Machine",
    badge: "Steel Cutting",
    price: "₹ 25,00,000 / Piece",
    image: "/machines/fiber-laser-steel_transparent.png",
    feats: [
      "Working Area: 3000 × 1500 mm",
      "Fully Automatic",
      "Max Cutting Thickness: SS 8 mm",
    ],
  },
  {
    name: "CO2 Laser Marking Machine",
    badge: "Marking",
    price: "₹ 4,50,000 / Unit",
    image: "/machines/co2-laser-marking_transparent.png",
    feats: [
      "Marking Speed: 7000 mm/s",
      "CO2 Laser Type",
      "Marking Area: 400 × 400 mm",
    ],
  },
  {
    name: "CO2 Laser Leather Cutting Machine",
    badge: "Non-Metal Cutting",
    price: "₹ 3,10,000 / Piece",
    image: "/machines/co2-leather-cutting_transparent.png",
    feats: [
      "Laser Power: 100 W",
      "Cutting Speed: 8000 mm/s",
      "Ideal for Leather, Acrylic, MDF & Paper",
    ],
  },
  {
    name: "Laser Jewellery Hallmarking System",
    badge: "Laser Hallmarking machine",
    price: "₹ 1,60,000 / Piece",
    image: "/machines/jewellery-laser-engraver_transparent.png",
    feats: [
      "Power: 20 W",
      "High Precision Jewellery Engraving",
      "Automatic Operation",
    ],
  },
];

export default function FeaturedMachines() {
  const swiper = useRef(null);
  const [active, setActive] = useState(0);

  const machine = machines[active];

  return (
    <section
      id="featured"
      className="relative overflow-hidden py-20 sm:py-24 lg:py-28"
    >
      <div className="container-x">

        <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#0a2a73] via-[#082159] to-[#051540] px-5 py-12 shadow-[0_30px_70px_-30px_rgba(5,20,63,0.5)] sm:rounded-[32px] sm:px-10 sm:py-16">

          <div
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
              backgroundSize: "36px 36px",
            }}
          />

          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/20 blur-[100px]" />

          <div className="relative grid items-center gap-10 lg:grid-cols-[0.85fr_1.5fr_0.85fr] lg:gap-8">

            <div className="relative z-10">

              <div className="text-[11px] font-bold uppercase tracking-[0.25em] text-blue-300">
                Featured Machines
              </div>

              <h2 className="mt-4 text-3xl font-extrabold leading-tight text-white sm:text-[38px]">
                Our High-Performance Machines
              </h2>

              <p className="mt-4 max-w-xs text-[14px] leading-[1.9] text-white/70">
                Explore our most popular laser cutting, marking
                and engraving machines designed for precision,
                speed, and long-term performance.
              </p>

              <Magnetic className="mt-8">
                <a
                  href="/machines"
                  className="inline-flex items-center gap-3 rounded-full bg-[#0866F5] px-6 py-3 text-[13px] font-semibold text-white shadow-lg shadow-blue-500/20 transition-colors hover:bg-blue-400"
                >
                  View All Machines
                  <ArrowRight size={16} />
                </a>
              </Magnetic>

            </div>

            <div className="relative min-w-0">

              <div className="absolute inset-x-[8%] top-[10%] bottom-[10%] rounded-full bg-blue-400/10 blur-3xl" />

              <div className="relative h-[280px] sm:h-[380px] lg:h-[420px]">

                <Swiper
                  modules={[EffectFade]}
                  effect="fade"
                  fadeEffect={{
                    crossFade: true,
                  }}
                  loop
                  speed={500}
                  onSwiper={(instance) => {
                    swiper.current = instance;
                  }}
                  onSlideChange={(instance) => {
                    setActive(instance.realIndex);
                  }}
                  className="h-full w-full"
                >
                  {machines.map((item) => (
                    <SwiperSlide
                      key={item.name}
                      className="flex items-center justify-center"
                    >
                      <div className="flex h-full w-full items-center justify-center p-4">

                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-contain drop-shadow-[0_25px_25px_rgba(0,0,0,0.35)]"
                          loading="lazy"
                        />

                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

              </div>

              <div className="relative z-10 mt-2 flex justify-center gap-2">
                {machines.map((item, index) => (
                  <button
                    key={item.name}
                    aria-label={`Show ${item.name}`}
                    onClick={() => swiper.current?.slideToLoop(index)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === active
                        ? "w-8 bg-blue-400"
                        : "w-1.5 bg-white/35 hover:bg-white/70"
                    }`}
                  />
                ))}
              </div>

            </div>

            <div className="relative z-10 min-h-[260px]">

              <div
                key={active}
                className="animate-[fadeIn_0.4s_ease-out]"
              >

                <span className="inline-block rounded-full border border-blue-300/30 bg-blue-500/20 px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-blue-200">
                  {machine.badge}
                </span>

                <h3 className="mt-5 text-[23px] font-bold leading-snug text-white sm:text-[26px]">
                  {machine.name}
                </h3>

                <div className="mt-3 text-[15px] font-bold text-blue-300">
                  {machine.price}
                </div>

                <div className="my-6 h-px w-full bg-white/15" />

                <ul className="space-y-4">
                  {machine.feats.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-[13px] leading-relaxed text-white/80"
                    >
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-blue-500/20">
                        <Check
                          size={12}
                          className="text-blue-300"
                        />
                      </span>

                      {feature}
                    </li>
                  ))}
                </ul>

              </div>

              <div className="mt-8 flex gap-3">

                <button
                  aria-label="Previous machine"
                  onClick={() => swiper.current?.slidePrev()}
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/30 text-white transition-all hover:border-blue-400 hover:bg-blue-500"
                >
                  <ArrowLeft size={18} />
                </button>

                <button
                  aria-label="Next machine"
                  onClick={() => swiper.current?.slideNext()}
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/30 text-white transition-all hover:border-blue-400 hover:bg-blue-500"
                >
                  <ArrowRight size={18} />
                </button>

              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}