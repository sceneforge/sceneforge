const num = (str: string): number => {
  return parseInt(`0${str.replace(/[^\d]/g, "")}`, 10);
};

export const changeSize = (
  panel: HTMLElement | null | undefined,
  orientation: "block" | "inline",
  position: "start" | "end",
  { movementX, movementY }: Pick<MouseEvent, "movementX" | "movementY">
) => {
  if (!panel) return;

  const { height: h = 0, width: w = 0 } = panel.getBoundingClientRect();
  const { nH, nW } =
    position === "end"
      ? { nH: h - movementY, nW: w - movementX }
      : { nH: h + movementY, nW: w + movementX };
  const { property, value } =
    orientation === "block"
      ? { property: "height", value: `${nH}px` }
      : { property: "width", value: `${nW}px` };

  panel.style.setProperty(property, value);
};

export const targetClicked = (
  panel: HTMLElement | null | undefined,
  orientation: "block" | "inline",
  position: "start" | "end",
  { target, offsetX, offsetY }: MouseEvent,
  pseudoElt?: string | null
) => {
  if (!panel) return false;
  if (target !== panel) return false;

  const { height: aH, width: aW } = window.getComputedStyle(panel, pseudoElt);

  if (position === "end") {
    return orientation === "block" ? offsetY < num(aH) : offsetX < num(aW);
  }

  const { height, width } = panel.getBoundingClientRect();

  return orientation === "block"
    ? offsetY > height - num(aH)
    : offsetX > width - num(aW);
};
