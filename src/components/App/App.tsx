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
    <AppProvider userData={userData} homeComponent={HomeTab}>
      <TabPanel variant="default" />
      <AppNav />
    </AppProvider>
  );
};
