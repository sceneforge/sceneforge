import * as stylex from "@stylexjs/stylex";
import { type ComponentType } from "react";
import { View } from "../View";

export type TabComponentType = ComponentType<{ hidden: boolean, tabId: string }>

export type TabPanelProps<Props = {}> = {
  tabId: string;
  hidden?: boolean;
  component?: TabComponentType;
  props?: Props;
};

const styles = stylex.create({
  hidden: {
    display: "none"
  }
});

const TabPanel = <Props = {}>({
  tabId,
  hidden,
  component: TabComponent,
  props,
}: TabPanelProps<Props>) => {
  return (
    <View id={`${tabId}-panel`} role="tabpanel" hidden={hidden} aria-labelledby={tabId} tabIndex={0} style={[hidden && styles.hidden]}>
      {TabComponent && <TabComponent {...props} hidden={hidden ?? true} tabId={tabId} />}
    </View>
  );
};

export default TabPanel;
