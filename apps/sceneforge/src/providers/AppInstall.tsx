import {
  type PropsWithChildren,
  useState,
} from "react";

import { AppInstall } from "../components";
import { AppInstallContext } from "./AppInstallContext";

export interface BeforeInstallPromptEvent extends Event {
  /**
   * Returns an array of DOMString items containing the platforms on which the
   * event was dispatched. This is provided for user agents that want to present
   * a choice of versions to the user such as, for example, "web" or "play"
   * which would allow the user to chose between a web version or an Android
   * version.
   */
  readonly platforms: Array<string>;

  /**
   * Allows a developer to show the install prompt at a time of their own
   * choosing.
   * This method returns a Promise.
   */
  prompt(): Promise<void>;

  /**
   * Returns a Promise that resolves to a DOMString containing either "accepted"
   * or "dismissed".
   */
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
}

export type AppInstallProviderProps = PropsWithChildren;

const AppInstallProvider = ({ children }: AppInstallProviderProps) => {
  const [showInstall, setShowInstall] = useState(false);
  const [animateInstallButton, setAnimateInstallButton] = useState(false);
  const [showInstallDialog, setShowInstallDialog] = useState(false);
  const [beforeInstallPromptEvent, setBeforeInstallPromptEvent]
    = useState<BeforeInstallPromptEvent | null>(null);

  return (
    <AppInstallContext
      value={{
        animateInstallButton,
        beforeInstallPromptEvent,
        setAnimateInstallButton,
        setBeforeInstallPromptEvent,
        setShowInstall,
        setShowInstallDialog,
        showInstall,
        showInstallDialog,
      }}
    >
      {children}
      <AppInstall />
    </AppInstallContext>
  );
};

export default AppInstallProvider;
