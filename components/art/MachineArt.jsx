"use client";
import { useId } from "react";
import { motion } from "framer-motion";
export default function MachineArt({ variant, className = "" }) {
  const id = useId().replace(/:/g, "");
  const T = `url(#${id}t)`;
  const B = `url(#${id}b)`;
  const D = `url(#${id}d)`;
  const M = `url(#${id}m)`;
  const spark = (cx, cy) => (
    <motion.circle
      cx={cx}
      cy={cy}
      r="3"
      fill="#ffd27a"
      animate={{ opacity: [0.5, 1, 0.5], r: [2, 3.6, 2] }}
      transition={{ duration: 0.9, repeat: Infinity }}
    />
  );
  return (
    <svg viewBox="0 0 220 130" className={className} aria-hidden>
      <defs>
        <linearGradient id={`${id}t`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f8fafd" />
          <stop offset="1" stopColor="#d3dbe8" />
        </linearGradient>
        <linearGradient id={`${id}b`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3a82ff" />
          <stop offset="1" stopColor="#0a47c4" />
        </linearGradient>
        <linearGradient id={`${id}d`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3a4556" />
          <stop offset="1" stopColor="#1b2433" />
        </linearGradient>
        <linearGradient id={`${id}m`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f4f7fb" />
          <stop offset=".5" stopColor="#c3ccd9" />
          <stop offset="1" stopColor="#8b97a8" />
        </linearGradient>
      </defs>
      <ellipse cx="110" cy="117" rx="94" ry="8" fill="#0a2a6b" opacity=".16" />

      {variant === "fiber" && (
        <g>
          <polygon points="22,92 116,66 206,88 112,116" fill={T} stroke="#b4c0d3" />
          <polygon points="22,92 112,116 112,124 22,100" fill="#8fa2bd" />
          <polygon points="112,116 206,88 206,96 112,124" fill="#b9c6da" />
          <path d="M40 90 L118 111 M62 84 L136 105 M84 78 L156 99 M106 72 L176 93" stroke="#c6d0df" />
          <polygon points="44,88 44,44 54,40 54,86" fill={B} />
          <polygon points="166,84 166,40 176,44 176,88" fill={B} />
          <polygon points="44,44 166,34 176,38 54,48" fill={B} />
          <path d="M54 46 L172 37" stroke="#8ab8ff" strokeWidth="1.2" />
          <rect x="98" y="40" width="14" height="13" rx="2" fill={D} />
          <polygon points="102,53 108,53 106,63 104,63" fill="#c4691f" />
          {spark(105, 66)}
          <rect x="182" y="62" width="14" height="44" rx="2" fill={T} stroke="#b4c0d3" />
          <rect x="174" y="50" width="30" height="20" rx="2" fill={D} />
          <rect x="177" y="53" width="24" height="14" fill="#3a82ff" opacity=".85" />
        </g>
      )}

      {variant === "tube" && (
        <g>
          <polygon points="12,98 190,80 208,90 30,110" fill={T} stroke="#b4c0d3" />
          <polygon points="12,98 30,110 30,118 12,106" fill="#8fa2bd" />
          <polygon points="30,110 208,90 208,98 30,118" fill="#b9c6da" />
          <rect x="24" y="68" width="166" height="14" rx="7" fill={M} stroke="#8b97a8" />
          <rect x="26" y="52" width="24" height="42" rx="3" fill={B} />
          <rect x="160" y="52" width="24" height="42" rx="3" fill={B} />
          <polygon points="84,26 112,26 118,68 78,68" fill={B} />
          <rect x="90" y="30" width="16" height="12" rx="2" fill={D} />
          <polygon points="95,64 101,64 99,72 97,72" fill="#c4691f" />
          {spark(98, 74)}
        </g>
      )}

      {variant === "sheet" && (
        <g>
          <polygon points="28,50 90,34 196,58 140,44" fill="#e8eef7" stroke="#b4c0d3" />
          <polygon points="28,50 140,44 140,104 28,108" fill={T} stroke="#b4c0d3" />
          <polygon points="140,44 196,58 196,96 140,104" fill="#c9d4e5" stroke="#b4c0d3" />
          <polygon points="38,58 130,54 130,92 38,96" fill="#6aa7ff" opacity=".35" stroke="#fff" />
          <polygon points="28,98 140,95 140,104 28,108" fill={B} />
          <polygon points="152,56 188,66 188,84 152,92" fill={D} />
          <polygon points="156,60 184,68 184,80 156,86" fill="#3a82ff" opacity=".85" />
          <rect x="76" y="62" width="14" height="10" rx="2" fill={D} />
          <polygon points="80,72 86,72 84,80 82,80" fill="#c4691f" />
          {spark(83, 83)}
        </g>
      )}

      {variant === "welding" && (
        <g>
          <rect x="56" y="34" width="74" height="76" rx="5" fill={T} stroke="#b4c0d3" />
          <rect x="63" y="41" width="60" height="24" rx="3" fill={D} />
          <rect x="66" y="44" width="54" height="18" rx="2" fill="#3a82ff" opacity=".85" />
          <circle cx="76" cy="76" r="4.5" fill={D} />
          <circle cx="94" cy="76" r="4.5" fill={D} />
          <circle cx="112" cy="76" r="4.5" fill={D} />
          <rect x="56" y="94" width="74" height="12" fill={B} />
          <circle cx="72" cy="113" r="5.5" fill="#1b2433" />
          <circle cx="116" cy="113" r="5.5" fill="#1b2433" />
          <rect x="142" y="52" width="20" height="58" rx="9" fill={M} stroke="#8b97a8" />
          <rect x="148" y="45" width="8" height="9" rx="2" fill={D} />
          <path
            d="M130 68 C150 78 160 100 176 96"
            stroke="#1b2433"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <rect x="174" y="90" width="26" height="8" rx="3" fill={D} transform="rotate(-20 187 94)" />
          {spark(204, 84)}
        </g>
      )}

      {variant === "marking" && (
        <g>
          <polygon points="52,102 128,92 172,102 96,114" fill={T} stroke="#b4c0d3" />
          <polygon points="52,102 96,114 96,120 52,108" fill="#8fa2bd" />
          <polygon points="96,114 172,102 172,108 96,120" fill="#b9c6da" />
          <rect x="82" y="20" width="18" height="82" rx="3" fill={T} stroke="#b4c0d3" />
          <rect x="86" y="26" width="72" height="14" rx="3" fill={B} />
          <rect x="140" y="38" width="18" height="30" rx="3" fill={D} />
          <polygon points="144,68 154,68 152,78 146,78" fill="#c4691f" />
          <motion.line
            x1="149"
            y1="78"
            x2="149"
            y2="96"
            stroke="#ff5a3c"
            strokeWidth="1.6"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <rect x="132" y="94" width="34" height="6" rx="1.5" fill="#9fb0c8" />
          {spark(149, 98)}
        </g>
      )}
    </svg>
  );
}
