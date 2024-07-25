/**
 * Converts an RGB color value to HSL.
 *
 * @param red Red color value (0-255)
 * @param green Green color value (0-255)
 * @param blue Blue color value (0-255)
 * @return The HSL object
 */
export const rgbToHsl = (
  red: number,
  green: number,
  blue: number
) => {
  const r = red / 255;
  const g = green / 255;
  const b = blue / 255;

  const vmax = Math.max(r, g, b);
  const vmin = Math.min(r, g, b);

  let h: number = 0;

  const l: number = (vmax + vmin) / 2;

  if (vmax === vmin) {
    return {
      hue: 0,
      lightness: l * 100,
      saturation: 0,
    };
  }

  const d = vmax - vmin;

  const s = l > 0.5 ? d / (2 - vmax - vmin) : d / (vmax + vmin);
  if (vmax === r) {
    h = (g - b) / d + (g < b ? 6 : 0);
  }
  if (vmax === g) {
    h = (b - r) / d + 2;
  }
  if (vmax === b) {
    h = (r - g) / d + 4;
  }
  h /= 6;

  return {
    hue: h * 360,
    lightness: l * 100,
    saturation: s * 100,
  };
};
