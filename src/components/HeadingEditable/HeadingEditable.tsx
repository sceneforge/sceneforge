import { type ChangeEventHandler, useCallback, useState } from "react";
import { Heading } from "../Heading";
import { cls } from "../../lib/cls";

export type HeadingEditableProps = {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  value: string;
  name: string;
  className?: string;
  inputClassName?: string;
  onUpdate?: (value: string) => Promise<void> | void;
  editable?: boolean;
};

export const HeadingEditable = ({
  className,
  inputClassName,
  level = 2,
  value,
  name,
  editable = true,
  onUpdate,
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
        type="text"
        name={name}
        defaultValue={currentValue}
        onChange={handleChange}
        onBlur={handleBlur}
        autoFocus
        className={cls(
          className,
          inputClassName,
          "bg-transparent c-inherit font-bold active:outline-none focus:outline-none h-full w-min inline-block"
        )}
      />
    );
  }
  return (
    <Heading level={level} onClick={handleClick} className={cls(className, "")}>
      {currentValue}
    </Heading>
  );
};
