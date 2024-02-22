import { forwardRef, type ChangeEventHandler, type ForwardedRef } from "react";
import { convertColor } from "../../lib/convertColor";
import style from "./InputListColor.module.css";

export interface InputListColorProps {
  name: string;
  defaultValue?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export const InputListColor = forwardRef(
  function InputListColor(
    { name, defaultValue, onChange }: InputListColorProps,
    ref: ForwardedRef<HTMLInputElement>
  ) {
    return (
      <input
        className={style.wrapper}
        defaultValue={convertColor(defaultValue)}
        name={name}
        ref={ref}
        type="color"
        onChange={onChange}
      />
    );
  }
);
