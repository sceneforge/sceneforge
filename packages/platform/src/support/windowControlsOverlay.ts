export const supportWindowControlsOverlay = (): boolean => {
  if (window instanceof Window && "navigator" in window && "windowControlsOverlay" in window.navigator) {
    return (
      typeof window.navigator.windowControlsOverlay === "object"
      && window.navigator.windowControlsOverlay !== null
    );
  }
  return false;
};
