import { Suspense } from "react";
import { TabList } from "./TabList";
import styles from "./TabPanel.module.css";
import { useTabPanel } from "./TabPanelProvider";

export const TabPanel = () => {
  const { tabs } = useTabPanel();

  const {
    component: TabComponent = () => (<></>),
    props = {},
  } = tabs.find((tab) => tab.active) ?? {};

  return (
    <main className={styles.wrapper}>
      <TabList />
      <div role="tabpanel">
        <Suspense fallback={<div>Loading...</div>}>
          <TabComponent {...props} />
        </Suspense>
      </div>
    </main>
  );
};
