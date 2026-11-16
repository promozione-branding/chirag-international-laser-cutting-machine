import Link from "next/link";
import { ArrowRight, Headset, Mail, Phone } from "lucide-react";

export const company = {
  name: "Ci Laser Cutting International",
  shortName: "Ci Laser",
  phone: "07949292120",
  phoneLabel: "079 4929 2120",
  whatsapp: "917949292120",
  email: "info@cilaser.com",
  address: "Industrial Area, Phase II, Your City, India",
  catalogueUrl: "https://www.chiragint.in",
};

export const whatsappLink = (text = "") =>
  `https://wa.me/${company.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;


export default function ContactStrip() {
  return (
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
            href={`tel:${company.phone}`}
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
  );
}