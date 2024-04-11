import { useTranslation } from "react-i18next";
import { Dialog } from "../Dialog";
import { useAppInstall } from "./useAppInstall";

export const AppInstall = () => {
  const { t } = useTranslation("AppInstall");
  const { closeInstallDialog, installPrompt, showInstallDialog } =
    useAppInstall();

  if (!showInstallDialog) return null;

  return (
    <Dialog
      title={t("title")}
      description={t("description")}
      onClose={closeInstallDialog}
      variant="default"
      toolbar={{
        items: [
          {
            type: "item",
            label: t("actions.installButton"),
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
