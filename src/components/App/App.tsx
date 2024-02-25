import { Database } from "../../lib/Database";
import { HomePage } from "../../pages";
import { PanelProvider } from "../Panel/PanelProvider";
import { TabPanel } from "../TabPanel/TabPanel";
import { TabPanelProvider } from "../TabPanel/TabPanelProvider";
import { AppNav } from "./AppNav";

export interface AppProps {
  userData: Database<"UserData">;
}

export const App = ({ userData }: AppProps) => {
  return (
    <PanelProvider userData={userData}>
      <TabPanelProvider defaultTab={HomePage}>
        <TabPanel />
        <AppNav />
      </TabPanelProvider>
    </PanelProvider>
  );
};
