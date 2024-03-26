import { type PropsWithChildren } from "react";
import { ContextMenuProvider } from "../ContextMenu";
import { ModelContextProvider } from "../ModelContext";
import { PanelProvider, type PanelProviderProps } from "../Panel";
import { TabPanelProvider, type TabPanelProviderProps } from "../TabPanel";

export type AppProviderProps = PropsWithChildren<{
  title: PanelProviderProps["title"];
  userData: PanelProviderProps["userData"];
  defaultTab: TabPanelProviderProps["defaultTab"];
}>;

export const AppProvider = ({
  title,
  userData,
  defaultTab,
  children,
}: AppProviderProps) => {
  return (
    <PanelProvider title={title} userData={userData}>
      <ModelContextProvider>
        <ContextMenuProvider>
          <TabPanelProvider defaultTab={defaultTab}>
            {children}
          </TabPanelProvider>
        </ContextMenuProvider>
      </ModelContextProvider>
    </PanelProvider>
  );
};
