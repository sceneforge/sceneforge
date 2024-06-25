import { IconEnum } from "@sceneforge/ui";
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

  const openTab = useCallback(<
    Template extends TabTemplates = TabTemplates,
    TemplateProps extends Parameters<Template>[0] = Parameters<Template>[0],
  >(
    id: string,
    label: string,
    icon: IconEnum | undefined,
    template: Template,
    props: TemplateProps
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
        tab: { icon, id, label },
      });

      tabsHandler.activateTab(id);
    }
  }, [tabsHandlerRef]);

  return {
    activeTabId,
    openTab,
  };
};
