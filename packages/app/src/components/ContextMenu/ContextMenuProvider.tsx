import { type Variant } from "@sceneforge/ui";
import { type ActionProps } from "@sceneforge/ui";
import {
  type Dispatch,
  type MouseEvent,
  type PropsWithChildren,
  type SetStateAction,
  createContext,
  useState,
} from "react";

import { ContextMenu } from "./ContextMenu";

export type MenuItem =
  | { icon: never; onClick: never; toggle: never; type: "divider" }
  | ({ type: "item" } & ActionProps);

export type ContextMenuContextType = {
  contextMenuEvent?: MouseEvent<HTMLElement>;
  contextMenuHeader?: string;
  contextMenuItems?: MenuItem[];
  contextMenuVariant?: Variant;
  setContextMenuEvent?: Dispatch<
    SetStateAction<MouseEvent<HTMLElement> | undefined>
  >;
  setContextMenuHeader?: Dispatch<SetStateAction<string | undefined>>;
  setContextMenuItems?: Dispatch<SetStateAction<MenuItem[] | undefined>>;
  setContextMenuVariant?: Dispatch<SetStateAction<Variant | undefined>>;
  setShowContextMenu?: Dispatch<SetStateAction<boolean>>;
  showContextMenu?: boolean;
};

export const ContextMenuContext = createContext<ContextMenuContextType>({});

export type ContextMenuProviderProps = PropsWithChildren;
export const ContextMenuProvider = ({ children }: ContextMenuProviderProps) => {
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuHeader, setContextMenuHeader] = useState<
    string | undefined
  >();
  const [contextMenuVariant, setContextMenuVariant] = useState<
    Variant | undefined
  >();
  const [contextMenuItems, setContextMenuItems] = useState<
    MenuItem[] | undefined
  >();
  const [contextMenuEvent, setContextMenuEvent] = useState<
    MouseEvent<HTMLElement> | undefined
  >();

  return (
    <ContextMenuContext.Provider
      value={{
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
      }}
    >
      {children}
      <ContextMenu />
    </ContextMenuContext.Provider>
  );
};
