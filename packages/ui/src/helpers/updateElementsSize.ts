import { getNumber } from "./getNumber";

export const updateElementsSize = (
  property: "height" | "width",
  newSize: number | string,
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

  const newEndSize = (endSize + startSize);
  const newEndSizePercent = ((newEndSize / size) * 100);

  const newSizeValue = (typeof newSize === "number") ? `${getNumber(newSize)}%` : newSize;

  startElement.style.setProperty(`--${property}`, newSizeValue);
  endElement.style.setProperty(`--${property}`, `calc(${getNumber(newEndSizePercent)}% - ${newSizeValue})`);
};
