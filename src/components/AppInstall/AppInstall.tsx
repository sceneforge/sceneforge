import { Dialog } from "../Dialog";
import { useAppInstall } from "./useAppInstall";

export const AppInstall = () => {
  const { closeInstallDialog, installPrompt, showInstallDialog } =
    useAppInstall();

  if (!showInstallDialog) return null;

  return (
    <Dialog
      title="Install"
      description="Install this app to your device for a better experience"
      onClose={closeInstallDialog}
      variant="default"
      toolbar={{
        items: [
          {
            type: "item",
            label: "Install",
            onClick: () => {
              installPrompt();
              closeInstallDialog();
            },
          },
        ],
      }}
    />
  );
};
