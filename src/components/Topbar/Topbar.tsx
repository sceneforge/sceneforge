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
      className={cls(
        "fixed bg-white dark:bg-black w-full inset-t-0 inset-x-0 titlebar-area-height app-region-drag inset-titlebar-area-y",
        tabsPosition === "top"
          ? null
          : "b-b-1 b-b-solid b-b-black:75 shadow shadow-md shadow-black:30"
      )}
    >
      <div
        className={cls(
          "absolute text-light h-full ps pe flex flex-row items-center justify-stretch gap-2 inset-t-0 titlebar-area-width inset-titlebar-area-x",
          variant ? variantBgClass[variant] : "bg-primary"
        )}
      >
        <h1 className="font-size-4 p-0 m-0">{title}</h1>
        {actionsStart?.length && (
          <div className="flex-grow flex gap-2 flex-row p-0 m-0 h-full justify-start">
            {actionsStart.map((props, index) => (
              <Action
                key={index}
                {...props}
                className="min-w bg-transparent c-inherit b-none"
              />
            ))}
          </div>
        )}
        {actionsEnd?.length && (
          <div className="flex-grow flex gap-2 flex-row p-0 m-0 h-full justify-end">
            {actionsEnd.map((props, index) => (
              <Action
                key={index}
                {...props}
                className="min-w bg-transparent c-inherit b-none"
              />
            ))}
          </div>
        )}
      </div>
    </header>
  );
};
