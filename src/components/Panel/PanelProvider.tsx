import { ReactNode, createContext, useContext, useState, type Dispatch, type PropsWithChildren, type SetStateAction } from "react";

export interface PanelContextType {
  menuShow: boolean;
  sidePanelShow: boolean;
  setMenuShow?: Dispatch<SetStateAction<boolean>>;
  setSidePanelShow?: Dispatch<SetStateAction<boolean>>;
  sidePanelContent?: ReactNode;
  setSidePanelContent?: Dispatch<SetStateAction<ReactNode>>;
}

const PanelContext = createContext<PanelContextType>({
  menuShow: false,
  sidePanelShow: false,
});

export const PanelProvider = ({children}: PropsWithChildren) => {
  const [menuShow, setMenuShow] = useState(false);
  const [sidePanelShow, setSidePanelShow] = useState(false);
  const [sidePanelContent, setSidePanelContent] = useState<ReactNode>();

  return (
    <PanelContext.Provider value={{
      menuShow,
      sidePanelShow,
      setMenuShow,
      setSidePanelShow,
      sidePanelContent,
      setSidePanelContent,
    }}>
      {children}
    </PanelContext.Provider>
  )
}

export const usePanel = () => {
  const { menuShow, sidePanelShow, sidePanelContent, setMenuShow, setSidePanelShow, setSidePanelContent } = useContext(PanelContext);

  return {
    menuShow,
    sidePanelShow,
    setMenuShow,
    setSidePanelShow,
    sidePanelContent,
    setSidePanelContent,
  }
}