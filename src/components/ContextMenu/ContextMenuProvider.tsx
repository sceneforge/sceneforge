import {
  type PropsWithChildren,
  type MouseEvent,
  createContext,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { type ActionProps } from "../Action";
import { ContextMenu } from "./ContextMenu";
import { type Variant } from "../../types/variants";

export type MenuItem =
  | (ActionProps & { type: "item" })
  | { type: "divider"; icon: never; toggle: never; onClick: never };

export type ContextMenuContextType = {
  showContextMenu?: boolean;
  contextMenuHeader?: string;
  contextMenuItems?: MenuItem[];
  contextMenuVariant?: Variant;
  setShowContextMenu?: Dispatch<SetStateAction<boolean>>;
  setContextMenuHeader?: Dispatch<SetStateAction<string | undefined>>;
  setContextMenuItems?: Dispatch<SetStateAction<MenuItem[] | undefined>>;
  setContextMenuVariant?: Dispatch<SetStateAction<Variant | undefined>>;
  contextMenuEvent?: MouseEvent<HTMLElement>;
  setContextMenuEvent?: Dispatch<
    SetStateAction<MouseEvent<HTMLElement> | undefined>
  >;
};

export const ContextMenuContext = createContext<ContextMenuContextType>({});

export type ContextMenuProviderProps = PropsWithChildren<{}>;
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
      }}
    >
      {children}
      <ContextMenu />
    </ContextMenuContext.Provider>
  );
};
