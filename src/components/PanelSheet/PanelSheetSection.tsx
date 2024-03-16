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
    <section className="w-full flex-shrink flex flex-col justify-stretch dark:bg-black:25 light:bg-white:25 c-inherit rounded overflow-clip">
      <div className="flex-shrink p-l-2 p-r-1 p-block-1 m-b-1 flex flex-row justify-stretch items-center dark:bg-black:10 light:bg-white:10 b-block-1 b-block-solid dark:b-t-white:10 light:b-t-black:10 dark:b-b-black:15 light:b-b-white:10">
        {title && <H2 text={title} />}
        {actions && actions.length > 0 && (
          <div className="flex-shrink flex flex-row flex-nowrap justify-stretch items-center">
            {actions.map((props, index) => (
              <Action key={index} {...props} />
            ))}
          </div>
        )}
      </div>
      <div className="flex-grow h-full overflow-auto p-1">{children}</div>
    </section>
  );
};
