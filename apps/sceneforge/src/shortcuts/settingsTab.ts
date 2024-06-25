import { Variant } from "@sceneforge/ui";

import type { FormViewTemplate } from "../tabTemplates";

import { ShortcutProps } from "./ShortcutProps";

export const settingsTab: ShortcutProps<typeof FormViewTemplate> = (
  i18n,
  t
) => ({
  fieldsets: [
    {
      fields: [
        {
          label: "Tabs Position",
          name: "tabsPosition",
          options: [
            { label: "Top", value: "top" },
            { label: "Bottom", value: "bottom" },
          ],
          type: "select",
        },
        {
          label: "Language",
          name: "language",
          options: i18n.languages.map((locale) => {
            return {
              label: t(`locales.${locale}`, {
                defaultValue: locale,
                lng: locale,
                ns: "common",
              }),
              value: locale,
            };
          }),
          type: "select",
          value: i18n.language,
        },
      ],
      legend: "General",
      variant: Variant.Default,
    },
  ],
  id: "settings-tab",
  title: t("SettingsTab.title"),
});
