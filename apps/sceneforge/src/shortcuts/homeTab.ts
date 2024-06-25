import type { DashboardViewTemplate } from "../tabTemplates";

import { ShortcutProps } from "./ShortcutProps";

export const homeTab: ShortcutProps<typeof DashboardViewTemplate> = (
  _i18n,
  t
) => ({
  title: t("HomeTab.title"),
});
