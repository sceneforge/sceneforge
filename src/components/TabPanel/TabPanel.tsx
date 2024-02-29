import { Suspense } from "react";
import { TabList } from "./TabList";
import styles from "./TabPanel.module.css";
import { useTabPanel } from "./TabPanelProvider";

export const TabPanel = () => {
  const { tabs } = useTabPanel();

  return (
    <main className={styles.wrapper}>
      <TabList />
      <div className={styles.panels}>
        <Suspense fallback={<div>Loading...</div>}>
          {tabs.map(({ component: TabComponent, active, props }, index) => (
            <div hidden={!active} id={`tabpanel-${index}`} key={index} role="tabpanel">
              <TabComponent active={active} {...props} />
            </div>
          ))}
        </Suspense>
      </div>
    </main>
  );
};
