import { PropsWithChildren, useEffect, type ReactNode } from "react";

export type TabProps<
  P extends Record<string, unknown> = Record<string, unknown>
> = PropsWithChildren<
  {
    tabId?: string;
    id?: string;
    title?: string;
    active?: boolean;
  } & P
>;

interface TabRenderFunction<
  P extends Record<string, unknown> = Record<string, unknown>
> {
  (props: Omit<TabProps<P>, "tabId">): ReactNode | JSX.Element;
  displayName?: string | undefined;
}

export const Tab = <
  P extends Record<string, unknown> = Record<string, unknown>
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
        className="relative w-full h-full m-0"
      >
        <Component {...props} />
      </div>
    );
  };
};
