export const dataset = (element: HTMLElement, key: string, value?: string) => {
  if (value === undefined) {
    return element.dataset[key];
  }
  else {
    element.dataset[key] = value;
    return;
  }
};
