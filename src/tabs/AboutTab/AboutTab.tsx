import { SafeArea } from "../../components/SafeArea";
import { Section } from "../../components/Section";
import { Tab } from "../../components/TabPanel";

export interface AboutTabProps {
  active?: boolean;
  title?: string;
}

export const AboutTab = Tab(({}: AboutTabProps) => {
  return (
    <SafeArea vertical horizonal>
      <Section title="About Scene Forge">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
        <p>
          Duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
          sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
          consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
          labore et dolore magna aliquyam erat, sed diam voluptua.
        </p>
      </Section>
    </SafeArea>
  );
});
