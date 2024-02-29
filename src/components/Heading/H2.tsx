import { forwardRef, type ForwardedRef } from "react";
import { BaseHeading, type BaseHeadingProps } from "./BaseHeading";

export type H2Props = Omit<BaseHeadingProps, "level">;

export const H2 = forwardRef((props: H2Props, ref: ForwardedRef<HTMLElement>) => {
  return (<BaseHeading ref={ref} {...props} level={2} />);
});

H2.displayName = "H2";
