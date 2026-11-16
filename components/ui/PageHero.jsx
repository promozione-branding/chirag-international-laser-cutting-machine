import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Sparkles } from "lucide-react";

export default function PageHero({
  eyebrow,
  title,
  highlight,
  description,
  bannerImage,
  children,
}) {
  return (
    <section className="relative isolate flex min-h-[320px] items-center overflow-hidden border-b border-[#e6eef9] bg-[#eaf2ff] sm:min-h-[380px] lg:min-h-[560px]">
      {bannerImage && (
        <Image
          src={bannerImage}
          alt=""
          fill
          priority
          className="object-cover object-center -z-20"
          sizes="100vw"
        />
      )}

      <div
        className={`absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.95),transparent_42%),linear-gradient(110deg,#f7faff_0%,#e8f1ff_52%,#d9e9ff_100%)] ${
          bannerImage ? "opacity-20" : ""
        }`}
      />

      <div className="mx-auto w-full max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="mb-4 flex items-center gap-2 text-[11px] font-semibold text-[#61718d]">
          <Link href="/" className="hover:text-[#0866f5]">
            Home
          </Link>
          <ChevronRight size={13} />
          <span className="text-[#14264b]">{`${title} ${highlight}`}</span>
        </div>

        {eyebrow && (
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#cfe0fa] bg-white/80 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#0866f5]">
            <Sparkles size={13} /> {eyebrow}
          </div>
        )}

        <h1 className="text-[42px] font-extrabold leading-[1.04] tracking-[-0.045em] text-[#102044] sm:text-[54px]">
          {title}{" "}
          {highlight && <span className="text-[#0866f5]">{highlight}</span>}
        </h1>

        {description && (
          <p className="mt-4 max-w-[560px] text-[14px] leading-[1.75] text-[#52627e] sm:text-[15px]">
            {description}
          </p>
        )}

        {children}
      </div>
    </section>
  );
}