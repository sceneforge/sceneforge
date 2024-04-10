import {
  type Dispatch,
  type SetStateAction,
  type PropsWithChildren,
  createContext,
  useState,
} from "react";
import { AppInstall } from "./AppInstall";

export interface BeforeInstallPromptEvent extends Event {
  /**
   * Returns an array of DOMString items containing the platforms on which the event was dispatched.
   * This is provided for user agents that want to present a choice of versions to the user such as,
   * for example, "web" or "play" which would allow the user to chose between a web version or
   * an Android version.
   */
  readonly platforms: Array<string>;

  /**
   * Returns a Promise that resolves to a DOMString containing either "accepted" or "dismissed".
   */
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;

  /**
   * Allows a developer to show the install prompt at a time of their own choosing.
   * This method returns a Promise.
   */
  prompt(): Promise<void>;
}

export type AppInstallContextType = {
  showInstall: boolean;
  setShowInstall: Dispatch<SetStateAction<boolean>>;
  showInstallDialog: boolean;
  setShowInstallDialog: Dispatch<SetStateAction<boolean>>;
  beforeInstallPromptEvent?: BeforeInstallPromptEvent | null;
  setBeforeInstallPromptEvent?: Dispatch<
    SetStateAction<BeforeInstallPromptEvent | null>
  >;
  animateInstallButton: boolean;
  setAnimateInstallButton: Dispatch<SetStateAction<boolean>>;
};

export const AppInstallContext = createContext<AppInstallContextType>({
  showInstall: false,
  setShowInstall: () => {},
  showInstallDialog: false,
  setShowInstallDialog: () => {},
  animateInstallButton: false,
  setAnimateInstallButton: () => {},
});

export type AppInstallProviderProps = PropsWithChildren;

export const AppInstallProvider = ({ children }: AppInstallProviderProps) => {
  const [showInstall, setShowInstall] = useState(false);
  const [animateInstallButton, setAnimateInstallButton] = useState(false);
  const [showInstallDialog, setShowInstallDialog] = useState(false);
  const [beforeInstallPromptEvent, setBeforeInstallPromptEvent] =
    useState<BeforeInstallPromptEvent | null>(null);

  return (
    <AppInstallContext.Provider
      value={{
        showInstall,
        setShowInstall,
        showInstallDialog,
        setShowInstallDialog,
        beforeInstallPromptEvent,
        setBeforeInstallPromptEvent,
        animateInstallButton,
        setAnimateInstallButton,
      }}
    >
      {children}
      <AppInstall />
    </AppInstallContext.Provider>
  );
};
