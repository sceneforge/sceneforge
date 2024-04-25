import { useCallback, useContext, useEffect } from "react";
import {
  AppInstallContext,
  type BeforeInstallPromptEvent,
} from "./AppInstallProvider";

const ANIMATION_TIMEOUT = 1000 * 60 * 5; // 1 minute

export const useAppInstall = () => {
  const {
    animateInstallButton,
    beforeInstallPromptEvent,
    setAnimateInstallButton,
    setBeforeInstallPromptEvent,
    setShowInstall,
    setShowInstallDialog,
    showInstall,
    showInstallDialog,
  } = useContext(AppInstallContext);

  const beforeInstallHandler = useCallback(
    (e: Event) => {
      e.preventDefault();
      if (setBeforeInstallPromptEvent) {
        setBeforeInstallPromptEvent(e as BeforeInstallPromptEvent);
      }
      setShowInstall(true);
    },
    [setShowInstall, setBeforeInstallPromptEvent],
  );

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", beforeInstallHandler);
    return () => {
      window.removeEventListener("beforeinstallprompt", beforeInstallHandler);
    };
  }, [beforeInstallHandler]);

  const openInstallDialog = useCallback(() => {
    setAnimateInstallButton(false);
    if (beforeInstallPromptEvent && showInstall) {
      setShowInstallDialog(true);
    }
  }, [
    setAnimateInstallButton,
    beforeInstallPromptEvent,
    showInstall,
    setShowInstallDialog,
  ]);

  const closeInstallDialog = useCallback(() => {
    setShowInstallDialog(false);
  }, [setShowInstallDialog]);

  const installPrompt = useCallback(() => {
    if (
      showInstall &&
      beforeInstallPromptEvent &&
      beforeInstallPromptEvent.prompt
    ) {
      return beforeInstallPromptEvent.prompt();
    }
  }, [showInstall, beforeInstallPromptEvent]);

  useEffect(() => {
    if (showInstall) {
      setAnimateInstallButton(true);

      const timeout = setTimeout(() => {
        setAnimateInstallButton(false);
      }, ANIMATION_TIMEOUT);

      return () => {
        setAnimateInstallButton(false);
        clearTimeout(timeout);
      };
    }
  }, [showInstall, setAnimateInstallButton]);

  return {
    animateInstallButton,
    beforeInstallPromptEvent,
    closeInstallDialog,
    installPrompt,
    openInstallDialog,
    showInstall,
    showInstallDialog,
  };
};
