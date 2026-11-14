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
      href="#"
      className={`flex items-center gap-1.5 ${className}`}
      aria-label="Ci Laser Cutting International"
    >
      <svg viewBox="0 0 48 48" className="h-11 w-11 shrink-0">
        {dots}
        <path d="M4 24 H44 M24 4 V44" stroke="#0B3FA8" strokeWidth=".6" opacity=".35" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="text-[28px] italic tracking-tight text-brand-800">
          <span className="font-bold">Ci</span> <span className="font-light">laser</span>
        </span>
        <span className="mt-1 text-[6.5px] font-semibold uppercase tracking-[0.2em] text-brand-700">
          Cutting International
        </span>
      </span>
    </a>
  );
}
