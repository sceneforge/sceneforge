import { getThemeList } from "@sceneforge/core";
import { database } from "@sceneforge/data";
import { Variant } from "@sceneforge/ui";

import type { ShortcutProps } from "../hooks";
import type { FormViewTab } from "../templates";

export const settingsTab: ShortcutProps<typeof FormViewTab> = async ({
  i18n,
  t,
}) => {
  const currentMainTabPosition = await database.settings.get("mainTabPosition");
  const currentLanguage = await database.settings.get("language");
  const themeList = await getThemeList();

  return {
    fieldsets: [
      {
        fields: [
          {
            defaultValue: currentMainTabPosition?.value as string | undefined,
            label: "Tabs Position",
            name: "mainTabPosition",
            onChange: (next) => {
              if (next === "start") {
                void database.settings.put({
                  key: "mainTabPosition",
                  value: "start",
                }, "tabsPosition");
              }
              else if (next === "end") {
                void database.settings.put({
                  key: "mainTabPosition",
                  value: "end",
                }, "mainTabPosition");
              }
            },
            options: [
              { label: "Top", value: "start" },
              { label: "Bottom", value: "end" },
            ],
            type: "select",
          },
          {
            defaultValue: currentLanguage?.value as string | undefined,
            label: "Language",
            name: "language",
            onChange: (next) => {
              if (typeof next === "string") {
                void database.settings.put({
                  key: "language",
                  value: next,
                }, "language");
              }
            },
            options: i18n.languages.map(value => ({
              label: t(`locales.${value}`, {
                defaultValue: value,
                lng: value,
                ns: "common",
              }),
              value,
            })),
            type: "select",
            value: i18n.language,
          },
        ],
        legend: "General",
        variant: Variant.Primary,
      },
      {
        fields: [
          {
            label: "Color Scheme",
            name: "color-scheme",
            options: [
              { label: "Dark Mode", value: "dark" },
              { label: "Light Mode", value: "light" },
              { label: "Automatic", value: "auto" },
            ],
            type: "select",
          },
          {
            label: "Theme",
            name: "theme",
            options: themeList.themes.map(({ id, name }) => ({
              label: name,
              value: id,
            })),
            type: "select",
          },
        ],
        legend: "Appearance",
        variant: Variant.Primary,
      },
    ],
  };
};
