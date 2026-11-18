import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Cog,
  Crosshair,
  Gem,
  Globe,
  Headphones,
  Package,
  ShieldCheck,
  Users,
} from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import { categories } from "@/lib/products";
import VisionMission from "@/components/VisionMission";
import CTA from "@/components/CTA";
import Story from "@/components/Story";

export const metadata = {
  title: "About Us",
  description:
    "Ci Laser Cutting International supplies high-performance laser cutting, engraving and marking machines backed by dedicated support.",
};

const stats = [
  { icon: CalendarDays, value: "10+", label: "Years of Experience" },
  { icon: Users, value: "500+", label: "Happy Clients" },
  { icon: Package, value: "1000+", label: "Machines Installed" },
  { icon: Globe, value: "25+", label: "Countries Served" },
];

const values = [
  {
    icon: Crosshair,
    title: "Precision first",
    text: "Every machine we supply is chosen for accurate, repeatable results on the materials you actually work with.",
  },
  {
    icon: Cog,
    title: "Built to last",
    text: "Robust construction and proven components keep downtime low and maintenance simple.",
  },
  {
    icon: Gem,
    title: "Advanced technology",
    text: "Fiber and CO2 laser systems across cutting, engraving and marking, from workshop to production scale.",
  },
  {
    icon: Headphones,
    title: "Support that stays",
    text: "From choosing a machine to installation and after-sales help, our team is a call or message away.",
  },
];

const offerings = categories.filter((category) => category.id !== "all");

export default function AboutPage() {
  return (
    <div className="bg-[#f8faff] text-[#101d3d]">
      <PageHero
        eyebrow="Who we are"
        title="About"
        highlight="Us"
        description="We help manufacturers, workshops and jewellers cut, engrave and mark with confidence, with the right laser machine and the support to keep it running."
        bannerImage="/about_hero_.png"
      />

      {/* Intro */}
      <section className="mx-auto max-w-[1440px] px-5 py-12 sm:px-8 sm:py-16 lg:px-10">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="relative overflow-hidden rounded-[22px] border border-[#dce6f2] bg-white p-3 shadow-[0_18px_40px_rgba(20,75,150,0.08)]">
            <img
              src="/about_.png"
              alt="Laser cutting head cutting a metal sheet"
              loading="lazy"
              className="h-full max-h-[460px] w-full rounded-[16px] object-cover"
            />
          </div>
          <div>
            <h2 className="text-[30px] font-extrabold leading-[1.1] tracking-[-0.035em] text-[#102044] sm:text-[38px]">
              Precision laser solutions,{" "}
              <span className="text-[#0866f5]">backed by people who care</span>
            </h2>
            <div className="mt-5 space-y-4 text-[14px] leading-[1.8] text-[#52627e]">
              <p>
                Ci Laser Cutting International is a supplier of high-performance
                laser machines for metal fabrication, sheet cutting, engraving
                and marking. Our range covers CO2 and fiber laser systems for
                industries from signage and leather to steel fabrication and
                jewellery.
              </p>
              <p>
                We focus on matching each customer with the machine that fits
                their material, output and budget, then standing behind it with
                installation help and responsive after-sales support.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/products"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-[10px] bg-[#0866f5] px-5 text-[12px] font-bold text-white transition-colors hover:bg-[#0754d2]"
              >
                Explore Machines <ArrowRight size={15} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-[10px] border border-[#b9cbe4] bg-white px-5 text-[12px] font-bold text-[#18315b] transition-all hover:border-[#0866f5] hover:bg-[#f2f7ff]"
              >
                Talk to an Expert
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
        <dl className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="rounded-[15px] border border-[#dce6f2] bg-white p-5 text-center shadow-[0_5px_20px_rgba(20,55,100,0.035)]"
            >
              <Icon size={22} className="mx-auto text-[#0866f5]" />
              <dd className="mt-3 text-[30px] font-extrabold tracking-[-0.03em] text-[#0c2452]">
                {value}
              </dd>
              <dt className="mt-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[#8794aa]">
                {label}
              </dt>
            </div>
          ))}
        </dl>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 sm:py-20 lg:px-10">
        <div className="mb-8 max-w-xl">
          <div className="mb-2 inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#0866f5]">
            <ShieldCheck size={14} /> Why customers choose us
          </div>
          <h2 className="text-[28px] font-extrabold tracking-[-0.035em] text-[#102044] sm:text-[34px]">
            What we stand for
          </h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {values.map(({ icon: Icon, title, text }) => (
            <article
              key={title}
              className="rounded-[18px] border border-[#e0e9f5] bg-white p-6 shadow-[0_5px_18px_rgba(18,55,105,0.035)] transition-all duration-300 hover:-translate-y-1 hover:border-[#b8d2f7] hover:shadow-[0_18px_38px_rgba(20,75,150,0.11)]"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#eaf2ff] text-[#0866f5]">
                <Icon size={21} />
              </span>
              <h3 className="mt-4 text-[16px] font-extrabold tracking-[-0.02em] text-[#101d3d]">
                {title}
              </h3>
              <p className="mt-2 text-[12px] leading-[1.7] text-[#687792]">
                {text}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* What we offer */}
      <section className="mx-auto max-w-[1440px] px-5 pb-14 sm:px-8 sm:pb-20 lg:px-10">
        <div className="rounded-[22px] border border-[#dce9fb] bg-[linear-gradient(145deg,#f1f7ff,#e5efff)] p-6 sm:p-10">
          <h2 className="text-[26px] font-extrabold tracking-[-0.035em] text-[#102044] sm:text-[30px]">
            What we offer
          </h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {offerings.map((category) => (
              <li key={category.id}>
                <Link
                  href="/products"
                  className="flex items-center justify-between rounded-[12px] bg-white px-4 py-3.5 text-[13px] font-bold text-[#18315b] transition-colors hover:text-[#0866f5]"
                >
                  {category.label} <ArrowRight size={15} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Story />
      <VisionMission />
      <CTA/>
    </div>
  );
}