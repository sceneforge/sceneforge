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
            label: t("SettingsTab.sections.general.mainTabPosition.fieldLabel"),
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
              {
                label: t("SettingsTab.sections.general.mainTabPosition.fieldOptions.start"),
                value: "start",
              },
              {
                label: t("SettingsTab.sections.general.mainTabPosition.fieldOptions.end"),
                value: "end",
              },
            ],
            type: "select",
          },
          {
            defaultValue: currentLanguage?.value as string | undefined,
            label: t("SettingsTab.sections.general.language.fieldLabel"),
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
        legend: t("SettingsTab.sections.general.title"),
        variant: Variant.Primary,
      },
      {
        fields: [
          {
            label: t("SettingsTab.sections.appearance.colorScheme.fieldLabel"),
            name: "color-scheme",
            options: [
              {
                label: t("SettingsTab.sections.appearance.colorScheme.fieldOptions.dark"),
                value: "dark",
              },
              {
                label: t("SettingsTab.sections.appearance.colorScheme.fieldOptions.light"),
                value: "light",
              },
              {
                label: t("SettingsTab.sections.appearance.colorScheme.fieldOptions.auto"),
                value: "auto",
              },
            ],
            type: "select",
          },
          {
            label: t("SettingsTab.sections.appearance.theme.fieldLabel"),
            name: "theme",
            options: themeList.themes.map(({ id, name }) => ({
              label: name ?? t(`SettingsTab.sections.appearance.theme.fieldOptions.${id}`, {
                defaultValue: id,
              }),
              value: id,
            })),
            type: "select",
          },
        ],
        legend: t("SettingsTab.sections.appearance.title"),
        variant: Variant.Primary,
      },
    ],
  };
};
