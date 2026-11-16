"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import Logo from "./art/Logo";
import Magnetic from "./ui/Magnetic";

const nav = [
  { label: "Home", href: "/" },
  {
    label: "Machines",
    href: "/machines",
    children: [
      "Fiber Laser Cutting",
      "Tube Laser Cutting",
      "Sheet Metal Laser Cutter",
      "Laser Welding",
      "Laser Marking",
    ],
  },
  { label: "About Us", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

function WhatsAppIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function Header() {
  const [open, setOpen] = useState(null);
  const [mobile, setMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isActive = (href) => !href.includes("#") && pathname === href;
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 12));

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/85 shadow-[0_8px_30px_-16px_rgba(10,47,134,0.35)] backdrop-blur-xl"
          : "bg-white/60 backdrop-blur-md"
      }`}
    >
      <div className="container-x flex h-[68px] items-center justify-between gap-6">
        <Logo />

        <nav className="hidden items-center gap-7 lg:flex">
          {nav.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.children && setOpen(item.label)}
              onMouseLeave={() => setOpen(null)}
            >
              <a
                href={item.href}
                className={`group relative flex items-center gap-1 py-6 text-[13px] font-medium transition-colors hover:text-brand ${
                  isActive(item.href) ? "text-brand" : "text-ink"
                }`}
              >
                {item.label}
                {item.children && (
                  <ChevronDown
                    size={13}
                    className={`transition-transform duration-300 ${
                      open === item.label ? "rotate-180" : ""
                    }`}
                  />
                )}
                {isActive(item.href) ? (
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
        <a
  href="https://wa.me/917949292120"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="WhatsApp"
  className="hidden h-9 w-9 place-items-center rounded-full bg-[#25D366] text-white transition-all hover:bg-[#1ebe57] hover:shadow-md sm:grid"
>
  <WhatsAppIcon size={18} />
</a>

          <Magnetic strength={0.25} className="hidden sm:inline-block">
            <a href="/#contact" className="btn-primary !py-2.5 !text-[13px]">
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
              <a href="/#contact" className="btn-primary mt-2 justify-center">
                Get a Quote <ArrowUpRight size={14} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}