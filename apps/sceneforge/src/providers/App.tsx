import { DatabaseProvider } from "@sceneforge/data";
import {
  type TabsHandler,
  ThemeProvider,
  type ThemeType,
} from "@sceneforge/ui";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import {
  type PropsWithChildren,
  useRef,
  useState,
} from "react";

import { ReloadPrompt } from "../components";
import { isOverlayVisible } from "../lib/isOverlayVisible";
import { AppContext } from "./AppContext";

export type AppProviderProps = PropsWithChildren<{
  languages?: readonly string[];
  theme?: ThemeType;
}>;

const queryClient = new QueryClient();

const AppProvider = ({
  children,
  theme,
}: AppProviderProps) => {
  const tabsHandlerRef = useRef<null | TabsHandler>(null);

  const name = import.meta.env.VITE_APP_NAME ?? "";
  const description = import.meta.env.VITE_APP_DESCRIPTION ?? "";
  const keywords = import.meta.env.VITE_APP_KEYWORDS ?? "";
  const author = import.meta.env.VITE_APP_AUTHOR ?? "";
  const version = import.meta.env.VITE_APP_VERSION ?? "";
  const development = import.meta.env.DEV ? true : false;
  const basePath = import.meta.env.VITE_APP_BASE_PATH ?? "/";
  const repository = import.meta.env.VITE_APP_REPOSITORY ?? "";

  const [overlayVisible, setOverlayVisible] = useState(isOverlayVisible());

  return (
    <AppContext
      value={{
        author,
        basePath,
        description,
        development,
        keywords,
        name,
        overlayVisible,
        repository,
        setOverlayVisible,
        tabsHandlerRef,
        version,
      }}
    >
      <ThemeProvider {...theme}>
        <QueryClientProvider client={queryClient}>
          <DatabaseProvider>
            {children}
            <ReloadPrompt />
          </DatabaseProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </AppContext>
  );
};

export default AppProvider;
