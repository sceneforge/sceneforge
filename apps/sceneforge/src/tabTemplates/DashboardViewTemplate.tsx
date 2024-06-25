import { Button, Container, Section, Variant } from "@sceneforge/ui";

import { useShortcuts } from "../shortcuts";

export type DashboardViewTemplateProps = {
  title: string;
};

const DashboardViewTemplate = ({ title }: DashboardViewTemplateProps) => {
  const { openSettings } = useShortcuts();
  return (
    <Container>
      <Section level={1} title={title}>
        Dashboard Content
        <Button onClick={() => void openSettings()} variant={Variant.Default}>
          Settings
        </Button>
      </Section>
    </Container>
  );
};

export default DashboardViewTemplate;
