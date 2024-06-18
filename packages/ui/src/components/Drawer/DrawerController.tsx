import { type PropsWithChildren, type RefObject, lazy, useRef } from "react";

import { Orientation, Position, Variant } from "../../types";
import { type ResizableHandler, useDrawer } from "./useDrawer";

const Drawer = lazy(() => import("./Drawer"));

export type DrawerControllerProps = PropsWithChildren<{
  id?: string;
  initialSize?: number;
  label?: string;
  orientation?: Orientation;
  position?: Position;
  ref?: RefObject<ResizableHandler>;
  resizable?: boolean;
  variant?: Variant;
}>;

const DrawerController = ({
  children,
  id,
  initialSize,
  label,
  orientation = Orientation.Horizontal,
  position = Position.End,
  ref,
  resizable,
  variant,
}: DrawerControllerProps) => {
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const { currentId, size } = useDrawer({
    drawerRef,
    id,
    initialSize,
    orientation,
    position,
    ref,
    resizable,
  });

  return (
    <Drawer
      id={currentId}
      label={label}
      orientation={orientation}
      position={position}
      ref={drawerRef}
      resizable={resizable}
      size={size}
      variant={variant}
    >
      {children}
    </Drawer>
  );
};

export default DrawerController;
