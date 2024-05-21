import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "../Button";
import { HighlightsItem, type HighlightsItemProps } from "./HighlightsItem";
import { cls } from "../../lib/cls";
import { getShiftedIndex } from "../../lib/getShiftedIndex";

const SLIDE_INTERVAL = 5000; // 5 seconds

export type HighlightsProps = {
  items: HighlightsItemProps[];
  extendedClassName?: string;
};

export const Highlights = ({ items, extendedClassName }: HighlightsProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [intervalProcess, setIntervalProcess] = useState<NodeJS.Timeout | null>(
    null
  );

  const stop = useCallback(() => {
    if (intervalProcess !== null) {
      clearInterval(intervalProcess);
      setIntervalProcess(null);
    }
  }, [intervalProcess]);

  const play = useCallback(() => {
    setIntervalProcess((currentIntervalProcess) => {
      if (currentIntervalProcess !== null) return currentIntervalProcess;
      return setInterval(() => {
        setActiveIndex(previousIndex => (previousIndex + 1) % items.length);
      }, SLIDE_INTERVAL);
    });
  }, [items]);

  const handleSlideDropClick = useCallback(
    (index: number) => () => {
      stop();
      setActiveIndex(index);
    },
    [stop]
  );

  const zIndexes = useMemo(
    () => getShiftedIndex(items, activeIndex).map(index => `z-${index}`),
    [items, activeIndex]
  );

  useEffect(() => {
    play();
    return stop;
  }, [play, stop]);

  return (
    <>
      <ul
        className={cls(
          "relative m-0 list-none overflow-clip p-0",
          extendedClassName
        )}
        onMouseEnter={stop}
        onMouseLeave={play}
      >
        {items.map((item, index) => (
          <li
            key={index}
            className={cls(
              "absolute inset-t-0 inset-l-0 h-full w-full list-none",
              zIndexes[index],
              index === activeIndex
                ? "animate-in fade-in animate-slide-in-right"
                : "animate-out"
            )}
          >
            <HighlightsItem {...item} />
          </li>
        ))}
      </ul>
      <div className="flex flex-row justify-center">
        {items.map((_, index) => (
          <Button
            key={index}
            className={cls(
              "h-5 w-5 rounded-2xl b-none c-transparent m-1  shadow-md shadow-inset cursor-pointer",
              index === activeIndex
                ? "bg-accent drop-shadow-xl shadow-white:35"
                : "bg-primary drop-shadow-lg shadow-white:20"
            )}
            onClick={handleSlideDropClick(index)}
          >
            {index + 1}
          </Button>
        ))}
      </div>
    </>
  );
};
