import { type ChangeEventHandler, ForwardedRef, forwardRef } from "react";

export type InputListSelectProps = {
  defaultValue?: string;
  id?: string;
  name: string;
  onBlur?: ChangeEventHandler<HTMLSelectElement>;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  options: { text: string; value: string }[];
  value?: HTMLSelectElement["value"];
};

export const InputListSelect = forwardRef(function InputListSelect(
  { defaultValue, id, name, onChange, options, value }: InputListSelectProps,
  ref: ForwardedRef<HTMLSelectElement>
) {
  return (
    <div className="relative">
      <select
        className="inset-r-2 m-r-3 block min-w-max appearance-none b-0.25rem b-accent:20 rounded-4 b-solid bg-accent p-block-1 p-inline-3 c-inherit after:pointer-events-none after:absolute after:block after:h-full after:w-5 after:c-inherit after:opacity-50 after:content-[▼]"
        defaultValue={defaultValue}
        id={id}
        name={name}
        onChange={onChange}
        ref={ref}
        value={value}
      >
        {options.map(({ text, value }) => (
          <option key={value} value={value}>
            {text}
          </option>
        ))}
      </select>
    </div>
  );
});
