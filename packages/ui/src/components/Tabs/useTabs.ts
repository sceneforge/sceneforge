import {
  type Ref,
  useCallback,
  useId,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";

import type { TabCloseCallback } from "./TabPanel";
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
  onTabClose?: (content: TabContent) => void;
  ref?: Ref<TabsHandler>;
};

export const useTabs = ({
  id,
  initialContent,
  onTabClose,
  ref,
}: UseTabsProps) => {
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

  const closeTab = useCallback((tabId: string) => {
    setContent((previousContent) => {
      const result = previousContent.filter(({ tab }) => tab.id !== tabId);
      if (activeTabId === tabId && result.length > 0) {
        setActiveTabId(result[0].tab.id);
      }
      return result;
    });
  }, [activeTabId]);

  const handleEdgeCloses = useCallback((
    tabId: string,
    closeCallback: (tabId: string) => void
  ) => {
    const tabContent = content.find(({ tab }) => tab.id === tabId);
    if (!tabContent) return;
    if (onTabClose) {
      onTabClose(tabContent);
    }
    if (tabContent.panel.beforeClose) {
      Promise.resolve(tabContent.panel.beforeClose()).then(() => {
        closeCallback(tabId);
      })
        .catch((error: unknown) => {
          const errorResult = error instanceof Error
            ? error
            : new Error(`Tab ${currentId}: Error closing tab ${tabId}`, {
              cause: {
                error,
                id: currentId,
                tabId,
              },
            });
          throw errorResult;
        });
    }
    else {
      closeCallback(tabId);
    }
  }, [content, currentId, onTabClose]);

  const handleTabClose = useCallback((tabId: string) => {
    handleEdgeCloses(tabId, closeTab);
  }, [handleEdgeCloses, closeTab]);

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

  const registerBeforeClose = useCallback((tabId: string) => {
    return (callback?: TabCloseCallback) => {
      setContent((previousContent) => {
        return previousContent.map((c) => {
          if (c.tab.id === tabId) {
            return {
              ...c,
              panel: {
                ...c.panel,
                beforeClose: callback,
              },
            };
          }
          return c;
        });
      });
    };
  }, [setContent]);

  return {
    activeTabId,
    content,
    currentId,
    handleTabChange,
    handleTabClose,
    registerBeforeClose,
  };
};
