import {
  FieldText,
  useCurrentId,
  type Variant,
  View,
} from "@sceneforge/ui";

export type PaneLinkProps = {
  defaultUrl?: string;
  id?: string;
  variant?: Variant;
};

const PaneLink = ({
  defaultUrl,
  id,
  variant,
}: PaneLinkProps) => {
  const currentId = useCurrentId(id);

  return (
    <View
      id={currentId}
    >
      <FieldText
        autoComplete="off"
        defaultValue={defaultUrl}
        id={`${currentId}-field-url`}
        label="URL"
        name="hotspot-url"
        variant={variant}
      />
    </View>
  );
};

export default PaneLink;
