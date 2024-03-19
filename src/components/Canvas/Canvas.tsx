import {
  ForwardedRef,
  forwardRef,
  type CanvasHTMLAttributes,
  type DetailedHTMLProps,
} from "react";

export type CanvasProps = Omit<DetailedHTMLProps<
  CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement
>, "className">;

export const Canvas = forwardRef(
  function Canvas(props: CanvasProps, ref: ForwardedRef<HTMLCanvasElement>) {
    return <canvas className="h-90% w-full touch-none" {...props} ref={ref} />;
  }
);

