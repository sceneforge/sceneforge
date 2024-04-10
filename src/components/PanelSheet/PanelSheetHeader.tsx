import { type PropsWithChildren } from "react";
import { HeadingEditable } from "../HeadingEditable";

export type PanelSheetHeaderProps = PropsWithChildren<{
  title: string;
  name: string;
  editable?: boolean;
  onUpdate?: (value: string) => void;
}>;

export const PanelSheetHeader = ({
  title,
  onUpdate,
  editable,
  name,
  children,
}: PanelSheetHeaderProps) => {
  return (
    <div className="max-h-10 flex flex-row items-center justify-stretch b-b-1 b-t-1 b-b-black:25 b-t-white:25 b-b-solid b-t-solid p-2 p-r-8 c-light dark:bg-black:15 light:bg-white:15 sm:p-r-0">
      <HeadingEditable
        level={2}
        className="m-0 flex-grow overflow-clip text-ellipsis text-start text-nowrap font-size-4"
        inputClassName="b-t-none b-inline-none b-b-2 b-b-white:50"
        value={title}
        name={name}
        editable={editable}
        onUpdate={onUpdate}
      />
      <div className="flex flex-shrink flex-row items-center c-inherit">
        {children}
      </div>
    </div>
  );
};
