import { use } from "react";

import { AppInstallContext } from "../providers/AppInstallContext";

export const useAppInstallContext = () => {
  const {
    animateInstallButton,
    beforeInstallPromptEvent,
    setAnimateInstallButton,
    setBeforeInstallPromptEvent,
    setShowInstall,
    setShowInstallDialog,
    showInstall,
    showInstallDialog,
  } = use(AppInstallContext);

  return {
    animateInstallButton,
    beforeInstallPromptEvent,
    setAnimateInstallButton,
    setBeforeInstallPromptEvent,
    setShowInstall,
    setShowInstallDialog,
    showInstall,
    showInstallDialog,
  };
};
