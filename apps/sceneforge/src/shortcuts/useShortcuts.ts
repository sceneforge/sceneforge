import { IconEnum } from "@sceneforge/ui";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

import type { SceneViewTemplateProps, TabTemplates } from "../tabTemplates";
import type { ShortcutProps } from "./ShortcutProps";

import { useAppTabs } from "../components/App";
import { OpenTabFunction } from "../components/App/useAppTabs";
import {
  DashboardViewTemplate,
  FormViewTemplate,
  MarkdownViewTemplate,
  SceneViewTemplate,
} from "../tabTemplates";
import { aboutTab } from "./aboutTab";
import { homeTab } from "./homeTab";
import { settingsTab } from "./settingsTab";

type CreateOpenTabShortcut<T extends TabTemplates = TabTemplates> = (
  shortcutPropsFunction: ShortcutProps<T>,
  template: T,
  openTabParams: {
    icon: Parameters<OpenTabFunction<T>>[2];
    id: Parameters<OpenTabFunction<T>>[0];
    label: Parameters<OpenTabFunction<T>>[1];
  }
) => (() => Promise<void> | void);

export const useShortcuts = () => {
  const { openTab } = useAppTabs();
  const { i18n, t } = useTranslation("tabs");

  const openScene = useCallback(
    (id: string, label: string, props: SceneViewTemplateProps) => {
      return openTab(
        `scene-${id}`,
        label,
        IconEnum.Landscape2,
        SceneViewTemplate,
        props
      );
    },
    [openTab]
  );

  const createOpenTabShortcut: CreateOpenTabShortcut = useCallback((
    shortcutPropsFunction,
    template,
    { icon, id, label }
  ) => {
    return async () => {
      const props = await shortcutPropsFunction({
        i18n,
        openScene,
        openTab,
        t,
      });
      openTab(id, label, icon, template, props);
    };
  }, [i18n, openTab, openScene, t]);

  const openHome = useMemo(() => createOpenTabShortcut(
    homeTab,
    DashboardViewTemplate,
    {
      icon: IconEnum.Home,
      id: "home-tab",
      label: t("HomeTab.title"),
    }
  ), [createOpenTabShortcut, t]);

  const openSettings = useMemo(() => createOpenTabShortcut(
    settingsTab,
    FormViewTemplate,
    {
      icon: IconEnum.Settings,
      id: "settings-tab",
      label: t("SettingsTab.title"),
    }
  ), [createOpenTabShortcut, t]);

  const openAbout = useMemo(() => createOpenTabShortcut(
    aboutTab,
    MarkdownViewTemplate,
    {
      icon: IconEnum.QuestionMark,
      id: "about-tab",
      label: t("AboutTab.title"),
    }
  ), [createOpenTabShortcut, t]);

  return {
    openAbout,
    openHome,
    openScene,
    openSettings,
  };
};
