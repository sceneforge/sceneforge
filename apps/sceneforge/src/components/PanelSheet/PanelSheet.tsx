import { DrawerController, Dropdown, Variant } from "@sceneforge/ui";
import { type PropsWithChildren, type RefObject, useRef } from "react";
import { useTranslation } from "react-i18next";

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
  variant = Variant.Default,
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
    <DrawerController variant={variant}>
      {resizable && (
        <div
          hidden={!clickDown}
          onMouseMove={mouseOver}
        />
      )}
      <div>
        <div>
          <Dropdown
            actionListVariant={Variant.Default}
            // icon="dragIndicator"
            actions={[75, 70, 65, 60, 55, 50, 45, 40, 35, 30, 25].map(size => ({
              label: `${size}%`,
              onClick: () => updateSize({ size }),
              type: "button",
            }))}
            label={t("size")}
          />
        </div>
        {children}
      </div>
    </DrawerController>
  );
};
