import { Variant } from "@sceneforge/ui";

import { cls } from "../../lib/cls";
import { variantBgClass } from "../../lib/variantClasses";
import { useTabPanel } from "../TabPanel";
import { Toolbar, ToolbarProps } from "../Toolbar";

export type TopbarProps = {
  title: string;
  toolbarEnd?: ToolbarProps;
  toolbarStart?: ToolbarProps;
  variant?: Variant;
};

export const Topbar = ({
  title,
  toolbarEnd,
  toolbarStart,
  variant = Variant.Default,
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
        <h1 className="m-0 p-0 text-nowrap font-size-4">{title}</h1>
        <div className="h-full w-full flex flex-row items-center justify-start">
          {toolbarStart && <Toolbar {...toolbarStart} />}
        </div>
        <div className="h-full w-full flex flex-row items-center justify-end">
          {toolbarEnd && <Toolbar {...toolbarEnd} />}
        </div>
      </div>
    </header>
  );
};
