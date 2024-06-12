import { lazy, useRef, type PropsWithChildren, type RefObject } from "react"
import { Orientation, Position, Variant } from "../../types";
import { type ResizableHandler, useDrawer } from "./useDrawer";

const Drawer = lazy(() => import("./Drawer"));

export type DrawerControllerProps = PropsWithChildren<{
  id?: string;
  label?: string;
  resizable?: boolean;
  ref?: RefObject<ResizableHandler>;
  position?: Position;
  orientation?: Orientation;
  initialSize?: number;
  variant?: Variant;
}>;

const DrawerController = ({
  ref,
  id,
  label,
  resizable,
  position = Position.End,
  orientation = Orientation.Horizontal,
  initialSize,
  variant,
  children
}: DrawerControllerProps) => {
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const { currentId, size } = useDrawer({
    id,
    ref,
    resizable,
    position,
    orientation,
    initialSize,
    drawerRef,
  });

  return (
    <Drawer
      ref={drawerRef}
      id={currentId}
      label={label}
      resizable={resizable}
      orientation={orientation}
      position={position}
      size={size}
      variant={variant}
    >
      {children}
    </Drawer>
  );
};

export default DrawerController;
