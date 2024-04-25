import { forwardRef, useId, type ForwardedRef } from "react";

import { InputListSelect, type InputListSelectProps } from "./InputListSelect";

export type InputListType = "select" | "checkbox";

type InputListItemSelectProps = InputListSelectProps & { type: "select" };

export type InputListItemProps = {
  label: string;
} & InputListItemSelectProps;

export const InputListItem = forwardRef(function InputListItem(
  {
    id,
    label,
    type,
    name,
    defaultValue,
    onChange,
    onBlur,
    value,
    options,
  }: InputListItemProps,
  ref: ForwardedRef<HTMLInputElement | HTMLSelectElement>,
) {
  const genId = useId();
  const inputId = id ?? genId;

  return (
    <li className="m-0 h-12 flex flex-row flex-nowrap items-center justify-stretch b-block-1 b-block-solid p-0 dark:b-b-white:15 dark:b-t-black:15 light:b-b-black:15 light:b-t-white:15 dark:bg-white:15 light:bg-black:15 last-children:m-r-2">
      <label
        htmlFor={inputId}
        className="w-full flex-grow p-l-4 p-block-1 text-start font-bold text-shadow-md"
      >
        {label}
      </label>
      {type === "select" && (
        <InputListSelect
          id={inputId}
          defaultValue={defaultValue}
          name={name}
          ref={ref as ForwardedRef<HTMLSelectElement>}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          options={options}
        />
      )}
    </li>
  );
});
