import { cls } from "../../lib/cls";
import { Action, type ActionProps } from "../Action";
import { Dropdown, type DropdownProps } from "../Dropdown";

export type ToolbarProps = {
  contrast?: boolean;
  withDropdown?: boolean;
} & DropdownProps;

export const Toolbar = ({
  contentVariant,
  contrast = false,
  extendedClassName,
  items,
  variant,
  withDropdown = true,
  ...props
}: ToolbarProps) => {
  const dropdownProps = {
    contentVariant,
    items,
    variant,
    ...props,
  } as DropdownProps;
  return (
    <>
      {withDropdown && (
        <Dropdown
          {...dropdownProps}
          extendedClassName={cls(extendedClassName, "sm:hidden inline-block")}
        />
      )}
      <ul
        className={cls(
          "m-0 flex-row list-none p-0 gap-2",
          withDropdown ? "hidden sm:flex" : "flex"
        )}
      >
        {items
        && items.map(
          ({ type, ...item }, index) =>
            type !== "divider" && (
              <li key={index}>
                <Action
                  className={cls(
                    "m-0 cursor-pointer rounded-2 b-none p-2 c-inherit",
                    contrast
                      ? "dark:bg-black:10 light:bg-white:10 dark:hover:bg-black:20 light:hover:bg-white:20"
                      : "bg-transparent dark:hover:bg-black:10 light:hover:bg-white:10"
                  )}
                  {...({ ...item, contentVariant, variant } as ActionProps)}
                />
              </li>
            )
        )}
      </ul>
    </>
  );
};
