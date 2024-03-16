import { useEffect } from "react";
import { TabItem } from "./TabItem";

import { useTabPanel } from "./useTabPanel";

export const TabList = () => {
  const { tabs, closeTab, newTab, activateTab, defaultTab } = useTabPanel();

  useEffect(() => {
    if (tabs.length === 0) {
      newTab(defaultTab);
    }
  }, [tabs, newTab, defaultTab]);

  return (
    <ul
      className="flex flex-row justify-start list-none p-inline-2 m-0 gap-2 bg-primary:50 p-t-0 p-b-2 text-light shadow-primary:75 shadow-inner"
      role="tablist"
    >
      {tabs.map((tab, index) => (
        <TabItem
          active={tab.active}
          index={index}
          key={index}
          title={tab.title}
          onActiveClick={activateTab(tab)}
          onCloseClick={closeTab(tab)}
        />
      ))}
    </ul>
  );
};
