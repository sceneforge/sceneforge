import { useRef, type PropsWithChildren } from "react";
import { usePanelSheet } from "./usePanelSheet";
import { type Variant } from "../../types/variants";
import { cls } from "../../lib/cls";
import { variantBgClass } from "../../lib/variantClasses";

export type PanelSheetProps = PropsWithChildren<{
  variant?: Variant;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  resizable?: boolean;
  orientation?: "inline" | "block";
  position?: "start" | "end";
}>;

export const PanelSheet = ({
  variant = "default",
  resizable = false,
  orientation = "block",
  position = "end",
  size = "md",
  children,
}: PanelSheetProps) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const { clickDown, mouseOver } = usePanelSheet(
    panelRef,
    resizable,
    orientation,
    position
  );

  return (
    <div
      className={cls(
        "absolute w-full h-sm after:absolute after:block after:content-empty after:h-1 after:w-full after:inset-t-0 after:inset-x-0 after:cursor-ns-resize dark:after:hover:bg-white:10 light:after:hover:bg-black:10 inset-b-0 overflow-hidden c-light",
        variantBgClass[variant]
      )}
      data-dragging={resizable && clickDown ? "true" : "false"}
      data-orientation={orientation}
      data-position={position}
      data-resizable={resizable ? "true" : "false"}
      data-size={size}
      ref={panelRef}
    >
      {resizable && (
        <div
          hidden={!clickDown}
          className="fixed inset-l-0 inset-t-0 h-full w-full dark:bg-white:5 light:bg-dark:5"
          onMouseMove={mouseOver}
        />
      )}
      <div className="h-full w-full flex flex-col items-stretch justify-stretch overflow-auto text-light c-inherit">
        {children}
      </div>
    </div>
  );
};
