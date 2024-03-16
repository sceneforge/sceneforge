import { Suspense, useEffect } from "react";
import { usePanel } from "../Panel";
import { TabList } from "./TabList";
import { useTabPanel } from "./useTabPanel";

export const TabPanel = () => {
  const { getUserData } = usePanel();
  const { tabs, tabsPosition, setTabsPosition } = useTabPanel();

  useEffect(() => {
    getUserData("settings", "tabs-position", (position) => {
      if (position && typeof position === "string") {
        if (position === "top" || position === "bottom") {
          setTabsPosition(position);
        }
      } else {
        setTabsPosition("bottom");
      }
    });
  }, [getUserData, setTabsPosition]);

  return (
    <main
      data-tabs-position={tabsPosition}
      className="flex flex-col-reverse w-full h-full justify-stretch"
    >
      <TabList />
      <div className="relative flex-grow h-full w-full">
        <Suspense>
          {tabs.map(({ component: TabComponent, active, props }, index) => (
            <TabComponent
              key={index}
              tabId={`tabpanel-${index}`}
              active={active}
              {...props}
            />
          ))}
        </Suspense>
      </div>
    </main>
  );
};
