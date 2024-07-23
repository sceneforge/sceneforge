import type { IconEnum } from "@sceneforge/ui";

import { createElement, useCallback, useMemo } from "react";

import type { TabTemplates } from "../templates";

import { useAppContext } from "./useAppContext";

export type OpenTabFunction<
  T extends TabTemplates = TabTemplates,
  TemplateProps extends Parameters<T>[0] = Parameters<T>[0],
> = (
  id: string,
  label: string,
  icon: IconEnum | undefined,
  template: T,
  props: TemplateProps
) => void;

export type RemoveTabFunction = (id: string) => void;

export const useTabs = () => {
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

  const removeTab: RemoveTabFunction = useCallback((id) => {
    if (tabsHandlerRef && tabsHandlerRef.current) {
      const tabsHandler = tabsHandlerRef.current;
      tabsHandler.closeTab(id);
    }
  }, [tabsHandlerRef]);

  const openTab: OpenTabFunction = useCallback((
    id,
    label,
    icon,
    template,
    props
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
    removeTab,
  };
};
