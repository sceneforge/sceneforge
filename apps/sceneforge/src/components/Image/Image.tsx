import { type AllHTMLAttributes } from "react";

import { applyBasePath } from "../../lib/applyBasePath";
import { useAppContext } from "../App";
import { ImageDialog } from "../ImageDialog";

export type ImageProps = AllHTMLAttributes<HTMLImageElement>;

export const Image = ({ alt, src, title, ...props }: ImageProps) => {
  const { basePath } = useAppContext();

  if (title && src && src.endsWith("#!image-dialog")) {
    return (
      <ImageDialog
        alt={alt}
        src={src.replace("#!image-dialog", "")}
        title={title}
      />
    );
  }

  return (
    <img
      alt={alt}
      src={applyBasePath(basePath, src)}
      title={title}
      {...props}
    />
  );
};
