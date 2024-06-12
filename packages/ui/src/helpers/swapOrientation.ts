import { Orientation } from "../types";

export const swapOrientation = (
  element: HTMLElement,
  orientation: Orientation = Orientation.Horizontal
) => {
  if (orientation === Orientation.Horizontal) {
    element.style.width = element.style.height;
    element.style.height = "";
  } else {
    element.style.height = element.style.width;
    element.style.width = "";
  }
};
