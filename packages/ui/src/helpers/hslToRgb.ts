const hueToColor = (p: number, q: number, t: number): number => {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
};

/**
 * Converts an HSL color value to RGB.
 *
 * @param hue Hue (0-360)
 * @param saturation Saturation (0-100)
 * @param lightness Lightness (0-100)
 * @return The RGB object
 */
export const hslToRgb = (
  hue: number,
  saturation: number,
  lightness: number
) => {
  const h = hue / 360;
  const s = saturation / 100;
  const l = lightness / 100;

  let r: number;
  let g: number;
  let b: number;

  if (s === 0) {
    r = g = b = l;
  }
  else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hueToColor(p, q, h + 1 / 3);
    g = hueToColor(p, q, h);
    b = hueToColor(p, q, h - 1 / 3);
  }

  return {
    blue: Math.round(b * 255),
    green: Math.round(g * 255),
    red: Math.round(r * 255),
  };
};
