import { PropsWithChildren, useEffect, type ReactNode } from "react";
import styles from "./Tab.module.css";

export type TabProps<
  P extends Record<string, unknown> = Record<string, unknown>
> = PropsWithChildren<{
  id?: string;
  title?: string;
  active?: boolean;
} & P>;

interface TabRenderFunction<
  P extends Record<string, unknown> = Record<string, unknown>
> {
  (props: TabProps<P>): ReactNode | JSX.Element;
  displayName?: string | undefined;
}

export const Tab = <
  P extends Record<string, unknown> = Record<string, unknown>
>(
  Component: TabRenderFunction<P>
) => {
  return function TabWrapper(props: TabProps<P>) {
    useEffect(() => {
      if (props.title) {
        document.title = props.title;
      }
    }, [props.title]);

    return (
      <div className={styles.wrapper}>
        <Component {...props} />
      </div>
    );
  };
};
