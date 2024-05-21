import { useTranslation } from "react-i18next";

import { useShortcuts } from "../../hooks/useShortcuts";
import { useAppInstall } from "../AppInstall";
import { usePanel } from "../Panel";
import { ToolbarProps } from "../Toolbar";
import { Topbar } from "../Topbar";

export const AppNav = () => {
  const { t } = useTranslation("App");
  const { appTitle } = usePanel();
  const { openTabAbout, openTabHome, openTabSettings } = useShortcuts();
  const { animateInstallButton, openInstallDialog, showInstall }
    = useAppInstall();

  const toolbarEnd: ToolbarProps = {
    icon: "moreVert",
    items: [
      {
        label: t("AppNav.toolbarEnd.homeButton"),
        onClick: openTabHome,
        type: "item",
      },
      {
        label: t("AppNav.toolbarEnd.aboutButton"),
        onClick: openTabAbout,
        type: "item",
      },
      {
        label: t("AppNav.toolbarEnd.settingsButton"),
        onClick: openTabSettings,
        type: "item",
      },
    ],
  };

  if (showInstall) {
    toolbarEnd.items = [
      {
        extendedClassName: animateInstallButton
          ? "font-bold animate-pulse animate-duration-1000 ring-1 hover:animate-none hover:ring-0 light:ring-light:20 dark:ring-black:20 light:bg-white:10 dark:bg-black:10"
          : undefined,
        label: t("AppNav.toolbarEnd.installButton"),
        onClick: openInstallDialog,
        type: "item",
      },
      ...(toolbarEnd?.items ?? []),
    ];
  }

  return (
    <Topbar
      title={appTitle ?? t("App.defaultAppTitle")}
      toolbarEnd={toolbarEnd}
    />
  );
};
