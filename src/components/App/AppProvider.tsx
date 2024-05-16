import {
  type Dispatch,
  type SetStateAction,
  createContext,
  useState,
  type PropsWithChildren,
} from "react";
import { ContextMenuProvider } from "../ContextMenu";
import { ModelContextProvider } from "../ModelContext";
import { PanelProvider, type PanelProviderProps } from "../Panel";
import { TabPanelProvider, type TabComponent } from "../TabPanel";
import { AppInstallProvider } from "../AppInstall";
import { useTranslation } from "react-i18next";
import { AppShortcuts } from "./AppShortcuts";

export type AppProviderProps = PropsWithChildren<{
  userData: PanelProviderProps["userData"];
  languages?: readonly string[];
  homeComponent?: TabComponent;
}>;

export type AppContextType = {
  name?: string;
  description?: string;
  version?: string;
  dev?: boolean;
  resolvedLanguage?: string;
  dir?: string;
  setResolvedLanguage?: Dispatch<SetStateAction<string | undefined>>;
  setDir?: Dispatch<SetStateAction<string | undefined>>;
  languages?: readonly string[];
  basePath: string;
  keywords?: string;
  author?: string;
  repository?: string;
};

export const AppContext = createContext<AppContextType>({
  basePath: "/",
});

export const AppProvider = ({
  userData,
  languages,
  homeComponent,
  children,
}: AppProviderProps) => {
  const {
    i18n: { resolvedLanguage: i18nResolvedLanguage, dir: i18nDir },
  } = useTranslation();

  const [resolvedLanguage, setResolvedLanguage] = useState<string | undefined>(
    i18nResolvedLanguage,
  );
  const [dir, setDir] = useState<string | undefined>(i18nDir());
  const name = import.meta.env.VITE_APP_NAME ?? "";
  const description = import.meta.env.VITE_APP_DESCRIPTION ?? "";
  const keywords = import.meta.env.VITE_APP_KEYWORDS ?? "";
  const author = import.meta.env.VITE_APP_AUTHOR ?? "";
  const version = import.meta.env.VITE_APP_VERSION ?? "";
  const dev = import.meta.env.DEV ? true : false;
  const basePath = import.meta.env.VITE_APP_BASE_PATH ?? "/";
  const repository = import.meta.env.VITE_APP_REPOSITORY ?? "";

  return (
    <AppContext.Provider
      value={{
        name,
        description,
        version,
        dev,
        resolvedLanguage,
        setResolvedLanguage,
        dir,
        setDir,
        languages,
        basePath,
        keywords,
        author,
        repository,
      }}
    >
      <AppInstallProvider>
        <PanelProvider title={name} userData={userData}>
          <ModelContextProvider>
            <ContextMenuProvider>
              <TabPanelProvider
                defaultTab={
                  homeComponent && {
                    id: "home",
                    title: name,
                    component: homeComponent,
                  }
                }
              >
                {children}
                <AppShortcuts />
              </TabPanelProvider>
            </ContextMenuProvider>
          </ModelContextProvider>
        </PanelProvider>
      </AppInstallProvider>
    </AppContext.Provider>
  );
};
