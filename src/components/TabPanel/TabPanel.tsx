import { Suspense, useEffect } from "react";
import { usePanel } from "../Panel";
import { TabList } from "./TabList";
import { useTabPanel } from "./useTabPanel";
import { cls } from "../../lib/cls";
import { Variant } from "../../types/variants";
import { Tab } from "./Tab";

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
          : "flex-col-reverse",
      )}
    >
      <TabList variant={variant} />
      <div className="relative flex-grow overflow-auto">
        <Suspense>
          {tabs.map(
            (
              {
                component: TabComponent,
                active,
                id,
                title,
                translation,
                props,
              },
              index,
            ) => (
              <Tab
                key={`tabpanel-${index}`}
                Component={TabComponent}
                id={id}
                title={title}
                translation={translation}
                active={active}
                {...props}
              />
            ),
          )}
        </Suspense>
      </div>
    </main>
  );
};
