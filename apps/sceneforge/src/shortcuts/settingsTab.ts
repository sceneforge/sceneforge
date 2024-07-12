import { database } from "@sceneforge/data";
import { Variant } from "@sceneforge/ui";

import type { FormViewTemplate, FormViewTemplateProps } from "../tabTemplates";

import { ShortcutProps } from "./ShortcutProps";

export const settingsTab: ShortcutProps<typeof FormViewTemplate> = async ({
  i18n,
  t,
}) => {
  const currentMainTabPosition = await database.settings.get("mainTabPosition");
  const currentLanguage = await database.settings.get("language");

  const props: FormViewTemplateProps = {
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
            label: "Mode",
            name: "color-scheme",
            options: [
              { label: "Dark", value: "dark" },
              { label: "Light", value: "light" },
              { label: "System", value: "auto" },
            ],
            type: "select",
          },
        ],
        legend: "Color Scheme",
        variant: Variant.Primary,
      },
    ],
  };
  return props;
};
