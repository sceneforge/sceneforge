import { type PropsWithChildren } from "react";
import { H2 } from "../Heading";
import styles from "./Carousel.module.css";

export type CarouselProps = PropsWithChildren<{
  title?: string;
}>;

export const Carousel = ({ title, children }: CarouselProps) => {
  return (
    <section
      className={styles.wrapper}
    >
      {title && <H2 className={styles.title} text={title} />}
      <div className={styles.gallery}>
        {children}
      </div>
    </section>
  );
};
