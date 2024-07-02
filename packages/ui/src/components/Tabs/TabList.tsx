import * as stylex from "@stylexjs/stylex";
import { lazy, useId } from "react";

import { Align, Orientation, Position, Variant } from "../../types";
import { View } from "../View";
import { type TabProps } from "./Tab";

const Tab = lazy(() => import("./Tab"));

export type TabListProps = {
  activeTabId?: string;
  align?: Align;
  closeable?: boolean;
  id?: string;
  label?: string;
  onTabChange?: (id: string) => void;
  onTabClose?: (id: string) => void;
  orientation?: Orientation;
  position?: Position;
  tabs: Omit<TabProps, "active" | "onTabChange">[];
  variant?: Variant;
};

const styles = stylex.create({
  container: {
    display: "flex",
    flexDirection: "row",
    flexShrink: 1,
    justifyContent: "flex-start",
  },
  containerCenter: {
    justifyContent: "center",
  },
  containerEnd: {
    justifyContent: "flex-end",
  },
  containerVertical: {
    flexDirection: "column",
  },
});

const TabList = ({
  activeTabId,
  align = Align.Start,
  closeable,
  id,
  label,
  onTabChange,
  onTabClose,
  orientation = Orientation.Horizontal,
  position = Position.Start,
  tabs,
  variant,
}: TabListProps) => {
  const generatedId = useId();
  const currentId = id || generatedId;

  return (
    <View
      aria-label={label}
      id={currentId}
      role="tablist"
      style={[
        styles.container,
        orientation === Orientation.Vertical && styles.containerVertical,
        align === Align.Center
          ? styles.containerCenter
          : align === Align.End && styles.containerEnd,
      ]}
    >
      {tabs.map(({ closeable: tabClosable, id: tabId, ...tab }) => (
        <Tab
          active={tabId === activeTabId}
          id={tabId}
          key={`${currentId}-tab-${tabId}`}
          {...tab}
          closeable={tabClosable === undefined ? closeable : tabClosable}
          onTabChange={onTabChange}
          onTabClose={onTabClose}
          orientation={orientation}
          position={position}
          variant={variant}
        />
      ))}
    </View>
  );
};

export default TabList;
