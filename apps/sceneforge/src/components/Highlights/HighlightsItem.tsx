import { Button, Heading } from "@sceneforge/ui";
import { useCallback } from "react";

import { Highlight } from "../../lib/isWelcomeData";

export type HighlightsItemProps = Highlight;

export const HighlightsItem = ({
  action,
  description,
  image,
  title,
}: HighlightsItemProps) => {
  const handleClick = useCallback(() => {
    if (action && action.type === "markdown") {
      console.log("DEBUG: action", action);
    }
  }, [action]);

  return (
    <Button onClick={handleClick}>
      <img
        alt=""
        src={image}
      />
      <div>
        <Heading level={2}>
          {title}
        </Heading>
        {description && (
          <p>
            {description}
          </p>
        )}
      </div>
    </Button>
  );
};
