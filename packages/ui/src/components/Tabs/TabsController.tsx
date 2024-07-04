import { type Ref, lazy } from "react";

import type { TabContent } from "./Tabs";

import { Align, Orientation, Position, Variant } from "../../types";
import { type TabsHandler, useTabs } from "./useTabs";

const Tabs = lazy(() => import("./Tabs"));

export type TabsControllerProps = {
  align?: Align;
  closeable?: boolean;
  id?: string;
  initialContent?: TabContent[];
  onTabClose?: (props: TabContent) => void;
  orientation?: Orientation;
  position?: Position;
  ref?: Ref<TabsHandler>;
  variant?: Variant;
};

const TabsController = ({
  align,
  closeable,
  id,
  initialContent,
  onTabClose,
  orientation,
  position,
  ref,
  variant,
}: TabsControllerProps) => {
  const {
    activeTabId,
    content,
    currentId,
    handleTabChange,
    handleTabClose,
    registerBeforeClose,
  } = useTabs({ id, initialContent, onTabClose, ref });

  return (
    <Tabs
      activeTabId={activeTabId}
      align={align}
      closeable={closeable}
      content={content}
      id={currentId}
      onTabChange={handleTabChange}
      onTabClose={handleTabClose}
      orientation={orientation}
      position={position}
      registerBeforeClose={registerBeforeClose}
      variant={variant}
    />
  );
};

export default TabsController;
