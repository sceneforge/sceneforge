import { Button } from "@sceneforge/ui";
import { useCallback, useState } from "react";

import { HighlightsItem, type HighlightsItemProps } from "./HighlightsItem";

export type HighlightsProps = {
  extendedClassName?: string;
  items: HighlightsItemProps[];
};

export const Highlights = ({ items }: HighlightsProps) => {
  const [intervalProcess, setIntervalProcess] = useState<NodeJS.Timeout | null>(
    null
  );

  const stop = useCallback(() => {
    if (intervalProcess !== null) {
      clearInterval(intervalProcess);
      setIntervalProcess(null);
    }
  }, [intervalProcess]);

  return (
    <>
      <ul
        onMouseEnter={stop}
      >
        {items.map((item, index) => (
          <li key={index}>
            <HighlightsItem {...item} />
          </li>
        ))}
      </ul>
      <div>
        {items.map((_, index) => (
          <Button key={index} onClick={() => void 0}>
            {index + 1}
          </Button>
        ))}
      </div>
    </>
  );
};
