import { ChangeEventHandler, type ForwardedRef, forwardRef } from "react";

export type InputListCheckboxProps = {
  id?: string;
  name: string;
  defaultValue?: string;
  value?: HTMLSelectElement["value"];
  checked?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};

export const InputListCheckbox = forwardRef(function InputListCheckbox(
  { id, name, defaultValue, value, checked, onChange }: InputListCheckboxProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  return (
    <div className="relative">
      <input
        ref={ref}
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
      />
    </div>
  );
});
