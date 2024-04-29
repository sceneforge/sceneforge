import {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type PropsWithChildren,
  type ReactNode,
  type SetStateAction,
} from "react";
import { type Database } from "../../lib/Database";
import { ReloadPrompt } from "../ReloadPrompt";
import { Welcome } from "../Welcome";

type EventListenerCallback = (
  type: string,
  listener: EventListenerOrEventListenerObject,
  options?: boolean | AddEventListenerOptions,
) => void;

interface WindowControlsOverlay {
  readonly visible: boolean;
  addEventListener: EventListenerCallback;
  removeEventListener: EventListenerCallback;
}

const isOverlayVisible = (): boolean => {
  return "windowControlsOverlay" in window.navigator
    ? (window.navigator.windowControlsOverlay as WindowControlsOverlay).visible
    : false;
};

export interface PanelContextType {
  defaultAppTitle?: string;
  appTitle?: string;
  setAppTitle?: Dispatch<SetStateAction<string | undefined>>;
  overlayVisible: boolean;
  menuShow: boolean;
  sidePanelShow: boolean;
  setMenuShow?: Dispatch<SetStateAction<boolean>>;
  setSidePanelShow?: Dispatch<SetStateAction<boolean>>;
  sidePanelContent?: ReactNode;
  setSidePanelContent?: Dispatch<SetStateAction<ReactNode>>;
  userData?: Database<"UserData">;
  showWelcome?: boolean;
  setShowWelcome?: Dispatch<SetStateAction<boolean>>;
}

export const PanelContext = createContext<PanelContextType>({
  overlayVisible: isOverlayVisible(),
  menuShow: false,
  sidePanelShow: false,
  showWelcome: false,
});

export type PanelProviderProps = PropsWithChildren<{
  title?: string;
  userData: Database<"UserData">;
}>;

export const PanelProvider = ({
  title,
  userData,
  children,
}: PanelProviderProps) => {
  const [appTitle, setAppTitle] = useState<string | undefined>(title);
  const [menuShow, setMenuShow] = useState(false);
  const [sidePanelShow, setSidePanelShow] = useState(false);
  const [sidePanelContent, setSidePanelContent] = useState<ReactNode>();
  const [showWelcome, setShowWelcome] = useState(false);

  const windowControlsOverlayRef = useRef<WindowControlsOverlay | null>(null);
  const [overlayVisible, setOverlayVisible] =
    useState<boolean>(isOverlayVisible());

  const updateOverlayVisibility = useCallback(() => {
    if (windowControlsOverlayRef.current) {
      setOverlayVisible(windowControlsOverlayRef.current.visible);
      document.body.setAttribute(
        "data-window-controls-overlay",
        windowControlsOverlayRef.current.visible ? "visible" : "hidden",
      );
    }
  }, [windowControlsOverlayRef, setOverlayVisible]);

  useEffect(() => {
    if ("navigator" in window && "windowControlsOverlay" in window.navigator) {
      windowControlsOverlayRef.current = window.navigator
        .windowControlsOverlay as WindowControlsOverlay;

      windowControlsOverlayRef.current.addEventListener(
        "geometrychange",
        updateOverlayVisibility,
      );

      document.body.setAttribute(
        "data-window-controls-overlay",
        windowControlsOverlayRef.current.visible ? "visible" : "hidden",
      );
    }

    return () => {
      windowControlsOverlayRef.current?.removeEventListener(
        "geometrychange",
        updateOverlayVisibility,
      );
    };
  }, [appTitle, updateOverlayVisibility, windowControlsOverlayRef]);

  useEffect(() => {
    userData
      .get("settings", "welcome")
      .then((value) => {
        setShowWelcome(value === undefined || value === true);
      })
      .catch((err) => {
        throw new Error("Failed to get welcome setting", { cause: err });
      });
  }, [userData, setShowWelcome]);

  return (
    <PanelContext.Provider
      value={{
        defaultAppTitle: title,
        appTitle,
        setAppTitle,
        overlayVisible,
        menuShow,
        sidePanelShow,
        setMenuShow,
        setSidePanelShow,
        sidePanelContent,
        setSidePanelContent,
        userData,
        showWelcome,
        setShowWelcome,
      }}
    >
      {children}
      {showWelcome && <Welcome />}
      <ReloadPrompt />
    </PanelContext.Provider>
  );
};
