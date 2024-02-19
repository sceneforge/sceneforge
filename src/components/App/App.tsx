import { HomePage } from "../../pages";
import { PanelProvider } from "../Panel/PanelProvider";
import { TabPanel } from '../TabPanel/TabPanel';
import { TabPanelProvider } from '../TabPanel/TabPanelProvider';
import { AppNav } from './AppNav';

export const App = () => {


  return (
    <PanelProvider>
      <TabPanelProvider defaultTab={HomePage}>
        <TabPanel />
        <AppNav />
      </TabPanelProvider>
    </PanelProvider>
  );
}
