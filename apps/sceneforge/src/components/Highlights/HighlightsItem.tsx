import { Button } from "@sceneforge/ui";
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
    <Button
      className="relative m-0 block h-full w-full cursor-pointer b-none bg-transparent p-0"
      onClick={handleClick}
    >
      <img
        alt=""
        className="absolute left-0 top-0 h-full w-full object-cover"
        src={image}
      />
      <div className="absolute inset-l-0 inset-t-0 block h-full w-full bg-gradient-from-primary:50 bg-gradient-linear bg-gradient-shape-r text-start">
        <h2 className="m-0 p-l-3 p-t-5 text-size-3xl c-light font-extrabold text-shadow-lg text-shadow-color-black:40 lg:p-l-5 lg:p-t-8 md:p-l-4 md:p-t-6 xl:p-l-8 xl:p-t-12 lg:text-size-5xl md:text-size-4xl xl:text-size-6xl">
          {title}
        </h2>
        {description && (
          <p className="max-w-md p-l-3 text-size-lg c-light font-extralight text-shadow-lg text-shadow-color-black:40 lg:p-l-5 md:p-l-4 xl:p-l-8 lg:text-size-2xl md:text-size-xl xl:text-size-3xl">
            {description}
          </p>
        )}
      </div>
    </Button>
  );
};
