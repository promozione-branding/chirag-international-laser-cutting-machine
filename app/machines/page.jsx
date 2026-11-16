import MachinesHero from "@/components/machines/MachinesHero";
import ProductCatalogue from "@/components/machines/ProductCatalogue";
import ContactStrip from "@/components/machines/ContactStrip";

export const metadata = {
  title: "Our Products",
  description:
    "Explore laser cutting, engraving and marking machines built for high precision, speed and industrial performance.",
};

export default function MachinesPage() {
  return (
    <div className="bg-[#f8faff] text-[#101d3d]">
      <MachinesHero />
      <ProductCatalogue />
      <ContactStrip />
    </div>
  );
}
