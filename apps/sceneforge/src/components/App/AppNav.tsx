import { type ToolbarProps, Topbar, Variant } from "@sceneforge/ui";
import { useTranslation } from "react-i18next";

import { useAppInstall } from "../AppInstall";
import { usePanel } from "../Panel";

export const AppNav = () => {
  const { t } = useTranslation("App");
  const { appTitle } = usePanel();
  const { openInstallDialog, showInstall }
    = useAppInstall();

  const toolbarEnd: ToolbarProps = {
    actions: [
      {
        label: t("AppNav.toolbarEnd.homeButton"),
        onClick: () => void 0,
        type: "button",
      },
      {
        label: t("AppNav.toolbarEnd.aboutButton"),
        onClick: () => void 0,
        type: "button",
      },
      {
        label: t("AppNav.toolbarEnd.settingsButton"),
        onClick: () => void 0,
        type: "button",
      },
    ],
  };

  if (showInstall) {
    toolbarEnd.actions = [
      {
        label: t("AppNav.toolbarEnd.installButton"),
        onClick: openInstallDialog,
        type: "button",
      },
      ...(toolbarEnd?.actions ?? []),
    ];
  }

  return (
    <Topbar
      title={appTitle ?? t("App.defaultAppTitle")}
      toolbarEnd={toolbarEnd}
      variant={Variant.Default}
    />
  );
};
