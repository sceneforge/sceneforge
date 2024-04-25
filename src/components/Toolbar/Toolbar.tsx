import { cls } from "../../lib/cls";
import { Action, type ActionProps } from "../Action";
import { Dropdown, type DropdownProps } from "../Dropdown";

export type ToolbarProps = DropdownProps & {
  withDropdown?: boolean;
  contrast?: boolean;
};

export const Toolbar = ({
  extendedClassName,
  variant,
  contentVariant,
  items,
  withDropdown = true,
  contrast = false,
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
      {withDropdown && (
        <Dropdown
          {...dropdownProps}
          extendedClassName={cls(extendedClassName, "sm:hidden inline-block")}
        />
      )}
      <ul
        className={cls(
          "m-0 flex-row list-none p-0 gap-2",
          withDropdown ? "hidden sm:flex" : "flex",
        )}
      >
        {items &&
          items.map(
            ({ type, ...item }, index) =>
              type !== "divider" && (
                <li key={index}>
                  <Action
                    className={cls(
                      "m-0 cursor-pointer rounded-2 b-none p-2 c-inherit",
                      contrast
                        ? "dark:bg-black:10 light:bg-white:10 dark:hover:bg-black:20 light:hover:bg-white:20"
                        : "bg-transparent dark:hover:bg-black:10 light:hover:bg-white:10",
                    )}
                    {...({ ...item, variant, contentVariant } as ActionProps)}
                  />
                </li>
              ),
          )}
      </ul>
    </>
  );
};
