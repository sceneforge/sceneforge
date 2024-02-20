import { useEffect } from "react";
import { Tab } from "./Tab";
import { useTabPanel } from "./TabPanelProvider";

import styles from "./TabList.module.css";

export const TabList = () => {
  const { tabs, closeTab, newTab, activateTab, defaultTab } = useTabPanel();

  useEffect(() => {
    if (tabs.length === 0) {
      newTab(defaultTab);
    }
  }, [tabs, newTab, defaultTab]);

  return (
    <ul className={styles.wrapper} role="tablist">
      {tabs.map((tab, index) => (
        <Tab
          active={tab.active}
          key={index}
          title={tab.title}
          onActiveClick={activateTab(tab)}
          onCloseClick={closeTab(tab)}
        />
      ))}
    </ul>
  );
};
