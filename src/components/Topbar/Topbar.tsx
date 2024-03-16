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
    <header data-tabs-position={tabsPosition} className="topbar">
      <div
        className={cls(
          "topbar-inner",
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
