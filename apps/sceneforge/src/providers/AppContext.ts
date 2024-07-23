import type { TabsHandler } from "@sceneforge/ui";

import { type Dispatch, type RefObject, type SetStateAction, createContext } from "react";

export type AppContextType = {
  author?: string;
  basePath: string;
  description?: string;
  development?: boolean;
  direction?: string;
  keywords?: string;
  name?: string;
  overlayVisible: boolean;
  repository?: string;
  setOverlayVisible: Dispatch<SetStateAction<boolean>>;
  tabsHandlerRef?: RefObject<TabsHandler | null>;
  version?: string;
};

export const AppContext = createContext<AppContextType>({
  basePath: "/",
  overlayVisible: false,
  setOverlayVisible: () => void 0,
});
