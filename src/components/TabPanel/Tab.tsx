import {
  type JSX,
  type PropsWithChildren,
  type ReactNode,
  useEffect,
  useMemo,
} from "react";
import { useAppContext } from "../App";
import { useTranslation } from "react-i18next";

export type TabWrapperProps<P extends object = object> = PropsWithChildren<
  {
    Component: TabRenderFunction<P>;
    tabId?: string;
    id: string;
    title: string;
    translation?: {
      ns: string;
      key: string;
    };
    active?: boolean;
  } & P
>;

export interface TabRenderFunction<P extends object = object> {
  (
    props: Omit<TabWrapperProps<P>, "Component" | "tabId">,
  ): ReactNode | JSX.Element;
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
        ns: props.translation.ns,
        lng: resolvedLanguage,
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
      id={tabId}
      role="tabpanel"
      hidden={!props.active}
      className="relative m-0 h-full w-full"
    >
      <Component {...props} />
    </div>
  );
};
