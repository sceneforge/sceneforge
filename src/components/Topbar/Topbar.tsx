import { useTabPanel } from "../TabPanel";
import { Variant } from "../../types/variants";
import { cls } from "../../lib/cls";
import { variantBgClass } from "../../lib/variantClasses";
import { Action, ActionProps } from "../Action";

export type TopbarProps = {
  title: string;
  variant?: Variant;
  actionsStart?: ActionProps[];
  actionsEnd?: ActionProps[];
};

export const Topbar = ({
  title,
  actionsStart,
  actionsEnd,
  variant = "default",
}: TopbarProps) => {
  const { tabsPosition } = useTabPanel();

  return (
    <header
      data-tabs-position={tabsPosition}
      className="fixed inset-inline-0 inset-block-0 h-10 w-full bg-white dark:bg-black"
    >
      <div
        className={cls(
          "absolute text-light w-full h-full ps pe flex flex-row items-center justify-stretch gap-4 inset-inline-0 inset-block-0 h-full b-b-2 b-b-solid light:b-b-white:20 dark:b-b-black:20 shadow shadow-md shadow-black:30",
          variant ? variantBgClass[variant] : "bg-primary"
        )}
      >
        <h1 className="font-size-4 p-0 m-0">{title}</h1>
        {actionsStart?.length && (
          <div className="flex-grow flex gap-2 flex-row p-0 m-0 h-full justify-start">
            {actionsStart.map((props, index) => (
              <Action key={index} {...props} />
            ))}
          </div>
        )}
        {actionsEnd?.length && (
          <div className="flex-grow flex gap-2 flex-row p-0 m-0 h-full justify-end">
            {actionsEnd.map((props, index) => (
              <Action key={index} {...props} />
            ))}
          </div>
        )}
      </div>
    </header>
  );
};
