import ProductCatalogue from "@/components/machines/ProductCatalogue";
import ContactStrip from "@/components/machines/ContactStrip";
import PageHero from "@/components/ui/PageHero";

export const metadata = {
  title: "Our Products",
  description:
    "Explore laser cutting, engraving and marking machines built for high precision, speed and industrial performance.",
};

export default function MachinesPage() {
  return (
    <div className="bg-[#f8faff] text-[#101d3d]">
      <PageHero
        eyebrow="Precision Laser Solutions"
        title="Our"
        highlight="Products"
        description="We help manufacturers, workshops and jewellers cut, engrave and mark with confidence, with the right laser machine and the support to keep it running."
        bannerImage="/all_products_bann.png"
      />
      <ProductCatalogue />
      <ContactStrip />
    </div>
  );
}
