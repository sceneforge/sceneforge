import { getNumber } from "./getNumber";

export const updateElementsSizeByMovement = (
  property: "height" | "width",
  movement: number,
  element?: HTMLElement | null,
  startElement?: HTMLElement | null,
  endElement?: HTMLElement | null
) => {
  if (!(element instanceof HTMLElement)) return;
  if (!(startElement instanceof HTMLElement)) return;
  if (!(endElement instanceof HTMLElement)) return;

  const size = element.getBoundingClientRect()[property];

  const startSize = startElement.getBoundingClientRect()[property];
  const endSize = endElement.getBoundingClientRect()[property];

  const newStartSize = startSize + movement;
  const newEndSize = endSize - movement;

  const newStartSizePercent = (newStartSize / size) * 100;
  const newEndSizePercent = (newEndSize / size) * 100;

  startElement.style[property] = `${getNumber(newStartSizePercent)}%`;
  endElement.style[property] = `${getNumber(newEndSizePercent)}%`;
};
