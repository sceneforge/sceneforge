import { HotspotData } from "@sceneforge/data";
import {
  Pane,
  useCurrentId,
  View,
} from "@sceneforge/ui";
import { lazy } from "react";

export type HotspotsPaneProps = {
  hotspots?: HotspotData[];
  id?: string;
};

const HotspotDetails = lazy(() => import("./HotspotDetails"));

const HotspotsPane = ({
  hotspots,
  id,
}: HotspotsPaneProps) => {
  const currentId = useCurrentId(id);

  return (
    <View id={currentId} padding={0.25}>
      <Pane level={3} title="Hotspots">
        {hotspots?.map((hotspot, index) => (
          <HotspotDetails
            key={`${currentId}-hotspot-${index}`}
            {...hotspot}
          />
        ))}
      </Pane>
    </View>
  );
};

export default HotspotsPane;
