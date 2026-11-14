"use client";
import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUpRight, ChevronDown, Menu, Search, X } from "lucide-react";
import Logo from "./art/Logo";
import Magnetic from "./ui/Magnetic";
const nav = [
  { label: "Home", href: "#" },
  {
    label: "Machines",
    href: "#machines",
    children: [
      "Fiber Laser Cutting",
      "Tube Laser Cutting",
      "Sheet Metal Laser Cutter",
      "Laser Welding",
      "Laser Marking",
    ],
  },
  {
    label: "Applications",
    href: "#applications",
    children: ["Sheet Metal Fabrication", "Automotive", "Aerospace", "Signage & Décor"],
  },
  { label: "About Us", href: "#about" },
  { label: "Our Story", href: "#story" },
  { label: "Resources", href: "#resources", children: ["Brochures", "Blog", "Support Center"] },
  { label: "Contact", href: "#contact" },
];
export default function Header() {
  const [open, setOpen] = useState(null);
  const [mobile, setMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 12));
  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/85 shadow-[0_8px_30px_-16px_rgba(10,47,134,0.35)] backdrop-blur-xl" : "bg-white/60 backdrop-blur-md"}`}
    >
      <div className="container-x flex h-[68px] items-center justify-between gap-6">
        <Logo />

        <nav className="hidden items-center gap-7 lg:flex">
          {nav.map((item, i) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.children && setOpen(item.label)}
              onMouseLeave={() => setOpen(null)}
            >
              <a
                href={item.href}
                className={`group flex items-center gap-1 py-6 text-[13px] font-medium transition-colors hover:text-brand ${i === 0 ? "text-brand" : "text-ink"}`}
              >
                {item.label}
                {item.children && (
                  <ChevronDown
                    size={13}
                    className={`transition-transform duration-300 ${open === item.label ? "rotate-180" : ""}`}
                  />
                )}
                {i === 0 ? (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-0 bottom-3 h-[2px] rounded-full bg-brand"
                  />
                ) : (
                  <span className="absolute inset-x-0 bottom-3 h-[2px] origin-left scale-x-0 rounded-full bg-brand/60 transition-transform duration-300 group-hover:scale-x-100" />
                )}
              </a>
              <AnimatePresence>
                {item.children && open === item.label && (
                  <motion.ul
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.18 }}
                    className="glass absolute left-0 top-full min-w-[220px] rounded-2xl p-2"
                  >
                    {item.children.map((c) => (
                      <li key={c}>
                        <a
                          href={item.href}
                          className="block rounded-xl px-3 py-2 text-[13px] text-ink transition-colors hover:bg-brand-50 hover:text-brand"
                        >
                          {c}
                        </a>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button aria-label="Search" className="hidden text-ink transition-colors hover:text-brand sm:block">
            <Search size={18} />
          </button>
          <Magnetic strength={0.25} className="hidden sm:inline-block">
            <a href="#contact" className="btn-primary !py-2.5 !text-[13px]">
              Get a Quote <ArrowUpRight size={14} />
            </a>
          </Magnetic>
          <button
            aria-label="Menu"
            className="rounded-full p-2 text-ink lg:hidden"
            onClick={() => setMobile((v) => !v)}
          >
            {mobile ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobile && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-brand-100 bg-white lg:hidden"
          >
            <div className="container-x flex flex-col gap-1 py-4">
              {nav.map((n) => (
                <a
                  key={n.label}
                  href={n.href}
                  onClick={() => setMobile(false)}
                  className="rounded-xl px-3 py-2.5 text-sm font-medium hover:bg-brand-50"
                >
                  {n.label}
                </a>
              ))}
              <a href="#contact" className="btn-primary mt-2 justify-center">
                Get a Quote <ArrowUpRight size={14} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
