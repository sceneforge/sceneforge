import { forwardRef, type ChangeEventHandler, type ForwardedRef } from "react";
import { convertColor } from "../../lib/convertColor";
import style from "./InputListColor.module.css";

export interface InputListColorProps {
  id?: string;
  name: string;
  defaultValue?: string;
  value?: HTMLInputElement["value"];
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export const InputListColor = forwardRef(
  function InputListColor(
    { id, name, defaultValue, value, onChange }: InputListColorProps,
    ref: ForwardedRef<HTMLInputElement>
  ) {
    return (
      <input
        id={id}
        className={style.wrapper}
        defaultValue={convertColor(defaultValue)}
        name={name}
        ref={ref}
        type="color"
        value={value}
        onChange={onChange}
      />
    );
  }
);
