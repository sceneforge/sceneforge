type EyeDropperOpenResult = {
  sRGBHex: string;
};

interface EyeDropper {
  new(): this;
  open(): Promise<EyeDropperOpenResult>;
};

declare global {
  interface Window {
    EyeDropper?: EyeDropper;
  }
}

export const supportEyeDropper = (): boolean => {
  if (window instanceof Window && "EyeDropper" in window) {
    return window.EyeDropper !== undefined;
  };
  return false;
};
