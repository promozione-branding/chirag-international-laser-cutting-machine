/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#0B5BF5",
          50: "#EEF4FF",
          100: "#DCE8FF",
          200: "#B9D1FF",
          400: "#4C8DFF",
          500: "#2F6BFF",
          600: "#0B5BF5",
          700: "#0A47C4",
          800: "#0A2F86",
          900: "#071F5E",
          950: "#05143F",
        },
        ink: "#0B1636",
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      boxShadow: {
        glow: "0 28px 60px -12px rgba(11,91,245,0.55)",
        soft: "0 18px 50px -20px rgba(10,47,134,0.28)",
        card: "0 10px 30px -12px rgba(10,47,134,0.25)",
      },
      keyframes: {
        ripple: {
          "0%": { transform: "scale(0.5)", opacity: "0.65" },
          "100%": { transform: "scale(2.4)", opacity: "0" },
        },
        bob: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(6px)" },
        },
      },
      animation: {
        ripple: "ripple 2.2s ease-out infinite",
        bob: "bob 1.8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

module.exports = config;
