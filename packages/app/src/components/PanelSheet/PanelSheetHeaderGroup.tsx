import { type PropsWithChildren, type ReactNode } from "react";

import { Heading } from "../Heading";
import { Popover } from "../Popover";

export type PanelSheetHeaderGroupProps = PropsWithChildren<{
  description?: ReactNode;
  title?: string;
}>;

export const PanelSheetHeaderGroup = ({
  children,
  description,
  title,
}: PanelSheetHeaderGroupProps) => {
  return (
    <>
      <div
        aria-label={title}
        className="flex flex-row items-center text-inherit"
      >
        {title && !description && (
          <Heading className="hidden font-size-sm sm:block" level={3}>
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
