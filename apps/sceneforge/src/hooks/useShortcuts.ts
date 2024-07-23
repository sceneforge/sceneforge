import type { TFunction, i18n } from "i18next";

import { IconEnum } from "@sceneforge/ui";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { aboutTab, homeTab, settingsTab } from "../shortcuts";
import {
  DashboardViewTab,
  FormViewTab,
  MarkdownViewTab,
  SceneViewTab,
  type SceneViewTabProps,
  type TabTemplateProps,
  type TabTemplates,
} from "../templates";
import { type OpenTabFunction, useTabs } from "./useTabs";

export enum ShortcutName {
  About = "about",
  Home = "home",
  Scene = "scene",
  Settings = "settings",
};

export type OpenSceneFunction = (
  id: string,
  label: string,
  props: SceneViewTabProps
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
    (id: string, label: string, props: SceneViewTabProps) => {
      return openTab(
        `scene-${id}`,
        label,
        IconEnum.Landscape2,
        SceneViewTab,
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
    DashboardViewTab,
    {
      icon: IconEnum.Home,
      id: "home-tab",
      label: t("HomeTab.title"),
    }
  ), [createOpenTabShortcut, t]);

  const openSettings = useMemo(() => createOpenTabShortcut(
    settingsTab,
    FormViewTab,
    {
      icon: IconEnum.Settings,
      id: "settings-tab",
      label: t("SettingsTab.title"),
    }
  ), [createOpenTabShortcut, t]);

  const openAbout = useMemo(() => createOpenTabShortcut(
    aboutTab,
    MarkdownViewTab,
    {
      icon: IconEnum.QuestionMark,
      id: "about-tab",
      label: t("AboutTab.title"),
    }
  ), [createOpenTabShortcut, t]);

  const open = useCallback((name: ShortcutName) => {
    switch (name) {
      case ShortcutName.About:
        return openAbout();
      case ShortcutName.Home:
        return openHome();
      case ShortcutName.Settings:
        return openSettings();
      default:
        throw new Error(`Unknown shortcut: ${name}`);
    }
  }, [
    openAbout,
    openHome,
    openSettings,
  ]);

  return {
    open,
    openAbout,
    openHome,
    openScene,
    openSettings,
  };
};
