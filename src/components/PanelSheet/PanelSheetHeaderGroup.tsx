import { type PropsWithChildren, type ReactNode } from "react";
import { Popover } from "../Popover";
import { Heading } from "../Heading";

export type PanelSheetHeaderGroupProps = PropsWithChildren<{
  title?: string;
  description?: ReactNode;
}>;

export const PanelSheetHeaderGroup = ({
  title,
  description,
  children,
}: PanelSheetHeaderGroupProps) => {
  return (
    <>
      <div
        className="flex flex-row items-center text-inherit"
        aria-label={title}
      >
        {title && !description && (
          <Heading level={3} className="hidden font-size-sm sm:block">
            {title}
          </Heading>
        )}
        {title && description && (
          <Popover
            className="m-0 hidden b-0 b-none bg-transparent p-0 text-inherit sm:block"
            label={title}
          >
            {description}
          </Popover>
        )}
        {children}
      </div>
    </>
  );
};
