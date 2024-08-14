import {
  FieldText,
  useCurrentId,
  type Variant,
  View,
} from "@sceneforge/ui";

export type PaneGeneralProps = {
  defaultDescription?: string;
  defaultLabel?: string;
  id?: string;
  variant?: Variant;
};

const PaneGeneral = ({
  defaultDescription,
  defaultLabel,
  id,
  variant,
}: PaneGeneralProps) => {
  const currentId = useCurrentId(id);

  return (
    <View
      id={currentId}
    >
      <FieldText
        autoComplete="off"
        defaultValue={defaultLabel}
        id={`${currentId}-field-label`}
        label="Label"
        name="hotspot-label"
        required
        variant={variant}
      />
      <FieldText
        autoComplete="off"
        defaultValue={defaultDescription}
        id={`${currentId}-field-description`}
        label="Description"
        name="hotspot-description"
        variant={variant}
      />
    </View>
  );
};

export default PaneGeneral;
