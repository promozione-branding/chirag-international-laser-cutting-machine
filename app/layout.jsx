import "./globals.css";
import Providers from "@/components/Providers";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";

export const metadata = {
  title:"Ci Laser | Next-Gen Laser Cutting Solutions",
  description:
    "High-performance laser cutting machines for metal fabrication, sheet cutting and industrial applications.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B5BF5",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <SmoothScroll>
            <Header />
            <main id="main">{children}</main>
            <Footer />
          </SmoothScroll>
          <FloatingContact />
        </Providers>
      </body>
    </html>
  );
}
