import {
  FieldSlider,
  useCurrentId,
  type Variant,
  View,
} from "@sceneforge/ui";

export type PaneHotspotPointProps = {
  defaultDistance?: number;
  id: string;
  variant?: Variant;
};

const PaneHotspotPoint = ({
  defaultDistance,
  id,
  variant,
}: PaneHotspotPointProps) => {
  const currentId = useCurrentId(id);

  return (
    <View
      id={currentId}
    >
      <FieldSlider
        defaultValue={defaultDistance}
        id={`${currentId}-field-distance`}
        label="Distance"
        name="hotspot-distance"
        variant={variant}
      />
    </View>
  );
};

export default PaneHotspotPoint;
