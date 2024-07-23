declare global {
  type EventListenerCallback = (
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: AddEventListenerOptions | boolean,
  ) => void;

  interface WindowControlsOverlay {
    addEventListener: EventListenerCallback;
    removeEventListener: EventListenerCallback;
    readonly visible: boolean;
  }

  interface Navigator {
    windowControlsOverlay?: WindowControlsOverlay;
  }
};

export const isOverlayVisible = (): boolean => {
  return window.navigator?.windowControlsOverlay?.visible ?? false;
};
