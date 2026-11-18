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
      className="relative overflow-hidden py-10 sm:py-14 lg:py-18"
    >
      <div className="w-[90%] mx-auto">

        <div className="relative overflow-hidden rounded-[28px] border border-gray-200 bg-[#f5f6f8] px-5 py-12 shadow-[0_30px_70px_-40px_rgba(15,23,42,0.25)] sm:rounded-[32px] sm:px-10 sm:py-16">

          <div
            className="pointer-events-none absolute inset-0 opacity-[0.05]"
            style={{
        backgroundSize: "36px 36px",
            }}
          />

          <div className="relative grid items-center gap-10 lg:grid-cols-[0.85fr_1.5fr_0.85fr] lg:gap-8">

            <div className="relative z-10">

              <div className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#0866F5]">
                Featured Machines
              </div>

              <h2 className="mt-4 text-3xl font-extrabold leading-tight text-gray-900 sm:text-[38px]">
                Our High-Performance Machines
              </h2>

              <p className="mt-4 max-w-xs text-[14px] leading-[1.9] text-gray-600">
                Explore our most popular laser cutting, marking
                and engraving machines designed for precision,
                speed, and long-term performance.
              </p>

              <Magnetic className="mt-8">
                <a
                  href="/machines"
                  className="inline-flex items-center gap-3 rounded-full bg-[#0866F5] px-6 py-3 text-[13px] font-semibold text-white shadow-lg shadow-blue-500/20 transition-colors hover:bg-[#0653c9]"
                >
                  View All Machines
                  <ArrowRight size={16} />
                </a>
              </Magnetic>

            </div>

            <div className="relative min-w-0">

              <div className="absolute inset-x-[8%] top-[10%] bottom-[10%] rounded-full bg-white blur-3xl" />

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
                          className="h-full w-full object-contain drop-shadow-[0_25px_25px_rgba(15,23,42,0.2)]"
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
                        ? "w-8 bg-[#0866F5]"
                        : "w-1.5 bg-gray-300 hover:bg-gray-400"
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

                <span className="inline-block rounded-full border border-gray-300 bg-white px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-gray-700">
                  {machine.badge}
                </span>

                <h3 className="mt-5 text-[23px] font-bold leading-snug text-gray-900 sm:text-[26px]">
                  {machine.name}
                </h3>

                <div className="mt-3 text-[15px] font-bold text-[#0866F5]">
                  {machine.price}
                </div>

                <div className="my-6 h-px w-full bg-gray-200" />

                <ul className="space-y-4">
                  {machine.feats.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-[13px] leading-relaxed text-gray-700"
                    >
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-white shadow-sm ring-1 ring-gray-200">
                        <Check
                          size={12}
                          className="text-[#0866F5]"
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
                  className="grid h-11 w-11 place-items-center rounded-full border border-gray-300 text-gray-700 transition-all hover:border-gray-900 hover:bg-gray-900 hover:text-white"
                >
                  <ArrowLeft size={18} />
                </button>

                <button
                  aria-label="Next machine"
                  onClick={() => swiper.current?.slideNext()}
                  className="grid h-11 w-11 place-items-center rounded-full border border-gray-300 text-gray-700 transition-all hover:border-gray-900 hover:bg-gray-900 hover:text-white"
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