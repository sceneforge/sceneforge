import { useCallback, useRef } from "react";
import { useRegisterSW } from "virtual:pwa-register/react";
import { Dialog } from "../Dialog";
import { useTranslation } from "react-i18next";

export const ReloadPrompt = () => {
  const { t } = useTranslation("ReloadPrompt");
  const dialogReference = useRef<HTMLDialogElement | null>(null);
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
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
      ref={dialogReference}
      title={t("title")}
      variant="accent"
      toolbar={{
        items: needRefresh
          ? [
            {
              type: "item",
              onClick: reload,
              children: t("actions.reloadButton"),
            },
          ]
          : undefined,
      }}
      description={
        offlineReady
          ? t("description.offlineReady")
          : (needRefresh
            ? t("description.needsRefresh")
            : undefined)
      }
      onClose={close}
    />
  );
};
