import { v4 as uuid } from "uuid";

import { forwardRef, type ForwardedRef } from "react";
import { InputListColor, type InputListColorProps } from "./InputListColor";

import styles from "./InputListItem.module.css";
import { InputListSelect, type InputListSelectProps } from "./InputListSelect";

export type InputListType = "color" | "select" | "checkbox";

type InputListItemColorProps = InputListColorProps & { type: "color", options?: never };
type InputListItemSelectProps = InputListSelectProps & { type: "select" };

export type InputListItemProps = {
  label: string;
} & (InputListItemColorProps | InputListItemSelectProps);

export const InputListItem = forwardRef(
  function InputListItem(
    { id, label, type, name, defaultValue, onChange, value, options }: InputListItemProps,
    ref: ForwardedRef<HTMLInputElement | HTMLSelectElement>
  ) {
    const inputId = id ?? `input-${uuid()}`;
    return (
      <li className={styles.wrapper}>
        <label htmlFor={inputId}>{label}</label>
        {
          type === "color" && (
            <InputListColor
              id={inputId}
              defaultValue={defaultValue}
              name={name}
              ref={ref as ForwardedRef<HTMLInputElement>}
              value={value}
              onChange={onChange}
            />
          )
        }
        {
          type === "select" && (
            <InputListSelect
              id={inputId}
              defaultValue={defaultValue}
              name={name}
              ref={ref as ForwardedRef<HTMLSelectElement>}
              value={value}
              onChange={onChange}
              options={options}
            />
          )
        }
      </li>
    );
  }
);
