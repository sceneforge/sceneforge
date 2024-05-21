import { Database } from "../../lib/Database";
import { HomeTab } from "../../tabs";
import { TabPanel } from "../TabPanel/TabPanel";
import { AppNav } from "./AppNav";
import { AppProvider } from "./AppProvider";

export interface AppProps {
  languages?: readonly string[];
  userData: Database<"UserData">;
}

export const App = ({ languages, userData }: AppProps) => {
  return (
    <AppProvider
      homeComponent={HomeTab}
      languages={languages}
      userData={userData}
    >
      <TabPanel variant="default" />
      <AppNav />
    </AppProvider>
  );
};
