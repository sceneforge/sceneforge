const num = (str: string): number => {
  return parseInt(`0${str.replace(/[^\d]/g, "")}`, 10);
};

export const changeSize = (
  panel: HTMLElement | null | undefined,
  orientation: "block" | "inline",
  position: "start" | "end",
  { movementX, movementY }: Pick<MouseEvent, "movementX" | "movementY">,
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

const elementInTarget = (
  element: HTMLElement,
  target: HTMLElement,
  maxDepth: number,
): boolean => {
  if (element === target) return true;
  if (maxDepth <= 0) return false;
  if (element.parentElement)
    return elementInTarget(element.parentElement, target, maxDepth - 1);
  return false;
};

export const targetClicked = (
  panel: HTMLElement | null | undefined,
  orientation: "block" | "inline",
  position: "start" | "end",
  { target, offsetX, offsetY }: MouseEvent,
  pseudoElt?: string | null,
  children?: boolean,
) => {
  if (!panel) return false;
  if (!children && target !== panel) return false;
  if (children && !elementInTarget(target as HTMLElement, panel, 5))
    return false;

  const { height: aH, width: aW } = window.getComputedStyle(panel, pseudoElt);

  if (position === "end") {
    return orientation === "block" ? offsetY < num(aH) : offsetX < num(aW);
  }

  const { height, width } = panel.getBoundingClientRect();

  return orientation === "block"
    ? offsetY > height - num(aH)
    : offsetX > width - num(aW);
};
