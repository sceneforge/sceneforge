import { parseCSSColorPropertyValue } from "./parseCSSColorPropertyValue";

export const convertColor = (color: string | undefined) => {
  if (color) {
    const rgba = parseCSSColorPropertyValue(color);
    if (rgba) {
      return [
        "#",
        rgba.r.toString(16),
        rgba.g.toString(16),
        rgba.b.toString(16),
      ].join("");
    }
  }
  return;
};
