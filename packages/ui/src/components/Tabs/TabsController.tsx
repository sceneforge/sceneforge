import { lazy, type Ref } from "react";
import { type TabContent } from "./Tabs";
import { useTabs, type TabsHandler } from "./useTabs";
import { Align, Orientation, Position, Variant } from "../../types";

const Tabs = lazy(() => import("./Tabs"));

export type TabsControllerProps = {
  id?: string;
  initialContent?: TabContent[];
  ref?: Ref<TabsHandler>;
  closeable?: boolean;
  variant?: Variant;
  orientation?: Orientation;
  position?: Position;
  align?: Align;
};

const TabsController = ({
  id,
  initialContent,
  closeable,
  ref,
  variant,
  orientation,
  position,
  align,
}: TabsControllerProps) => {
  const {
    currentId,
    content,
    activeTabId,
    handleTabChange,
    handleTabClose,
  } = useTabs({ id, initialContent, ref });

  return (
    <Tabs
      id={currentId}
      content={content}
      activeTabId={activeTabId}
      onTabChange={handleTabChange}
      onTabClose={handleTabClose}
      closeable={closeable}
      variant={variant}
      orientation={orientation}
      position={position}
      align={align}
    />
  );
};

export default TabsController;
