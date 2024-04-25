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
  ref: ForwardedRef<HTMLSelectElement>,
) {
  return (
    <div className="relative">
      <select
        className="inset-r-2 m-r-3 block min-w-max appearance-none b-0.25rem b-accent:20 rounded-4 b-solid bg-accent p-block-1 p-inline-3 c-inherit after:pointer-events-none after:absolute after:block after:h-full after:w-5 after:c-inherit after:opacity-50 after:content-[▼]"
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
