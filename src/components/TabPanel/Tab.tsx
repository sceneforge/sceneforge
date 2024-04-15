import { PropsWithChildren, useEffect, useMemo, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { useAppContext } from "../App";

export type TabProps<P extends object = object> = PropsWithChildren<
  {
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

interface TabRenderFunction<P extends object> {
  (props: Omit<TabProps<P>, "tabId">): ReactNode | JSX.Element;
  displayName?: string | undefined;
}

export const Tab = <P extends object>(Component: TabRenderFunction<P>) => {
  return function TabWrapper({ tabId, ...props }: TabProps<P>) {
    const { resolvedLanguage } = useAppContext();
    const { t } = useTranslation();

    const tabTitle = useMemo(() => {
      if (props.translation && props.translation.ns && props.translation.key) {
        return t(props.translation.key, {
          ns: props.translation.ns,
          lng: resolvedLanguage,
        });
      } else if (props.title) {
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
};
