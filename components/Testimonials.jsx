"use client";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import Avatar from "./art/Avatar";
import SectionHeading from "./ui/SectionHeading";
const reviews = [
  {
    name: "Rajesh Mehta",
    role: "Production Head, MetalCorp",
    text: "Excellent machine performance and outstanding support. Our productivity has increased by over 40%.",
    av: { skin: "#d9a577", hair: "#1c1c1f", shirt: "#27406b" },
  },
  {
    name: "Neha Sharma",
    role: "CEO, Fabtech Industries",
    text: "The precision and cutting speed are remarkable. A game-changer for our fabrication business.",
    av: { skin: "#e0b08a", hair: "#2b1b14", shirt: "#0b5bf5", female: true },
  },
  {
    name: "Amit Verma",
    role: "Operations Manager, SteelForm",
    text: "Reliable, efficient, and easy to operate. Highly recommended!",
    av: { skin: "#c98f63", hair: "#141414", shirt: "#3b4660" },
  },
];
const slides = [...reviews, ...reviews];
export default function Testimonials() {
  const swiper = useRef(null);
  const [active, setActive] = useState(0);
  return (
    <section className="relative py-12">
      <div className="container-x">
        <SectionHeading label="Testimonials" size="md">
          What Our Customers Say
        </SectionHeading>

        <div className="relative mx-auto mt-8 max-w-5xl">
          <button
            aria-label="Previous"
            onClick={() => swiper.current?.slidePrev(800)}
            className="absolute -left-2 top-1/2 z-20 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-brand-200 bg-white text-brand shadow-card transition-colors hover:bg-brand hover:text-white sm:-left-12"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            aria-label="Next"
            onClick={() => swiper.current?.slideNext(800)}
            className="absolute -right-2 top-1/2 z-20 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border border-brand-200 bg-white text-brand shadow-card transition-colors hover:bg-brand hover:text-white sm:-right-12"
          >
            <ChevronRight size={16} />
          </button>

          <Swiper
            modules={[EffectCoverflow, Autoplay]}
            effect="coverflow"
            centeredSlides
            loop
            speed={800}
            grabCursor
            autoplay={{ delay: 4200, disableOnInteraction: false, pauseOnMouseEnter: true }}
            coverflowEffect={{ rotate: 18, stretch: 0, depth: 140, modifier: 1, slideShadows: false }}
            breakpoints={{ 0: { slidesPerView: 1.15 }, 768: { slidesPerView: 3 } }}
            onSwiper={(s) => (swiper.current = s)}
            onSlideChange={(s) => setActive(s.realIndex % reviews.length)}
            className="!overflow-visible !py-8"
          >
            {slides.map((r, i) => (
              <SwiperSlide key={i} className="!h-auto">
                {({ isActive }) => (
                  <motion.figure
                    animate={{ scale: isActive ? 1.08 : 0.94, y: isActive ? -8 : 0 }}
                    transition={{ type: "spring", stiffness: 120, damping: 16 }}
                    className={`glass relative flex h-full min-h-[150px] flex-col rounded-2xl p-5 ${isActive ? "shadow-[0_30px_60px_-20px_rgba(11,91,245,0.45)]" : "opacity-80"}`}
                  >
                    <Quote size={26} className="absolute right-4 top-3 text-brand/15" fill="currentColor" />
                    <div className="flex items-center gap-3">
                      <Avatar {...r.av} />
                      <figcaption className="leading-tight">
                        <div className="text-[13px] font-bold text-ink">{r.name}</div>
                        <div className="text-[10px] text-ink/60">{r.role}</div>
                        <div className="mt-1 flex gap-0.5 text-brand">
                          {Array.from({ length: 5 }, (_, s) => (
                            <Star key={s} size={11} fill="currentColor" />
                          ))}
                        </div>
                      </figcaption>
                    </div>
                    <blockquote className="mt-3 text-[12px] leading-relaxed text-ink/75">
                      “{r.text}”
                    </blockquote>
                  </motion.figure>
                )}
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="mt-2 flex justify-center gap-1.5">
            {reviews.map((_, i) => (
              <button
                key={i}
                aria-label={`Testimonial ${i + 1}`}
                onClick={() => swiper.current?.slideToLoop(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? "w-5 bg-brand" : "w-1.5 bg-brand/25"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
