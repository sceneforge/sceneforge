import { ChangeEventHandler, type ForwardedRef, forwardRef } from "react";

export type InputListCheckboxProps = {
  checked?: boolean;
  defaultValue?: string;
  id?: string;
  name: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value?: HTMLSelectElement["value"];
};

export const InputListCheckbox = forwardRef(function InputListCheckbox(
  { checked, defaultValue, id, name, onChange, value }: InputListCheckboxProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  return (
    <div className="relative">
      <input
        checked={checked}
        defaultValue={defaultValue}
        id={id}
        name={name}
        onChange={onChange}
        ref={ref}
        type="checkbox"
        value={value}
      />
    </div>
  );
});
