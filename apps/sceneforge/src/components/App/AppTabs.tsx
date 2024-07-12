import { useSettings } from "@sceneforge/data";
import { Position, TabsController, Variant } from "@sceneforge/ui";
import { useEffect } from "react";

import { useShortcuts } from "../../shortcuts";
import { useAppContext } from "./useAppContext";
import { useAppTabs } from "./useAppTabs";

export const AppTabs = () => {
  const { tabsHandlerRef } = useAppContext();
  const { activeTabId } = useAppTabs();
  const { openHome } = useShortcuts();
  const [tabsPosition] = useSettings<Position>("mainTabPosition", Position.Start);

  useEffect(() => {
    if (tabsHandlerRef && tabsHandlerRef.current && !activeTabId) {
      void openHome();
    }
  }, [tabsHandlerRef, activeTabId, openHome]);

  return (
    <TabsController
      closeable
      position={tabsPosition}
      ref={tabsHandlerRef}
      variant={Variant.Primary}
    />
  );
};
