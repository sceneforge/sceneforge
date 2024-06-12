import { Dialog, Variant } from "@sceneforge/ui";
import { useTranslation } from "react-i18next";

import { useAppInstall } from "./useAppInstall";

export const AppInstall = () => {
  const { t } = useTranslation("AppInstall");
  const { closeInstallDialog, installPrompt, showInstallDialog }
    = useAppInstall();

  if (!showInstallDialog) return null;

  return (
    <Dialog
      description={t("description")}
      onClose={closeInstallDialog}
      title={t("title")}
      toolbar={{
        actions: [
          {
            label: t("actions.installButton"),
            onClick: () => {
              installPrompt()
                ?.then(() => {
                  closeInstallDialog();
                })
                .catch(() => {
                  closeInstallDialog();
                });
            },
            type: "button",
          },
        ],
      }}
      variant={Variant.Default}
    />
  );
};
