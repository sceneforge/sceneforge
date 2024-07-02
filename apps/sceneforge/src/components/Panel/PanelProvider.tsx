import {
  type Dispatch,
  type PropsWithChildren,
  type ReactNode,
  type SetStateAction,
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { type Database } from "../../lib/Database";
import { dataset } from "../../lib/dataset";
import { ReloadPrompt } from "../ReloadPrompt";

type EventListenerCallback = (
  type: string,
  listener: EventListenerOrEventListenerObject,
  options?: AddEventListenerOptions | boolean,
) => void;

interface WindowControlsOverlay {
  addEventListener: EventListenerCallback;
  removeEventListener: EventListenerCallback;
  readonly visible: boolean;
}

const isOverlayVisible = (): boolean => {
  return "windowControlsOverlay" in window.navigator
    ? (window.navigator.windowControlsOverlay as WindowControlsOverlay).visible
    : false;
};

export interface PanelContextType {
  appTitle?: string;
  defaultAppTitle?: string;
  menuShow: boolean;
  overlayVisible: boolean;
  setAppTitle?: Dispatch<SetStateAction<string | undefined>>;
  setMenuShow?: Dispatch<SetStateAction<boolean>>;
  setShowWelcome?: Dispatch<SetStateAction<boolean>>;
  setSidePanelContent?: Dispatch<SetStateAction<ReactNode>>;
  setSidePanelShow?: Dispatch<SetStateAction<boolean>>;
  showWelcome?: boolean;
  sidePanelContent?: ReactNode;
  sidePanelShow: boolean;
  userData?: Database<"UserData">;
}

export const PanelContext = createContext<PanelContextType>({
  menuShow: false,
  overlayVisible: isOverlayVisible(),
  showWelcome: false,
  sidePanelShow: false,
});

export type PanelProviderProps = PropsWithChildren<{
  title?: string;
  userData: Database<"UserData">;
}>;

export const PanelProvider = ({
  children,
  title,
  userData,
}: PanelProviderProps) => {
  const [appTitle, setAppTitle] = useState<string | undefined>(title);
  const [menuShow, setMenuShow] = useState(false);
  const [sidePanelShow, setSidePanelShow] = useState(false);
  const [sidePanelContent, setSidePanelContent] = useState<ReactNode>();
  const [showWelcome, setShowWelcome] = useState(false);

  const windowControlsOverlayRef = useRef<WindowControlsOverlay | null>(null);
  const [overlayVisible, setOverlayVisible]
    = useState<boolean>(isOverlayVisible());

  const updateOverlayVisibility = useCallback(() => {
    if (windowControlsOverlayRef.current) {
      setOverlayVisible(windowControlsOverlayRef.current.visible);
      dataset(document.body, "windowControlsOverlay", windowControlsOverlayRef.current.visible ? "visible" : "hidden");
    }
  }, [windowControlsOverlayRef, setOverlayVisible]);

  useEffect(() => {
    if ("navigator" in window && "windowControlsOverlay" in window.navigator) {
      windowControlsOverlayRef.current = window.navigator
        .windowControlsOverlay as WindowControlsOverlay;

      windowControlsOverlayRef.current.addEventListener(
        "geometrychange",
        updateOverlayVisibility
      );

      document.body.dataset.windowControlsOverlay = windowControlsOverlayRef.current.visible ? "visible" : "hidden";
    }

    return () => {
      windowControlsOverlayRef.current?.removeEventListener(
        "geometrychange",
        updateOverlayVisibility
      );
    };
  }, [appTitle, updateOverlayVisibility, windowControlsOverlayRef]);

  useEffect(() => {
    userData
      .get("settings", "welcome")
      .then((value) => {
        setShowWelcome(value === undefined || value === true);
      })
      .catch((error) => {
        throw new Error("Failed to get welcome setting", { cause: error });
      });
  }, [userData, setShowWelcome]);

  return (
    <PanelContext.Provider
      value={{
        appTitle,
        defaultAppTitle: title,
        menuShow,
        overlayVisible,
        setAppTitle,
        setMenuShow,
        setShowWelcome,
        setSidePanelContent,
        setSidePanelShow,
        showWelcome,
        sidePanelContent,
        sidePanelShow,
        userData,
      }}
    >
      <title>{appTitle || title}</title>
      {children}
      <ReloadPrompt />
    </PanelContext.Provider>
  );
};
