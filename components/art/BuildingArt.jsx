export default function BuildingArt({ className = "" }) {
  const windows = [];
  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 9; c++) {
      const x = 60 + c * 34;
      const y = 62 + r * 26 + c * 1.6;
      windows.push(
        <rect
          key={`${r}-${c}`}
          x={x}
          y={y}
          width="28"
          height="20"
          rx="1.5"
          fill={(r + c) % 4 === 0 ? "#cfe3ff" : "#7fb2ff"}
          opacity={0.55 + ((r * 3 + c) % 5) * 0.08}
        />,
      );
    }
  }
  return (
    <svg viewBox="0 0 520 300" className={className} aria-hidden>
      <defs>
        <linearGradient id="bgSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#bcd9ff" />
          <stop offset="1" stopColor="#eef5ff" />
        </linearGradient>
        <linearGradient id="bgFront" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2f6fe0" />
          <stop offset="1" stopColor="#0a3a9e" />
        </linearGradient>
        <linearGradient id="bgSide" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#f4f7fc" />
          <stop offset="1" stopColor="#c8d4e6" />
        </linearGradient>
      </defs>
      <rect width="520" height="300" fill="url(#bgSky)" />
      <ellipse cx="90" cy="60" rx="70" ry="16" fill="#fff" opacity=".7" />
      <ellipse cx="420" cy="40" rx="60" ry="12" fill="#fff" opacity=".6" />

      <polygon points="40,48 372,70 372,232 40,222" fill="url(#bgFront)" />
      <g>{windows}</g>
      <polygon points="372,70 490,96 490,214 372,232" fill="url(#bgSide)" />
      <polygon points="372,70 490,96 490,104 372,80" fill="#fff" />
      <path d="M392 112 L476 128 M392 142 L476 158 M392 172 L476 188" stroke="#aebfd8" strokeWidth="3" />
      <rect x="56" y="22" width="150" height="26" rx="3" fill="#fff" opacity=".95" transform="skewY(3)" />
      <text
        x="70"
        y="42"
        fontSize="17"
        fontStyle="italic"
        fontWeight="700"
        fill="#0a3a9e"
        transform="skewY(3)"
      >
        Ci laser
      </text>
      <polygon points="0,226 520,236 520,300 0,300" fill="#dfe7f2" />
      <polygon points="0,248 520,256 520,266 0,258" fill="#c9d4e4" />
      {[24, 470, 500].map((x, i) => (
        <g key={x}>
          <rect x={x - 2} y={212 + i * 2} width="4" height="22" fill="#5b6b52" />
          <circle cx={x} cy={204 + i * 2} r="16" fill="#4a9a5c" />
          <circle cx={x - 8} cy={212 + i * 2} r="11" fill="#5fb070" />
        </g>
      ))}
      <rect x="170" y="196" width="70" height="28" fill="#0a2f86" opacity=".85" />
      <rect x="174" y="200" width="30" height="24" fill="#9ec6ff" opacity=".7" />
      <rect x="208" y="200" width="28" height="24" fill="#9ec6ff" opacity=".7" />
    </svg>
  );
}
