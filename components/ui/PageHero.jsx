import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Sparkles } from "lucide-react";

export default function PageHero({
  eyebrow,
  title,
  highlight,
  description,
  bannerImage,
  breadcrumbs, 
  compact = false, 
  children,
}) {
  const crumbs = breadcrumbs || [
    { label: "Home", href: "/" },
    { label: `${title} ${highlight}` },
  ];
  return (
    <section
      className={`relative isolate flex items-center overflow-hidden border-b border-[#e6eef9] bg-[#eaf2ff] ${
           "min-h-[320px] sm:min-h-[380px] lg:min-h-[560px]"
      }`}
    >
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

      <div
        className={`mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-10 ${
          compact
            ? "pb-24 pt-10 sm:pb-28 lg:pb-32 lg:pt-12"
            : "py-16 sm:py-20 lg:py-24"
        }`}
      >
        <nav
          aria-label="Breadcrumb"
          className="mb-5 flex flex-wrap items-center gap-2 text-[14px] font-semibold text-[#61718d] sm:text-[15px]"
        >
          {crumbs.map((crumb, i) => (
            <span key={`${crumb.label}-${i}`} className="inline-flex items-center gap-2">
              {i > 0 && <ChevronRight size={16} />}
              {crumb.href ? (
                <Link href={crumb.href} className="hover:text-[#0866f5]">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-[#14264b]">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>

        {eyebrow && (
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#cfe0fa] bg-white/80 px-4 py-2 text-[13px] font-extrabold uppercase tracking-[0.16em] text-[#0866f5] sm:text-[14px]">
            <Sparkles size={16} /> {eyebrow}
          </div>
        )}

        <h1 className="text-[52px] font-extrabold leading-[1.04] tracking-[-0.045em] text-[#102044] sm:text-[68px] lg:text-[76px]">
          {title}{" "}
          {highlight && <span className="text-[#0866f5]">{highlight}</span>}
        </h1>

        {description && (
          <p className="mt-5 max-w-[680px] text-[17px] leading-[1.75] text-[#52627e] sm:text-[19px] lg:text-[20px]">
            {description}
          </p>
        )}

        {children}
      </div>
    </section>
  );
}