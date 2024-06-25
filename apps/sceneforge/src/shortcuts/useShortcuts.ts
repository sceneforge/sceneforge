import { useCallback } from "react";
import { useTranslation } from "react-i18next";

import { useAppTabs } from "../components/App";
import { DashboardViewTemplate, FormViewTemplate } from "../tabTemplates";
import { homeTab } from "./homeTab";
import { settingsTab } from "./settingsTab";

export const useShortcuts = () => {
  const { openTab } = useAppTabs();
  const { i18n, t } = useTranslation("tabs");

  const openHome = useCallback(async () => {
    const props = await homeTab(i18n, t);
    openTab("home-tab", t("HomeTab.title"), DashboardViewTemplate, props);
  }, [i18n, t, openTab]);

  const openSettings = useCallback(async () => {
    const props = await settingsTab(i18n, t);
    openTab("settings-tab", t("SettingsTab.title"), FormViewTemplate, props);
  }, [i18n, t, openTab]);

  return {
    openHome,
    openSettings,
  };
};
