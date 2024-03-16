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
    <div className="max-h-10 flex flex-row justify-stretch items-center p-2 light:bg-white:15 dark:bg-black:15 b-b-1 b-b-solid b-b-black:25 b-t-1 b-t-solid b-t-white:25 c-light">
      <H2
        className="flex-grow"
        clickToEdit={editable}
        name={name}
        text={currentTitle}
        onChange={onChange}
        onInput={handleInput}
      />
      <div className="flex-shrink flex flex-row items-center c-inherit">
        {children}
      </div>
    </div>
  );
};
