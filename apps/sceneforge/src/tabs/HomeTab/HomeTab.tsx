import { Heading, type TabComponentType } from "@sceneforge/ui";

const HomeTab: TabComponentType = ({ hidden }) => {
  // return (
  //   <SafeArea vertical>
  //     <ModelList active={!hidden} />
  //   </SafeArea>
  // );
  return (
    <>
      <Heading level={1}>Hello World!</Heading>
      {!hidden && (
        <p>
          I can be seen when the tab is active.
        </p>
      )}
    </>
  );
};

export default HomeTab;
