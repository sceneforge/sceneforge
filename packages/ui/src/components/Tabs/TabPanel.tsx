import * as stylex from "@stylexjs/stylex";
import { type ComponentType } from "react";

import { View } from "../View";

export type TabComponentType = ComponentType<{
  hidden: boolean;
  tabId: string;
}>;

export type TabPanelProps<Props = Record<string, unknown>> = {
  component?: TabComponentType;
  hidden?: boolean;
  props?: Props;
  tabId: string;
};

const styles = stylex.create({
  hidden: {
    display: "none",
  },
});

const TabPanel = <Props = Record<string, unknown>>({
  component: TabComponent,
  hidden,
  props,
  tabId,
}: TabPanelProps<Props>) => {
  return (
    <View
      aria-labelledby={tabId}
      hidden={hidden}
      id={`${tabId}-panel`}
      role="tabpanel"
      style={[hidden && styles.hidden]}
      tabIndex={0}
    >
      {
        TabComponent && (
          <TabComponent
            {...props}
            hidden={hidden ?? true}
            tabId={tabId}
          />
        )
      }
    </View>
  );
};

export default TabPanel;
