import { Carousel, type CarouselProps, type TabComponentProps } from "@sceneforge/ui";

export type DashboardViewTemplateProps = TabComponentProps<{
  carousel?: CarouselProps;
  title?: string;
}>;

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
