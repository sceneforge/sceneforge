import { v4 as uuid } from "uuid";
import { useCallback } from "react";
import { useTabPanel } from "../components/TabPanel";
import { ModelViewTab, type ModelViewTabProps } from "../tabs";
import { MarkdownTab, type MarkdownTabProps } from "../tabs/MarkdownTab";

export const useTabs = () => {
  const { activateTab, newTab, getTabById, closeTab } = useTabPanel();

  const newMarkdownTab = useCallback(
    ({ id, title, href, value }: MarkdownTabProps) => {
      if (id) {
        const tab = getTabById(id);
        if (tab) {
          activateTab(tab)();
          return;
        }
      }

      newTab<MarkdownTabProps>({
        id: id ?? uuid(),
        title: title ?? "Untitled Markdown",
        props: { id, title, href, value },
        active: true,
        component: MarkdownTab,
      });
    },
    [activateTab, getTabById, newTab]
  );

  const newModelViewTab = useCallback(
    ({ id, title, gltf }: ModelViewTabProps) => {
      if (id) {
        const tab = getTabById(id);
        if (tab) {
          activateTab(tab)();
          return;
        }
      }

      newTab<ModelViewTabProps>({
        id: id ?? uuid(),
        title: title ?? "Untitled Model",
        props: { id, title, gltf },
        active: true,
        component: ModelViewTab,
      });
    },
    [newTab, getTabById, activateTab]
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
    newModelViewTab,
    newMarkdownTab,
    closeModelViewTab,
  };
};
