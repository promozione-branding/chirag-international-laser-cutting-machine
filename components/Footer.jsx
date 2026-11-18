"use client";
import { motion } from "framer-motion";
import { ArrowUp, Mail, MapPin, Phone } from "lucide-react";
import Logo from "./art/Logo";
const columns = [
  {
    title: "Machines",
    links: [
      "Fiber Laser Cutting",
      "Tube Laser Cutting",
      "Sheet Metal Laser Cutter",
      "Laser Welding",
      "Laser Marking",
    ],
  },
  { title: "Company", links: ["About Us", "Our Story", "Applications", "Careers", "Contact"] },
  { title: "Resources", links: ["Brochures", "Blog", "Support Center", "Warranty", "FAQ"] },
];
const socials = ["in", "f", "X", "▶"];
export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#051540] text-white ">
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:40px_40px]" />
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand/30 blur-3xl" />

      <div className="container-x relative grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.4fr_repeat(3,1fr)_1.3fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block rounded-2xl bg-white px-4 py-2.5">
            <Logo />
          </div>
          <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-white/65">
            Leading manufacturer and supplier of high-performance laser cutting machines, delivering
            precision, productivity and reliability worldwide.
          </p>
          <div className="mt-5 flex gap-2.5">
            {socials.map((s) => (
              <motion.a
                key={s}
                href="#"
                aria-label={s}
                whileHover={{ y: -4, scale: 1.1 }}
                className="grid h-9 w-9 place-items-center rounded-full border border-white/20 text-[12px] font-bold text-white/80 transition-colors hover:border-brand-400 hover:bg-brand hover:text-white"
              >
                {s}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {columns.map((col, ci) => (
          <motion.div
            key={col.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 * (ci + 1) }}
          >
            <h4 className="text-[13px] font-bold uppercase tracking-[0.18em] text-white">{col.title}</h4>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    className="group inline-flex items-center gap-1.5 text-[13px] text-white/65 transition-colors hover:text-white"
                  >
                    <span className="h-px w-0 bg-brand-400 transition-all duration-300 group-hover:w-3" />
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h4 className="text-[13px] font-bold uppercase tracking-[0.18em]">Get in Touch</h4>
          <ul className="mt-4 space-y-3 text-[13px] text-white/65">
            <li className="flex gap-2.5">
              <MapPin size={16} className="mt-0.5 shrink-0 text-brand-400" />
              Second Floor Right Portion, B-132, Satguru Ram Singh Marg, Mayapuri Industrial Area Phase 1, Bagga, Brothers New Delhi - 110064, Delhi, India
            </li>
            <li className="flex gap-2.5">
              <Phone size={16} className="shrink-0 text-brand-400" />
              +91 00000 00000
            </li>
            <li className="flex gap-2.5">
              <Mail size={16} className="shrink-0 text-brand-400" />
              info@cilaser.com
            </li>
          </ul>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-5 flex overflow-hidden rounded-full bg-white/10 ring-1 ring-white/20 focus-within:ring-brand-400"
          >
            <input
              type="email"
              required
              placeholder="Your email"
              aria-label="Email for newsletter"
              className="w-full bg-transparent px-4 py-2.5 text-[13px] text-white placeholder:text-white/40 focus:outline-none"
            />
            <button className="m-1 rounded-full bg-brand px-4 text-[12px] font-semibold transition-colors hover:bg-brand-500">
              Join
            </button>
          </form>
        </motion.div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-5 text-[12px] text-white/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Chirag International Pvt.Ltd. All rights reserved.</p>
          <div className="flex items-center gap-2">
           Website Designed By Inquiry Bazaar Pvt. Ltd.
            <a href="https://inquirybazaar.com/" className="transition-colors text-white hover:text-brand">
              B2B Marketplace
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
