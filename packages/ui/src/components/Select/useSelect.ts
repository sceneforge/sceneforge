import { useCallback, useEffect, useMemo, useState } from "react";

import type { OptionProps } from "./Option";
import type { Option } from "./Select";

import { useCurrentId } from "../../hooks";

export type UseSelectProps = {
  defaultValue?: OptionProps["value"];
  id?: string;
  onChange?: (next?: Option["value"], previous?: Option["value"]) => void;
  options?: Option[];
};

export const useSelect = ({
  defaultValue,
  id,
  onChange,
  options,
}: UseSelectProps) => {
  const currentId = useCurrentId(id);

  const hiddenSelectId = useMemo(() => `${currentId}-hidden`, [currentId]);
  const popoverOptionsId = useMemo(() => `${currentId}-popover`, [currentId]);

  const [currentOption, setCurrentOption] = useState<Option>();

  const updateCurrentOption = useCallback((next: Option) => {
    setCurrentOption((previous) => {
      if (onChange && previous?.value !== next?.value) {
        onChange(next?.value, previous?.value);
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
