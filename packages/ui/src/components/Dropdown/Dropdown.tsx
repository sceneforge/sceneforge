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
  container: (id: string) => ({
    anchorName: `--dropdown-anchor-${id.replaceAll(":", "-")}`,
  } as Record<string, string>),
  popover: {
    position: "absolute",
  },
  popoverAnchor: (id: string) => ({
    left: (
      id ? "anchor(right)" : "anchor(left)"
    ),
    positionAnchor: `--dropdown-anchor-${id.replaceAll(":", "-")}`,
    top: (
      id ? "anchor(top)" : "anchor(bottom)"
    ),
  } as Record<string, string>),
});

const Dropdown = ({
  actionListVariant,
  actions,
  id,
  parentDropdownId,
  ...props
}: DropdownProps) => {
  const {
    actionListRef,
    currentActions,
    currentId,
    currentListId,
    currentState,
    handleToggleEvent,
    toggleRef,
  } = useDropdown({ actions, id, parentDropdownId });

  return (
    <>
      <Toggle
        id={currentId}
        {...props}
        onToggle={handleToggleEvent}
        popoverTarget={currentListId}
        popoverTargetAction={currentState === "closed" ? "hide" : "show"}
        ref={toggleRef}
        style={[styles.container(currentId)]}
      />
      <ActionList
        actions={currentActions}
        anchor={parentDropdownId}
        id={currentListId}
        popover="auto"
        ref={actionListRef}
        style={[
          styles.popover,
          styles.popoverAnchor(currentId),
        ]}
        variant={actionListVariant}
      />
    </>
  );
};

export default Dropdown;
