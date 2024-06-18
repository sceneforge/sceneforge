import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";

import type { ToggleComponentRef, ToggleEvent } from "../Toggle";
import type { DropdownProps } from "./Dropdown";

import { ActionProps } from "../Action";

type UseDropdownProps = {
  actions?: DropdownProps["actions"];
  id?: DropdownProps["id"];
  parentDropdownId?: DropdownProps["parentDropdownId"];
};

export const useDropdown = ({ actions, id }: UseDropdownProps) => {
  const generatedId = useId();
  const toggleRef = useRef<ToggleComponentRef>(null);
  const actionListRef = useRef<HTMLUListElement>(null);
  const currentId = useMemo(() => id ?? generatedId, [id, generatedId]);
  const currentListId = useMemo(() => `${currentId}-list`, [currentId]);
  const [currentState, setCurrentState] = useState<"closed" | "opened">("closed");

  const currentActions = useMemo(() => {
    if (!actions) return [];
    return actions.map(({ type, ...props }) => {
      if (type === "dropdown") {
        return {
          type, ...props,
          parentDropdownId: currentListId,
        } as ActionProps;
      }

      return {
        type, ...props,
      } as ActionProps;
    });
  }, [actions, currentListId]);

  const triggerPrimaryToggle = useCallback(() => {
    if (toggleRef.current) {
      toggleRef.current.toggle(undefined, true);
    }
  }, [toggleRef]);

  const isActionListOpen = useCallback(() => {
    return actionListRef.current?.matches(":popover-open") ?? false;
  }, [actionListRef]);

  const handleToggleEvent = useCallback((event: ToggleEvent) => {
    if (event.state === "pressed") {
      if (isActionListOpen()) {
        triggerPrimaryToggle();
      }
      else {
        setCurrentState("opened");
      }
    }
    else {
      if (isActionListOpen()) {
        setCurrentState("closed");
      }
      else {
        triggerPrimaryToggle();
      }
    }
  }, [isActionListOpen, triggerPrimaryToggle]);

  useEffect(() => {
    if (toggleRef.current && toggleRef.current.pressed) {
      setCurrentState("opened");
    }
  }, [toggleRef]);

  return {
    actionListRef,
    currentActions,
    currentId,
    currentListId,
    currentState,
    handleToggleEvent,
    toggleRef,
  };
};
