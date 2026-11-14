import Providers from "@/components/Providers";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import About from "@/components/About";
import Features from "@/components/Features";
import FeaturedMachines from "@/components/FeaturedMachines";
import Story from "@/components/Story";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
export default function Home() {
  return (
    <Providers>
      <Header />
      <main>
        <Hero />
        <Categories />
        <About />
        <Features />
        <FeaturedMachines />
        <Story />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </Providers>
  );
}
