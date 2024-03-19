import { type PropsWithChildren, type ReactNode } from "react";
import { Popover } from "../Popover";

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
        {title && !description && <h3 className="font-size-sm">{title}</h3>}
        {title && description && (
          <Popover
            className="m-0 b-0 b-none bg-transparent p-0 text-inherit"
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