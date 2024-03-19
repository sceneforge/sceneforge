import {
  useCallback,
  useState,
  type ChangeEvent,
  type PropsWithChildren,
  type SyntheticEvent
} from "react";
import { H2 } from "../Heading";

export type PanelSheetHeaderProps = PropsWithChildren<{
  title: string;
  name: string;
  editable?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onInput?: (event: SyntheticEvent<HTMLInputElement, InputEvent>) => void;
}>;

export const PanelSheetHeader = ({
  title,
  name,
  editable,
  children,
  onChange,
  onInput,
}: PanelSheetHeaderProps) => {
  const [currentTitle, setCurrentTitle] = useState<string>(title);

  const handleInput = useCallback(
    (event: SyntheticEvent<HTMLInputElement, InputEvent>) => {
      if (event.target instanceof HTMLInputElement) {
        setCurrentTitle(event.target.value);
      }
      if (onInput) {
        onInput(event);
      }
    },
    [onInput, setCurrentTitle]
  );

  return (
    <div className="max-h-10 flex flex-row items-center justify-stretch b-b-1 b-t-1 b-b-black:25 b-t-white:25 b-b-solid b-t-solid p-2 c-light dark:bg-black:15 light:bg-white:15">
      <H2
        className="flex-grow"
        clickToEdit={editable}
        name={name}
        text={currentTitle}
        onChange={onChange}
        onInput={handleInput}
      />
      <div className="flex flex-shrink flex-row items-center c-inherit">
        {children}
      </div>
    </div>
  );
};
