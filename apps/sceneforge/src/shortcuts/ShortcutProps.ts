import type { TFunction, i18n } from "i18next";

import type { OpenTabFunction } from "../components/App/useAppTabs";
import type { SceneViewTemplateProps, TabTemplates } from "../tabTemplates";

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
) => Parameters<T>[0] | Promise<Parameters<T>[0]>;
