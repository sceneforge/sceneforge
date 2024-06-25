import type { TFunction, i18n } from "i18next";

import type { TabTemplates } from "../tabTemplates";

export type ShortcutProps<T extends TabTemplates = TabTemplates> = (
  i18n: i18n,
  t: TFunction<"tabs", undefined>
) => Parameters<T>[0] | Promise<Parameters<T>[0]>;
