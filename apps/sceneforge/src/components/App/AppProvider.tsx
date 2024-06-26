import { DatabaseProvider } from "@sceneforge/data";
import { TabsHandler } from "@sceneforge/ui";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  type Dispatch,
  type PropsWithChildren,
  type RefObject,
  type SetStateAction,
  createContext,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";

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
  languages?: readonly string[];
  name?: string;
  repository?: string;
  resolvedLanguage?: string;
  setDirection?: Dispatch<SetStateAction<string | undefined>>;
  setResolvedLanguage?: Dispatch<SetStateAction<string | undefined>>;
  tabsHandlerRef?: RefObject<TabsHandler | null>;
  version?: string;
};

export const AppContext = createContext<AppContextType>({
  basePath: "/",
});

const queryClient = new QueryClient();

export const AppProvider = ({
  children,
  languages,
}: AppProviderProps) => {
  const tabsHandlerRef = useRef<TabsHandler | null>(null);
  const {
    i18n: { dir: i18nDir, resolvedLanguage: i18nResolvedLanguage },
  } = useTranslation();

  const [resolvedLanguage, setResolvedLanguage] = useState<string | undefined>(
    i18nResolvedLanguage
  );
  const [direction, setDirection] = useState<string | undefined>(i18nDir());
  const name = import.meta.env.VITE_APP_NAME ?? "";
  const description = import.meta.env.VITE_APP_DESCRIPTION ?? "";
  const keywords = import.meta.env.VITE_APP_KEYWORDS ?? "";
  const author = import.meta.env.VITE_APP_AUTHOR ?? "";
  const version = import.meta.env.VITE_APP_VERSION ?? "";
  const development = import.meta.env.DEV ? true : false;
  const basePath = import.meta.env.VITE_APP_BASE_PATH ?? "/";
  const repository = import.meta.env.VITE_APP_REPOSITORY ?? "";

  return (
    <AppContext.Provider
      value={{
        author,
        basePath,
        description,
        development,
        direction,
        keywords,
        languages,
        name,
        repository,
        resolvedLanguage,
        setDirection,
        setResolvedLanguage,
        tabsHandlerRef,
        version,
      }}
    >
      <QueryClientProvider client={queryClient}>
        <DatabaseProvider>
          {children}
        </DatabaseProvider>
      </QueryClientProvider>
    </AppContext.Provider>
  );
};
