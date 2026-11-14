export default function Logo({ className = "" }) {
  const dots = [];
  for (let y = -20; y <= 20; y += 5) {
    for (let x = -20; x <= 20; x += 5) {
      const d = Math.hypot(x, y);
      if (d <= 20) {
        dots.push(<circle key={`${x}_${y}`} cx={24 + x} cy={24 + y} r={d > 15 ? 1.1 : 1.6} fill="#0B3FA8" />);
      }
    }
  }
  return (
    <a
      href="/"
      className={`flex items-center gap-1.5 ${className}`}
      aria-label="Ci Laser Cutting International"
    >
 <img src="/logo.webp" alt="logo" />
    </a>
  );
}
