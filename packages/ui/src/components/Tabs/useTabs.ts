import {
  type Ref,
  useCallback,
  useId,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";

import type { TabContent } from "./Tabs";

export interface TabsHandler {
  activateTab(tabId: string): void;
  closeTab(tabId: string): void;
  get activeTabId(): string | undefined;
  openTab(newContent: TabContent): void;
  set activeTabId(tabId: string | undefined);
};

export type UseTabsProps = {
  id?: string;
  initialContent?: TabContent[];
  ref?: Ref<TabsHandler>;
};

export const useTabs = ({ id, initialContent, ref }: UseTabsProps) => {
  const generatedId = useId();
  const currentId = id || generatedId;
  const [content, setContent] = useState<TabContent[]>(initialContent ?? []);
  const [currentActiveTabId, setActiveTabId] = useState<string | undefined>();

  const activeTabId = useMemo(() => {
    if (currentActiveTabId) {
      return currentActiveTabId;
    }

    return content.length > 0 ? content[0].tab.id : undefined;
  }, [currentActiveTabId, content]);

  const handleTabChange = useCallback((tabId: string) => {
    setActiveTabId(tabId);
  }, []);

  const handleTabClose = useCallback((tabId: string) => {
    setContent((previousContent) => {
      return previousContent.filter(({ tab }) => tab.id !== tabId);
    });
  }, []);

  const handleOpenTab = useCallback((newContent: TabContent) => {
    if (content.some(({ tab }) => tab.id === newContent.tab.id)) {
      setContent((previousContent) => {
        return previousContent.map((c) => {
          return c.tab.id === newContent.tab.id ? newContent : c;
        });
      });
    }
    else {
      setContent((previousContent) => {
        return [...previousContent, newContent];
      });
    }
  }, [content]);

  useImperativeHandle(ref, () => (new (class implements TabsHandler {
    activateTab(tabId: string) {
      handleTabChange(tabId);
    }

    closeTab(tabId: string) {
      handleTabClose(tabId);
    }

    openTab(newContent: TabContent) {
      handleOpenTab(newContent);
    }

    get activeTabId() {
      return activeTabId;
    }

    set activeTabId(tabId: string | undefined) {
      setActiveTabId(tabId);
    }
  })()), [activeTabId, handleOpenTab, handleTabChange, handleTabClose]);

  return {
    activeTabId,
    content,
    currentId,
    handleTabChange,
    handleTabClose,
  };
};
