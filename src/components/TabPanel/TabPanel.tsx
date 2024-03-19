import { Suspense, useEffect } from "react";
import { usePanel } from "../Panel";
import { TabList } from "./TabList";
import { useTabPanel } from "./useTabPanel";
import { cls } from "../../lib/cls";
import { Variant } from "../../types/variants";

export type TabPanelProps = {
  variant?: Variant;
};

export const TabPanel = ({ variant = "default" }: TabPanelProps) => {
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
      className={cls(
        "flex w-full h-full justify-stretch",
        tabsPosition === "top"
          ? "flex-col p-t-titlebar-area-y"
          : "flex-col-reverse"
      )}
    >
      <TabList variant={variant} />
      <div className="relative h-full w-full flex-grow">
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
