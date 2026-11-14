/** Deterministic pseudo-random so server and client render identical SVG output. */
export const rnd = (i, s = 1) => {
  const x = Math.sin(i * 12.9898 + s * 78.233) * 43758.5453;
  return x - Math.floor(x);
};
export const r1 = (n) => Math.round(n * 10) / 10;
