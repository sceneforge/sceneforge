import { Variant } from "../../types";
import { ActionList, type ActionListProps } from "../ActionList";
import { Toggle, type ToggleProps } from "../Toggle";
import { useDropdown } from "./useDropdown";

export type DropdownProps = Omit<ToggleProps, "onToggle" | "pressed"> & {
  parentDropdownId?: string;
  actions?: ActionListProps["actions"];
  actionListVariant?: Variant;
};

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
    actionList,
  } = useDropdown({ ref, id, actions });

  return (
    <>
      <Toggle
        id={currentId}
        {...props}
        popoverTarget={currentListId}
        popoverTargetAction={currentState === "closed" ? "show" : "hide"}
        ref={toggleRef}
      />
      <ActionList
        anchor={parentDropdownId}
        id={currentListId}
        popover="manual"
        actions={actionList}
        variant={actionListVariant}
      />
    </>
  );
};

export default Dropdown;
