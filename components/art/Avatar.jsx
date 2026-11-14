export default function Avatar({ skin, hair, shirt, female = false, className = "h-12 w-12" }) {
  return (
    <svg viewBox="0 0 64 64" className={`${className} rounded-full ring-2 ring-white`} aria-hidden>
      <rect width="64" height="64" fill="#dbe8ff" />
      {female && <path d="M18 28c-3 12 0 22 5 24l3-10zM46 28c3 12 0 22-5 24l-3-10z" fill={hair} />}
      <path d="M8 64c2-14 12-20 24-20s22 6 24 20z" fill={shirt} />
      <rect x="28" y="36" width="8" height="9" fill={skin} />
      <circle cx="32" cy="28" r="11" fill={skin} />
      <path d="M20 27c0-10 7-15 12-15s12 5 12 15c-3-5-8-7-12-7s-9 2-12 7z" fill={hair} />
    </svg>
  );
}
