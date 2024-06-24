import { useSettings } from "@sceneforge/data";
import { Position, TabsController, Variant } from "@sceneforge/ui";

import { HomeTab, ModelViewTab } from "../../tabs";

export const AppTabs = () => {
  const [tabsPosition] = useSettings<Position>("mainTabPosition", Position.Start);

  return (
    <TabsController
      closeable
      initialContent={[
        {
          panel: { component: HomeTab },
          tab: { id: "home", label: "Home" },
        },
        {
          panel: { component: ModelViewTab },
          tab: { id: "model", label: "Model Viewer" },
        },
      ]}
      position={tabsPosition}
      variant={Variant.Default}
    />
  );
};
