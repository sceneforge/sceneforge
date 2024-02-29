import { useCallback } from "react";
import { v4 as uuid } from "uuid";
import { useTabPanel } from "../components/TabPanel";
import { ModelViewTab, type ModelViewTabProps } from "../tabs";

export const useTabs = () => {
  const { tabs, activateTab, newTab } = useTabPanel();

  const newModelViewTab = useCallback(
    ({ id, title, gltf }: ModelViewTabProps) => {
      if (id) {
        const tab = tabs.find((t) => t.id === id);
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
    [tabs, newTab, activateTab]
  );

  return {
    newModelViewTab,
  };
};
