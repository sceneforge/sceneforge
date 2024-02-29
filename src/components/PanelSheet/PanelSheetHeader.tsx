import { PropsWithChildren, useCallback, useState, type SyntheticEvent } from "react";
import { H2 } from "../Heading";
import styles from "./PanelSheetHeader.module.css";

export type PanelSheetHeaderProps = PropsWithChildren<{
  title: string;
  name: string;
  editable?: boolean;
}>;

export const PanelSheetHeader = ({ title, name, editable, children }: PanelSheetHeaderProps) => {

  const [currentTitle, setCurrentTitle] = useState<string>(title);

  const handleInput = useCallback((event: SyntheticEvent<HTMLInputElement, InputEvent>) => {
    if (event.target instanceof HTMLInputElement) {
      setCurrentTitle(event.target.value);
    }
  }, [setCurrentTitle]);

  return (
    <div className={styles.wrapper}>
      <H2 clickToEdit={editable} name={name} text={currentTitle} onInput={handleInput} />
      <div className={styles.toolbar}>
        {children}
      </div>
    </div>
  );
};
