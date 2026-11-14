import "./globals.css";
export const metadata = {
  title: "Ci Laser | Next-Gen Laser Cutting Solutions",
  description:
    "High-performance laser cutting machines for metal fabrication, sheet cutting and industrial applications.",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
