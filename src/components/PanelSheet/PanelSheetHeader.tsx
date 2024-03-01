import {
  useCallback,
  useState,
  type ChangeEvent,
  type PropsWithChildren,
  type SyntheticEvent
} from "react";
import { H2 } from "../Heading";
import styles from "./PanelSheetHeader.module.css";

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
  onInput
}: PanelSheetHeaderProps) => {

  const [currentTitle, setCurrentTitle] = useState<string>(title);

  const handleInput = useCallback((event: SyntheticEvent<HTMLInputElement, InputEvent>) => {
    if (event.target instanceof HTMLInputElement) {
      setCurrentTitle(event.target.value);
    }
    if (onInput) {
      onInput(event);
    }
  }, [onInput, setCurrentTitle]);

  return (
    <div className={styles.wrapper}>
      <H2
        clickToEdit={editable}
        name={name}
        text={currentTitle}
        onChange={onChange}
        onInput={handleInput}
      />
      <div className={styles.toolbar}>
        {children}
      </div>
    </div>
  );
};
