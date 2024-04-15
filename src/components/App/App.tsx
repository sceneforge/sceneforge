import { Database } from "../../lib/Database";
import { HomeTab } from "../../tabs";
import { TabPanel } from "../TabPanel/TabPanel";
import { AppNav } from "./AppNav";
import { AppProvider } from "./AppProvider";

export interface AppProps {
  userData: Database<"UserData">;
  languages?: readonly string[];
}

export const App = ({ userData, languages }: AppProps) => {
  return (
    <AppProvider
      userData={userData}
      homeComponent={HomeTab}
      languages={languages}
    >
      <TabPanel variant="default" />
      <AppNav />
    </AppProvider>
  );
};
