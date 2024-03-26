import { PropsWithChildren, useEffect, type ReactNode } from "react";

export type TabProps<P extends object = object> = PropsWithChildren<
  {
    tabId?: string;
    id: string;
    title: string;
    active?: boolean;
  } & P
>;

interface TabRenderFunction<P extends object> {
  (props: Omit<TabProps<P>, "tabId">): ReactNode | JSX.Element;
  displayName?: string | undefined;
}

export const Tab = <
  P extends object
>(
  Component: TabRenderFunction<P>
) => {
  return function TabWrapper({ tabId, ...props }: TabProps<P>) {
    useEffect(() => {
      if (props.title) {
        document.title = props.title;
      }
    }, [props.title]);

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
