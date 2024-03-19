import { Database } from "../../lib/Database";
import { HomeTab } from "../../tabs";
import { PanelProvider } from "../Panel/PanelProvider";
import { TabPanel } from "../TabPanel/TabPanel";
import { TabPanelProvider } from "../TabPanel/TabPanelProvider";
import { AppNav } from "./AppNav";
import { ReloadPrompt } from "../ReloadPrompt";
import { useId } from "react";
import { ContextMenuProvider } from "../ContextMenu";

export interface AppProps {
  userData: Database<"UserData">;
}

export const App = ({ userData }: AppProps) => {
  const id = useId();

  return (
    <PanelProvider title="SceneForge" userData={userData}>
      <ContextMenuProvider>
        <TabPanelProvider
          defaultTab={{
            id,
            title: "Scene Forge",
            component: HomeTab,
          }}
        >
          <TabPanel variant="default" />
          <AppNav />
        </TabPanelProvider>
        <ReloadPrompt />
      </ContextMenuProvider>
    </PanelProvider>
  );
};
