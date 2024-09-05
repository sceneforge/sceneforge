import type { HotspotData } from "@sceneforge/data";

import { ListCard, Shape } from "@sceneforge/ui";
import { type RefObject, useCallback } from "react";

import { type HotspotPopoverRef } from "../HotspotPopover";

export type HotspotDetailsProps = {
  hotspotPopoverRef?: RefObject<HotspotPopoverRef | null>;
} & HotspotData;

const HotspotDetails = ({
  description,
  hotspotPopoverRef,
  id,
  label,
}: HotspotDetailsProps) => {
  const handleClick = useCallback(() => {
    if (hotspotPopoverRef && hotspotPopoverRef.current) {
      const hotspotPopover = hotspotPopoverRef.current;
      console.log("DEBUG: load hotspot with id", id);
      hotspotPopover.show();
    }
  }, [hotspotPopoverRef, id]);

  return (
    <ListCard
      description={description}
      imageShape={Shape.Squircle}
      imageSrc="https://via.placeholder.com/48"
      onClick={handleClick}
      title={label}
    />
  );
};

export default HotspotDetails;
