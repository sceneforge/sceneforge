import { IconEnum } from "@sceneforge/ui";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

import { useAppTabs } from "../components/App";
import {
  DashboardViewTemplate,
  FormViewTemplate,
  MarkdownViewTemplate,
} from "../tabTemplates";
import { aboutTab } from "./aboutTab";
import { homeTab } from "./homeTab";
import { settingsTab } from "./settingsTab";

export const useShortcuts = () => {
  const { openTab } = useAppTabs();
  const { i18n, t } = useTranslation("tabs");

  const openHome = useCallback(async () => {
    const props = await homeTab(i18n, t);
    openTab(
      "home-tab",
      t("HomeTab.title"),
      IconEnum.Home,
      DashboardViewTemplate,
      props
    );
  }, [i18n, t, openTab]);

  const openSettings = useCallback(async () => {
    const props = await settingsTab(i18n, t);
    openTab(
      "settings-tab",
      t("SettingsTab.title"),
      IconEnum.Settings,
      FormViewTemplate,
      props
    );
  }, [i18n, t, openTab]);

  const openAbout = useCallback(async () => {
    const props = await aboutTab(i18n, t);
    openTab(
      "about-tab",
      t("AboutTab.title"),
      IconEnum.QuestionMark,
      MarkdownViewTemplate,
      props
    );
  }, [i18n, t, openTab]);

  return {
    openAbout,
    openHome,
    openSettings,
  };
};
