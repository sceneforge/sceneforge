import { type ChangeEventHandler, useCallback, useState } from "react";

import { cls } from "../../lib/cls";
import { Heading } from "../Heading";

export type HeadingEditableProps = {
  className?: string;
  editable?: boolean;
  inputClassName?: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  name: string;
  onUpdate?: (value: string) => Promise<void> | void;
  value: string;
};

export const HeadingEditable = ({
  className,
  editable = true,
  inputClassName,
  level = 2,
  name,
  onUpdate,
  value,
}: HeadingEditableProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);
  const [previousValue, setPreviousValue] = useState(value);

  const handleClick = useCallback(() => {
    setPreviousValue(currentValue);
    setIsEditing(true);
  }, [currentValue, setPreviousValue, setIsEditing]);

  const handleBlur = useCallback(() => {
    setIsEditing(false);
    if (currentValue !== previousValue && onUpdate) {
      onUpdate(currentValue)?.catch((error) => {
        throw new Error("Failed to update value", { cause: error });
      });
    }
  }, [previousValue, currentValue, onUpdate, setIsEditing]);

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      setCurrentValue(event.target.value);
    },
    [setCurrentValue]
  );

  if (editable && isEditing) {
    return (
      <input
        autoFocus
        className={cls(
          className,
          inputClassName,
          "bg-transparent c-inherit font-bold active:outline-none focus:outline-none h-full w-min inline-block"
        )}
        defaultValue={currentValue}
        name={name}
        onBlur={handleBlur}
        onChange={handleChange}
        type="text"
      />
    );
  }
  return (
    <Heading className={cls(className, "")} level={level} onClick={handleClick}>
      {currentValue}
    </Heading>
  );
};
