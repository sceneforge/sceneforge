import type { TFunction, i18n } from "i18next";

import { IconEnum } from "@sceneforge/ui";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { aboutTab, homeTab, settingsTab } from "../shortcuts";
import {
  DashboardViewTemplate,
  FormViewTemplate,
  MarkdownViewTemplate,
  SceneViewTemplate,
  type SceneViewTemplateProps,
  type TabTemplateProps,
  type TabTemplates,
} from "../templates";
import { type OpenTabFunction, useTabs } from "./useTabs";

export type OpenSceneFunction = (
  id: string,
  label: string,
  props: SceneViewTemplateProps
) => void;

export type ShortcutPropsProps = {
  i18n: i18n;
  openScene: OpenSceneFunction;
  openTab: OpenTabFunction;
  t: TFunction<"tabs">;
};

export type ShortcutProps<T extends TabTemplates = TabTemplates> = (
  props: ShortcutPropsProps
) => Promise<TabTemplateProps<T>> | TabTemplateProps<T>;

export type CreateOpenTabShortcut<T extends TabTemplates = TabTemplates> = (
  shortcutPropsFunction: ShortcutProps<T>,
  template: T,
  openTabParams: {
    icon: Parameters<OpenTabFunction<T>>[2];
    id: Parameters<OpenTabFunction<T>>[0];
    label: Parameters<OpenTabFunction<T>>[1];
  }
) => (() => Promise<void> | void);

export const useShortcuts = () => {
  const { openTab } = useTabs();
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
