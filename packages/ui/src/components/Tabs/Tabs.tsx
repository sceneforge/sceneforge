import * as stylex from "@stylexjs/stylex";
import { lazy } from "react";
import type { TabProps } from "./Tab";
import { type TabPanelProps } from "./TabPanel";
import { Align, Orientation, Position, Variant } from "../../types";
import { backgroundColor, color } from "../tokens.stylex";
import { View } from "../View";

const TabList = lazy(() => import("./TabList"));
const TabPanel = lazy(() => import("./TabPanel"));

export type TabContent = {
  tab: Omit<TabProps, "onTabChange" | "active">;
  panel: Omit<TabPanelProps, "tabId" | "hidden">;
};

export type TabsProps = {
  id?: string;
  label?: string;
  content: TabContent[];
  closeable?: boolean;
  variant?: Variant;
  orientation?: Orientation;
  position?: Position;
  align?: Align;
  activeTabId?: string;
  onTabChange?: (id: string) => void;
  onTabClose?: (id: string) => void;
};

const styles = stylex.create({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    margin: 0,
    padding: 0,
    justifyContent: "stretch",
    flexDirection: "column",
  },
  tabsBlockEnd: {
    flexDirection: "row-reverse",
  },
  tabsInlineStart: {
    flexDirection: "row",
  },
  tabsInlineEnd: {
    flexDirection: "row-reverse",
  },
  content: {
    display: "block",
    flexGrow: 1,
    color: color.foreground,
    backgroundColor: backgroundColor.alpha75
  },
  variantColor: (background: keyof typeof color, text: keyof typeof color) => ({
    backgroundColor: color[background],
    color: color[text],
  }),
});

const Tabs = ({
  id,
  label,
  closeable,
  content,
  variant,
  orientation = Orientation.Horizontal,
  position = Position.Start,
  align = Align.Start,
  activeTabId,
  onTabChange,
  onTabClose,
}: TabsProps) => {
  return (
    <View
      id={id}
      variant={variant}
      style={[
        styles.container,
        orientation === Orientation.Horizontal && position === Position.End && styles.tabsBlockEnd,
        orientation === Orientation.Vertical && position === Position.Start && styles.tabsInlineStart,
        orientation === Orientation.Vertical && position === Position.End && styles.tabsInlineEnd,
      ]}
    >
      <TabList
        label={label}
        tabs={content.map(({ tab }) => tab)}
        activeTabId={activeTabId}
        onTabChange={onTabChange}
        onTabClose={onTabClose}
        closeable={closeable}
        orientation={orientation}
        align={align}
        position={position}
      />
      <div {...stylex.props(styles.content)}>
        {content.map(({ tab, panel }) => (
          <TabPanel
            key={`${id ?? "tab"}-panel-${tab.id}`}
            tabId={tab.id}
            hidden={activeTabId !== tab.id}
            {...panel}
          />
        ))}
      </div>
    </View>
  );
};

export default Tabs;
