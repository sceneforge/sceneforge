import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { useCurrentId } from "../../hooks";

export type UseSliderProps = {
  defaultValue?: number;
  id?: string;
  inverted?: boolean;
  onChange?: (value: number) => Promise<void> | void;
  onImediateChange?: (value: number) => Promise<void> | void;
  step?: number;
};

export const useSlider = ({
  defaultValue,
  id,
  inverted,
  onChange,
  onImediateChange,
  step,
}: UseSliderProps) => {
  const currentId = useCurrentId(id);
  const currentPickerId = useMemo(() => `${currentId}-slider-handler`, [currentId]);
  const currentSliderId = useMemo(() => `${currentId}-slider`, [currentId]);

  const pickerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const [grabbing, setGrabbing] = useState(false);
  const [value, setValue] = useState<number>(defaultValue ?? 0);
  const [previousValue, setPreviousValue] = useState<number>(defaultValue ?? 0);

  const handlePointerDown = useCallback((event: PointerEvent) => {
    if (event.target === pickerRef.current) {
      setGrabbing(true);
      setPreviousValue(value);
    }
  }, [value, pickerRef]);

  const handlePointerUp = useCallback(() => {
    setGrabbing(false);
    if (previousValue !== value && onChange) {
      void onChange(value);
    }
  }, [onChange, previousValue, value]);

  useEffect(() => {
    if (pickerRef.current) {
      const picker = pickerRef.current;

      picker.addEventListener("pointerdown", handlePointerDown);
      document.addEventListener("pointerup", handlePointerUp);
      document.addEventListener("pointercancel", handlePointerUp);

      return () => {
        picker.removeEventListener("pointerdown", handlePointerDown);
        document.removeEventListener("pointerup", handlePointerUp);
        document.removeEventListener("pointercancel", handlePointerUp);
      };
    }
  }, [pickerRef, handlePointerDown, handlePointerUp]);

  const getMovementValue = useCallback((width: number, movement: number) => {
    let result = (
      Math.min(Math.max(movement, 0), width) / width
    ) * 100;

    if (step !== undefined) {
      result = Math.round(result / step) * step;
      if (result > 100) result = result - step;
      if (result < 0) result = result + step;
    }

    if (inverted) return 100 - result;

    if (onImediateChange && previousValue !== result) {
      void onImediateChange(result);
    }

    return result;
  }, [inverted, step, previousValue, onImediateChange]);

  const handlePointerMove = useCallback((event: PointerEvent) => {
    if (grabbing && sliderRef.current) {
      const { width, x } = sliderRef.current.getBoundingClientRect();
      const sliderOnClientStart = x;
      const sliderOnClientEnd = x + width;
      const pickerMovement = Math.min(
        Math.max(event.clientX, sliderOnClientStart),
        sliderOnClientEnd
      ) - sliderOnClientStart;
      setValue(getMovementValue(width, pickerMovement));
    }
  }, [grabbing, sliderRef, getMovementValue]);

  useEffect(() => {
    if (grabbing) {
      document.addEventListener("pointermove", handlePointerMove);

      return () => {
        document.removeEventListener("pointermove", handlePointerMove);
      };
    }
  }, [grabbing, handlePointerMove]);

  const handleSliderPointerDown = useCallback((event: PointerEvent) => {
    if (sliderRef.current && event.target === sliderRef.current) {
      const { width } = sliderRef.current.getBoundingClientRect();

      setValue((previousValue) => {
        setPreviousValue(previousValue);
        return getMovementValue(width, event.offsetX);
      });
      setGrabbing(true);
    }
  }, [sliderRef, getMovementValue]);

  useEffect(() => {
    if (sliderRef.current && !grabbing) {
      const slider = sliderRef.current;

      slider.addEventListener("pointerdown", handleSliderPointerDown);

      return () => {
        slider.removeEventListener("pointerdown", handleSliderPointerDown);
      };
    }
  }, [sliderRef, grabbing, handleSliderPointerDown]);

  return {
    currentId,
    currentPickerId,
    currentSliderId,
    grabbing,
    pickerRef,
    sliderRef,
    value,
  };
};
