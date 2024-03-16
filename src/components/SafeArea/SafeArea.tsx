import { PropsWithChildren } from "react";
import { cls } from "../../lib/cls";

export type SafeAreaProps = PropsWithChildren<{
  vertical?: boolean;
  horizonal?: boolean;
}>;

export const SafeArea = ({ vertical, horizonal, children }: SafeAreaProps) => {
  const classVertical = vertical ? "p-t-12" : null;
  const classHorizonal = horizonal ? "p-inline-4" : null;

  return (
    <div className={cls("c-inherit", classVertical, classHorizonal)}>
      {children}
    </div>
  );
};
