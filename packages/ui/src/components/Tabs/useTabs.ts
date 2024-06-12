import {
  useCallback,
  useId,
  useImperativeHandle,
  useMemo,
  useState,
  type Ref
} from "react";
import type { TabContent } from "./Tabs";

export interface TabsHandler {
  get activeTabId(): string | undefined;
  set activeTabId(tabId: string | undefined);
  closeTab(tabId: string): void;
  activateTab(tabId: string): void;
  openTab(newContent: TabContent): void;
};

export type UseTabsProps = {
  id?: string;
  ref?: Ref<TabsHandler>;
  initialContent?: TabContent[];
};

export const useTabs = ({ id, ref, initialContent }: UseTabsProps) => {
  const generatedId = useId();
  const currentId = id || generatedId;
  const [content, setContent] = useState<TabContent[]>(initialContent ?? []);
  const [currentActiveTabId, setActiveTabId] = useState<string | undefined>(undefined);

  const activeTabId = useMemo(() => {
    if (currentActiveTabId) {
      return currentActiveTabId;
    }

    return content.length ? content[0].tab.id : undefined;
  }, [currentActiveTabId, content]);

  const handleTabChange = useCallback((tabId: string) => {
    setActiveTabId(tabId);
  }, [content]);

  const handleTabClose = useCallback((tabId: string) => {
    setContent((prevContent) => prevContent.filter(({ tab }) => tab.id !== tabId));
  }, []);

  const handleOpenTab = useCallback((newContent: TabContent) => {
    if (content.find(({ tab }) => tab.id === newContent.tab.id)) {
      setContent((prevContent) => prevContent.map((c) => (c.tab.id === newContent.tab.id ? newContent : c)));
    } else {
      setContent((prevContent) => [...prevContent, newContent]);
    }
  }, [content]);

  useImperativeHandle(ref, () => (new (class implements TabsHandler {
    get activeTabId() {
      return activeTabId;
    }

    set activeTabId(tabId: string | undefined) {
      setActiveTabId(tabId);
    }

    closeTab(tabId: string) {
      handleTabClose(tabId);
    }

    activateTab(tabId: string) {
      handleTabChange(tabId);
    }

    openTab(newContent: TabContent) {
      handleOpenTab(newContent);
    }
  })), [content]);

  return {
    content,
    currentId,
    activeTabId,
    handleTabChange,
    handleTabClose,
  };
};
