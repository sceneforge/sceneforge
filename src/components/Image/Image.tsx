import { type AllHTMLAttributes, type ForwardedRef, forwardRef } from "react";

import { ImageDialog } from "../ImageDialog";

export type ImageProps = AllHTMLAttributes<HTMLImageElement>;

export const Image = forwardRef(function Image(
  { alt, src, title, ...props }: ImageProps,
  ref: ForwardedRef<HTMLImageElement>
) {
  if (title && src && src.endsWith("#!image-dialog")) {
    return (
      <ImageDialog
        alt={alt}
        src={src.replace("#!image-dialog", "")}
        title={title}
      />
    );
  }

  return <img alt={alt} src={src} title={title} {...props} ref={ref} />;
});
