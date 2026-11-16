import Providers from "@/components/Providers";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import About from "@/components/About";
import WhyChooseUs from "@/components/WhyChooseUs";
import FeaturedMachines from "@/components/FeaturedMachines";
import Story from "@/components/Story";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
export default function Home() {
  return (
    <Providers>
      
      <main>
        <Hero />
        <Categories />
        <FeaturedMachines />
        <About />
        <WhyChooseUs />
        <Story />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
    </Providers>
  );
}