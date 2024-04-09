import { cls } from "../../lib/cls";
import { Action, type ActionProps } from "../Action";
import { Dropdown, type DropdownProps } from "../Dropdown";

export type ToolbarProps = DropdownProps;

export const Toolbar = ({
  extendedClassName,
  variant,
  contentVariant,
  items,
  ...props
}: ToolbarProps) => {
  const dropdownProps = {
    variant,
    contentVariant,
    items,
    ...props,
  } as DropdownProps;
  return (
    <>
      <Dropdown
        {...dropdownProps}
        extendedClassName={cls(extendedClassName, "sm:hidden inline-block")}
      />
      <ul className="m-0 hidden flex-row list-none p-0 sm:flex">
        {items &&
          items.map(
            ({ type, ...item }, index) =>
              type !== "divider" && (
                <li key={index}>
                  <Action
                    className="m-0 cursor-pointer rounded-2 b-none bg-transparent p-2 c-inherit dark:hover:bg-black:10 light:hover:bg-white:10"
                    {...({ ...item, variant, contentVariant } as ActionProps)}
                  />
                </li>
              )
          )}
      </ul>
    </>
  );
};
