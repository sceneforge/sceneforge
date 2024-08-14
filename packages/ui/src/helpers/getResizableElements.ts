export type ResizableElements = {
  end?: HTMLElement;
  start?: HTMLElement;
};

export const getResizableElements = (
  element: HTMLElement
): ResizableElements => {
  let start: HTMLElement | undefined;
  let end: HTMLElement | undefined;

  if (element.dataset.resizeIdStart !== undefined) {
    start = element.parentNode?.querySelector(`#${CSS.escape(element.dataset.resizeIdStart)}`) ?? undefined;
  }

  if (element.dataset.resizeIdEnd !== undefined) {
    end = element.parentNode?.querySelector(`#${CSS.escape(element.dataset.resizeIdEnd)}`) ?? undefined;
  }

  return {
    end,
    start,
  };
};
