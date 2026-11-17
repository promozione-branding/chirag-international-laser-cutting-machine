"use client";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { motion } from "framer-motion";
import {
  Box,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Layers,
  MapPin,
  Settings,
  Sparkles,
  Star,
} from "lucide-react";

const reviews = [
  { name: "Dharmendra Sharma", place: "Bagaha, Bihar", product: "Laser Engraving Machines", date: "Nov 2026" },
  { name: "Sarfaraz Ahmad", place: "Baikunthpur, Chhattisgarh", product: "Laser Cutting Machines", date: "Sep 2026" },
  { name: "Fardeen", place: "Ghaziabad, Uttar Pradesh", product: "Double Head Laser Cutting Machine", date: "Jul 2026" },
  { name: "Sajid Ali", place: "Greater Noida, Uttar Pradesh", product: "Sheet Metal Cutting Machine", date: "Jul 2026" },
  { name: "Sakshi Shukla", place: "New Delhi, Delhi", product: "Co2 Laser Marking Machine", date: "Jan 2026" },
  { name: "Nikhil", place: "Chandigarh", product: "Fiber Laser Cutting Machine", date: "Jan 2026" },
  { name: "Abhas Sarkar", place: "Sonipat, Haryana", product: "Fiber Laser Cutting Machine", date: "Dec 2025" },
  { name: "Virender Kumar", place: "Ghaziabad, Uttar Pradesh", product: "Fiber Laser Marker", date: "Jan 2025" },
];

const OVERALL = 4.3;
const PRODUCT_ICONS = [Box, Settings, Layers, Sparkles];

const initials = (n) =>
  n.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();

/* Star row that supports decimals (e.g. 4.3) */
function Stars({ value, size = 16, light = false }) {
  const base = light ? "text-white/30" : "text-brand/20";
  const fill = light ? "text-white" : "text-brand";
  return (
    <div className="relative inline-flex" aria-label={`${value} out of 5 stars`}>
      <div className={`flex gap-0.5 ${base}`}>
        {Array.from({ length: 5 }, (_, i) => (
          <Star key={i} size={size} fill="currentColor" strokeWidth={0} />
        ))}
      </div>
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${(value / 5) * 100}%` }}>
        <div className={`flex gap-0.5 ${fill}`} style={{ width: "max-content" }}>
          {Array.from({ length: 5 }, (_, i) => (
            <Star key={i} size={size} fill="currentColor" strokeWidth={0} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* Laurel branch made of leaves along a curve */
function Laurel({ flip = false }) {
  const P0 = [34, 6], C = [2, 50], P2 = [34, 94];
  const leaves = Array.from({ length: 10 }, (_, i) => {
    const t = (i + 0.5) / 10;
    const x = (1 - t) ** 2 * P0[0] + 2 * (1 - t) * t * C[0] + t ** 2 * P2[0];
    const y = (1 - t) ** 2 * P0[1] + 2 * (1 - t) * t * C[1] + t ** 2 * P2[1];
    const dx = 2 * (1 - t) * (C[0] - P0[0]) + 2 * t * (P2[0] - C[0]);
    const dy = 2 * (1 - t) * (C[1] - P0[1]) + 2 * t * (P2[1] - C[1]);
    const ang = (Math.atan2(dy, dx) * 180) / Math.PI;
    return { x, y, ang };
  });
  return (
    <svg
      viewBox="0 0 40 100"
      className="h-24 w-10 text-brand"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
      aria-hidden="true"
    >
      <path d={`M${P0[0]} ${P0[1]} Q${C[0]} ${C[1]} ${P2[0]} ${P2[1]}`} fill="none" stroke="currentColor" strokeWidth="1.2" />
      {leaves.flatMap((l, i) => [
        <ellipse key={`o${i}`} cx={l.x - 3.5} cy={l.y} rx="2.6" ry="7" fill="currentColor"
          transform={`rotate(${l.ang - 90 + 35} ${l.x - 3.5} ${l.y})`} />,
        <ellipse key={`i${i}`} cx={l.x + 3.5} cy={l.y} rx="2.4" ry="6" fill="currentColor"
          transform={`rotate(${l.ang - 90 - 35} ${l.x + 3.5} ${l.y})`} />,
      ])}
    </svg>
  );
}

const QuoteMark = ({ className = "" }) => (
  <svg viewBox="0 0 32 28" className={className} fill="currentColor" aria-hidden="true">
    <path d="M0 28V16.5C0 7.2 5 1.4 13.5 0l1.3 3.6C10.2 5 8.2 8 8 11.5h6V28H0Zm18 0V16.5C18 7.2 23 1.4 31.5 0l1.3 3.6C28.200 5 26.200 8 26 11.500h6V28H18Z" />
  </svg>
);

export default function Testimonials() {
  const swiper = useRef(null);
  const [active, setActive] = useState(0);
  const [pages, setPages] = useState(2);
  const [first, setFirst] = useState(0); // real index of first visible slide
  const [offset, setOffset] = useState(0); // which visible slide is highlighted
  const [hover, setHover] = useState(null);

  const sync = (s) => {
    const group = s.params.slidesPerGroup || 1;
    const view = s.params.slidesPerView || 1;
    setPages(Math.ceil(reviews.length / group));
    setActive(Math.floor(s.realIndex / group));
    setFirst(s.realIndex);
    setOffset(view > 1 ? 1 : 0);
  };

  const featured = hover ?? (first + offset) % reviews.length;

  const arrow =
    "absolute top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-brand/40 bg-white text-brand shadow-[0_8px_20px_-8px_rgba(11,91,245,0.5)] transition-colors hover:bg-brand hover:text-white";

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-[#f3f7ff] py-14">
      {/* dotted corner decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 hidden h-40 w-72 text-brand/20 lg:block"
        style={{
          backgroundImage: "radial-gradient(currentColor 1.5px, transparent 1.5px)",
          backgroundSize: "18px 18px",
          maskImage: "linear-gradient(to bottom left, black, transparent 75%)",
          WebkitMaskImage: "linear-gradient(to bottom left, black, transparent 75%)",
        }}
      />

      <div className="container-x relative">
        <div className="flex items-center gap-3">
          <span className="h-0.5 w-10 bg-brand" />
          <span className="text-sm font-bold uppercase tracking-[0.3em] text-brand">Testimonials</span>
        </div>

        <div className="mt-3 flex flex-col gap-8 lg:flex-row lg:items-center">
          <h2 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-[#0b1a44] sm:text-5xl">
            What Our
            <br />
            <span className="text-brand">Customers Say</span>
          </h2>

          <div className="hidden h-24 w-px bg-ink/10 lg:ml-6 lg:block" />

          <div className="flex items-center justify-center gap-1 lg:mx-auto">
            <Laurel />
            <div className="text-center">
              <div className="flex justify-center">
                <Stars value={OVERALL} size={22} />
              </div>
              <div className="mt-1 text-5xl font-extrabold tracking-tight text-[#0b1a44]">
                {OVERALL}/5
              </div>
              <div className="mt-1 text-sm font-medium text-ink/80">From 77 customer reviews</div>
            </div>
            <Laurel flip />
          </div>

          <div className="hidden h-24 w-px bg-ink/10 lg:block" />

          <p className="max-w-xs text-[15px] leading-relaxed text-ink/70 lg:ml-2">
            Real feedback from businesses that trust our laser cutting solutions for quality,
            precision and performance.
          </p>
        </div>
      </div>

      <div className="relative mt-8 w-full px-4 sm:px-16">
        <button aria-label="Previous" onClick={() => swiper.current?.slidePrev(800)} className={`${arrow} left-2`}>
          <ChevronLeft size={18} />
        </button>
        <button aria-label="Next" onClick={() => swiper.current?.slideNext(800)} className={`${arrow} right-2`}>
          <ChevronRight size={18} />
        </button>

        <Swiper
          modules={[Autoplay]}
          loop
          speed={800}
          grabCursor
          spaceBetween={24}
          autoplay={{ delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true }}
          breakpoints={{
            0: { slidesPerView: 1, slidesPerGroup: 1 },
            640: { slidesPerView: 2, slidesPerGroup: 2 },
            1024: { slidesPerView: 4, slidesPerGroup: 4 },
          }}
          onSwiper={(s) => {
            swiper.current = s;
            sync(s);
          }}
          onBreakpoint={sync}
          onSlideChange={sync}
          className="!px-8 !py-14"
        >
          {reviews.map((r, i) => {
            const isFeatured = i === featured;
            const Icon = PRODUCT_ICONS[i % PRODUCT_ICONS.length];
            const rating = r.rating ?? OVERALL;
            return (
              <SwiperSlide key={r.name} className="!h-auto">
                <motion.figure
                  onMouseEnter={() => setHover(i)}
                  onMouseLeave={() => setHover(null)}
                  animate={{ scale: isFeatured ? 1.07 : 1, y: isFeatured ? -6 : 0 }}
                  transition={{ type: "spring", stiffness: 160, damping: 18 }}
                  className={`relative flex h-full min-h-[300px] flex-col overflow-hidden rounded-3xl p-6 ${
                    isFeatured
                      ? "z-10 bg-gradient-to-br from-[#0b5bf5] via-[#0a47c4] to-[#072a80] text-white shadow-[0_30px_60px_-20px_rgba(11,91,245,0.65)]"
                      : "border border-brand/5 bg-white text-ink shadow-[0_20px_45px_-25px_rgba(11,60,160,0.35)]"
                  }`}
                >
                  {isFeatured && (
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -bottom-10 -right-10 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(255,170,60,0.55),transparent_65%)]"
                    />
                  )}

                  <QuoteMark
                    className={`absolute right-5 top-5 h-6 w-6 ${isFeatured ? "text-white/80" : "text-brand/25"}`}
                  />

                  {/* header */}
                  <div className="relative flex items-center gap-3">
                    <div
                      className={`grid h-14 w-14 shrink-0 place-items-center rounded-full text-lg font-bold ${
                        isFeatured ? "bg-white text-brand" : "bg-brand text-white"
                      }`}
                    >
                      {initials(r.name)}
                    </div>
                    <figcaption className="pr-8 leading-tight">
                      <div className={`text-base font-bold ${isFeatured ? "text-white" : "text-[#0b1a44]"}`}>
                        {r.name}
                      </div>
                      <div
                        className={`mt-1 flex items-center gap-1 text-xs ${
                          isFeatured ? "text-white/80" : "text-ink/60"
                        }`}
                      >
                        <MapPin size={12} className="shrink-0" /> {r.place}
                      </div>
                    </figcaption>
                  </div>

                  {/* stars */}
                  <div className="relative mt-4 flex items-center gap-2">
                    <Stars value={rating} size={17} light={isFeatured} />
                    <span className={`text-sm font-semibold ${isFeatured ? "text-white" : "text-ink/80"}`}>
                      {rating.toFixed(1)}
                    </span>
                  </div>

                  {/* body */}
                  <div className="relative mt-4 flex flex-1 flex-col justify-center">
                    {r.text ? (
                      <blockquote
                        className={`text-[15px] font-medium leading-snug ${
                          isFeatured ? "text-white" : "text-[#0b1a44]"
                        }`}
                      >
                        “{r.text}”
                      </blockquote>
                    ) : (
                      <div
                        className={`flex items-center gap-1.5 text-sm ${
                          isFeatured ? "text-white/80" : "text-ink/55"
                        }`}
                      >
                        <Calendar size={14} /> Customer since {r.date}
                      </div>
                    )}
                  </div>

                  {/* footer */}
                  <div
                    className={`relative mt-4 border-t pt-3 ${isFeatured ? "border-white/25" : "border-ink/10"}`}
                  >
                    <div
                      className={`mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] ${
                        isFeatured ? "text-white/70" : "text-brand"
                      }`}
                    >
                      Reviewed product
                    </div>
                    <div
                      className={`flex items-center gap-2.5 text-sm font-bold leading-snug ${
                        isFeatured
                          ? "w-fit max-w-full rounded-full border border-white/40 bg-white/10 px-4 py-2 text-white"
                          : "text-[#0b1a44]"
                      }`}
                    >
                      <Icon size={20} className={`shrink-0 ${isFeatured ? "text-white" : "text-brand"}`} />
                      <span className="text-xs">{r.product}</span>
                    </div>
                  </div>
                </motion.figure>
              </SwiperSlide>
            );
          })}
        </Swiper>

        <div className="mt-2 flex justify-center gap-2">
          {Array.from({ length: pages }, (_, i) => (
            <button
              key={i}
              aria-label={`Testimonial set ${i + 1}`}
              onClick={() => swiper.current?.slideToLoop(i * (swiper.current.params.slidesPerGroup || 1))}
              className={`h-2.5 w-2.5 rounded-full transition-colors duration-300 ${
                i === active ? "bg-brand" : "bg-brand/25"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}