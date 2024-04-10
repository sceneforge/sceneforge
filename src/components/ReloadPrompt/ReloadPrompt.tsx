import { useCallback, useRef } from "react";
import { useRegisterSW } from "virtual:pwa-register/react"
import { Dialog } from "../Dialog";

export const ReloadPrompt = () => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
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
    updateServiceWorker(true);
    close();
  }, [close, updateServiceWorker]);

  if (!offlineReady && !needRefresh) return null;

  return (
    <Dialog
      ref={dialogRef}
      title="Service Worker Update"
      variant="accent"
      toolbar={{
        items: needRefresh
          ? [
              {
                type: "item",
                onClick: reload,
                children: "Reload",
              },
            ]
          : undefined,
      }}
      description={
        offlineReady
          ? "App ready to work offline."
          : needRefresh
          ? "New content available, click on reload button to update."
          : undefined
      }
      onClose={close}
    />
  );
}
