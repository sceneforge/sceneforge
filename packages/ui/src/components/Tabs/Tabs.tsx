import * as stylex from "@stylexjs/stylex";
import { lazy } from "react";

import type { TabProps } from "./Tab";

import { Align, Orientation, Position, Variant } from "../../types";
import { View } from "../View";
import { backgroundColor, color } from "../tokens.stylex";
import { type TabPanelProps } from "./TabPanel";

const TabList = lazy(() => import("./TabList"));
const TabPanel = lazy(() => import("./TabPanel"));

export type TabContent = {
  panel: Omit<TabPanelProps, "hidden" | "tabId">;
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
  variant?: Variant;
};

const styles = stylex.create({
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    justifyContent: "stretch",
    margin: 0,
    padding: 0,
    width: "100%",
  },
  content: {
    backgroundColor: backgroundColor.alpha75,
    color: color.foreground,
    display: "block",
    flexGrow: 1,
  },
  tabsBlockEnd: {
    flexDirection: "row-reverse",
  },
  tabsInlineEnd: {
    flexDirection: "row-reverse",
  },
  tabsInlineStart: {
    flexDirection: "row",
  },
  variantColor: (background: keyof typeof color, text: keyof typeof color) => ({
    backgroundColor: color[background],
    color: color[text],
  }),
});

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
  variant,
}: TabsProps) => {
  return (
    <View
      id={id}
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
      />
      <div {...stylex.props(styles.content)}>
        {content.map(({ panel, tab }) => (
          <TabPanel
            hidden={activeTabId !== tab.id}
            key={`${id ?? "tab"}-panel-${tab.id}`}
            tabId={tab.id}
            {...panel}
          />
        ))}
      </div>
    </View>
  );
};

export default Tabs;
