import { type ComponentType } from "react";

export type TabComponentType = ComponentType<{ hidden: boolean, tabId: string }>

export type TabPanelProps = {
  tabId: string;
  hidden?: boolean;
  component?: TabComponentType
};

const TabPanel = ({
  tabId,
  hidden,
  component: TabComponent
}: TabPanelProps) => {
  return (
    <div id={`${tabId}-panel`} role="tabpanel" hidden={hidden} aria-labelledby={tabId} tabIndex={0}>
      {TabComponent && <TabComponent hidden={hidden ?? true} tabId={tabId} />}
    </div>
  );
};

export default TabPanel;
