import type { EngineController } from "@sceneforge/scene";

import {
  CollapsibleList,
  IconEnum,
  PopoverFormPane,
  Shape,
  Variant,
} from "@sceneforge/ui";
import { lazy, type Ref, type RefObject } from "react";

import { type HotspotPopoverRef, useHotspotPopover } from "./useHotspotPopover";

const PaneGeneral = lazy(() => import("./PaneGeneral"));
const PaneHotspotPoint = lazy(() => import("./PaneHotspotPoint"));
const PaneLink = lazy(() => import("./PaneLink"));

export type HotspotPopoverProps = {
  defaultDescription?: string;
  defaultDistance?: number;
  defaultLabel?: string;
  defaultUrl?: string;
  engineControllerRef?: RefObject<EngineController | null>;
  id?: string;
  ref: Ref<HotspotPopoverRef>;
  sceneId: number;
  variant?: Variant;
};

const HotspotPopover = ({
  defaultDescription,
  defaultDistance,
  defaultLabel,
  defaultUrl,
  engineControllerRef,
  id,
  ref,
  sceneId,
  variant,
}: HotspotPopoverProps) => {
  const {
    currentFormId,
    currentId,
    currentSubmitLabel,
    currentTitle,
    handleFormAction,
    popoverFormPaneRef,
    // eslint-disable-next-line react-compiler/react-compiler
  } = useHotspotPopover({
    defaultDescription,
    defaultDistance,
    defaultLabel,
    defaultUrl,
    engineControllerRef,
    id,
    ref,
    sceneId,
  });

  return (
    <PopoverFormPane
      action={handleFormAction}
      id={currentId}
      outer
      paneActions={[
        {
          form: currentFormId,
          kind: "button",
          label: currentSubmitLabel,
          onClick: () => void 0,
          type: "submit",
          variant: Variant.Accent,
        },
        {
          icon: IconEnum.Delete,
          inverted: true,
          kind: "icon",
          label: "Delete",
          onClick: () => void 0,
          shape: Shape.Squircle,
          variant: Variant.Danger,
        },
      ]}
      ref={popoverFormPaneRef}
      title={currentTitle}
      variant={variant}
    >
      <CollapsibleList
        items={[
          {
            children: (
              <PaneGeneral
                defaultDescription={defaultDescription}
                defaultLabel={defaultLabel}
                id={`${currentId}-pane-general`}
                variant={variant}
              />
            ),
            icon: IconEnum.Info,
            open: true,
            title: "General",
          },
          {
            children: (
              <PaneLink
                defaultUrl={defaultUrl}
                id={`${currentId}-pane-link`}
                variant={variant}
              />
            ),
            icon: IconEnum.Globe,
            title: "Link",
          },
          {
            children: (
              <PaneHotspotPoint
                defaultDistance={defaultDistance}
                id={`${currentId}-pane-hotspot-point`}
                variant={variant}
              />
            ),
            icon: IconEnum.Edit,
            title: "Point",
          },
        ]}
      />
    </PopoverFormPane>
  );
};

export default HotspotPopover;
