import { Variant } from "@sceneforge/ui";
import { Suspense, useEffect } from "react";

import { cls } from "../../lib/cls";
import { usePanel } from "../Panel";
import { Tab } from "./Tab";
import { TabList } from "./TabList";
import { useTabPanel } from "./useTabPanel";

export type TabPanelProps = {
  variant?: Variant;
};

export const TabPanel = ({ variant = Variant.Default }: TabPanelProps) => {
  const { getUserData } = usePanel();
  const { setTabsPosition, tabs, tabsPosition } = useTabPanel();

  useEffect(() => {
    getUserData("settings", "tabs-position", (position) => {
      if (position && typeof position === "string") {
        if (position === "top" || position === "bottom") {
          setTabsPosition(position);
        }
      }
      else {
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
      <div className="relative flex-grow overflow-auto">
        <Suspense>
          {tabs.map(
            (
              {
                active,
                component: TabComponent,
                id,
                props,
                title,
                translation,
              },
              index
            ) => (
              <Tab
                Component={TabComponent}
                active={active}
                id={id}
                key={`tabpanel-${index}`}
                title={title}
                translation={translation}
                {...props}
              />
            )
          )}
        </Suspense>
      </div>
    </main>
  );
};
