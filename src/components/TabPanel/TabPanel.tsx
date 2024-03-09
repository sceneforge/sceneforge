import { Suspense, useEffect } from "react";
import { usePanel } from "../Panel";
import { TabList } from "./TabList";
import { useTabPanel } from "./useTabPanel";

import styles from "./TabPanel.module.css";

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
    <main data-tabs-position={tabsPosition} className={styles.wrapper}>
      <TabList />
      <div className={styles.panels}>
        <Suspense>
          {tabs.map(({ component: TabComponent, active, props }, index) => (
            <TabComponent key={index} tabId={`tabpanel-${index}`} active={active} {...props} />
          ))}
        </Suspense>
      </div>
    </main>
  );
};
