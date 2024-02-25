import { forwardRef, type ChangeEventHandler, type ForwardedRef } from "react";
import { InputListColor } from "./InputListColor";

import styles from "./InputListItem.module.css";

export type InputListType = "color" | "checkbox";

export interface InputListItemProps {
  label: string;
  name: string;
  type: InputListType
  defaultValue?: string;
  value?: HTMLInputElement["value"];
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export const InputListItem = forwardRef(
  function InputListItem(
    { label, type, name, defaultValue, onChange, value }: InputListItemProps,
    ref: ForwardedRef<HTMLInputElement>
  ) {
    return (
      <li className={styles.wrapper}>
        <label>
          <span>{label}</span>
          {
            type === "color" && (
              <InputListColor
                defaultValue={defaultValue}
                name={name}
                ref={ref}
                value={value}
                onChange={onChange}
              />
            )
          }
        </label>
      </li>
    );
  }
);
