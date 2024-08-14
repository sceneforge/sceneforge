import {
  CollapsibleList,
  Form,
  IconEnum,
  PopoverPane,
  PopoverRef,
  Shape,
  Variant,
} from "@sceneforge/ui";
import { lazy, type Ref } from "react";

import { useHotspotPopover } from "./useHotspotPopover";

const PaneGeneral = lazy(() => import("./PaneGeneral"));
const PaneHotspotPoint = lazy(() => import("./PaneHotspotPoint"));
const PaneLink = lazy(() => import("./PaneLink"));

export type HotspotPopoverProps = {
  defaultDescription?: string;
  defaultDistance?: number;
  defaultLabel?: string;
  defaultUrl?: string;
  id?: string;
  ref: Ref<PopoverRef>;
  variant?: Variant;
};

const HotspotPopover = ({
  defaultDescription,
  defaultDistance,
  defaultLabel,
  defaultUrl,
  id,
  ref,
  variant,
}: HotspotPopoverProps) => {
  const {
    currentFormId,
    currentId,
    currentSubmitLabel,
    currentTitle,
    handleFormAction,
  } = useHotspotPopover({
    defaultDescription,
    defaultDistance,
    defaultLabel,
    defaultUrl,
    id,
  });

  return (
    <PopoverPane
      id={currentId}
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
      ref={ref}
      title={currentTitle}
      variant={variant}
    >
      <Form
        action={handleFormAction}
        id={currentFormId}
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
      </Form>
    </PopoverPane>
  );
};

export default HotspotPopover;
