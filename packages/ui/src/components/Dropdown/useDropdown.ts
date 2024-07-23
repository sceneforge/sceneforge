import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import type { ToggleComponentRef, ToggleEvent } from "../Toggle";
import type { DropdownProps } from "./Dropdown";

import { useCurrentId } from "../../hooks";
import { ActionProps } from "../Action";

type UseDropdownProps = {
  actionListVariant?: DropdownProps["actionListVariant"];
  actions?: DropdownProps["actions"];
  id?: DropdownProps["id"];
  parentDropdownId?: DropdownProps["parentDropdownId"];
  variant?: DropdownProps["variant"];
};

export const useDropdown = ({
  actionListVariant,
  actions,
  id,
  variant,
}: UseDropdownProps) => {
  const currentId = useCurrentId(id);
  const toggleRef = useRef<ToggleComponentRef>(null);
  const actionListRef = useRef<HTMLDivElement>(null);
  const currentListId = useMemo(() => `${currentId}-list`, [currentId]);
  const [currentState, setCurrentState] = useState<"closed" | "opened">("closed");

  const currentVariant = useMemo(() => {
    if (Array.isArray(variant)) {
      if (currentState === "opened") {
        return variant[1];
      }
      return variant[0];
    }
    return variant;
  }, [variant, currentState]);

  const currentActionListVariant = useMemo(() => {
    if (actionListVariant) {
      return actionListVariant;
    }
    return currentVariant;
  }, [actionListVariant, currentVariant]);

  const currentActions = useMemo(() => {
    if (!actions) return [];
    return actions.map(({ kind, ...props }) => {
      if (kind === "dropdown") {
        return {
          kind, ...props,
          parentDropdownId: currentListId,
        } as ActionProps;
      }

      return {
        kind, ...props,
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
    currentActionListVariant,
    currentActions,
    currentId,
    currentListId,
    currentState,
    currentVariant,
    handleToggleEvent,
    toggleRef,
  };
};
