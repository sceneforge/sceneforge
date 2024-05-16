import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useTabs } from "./useTabs";
import { useTabPanel } from "../components/TabPanel";
import { SettingsTab } from "../tabs";

export const useShortcuts = () => {
  const { t } = useTranslation("App");
  const { openTab, defaultTab } = useTabPanel();
  const { newMarkdownTab, newModelViewTab } = useTabs();

  const openTabAbout = useCallback(
    () =>
      newMarkdownTab({
        id: "about",
        title: t("AppNav.toolbarEnd.aboutTabTitle"),
        translation: {
          ns: "App",
          key: "AppNav.toolbarEnd.aboutTabTitle",
        },
        href: "/docs/about.md",
      }),
    [newMarkdownTab, t],
  );

  const openTabSettings = openTab({
    id: "settings",
    title: t("AppNav.toolbarEnd.settingsTabTitle"),
    translation: { ns: "App", key: "AppNav.toolbarEnd.settingsTabTitle" },
    active: true,
    component: SettingsTab,
  });

  const openTabHome = openTab(defaultTab);

  const newTabScene = useCallback(() => {
    newModelViewTab({});
  }, [newModelViewTab]);

  const shortcutActions = [
    { action: "open-tab", params: { tab: "about" }, callback: openTabAbout },
    {
      action: "open-tab",
      params: { tab: "settings" },
      callback: openTabSettings,
    },
    { action: "new-tab", params: { tab: "new-scene" }, callback: newTabScene },
  ] as const;

  return {
    openTabHome,
    openTabAbout,
    openTabSettings,
    newTabScene,
    shortcutActions,
  };
};
