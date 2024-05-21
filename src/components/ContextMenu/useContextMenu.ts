import {
  type MouseEvent,
  MouseEventHandler,
  type RefObject,
  useCallback,
  useContext,
} from "react";
import { ContextMenuContext, type MenuItem } from "./ContextMenuProvider";
import { type Variant } from "../../types/variants";
import { setPositionOnPointer } from "../../lib/setPosition";

export const useContextMenu = () => {
  const {
    showContextMenu,
    setShowContextMenu,
    contextMenuHeader,
    setContextMenuHeader,
    contextMenuVariant,
    setContextMenuVariant,
    contextMenuItems,
    setContextMenuItems,
    contextMenuEvent,
    setContextMenuEvent,
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
      variant,
      items,
    }: {
      event: MouseEvent<HTMLElement>;
      header?: string;
      variant?: Variant;
      items?: MenuItem[];
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
      variant,
      items,
    }: {
      header?: string;
      variant?: Variant;
      items?: MenuItem[];
    }) =>
      (event: MouseEvent<HTMLElement>) => {
        openContextMenu({ event, header, variant, items });
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
    show: showContextMenu,
    header: contextMenuHeader,
    items: contextMenuItems,
    event: contextMenuEvent,
    variant: contextMenuVariant,
    handleItemClick,
    openContextMenu,
    clearContextMenu,
    handleContextMenu,
    setPosition,
  };
};
