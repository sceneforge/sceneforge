import { type ToolbarProps, Topbar, Variant } from "@sceneforge/ui";
import { useTranslation } from "react-i18next";

import { useShortcuts } from "../../hooks/useShortcuts";
import { useAppInstall } from "../AppInstall";
import { usePanel } from "../Panel";

export const AppNav = () => {
  const { t } = useTranslation("App");
  const { appTitle } = usePanel();
  const { openTabAbout, openTabHome, openTabSettings } = useShortcuts();
  const { openInstallDialog, showInstall }
    = useAppInstall();

  const toolbarEnd: ToolbarProps = {
    actions: [
      {
        label: t("AppNav.toolbarEnd.homeButton"),
        onClick: openTabHome,
        type: "button",
      },
      {
        label: t("AppNav.toolbarEnd.aboutButton"),
        onClick: openTabAbout,
        type: "button",
      },
      {
        label: t("AppNav.toolbarEnd.settingsButton"),
        onClick: openTabSettings,
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
