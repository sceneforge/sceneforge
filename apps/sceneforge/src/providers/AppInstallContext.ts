import { createContext, type Dispatch, type SetStateAction } from "react";

import type { BeforeInstallPromptEvent } from "./AppInstall";

export type AppInstallContextType = {
  animateInstallButton: boolean;
  beforeInstallPromptEvent?: BeforeInstallPromptEvent | null;
  setAnimateInstallButton: Dispatch<SetStateAction<boolean>>;
  setBeforeInstallPromptEvent?: Dispatch<
    SetStateAction<BeforeInstallPromptEvent | null>
  >;
  setShowInstall: Dispatch<SetStateAction<boolean>>;
  setShowInstallDialog: Dispatch<SetStateAction<boolean>>;
  showInstall: boolean;
  showInstallDialog: boolean;
};

export const AppInstallContext = createContext<AppInstallContextType>({
  animateInstallButton: false,
  setAnimateInstallButton: () => void 0,
  setShowInstall: () => void 0,
  setShowInstallDialog: () => void 0,
  showInstall: false,
  showInstallDialog: false,
});
