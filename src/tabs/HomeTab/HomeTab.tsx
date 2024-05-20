import { SafeArea } from "../../components/SafeArea";
import { ModelList } from "../../components/ModelList";
import { type TabProps } from "../../components/TabPanel";

export type HomeTabProps = TabProps<{
  active?: boolean;
  title?: string;
}>;

export const HomeTab = ({ active }: HomeTabProps) => {
  return (
    <SafeArea vertical>
      <ModelList active={active} />
    </SafeArea>
  );
};
