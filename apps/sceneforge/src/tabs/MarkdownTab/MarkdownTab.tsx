import type { TabComponentType } from "@sceneforge/ui";

import { Markdown } from "../../components/Markdown";
import { SafeArea } from "../../components/SafeArea";

const getHrefByTabId = (...args: unknown[]): string => {
  console.log("DEBUG: getHrefByTabId", args);
  throw new Error("Not implemented");
};

export const MarkdownTab: TabComponentType = ({ tabId }) => {
  return (
    <SafeArea horizonal vertical>
      <Markdown href={getHrefByTabId(tabId)} />
    </SafeArea>
  );
};
