import { Database } from "../../lib/Database";
import { HomeTab } from "../../tabs";
import { TabPanel } from "../TabPanel/TabPanel";
import { AppNav } from "./AppNav";
import { AppProvider } from "./AppProvider";

export interface AppProps {
  userData: Database<"UserData">;
}

export const App = ({ userData }: AppProps) => {
  return (
    <AppProvider
      title="SceneForge"
      userData={userData}
      defaultTab={{
        id: "home",
        title: "Scene Forge",
        component: HomeTab,
      }}
    >
      <TabPanel variant="default" />
      <AppNav />
    </AppProvider>
  );
};
