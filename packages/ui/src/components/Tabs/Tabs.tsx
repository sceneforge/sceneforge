import * as stylex from "@stylexjs/stylex";
import { lazy } from "react";

import type { TabProps } from "./Tab";
import type { TabCloseCallback, TabPanelProps } from "./TabPanel";

import { backgroundStyles, textColorStyles } from "../../colors.stylex";
import { useCurrentId } from "../../hooks";
import { Align, Orientation, Position, Variant } from "../../types";
import { View } from "../View";

const TabList = lazy(() => import("./TabList"));
const TabPanel = lazy(() => import("./TabPanel"));

export type TabContent = {
  panel: Omit<TabPanelProps, "hidden" | "registerBeforeClose" | "tabId">;
  tab: Omit<TabProps, "active" | "onTabChange">;
};

export type TabsProps = {
  activeTabId?: string;
  align?: Align;
  closeable?: boolean;
  content: TabContent[];
  id?: string;
  label?: string;
  onTabChange?: (id: string) => void;
  onTabClose?: (id: string) => void;
  orientation?: Orientation;
  position?: Position;
  registerBeforeClose?: (tabId: string) => (
    (callback?: TabCloseCallback) => void
  );
  variant?: Variant;
};

const styles = stylex.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "stretch",
    maxHeight: "100%",
    maxWidth: "100%",
    minHeight: "100%",
    minWidth: "100%",
  },
  content: {
    display: "grid",
    flexGrow: 1,
    gridAutoFlow: "column",
    gridTemplateColumns: "1fr",
  },
  noVariant: {
    backgroundColor: "ButtonFace",
    color: "ButtonText",
  },
  tabsBlockEnd: {
    flexDirection: "column-reverse",
  },
  tabsInlineEnd: {
    flexDirection: "row-reverse",
  },
  tabsInlineStart: {
    flexDirection: "row",
  },
});

const noopInner = () => void 0;
const noop = () => noopInner();

const Tabs = ({
  activeTabId,
  align = Align.Start,
  closeable,
  content,
  id,
  label,
  onTabChange,
  onTabClose,
  orientation = Orientation.Horizontal,
  position = Position.Start,
  registerBeforeClose = () => noop,
  variant,
}: TabsProps) => {
  const currentId = useCurrentId(id);
  return (
    <View
      id={currentId}
      style={[
        styles.container,
        (
          orientation === Orientation.Horizontal
          && position === Position.End
          && styles.tabsBlockEnd
        ),
        (
          orientation === Orientation.Vertical
          && position === Position.Start
          && styles.tabsInlineStart
        ),
        (
          orientation === Orientation.Vertical
          && position === Position.End
          && styles.tabsInlineEnd
        ),
        !variant && styles.noVariant,
      ]}
      variant={variant}
    >
      <TabList
        activeTabId={activeTabId}
        align={align}
        closeable={closeable}
        label={label}
        onTabChange={onTabChange}
        onTabClose={onTabClose}
        orientation={orientation}
        position={position}
        tabs={content.map(({ tab }) => tab)}
        variant={variant}
      />
      <View
        style={[
          styles.content,
          backgroundStyles.default(85),
          textColorStyles.defaultInverted,
        ]}
      >
        {content.map(({ panel, tab }) => (
          <TabPanel
            hidden={activeTabId !== tab.id}
            key={`${currentId}-panel-${tab.id}`}
            registerBeforeClose={registerBeforeClose(tab.id)}
            tabId={tab.id}
            {...panel}
          />
        ))}
      </View>
    </View>
  );
};

export default Tabs;
