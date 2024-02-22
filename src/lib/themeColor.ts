export const setThemeColor = (color: string): void => {
  const meta = document.querySelector("meta[name=theme-color]");

  if (meta) {
    meta.setAttribute("content", color);
  }
};

export const getThemeColor = (): string | null => {
  const meta = document.querySelector("meta[name=theme-color]");

  if (meta) {
    return meta.getAttribute("content");
  }
  return null;
};

export const observeThemeColor = (
  onChange: (content: string | null) => void
) => {
  const targetNode = document.querySelector("meta[name=theme-color]");

  if (targetNode) {
    const observer = new MutationObserver((mutationsList) => {
      for (const { type, target } of mutationsList) {
        if (type === "attributes" && target instanceof Element) {
          onChange(targetNode.getAttribute("content") ?? null);
        }
      }
    });
    observer.observe(targetNode, { attributes: true });
    return observer;
  }

  return null;
};

export const updateReferenceColor = (color: string | null): void => {
  if (
    color &&
    document.firstElementChild &&
    "style" in document.firstElementChild &&
    document.firstElementChild.style instanceof CSSStyleDeclaration
  ) {
    document.firstElementChild.style.setProperty("--color-reference", color);
  }
};
