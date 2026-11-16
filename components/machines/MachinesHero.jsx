import Link from "next/link";
import {
  ChevronRight,
  Crosshair,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

export default function MachinesHero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-[#e6eef9] bg-[#eaf2ff]">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.95),transparent_42%),linear-gradient(110deg,#f7faff_0%,#e8f1ff_52%,#d9e9ff_100%)]" />
      <div className="mx-auto grid min-h-[265px] max-w-[1440px] items-center gap-6 px-5 py-9 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-10 lg:py-0">
        <div className="relative z-10 py-2 lg:py-8">
          <div className="mb-4 flex items-center gap-2 text-[11px] font-semibold text-[#61718d]">
            <Link href="/" className="hover:text-[#0866f5]">
              Home
            </Link>
            <ChevronRight size={13} />
            <span className="text-[#14264b]">Products</span>
          </div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#cfe0fa] bg-white/80 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#0866f5]">
            <Sparkles size={13} /> Precision Laser Solutions
          </div>
          <h1 className="text-[42px] font-extrabold leading-[1.04] tracking-[-0.045em] text-[#102044] sm:text-[54px]">
            Our <span className="text-[#0866f5]">Products</span>
          </h1>
          <p className="mt-4 max-w-[510px] text-[14px] leading-[1.75] text-[#52627e] sm:text-[15px]">
            Explore our complete range of laser cutting, engraving and marking
            machines designed for high precision, speed and industrial
            performance.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-2 rounded-lg border border-[#d9e7fb] bg-white/80 px-3 py-2 text-[10px] font-bold text-[#233b64]">
              <Crosshair size={16} className="text-[#0866f5]" /> High Precision
            </span>
            <span className="inline-flex items-center gap-2 rounded-lg border border-[#d9e7fb] bg-white/80 px-3 py-2 text-[10px] font-bold text-[#233b64]">
              <Zap size={16} className="text-[#0866f5]" /> Reliable Performance
            </span>
            <span className="inline-flex items-center gap-2 rounded-lg border border-[#d9e7fb] bg-white/80 px-3 py-2 text-[10px] font-bold text-[#233b64]">
              <ShieldCheck size={16} className="text-[#0866f5]" /> Industrial
              Grade
            </span>
          </div>
        </div>
        <div className="relative hidden h-[265px] overflow-hidden lg:block">
          <div className="absolute -left-8 top-[-55px] z-10 h-[390px] w-[135px] -skew-x-[27deg] border-r-[10px] border-white/80 bg-[#a9ccff]/50" />
          <img
            src="/machines/products-hero.jpg"
            alt="Ci Laser industrial laser cutting in action"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#eaf2ff] via-transparent to-transparent" />
        </div>
        <div className="relative h-[190px] overflow-hidden rounded-2xl lg:hidden">
          <img
            src="/machines/products-hero.jpg"
            alt="Ci Laser industrial laser cutting in action"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
