import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import FeaturedMachines from "@/components/FeaturedMachines";
import About from "@/components/About";
import WhyChooseUs from "@/components/WhyChooseUs";
import Story from "@/components/Story";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import ContactForm from "@/components/ContactForm";
import MetalReveal from "@/components/MetalReveal";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Categories />
      <About />
      <FeaturedMachines />
      <MetalReveal/>
      <WhyChooseUs />
      <Story />
      <Testimonials />
      <FAQ />
    
      <CTA />
    </>
  );
}
