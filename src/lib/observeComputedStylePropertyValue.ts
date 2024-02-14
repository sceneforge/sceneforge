export const observeComputedStylePropertyValue = (
  targetNode: Element | null | undefined,
  propertyValue: string,
  onChange: (color: CSSStyleValue) => void
) => {
  if (!targetNode) {
    return;
  }
  onChange(getComputedStyle(targetNode).getPropertyValue(propertyValue));

  const observer = new MutationObserver((mutationsList) => {
    for (const { type, target } of mutationsList) {
      if (type === "attributes" && target instanceof Element) {
        onChange(getComputedStyle(targetNode).getPropertyValue(propertyValue));
      }
    }
  });
  observer.observe(targetNode, { attributes: true });
  return observer;
};
