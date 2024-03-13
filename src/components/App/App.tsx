import { v4 as uuid } from "uuid";
import { Database } from "../../lib/Database";
import { HomeTab } from "../../tabs";
import { PanelProvider } from "../Panel/PanelProvider";
import { TabPanel } from "../TabPanel/TabPanel";
import { TabPanelProvider } from "../TabPanel/TabPanelProvider";
import { AppNav } from "./AppNav";
import { ReloadPrompt } from "../ReloadPrompt";

export interface AppProps {
  userData: Database<"UserData">;
}

export const App = ({ userData }: AppProps) => {
  return (
    <PanelProvider title="SceneForge" userData={userData}>
      <TabPanelProvider defaultTab={{
        id: uuid(),
        title: "Home",
        component: HomeTab
      }}>
        <TabPanel />
        <AppNav />
      </TabPanelProvider>
      <ReloadPrompt />
    </PanelProvider>
  );
};
