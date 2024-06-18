import { type Ref, lazy } from "react";

import { Align, Orientation, Position, Variant } from "../../types";
import { type TabContent } from "./Tabs";
import { type TabsHandler, useTabs } from "./useTabs";

const Tabs = lazy(() => import("./Tabs"));

export type TabsControllerProps = {
  align?: Align;
  closeable?: boolean;
  id?: string;
  initialContent?: TabContent[];
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
  } = useTabs({ id, initialContent, ref });

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
      variant={variant}
    />
  );
};

export default TabsController;
