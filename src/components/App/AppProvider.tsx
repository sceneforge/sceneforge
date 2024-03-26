import { createContext, type PropsWithChildren } from "react";
import { ContextMenuProvider } from "../ContextMenu";
import { ModelContextProvider } from "../ModelContext";
import { PanelProvider, type PanelProviderProps } from "../Panel";
import { TabPanelProvider, type TabComponent } from "../TabPanel";

export type AppProviderProps = PropsWithChildren<{
  userData: PanelProviderProps["userData"];
  homeComponent?: TabComponent;
}>;

export type AppContextType = {
  name?: string;
  description?: string;
  version?: string;
  dev?: boolean;
};

export const AppContext = createContext<AppContextType>({});

export const AppProvider = ({
  userData,
  homeComponent,
  children,
}: AppProviderProps) => {
  const name = import.meta.env.VITE_APP_NAME ?? "";
  const description = import.meta.env.VITE_APP_DESCRIPTION ?? "";
  const version = import.meta.env.VITE_APP_VERSION ?? "";
  const dev = import.meta.env.DEV ? true : false;

  return (
    <AppContext.Provider value={{ name, description, version, dev }}>
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
            </TabPanelProvider>
          </ContextMenuProvider>
        </ModelContextProvider>
      </PanelProvider>
    </AppContext.Provider>
  );
};
