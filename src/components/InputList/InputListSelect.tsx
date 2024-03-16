import { ForwardedRef, forwardRef, type ChangeEventHandler } from "react";

export type InputListSelectProps = {
  id?: string;
  name: string;
  defaultValue?: string;
  value?: HTMLSelectElement["value"];
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  onBlur?: ChangeEventHandler<HTMLSelectElement>;
  options: { value: string; text: string }[];
};

export const InputListSelect = forwardRef(function InputListSelect(
  { id, name, defaultValue, value, onChange, options }: InputListSelectProps,
  ref: ForwardedRef<HTMLSelectElement>
) {
  return (
    <div className="relative">
      <select
        className="c-inherit appearance-none block bg-accent p-block-1 p-inline-3 b-solid b-0.25rem b-accent:20 rounded-4 min-w-max m-r-3 after:content-[▼] after:c-inherit after:block after:absolute after:w-5 after:h-full after:pointer-events-none after:opacity-50 inset-r-2"
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
