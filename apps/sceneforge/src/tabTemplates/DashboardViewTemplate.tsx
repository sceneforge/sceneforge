import { Carousel, type CarouselProps } from "@sceneforge/ui";

export type DashboardViewTemplateProps = {
  carousel?: CarouselProps;
  title?: string;
};

const DashboardViewTemplate = ({
  carousel,
}: DashboardViewTemplateProps) => {
  return (
    <>
      {carousel && (
        <Carousel {...carousel} level={1} />
      )}
    </>
  );
};

export default DashboardViewTemplate;
