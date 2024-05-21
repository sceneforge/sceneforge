import { useId } from "react";

import {
  InputListCheckbox,
  type InputListCheckboxProps,
} from "./InputListCheckbox";
import { InputListSelect, type InputListSelectProps } from "./InputListSelect";

export type InputListType = "checkbox" | "select";

type InputListItemSelectProps = { type: "select" } & InputListSelectProps;

type InputListItemCheckboxProps = { type: "checkbox" } & InputListCheckboxProps;

export type InputListItemProps = {
  id?: string;
  label: string;
} & (InputListItemCheckboxProps | InputListItemSelectProps);

export const InputListItem = ({
  id,
  label,
  type,
  value,
  ...props
}: InputListItemProps) => {
  const genId = useId();
  const inputId = id ?? genId;

  if (type !== "select" && type !== "checkbox") {
    throw new Error("Invalid type");
  }

  return (
    <li className="m-0 h-12 flex flex-row flex-nowrap items-center justify-stretch b-block-1 b-block-solid p-0 dark:b-b-white:15 dark:b-t-black:15 light:b-b-black:15 light:b-t-white:15 dark:bg-white:15 light:bg-black:15 last-children:m-r-2">
      <label
        className="w-full flex-grow p-l-4 p-block-1 text-start font-bold text-shadow-md"
        htmlFor={inputId}
      >
        {label}
      </label>
      {type === "select" && (
        <InputListSelect
          id={inputId}
          value={value}
          {...(props as InputListSelectProps)}
        />
      )}
      {type === "checkbox" && (
        <InputListCheckbox
          id={inputId}
          value={value}
          {...(props as InputListCheckboxProps)}
        />
      )}
    </li>
  );
};
