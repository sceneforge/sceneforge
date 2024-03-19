import { type PropsWithChildren } from "react";
import { Heading } from "../Heading";
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
        {title && (
          <Heading
            level={2}
            className="m-0 flex-grow p-0 text-start font-size-4"
          >
            {title}
          </Heading>
        )}
        {actions && actions.length > 0 && (
          <div className="flex flex-shrink flex-row flex-nowrap items-center justify-stretch p-r-1">
            {actions.map((props, index) => (
              <Action
                key={index}
                {...props}
                className="m-0 cursor-pointer rounded b-none bg-transparent p-0 c-inherit dark:hover:bg-black:15 light:hover:bg-white:15"
              />
            ))}
          </div>
        )}
      </div>
      <div className="h-full flex-grow overflow-auto p-1 text-start">
        {children}
      </div>
    </section>
  );
};
