import { forwardRef, type ForwardedRef } from "react";
import { BaseHeading, type BaseHeadingProps } from "./BaseHeading";

export type H1Props = Omit<BaseHeadingProps, "level">;

export const H1 = forwardRef((props: H1Props, ref: ForwardedRef<HTMLElement>) => {
  return (<BaseHeading ref={ref} {...props} level={1} />);
});

H1.displayName = "H1";
