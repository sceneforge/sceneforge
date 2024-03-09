import { ForwardedRef, forwardRef, type ChangeEventHandler } from "react";

import styles from "./InputListSelect.module.css";

export type InputListSelectProps = {
  id?: string;
  name: string;
  defaultValue?: string;
  value?: HTMLSelectElement["value"];
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  options: { value: string; text: string }[];
};

export const InputListSelect = forwardRef(function InputListSelect({
  id,
  name,
  defaultValue,
  value,
  onChange,
  options
}: InputListSelectProps, ref: ForwardedRef<HTMLSelectElement>) {
  return (
    <div className={styles.wrapper}>
      <select
        id={id}
        ref={ref}
        name={name}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
      >
        {options.map(({ value, text }) => (
          <option key={value} value={value}>
            {text}
          </option>
        ))}
      </select>
    </div>
  );
});
