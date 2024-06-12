import { useCallback, useId, useImperativeHandle, useMemo, useRef, useState } from "react"
import type { DropdownProps } from "./Dropdown"
import { ToggleComponentRef, type ToggleEvent } from "../Toggle";
import { ActionProps } from "../Action";

type UseDropdownProps = {
  actions?: DropdownProps["actions"],
  id?: DropdownProps["id"],
  ref?: DropdownProps["ref"],
};

export const useDropdown = ({ ref, actions, id }: UseDropdownProps) => {
  const toggleRef = useRef<ToggleComponentRef>(null);
  const [currentState, setCurrentState] = useState<"opened" | "closed">("closed");
  const currentId = useMemo(() => id ?? useId(), [id]);
  const currentListId = useMemo(() => `${currentId}-list`, [currentId]);

  const onToggle = useCallback((toggleEvent: ToggleEvent) => {
    if (toggleEvent.state === "pressed") {
      setCurrentState("opened");
    } else {
      setCurrentState("closed");
    }
  }, []);

  const actionList = useMemo(() => {
    return actions?.map(({ type, ...props }) => {
      if (type === "dropdown") {
        return {
          type, ...props,
          parentDropdownId: currentListId,
        } as ActionProps;
      }

      return {
        type, ...props,
      } as ActionProps
    });
  }, [actions, currentListId]);

  useImperativeHandle(ref, () => ({
    button: toggleRef.current?.button,
    pressed: toggleRef.current?.pressed ?? false,
    toggle: () => {
      if (toggleRef.current?.toggle) {
        toggleRef.current.toggle();
        setCurrentState((currentState) => currentState === "opened" ? "closed" : "opened");
      }
    },
  }), [toggleRef]);

  return {
    currentState,
    currentId,
    currentListId,
    toggleRef,
    onToggle,
    actionList,
  };
};
