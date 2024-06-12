import { Variant } from "@sceneforge/ui";
import {
  type MouseEvent,
  MouseEventHandler,
  type RefObject,
  useCallback,
  useContext,
} from "react";

import { setPositionOnPointer } from "../../lib/setPosition";
import { ContextMenuContext, type MenuItem } from "./ContextMenuProvider";

export const useContextMenu = () => {
  const {
    contextMenuEvent,
    contextMenuHeader,
    contextMenuItems,
    contextMenuVariant,
    setContextMenuEvent,
    setContextMenuHeader,
    setContextMenuItems,
    setContextMenuVariant,
    setShowContextMenu,
    showContextMenu,
  } = useContext(ContextMenuContext);

  const clearContextMenu = useCallback(() => {
    if (setShowContextMenu) {
      setShowContextMenu(false);
    }
    if (setContextMenuVariant) {
      setContextMenuVariant(undefined);
    }
    if (setContextMenuHeader) {
      setContextMenuHeader(undefined);
    }
    if (setContextMenuItems) {
      setContextMenuItems(undefined);
    }
    if (setContextMenuEvent) {
      setContextMenuEvent(undefined);
    }
  }, [
    setShowContextMenu,
    setContextMenuHeader,
    setContextMenuVariant,
    setContextMenuItems,
    setContextMenuEvent,
  ]);

  const openContextMenu = useCallback(
    ({
      event,
      header,
      items,
      variant,
    }: {
      event: MouseEvent<HTMLElement>;
      header?: string;
      items?: MenuItem[];
      variant?: Variant;
    }) => {
      event.preventDefault();
      event.stopPropagation();

      if (setContextMenuEvent) {
        setContextMenuEvent(event);
      }
      if (setContextMenuHeader) {
        setContextMenuHeader(header);
      }
      if (setContextMenuItems) {
        setContextMenuItems(items);
      }
      if (setContextMenuVariant) {
        setContextMenuVariant(variant);
      }
      if (setShowContextMenu) {
        setShowContextMenu(true);
      }
    },
    [
      setContextMenuEvent,
      setContextMenuHeader,
      setContextMenuVariant,
      setContextMenuItems,
      setShowContextMenu,
    ]
  );

  const handleContextMenu = useCallback(
    ({
      header,
      items,
      variant,
    }: {
      header?: string;
      items?: MenuItem[];
      variant?: Variant;
    }) =>
      (event: MouseEvent<HTMLElement>) => {
        openContextMenu({ event, header, items, variant });
      },
    [openContextMenu]
  );

  const setPosition = useCallback(
    (ref: RefObject<HTMLElement | null>) => {
      if (ref.current && contextMenuEvent) {
        setPositionOnPointer(ref.current, contextMenuEvent);
      }
    },
    [contextMenuEvent]
  );

  const handleItemClick = useCallback(
    (onClick?: MouseEventHandler): MouseEventHandler => {
      return (event) => {
        clearContextMenu();
        if (onClick) {
          return onClick(event);
        }
      };
    },
    [clearContextMenu]
  );

  return {
    clearContextMenu,
    event: contextMenuEvent,
    handleContextMenu,
    handleItemClick,
    header: contextMenuHeader,
    items: contextMenuItems,
    openContextMenu,
    setPosition,
    show: showContextMenu,
    variant: contextMenuVariant,
  };
};
