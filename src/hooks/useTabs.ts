import { v4 as uuid } from "uuid";
import { useCallback } from "react";
import { useTabPanel } from "../components/TabPanel";
import { ModelViewTab, type ModelViewTabProps } from "../tabs";
import { MarkdownTab, type MarkdownTabProps } from "../tabs/MarkdownTab";

export const useTabs = () => {
  const { activateTab, newTab, getTabById } = useTabPanel();

  const newMarkdownTab = useCallback(
    ({ id, title, file, value, isInline }: MarkdownTabProps) => {
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
        props: { id, title, file, value, isInline },
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

  return {
    newModelViewTab,
    newMarkdownTab,
  };
};
