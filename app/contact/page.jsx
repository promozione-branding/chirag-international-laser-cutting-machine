import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import ContactForm from "@/components/ContactForm";
import LocationMap from "@/components/LocationMap";

export const metadata = {
  title: "Contact Us",
  description:
    "Talk to our laser experts. Get a quote for laser cutting, engraving and marking machines.",
};

export const company = {
  name: "Ci Laser Cutting International",
  shortName: "Ci Laser",
  phone: "07949292120",
  phoneLabel: "079 4929 2120",
  whatsapp: "917949292120",
  email: "info@cilaser.com",
  address: "Second Floor Right Portion, B-132, Satguru Ram Singh Marg, Mayapuri Industrial Area Phase 1, Bagga, Brothers New Delhi - 110064, Delhi, India",
  catalogueUrl: "https://www.chiragint.in",
};

export const whatsappLink = (text = "") =>
  `https://wa.me/${company.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;


const channels = [
  {
    icon: Phone,
    label: "Call us",
    value: company.phoneLabel,
    href: `tel:${company.phone}`,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Chat with our team",
    href: whatsappLink(
      "Hello, I would like to know more about your laser machines.",
    ),
    external: true,
  },
  {
    icon: Mail,
    label: "Email",
    value: company.email,
    href: `mailto:${company.email}`,
  },
  {
    icon: MapPin,
    label: "Visit us",
    value: company.address,
  },
];

export default function ContactPage() {
  return (
    <div className="bg-[#f8faff] text-[#101d3d]">
      <PageHero
        eyebrow="We're here to help"
        title="Contact"
        highlight="Us"
        description="Tell us about your application and our laser experts will recommend the right machine, with a clear quote and delivery plan."
        bannerImage="/contact_us_hero_.png"
      />

<section className="mx-auto max-w-[1440px] px-5 py-10 sm:px-8 sm:py-14 lg:px-10">
  <div className="grid items-start gap-7 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] xl:gap-8">
    <div className="space-y-4">
            {channels.map(({ icon: Icon, label, value, href, external }) => {
              const body = (
                <>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#eaf2ff] text-[#0866f5]">
                    <Icon size={20} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[10px] font-bold uppercase tracking-[0.14em] text-[#8794aa]">
                      {label}
                    </span>
                    <span className="mt-0.5 block break-words text-[14px] font-bold text-[#14264b]">
                      {value}
                    </span>
                  </span>
                </>
              );
              const cardClass =
                "flex items-center gap-4 rounded-[15px] border border-[#dce6f2] bg-white p-4 shadow-[0_5px_20px_rgba(20,55,100,0.035)]";
              return href ? (
                <a
                  key={label}
                  href={href}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className={`${cardClass} transition-all hover:-translate-y-0.5 hover:border-[#b8d2f7]`}
                >
                  {body}
                </a>
              ) : (
                <div key={label} className={cardClass}>
                  {body}
                </div>
              );
            })}

            <div className="flex items-start gap-3 rounded-[15px] border border-[#dce9fb] bg-[linear-gradient(145deg,#f1f7ff,#e5efff)] p-5">
              <Clock size={20} className="mt-0.5 shrink-0 text-[#0866f5]" />
              <p className="text-[12px] leading-[1.7] text-[#52627e]">
                Need a quick answer? WhatsApp is the fastest way to reach us.
                For custom configurations, include your material and thickness
                in the enquiry.
              </p>
            </div>
          </div>

          <ContactForm />
           <div className="lg:col-span-2">
      <LocationMap />
    </div>
        </div>
      </section>
    </div>
  );
}