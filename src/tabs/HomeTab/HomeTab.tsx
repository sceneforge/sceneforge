import { Tab } from "../../components/TabPanel";
import { SafeArea } from "../../components/SafeArea";
import { ModelList } from "../../components/ModelList";

export interface HomeTabProps {
  active?: boolean;
  title?: string;
}

export const HomeTab = Tab(({ active }: HomeTabProps) => {
  return (
    <SafeArea vertical>
      <ModelList active={active} />
    </SafeArea>
  );
});
