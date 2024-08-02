export const supportCSSAnchorName = (): boolean => {
  if (window instanceof Window) {
    return window.CSS.supports("anchor-name", "--anchor-name-variable");
  };
  return false;
};
