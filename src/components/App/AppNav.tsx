import { usePanel } from "../Panel";
import { Topbar } from "../Topbar";
import { ToolbarProps } from "../Toolbar";
import { useAppInstall } from "../AppInstall";
import { useTranslation } from "react-i18next";
import { useShortcuts } from "../../hooks/useShortcuts";

export const AppNav = () => {
  const { t } = useTranslation("App");
  const { appTitle } = usePanel();
  const { openTabHome, openTabAbout, openTabSettings } = useShortcuts();
  const { showInstall, openInstallDialog, animateInstallButton }
    = useAppInstall();

  const toolbarEnd: ToolbarProps = {
    icon: "moreVert",
    items: [
      {
        type: "item",
        label: t("AppNav.toolbarEnd.homeButton"),
        onClick: openTabHome,
      },
      {
        type: "item",
        label: t("AppNav.toolbarEnd.aboutButton"),
        onClick: openTabAbout,
      },
      {
        type: "item",
        label: t("AppNav.toolbarEnd.settingsButton"),
        onClick: openTabSettings,
      },
    ],
  };

  if (showInstall) {
    toolbarEnd.items = [
      {
        type: "item",
        label: t("AppNav.toolbarEnd.installButton"),
        onClick: openInstallDialog,
        extendedClassName: animateInstallButton
          ? "font-bold animate-pulse animate-duration-1000 ring-1 hover:animate-none hover:ring-0 light:ring-light:20 dark:ring-black:20 light:bg-white:10 dark:bg-black:10"
          : undefined,
      },
      ...(toolbarEnd?.items ?? []),
    ];
  }

  return (
    <Topbar
      toolbarEnd={toolbarEnd}
      title={appTitle ?? t("App.defaultAppTitle")}
    />
  );
};
