"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Search,
  SlidersHorizontal,
  Grid2X2,
  Check,
  ChevronDown,
  ChevronRight,
  Menu,
  Headset,
  Zap,
  ShieldCheck,
  Crosshair,
  Mail,
  Phone,
  Sparkles,
} from "lucide-react";

/*
  Ci Laser – All Products page
  ------------------------------------------------------------------
  Images live in /public/machines/ and match the filenames
  in the products array below. Place the extracted images from the
  zip into that folder.

  Product names, prices and specifications are transcribed from the
  four Chirag International category pages.
*/

const SOURCE_URLS = {
  marking: "https://www.chiragint.in/laser-marking-machine.html",
  engraving: "https://www.chiragint.in/laser-engraving-machine.html",
  fiber: "https://www.chiragint.in/fiber-laser-cutting-machine.html",
  cutting: "https://www.chiragint.in/laser-cutting-machine.html",
};

const categories = [
  { id: "all", label: "All Products" },
  { id: "cutting", label: "Laser Cutting Machines" },
  { id: "fiber", label: "Fiber Laser Cutting" },
  { id: "engraving", label: "Laser Engraving Machines" },
  { id: "marking", label: "Laser Marking Machines" },
];

const products = [
  // LASER CUTTING MACHINES
  {
    id: "co2-leather-cutter",
    name: "CO2 Laser Leather Cutting Machine",
    category: "cutting",
    categoryLabel: "CO2 Laser Cutting",
    price: 310000,
    priceUnit: "Piece",
    image: "/machines/co2-laser-leather-cutting-machine.png",
    description: "Industrial CO2 laser cutting for leather and a range of non-metal materials.",
    specs: ["100 W laser power", "8000 mm/s cutting speed", "CI 1490T model"],
    tags: ["CO2 Laser", "Industrial", "Non-metal"],
    source: SOURCE_URLS.cutting,
  },
  {
    id: "fiber-steel-cutter",
    name: "Fiber Laser Steel Cutting Machine",
    category: "cutting",
    categoryLabel: "Fiber Laser Cutting",
    price: 2500000,
    priceUnit: "Piece",
    image: "/machines/fiber-laser-steel-cutting-machine.png",
    description: "Automatic fiber laser system for precision cutting of steel sheets.",
    specs: ["3000 × 1500 mm working area", "2 kW capacity", "SS cutting up to 8 mm"],
    tags: ["Fiber Laser", "Automatic", "Metal"],
    source: SOURCE_URLS.cutting,
  },
  {
    id: "co2-laser-cutter",
    name: "CO2 Laser Cutting Machine",
    category: "cutting",
    categoryLabel: "CO2 Laser Cutting",
    price: 220000,
    priceUnit: "Piece",
    image: "/machines/co2-laser-cutting-machine.png",
    description: "CO2 laser cutting machine for industrial cutting applications.",
    specs: ["60 W laser power", "Water-cooled system", "220–240 V"],
    tags: ["CO2 Laser", "Industrial", "Non-metal"],
    source: SOURCE_URLS.cutting,
  },
  {
    id: "gold-silver-cutter",
    name: "Gold & Silver Laser Cutting Machine",
    category: "cutting",
    categoryLabel: "Jewellery Cutting",
    price: 250000,
    priceUnit: "Piece",
    image: "/machines/gold-silver-laser-cutting-machine.png",
    description: "Laser cutting solution designed for gold and silver jewellery work.",
    specs: ["50 W power", "19 gauge capacity", "Made in India"],
    tags: ["Fiber Laser", "Jewellery", "Metal"],
    source: SOURCE_URLS.cutting,
  },
  {
    id: "engraving-laser-cutter-6040",
    name: "Engraving Laser Machine CI-6040",
    category: "cutting",
    categoryLabel: "Laser Engraving & Cutting",
    price: 220000,
    priceUnit: "Piece",
    image: "/machines/ci-6040-engraving-laser-machine.png",
    description: "Compact laser engraving machine with water cooling and flexible file support.",
    specs: ["CI-6040 model", "0–64 m/min engraving speed", "JPG, BMP and TIFF support"],
    tags: ["Fiber Laser", "Engraving", "Automatic"],
    source: SOURCE_URLS.cutting,
  },
  {
    id: "acrylic-laser-cutter",
    name: "CO2 Acrylic Laser Cutting Machine",
    category: "cutting",
    categoryLabel: "Acrylic Cutting",
    price: 400000,
    priceUnit: "Piece",
    image: "/machines/acrylic-laser-cutting-machine.png",
    description: "CNC laser cutter for acrylic, paper, MDF, plastic, rexine and leather.",
    specs: ["100 W laser power", "CI 1490T model", "CNC control"],
    tags: ["CO2 Laser", "CNC", "Non-metal"],
    source: SOURCE_URLS.cutting,
  },

  // FIBER LASER CUTTING MACHINES
  {
    id: "fiber-laser-1000w",
    name: "Fiber Laser Cutting Machine – 1000 W",
    category: "fiber",
    categoryLabel: "Fiber Laser Cutting",
    price: 1800000,
    priceUnit: "Piece",
    image: "/machines/fiber-laser-cutting-machine-1000w.png",
    description: "Automatic fiber laser sheet cutting machine for industrial metal processing.",
    specs: ["1000 W laser power", "3000 × 1500 mm working area", "1–12 kW capacity range"],
    tags: ["Fiber Laser", "Automatic", "Metal"],
    source: SOURCE_URLS.fiber,
  },
  {
    id: "fiber-laser-3000w",
    name: "3000 W Fiber Laser Cutting Machine",
    category: "fiber",
    categoryLabel: "Fiber Laser Cutting",
    price: 3200000,
    priceUnit: "Piece",
    image: "/machines/fiber-laser-cutting-machine-3000w.png",
    description: "Combined sheet and tube fiber laser cutting machine for production environments.",
    specs: ["3000 W laser power", "4000 × 2000 mm working area", "100–120 m/min cutting speed"],
    tags: ["Fiber Laser", "Automatic", "Metal"],
    source: SOURCE_URLS.fiber,
  },
  {
    id: "fiber-laser-15kw",
    name: "1.5 kW Fiber Laser Cutting Machine",
    category: "fiber",
    categoryLabel: "Fiber Laser Cutting",
    price: 310000,
    priceUnit: "Piece",
    image: "/machines/fiber-laser-cutting-machine-1-5kw.png",
    description: "Open-type fiber laser cutting system with Raycus source and CNC automation.",
    specs: ["1.5 kW laser power", "1500 × 3000 mm working area", "Raycus laser source"],
    tags: ["Fiber Laser", "CNC", "Metal"],
    source: SOURCE_URLS.fiber,
  },
  {
    id: "fiber-laser-3kw-max",
    name: "3 kW Fiber Laser Cutting Machine",
    category: "fiber",
    categoryLabel: "Fiber Laser Cutting",
    price: 2200000,
    priceUnit: "Piece",
    image: "/machines/fiber-laser-cutting-machine-3kw.png",
    description: "Open-type fiber laser cutting system with MAX source for metal fabrication.",
    specs: ["3 kW laser power", "1500 × 3000 mm working area", "MAX laser source"],
    tags: ["Fiber Laser", "CNC", "Metal"],
    source: SOURCE_URLS.fiber,
  },

  // LASER ENGRAVING MACHINES
  {
    id: "laser-engraving-equipment",
    name: "Laser Engraving Equipment",
    category: "engraving",
    categoryLabel: "Fiber Laser Engraving",
    price: 220000,
    priceUnit: "Piece",
    image: "/machines/laser-engraving-equipment.png",
    description: "Fiber laser engraving and marking equipment for metals and hard plastics.",
    specs: ["30 W laser power", "200 × 200 mm marking area", "7000 mm/s marking speed capacity"],
    tags: ["Fiber Laser", "Automatic", "Metal"],
    source: SOURCE_URLS.engraving,
  },
  {
    id: "double-head-co2-engraver",
    name: "Double Head CO2 Laser Engraving Machine",
    category: "engraving",
    categoryLabel: "CO2 Laser Engraving",
    price: 380000,
    priceUnit: "Unit",
    image: "/machines/double-head-co2-laser-engraving-machine.png",
    description: "Dual-head CO2 engraving machine for efficient engraving and customization.",
    specs: ["100 W laser power", "1000 mm/s engraving speed", "CI-1390T model"],
    tags: ["CO2 Laser", "Water Cooling", "Dual Head"],
    source: SOURCE_URLS.engraving,
  },
  {
    id: "co2-engraver-1490t",
    name: "CO2 Laser Engraving Machine",
    category: "engraving",
    categoryLabel: "CO2 Laser Engraving",
    price: 270000,
    priceUnit: "Unit",
    image: "/machines/co2-laser-engraving-machine.png",
    description: "CO2 laser engraving machine with water cooling and mild-steel body construction.",
    specs: ["100 W laser power", "500 mm/s engraving speed", "CI 1490T model"],
    tags: ["CO2 Laser", "Water Cooling", "Automatic"],
    source: SOURCE_URLS.engraving,
  },
  {
    id: "single-head-co2-engraver",
    name: "Single Head CO2 Laser Engraving Machine",
    category: "engraving",
    categoryLabel: "CO2 Laser Engraving",
    price: 220000,
    priceUnit: "Unit",
    image: "/machines/single-head-co2-laser-engraving-machine.png",
    description: "Single-head CO2 engraving machine for workshop and production use.",
    specs: ["80 W / 100 W laser power", "500 mm/s engraving speed", "CI-6040A model"],
    tags: ["CO2 Laser", "Water Cooling", "Single Head"],
    source: SOURCE_URLS.engraving,
  },
  {
    id: "automatic-co2-engraver",
    name: "Automatic CO2 Laser Engraving Machine",
    category: "engraving",
    categoryLabel: "CO2 Laser Engraving",
    price: 380000,
    priceUnit: "Unit",
    image: "/machines/automatic-co2-laser-engraving-machine.png",
    description: "Automatic CO2 laser engraving machine with water cooling and CNC-ready operation.",
    specs: ["100 W laser power", "500 mm/s engraving speed", "CI-9060T model"],
    tags: ["CO2 Laser", "Automatic", "Water Cooling"],
    source: SOURCE_URLS.engraving,
  },

  // LASER MARKING MACHINES
  {
    id: "metal-laser-marker-f50",
    name: "Metal Laser Marking Machine",
    category: "marking",
    categoryLabel: "Fiber Laser Marking",
    price: 570000,
    priceUnit: "Unit",
    image: "/machines/metal-laser-marking-machine.png",
    description: "Automatic fiber laser marking machine for clear, high-speed metal marking.",
    specs: ["50 W laser power", "175 × 175 mm marking area", "CI-F50 model"],
    tags: ["Fiber Laser", "Automatic", "Metal"],
    source: SOURCE_URLS.marking,
  },
  {
    id: "co2-laser-marker",
    name: "CO2 Laser Marking Machine",
    category: "marking",
    categoryLabel: "CO2 Laser Marking",
    price: 450000,
    priceUnit: "Unit",
    image: "/machines/co2-laser-marking-machine.png",
    description: "CO2 laser marking system listed for wood marking and engraving applications.",
    specs: ["100 W power", "400 × 400 mm marking area", "Air cooling"],
    tags: ["CO2 Laser", "Wood", "Air Cooling"],
    source: SOURCE_URLS.marking,
  },
  {
    id: "automatic-metal-marker",
    name: "Automatic Metal Laser Marking Machine",
    category: "marking",
    categoryLabel: "Fiber Laser Marking",
    price: 190000,
    priceUnit: "Piece",
    image: "/machines/automatic-metal-laser-marking-machine.png",
    description: "Automatic metal marking system for repeatable marking applications.",
    specs: ["CI-30W model", "7000 mm/s marking speed", "Air cooling"],
    tags: ["Fiber Laser", "Automatic", "Metal"],
    source: SOURCE_URLS.marking,
  },
  {
    id: "laser-stamp-machine",
    name: "Laser Stamp Machine",
    category: "marking",
    categoryLabel: "Laser Marking",
    price: 170000,
    priceUnit: "Piece",
    image: "/machines/laser-stamp-machine.png",
    description: "Electric laser stamping machine for number marking applications.",
    specs: ["20 W power", "220 V", "Electric operation"],
    tags: ["Fiber Laser", "Number Marking", "Electric"],
    source: SOURCE_URLS.marking,
  },
  {
    id: "fiber-laser-marker",
    name: "Fiber Laser Marker",
    category: "marking",
    categoryLabel: "Fiber Laser Marking",
    price: 175000,
    priceUnit: "Piece",
    image: "/machines/fiber-laser-marker.png",
    description: "Fiber laser marker for metal marking with an air-cooled configuration.",
    specs: ["30 W power", "175 × 175 mm marking area", "1064 nm wavelength"],
    tags: ["Fiber Laser", "Air Cooling", "Metal"],
    source: SOURCE_URLS.marking,
  },
  {
    id: "jewellery-hallmarking-machine",
    name: "Jewellery Laser Hallmarking Machine",
    category: "marking",
    categoryLabel: "Jewellery Marking",
    price: 170000,
    priceUnit: "Unit",
    image: "/machines/jewellery-laser-hallmarking-machine.png",
    description: "Portable jewellery marking system for detailed hallmarking applications.",
    specs: ["20 W laser power", "8000 mm/s marking speed capacity", "CI RFL-20W model"],
    tags: ["Fiber Laser", "Jewellery", "Air Cooling"],
    source: SOURCE_URLS.marking,
  },
];

const featureFilters = ["Fiber Laser", "CO2 Laser", "Automatic", "Metal", "Non-metal", "Jewellery"];

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);

function ProductCard({ product }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[18px] border border-[#e0e9f5] bg-white shadow-[0_5px_18px_rgba(18,55,105,0.035)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#b8d2f7] hover:shadow-[0_18px_38px_rgba(20,75,150,0.11)]">
      <Link
        href={product.source}
        target="_blank"
        className="relative block h-[220px] overflow-hidden bg-[linear-gradient(145deg,#f5f9ff,#edf4ff)] p-5"
      >
        <span className="absolute left-4 top-4 z-10 rounded-full border border-[#d9e8ff] bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#1764cf]">
          {product.categoryLabel}
        </span>
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.045]"
          onError={(event) => {
            event.currentTarget.style.opacity = "0";
          }}
        />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="rounded-full bg-white/95 px-4 py-2 text-xs font-bold text-[#0758c9] shadow-lg">
            View product <ArrowRight className="ml-1 inline" size={13} />
          </span>
        </div>
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

export default function MachinePage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesCategory =
        activeCategory === "all" || product.category === activeCategory;
      const term = searchTerm.trim().toLowerCase();
      const matchesSearch =
        !term ||
        `${product.name} ${product.description} ${product.categoryLabel} ${product.specs.join(" ")}`
          .toLowerCase()
          .includes(term);
      const matchesFeatures =
        selectedFeatures.length === 0 ||
        selectedFeatures.every((feature) => product.tags.includes(feature));
      return matchesCategory && matchesSearch && matchesFeatures;
    });

    if (sortBy === "name")
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    if (sortBy === "price-low")
      result = [...result].sort((a, b) => a.price - b.price);
    if (sortBy === "price-high")
      result = [...result].sort((a, b) => b.price - a.price);
    return result;
  }, [activeCategory, searchTerm, sortBy, selectedFeatures]);

  const toggleFeature = (feature) => {
    setSelectedFeatures((current) =>
      current.includes(feature)
        ? current.filter((item) => item !== feature)
        : [...current, feature]
    );
  };

  const clearFilters = () => {
    setActiveCategory("all");
    setSearchTerm("");
    setSelectedFeatures([]);
    setSortBy("featured");
  };

  return (
    <main className="min-h-screen bg-[#f8faff] text-[#101d3d]">
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

      <section className="mx-auto max-w-[1440px] px-5 py-9 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
        <div className="grid items-start gap-7 lg:grid-cols-[260px_minmax(0,1fr)] xl:gap-8">
          <aside className="hidden space-y-5 lg:block">
            <div className="rounded-[15px] border border-[#dce6f2] bg-white p-4 shadow-[0_5px_20px_rgba(20,55,100,0.035)]">
              <h2 className="mb-4 flex items-center gap-3 text-[15px] font-extrabold text-[#14264b]">
                <Grid2X2 className="text-[#0866f5]" size={20} /> Product
                Categories
              </h2>
              <div className="space-y-1">
                {categories.map((category) => {
                  const count =
                    category.id === "all"
                      ? products.length
                      : products.filter((product) => product.category === category.id)
                          .length;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`flex w-full items-center justify-between rounded-[9px] px-3 py-2.5 text-left text-[12px] font-semibold transition-colors ${
                        activeCategory === category.id
                          ? "bg-[#e7f0ff] text-[#075bd5]"
                          : "text-[#34435d] hover:bg-[#f4f7fc] hover:text-[#075bd5]"
                      }`}
                    >
                      <span>{category.label}</span>
                      <span className="text-[11px] opacity-70">({count})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="rounded-[15px] border border-[#dce6f2] bg-white p-4 shadow-[0_5px_20px_rgba(20,55,100,0.035)]">
              <h2 className="mb-4 flex items-center gap-3 text-[15px] font-extrabold text-[#14264b]">
                <SlidersHorizontal className="text-[#0866f5]" size={20} /> Key
                Features
              </h2>
              <div className="space-y-3">
                {featureFilters.map((feature) => (
                  <label
                    key={feature}
                    className="flex cursor-pointer items-center gap-3 text-[12px] font-medium text-[#34435d]"
                  >
                    <input
                      type="checkbox"
                      checked={selectedFeatures.includes(feature)}
                      onChange={() => toggleFeature(feature)}
                      className="h-[16px] w-[16px] rounded border-[#bdcbe0] accent-[#0866f5]"
                    />
                    {feature}
                  </label>
                ))}
              </div>
              {(selectedFeatures.length > 0 || activeCategory !== "all") && (
                <button
                  onClick={clearFilters}
                  className="mt-4 text-[11px] font-bold text-[#0866f5] hover:underline"
                >
                  Clear all filters
                </button>
              )}
            </div>

            <div className="relative overflow-hidden rounded-[16px] border border-[#dce9fb] bg-[linear-gradient(145deg,#f1f7ff,#e5efff)] p-5">
              <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full border border-[#c6dcff]" />
              <div className="relative">
                <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-white text-[#0866f5] shadow-sm">
                  <Headset size={24} />
                </div>
                <h3 className="text-[20px] font-extrabold leading-[1.2] tracking-tight text-[#102044]">
                  Need Help Finding the Right Machine?
                </h3>
                <p className="mt-3 text-[12px] leading-[1.7] text-[#61718d]">
                  Our team can help you choose the right laser solution for your
                  application.
                </p>
                <Link
                  href="/contact"
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-[9px] bg-[#0866f5] px-4 py-3 text-[12px] font-bold text-white transition-colors hover:bg-[#0754d2]"
                >
                  Talk to an Expert <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </aside>

          <div className="min-w-0">
            <div className="mb-5 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <div className="flex items-baseline gap-2">
                  <h2 className="text-[26px] font-extrabold tracking-[-0.035em] text-[#102044] sm:text-[30px]">
                    All Products
                  </h2>
                  <span className="text-[13px] font-semibold text-[#7a89a2]">
                    ({filteredProducts.length})
                  </span>
                </div>
                <p className="mt-1 text-[11px] text-[#8491a6]">
                  Explore our laser machine range
                </p>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <div className="relative min-w-0 sm:w-[270px]">
                  <Search
                    size={17}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8795aa]"
                  />
                  <input
                    id="product-search"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder="Search products..."
                    className="h-[44px] w-full rounded-[10px] border border-[#d7e2f0] bg-white pl-10 pr-4 text-[12px] font-medium text-[#17294b] outline-none transition-all placeholder:text-[#9aa6b8] focus:border-[#6da4f5] focus:ring-4 focus:ring-[#0866f5]/[0.08]"
                  />
                </div>
                <div className="relative sm:w-[175px]">
                  <select
                    value={sortBy}
                    onChange={(event) => setSortBy(event.target.value)}
                    className="h-[44px] w-full appearance-none rounded-[10px] border border-[#d7e2f0] bg-white px-4 pr-10 text-[12px] font-semibold text-[#263754] outline-none focus:border-[#6da4f5]"
                  >
                    <option value="featured">Sort by: Featured</option>
                    <option value="name">Name: A to Z</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                  <ChevronDown
                    size={15}
                    className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#52627e]"
                  />
                </div>
              </div>
            </div>

            {(activeCategory !== "all" ||
              selectedFeatures.length > 0 ||
              searchTerm) && (
              <div className="mb-5 flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-bold text-[#77859b]">
                  Active filters:
                </span>
                {activeCategory !== "all" && (
                  <button
                    onClick={() => setActiveCategory("all")}
                    className="rounded-full bg-[#eaf2ff] px-3 py-1.5 text-[10px] font-bold text-[#075bd5]"
                  >
                    {categories.find((item) => item.id === activeCategory)?.label} ×
                  </button>
                )}
                {selectedFeatures.map((feature) => (
                  <button
                    key={feature}
                    onClick={() => toggleFeature(feature)}
                    className="rounded-full bg-[#eaf2ff] px-3 py-1.5 text-[10px] font-bold text-[#075bd5]"
                  >
                    {feature} ×
                  </button>
                ))}
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="rounded-full bg-[#eaf2ff] px-3 py-1.5 text-[10px] font-bold text-[#075bd5]"
                  >
                    Search: {searchTerm} ×
                  </button>
                )}
                <button
                  onClick={clearFilters}
                  className="ml-1 text-[10px] font-bold text-[#687792] underline underline-offset-2"
                >
                  Clear all
                </button>
              </div>
            )}

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex min-h-[320px] flex-col items-center justify-center rounded-[18px] border border-dashed border-[#cbd9eb] bg-white px-6 text-center">
                <Search size={32} className="text-[#9aabc2]" />
                <h3 className="mt-4 text-lg font-extrabold text-[#17294b]">
                  No products found
                </h3>
                <p className="mt-2 max-w-sm text-sm text-[#71809a]">
                  Try changing your search or removing one of the selected filters.
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-5 rounded-lg bg-[#0866f5] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#0754d2]"
                >
                  Reset filters
                </button>
              </div>
            )}

            <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-[#e4ebf4] pt-6 sm:flex-row">
              <p className="text-[11px] text-[#8793a7]">
                Showing {filteredProducts.length} of {products.length} listed
                products
              </p>
              <p className="text-[11px] text-[#8793a7]">
                Need a custom configuration?{" "}
                <Link
                  href="/contact"
                  className="font-bold text-[#0866f5] hover:underline"
                >
                  Contact our team
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[linear-gradient(105deg,#073b91,#075bd5_55%,#0866f5)]">
        <div className="pointer-events-none absolute -left-12 -top-24 h-64 w-64 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -right-16 -bottom-36 h-80 w-80 rounded-full border border-white/10" />
        <div className="relative mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-5 px-5 py-7 text-white sm:px-8 md:flex-row lg:px-10">
          <div className="flex items-center gap-4">
            <div className="grid h-12 w-12 place-items-center rounded-xl border border-white/20 bg-white/10">
              <Headset size={27} />
            </div>
            <div>
              <h2 className="text-[17px] font-extrabold">Need Assistance?</h2>
              <p className="mt-0.5 text-[12px] text-white/75">
                Talk to our laser experts today.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-[12px] font-semibold text-white/90">
            <a
              href="tel:07949292120"
              className="inline-flex items-center gap-2 hover:text-white"
            >
              <Phone size={17} /> Call Chirag International
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 hover:text-white"
            >
              <Mail size={17} /> Send an Enquiry
            </Link>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 rounded-[10px] bg-white px-6 py-3 text-[12px] font-extrabold text-[#0755c8] shadow-lg transition-all hover:-translate-y-0.5 hover:bg-[#edf4ff]"
          >
            Get a Quote <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </main>
  );
}