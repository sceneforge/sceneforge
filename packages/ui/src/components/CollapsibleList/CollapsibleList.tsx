import * as stylex from "@stylexjs/stylex";
import { useId } from "react";

import { roundedStyles } from "../../borders.stylex";
import { Variant } from "../../types";
import { Collapsible, type CollapsibleProps } from "../Collapsible";
import { View } from "../View";

export type CollapsibleListProps = {
  id?: string;
  items?: Omit<CollapsibleProps, "id">[];
  variant?: Variant;
};

const styles = stylex.create({
  collapsible: {
    flexGrow: {
      ":is([open])": 1,
      "default": 0,
    },
    flexShrink: {
      ":is([open])": 0,
      "default": 1,
    },
    height: "auto",
    transition: "flex-grow 0.125s ease-in-out, flex-shrink 0.125s ease-in-out",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "stretch",
    overflow: "clip",
  },
});

const CollapsibleList = ({
  id,
  items,
  variant,
}: CollapsibleListProps) => {
  const generatedId = useId();
  const currentId = id ?? generatedId;

  return (
    <View
      id={currentId}
      margin={0}
      padding={0}
      style={[
        styles.container,
        roundedStyles.rounded(1),
      ]}
      variant={variant}
    >
      {items?.map((item, index) => (
        <Collapsible
          key={`${currentId}-collapsible-${index}`}
          variant={variant}
          {...item}
          id={`${currentId}-collapsible-${index}`}
          style={[
            styles.collapsible,
            roundedStyles.noRounded,
          ]}
        />
      ))}
    </View>
  );
};

export default CollapsibleList;
