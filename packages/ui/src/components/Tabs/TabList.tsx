import * as stylex from "@stylexjs/stylex";
import { lazy } from "react";

import { currentColor } from "../../colors.stylex";
import { glossyStyles } from "../../effect.stylex";
import { useCurrentId } from "../../hooks";
import { Align, Orientation, Position, Variant } from "../../types";
import { Unlisted } from "../Unlisted";
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
    flexShrink: 1,
    height: null,
    scrollBehavior: "smooth",
    scrollbarColor: `${currentColor.alpha20} ${currentColor.alpha05}`,
    scrollbarWidth: "thin",
    width: null,
  },
  containerCenter: {
    alignContent: "center",
  },
  containerEnd: {
    alignContent: "end",
  },
  containerHorizontal: {
    maxWidth: null,
    minHeight: "min-content",
    paddingBlockEnd: "0.5rem",
    paddingInlineEnd: null,
    scrollPaddingBlockEnd: "0.5rem",
    scrollPaddingInlineEnd: null,
    scrollSnapType: "x mandatory",
    touchAction: "pan-x",
  },
  containerScrollbar: {
    "::-webkit-scrollbar": {
      height: "0.25rem",
      width: "0.25rem",
    },
    "::-webkit-scrollbar-thumb": {
      backgroundColor: currentColor.alpha40,
      borderRadius: 0,
    },
    "::-webkit-scrollbar-track": {
      backgroundColor: "transparent",
    },
  },
  containerStart: {
    alignContent: "start",
  },
  containerVertical: {
    maxHeight: null,
    minWidth: "min-content",
    paddingBlockEnd: null,
    scrollPaddingBlockEnd: null,
    scrollSnapType: "y mandatory",
    touchAction: "pan-y",
  },
  tabs: {
    gridAutoColumns: null,
    gridAutoRows: "max-content",
    height: null,
    isolation: "isolate",
    justifyContent: "start",
    minWidth: "max-content",
    width: null,
  },
  tabsCenter: {
    justifyContent: "center",
  },
  tabsEnd: {
    justifyContent: "end",
  },
  tabsStart: {
    justifyContent: "start",
  },
  tabsVertical: {
    gridAutoColumns: "max-content",
    gridAutoRows: null,
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
  const currentId = useCurrentId(id);

  return (
    <View
      id={currentId}
      role="presentation"
      scrollable={orientation === Orientation.Vertical ? "block" : "inline"}
      style={[
        styles.container,
        styles.containerScrollbar,
        orientation === Orientation.Horizontal
          ? styles.containerHorizontal
          : styles.containerVertical,
        orientation === Orientation.Vertical && (
          align === Align.Center
            ? styles.containerCenter
            : (align === Align.End
              ? styles.containerEnd
              : styles.containerStart)
        ),
        variant && glossyStyles.variant(variant),
      ]}
    >
      <Unlisted
        aria-label={label}
        orientation={orientation}
        role="tablist"
        style={[
          styles.tabs,
          orientation === Orientation.Vertical && styles.tabsVertical,
          orientation === Orientation.Horizontal && (
            align === Align.Center
              ? styles.tabsCenter
              : (align === Align.End
                ? styles.tabsEnd
                : styles.tabsStart)),
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
      </Unlisted>
    </View>
  );
};

export default TabList;
