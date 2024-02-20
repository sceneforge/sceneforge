import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type PropsWithChildren,
  type ReactNode,
  type SetStateAction
} from "react";

type EventListenerCallback = (
  type: string,
  listener: EventListenerOrEventListenerObject,
  options?: boolean | AddEventListenerOptions
) => void;

interface WindowControlsOverlay {
  readonly visible: boolean;
  addEventListener: EventListenerCallback;
  removeEventListener: EventListenerCallback;
}

const isOverlayVisible = (): boolean => {
  return "windowControlsOverlay" in window.navigator ? (
    window.navigator.windowControlsOverlay as WindowControlsOverlay
  ).visible : false;
};

export interface PanelContextType {
  overlayVisible: boolean;
  menuShow: boolean;
  sidePanelShow: boolean;
  setMenuShow?: Dispatch<SetStateAction<boolean>>;
  setSidePanelShow?: Dispatch<SetStateAction<boolean>>;
  sidePanelContent?: ReactNode;
  setSidePanelContent?: Dispatch<SetStateAction<ReactNode>>;
}

const PanelContext = createContext<PanelContextType>({
  overlayVisible: isOverlayVisible(),
  menuShow: false,
  sidePanelShow: false,
});

export const PanelProvider = ({ children }: PropsWithChildren) => {
  const [menuShow, setMenuShow] = useState(false);
  const [sidePanelShow, setSidePanelShow] = useState(false);
  const [sidePanelContent, setSidePanelContent] = useState<ReactNode>();

  const windowControlsOverlayRef = useRef<WindowControlsOverlay | null>(null);
  const [overlayVisible, setOverlayVisible] = useState<boolean>(isOverlayVisible());

  const updateOverlayVisibility = useCallback(() => {
    if (windowControlsOverlayRef.current) {
      setOverlayVisible(windowControlsOverlayRef.current.visible);
      document.body.setAttribute(
        "data-window-controls-overlay",
        windowControlsOverlayRef.current.visible ? "visible" : "hidden"
      );
    }
  }, [windowControlsOverlayRef, setOverlayVisible]);

  useEffect(() => {
    if ("navigator" in window && "windowControlsOverlay" in window.navigator) {
      windowControlsOverlayRef.current = window
        .navigator.windowControlsOverlay as WindowControlsOverlay;

      windowControlsOverlayRef.current.addEventListener(
        "geometrychange",
        updateOverlayVisibility
      );

      document.body.setAttribute(
        "data-window-controls-overlay",
        windowControlsOverlayRef.current.visible ? "visible" : "hidden"
      );
    }
    return () => {
      windowControlsOverlayRef.current?.removeEventListener(
        "geometrychange",
        updateOverlayVisibility
      );
    };
  }, [updateOverlayVisibility, windowControlsOverlayRef]);

  return (
    <PanelContext.Provider value={{
      overlayVisible,
      menuShow,
      sidePanelShow,
      setMenuShow,
      setSidePanelShow,
      sidePanelContent,
      setSidePanelContent,
    }}>
      {children}
    </PanelContext.Provider>
  );
};

export const usePanel = () => {
  const {
    menuShow,
    sidePanelShow,
    sidePanelContent,
    overlayVisible,
    setMenuShow,
    setSidePanelShow,
    setSidePanelContent,
  } = useContext(PanelContext);

  return {
    overlayVisible,
    menuShow,
    sidePanelShow,
    setMenuShow,
    setSidePanelShow,
    sidePanelContent,
    setSidePanelContent,
  };
};
