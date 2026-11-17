"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Download,
  ImageIcon,
  LayoutGrid,
  ListChecks,
  Mail,
  Maximize2,
  Minus,
  Package,
  Play,
  Plus,
  ShieldCheck,
  Star,
  X,
} from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import QuoteModal from "@/components/QuoteModal";
import { Icon } from "@/components/product/icons";
import { formatPriceNumber } from "@/lib/products";


const HEADER_OFFSET = 150; 

const wrap = "mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-10";

const card =
  "rounded-[22px] border border-[#e1ebf8] bg-white shadow-[0_18px_44px_-28px_rgba(10,47,134,0.38)]";

function SafeImage({ src, alt, className, fallback = null, hideUntilLoaded = false, ...rest }) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const ref = useRef(null);

  // Images that finished loading before hydration never fire onLoad
  useEffect(() => {
    const el = ref.current;
    if (el && el.complete && el.naturalWidth > 0) setLoaded(true);
  }, []);

  if (failed) return fallback;
  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      loading="lazy"
      className={`${className} ${hideUntilLoaded && !loaded ? "opacity-0" : ""}`}
      onLoad={() => setLoaded(true)}
      onError={() => setFailed(true)}
      {...rest}
    />
  );
}

function SectionHead({ eyebrow, title, action }) {
  return (
    <div className="mb-9 flex flex-wrap items-end justify-between gap-4">
      <div>
        <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#0866f5]">
          {eyebrow}
        </span>
        <h2 className="mt-2 text-[30px] font-extrabold leading-tight tracking-[-0.03em] text-[#0b1b4d] sm:text-[38px]">
          {title}
        </h2>
        <span className="mt-4 block h-1 w-14 rounded-full bg-gradient-to-r from-[#0866f5] to-[#7db0ff]" />
      </div>
      {action}
    </div>
  );
}

function Band({ id, tone = "white", children }) {
  const bg =
    tone === "tint"
      ? "bg-[linear-gradient(180deg,#f1f6ff,#eaf2ff)]"
      : "bg-white";
  return (
    <section id={id} className={`scroll-mt-[140px] py-16 lg:py-20 ${bg}`}>
      <div className={wrap}>{children}</div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Lightbox                                                           */
/* ------------------------------------------------------------------ */

function Lightbox({ images, index, onClose, onChange }) {
  const count = images.length;
  const go = useCallback(
    (dir) => onChange((index + dir + count) % count),
    [index, count, onChange]
  );

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [go, onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[110] flex items-center justify-center bg-[#050d24]/85 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
    >
      <button
        onClick={onClose}
        aria-label="Close viewer"
        className="absolute right-4 top-4 rounded-full bg-white/90 p-2.5 text-[#0b1b4d] transition hover:bg-white"
      >
        <X size={20} />
      </button>
      {count > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              go(-1);
            }}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 text-[#0b1b4d] transition hover:bg-white sm:left-6"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              go(1);
            }}
            aria-label="Next image"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 text-[#0b1b4d] transition hover:bg-white sm:right-6"
          >
            <ChevronRight size={22} />
          </button>
        </>
      )}
      <div
        className="max-h-[88vh] w-full max-w-5xl rounded-3xl bg-white p-4 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={images[index].src}
          alt={images[index].alt}
          className="mx-auto max-h-[76vh] w-auto max-w-full object-contain"
        />
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Top panel: gallery + summary                                       */
/* ------------------------------------------------------------------ */

function Gallery({ product, active, setActive, onExpand }) {
  const { gallery, name } = product;
  return (
    <div className="flex gap-2.5 sm:gap-3">
      {/* thumbnails */}
      <div className="flex w-[56px] shrink-0 flex-col gap-2 sm:w-[68px]">
        {gallery.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Show image ${i + 1}`}
            aria-current={i === active}
            className={`aspect-square overflow-hidden rounded-xl border-2 bg-white p-1 transition ${
              i === active
                ? "border-[#0866f5] shadow-[0_10px_22px_-10px_rgba(8,102,245,0.6)]"
                : "border-[#e6eef9] hover:border-[#9fc2f7]"
            }`}
          >
            <SafeImage
              src={img.src}
              alt=""
              className="h-full w-full rounded-lg object-contain"
            />
          </button>
        ))}
      </div>

      {/* main image */}
      <div className="relative min-h-[280px] flex-1 overflow-hidden rounded-[22px] border border-[#e6eef9] bg-white sm:min-h-[400px]">
        <span className="absolute left-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full border border-[#d6e6ff] bg-white/90 px-3 py-1.5 text-[11px] font-bold text-[#0b57d0] backdrop-blur">
          <ShieldCheck size={14} /> CI Laser
        </span>
        <button
          type="button"
          onClick={onExpand}
          aria-label="View full size"
          className="absolute right-4 top-4 z-10 rounded-xl border border-[#e6eef9] bg-white p-2.5 text-[#0b1b4d] shadow-card transition hover:text-[#0866f5]"
        >
          <Maximize2 size={18} />
        </button>
        {/* soft floor shadow */}
        <div className="pointer-events-none absolute bottom-10 left-1/2 h-8 w-[62%] -translate-x-1/2 rounded-[50%] bg-white blur-2xl" />
        <AnimatePresence mode="wait">
          <motion.div
            key={gallery[active].src}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 flex items-center justify-center p-6 pb-8 sm:p-8 sm:pb-10"
          >
            <img
              src={gallery[active].src}
              alt={gallery[active].alt || name}
              className="max-h-full max-w-full object-contain"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function Summary({ product, onQuote }) {
  return (
    <div className="flex flex-col justify-center">
      <span className="w-fit rounded-full border border-[#cfe0ff] bg-[#eaf2ff] px-3.5 py-1 text-[11px] font-extrabold tracking-wide text-[#1764cf]">
        {product.badge}
      </span>
      <h2 className="mt-3 text-[28px] font-extrabold leading-[1.05] tracking-[-0.035em] text-[#0b1b4d] sm:text-[36px] xl:text-[40px]">
        {product.name}
      </h2>

      <div className="mt-3 flex flex-wrap items-end gap-x-3 gap-y-1">
        <span className="bg-gradient-to-r from-[#0b57d0] to-[#2f8bff] bg-clip-text text-[28px] font-extrabold tracking-tight text-transparent sm:text-[32px]">
          ₹ {formatPriceNumber(product.price)}
        </span>
        <span className="pb-1 text-[15px] font-bold text-[#0b1b4d]">
          / {product.priceUnit}
        </span>
        <span className="mb-1.5 rounded-md bg-[#eaf2ff] px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#1764cf]">
          Listed price
        </span>
      </div>

      <p className="mt-3 max-w-xl text-[14px] leading-6 text-[#4b5b78]">
        {product.summary}
      </p>

      {/* Quick specs: compact tile grid */}
      <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {product.quickSpecs.map((row) => (
          <li
            key={row.label}
            className="group flex items-center gap-3 rounded-xl border border-[#dfeafb] bg-[linear-gradient(180deg,#ffffff,#f1f6ff)] px-3 py-2.5 transition hover:border-[#9fc2f7] hover:shadow-[0_10px_22px_-14px_rgba(10,47,134,0.5)]"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[linear-gradient(145deg,#2a85ff,#0b57d0)] text-white shadow-[0_8px_16px_-8px_rgba(11,87,208,0.8)]">
              <Icon name={row.icon} size={17} />
            </span>
            <span className="text-[13px] font-bold leading-snug text-[#14234d]">
              {row.label}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={onQuote}
          className="group relative inline-flex min-h-[50px] items-center justify-center gap-2.5 overflow-hidden rounded-xl bg-[linear-gradient(180deg,#2a85ff,#0b57d0)] px-5 text-[14px] font-bold text-white shadow-[0_16px_30px_-14px_rgba(11,87,208,0.9)] transition hover:shadow-[0_20px_36px_-12px_rgba(11,87,208,1)]"
        >
          <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 skew-x-[-20deg] bg-white/25 opacity-0 transition-all duration-700 group-hover:left-[130%] group-hover:opacity-100" />
          <Mail size={18} /> Get a Quote
        </button>
        <a
          href={product.brochure}
          download
          className="inline-flex min-h-[50px] items-center justify-center gap-2.5 rounded-xl border-2 border-[#0b57d0] bg-white px-5 text-[14px] font-bold text-[#0b1b4d] transition hover:bg-[#f2f7ff]"
        >
          <Download size={18} /> Download Brochure
        </a>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Sticky tab bar (full-width band)                                   */
/* ------------------------------------------------------------------ */

function Tabs({ tabs, active, onSelect }) {
  return (
    <div className="sticky top-[76px] z-30 border-y border-[#e1ebf8] bg-white/90 backdrop-blur-xl">
      <div className={`${wrap} py-3`}>
        <nav
          aria-label="Product sections"
          className="flex gap-1 overflow-x-auto rounded-2xl border border-[#e2ebf7] bg-[#f7faff] p-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {tabs.map((tab) => {
            const on = tab.id === active;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onSelect(tab.id)}
                aria-current={on ? "true" : undefined}
                className={`flex min-w-fit flex-1 items-center justify-center gap-2.5 whitespace-nowrap rounded-xl px-4 py-3 text-[13px] font-bold transition-all sm:text-[14px] ${
                  on
                    ? "bg-[linear-gradient(180deg,#1b78ff,#0b57d0)] text-white shadow-[0_12px_24px_-10px_rgba(11,87,208,0.9)]"
                    : "text-[#1c2b52] hover:bg-white"
                }`}
              >
                <tab.icon size={18} strokeWidth={1.9} />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Sections                                                           */
/* ------------------------------------------------------------------ */

function Overview({ product }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const hasVideo = Boolean(product.video);

  const play = () => {
    const v = videoRef.current;
    if (!v) return;
    v.controls = true;
    v.muted = false;
    v.play().then(() => setPlaying(true)).catch(() => {});
  };

  return (
    <>
      <SectionHead eyebrow="At a glance" title="Product Overview" />
      <div className="grid items-stretch gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
        <div className="flex flex-col justify-center">
          <p className="max-w-2xl text-[16px] leading-8 text-[#34435f]">
            {product.overview}
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {product.highlights.map((h) => (
              <div
                key={h.label}
                className="group flex flex-col items-center gap-3 rounded-2xl border border-[#dfeafb] bg-[linear-gradient(180deg,#ffffff,#eef5ff)] px-3 py-6 text-center shadow-[0_14px_30px_-22px_rgba(10,47,134,0.5)] transition hover:-translate-y-1 hover:border-[#9fc2f7]"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[linear-gradient(145deg,#2a85ff,#0b57d0)] text-white shadow-[0_12px_22px_-10px_rgba(11,87,208,0.8)]">
                  <Icon name={h.icon} size={26} strokeWidth={1.6} />
                </span>
                <span className="text-[13.5px] font-bold leading-tight text-[#14234d]">
                  {h.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative min-h-[300px] overflow-hidden rounded-[28px] bg-[linear-gradient(150deg,#0e1b3d,#1c2f5f)] shadow-[0_30px_60px_-30px_rgba(10,47,134,0.7)] ring-1 ring-[#0b57d0]/10 sm:min-h-[400px]">
          {hasVideo ? (
            <video
              ref={videoRef}
              src={`${product.video}#t=0.6`}
              poster={product.image}
              muted
              playsInline
              preload="metadata"
              onEnded={() => setPlaying(false)}
              onPause={() => setPlaying(false)}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <img
              src={product.image}
              alt={product.name}
              className="absolute inset-0 h-full w-full bg-[radial-gradient(circle_at_50%_40%,#ffffff,#eaf2ff)] object-contain p-10"
            />
          )}
          {hasVideo && !playing && (
            <button
              type="button"
              onClick={play}
              aria-label={`Play ${product.name} video`}
              className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/45 via-black/10 to-transparent"
            >
              <span className="relative flex h-[84px] w-[84px] items-center justify-center rounded-full bg-white/20 ring-2 ring-white/90 backdrop-blur-sm transition hover:scale-105">
                <span className="absolute inset-0 animate-ripple rounded-full bg-white/30" />
                <Play size={32} className="relative translate-x-0.5 fill-white text-white" />
              </span>
            </button>
          )}
        </div>
      </div>
    </>
  );
}

function Specifications({ product }) {
  return (
    <>
      <SectionHead eyebrow="Built to perform" title="Technical Specifications" />
      <div className={`${card} overflow-hidden`}>
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-[linear-gradient(90deg,#0a47c4,#1b78ff)] text-white">
              <th className="w-[42%] px-5 py-4 text-[14px] font-bold tracking-wide sm:px-10">
                Parameter
              </th>
              <th className="border-l border-white/25 px-5 py-4 text-[14px] font-bold tracking-wide sm:px-10">
                Details
              </th>
            </tr>
          </thead>
          <tbody>
            {product.specifications.map((row, i) => (
              <tr
                key={row.parameter}
                className={`border-t border-[#e3ecf8] transition-colors hover:bg-[#eef5ff] ${
                  i % 2 ? "bg-[#f7faff]" : "bg-white"
                }`}
              >
                <th className="px-5 py-3.5 text-[14.5px] font-bold text-[#14234d] sm:px-10">
                  {row.parameter}
                </th>
                <td className="border-l border-[#e3ecf8] px-5 py-3.5 text-[14.5px] font-medium text-[#34435f] sm:px-10">
                  {row.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function Features({ product }) {
  return (
    <>
      <SectionHead eyebrow="Why choose it" title="Key Features" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {product.features.map((f) => (
          <div
            key={f.title}
            className={`${card} group flex items-start gap-5 p-6 transition hover:-translate-y-1 hover:border-[#9fc2f7]`}
          >
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(145deg,#eaf2ff,#d9e9ff)] text-[#0b57d0] transition group-hover:bg-[linear-gradient(145deg,#2a85ff,#0b57d0)] group-hover:text-white">
              <Icon name={f.icon} size={28} strokeWidth={1.6} />
            </span>
            <div>
              <h3 className="text-[16.5px] font-extrabold text-[#0b1b4d]">{f.title}</h3>
              <p className="mt-1.5 text-[14px] leading-6 text-[#4b5b78]">{f.text}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function Applications({ product }) {
  return (
    <>
      <SectionHead eyebrow="Where it works" title="Applications" />
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
        {product.applications.map((a) => (
          <div
            key={a.name}
            className={`${card} group overflow-hidden transition hover:-translate-y-1 hover:border-[#9fc2f7]`}
          >
            <div className="relative aspect-[4/3.3] overflow-hidden bg-[linear-gradient(145deg,#c9d3e3,#eef2f8_55%,#aab7cc)]">
              <div className="absolute inset-0 flex items-center justify-center text-[#5d7094]/70">
                <Icon name={a.icon} size={46} strokeWidth={1.3} />
              </div>
              <SafeImage
                src={a.image}
                alt=""
                hideUntilLoaded
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            <div className="m-2.5 rounded-xl bg-[#e8f1ff] px-2 py-2.5 text-center text-[13px] font-bold text-[#14234d]">
              {a.name}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}



function Faqs({ product, onQuote }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="grid gap-10 lg:grid-cols-[0.8fr_1.6fr] lg:gap-16">
      <div>
        <SectionHead eyebrow="Good to know" title="Frequently Asked Questions" />
        <p className="-mt-2 max-w-sm text-[14.5px] leading-7 text-[#4b5b78]">
          Can&apos;t find what you&apos;re looking for? Our team will help you pick the right
          configuration for your material and production needs.
        </p>
        <button
          type="button"
          onClick={onQuote}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#0b57d0] px-5 py-3 text-[14px] font-bold text-white transition hover:bg-[#0a47ac]"
        >
          <Mail size={17} /> Ask our team
        </button>
      </div>
      <div className="space-y-4">
        {product.faqs.map((f, i) => {
          const on = open === i;
          return (
            <div
              key={f.q}
              className={`overflow-hidden rounded-2xl border bg-white transition-all ${
                on
                  ? "border-[#9fc2f7] shadow-[0_18px_40px_-26px_rgba(10,47,134,0.55)]"
                  : "border-[#e1ebf8]"
              }`}
            >
              <button
                type="button"
                onClick={() => setOpen(on ? -1 : i)}
                aria-expanded={on}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-[15.5px] font-bold text-[#0b1b4d]"
              >
                {f.q}
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors ${
                    on ? "bg-[#0b57d0] text-white" : "bg-[#eaf2ff] text-[#0b57d0]"
                  }`}
                >
                  {on ? <Minus size={17} /> : <Plus size={17} />}
                </span>
              </button>
              <AnimatePresence initial={false}>
                {on && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  >
                    <p className="px-6 pb-6 text-[14.5px] leading-7 text-[#4b5b78]">
                      {f.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Related({ items }) {
  if (!items.length) return null;
  return (
    <>
      <SectionHead
        eyebrow="You may also like"
        title="Related Products"
        action={
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-[14px] font-bold text-[#0b57d0] hover:underline"
          >
            View All Products <ArrowRight size={16} />
          </Link>
        }
      />
      <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
        {items.map((item) => (
          <Link
            key={item.id}
            href={`/products/${item.slug}`}
            className={`${card} group flex flex-col overflow-hidden transition hover:-translate-y-1.5 hover:border-[#9fc2f7]`}
          >
            <div className="flex h-[200px] items-center justify-center bg-white p-5">
              <SafeImage
                src={item.image}
                alt={item.name}
                className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-1 items-end justify-between gap-3 border-t border-[#e8f0fb] px-5 py-4">
              <span className="text-[15.5px] font-extrabold leading-snug text-[#0b1b4d]">
                {item.name}
              </span>
              <ArrowRight
                size={18}
                className="shrink-0 text-[#0866f5] transition group-hover:translate-x-1"
              />
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

function QuoteBand({ product, onQuote }) {
  return (
    <section className="relative isolate overflow-hidden bg-[linear-gradient(120deg,#05143f,#0a2f86_55%,#0b57d0)]">
      <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 left-1/4 h-72 w-72 rounded-full bg-[#4c8dff]/30 blur-3xl" />
      <div className={`${wrap} flex flex-col items-start justify-between gap-6 py-14 lg:flex-row lg:items-center`}>
        <div>
          <h2 className="text-[28px] font-extrabold tracking-[-0.03em] text-white sm:text-[36px]">
            Interested in the {product.name}?
          </h2>
          <p className="mt-2 max-w-2xl text-[15px] leading-7 text-white/75">
            Tell us about your material, thickness and production volume and we&apos;ll
            recommend the right configuration with a tailored quote.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onQuote}
            className="inline-flex min-h-[54px] items-center gap-2.5 rounded-2xl bg-white px-7 text-[15px] font-bold text-[#0a2f86] shadow-[0_18px_34px_-14px_rgba(0,0,0,0.5)] transition hover:bg-[#eaf2ff]"
          >
            <Mail size={18} /> Get a Quote
          </button>
          <a
            href={product.brochure}
            download
            className="inline-flex min-h-[54px] items-center gap-2.5 rounded-2xl border border-white/40 px-7 text-[15px] font-bold text-white transition hover:bg-white/10"
          >
            <Download size={18} /> Brochure
          </a>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function ProductDetail({ product, related }) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(null);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [tab, setTab] = useState("overview");
  const clicking = useRef(false);

  // Reset when navigating between products (same route, new props)
  useEffect(() => {
    setActive(0);
    setLightbox(null);
    setTab("overview");
  }, [product.slug]);

  const tabs = [
    { id: "overview", label: "Product Overview", icon: Package },
    { id: "specifications", label: "Technical Specifications", icon: ListChecks },
    { id: "features", label: "Key Features", icon: Star },
    { id: "applications", label: "Applications", icon: LayoutGrid },
    { id: "gallery", label: "Gallery", icon: ImageIcon },
    { id: "faqs", label: "FAQs", icon: CircleHelp },
  ];

  // Scroll-spy: highlight the tab for the section currently in view
  useEffect(() => {
    const onScroll = () => {
      if (clicking.current) return;
      let current = tabs[0].id;
      for (const t of tabs) {
        const el = document.getElementById(t.id);
        if (el && el.getBoundingClientRect().top - HEADER_OFFSET - 40 <= 0) {
          current = t.id;
        }
      }
      setTab(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.slug]);

  const selectTab = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    setTab(id);
    clicking.current = true;
    const y = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET + 30;
    window.scrollTo({ top: y, behavior: "smooth" });
    setTimeout(() => (clicking.current = false), 900);
  };

  const openQuote = () => setQuoteOpen(true);

  return (
    <div className="bg-[#f8faff] text-[#101d3d]">
      <PageHero
        compact
        eyebrow={product.categoryLabel}
        title={product.name}
        bannerImage="/all_products_bann.png"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: product.name },
        ]}
      />

      <div className={`${wrap} relative z-10 mt-6`}>
        <div className="rounded-[26px] border border-[#e1ebf8] bg-white p-3 shadow-[0_30px_70px_-40px_rgba(10,47,134,0.45)] sm:p-4 lg:p-5">
          <div className="grid items-center gap-6 lg:grid-cols-[1.1fr_1fr] xl:gap-10">
            <Gallery
              product={product}
              active={active}
              setActive={setActive}
              onExpand={() => setLightbox(active)}
            />
            <Summary product={product} onQuote={openQuote} />
          </div>
        </div>
      </div>

      {/* Tabs + full-width sections */}
      <div className="mt-14">
        <Tabs tabs={tabs} active={tab} onSelect={selectTab} />

        <Band id="overview">
          <Overview product={product} />
        </Band>
        <Band id="specifications" tone="tint">
          <Specifications product={product} />
        </Band>
        <Band id="features">
          <Features product={product} />
        </Band>
        <Band id="applications" tone="tint">
          <Applications product={product} />
        </Band>
        <Band id="faqs" tone="tint">
          <Faqs product={product} onQuote={openQuote} />
        </Band>
        <Band id="related">
          <Related items={related} />
        </Band>
      </div>

      <QuoteBand product={product} onQuote={openQuote} />

      <AnimatePresence>
        {lightbox !== null && (
          <Lightbox
            images={product.gallery}
            index={lightbox}
            onClose={() => setLightbox(null)}
            onChange={setLightbox}
          />
        )}
      </AnimatePresence>

      <QuoteModal
        open={quoteOpen}
        onClose={() => setQuoteOpen(false)}
        product={product.name}
      />
    </div>
  );
}