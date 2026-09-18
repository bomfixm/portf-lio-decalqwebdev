/** Converte "#c3f294" em "195 242 148" para uso em rgb(var(--x) / alpha). */
export function hexToRgbChannels(hex: string): string {
  const clean = hex.replace("#", "").trim();
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean;
  const n = parseInt(full.slice(0, 6), 16);
  if (Number.isNaN(n)) return "195 242 148";
  return `${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255}`;
}
