import { useId } from "react";

import { Tab, type TabWrapperProps } from "./Tab";

const component: TabWrapperProps<object>["Component"] = () => null;

export const TabNull = () => {
  const id = useId();
  const title = "";
  return <Tab Component={component} id={id} title={title} />;
};
