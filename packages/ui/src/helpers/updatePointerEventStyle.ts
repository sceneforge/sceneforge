export const updatePointerEventStyle = <V extends string = string>(
  element: HTMLElement | null | undefined,
  value: V
) => {
  if (element instanceof HTMLElement) {
    element.style.pointerEvents = value;
    element.style.userSelect = value;
    element.style.touchAction = value;

    if (value === "none" && element.ariaDisabled !== "true") {
      element.ariaDisabled = "true";
      element.style.opacity = "0.5";
      element.style.overflow = "hidden";
    }
    else if (value !== "none" && element.ariaDisabled === "true") {
      element.ariaDisabled = "false";
      element.style.opacity = "";
      element.style.overflow = "";
    }
  }
};
