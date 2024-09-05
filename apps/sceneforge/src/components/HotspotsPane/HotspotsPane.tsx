import { useLiveQuery } from "@sceneforge/data";
import {
  List,
  Pane,
  useCurrentId,
  View,
} from "@sceneforge/ui";
import { lazy, type RefObject } from "react";

import { type HotspotPopoverRef } from "../HotspotPopover";

export type HotspotsPaneProps = {
  hotspotPopoverRef?: RefObject<HotspotPopoverRef | null>;
  id?: string;
  sceneId: number;
};

const HotspotDetails = lazy(() => import("./HotspotDetails"));

const HotspotsPane = ({
  hotspotPopoverRef,
  id,
  sceneId,
}: HotspotsPaneProps) => {
  const currentId = useCurrentId(id);

  const hotspots = useLiveQuery(
    db => db.hotspot.where("sceneId").equals(sceneId)
      .toArray(),
    [sceneId]
  );

  return (
    <View id={currentId} padding={0.25}>
      <Pane level={3} title="Hotspots">
        <List>
          {hotspots?.map((hotspot, index) => (
            <HotspotDetails
              hotspotPopoverRef={hotspotPopoverRef}
              key={`${currentId}-hotspot-${index}`}
              {...hotspot}
            />
          ))}
        </List>
      </Pane>
    </View>
  );
};

export default HotspotsPane;
