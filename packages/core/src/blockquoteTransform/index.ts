import type { Element } from "hast";

import { customBlockquote } from "./customBlockquote";
import { type GalleryParameters, gallery } from "./gallery";

export type BlockquoteTransformConfig = {
  gallery?: GalleryParameters | boolean;
};

export const blockquoteTransform = (
  config: BlockquoteTransformConfig
) => {
  return () => {
    return (root: Element) => {
      let result = root;
      if ("gallery" in config && config.gallery) {
        result = {
          ...result,
          children: customBlockquote<GalleryParameters>(
            result.children,
            "gallery",
            {
              parameters: typeof config.gallery === "boolean" ? undefined : config.gallery,
              transform: gallery,
            }
          ),
        };
      };

      return result;
    };
  };
};

export type {
  BlockquoteFunction,
  BlockquoteTransform,
} from "./customBlockquote";

export type { GalleryParameters } from "./gallery";
