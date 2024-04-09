import { Section, SectionProps } from "../Section";

export type CarouselProps = Omit<SectionProps, "className">;

export const Carousel = (props: CarouselProps) => {
  return (
    <Section
      {...props}
      headingClassName="m-b-4 m-t-0 c-inherit text-start text-shadow-xl p-inline-4"
      className="h-sm w-full flex flex-row flex-nowrap snap-start snap-always items-start justify-start gap-4 overflow-x-visible overflow-y-hidden scroll-smooth p-block-2 p-inline-4 children:min-w-80 children:flex-basis-80"
    />
  );
};
