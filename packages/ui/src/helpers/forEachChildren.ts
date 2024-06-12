export const forEachChildren = <T extends HTMLElement = HTMLElement>(
  element: HTMLElement,
  callback: (child: T) => void,
  when?: (child: T) => boolean
) => {
  if (when !== undefined) {
    element.childNodes.forEach((child) => {
      if (child instanceof HTMLElement && when(child as T)) {
        callback(child as T);
      }
    });
  } else {
    element.childNodes.forEach((child) => {
      if (child instanceof HTMLElement) {
        callback(child as T);
      }
    });
  }
};
