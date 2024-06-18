import { useCallback } from "react";
import { useTranslation } from "react-i18next";

import { useTabPanel } from "../components/TabPanel";
import { SettingsTab } from "../tabs";
import { useTabs } from "./useTabs";

export const useShortcuts = () => {
  const { t } = useTranslation("App");
  const { defaultTab, openTab } = useTabPanel();
  const { newMarkdownTab, newModelViewTab } = useTabs();

  const openTabAbout = useCallback(
    () =>
      newMarkdownTab({
        href: "/docs/about.md",
        id: "about",
        title: t("AppNav.toolbarEnd.aboutTabTitle"),
        translation: {
          key: "AppNav.toolbarEnd.aboutTabTitle",
          ns: "App",
        },
      }),
    [newMarkdownTab, t]
  );

  const openTabSettings = openTab({
    active: true,
    component: SettingsTab,
    id: "settings",
    title: t("AppNav.toolbarEnd.settingsTabTitle"),
    translation: { key: "AppNav.toolbarEnd.settingsTabTitle", ns: "App" },
  });

  const openTabHome = openTab(defaultTab);

  const newTabScene = useCallback(() => {
    newModelViewTab({});
  }, [newModelViewTab]);

  const shortcutActions = [
    { action: "open-tab", callback: openTabAbout, params: { tab: "about" } },
    {
      action: "open-tab",
      callback: openTabSettings,
      params: { tab: "settings" },
    },
    { action: "new-tab", callback: newTabScene, params: { tab: "new-scene" } },
  ] as const;

  return {
    newTabScene,
    openTabAbout,
    openTabHome,
    openTabSettings,
    shortcutActions,
  };
};
