import { useCallback } from "react";
import { v4 as uuid } from "uuid";
import { useTabPanel } from "../components/TabPanel";
import { ModelViewTab, type ModelViewTabProps } from "../tabs";

export const useTabs = () => {
  const { newTab } = useTabPanel();

  const newModelViewTab = useCallback(
    ({ id, title, gltf }: ModelViewTabProps) => {
      newTab<ModelViewTabProps>({
        id: id ?? uuid(),
        title,
        props: { id, title, gltf },
        active: true,
        component: ModelViewTab,
      });
    },
    [newTab]
  );

  return {
    newModelViewTab,
  };
};
