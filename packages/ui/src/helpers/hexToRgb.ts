export const hexToRgb = (hex: string) => {
  const parsed = hex.replace("#", "").match(/.{2}/g);
  if (!parsed) throw new Error(`Invalid hex color: ${hex}`);
  const [red, green, blue] = parsed.map(color => Number.parseInt(color, 16));
  return { blue, green, red };
};
