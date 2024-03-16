import { Section, SectionProps } from "../Section";

export type CarouselProps = Omit<SectionProps, "className">;

export const Carousel = (props: CarouselProps) => {
  return (
    <Section
      {...props}
      headingClassName="m-b-4 m-t-0 c-inherit text-start text-shadow-xl p-inline-4"
      className="flex p-block-2 p-inline-4 flex-row flex-nowrap justify-start items-start gap-4 w-full overflow-y-hidden overflow-x-visible scroll-smooth snap-start snap-always children:flex-basis-80"
    />
  );
};
