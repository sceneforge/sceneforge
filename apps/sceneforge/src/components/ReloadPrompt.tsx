import { Dialog, Variant } from "@sceneforge/ui";
import { useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useRegisterSW } from "virtual:pwa-register/react";

const ReloadPrompt = () => {
  const { t } = useTranslation("ReloadPrompt");
  const dialogReference = useRef<HTMLDialogElement | null>(null);
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    offlineReady: [offlineReady, setOfflineReady],
    updateServiceWorker,
  } = useRegisterSW();

  const close = useCallback(() => {
    setOfflineReady(false);
    setNeedRefresh(false);
  }, [setOfflineReady, setNeedRefresh]);

  const reload = useCallback(() => {
    updateServiceWorker(true)
      .then(() => {
        close();
      })
      .catch((error: unknown) => {
        close();
        throw new Error("Failed to update service worker", { cause: error });
      });
  }, [close, updateServiceWorker]);

  if (!offlineReady && !needRefresh) return null;

  return (
    <Dialog
      actions={needRefresh
        ? [
          {
            kind: "button",
            label: t("actions.reloadButton"),
            onClick: reload,
          },
        ]
        : undefined}
      description={
        offlineReady
          ? t("description.offlineReady")
          : (needRefresh
            ? t("description.needsRefresh")
            : undefined)
      }
      onClose={close}
      ref={dialogReference}
      title={t("title")}
      variant={Variant.Accent}
    />
  );
};

export default ReloadPrompt;
