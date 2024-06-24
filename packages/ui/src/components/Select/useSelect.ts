import { useCallback, useEffect, useId, useMemo, useState } from "react";

import type { OptionProps } from "./Option";
import type { Option } from "./Select";

export type UseSelectProps = {
  defaultValue?: OptionProps["value"];
  id?: string;
  onChange?: (previous?: Option, next?: Option) => void;
  options?: Option[];
};

export const useSelect = ({
  defaultValue,
  id,
  onChange,
  options,
}: UseSelectProps) => {
  const generatedId = useId();
  const currentId = id ?? generatedId;

  const hiddenSelectId = useMemo(() => `${currentId}-hidden`, [currentId]);
  const popoverOptionsId = useMemo(() => `${currentId}-popover`, [currentId]);

  const [currentOption, setCurrentOption] = useState<Option>();

  const updateCurrentOption = useCallback((next: Option) => {
    setCurrentOption((previous) => {
      if (onChange) {
        onChange(previous, next);
      }
      return next;
    });
  }, [onChange]);

  const optionClick = useCallback((option: Option) => () => {
    updateCurrentOption(option);
  }, [updateCurrentOption]);

  useEffect(() => {
    if (options && options.length > 0 && currentOption === undefined) {
      if (defaultValue === undefined) {
        setCurrentOption(options[0]);
      }
      else {
        const value = options.findLast(({ value }) => value === defaultValue);
        if (value) {
          setCurrentOption(value);
        }
      }
    }
  }, [options, defaultValue, currentOption]);

  return {
    currentId,
    currentOption,
    hiddenSelectId,
    optionClick,
    popoverOptionsId,
  };
};
