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
  container: {
    height: 0,
    maxHeight: "100%",
    maxWidth: "100%",
    minHeight: "100%",
    minWidth: "100%",
    overflow: "hidden",
    position: "relative",
    width: 0,
  },
  hidden: {
    display: "none",
  },
  scrollable: {
    height: "100%",
    overflow: "auto",
    width: "100%",
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
      style={[styles.container, hidden && styles.hidden]}
      tabIndex={0}
    >
      <View style={[styles.scrollable]}>
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
    </View>
  );
};

export default TabPanel;
