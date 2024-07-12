import { DatabaseProvider } from "@sceneforge/data";
import { type TabsHandler, ThemeProvider, Variant } from "@sceneforge/ui";
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
      <ThemeProvider
        colors={{
          [Variant.Accent]: {
            background: {
              dark: "#006e50",
              light: "#00a98f",
            },
            foreground: {
              dark: "#ffffff",
              light: "#ffffff",
            },
          },
          [Variant.Danger]: {
            background: {
              dark: "#cc2244",
              light: "#aa2244",
            },
            foreground: {
              dark: "#ffffff",
              light: "#ffffff",
            },
          },
          [Variant.Default]: {
            background: {
              dark: "#000000",
              light: "#ffffff",
            },
            foreground: {
              dark: "#ffffff",
              light: "#000000",
            },
          },
          [Variant.Info]: {
            background: {
              dark: "#0044cc",
              light: "#0066cc",
            },
            foreground: {
              dark: "#ffffff",
              light: "#ffffff",
            },
          },
          [Variant.Primary]: {
            background: {
              dark: "#75048c",
              light: "#86159d",
            },
            foreground: {
              dark: "#ffffff",
              light: "#ffffff",
            },
          },
          [Variant.Success]: {
            background: {
              dark: "#007f00",
              light: "#009f00",
            },
            foreground: {
              dark: "#ffffff",
              light: "#ffffff",
            },
          },
          [Variant.Warning]: {
            background: {
              dark: "#ff8c00",
              light: "#ff9f00",
            },
            foreground: {
              dark: "#000000",
              light: "#000000",
            },
          },
        }}
      >
        <QueryClientProvider client={queryClient}>
          <DatabaseProvider>
            {children}
          </DatabaseProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </AppContext>
  );
};
