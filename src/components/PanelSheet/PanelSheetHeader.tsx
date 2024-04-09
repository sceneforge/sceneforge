import {
  type ChangeEvent,
  type PropsWithChildren,
  type SyntheticEvent,
} from "react";
import { Heading } from "../Heading";

export type PanelSheetHeaderProps = PropsWithChildren<{
  title: string;
  name: string;
  editable?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onInput?: (event: SyntheticEvent<HTMLInputElement, InputEvent>) => void;
}>;

export const PanelSheetHeader = ({ title, children }: PanelSheetHeaderProps) => {
  return (
    <div className="max-h-10 flex flex-row items-center justify-stretch b-b-1 b-t-1 b-b-black:25 b-t-white:25 b-b-solid b-t-solid p-2 p-r-8 c-light dark:bg-black:15 light:bg-white:15 sm:p-r-0">
      <Heading
        level={2}
        className="m-0 flex-grow overflow-clip text-ellipsis p-0 text-start text-nowrap font-size-4"
      >
        {title}
      </Heading>
      <div className="flex flex-shrink flex-row items-center c-inherit">
        {children}
      </div>
    </div>
  );
};
