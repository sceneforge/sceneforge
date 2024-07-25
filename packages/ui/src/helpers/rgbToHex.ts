export const rgbToHex = (red: number, green: number, blue: number) => {
  return `#${((1 << 24) + (red << 16) + (green << 8) + blue).toString(16).slice(1)}`.toLocaleUpperCase();
};
