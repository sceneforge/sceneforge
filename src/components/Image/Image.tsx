import { type AllHTMLAttributes, type ForwardedRef, forwardRef } from "react";
import { ImageDialog } from "../ImageDialog";

export type ImageProps = AllHTMLAttributes<HTMLImageElement>;

export const Image = forwardRef(function Image(
  { src, title, alt, ...props }: ImageProps,
  ref: ForwardedRef<HTMLImageElement>
) {
  if (title && src && src.endsWith("#!image-dialog")) {
    return (
      <ImageDialog
        src={src.replace("#!image-dialog", "")}
        title={title}
        alt={alt}
      />
    );
  }

  return <img src={src} title={title} alt={alt} {...props} ref={ref} />;
});
