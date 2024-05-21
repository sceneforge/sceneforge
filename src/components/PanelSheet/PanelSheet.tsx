import { type PropsWithChildren, RefObject, useRef } from "react";
import { useTranslation } from "react-i18next";

import { cls } from "../../lib/cls";
import { variantBgClass } from "../../lib/variantClasses";
import { type Variant } from "../../types/variants";
import { Dropdown } from "../Dropdown";
import { usePanelSheet } from "./usePanelSheet";

export type PanelSheetProps = PropsWithChildren<{
  dragIndicator?: RefObject<HTMLSpanElement>;
  orientation?: "block" | "inline";
  position?: "end" | "start";
  resizable?: boolean;
  variant?: Variant;
}>;

export const PanelSheet = ({
  children,
  dragIndicator,
  orientation = "block",
  position = "end",
  resizable = false,
  variant = "default",
}: PanelSheetProps) => {
  const { t } = useTranslation("PanelSheet");
  const panelRef = useRef<HTMLDivElement>(null);
  const { clickDown, mouseOver, updateSize } = usePanelSheet(
    panelRef,
    resizable,
    orientation,
    position,
    dragIndicator
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
      ref={panelRef}
    >
      {resizable && (
        <div
          className="fixed inset-l-0 inset-t-0 h-full w-full dark:bg-white:5 light:bg-dark:5"
          hidden={!clickDown}
          onMouseMove={mouseOver}
        />
      )}
      <div className="h-full w-full flex flex-col items-stretch justify-stretch overflow-auto text-light c-inherit">
        <div className="absolute inset-r-0 inset-t-0 sm:hidden">
          <Dropdown
            contentVariant="default"
            icon="dragIndicator"
            items={[75, 70, 65, 60, 55, 50, 45, 40, 35, 30, 25].map(size => ({
              label: `${size}%`,
              onClick: () => updateSize({ size }),
              type: "item",
            }))}
            label={t("size")}
          />
        </div>
        {children}
      </div>
    </div>
  );
};
