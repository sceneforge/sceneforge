import { useEffect } from "react";
import { Tab } from "./Tab";
import { useTabPanel } from "./TabPanelProvider";

import styles from './TabList.module.css';

export const TabList = () => {
  const { tabs, closeTab, newTab, activateTab, defaultTab } = useTabPanel();

  useEffect(() => {
    if (tabs.length === 0) {
      newTab(defaultTab);
    }
  }, [tabs, newTab, defaultTab]);

  return (
    <ul role="tablist" className={styles.wrapper}>
      {tabs.map((tab, index) => (
        <Tab
          key={index}
          title={tab.title}
          active={tab.active}
          onCloseClick={closeTab(tab)}
          onActiveClick={activateTab(tab)}
        />
      ))}
    </ul>
  )
}