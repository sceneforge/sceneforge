import { useSettings } from "@sceneforge/data";
import { Position, TabsController, Variant } from "@sceneforge/ui";
import { useEffect } from "react";

import { useAppContext, useShortcuts, useTabs } from "../../hooks";

const Tabs = () => {
  const { tabsHandlerRef } = useAppContext();
  const { activeTabId } = useTabs();
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

export default Tabs;
