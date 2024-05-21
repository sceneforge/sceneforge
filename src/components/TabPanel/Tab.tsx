import {
  type JSX,
  type PropsWithChildren,
  type ReactNode,
  useEffect,
  useMemo,
} from "react";
import { useTranslation } from "react-i18next";

import { useAppContext } from "../App";

export type TabWrapperProps<P extends object = object> = PropsWithChildren<
  {
    Component: TabRenderFunction<P>;
    active?: boolean;
    id: string;
    tabId?: string;
    title: string;
    translation?: {
      key: string;
      ns: string;
    };
  } & P
>;

export interface TabRenderFunction<P extends object = object> {
  (
    props: Omit<TabWrapperProps<P>, "Component" | "tabId">,
  ): JSX.Element | ReactNode;
  displayName?: string | undefined;
}

export type TabProps<P extends object = object> = Omit<
  TabWrapperProps<P>,
  "Component"
>;

export const Tab = <P extends object = object>({
  Component,
  tabId,
  ...props
}: TabWrapperProps<P>) => {
  const { resolvedLanguage } = useAppContext();
  const { t } = useTranslation();

  const tabTitle = useMemo(() => {
    if (props.translation && props.translation.ns && props.translation.key) {
      return t(props.translation.key, {
        lng: resolvedLanguage,
        ns: props.translation.ns,
      });
    }
    else if (props.title) {
      return props.title;
    }
  }, [props.translation, props.title, t, resolvedLanguage]);

  useEffect(() => {
    if (tabTitle) {
      document.title = tabTitle;
    }
  }, [tabTitle]);

  return (
    <div
      className="relative m-0 h-full w-full"
      hidden={!props.active}
      id={tabId}
      role="tabpanel"
    >
      <Component {...props} />
    </div>
  );
};
