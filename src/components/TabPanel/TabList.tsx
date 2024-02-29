import { useEffect } from "react";
import { TabItem } from "./TabItem";
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
        <TabItem
          active={tab.active}
          id={tab.id}
          key={index}
          title={tab.title}
          onActiveClick={activateTab(tab)}
          onCloseClick={closeTab(tab)}
        />
      ))}
    </ul>
  );
};
