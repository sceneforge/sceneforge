import { DatabaseProvider } from "@sceneforge/data";
import { TabsHandler } from "@sceneforge/ui";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  type PropsWithChildren,
  type RefObject,
  createContext,
  useRef,
} from "react";

export type AppProviderProps = PropsWithChildren<{
  languages?: readonly string[];
}>;

export type AppContextType = {
  author?: string;
  basePath: string;
  description?: string;
  development?: boolean;
  direction?: string;
  keywords?: string;
  name?: string;
  repository?: string;
  tabsHandlerRef?: RefObject<TabsHandler | null>;
  version?: string;
};

export const AppContext = createContext<AppContextType>({
  basePath: "/",
});

const queryClient = new QueryClient();

export const AppProvider = ({
  children,
}: AppProviderProps) => {
  const tabsHandlerRef = useRef<TabsHandler | null>(null);

  const name = import.meta.env.VITE_APP_NAME ?? "";
  const description = import.meta.env.VITE_APP_DESCRIPTION ?? "";
  const keywords = import.meta.env.VITE_APP_KEYWORDS ?? "";
  const author = import.meta.env.VITE_APP_AUTHOR ?? "";
  const version = import.meta.env.VITE_APP_VERSION ?? "";
  const development = import.meta.env.DEV ? true : false;
  const basePath = import.meta.env.VITE_APP_BASE_PATH ?? "/";
  const repository = import.meta.env.VITE_APP_REPOSITORY ?? "";

  return (
    <AppContext
      value={{
        author,
        basePath,
        description,
        development,
        keywords,
        name,
        repository,
        tabsHandlerRef,
        version,
      }}
    >
      <QueryClientProvider client={queryClient}>
        <DatabaseProvider>
          {children}
        </DatabaseProvider>
      </QueryClientProvider>
    </AppContext>
  );
};
