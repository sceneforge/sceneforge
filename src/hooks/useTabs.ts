import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { v4 as uuid } from "uuid";

import { useTabPanel } from "../components/TabPanel";
import { ModelViewTab, type ModelViewTabProps } from "../tabs";
import { MarkdownTab, type MarkdownTabProps } from "../tabs/MarkdownTab";

export const useTabs = () => {
  const { t } = useTranslation("common");
  const { activateTab, closeTab, getTabById, newTab } = useTabPanel();

  const newMarkdownTab = useCallback(
    ({ href, id, title, translation, value }: MarkdownTabProps) => {
      if (id) {
        const tab = getTabById(id);
        if (tab) {
          activateTab(tab)();
          return;
        }
      }

      newTab<MarkdownTabProps>({
        active: true,
        component: MarkdownTab,
        id: id ?? uuid(),
        props: {
          href,
          id,
          title,
          translation:
            !title && translation
              ? translation
              : (!title && !translation
                ? {
                  key: "tabs.untitledMarkdown",
                  ns: "common",
                }
                : undefined),
          value,
        },
        title: title ?? t("tabs.untitledMarkdown"),
        translation:
          !title && translation
            ? translation
            : (!title && !translation
              ? {
                key: "tabs.untitledMarkdown",
                ns: "common",
              }
              : undefined),
      });
    },
    [t, activateTab, getTabById, newTab]
  );

  const newModelViewTab = useCallback(
    ({ gltf, id, title, translation }: Partial<ModelViewTabProps>) => {
      if (id) {
        const tab = getTabById(id);
        if (tab) {
          activateTab(tab)();
          return;
        }
      }

      const withId = id ?? uuid();
      const withTitle = title ?? t("tabs.untitledModel");
      const withTranslation
        = !title && translation
          ? translation
          : (!title && !translation
            ? {
              key: "tabs.untitledModel",
              ns: "common",
            }
            : undefined);

      newTab<ModelViewTabProps>({
        active: true,
        component: ModelViewTab,
        id: withId,
        props: {
          gltf,
          id: withId,
          title: withTitle,
          translation: withTranslation,
        },
        title: withTitle,
        translation: withTranslation,
      });
    },
    [t, newTab, getTabById, activateTab]
  );

  const closeModelViewTab = useCallback(
    (id?: string) => {
      if (!id) return;
      const tab = getTabById(id);
      if (tab && tab.component === ModelViewTab) {
        closeTab(tab)();
      }
    },
    [closeTab, getTabById]
  );

  return {
    closeModelViewTab,
    newMarkdownTab,
    newModelViewTab,
  };
};
