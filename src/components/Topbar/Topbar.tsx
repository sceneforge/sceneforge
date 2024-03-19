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
        <h1 className="m-0 p-0 font-size-4">{title}</h1>
        {actionsStart?.length && (
          <div className="m-0 h-full flex flex-grow flex-row justify-start gap-2 p-0">
            {actionsStart.map((props, index) => (
              <Action
                key={index}
                {...props}
                className="min-w b-none bg-transparent c-inherit"
              />
            ))}
          </div>
        )}
        {actionsEnd?.length && (
          <div className="m-0 h-full flex flex-grow flex-row justify-end gap-2 p-0">
            {actionsEnd.map((props, index) => (
              <Action
                key={index}
                {...props}
                className="min-w b-none bg-transparent c-inherit"
              />
            ))}
          </div>
        )}
      </div>
    </header>
  );
};
