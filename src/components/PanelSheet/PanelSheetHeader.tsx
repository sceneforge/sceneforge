import { type PropsWithChildren } from "react";

import { HeadingEditable } from "../HeadingEditable";

export type PanelSheetHeaderProps = PropsWithChildren<{
  editable?: boolean;
  name: string;
  onUpdate?: (value: string) => Promise<void> | void;
  title: string;
}>;

export const PanelSheetHeader = ({
  children,
  editable,
  name,
  onUpdate,
  title,
}: PanelSheetHeaderProps) => {
  return (
    <div className="max-h-10 flex flex-row items-center justify-stretch b-b-1 b-t-1 b-b-black:25 b-t-white:25 b-b-solid b-t-solid p-2 p-r-8 c-light dark:bg-black:15 light:bg-white:15 sm:p-r-0">
      <HeadingEditable
        className="m-0 flex-grow overflow-clip text-ellipsis text-start text-nowrap font-size-4"
        editable={editable}
        inputClassName="b-t-none b-inline-none b-b-2 b-b-white:50"
        level={2}
        name={name}
        onUpdate={onUpdate}
        value={title}
      />
      <div className="flex flex-shrink flex-row items-center c-inherit">
        {children}
      </div>
    </div>
  );
};
