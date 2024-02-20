import type { DetailedHTMLProps, HTMLAttributes, PropsWithChildren } from "react";

export type BaseIconProps = DetailedHTMLProps<
  HTMLAttributes<HTMLSpanElement>, HTMLSpanElement
> & PropsWithChildren<{
  inverted?: boolean;
}>;

export const BaseIcon = ({ className, inverted, ...props }: BaseIconProps) => {
  return (
    <span
      aria-hidden={true}
      className={className}
      data-inverted={inverted ? "true" : "false"} {...props} />
  );
};
