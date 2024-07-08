import * as stylex from "@stylexjs/stylex";

import { ActionList, type ActionListProps } from "../ActionList";
import { Toggle, type ToggleProps } from "../Toggle";
import { useDropdown } from "./useDropdown";

export type DropdownProps = {
  actionListVariant?: ActionListProps["variant"];
  actions?: ActionListProps["actions"];
  parentDropdownId?: string;
} & Omit<ToggleProps, "onToggle" | "pressed">;

const styles = stylex.create({
  action: {
    textAlign: "start",
    width: "100%",
  },
  container: (id: string) => ({
    anchorName: `--dropdown-anchor-${id.replaceAll(":", "-")}`,
  } as Record<string, string>),
  noVariantPopover: {
    backgroundColor: "ButtonFace",
    color: "ButtonText",
  },
  popover: {
    borderColor: "color-mix(in srgb, currentColor 25%, Canvas)",
    borderRadius: "0.5rem",
    borderStyle: "solid",
    borderWidth: "1px",
    overflow: "clip",
    position: "absolute",
  },
  popoverAnchor: (id: string) => ({
    left: "auto",
    positionAnchor: `--dropdown-anchor-${id.replaceAll(":", "-")}`,
    right: "anchor(right)",
    top: "anchor(bottom)",
  } as Record<string, string>),
});

const Dropdown = ({
  actionListVariant,
  actions,
  id,
  parentDropdownId,
  style,
  variant,
  ...props
}: DropdownProps) => {
  const {
    actionListRef,
    currentActionListVariant,
    currentActions,
    currentId,
    currentListId,
    currentState,
    currentVariant,
    handleToggleEvent,
    toggleRef,
  } = useDropdown({
    actionListVariant,
    actions,
    id,
    parentDropdownId,
    variant,
  });

  return (
    <>
      <Toggle
        aria-controls={currentListId}
        aria-haspopup="menu"
        id={currentId}
        onToggle={handleToggleEvent}
        popoverTarget={currentListId}
        popoverTargetAction={currentState === "closed" ? "hide" : "show"}
        style={[
          styles.container(currentId),
          style,
        ]}
        variant={currentVariant}
        {...props}
        ref={toggleRef}
        role={undefined}
      />
      <ActionList
        actions={currentActions}
        actionsStyle={styles.action}
        anchor={parentDropdownId}
        id={currentListId}
        popover="auto"
        ref={actionListRef}
        style={[
          styles.popover as Record<string, string>,
          !currentActionListVariant && styles.noVariantPopover,
          styles.popoverAnchor(currentId),
        ]}
        toggleId={currentId}
        variant={currentActionListVariant}
      />
    </>
  );
};

export default Dropdown;
