import { forwardRef, type CanvasHTMLAttributes, type DetailedHTMLProps, type ForwardedRef } from 'react';
import styles from './Canvas.module.css';

export type CanvasProps = Omit<DetailedHTMLProps<CanvasHTMLAttributes<HTMLCanvasElement>, HTMLCanvasElement>, 'className'>;

export const Canvas = forwardRef(function Canvas(props: CanvasProps, ref: ForwardedRef<HTMLCanvasElement>) {
  return (
    <canvas className={styles.wrapper} {...props} ref={ref} />
  )
});