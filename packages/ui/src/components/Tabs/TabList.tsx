import * as stylex from "@stylexjs/stylex";
import { lazy, useId } from "react";
import { type TabProps } from "./Tab";
import { Align, Orientation, Position } from "../../types";

const Tab = lazy(() => import("./Tab"));

export type TabListProps = {
  id?: string;
  label?: string;
  tabs: Omit<TabProps, "onTabChange" | "active">[];
  activeTabId?: string;
  closeable?: boolean;
  onTabChange?: (id: string) => void;
  onTabClose?: (id: string) => void;
  orientation?: Orientation;
  align?: Align;
  position?: Position;
};

const styles = stylex.create({
  container: {
    display: "flex",
    color: "inherit",
    flexShrink: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  containerVertical: {
    flexDirection: "column",
  },
  containerCenter: {
    justifyContent: "center",
  },
  containerEnd: {
    justifyContent: "flex-end",
  }
});

const TabList = ({
  id,
  label,
  tabs,
  activeTabId,
  onTabChange,
  onTabClose,
  orientation = Orientation.Horizontal,
  align = Align.Start,
  position = Position.Start,
  closeable,
}: TabListProps) => {
  const generatedId = useId();
  const currentId = id || generatedId;

  return (
    <div
      id={currentId}
      role="tablist"
      aria-label={label}
      {...stylex.props(
        styles.container,
        orientation === Orientation.Vertical && styles.containerVertical,
        align === Align.Center ? styles.containerCenter : align === Align.End && styles.containerEnd,
      )}
    >
      {tabs.map(({ id: tabId, closeable: tabClosable, ...tab }) => (
        <Tab
          key={`${currentId}-tab-${tabId}`}
          id={tabId}
          active={tabId === activeTabId}
          {...tab}
          onTabChange={onTabChange}
          onTabClose={onTabClose}
          closeable={typeof tabClosable !== "undefined" ? tabClosable : closeable}
          orientation={orientation}
          position={position}
        />
      ))}
    </div>
  );
};

export default TabList;
