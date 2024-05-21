import { PropsWithChildren } from "react";
import { cls } from "../../lib/cls";
import { useTabPanel } from "../TabPanel";

export type SafeAreaProps = PropsWithChildren<{
  vertical?: boolean;
  horizonal?: boolean;
}>;

export const SafeArea = ({ vertical, horizonal, children }: SafeAreaProps) => {
  const { tabsPosition } = useTabPanel();

  const classVertical = vertical
    ? (tabsPosition === "top"
      ? "p-t-2"
      : "p-t-16")
    : null;
  const classHorizonal = horizonal ? "p-inline-4" : null;

  return (
    <div className={cls("c-light", classVertical, classHorizonal)}>
      {children}
    </div>
  );
};
