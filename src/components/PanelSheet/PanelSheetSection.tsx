import { type PropsWithChildren } from "react";
import { H2 } from "../Heading";
import { Action, ActionProps } from "../Action";

export type PanelSheetSectionProps = PropsWithChildren<{
  title?: string;
  className?: string;
  actions?: ActionProps[];
}>;

export const PanelSheetSection = ({
  title,
  actions,
  children,
}: PanelSheetSectionProps) => {
  return (
    <section className="w-full flex flex-shrink flex-col justify-stretch overflow-clip rounded c-inherit dark:bg-black:25 light:bg-white:25">
      <div className="m-b-1 flex flex-shrink flex-row items-center justify-stretch b-block-1 b-block-solid p-l-2 p-r-1 p-block-1 dark:b-b-black:15 dark:b-t-white:10 light:b-b-white:10 light:b-t-black:10 dark:bg-black:10 light:bg-white:10">
        {title && <H2 text={title} />}
        {actions && actions.length > 0 && (
          <div className="flex flex-shrink flex-row flex-nowrap items-center justify-stretch">
            {actions.map((props, index) => (
              <Action key={index} {...props} />
            ))}
          </div>
        )}
      </div>
      <div className="h-full flex-grow overflow-auto p-1">{children}</div>
    </section>
  );
};
