import { createElement, useCallback, useMemo } from "react";

import type { TabTemplates } from "../../tabTemplates";

import { useAppContext } from "./useAppContext";

export const useAppTabs = () => {
  const { tabsHandlerRef } = useAppContext();

  const activeTabId = useMemo(() => {
    if (tabsHandlerRef && tabsHandlerRef.current) {
      const tabsHandler = tabsHandlerRef.current;
      if (tabsHandler.activeTabId) {
        return tabsHandler.activeTabId;
      }
    }
    return;
  }, [tabsHandlerRef]);

  const openTab = useCallback(<Template extends TabTemplates = TabTemplates>(
    id: string,
    label: string,
    template: Template,
    props: Parameters<Template>[0]
  ) => {
    if (tabsHandlerRef && tabsHandlerRef.current) {
      const tabsHandler = tabsHandlerRef.current;

      tabsHandler.openTab({
        panel: {
          component: (tabProps) => {
            return createElement(template, {
              ...props,
              ...tabProps,
            });
          },
        },
        tab: { id, label },
      });

      tabsHandler.activateTab(id);
    }
  }, [tabsHandlerRef]);

  return {
    activeTabId,
    openTab,
  };
};
