import { useCallback, useId } from "react";
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
        id: id ?? useId(),
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
