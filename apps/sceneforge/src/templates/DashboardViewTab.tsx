import { Carousel, type CarouselProps, type TabComponentProps } from "@sceneforge/ui";

export type DashboardViewTabProps = TabComponentProps<{
  carousel?: CarouselProps;
  title?: string;
}>;

const DashboardViewTab = ({
  carousel,
}: DashboardViewTabProps) => {
  return (
    <>
      {carousel && (
        <Carousel {...carousel} level={1} />
      )}
    </>
  );
};

export default DashboardViewTab;
