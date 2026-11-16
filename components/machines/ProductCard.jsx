"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, Check, Mail } from "lucide-react";
import { formatPrice } from "@/lib/products";

export default function ProductCard({ product }) {
  // Optional hover preview: only products with a `video` field get one.
  const videoRef = useRef(null);
  const hasVideo = Boolean(product.video);

  const playVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {});
  };

  const stopVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
  };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[18px] border border-[#e0e9f5] bg-white shadow-[0_5px_18px_rgba(18,55,105,0.035)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#b8d2f7] hover:shadow-[0_18px_38px_rgba(20,75,150,0.11)]">
      <Link
        href={product.source}
        target="_blank"
        onMouseEnter={hasVideo ? playVideo : undefined}
        onMouseLeave={hasVideo ? stopVideo : undefined}
        onFocus={hasVideo ? playVideo : undefined}
        onBlur={hasVideo ? stopVideo : undefined}
        className="relative block h-[220px] overflow-hidden bg-[linear-gradient(145deg,#f5f9ff,#edf4ff)] p-5"
      >
        <span className="absolute left-4 top-4 z-10 rounded-full border border-[#d9e8ff] bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#1764cf]">
          {product.categoryLabel}
        </span>
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className={`h-full w-full object-contain transition-transform duration-500 ${
            hasVideo ? "" : "group-hover:scale-[1.045]"
          }`}
          onError={(event) => {
            event.currentTarget.style.opacity = "0";
          }}
        />
        {hasVideo ? (
          <video
            ref={videoRef}
            src={product.video}
            poster={product.image}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100"
          />
        ) : (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="rounded-full bg-white/95 px-4 py-2 text-xs font-bold text-[#0758c9] shadow-lg">
              View product <ArrowRight className="ml-1 inline" size={13} />
            </span>
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
        <div className="mb-2 flex items-start justify-between gap-3">
          <h3 className="line-clamp-2 min-h-[48px] text-[16px] font-extrabold leading-6 tracking-[-0.02em] text-[#101d3d]">
            {product.name}
          </h3>
        </div>
        <p className="line-clamp-2 min-h-[42px] text-[12px] leading-[1.7] text-[#687792]">
          {product.description}
        </p>

        <div className="mt-4 rounded-xl bg-[#f5f8fd] px-3.5 py-3">
          <div className="mb-2 text-[9px] font-bold uppercase tracking-[0.15em] text-[#8794aa]">
            Product highlights
          </div>
          <ul className="space-y-1.5">
            {product.specs.map((spec) => (
              <li
                key={spec}
                className="flex items-start gap-2 text-[11px] font-medium leading-4 text-[#34435f]"
              >
                <Check className="mt-[1px] shrink-0 text-[#0866f5]" size={13} />
                <span>{spec}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto pt-4">
          <div className="mb-3 flex items-end justify-between gap-2">
            <div>
              <span className="block text-[9px] font-bold uppercase tracking-[0.13em] text-[#8a96aa]">
                Listed price
              </span>
              <span className="mt-1 block text-[19px] font-extrabold tracking-tight text-[#0c2452]">
                {formatPrice(product.price)}
                <span className="ml-1 text-[10px] font-semibold text-[#8793a8]">
                  /{product.priceUnit}
                </span>
              </span>
            </div>
            <span className="rounded-lg bg-[#eaf2ff] px-2.5 py-1.5 text-[10px] font-bold text-[#1764cf]">
              CI Laser
            </span>
          </div>
          <div className="grid grid-cols-[1fr_1fr] gap-2">
            <Link
              href={product.source}
              target="_blank"
              className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-lg bg-[#0866f5] px-3 text-[11px] font-bold text-white transition-colors hover:bg-[#0754d2]"
            >
              View Details <ArrowRight size={14} />
            </Link>
            <Link
              href={product.source}
              target="_blank"
              className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-lg border border-[#b9cbe4] bg-white px-2 text-[11px] font-bold text-[#18315b] transition-all hover:border-[#0866f5] hover:bg-[#f2f7ff]"
            >
              <Mail size={14} /> Get Quote
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}