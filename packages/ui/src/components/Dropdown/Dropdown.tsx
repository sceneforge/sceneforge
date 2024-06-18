import * as stylex from "@stylexjs/stylex";
import { ActionList, type ActionListProps } from "../ActionList";
import { Toggle, type ToggleProps } from "../Toggle";
import { useDropdown } from "./useDropdown";

export type DropdownProps = Omit<ToggleProps, "onToggle" | "pressed"> & {
  parentDropdownId?: string;
  actions?: ActionListProps["actions"];
  actionListVariant?: ActionListProps["variant"];
};

const styles = stylex.create({
  container: (id: string) => ({
    anchorName: `--dropdown-anchor-${id.replaceAll(":", "-")}`,
  } as Record<string, string>),
  popoverAnchor: (id: string) => ({
    positionAnchor: `--dropdown-anchor-${id.replaceAll(":", "-")}`,
  } as Record<string, string>),
  subPopoverAnchor: {
    top: "anchor(top)",
    left: "anchor(right)",
  },
  popover: {
    position: "absolute",
    top: "anchor(bottom)",
    left: "anchor(left)",
  }
});

const Dropdown = ({
  actionListVariant,
  actions,
  id,
  parentDropdownId,
  ref,
  ...props
}: DropdownProps) => {
  const {
    currentId,
    currentListId,
    currentState,
    toggleRef,
    currentActions,
    actionListRef,
    handleToggleEvent,
  } = useDropdown({ parentDropdownId, id, actions });

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
        anchor={parentDropdownId}
        id={currentListId}
        popover="auto"
        actions={currentActions}
        variant={actionListVariant}
        ref={actionListRef}
        style={[
          styles.popover,
          parentDropdownId && (styles.subPopoverAnchor as any),
          styles.popoverAnchor(currentId)
        ]}
      />
    </>
  );
};

export default Dropdown;
